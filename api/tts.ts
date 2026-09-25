import { GoogleGenAI, Modality } from '@google/genai';

function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const dataLength = pcmBuffer.length;
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);

  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  header.write('data', 36);
  header.writeUInt32LE(dataLength, 40);

  return Buffer.concat([header, pcmBuffer]);
}

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

  try {
    const { text, voiceName = 'Kore' } = req.body || {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text to speak is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured', fallbackAvailable: true });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2500);

    const promptText = `Read this Catholic Catechism reflection aloud in a calm, clear, warm, and reverent tone at a moderate, thoughtful pace:\n\n${cleanText}`;

    const selectedVoice = ['Kore', 'Puck', 'Fenrir', 'Zephyr', 'Charon'].includes(voiceName)
      ? voiceName
      : 'Kore';

    let rawBase64Audio: string | null = null;
    let lastError: any = null;

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
          await new Promise((r) => setTimeout(r, 750));
          continue;
        }
        break;
      }
    }

    if (!rawBase64Audio) {
      return res.status(500).json({
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
    return res.status(500).json({
      error: 'Failed to generate AI speech audio.',
      details: error.message,
      fallbackAvailable: true,
    });
  }
}
