import React, { useState } from 'react';
import { BookOpen, Sparkles, Compass, ArrowRight, ShieldCheck, Heart, Users, Flame } from 'lucide-react';
import { CatechismPillar, DailyLookup } from '../types';
import { PILLARS_DATA, PillarInfo } from '../data/pillars';

interface PillarsViewProps {
  dailyEntries: DailyLookup[];
  onSelectDailyEntry: (entry: DailyLookup) => void;
  selectedPillar?: CatechismPillar;
}

export const PillarsView: React.FC<PillarsViewProps> = ({
  dailyEntries,
  onSelectDailyEntry,
  selectedPillar: initialSelectedPillar,
}) => {
  const [activePillar, setActivePillar] = useState<CatechismPillar>(
    initialSelectedPillar || CatechismPillar.CREED
  );

  const pillarsList: PillarInfo[] = Object.values(PILLARS_DATA);
  const currentPillarInfo = PILLARS_DATA[activePillar];

  const matchingEntries = dailyEntries.filter(e => e.pillar === activePillar);

  const getPillarIcon = (p: CatechismPillar) => {
    switch (p) {
      case CatechismPillar.CREED:
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      case CatechismPillar.SACRAMENTS:
        return <Flame className="w-5 h-5 text-rose-500" />;
      case CatechismPillar.MORALITY:
        return <Heart className="w-5 h-5 text-emerald-500" />;
      case CatechismPillar.PRAYER:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Intro Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
            <Compass className="w-3.5 h-3.5" />
            <span>Architecture of Catholic Faith</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
            The 4 Pillars of the Catechism
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            The Catechism is organized around four fundamental pillars that have sustained the Church for 2,000 years: <strong className="text-amber-200">What we believe</strong> (The Creed), <strong className="text-rose-200">How we celebrate</strong> (The Sacraments), <strong className="text-emerald-200">How we live & decide</strong> (Moral Life), and <strong className="text-indigo-200">How we converse with God</strong> (Prayer).
          </p>
        </div>
      </div>

      {/* 4 Pillars Tab Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillarsList.map((p) => {
          const isSelected = p.id === activePillar;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`text-left p-5 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-white shadow-md border-amber-500 ring-2 ring-amber-500/20'
                  : 'bg-stone-100/70 hover:bg-white border-stone-200 text-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Pillar {p.number}
                </span>
                {getPillarIcon(p.id)}
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1 font-display">
                {p.title}
              </h3>
              <p className="text-xs font-mono text-stone-500 mb-2">{p.cccRange}</p>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {p.theme}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Deep Dive */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${currentPillarInfo.colorClass.badge}`}>
                Pillar {currentPillarInfo.number}
              </span>
              <span className="text-xs font-mono text-stone-500">{currentPillarInfo.cccRange}</span>
              <span className="text-xs italic font-serif text-stone-600">• {currentPillarInfo.latinTitle}</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-display">
              {currentPillarInfo.title} ({currentPillarInfo.theme})
            </h3>
          </div>
        </div>

        {/* Practical Question & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Overview & Teaching
            </h4>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {currentPillarInfo.summary}
            </p>
          </div>

          <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200/80 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              The Essential Question for Adults
            </h4>
            <p className="text-base font-reading italic text-stone-900 font-medium leading-snug">
              “{currentPillarInfo.practicalQuestion}”
            </p>
          </div>
        </div>

        {/* Core Themes Chips */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Core Thematic Areas in this Pillar:
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentPillarInfo.coreThemes.map((theme, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
              >
                ✓ {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Available Daily Lookups in this Pillar */}
        <div className="pt-4 border-t border-stone-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-4">
            Curated Daily Insights in Pillar {currentPillarInfo.number} ({matchingEntries.length} Available):
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectDailyEntry(entry)}
                className="p-5 rounded-xl border border-stone-200 hover:border-amber-500/80 hover:bg-stone-50/80 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-amber-900">Day {entry.dayOfYear}</span>
                    <span className="font-mono">{entry.primaryCccCitation}</span>
                  </div>
                  <h5 className="font-bold text-stone-900 group-hover:text-amber-900 text-base mb-2 font-display">
                    {entry.themeTitle}
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mb-4 font-reading italic">
                    “{entry.practicalTakeaway.headline}”
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-amber-800 group-hover:text-amber-700">
                  <span>Read Full Catechism Insight</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
