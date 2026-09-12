import React from 'react';
import { BookOpen, Sparkles, Compass, Search, Bookmark, Calendar, Volume2, VolumeX, Moon, Sun, Type, Share2, QrCode } from 'lucide-react';
import { LiturgicalContext } from '../data/liturgy';

export type ActiveTab = 'daily' | 'pillars' | 'guides' | 'search' | 'ask' | 'saved';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  liturgical: LiturgicalContext;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  bookmarkCount: number;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  liturgical,
  selectedDate,
  onDateChange,
  isAudioPlaying,
  onToggleAudio,
  textSize,
  setTextSize,
  bookmarkCount,
  onOpenShare,
}) => {
  const formatDateDisplay = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getSeasonColorBadge = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'purple':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'white':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'red':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Top Liturgical Banner */}
      <div className="bg-stone-950 px-4 py-1.5 border-b border-stone-800 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${getSeasonColorBadge(liturgical.color)}`}>
              {liturgical.season} ({liturgical.colorName})
            </span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <span className="truncate max-w-xs sm:max-w-md text-stone-300 font-medium">
              {liturgical.todaySaintOrFeast}
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span className="hidden md:inline">Day {liturgical.dayOfYear} of 365</span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="text-amber-200/90 font-serif italic text-[11px]">
              Catechism of the Catholic Church
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo & App Title */}
        <div 
          onClick={() => setActiveTab('daily')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-900/60 border border-amber-700/50 flex items-center justify-center text-amber-300 shadow-inner group-hover:border-amber-500 transition-colors shrink-0">
            <span className="font-serif font-bold text-xl tracking-tighter">☩</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-wide text-stone-50 font-display">
                Catechism Daily
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 font-mono">
                Adult Edition
              </span>
            </div>
            <p className="text-xs mt-1 text-stone-300 max-w-3xl leading-snug">
              <strong className="font-bold text-amber-300">
                Created by: Dan Bullock. All data and information provided in this app are sourced from public domain records and are free to use without restriction.
              </strong>
            </p>
          </div>
        </div>

        {/* Action Controls (Audio, Share, Font size, Bookmarks) */}
        <div className="flex items-center gap-2">
          {/* Share Applet / QR Code Button */}
          <button
            id="header-share-btn"
            onClick={onOpenShare}
            title="Share Web App & QR Code"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-stone-700 transition-all shadow-xs group"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Read Aloud Audio Toggle */}
          <button
            id="audio-read-toggle-btn"
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Stop Reading' : 'Listen to Today’s Insight'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              isAudioPlaying
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
            }`}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isAudioPlaying ? 'Stop Audio' : 'Listen Aloud'}</span>
          </button>

          {/* Text Size Switcher */}
          <div className="hidden sm:flex items-center bg-stone-800 rounded-md p-0.5 border border-stone-700 text-xs">
            <button
              onClick={() => setTextSize('normal')}
              className={`px-2 py-1 rounded transition-colors ${textSize === 'normal' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setTextSize('large')}
              className={`px-2 py-1 rounded transition-colors text-sm ${textSize === 'large' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
              title="Larger Font Size"
            >
              A+
            </button>
            <button
              onClick={() => setTextSize('xlarge')}
              className={`px-2 py-1 rounded transition-colors text-base ${textSize === 'xlarge' ? 'bg-stone-700 text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Saved Bookmarks & Notes Badge */}
          <button
            id="nav-saved-btn"
            onClick={() => setActiveTab('saved')}
            className={`relative p-2 rounded-md transition-colors ${
              activeTab === 'saved' ? 'bg-amber-900/50 text-amber-300 border border-amber-700' : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
            }`}
            title="Saved Bookmarks & Reflection Journal"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-between border-t border-stone-800/80 overflow-x-auto scrollbar-none">
        <div className="flex space-x-1 sm:space-x-2 py-1.5 min-w-max">
          <button
            id="tab-daily-insight"
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'daily'
                ? 'bg-amber-950 text-amber-200 border border-amber-800/80 shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Daily Insight</span>
          </button>

          <button
            id="tab-four-pillars"
            onClick={() => setActiveTab('pillars')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'pillars'
                ? 'bg-amber-950 text-amber-200 border border-amber-800/80 shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>The 4 Pillars</span>
          </button>

          <button
            id="tab-practical-guides"
            onClick={() => setActiveTab('guides')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'guides'
                ? 'bg-amber-950 text-amber-200 border border-amber-800/80 shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Adult How-To Guides</span>
          </button>

          <button
            id="tab-ccc-search"
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'search'
                ? 'bg-amber-950 text-amber-200 border border-amber-800/80 shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span>CCC Paragraph Lookup</span>
          </button>

          <button
            id="tab-ask-catechist"
            onClick={() => setActiveTab('ask')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'ask'
                ? 'bg-amber-950 text-amber-200 border border-amber-800/80 shadow-sm'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Ask the Catechism AI</span>
          </button>
        </div>

        {/* Date Selector Badge */}
        <div className="flex items-center gap-1 text-xs text-stone-400 py-1 pl-2">
          <Calendar className="w-3.5 h-3.5 text-stone-400" />
          <span className="hidden md:inline">{formatDateDisplay(selectedDate)}</span>
        </div>
      </div>
    </header>
  );
};
