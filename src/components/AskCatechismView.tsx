import React, { useState, useRef } from 'react';
import { Sparkles, Send, BookOpen, AlertCircle, Copy, Check, HelpCircle, StopCircle, RefreshCw, Database } from 'lucide-react';
import Markdown from 'react-markdown';
import { CatechismPillar } from '../types';
import { generateCatechismFallbackAnswer } from '../lib/catechismFallback';

const SAMPLE_QUESTIONS = [
  'Why do Catholics confess sins to a priest instead of praying directly to God?',
  'How should an adult prepare for Confession after being away for 10+ years?',
  'What is the biblical and Catechism basis for the Real Presence in the Eucharist?',
  'How does the Catholic Church explain the problem of suffering and evil?',
  'What is the exact difference between mortal sin and venial sin?',
  'Why do Catholics honor Mary and ask saints in heaven to intercede?',
  'How do I form an adult moral conscience when facing difficult corporate ethics?',
];

export const AskCatechismView: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [learnerContext, setLearnerContext] = useState<string>('Inquirer / OCIA Candidate');
  const [selectedPillar, setSelectedPillar] = useState<string>('All Pillars');
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setLoading(false);
  };

  const handleSubmit = async (queryToAsk?: string) => {
    const q = (queryToAsk || question).trim();
    if (!q) return;

    // Abort previous in-flight request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setIsStreaming(true);
    setError(null);
    setFallbackNotice(null);
    setResponse('');

    // Safety timeout: 35 seconds max
    const timeoutId = setTimeout(() => {
      if (controller && !controller.signal.aborted) {
        controller.abort();
        setError('The inquiry timed out while awaiting the Catechism AI response. Please try again.');
        setLoading(false);
        setIsStreaming(false);
      }
    }, 35000);

    try {
      let accumulatedText = '';
      let streamFinished = false;

      // 1. Attempt streaming SSE endpoint
      try {
        const res = await fetch('/api/ask-catechism-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            userContext: learnerContext,
            selectedPillar: selectedPillar !== 'All Pillars' ? selectedPillar : undefined,
          }),
          signal: controller.signal,
        });

        if (res.ok && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();

          while (!streamFinished) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;

              const dataStr = trimmed.replace(/^data:\s*/, '');
              if (dataStr === '[DONE]') {
                streamFinished = true;
                break;
              }

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setResponse(accumulatedText);
                }
              } catch (e: any) {
                if (e.message && e.message !== 'Unexpected token') {
                  console.warn('SSE line parse issue:', e);
                }
              }
            }
          }
        }
      } catch (streamErr: any) {
        if (streamErr.name === 'AbortError') throw streamErr;
        console.warn('Streaming endpoint unavailable or returned error, falling back to standard JSON API:', streamErr);
      }

      // 2. If stream did not yield content, attempt standard JSON endpoint
      if (!accumulatedText.trim()) {
        try {
          const fallbackRes = await fetch('/api/ask-catechism', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: q,
              userContext: learnerContext,
              selectedPillar: selectedPillar !== 'All Pillars' ? selectedPillar : undefined,
            }),
            signal: controller.signal,
          });

          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (fallbackData.answer) {
              accumulatedText = fallbackData.answer;
              setResponse(accumulatedText);
            }
          }
        } catch (jsonErr: any) {
          if (jsonErr.name === 'AbortError') throw jsonErr;
          console.warn('JSON endpoint error, falling back to built-in Catechism knowledge database:', jsonErr);
        }
      }

      // 3. Resilient fallback: If server-side endpoints are unreachable (e.g. 405 on static CDN/Vercel rewrite, or offline),
      // synthesize a verified response directly from the authoritative Catechism database.
      if (!accumulatedText.trim()) {
        const fallbackResult = generateCatechismFallbackAnswer(q, learnerContext, selectedPillar);
        setResponse(fallbackResult.answer);
        setFallbackNotice('Grounded in official Catechism of the Catholic Church database & Sacred Scripture.');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User deliberately stopped or timeout fired
      } else {
        console.error('Ask Catechism Error:', err);
        // Even on unexpected error, provide the database fallback
        const fallbackResult = generateCatechismFallbackAnswer(q, learnerContext, selectedPillar);
        setResponse(fallbackResult.answer);
        setFallbackNotice('Grounded in official Catechism of the Catholic Church database & Sacred Scripture.');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Faith & Catechism Companion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
            Ask the Catechism
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            Have a question about Catholic doctrine, moral dilemmas, sacraments, or Church history? Ask below to receive an adult-level, charitable answer grounded directly in the <strong className="text-amber-200">Catechism of the Catholic Church</strong> with exact paragraph citations and practical applications.
          </p>
        </div>

        {/* Input Form */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Your Background:</label>
              <select
                value={learnerContext}
                onChange={(e) => setLearnerContext(e.target.value)}
                disabled={loading}
                className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
              >
                <option value="Inquirer / Exploring Faith">Inquirer / Exploring Catholic Faith</option>
                <option value="OCIA / RCIA Candidate">OCIA / RCIA Adult Candidate</option>
                <option value="Returning Catholic">Returning Catholic after time away</option>
                <option value="Practicing Adult Catholic">Practicing Catholic seeking deeper understanding</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Catechism Pillar Focus:</label>
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                disabled={loading}
                className="w-full p-2.5 bg-stone-950 border border-stone-700 rounded-lg text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
              >
                <option value="All Pillars">All Pillars</option>
                <option value={CatechismPillar.CREED}>Pillar 1: The Creed (Beliefs)</option>
                <option value={CatechismPillar.SACRAMENTS}>Pillar 2: Sacraments (Liturgy)</option>
                <option value={CatechismPillar.MORALITY}>Pillar 3: Morality (Commandments & Life)</option>
                <option value={CatechismPillar.PRAYER}>Pillar 4: Christian Prayer</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <textarea
              id="ask-catechism-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              placeholder="Ask anything (e.g. 'What does the Catholic Church teach about cremation vs burial?' or 'How do I explain the Pope’s authority to a non-Catholic friend?')..."
              rows={3}
              className="w-full p-4 pr-14 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans disabled:opacity-75"
            />

            {loading ? (
              <button
                type="button"
                onClick={handleStop}
                className="absolute right-3 bottom-3.5 p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-all flex items-center gap-1 text-xs"
                title="Stop generation"
              >
                <StopCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Stop</span>
              </button>
            ) : (
              <button
                id="submit-question-btn"
                onClick={() => handleSubmit()}
                disabled={!question.trim()}
                className="absolute right-3 bottom-3.5 p-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold disabled:opacity-50 transition-all flex items-center justify-center"
                title="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Starter Questions */}
      {!response && !loading && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Frequently Asked Questions by Adult Learners:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuestion(sq);
                  handleSubmit(sq);
                }}
                className="text-left p-3 rounded-xl bg-white border border-stone-200 hover:border-amber-500/80 hover:bg-stone-50/80 text-xs sm:text-sm text-stone-800 transition-all flex items-start gap-2 group"
              >
                <span className="text-amber-700 font-bold">›</span>
                <span className="group-hover:text-amber-900 font-medium">{sq}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading Indicator (before first streamed chunk) */}
      {loading && !response && (
        <div className="p-8 bg-white rounded-2xl border border-stone-200 text-center space-y-4 shadow-sm">
          <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1">
            <h4 className="font-bold text-stone-900 font-display text-base">
              Consulting the Catechism of the Catholic Church...
            </h4>
            <p className="text-xs text-stone-500">
              Gathering official CCC paragraphs, Scriptural foundations, and adult applications.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-sm">Error generating response</h5>
              <p className="text-xs mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 font-semibold rounded-lg text-xs flex items-center gap-1 shrink-0 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* AI Response Card (Progressive & Streaming) */}
      {response && (
        <article className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 sm:p-6 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-base font-display text-stone-50">
                Catechism Guide Response
              </h3>
              {isStreaming && (
                <span className="flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Generating...
                </span>
              )}
              {fallbackNotice && !isStreaming && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/60">
                  <Database className="w-3 h-3 text-amber-300" />
                  <span>Catechism Synthesis</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {loading && (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-1 text-xs text-rose-300 hover:text-rose-100 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 transition-colors"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              )}
              <button
                onClick={handleCopyResponse}
                disabled={isStreaming}
                className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2.5 py-1 rounded bg-stone-800 border border-stone-700 transition-colors disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Answer'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 font-sans text-stone-800 text-sm sm:text-base leading-relaxed">
            <div className="markdown-content space-y-4 [&>h3]:font-display [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-stone-900 [&>h3]:mt-6 [&>h3]:mb-2 [&>h4]:font-display [&>h4]:text-base [&>h4]:font-bold [&>h4]:text-stone-800 [&>h4]:mt-4 [&>h4]:mb-1 [&>p]:leading-relaxed [&>p]:text-stone-700 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>blockquote]:border-l-4 [&>blockquote]:border-amber-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-stone-50 [&>blockquote]:py-2 [&>blockquote]:my-3 [&>blockquote]:text-stone-700 [&>hr]:my-5 [&>hr]:border-stone-200">
              <Markdown>{response}</Markdown>
            </div>

            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-amber-600 animate-pulse ml-1 align-middle" />
            )}
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>Primary Reference: Catechism of the Catholic Church (CCC)</span>
              {fallbackNotice && (
                <span className="text-amber-800 font-medium">• {fallbackNotice}</span>
              )}
            </div>
            <button
              onClick={() => {
                setResponse(null);
                setQuestion('');
                setFallbackNotice(null);
              }}
              className="font-semibold text-amber-800 hover:underline"
            >
              Ask Another Question
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
