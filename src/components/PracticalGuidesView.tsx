import React, { useState } from 'react';
import { Sparkles, BookOpen, Check, HelpCircle, FileText, ArrowRight, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { PRACTICAL_GUIDES } from '../data/practicalGuides';
import { PracticalTopicGuide, CatechismPillar } from '../types';
import { PILLARS_DATA } from '../data/pillars';

interface PracticalGuidesViewProps {
  onSelectPillar: (pillar: CatechismPillar) => void;
}

export const PracticalGuidesView: React.FC<PracticalGuidesViewProps> = ({ onSelectPillar }) => {
  const [selectedGuide, setSelectedGuide] = useState<PracticalTopicGuide>(PRACTICAL_GUIDES[0]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex(prev => (prev === idx ? null : idx));
  };

  const handleCopyCheatSheet = () => {
    if (!selectedGuide.quickCheatSheet) return;
    const text = `${selectedGuide.title} - Quick Reference Sheet:\n\n` + selectedGuide.quickCheatSheet.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2500);
  };

  const pillarInfo = PILLARS_DATA[selectedGuide.pillar];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Intro Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adult Faith in Action</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
            Practical Adult How-To Guides
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            Clear, step-by-step instructions grounded in the Catechism for navigating Catholic sacraments, liturgy, workplace ethics, and daily prayer habits without confusion or anxiety.
          </p>
        </div>
      </div>

      {/* Guide Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRACTICAL_GUIDES.map((guide) => {
          const isSelected = guide.id === selectedGuide.id;
          return (
            <button
              key={guide.id}
              onClick={() => {
                setSelectedGuide(guide);
                setExpandedFaqIndex(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white shadow-md border-amber-600 ring-2 ring-amber-500/20'
                  : 'bg-stone-100/80 hover:bg-white border-stone-200 text-stone-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-amber-800">
                    {guide.category}
                  </span>
                  <span>{guide.estimatedReadTime}</span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm sm:text-base font-display line-clamp-2 mb-1">
                  {guide.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-500 mt-2">{guide.cccSections}</span>
            </button>
          );
        })}
      </div>

      {/* Active Guide Content */}
      <article className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-stone-50/70 border-b border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-200 text-stone-800">
                {selectedGuide.category}
              </span>
              <button
                onClick={() => onSelectPillar(selectedGuide.pillar)}
                className={`text-xs font-bold px-2.5 py-1 rounded-md border ${pillarInfo.colorClass.badge}`}
              >
                Pillar {pillarInfo.number}: {pillarInfo.title}
              </button>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
              Primary Reference: {selectedGuide.cccSections}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display mb-2">
            {selectedGuide.title}
          </h3>
          <p className="text-sm sm:text-base text-stone-600 font-reading italic">
            {selectedGuide.subtitle}
          </p>
        </div>

        {/* Quick Cheat Sheet / Checklist (if present) */}
        {selectedGuide.quickCheatSheet && (
          <div className="px-6 sm:px-8">
            <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Quick Reference / Cheat Sheet</span>
                </div>
                <button
                  onClick={handleCopyCheatSheet}
                  className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950"
                >
                  {copiedCheatSheet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCheatSheet ? 'Copied!' : 'Copy Sheet'}</span>
                </button>
              </div>

              <div className="space-y-2">
                {selectedGuide.quickCheatSheet.map((item, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-stone-800 font-sans flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step-by-Step Breakdown */}
        <div className="px-6 sm:px-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Step-by-Step Walkthrough
          </h4>

          <div className="space-y-4">
            {selectedGuide.steps.map((step, index) => (
              <div key={index} className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-stone-900 text-stone-100 font-bold text-xs flex items-center justify-center">
                      {step.stepNumber || index + 1}
                    </span>
                    <h5 className="font-bold text-stone-900 text-base font-display">
                      {step.title}
                    </h5>
                  </div>
                  {step.cccRef && (
                    <span className="text-xs font-mono text-stone-500">{step.cccRef}</span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans pl-10">
                  {step.explanation}
                </p>

                {step.practicalTip && (
                  <div className="ml-10 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-2">
                    <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-amber-100 shrink-0">
                      Pro-Tip
                    </span>
                    <span>{step.practicalTip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {selectedGuide.faqs && selectedGuide.faqs.length > 0 && (
          <div className="px-6 sm:px-8 pb-8 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Frequently Asked Questions for Adults</span>
            </h4>

            <div className="space-y-3">
              {selectedGuide.faqs.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-xl border border-stone-200 overflow-hidden bg-stone-50/50">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm sm:text-base hover:bg-stone-100/70 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-sm sm:text-base text-stone-700 border-t border-stone-200/60 bg-white space-y-2">
                        <p className="leading-relaxed">{faq.answer}</p>
                        <p className="text-xs font-mono text-amber-900 font-semibold">
                          Catechism Citation: {faq.cccRef}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
