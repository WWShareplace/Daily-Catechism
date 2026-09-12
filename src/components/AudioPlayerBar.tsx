import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Settings2, 
  Loader2, 
  Radio, 
  User, 
  Check, 
  ChevronDown,
  X,
  RotateCcw
} from 'lucide-react';
import { AI_VOICES, AiVoiceName, VoiceOption } from '../lib/speech';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTitle: string;
  activeVoice: AiVoiceName;
  onSelectVoice: (voice: AiVoiceName) => void;
  useAiVoice: boolean;
  onToggleAiVoice: (useAi: boolean) => void;
  onPlay: () => void;
  onStop: () => void;
  onReplay: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  isLoading,
  currentTitle,
  activeVoice,
  onSelectVoice,
  useAiVoice,
  onToggleAiVoice,
  onPlay,
  onStop,
  onReplay,
}) => {
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  const currentVoiceObj = AI_VOICES.find(v => v.id === activeVoice) || AI_VOICES[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <div className="bg-stone-900/95 backdrop-blur-md text-stone-100 border border-stone-700/80 rounded-2xl shadow-2xl p-3 sm:p-4 transition-all">
        <div className="flex items-center justify-between gap-3">
          
          {/* Status & Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isPlaying 
                ? 'bg-amber-600/30 border-amber-500/50 text-amber-300 animate-pulse' 
                : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
              ) : isPlaying ? (
                <Radio className="w-5 h-5 text-amber-400" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {useAiVoice ? `Human AI Voice: ${currentVoiceObj.name}` : 'Device Speech'}
                </span>
                {isLoading && (
                  <span className="text-[11px] text-amber-400 animate-pulse">Generating voice...</span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium text-stone-200 truncate mt-0.5">
                {currentTitle || "Catholic Catechism Audio Companion"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Voice Selector Popover Toggle */}
            <div className="relative">
              <button
                id="voice-picker-menu-btn"
                onClick={() => setShowVoiceMenu(!showVoiceMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs transition-colors"
                title="Change Audio Voice & Tone"
              >
                <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-medium">Voices</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {/* Voice Menu Dropdown */}
              {showVoiceMenu && (
                <div className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl p-3 z-50 text-stone-200 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
                    <span className="font-semibold text-stone-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Narration Voice Options
                    </span>
                    <button 
                      onClick={() => setShowVoiceMenu(false)}
                      className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Mode Toggle: Natural Human AI vs Device */}
                  <div className="bg-stone-950 p-2 rounded-lg mb-3 border border-stone-800">
                    <p className="text-[11px] text-stone-400 mb-1.5">Audio Engine:</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => onToggleAiVoice(true)}
                        className={`px-2.5 py-1.5 rounded text-left transition-all flex items-center gap-1.5 ${
                          useAiVoice
                            ? 'bg-amber-900/60 text-amber-200 border border-amber-700/80 font-medium'
                            : 'bg-stone-800/60 text-stone-400 hover:bg-stone-800'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Human AI</span>
                      </button>
                      <button
                        onClick={() => onToggleAiVoice(false)}
                        className={`px-2.5 py-1.5 rounded text-left transition-all flex items-center gap-1.5 ${
                          !useAiVoice
                            ? 'bg-amber-900/60 text-amber-200 border border-amber-700/80 font-medium'
                            : 'bg-stone-800/60 text-stone-400 hover:bg-stone-800'
                        }`}
                      >
                        <User className="w-3.5 h-3.5 text-stone-300" />
                        <span>Device/Offline</span>
                      </button>
                    </div>
                  </div>

                  {/* Human AI Voice Presets */}
                  {useAiVoice ? (
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-stone-400">Natural Gemini AI Voices:</p>
                      {AI_VOICES.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            onSelectVoice(v.id);
                            setShowVoiceMenu(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg border transition-all flex items-start justify-between gap-2 ${
                            activeVoice === v.id
                              ? 'bg-amber-950/80 border-amber-700/80 text-amber-100 shadow-xs'
                              : 'bg-stone-800/50 border-stone-800 hover:bg-stone-800 text-stone-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-stone-100">{v.name}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-700 text-stone-300 uppercase">
                                {v.gender}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5">{v.tone}</p>
                          </div>
                          {activeVoice === v.id && (
                            <Check className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 text-stone-400 text-[11px] leading-relaxed">
                      Using your browser's built-in text-to-speech synthesis with automatic preferred natural English voice. Works offline without network latency.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Replay */}
            <button
              onClick={onReplay}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play / Stop Primary Button */}
            {isPlaying ? (
              <button
                id="stop-audio-bar-btn"
                onClick={onStop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-medium text-xs shadow-md transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                id="play-audio-bar-btn"
                onClick={onPlay}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs shadow-md transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>{isLoading ? 'Loading...' : 'Listen'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
