import React, { useState } from 'react';
import { Bookmark, PenTool, Trash2, ArrowRight, CheckCircle2, Flame, Calendar, Download, Sparkles } from 'lucide-react';
import { SavedBookmark, UserNote, DailyLookup } from '../types';
import { PILLARS_DATA } from '../data/pillars';

interface SavedAndJournalViewProps {
  bookmarks: SavedBookmark[];
  onRemoveBookmark: (id: string) => void;
  onSelectBookmarkDaily: (dayId: string) => void;
  notes: UserNote[];
  onDeleteNote: (id: string) => void;
  completedDays: string[];
  streakCount: number;
}

export const SavedAndJournalView: React.FC<SavedAndJournalViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  onSelectBookmarkDaily,
  notes,
  onDeleteNote,
  completedDays,
  streakCount,
}) => {
  const [activeSection, setActiveSection] = useState<'bookmarks' | 'journal' | 'progress'>('bookmarks');

  const handleExportJournal = () => {
    if (notes.length === 0) return;
    const text = notes
      .map(
        n => `[${n.updatedAt}] ${n.entryTitle} (${n.entryType})\n----------------------------------------\n${n.noteText}\n\n`
      )
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catholic-Catechism-Journal-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top Banner & Journey Progress */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Study & Reflection Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-50">
              Saved Bookmarks & Journal
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Review your saved daily insights, personal prayer notes, and 365-day Catechism learning journey.
            </p>
          </div>

          {/* Streak & Completion Badge */}
          <div className="flex items-center gap-3 bg-stone-950/90 border border-stone-800 p-3.5 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-amber-900/50 border border-amber-700/50 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">Daily Streak</p>
              <p className="text-lg font-bold text-stone-100">{streakCount} Days Active</p>
            </div>
          </div>
        </div>

        {/* Progress Bar for 365 days */}
        <div className="mt-6 pt-5 border-t border-stone-800 space-y-2">
          <div className="flex justify-between text-xs text-stone-400">
            <span>365-Day Journey Progress</span>
            <span className="font-bold text-amber-300">{completedDays.length} / 365 Days Completed</span>
          </div>
          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(2, (completedDays.length / 365) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-stone-200 gap-4">
        <button
          onClick={() => setActiveSection('bookmarks')}
          className={`pb-3 text-sm font-bold tracking-wide flex items-center gap-2 border-b-2 transition-all ${
            activeSection === 'bookmarks'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmarked Insights ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('journal')}
          className={`pb-3 text-sm font-bold tracking-wide flex items-center gap-2 border-b-2 transition-all ${
            activeSection === 'journal'
              ? 'border-amber-800 text-amber-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Faith Journal Notes ({notes.length})</span>
        </button>
      </div>

      {/* Bookmarks Tab Content */}
      {activeSection === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
              <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-lg font-bold text-stone-800">No saved bookmarks yet</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                While exploring Daily Insights, click the bookmark icon to save key teachings and prayers here for quick access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((bm) => {
                const pInfo = PILLARS_DATA[bm.pillar];
                return (
                  <div
                    key={bm.id}
                    className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${pInfo.colorClass.badge}`}>
                          Pillar {pInfo.number}: {pInfo.title}
                        </span>
                        <button
                          onClick={() => onRemoveBookmark(bm.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-bold text-stone-900 text-base font-display mb-1">
                        {bm.title}
                      </h4>
                      {bm.subtitle && (
                        <p className="text-xs text-stone-600 line-clamp-2 mb-3">{bm.subtitle}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">Saved {bm.savedAt}</span>
                      <button
                        onClick={() => onSelectBookmarkDaily(bm.targetId)}
                        className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950"
                      >
                        <span>Open Insight</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Journal Notes Tab Content */}
      {activeSection === 'journal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {notes.length} Personal Reflection Entries
            </span>
            {notes.length > 0 && (
              <button
                onClick={handleExportJournal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Journal (.txt)</span>
              </button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
              <PenTool className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-lg font-bold text-stone-800">Your Faith Journal is empty</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                Write down your personal thoughts, questions, or prayers at the bottom of any Daily Insight, and they will be archived here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base font-display">
                        {n.entryTitle}
                      </h4>
                      <p className="text-xs text-stone-400">{n.updatedAt}</p>
                    </div>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1.5"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-stone-800 text-sm sm:text-base font-sans leading-relaxed whitespace-pre-line">
                    {n.noteText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
