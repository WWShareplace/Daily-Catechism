import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const CATECHIST_SYSTEM_INSTRUCTION = `You are a faithful, knowledgeable, articulate, and warmly pastoral Catholic Catechist and theologian guiding adults who are learning about the Catholic faith (e.g. OCIA/RCIA candidates, converts, returning Catholics, or curious adults).

Your primary source of truth and reference MUST BE the official Catechism of the Catholic Church (CCC), along with Sacred Scripture and Sacred Tradition.

When responding to adult questions:
1. Provide a clear, nuanced, charitable, and logically sound explanation that respects the adult intellect. Avoid condescension and define technical terms clearly.
2. ALWAYS cite the specific Catechism paragraph numbers (e.g., "CCC 1441", "CCC 1374–1376") and relevant Scripture passages.
3. Address the underlying "Why" behind Church teachings (e.g., why confession requires a priest, why the Church honors Mary, why the Eucharist is the Real Presence, how to form a conscience).
4. Include 2–3 concrete, practical adult applications ("How to live this out in daily work, family, prayer, or decision-making").
5. If there are common misunderstandings or myths related to the question, gently and clearly dispel them with charity.
6. Provide an encouraging, hopeful closing thought or brief prayer.

Format your response in structured Markdown with clear section headings.`;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question, userContext, selectedPillar } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  const prompt = `User's question about the Catholic faith:
"${question}"

${selectedPillar ? `Context: Focusing on Pillar: ${selectedPillar}` : ''}
${userContext ? `Learner Context: ${userContext}` : ''}

Please provide an in-depth, practical, and Catechism-grounded response for an adult learner.`;

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const candidateModels = [
      { model: 'gemini-3.1-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL },
      { model: 'gemini-3.8-flash', thinkingLevel: ThinkingLevel.LOW },
    ];

    let streamSuccess = false;
    let lastError: any = null;

    for (const candidate of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const stream = await ai.models.generateContentStream({
            model: candidate.model,
            contents: prompt,
            config: {
              systemInstruction: CATECHIST_SYSTEM_INSTRUCTION,
              temperature: 0.7,
              thinkingConfig: { thinkingLevel: candidate.thinkingLevel },
            },
          });

          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) {
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          }

          streamSuccess = true;
          break;
        } catch (err: any) {
          lastError = err;
          if (attempt < 2 && (err?.status === 503 || err?.message?.includes('503') || err?.message?.includes('high demand') || err?.status === 429)) {
            await new Promise((r) => setTimeout(r, 650));
            continue;
          }
          break;
        }
      }
      if (streamSuccess) break;
    }

    if (!streamSuccess) {
      const errorMsg = lastError?.message || 'Unable to reach Catechism AI service.';
      res.write(`data: ${JSON.stringify({ error: errorMsg })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('SSE Stream Handler Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message || 'Stream processing failed' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}
