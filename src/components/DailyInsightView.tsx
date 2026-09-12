import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Quote, 
  Sparkles, 
  PenTool, 
  Check, 
  Copy,
  Flame,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { DailyLookup, CatechismPillar } from '../types';
import { PILLARS_DATA } from '../data/pillars';

interface DailyInsightViewProps {
  entry: DailyLookup;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isBookmarked: boolean;
  onToggleBookmark: (entry: DailyLookup) => void;
  isCompleted: boolean;
  onToggleCompleted: (entryId: string) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  isAudioPlaying: boolean;
  isLoadingAudio?: boolean;
  onToggleAudio: () => void;
  onPlaySectionAudio?: (text: string, title?: string) => void;
  onSelectPillar: (pillar: CatechismPillar) => void;
  userNote: string;
  onSaveNote: (note: string) => void;
  onOpenShare?: () => void;
}

export const DailyInsightView: React.FC<DailyInsightViewProps> = ({
  entry,
  selectedDate,
  onDateChange,
  isBookmarked,
  onToggleBookmark,
  isCompleted,
  onToggleCompleted,
  textSize,
  isAudioPlaying,
  isLoadingAudio,
  onToggleAudio,
  onPlaySectionAudio,
  onSelectPillar,
  userNote,
  onSaveNote,
  onOpenShare,
}) => {
  const [noteInput, setNoteInput] = useState(userNote);
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const pillarInfo = PILLARS_DATA[entry.pillar];

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    onDateChange(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    onDateChange(next);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const handleSaveNoteLocal = () => {
    onSaveNote(noteInput);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2500);
  };

  const handleCopyReflection = () => {
    const shareText = `Catholic Catechism Daily Insight:
${entry.themeTitle} (${entry.primaryCccCitation})

Catechism:
${entry.officialCccText}

Scripture (${entry.scriptureCitation}):
${entry.scriptureText}

Living It Today:
${entry.practicalTakeaway.headline}

Prayer:
${entry.practicalTakeaway.prayer}`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleActionCheck = (idx: number) => {
    setCheckedActions(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Text scaling classes
  const getTextClasses = () => {
    switch (textSize) {
      case 'large':
        return {
          body: 'text-lg leading-relaxed',
          subhead: 'text-xl',
          heading: 'text-2xl sm:text-3xl',
          quote: 'text-xl leading-relaxed',
        };
      case 'xlarge':
        return {
          body: 'text-xl leading-loose',
          subhead: 'text-2xl',
          heading: 'text-3xl sm:text-4xl',
          quote: 'text-2xl leading-loose',
        };
      default:
        return {
          body: 'text-base leading-relaxed',
          subhead: 'text-lg',
          heading: 'text-xl sm:text-2xl',
          quote: 'text-lg leading-relaxed',
        };
    }
  };

  const textClass = getTextClasses();

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Date & Journey Navigator Header */}
      <div className="bg-white rounded-xl shadow-xs border border-stone-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            id="prev-day-btn"
            onClick={handlePrevDay}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="next-day-btn"
            onClick={handleNextDay}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="pl-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Day {entry.dayOfYear} of 365
            </p>
            <p className="text-sm sm:text-base font-bold text-stone-800 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-stone-400" />
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="jump-today-btn"
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            Jump to Today
          </button>

          {/* Mark as Completed for the day */}
          <button
            id="mark-completed-btn"
            onClick={() => onToggleCompleted(entry.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
            }`}
            title="Track your daily catechism habit"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Done'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            id="bookmark-entry-btn"
            onClick={() => onToggleBookmark(entry)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-600'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Insight'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-700" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Share Web App with QR Code */}
          {onOpenShare && (
            <button
              id="share-webapp-qr-btn"
              onClick={onOpenShare}
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-amber-800 transition-colors"
              title="Share Web App & QR Code"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
            </button>
          )}

          {/* Share / Copy Reflection Text */}
          <button
            id="share-entry-btn"
            onClick={handleCopyReflection}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
            title="Copy Reflection to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Daily Insight Card */}
      <article className="bg-white rounded-2xl shadow-sm border border-stone-200/90 overflow-hidden">
        {/* Card Header & Pillar Anchor */}
        <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 border-b border-stone-800 relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => onSelectPillar(entry.pillar)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-transform hover:scale-105 ${pillarInfo.colorClass.badge}`}
            >
              <span>Pillar {pillarInfo.number}: {pillarInfo.title}</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80">
              {entry.primaryCccCitation}
            </span>
          </div>

          <h2 className={`${textClass.heading} font-bold font-display text-amber-50 tracking-wide mb-3`}>
            {entry.themeTitle}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-reading italic">
            “{entry.practicalTakeaway.headline}”
          </p>

          <div className="mt-4 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">Latin:</span>
              <span className="italic font-serif">{pillarInfo.latinTitle}</span>
            </div>
            <button
              onClick={onToggleAudio}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
            >
              {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isAudioPlaying ? 'Stop Voice Reader' : 'Listen Aloud'}</span>
            </button>
          </div>
        </div>

        {/* Section 1: The Catechism Reference (Sacred Parchment Style) */}
        <div className="p-6 sm:p-8 bg-stone-50/70 border-b border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>The Catechism of the Catholic Church</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-mono">{entry.primaryCccCitation}</span>
              {onPlaySectionAudio && (
                <button
                  onClick={() => onPlaySectionAudio(
                    `Catechism of the Catholic Church, paragraph ${entry.primaryCccCitation}. ${entry.officialCccText}`,
                    `CCC ${entry.primaryCccCitation}`
                  )}
                  className="p-1 rounded hover:bg-stone-200 text-stone-600 hover:text-amber-800 transition-colors"
                  title="Listen to this Catechism passage in human voice"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <blockquote className="relative p-5 sm:p-6 bg-white rounded-xl border-l-4 border-amber-800 shadow-xs">
            <Quote className="w-8 h-8 text-amber-200/80 absolute top-3 right-3 pointer-events-none" />
            <p className={`${textClass.quote} font-reading text-stone-800 italic`}>
              {entry.officialCccText}
            </p>

            {entry.secondaryCccQuotes && entry.secondaryCccQuotes.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
                {entry.secondaryCccQuotes.map((sec, i) => (
                  <div key={i} className="text-sm sm:text-base font-reading text-stone-700">
                    <span className="font-semibold text-amber-900 mr-2">[{sec.citation}]</span>
                    <span>{sec.text}</span>
                  </div>
                ))}
              </div>
            )}
          </blockquote>
        </div>

        {/* Section 2: Biblical Foundation */}
        <div className="p-6 sm:p-8 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Scriptural Anchor</span>
            </div>
            {onPlaySectionAudio && (
              <button
                onClick={() => onPlaySectionAudio(
                  `Scripture from ${entry.scriptureCitation}. ${entry.scriptureText}`,
                  `Scripture: ${entry.scriptureCitation}`
                )}
                className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-amber-700 transition-colors"
                title="Listen to Scripture passage"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-200/60">
            <p className={`${textClass.body} font-reading text-stone-800 mb-2 font-medium`}>
              {entry.scriptureText}
            </p>
            <p className="text-xs font-semibold text-amber-900 tracking-wide font-sans">
              — {entry.scriptureCitation}
            </p>
          </div>
        </div>

        {/* Section 3: Living It Today (The Adult Practical Application) */}
        <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Flame className="w-4 h-4 text-emerald-700" />
              <span>Living It Today: Practical Adult Application</span>
            </div>
            {onPlaySectionAudio && (
              <button
                onClick={() => onPlaySectionAudio(
                  `Living it today. ${entry.practicalTakeaway.contextForAdults}. Today's actions: ${entry.practicalTakeaway.livingItToday.join('. ')}`,
                  `Living It Today: ${entry.themeTitle}`
                )}
                className="p-1 rounded hover:bg-emerald-100 text-emerald-800 transition-colors"
                title="Listen to practical application"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <p className={`${textClass.body} text-stone-700 font-sans`}>
              {entry.practicalTakeaway.contextForAdults}
            </p>

            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Concrete Actions for Today:
              </h4>
              <ul className="space-y-2.5">
                {entry.practicalTakeaway.livingItToday.map((action, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => toggleActionCheck(idx)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      checkedActions[idx] 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-stone-300 group-hover:border-emerald-500 bg-white'
                    }`}>
                      {checkedActions[idx] && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-sm sm:text-base font-sans transition-all ${
                      checkedActions[idx] ? 'line-through text-stone-400' : 'text-stone-800'
                    }`}>
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Common Adult Misconception Clarified */}
        {entry.commonMisconception && (
          <div className="p-6 sm:p-8 border-b border-stone-200 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900 mb-3">
              <HelpCircle className="w-4 h-4 text-rose-600" />
              <span>Common Misconception Clarified</span>
            </div>

            <div className="bg-rose-50/50 rounded-xl p-5 border border-rose-200/70 space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-rose-800 text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100">
                  Myth
                </span>
                <p className="text-sm sm:text-base font-semibold text-rose-950">
                  {entry.commonMisconception.myth}
                </p>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-rose-200/60">
                <span className="font-bold text-emerald-800 text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100">
                  Reality
                </span>
                <div>
                  <p className="text-sm sm:text-base text-stone-800">
                    {entry.commonMisconception.clarification}
                  </p>
                  <p className="text-xs text-stone-500 font-mono mt-1">
                    Reference: {entry.commonMisconception.cccReference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Key Terms & Definitions */}
        {entry.keyTerms && entry.keyTerms.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
              Key Catholic Terms in Plain English:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entry.keyTerms.map((term, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                  <p className="font-bold text-stone-900 text-sm font-sans mb-1">{term.term}</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-normal">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Saint of the Day / Church Father Quote */}
        {entry.saintOrQuote && (
          <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-900 text-stone-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Quote className="w-4 h-4" />
                <span>Voice of the Saints</span>
              </div>
              {onPlaySectionAudio && (
                <button
                  onClick={() => onPlaySectionAudio(
                    `Saint reflection from ${entry.saintOrQuote?.author}. ${entry.saintOrQuote?.quote}`,
                    `Saint Quote: ${entry.saintOrQuote?.author}`
                  )}
                  className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors"
                  title="Listen to Saint Quote"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <blockquote className="font-reading text-base sm:text-lg italic text-amber-50 mb-2">
              {entry.saintOrQuote.quote}
            </blockquote>
            <p className="text-xs sm:text-sm font-semibold text-amber-300">
              — {entry.saintOrQuote.author} {entry.saintOrQuote.context && <span className="text-stone-400 font-normal">({entry.saintOrQuote.context})</span>}
            </p>
          </div>
        )}

        {/* Section 7: Daily Reflection Prompt & Prayer */}
        <div className="p-6 sm:p-8 bg-amber-50/60 border-b border-stone-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
            Daily Reflection Question
          </h4>
          <p className="text-base sm:text-lg font-semibold text-stone-900 font-reading mb-5">
            “{entry.practicalTakeaway.reflectionQuestion}”
          </p>

          <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Daily Prayer</span>
              </div>
              {onPlaySectionAudio && (
                <button
                  onClick={() => onPlaySectionAudio(
                    `Let us pray. ${entry.practicalTakeaway.prayer}`,
                    `Daily Prayer: Day ${entry.dayOfYear}`
                  )}
                  className="p-1 rounded hover:bg-amber-100 text-amber-800 transition-colors"
                  title="Listen to this prayer read in reverent human voice"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base font-reading text-stone-800 italic leading-relaxed">
              {entry.practicalTakeaway.prayer}
            </p>
          </div>
        </div>

        {/* Section 8: Interactive Reflection Journal Box */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
              <PenTool className="w-4 h-4 text-amber-700" />
              <span>My Personal Reflection Journal</span>
            </div>
            {isNoteSaved && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Note Saved
              </span>
            )}
          </div>

          <div className="space-y-3">
            <textarea
              id="reflection-journal-textarea"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Jot down what the Holy Spirit is stirring in your heart today, questions for your priest/sponsor, or a personal commitment..."
              rows={3}
              className="w-full p-3.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50 font-sans"
            />
            <div className="flex justify-end">
              <button
                id="save-journal-note-btn"
                onClick={handleSaveNoteLocal}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold tracking-wide transition-colors"
              >
                Save to Faith Journal
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Quick Topic Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-semibold text-stone-500">Related Themes:</span>
        {entry.tags.map((t, i) => (
          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-stone-200/80 text-stone-700 font-medium">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
};
