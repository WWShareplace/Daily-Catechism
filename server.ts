import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Convert 24kHz 16-bit mono raw PCM to playable WAV Buffer
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const dataLength = pcmBuffer.length;
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);

  // RIFF header
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);

  // FMT subchunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // Linear PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // DATA subchunk
  header.write('data', 36);
  header.writeUInt32LE(dataLength, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// API: Natural Human-like AI Text-to-Speech using Gemini TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text to speak is required.' });
    }

    const ai = getAi();

    // Clean markdown/excess punctuation for clean narration
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2500); // safety cap for narration

    const promptText = `Read this Catholic Catechism reflection aloud in a calm, clear, warm, and reverent tone at a moderate, thoughtful pace:\n\n${cleanText}`;

    // Available Gemini TTS Voices: 'Kore', 'Puck', 'Fenrir', 'Zephyr', 'Charon'
    const selectedVoice = ['Kore', 'Puck', 'Fenrir', 'Zephyr', 'Charon'].includes(voiceName)
      ? voiceName
      : 'Kore';

    let rawBase64Audio: string | null = null;
    let lastError: any = null;

    // Retry once if temporary 503 high demand spike occurs
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: promptText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selectedVoice },
              },
            },
          },
        });

        const audioPart = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (audioPart && audioPart.data) {
          rawBase64Audio = audioPart.data;
          break;
        }
      } catch (err: any) {
        lastError = err;
        if (attempt < 2 && (err?.status === 503 || err?.message?.includes('503') || err?.message?.includes('high demand') || err?.status === 429)) {
          console.warn(`TTS 503/429 spike on attempt ${attempt}, retrying in 750ms...`);
          await new Promise((r) => setTimeout(r, 750));
          continue;
        }
        break;
      }
    }

    if (!rawBase64Audio) {
      const statusCode = lastError?.status === 503 || lastError?.message?.includes('503') ? 503 : 500;
      return res.status(statusCode).json({
        error: lastError?.message || 'TTS audio generation was unavailable.',
        fallbackAvailable: true,
      });
    }

    const rawPcm = Buffer.from(rawBase64Audio, 'base64');
    const wavBuffer = pcmToWav(rawPcm, 24000);

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', wavBuffer.length);
    return res.send(wavBuffer);
  } catch (error: any) {
    console.error('TTS Generation Error:', error);
    return res.status(500).json({
      error: 'Failed to generate AI speech audio.',
      details: error.message,
      fallbackAvailable: true,
    });
  }
});

// API: Ask the Catechism / Faith Inquirer Assistant (Streaming Support)
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

// Stream endpoint for real-time progressive response
app.post('/api/ask-catechism-stream', async (req, res) => {
  const { question, userContext, selectedPillar } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Set headers for Server-Sent Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const prompt = `User's question about the Catholic faith:
"${question}"

${selectedPillar ? `Context: Focusing on Pillar: ${selectedPillar}` : ''}
${userContext ? `Learner Context: ${userContext}` : ''}

Please provide an in-depth, practical, and Catechism-grounded response for an adult learner.`;

  try {
    const ai = getAi();
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
          console.warn(`Streaming attempt ${attempt} with ${candidate.model} encountered:`, err.message);
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
    console.error('SSE Stream Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message || 'Stream processing failed' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Non-streaming JSON endpoint with fallback & timeout guard
app.post('/api/ask-catechism', async (req, res) => {
  try {
    const { question, userContext, selectedPillar } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const prompt = `User's question about the Catholic faith:
"${question}"

${selectedPillar ? `Context: Focusing on Pillar: ${selectedPillar}` : ''}
${userContext ? `Learner Context: ${userContext}` : ''}

Please provide an in-depth, practical, and Catechism-grounded response for an adult learner.`;

    const ai = getAi();
    const candidateModels = [
      { model: 'gemini-3.1-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL },
      { model: 'gemini-3.8-flash', thinkingLevel: ThinkingLevel.LOW },
    ];

    let responseText: string | null = null;
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

          let accumulated = '';
          for await (const chunk of stream) {
            if (chunk.text) {
              accumulated += chunk.text;
            }
          }

          if (accumulated.trim()) {
            responseText = accumulated;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${candidate.model} attempt ${attempt} encountered:`, err?.message || err);
          lastError = err;
          if (attempt < 2 && (err?.status === 503 || err?.message?.includes('503') || err?.message?.includes('high demand') || err?.status === 429)) {
            await new Promise((r) => setTimeout(r, 650));
            continue;
          }
          break;
        }
      }
      if (responseText) break;
    }

    if (!responseText) {
      throw lastError || new Error('No response generated by Catechism assistant.');
    }

    return res.json({
      answer: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error generating catechism insight:', error);
    return res.status(500).json({
      error: 'Failed to process inquiry with the Catechism assistant. Please try again.',
      details: error.message,
    });
  }
});

// 404 handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.path });
});

// Setup Vite / Static handling
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback in dev mode if Vite middleware passes through
    app.get('*', async (req, res, next) => {
      try {
        const indexPath = path.join(process.cwd(), 'index.html');
        let html = await (await import('fs')).promises.readFile(indexPath, 'utf-8');
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1d' }));

    // For static file requests that were not found in dist, return 404 rather than index.html
    app.get(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot)$/, (req, res) => {
      res.status(404).send('Asset not found');
    });

    // SPA fallback: All other routes serve index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Catholic Catechism Daily server running on http://0.0.0.0:${PORT}`);
  });
}

start();
