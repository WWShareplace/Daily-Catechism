import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Sparkles, Copy, Check, Filter, ArrowRight } from 'lucide-react';
import { CCC_SEARCH_DATABASE, CccSearchEntry } from '../data/cccDatabase';
import { CatechismPillar } from '../types';
import { PILLARS_DATA } from '../data/pillars';

interface CccSearchViewProps {
  onSelectPillar: (pillar: CatechismPillar) => void;
}

export const CccSearchView: React.FC<CccSearchViewProps> = ({ onSelectPillar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>('ALL');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredEntries = useMemo(() => {
    return CCC_SEARCH_DATABASE.filter(entry => {
      const matchesPillar = selectedPillarFilter === 'ALL' || entry.pillar === selectedPillarFilter;
      
      if (!searchTerm.trim()) return matchesPillar;

      const q = searchTerm.toLowerCase().trim();
      const numMatch = String(entry.paragraphNumber).includes(q) || `ccc ${entry.paragraphNumber}`.includes(q);
      const titleMatch = entry.title.toLowerCase().includes(q);
      const topicMatch = entry.topic.toLowerCase().includes(q);
      const textMatch = entry.fullText.toLowerCase().includes(q);
      const tagMatch = entry.tags.some(t => t.toLowerCase().includes(q));

      return matchesPillar && (numMatch || titleMatch || topicMatch || textMatch || tagMatch);
    });
  }, [searchTerm, selectedPillarFilter]);

  const handleCopyParagraph = (entry: CccSearchEntry, idx: number) => {
    const text = `Catechism of the Catholic Church (CCC ${entry.paragraphNumber}):
${entry.fullText}

Practical Point:
${entry.keyPracticalPoint}`;

    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Search Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800/80">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Catechism Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
            CCC Paragraph & Topic Lookup
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            Look up exact paragraph numbers (e.g. <span className="text-amber-200 font-mono">1374</span>, <span className="text-amber-200 font-mono">1441</span>, <span className="text-amber-200 font-mono">1776</span>) or search essential themes like <em className="text-stone-200">Eucharist, Conscience, Trinity, Confession, Subsidiarity, or Prayer</em>.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="ccc-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by paragraph # (e.g. 1374) or topic (e.g. 'mortal sin', 'Eucharist', 'forgiveness')..."
              className="w-full pl-11 pr-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
          </div>

          {/* Pillar Filter Selector */}
          <div className="sm:w-60">
            <select
              id="ccc-pillar-filter"
              value={selectedPillarFilter}
              onChange={(e) => setSelectedPillarFilter(e.target.value)}
              className="w-full py-3 px-3.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            >
              <option value="ALL">All 4 Pillars</option>
              <option value={CatechismPillar.CREED}>Pillar 1: Creed</option>
              <option value={CatechismPillar.SACRAMENTS}>Pillar 2: Sacraments</option>
              <option value={CatechismPillar.MORALITY}>Pillar 3: Moral Life</option>
              <option value={CatechismPillar.PRAYER}>Pillar 4: Prayer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Showing {filteredEntries.length} Catechism entries</span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-amber-800 font-semibold hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Results Cards List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-lg font-bold text-stone-800">No matching paragraphs found</h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Try searching a broader term like “grace”, “sacrament”, “mercy”, or test our interactive AI assistant for custom questions!
            </p>
          </div>
        ) : (
          filteredEntries.map((entry, idx) => {
            const pillarInfo = PILLARS_DATA[entry.pillar];
            return (
              <article
                key={entry.paragraphNumber}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs hover:border-stone-300 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-amber-900 bg-amber-100/70 border border-amber-300/80 px-2.5 py-0.5 rounded-md">
                      CCC {entry.paragraphNumber}
                    </span>
                    <button
                      onClick={() => onSelectPillar(entry.pillar)}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${pillarInfo.colorClass.badge}`}
                    >
                      Pillar {pillarInfo.number}: {pillarInfo.title}
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyParagraph(entry, idx)}
                    className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors"
                    title="Copy Paragraph Citation"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mb-3">Topic: {entry.topic}</p>
                  
                  <blockquote className="p-4 bg-stone-50 rounded-lg border-l-4 border-amber-800 text-stone-800 font-reading text-sm sm:text-base italic leading-relaxed">
                    “{entry.fullText}”
                  </blockquote>
                </div>

                <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs sm:text-sm text-stone-800">
                  <span className="font-bold text-amber-900 mr-2">Practical Adult Point:</span>
                  <span>{entry.keyPracticalPoint}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {entry.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      onClick={() => setSearchTerm(tag)}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
