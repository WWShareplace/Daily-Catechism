// Voice options for Gemini Natural Human TTS
export type AiVoiceName = 'Kore' | 'Fenrir' | 'Zephyr' | 'Puck' | 'Charon';

export interface VoiceOption {
  id: AiVoiceName;
  name: string;
  gender: 'female' | 'male' | 'neutral';
  tone: string;
}

export const AI_VOICES: VoiceOption[] = [
  { id: 'Kore', name: 'Kore', gender: 'female', tone: 'Warm, reverent & contemplative' },
  { id: 'Fenrir', name: 'Fenrir', gender: 'male', tone: 'Deep, steady & prayerful' },
  { id: 'Zephyr', name: 'Zephyr', gender: 'neutral', tone: 'Gentle, meditative & calm' },
  { id: 'Puck', name: 'Puck', gender: 'male', tone: 'Clear, articulate & engaging' },
  { id: 'Charon', name: 'Charon', gender: 'male', tone: 'Resonant & solemn' },
];

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let activeAudioUrl: string | null = null;

export async function playHumanAudio(
  text: string,
  voiceName: AiVoiceName = 'Kore',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<boolean> {
  stopAudio();

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      throw new Error(errJson?.error || `TTS server responded with ${response.status}`);
    }

    const audioBlob = await response.blob();
    if (activeAudioUrl) {
      URL.revokeObjectURL(activeAudioUrl);
    }
    const audioUrl = URL.createObjectURL(audioBlob);
    activeAudioUrl = audioUrl;

    const audio = new Audio();
    audio.src = audioUrl;
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      const errorDetail = audio.error ? `Code ${audio.error.code}: ${audio.error.message}` : 'Playback issue';
      console.warn('AI audio stream issue, falling back to browser speech synthesis:', errorDetail);
      currentAudio = null;
      speakWithBrowserSynthesis(text, onStart, onEnd, onError);
    };

    try {
      await audio.play();
      if (onStart) onStart();
      return true;
    } catch (playErr) {
      console.warn('Audio play() could not start, falling back to browser synthesis:', playErr);
      return speakWithBrowserSynthesis(text, onStart, onEnd, onError);
    }
  } catch (err) {
    console.warn('AI TTS server unavailable, using browser speech synthesis fallback:', err);
    return speakWithBrowserSynthesis(text, onStart, onEnd, onError);
  }
}

export function speakWithBrowserSynthesis(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Speech synthesis not available in this browser.'));
    return false;
  }

  stopAudio();

  const cleanText = text
    .replace(/[#*`_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.lang.startsWith('en')) && !v.name.includes('whisper')
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (onError) onError(e);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (activeAudioUrl) {
    URL.revokeObjectURL(activeAudioUrl);
    activeAudioUrl = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isAudioPlaying(): boolean {
  if (currentAudio && !currentAudio.paused && !currentAudio.ended) {
    return true;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

