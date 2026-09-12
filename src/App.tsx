import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DailyInsightView } from './components/DailyInsightView';
import { PillarsView } from './components/PillarsView';
import { PracticalGuidesView } from './components/PracticalGuidesView';
import { CccSearchView } from './components/CccSearchView';
import { AskCatechismView } from './components/AskCatechismView';
import { SavedAndJournalView } from './components/SavedAndJournalView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { ShareModal } from './components/ShareModal';
import { getDailyLookup, getAllDailyLookups } from './data/dailyEntries';
import { getLiturgicalContext } from './data/liturgy';
import { 
  playHumanAudio, 
  speakWithBrowserSynthesis, 
  stopAudio, 
  isAudioPlaying as checkAudioPlaying,
  AiVoiceName 
} from './lib/speech';
import { DailyLookup, CatechismPillar, SavedBookmark, UserNote } from './types';
import { BookOpen, ShieldCheck, Flame, Heart, Sparkles, Share2 } from 'lucide-react';

function parseInitialTab(): ActiveTab {
  if (typeof window === 'undefined') return 'daily';
  try {
    const hash = window.location.hash.replace(/^#/, '').toLowerCase().trim();
    if (['daily', 'pillars', 'guides', 'search', 'ask', 'saved'].includes(hash)) {
      return hash as ActiveTab;
    }
    const params = new URLSearchParams(window.location.search);
    const tabParam = (params.get('tab') || params.get('view'))?.toLowerCase().trim();
    if (tabParam && ['daily', 'pillars', 'guides', 'search', 'ask', 'saved'].includes(tabParam)) {
      return tabParam as ActiveTab;
    }
    const path = window.location.pathname.replace(/^\//, '').split('/')[0].toLowerCase().trim();
    if (path && ['daily', 'pillars', 'guides', 'search', 'ask', 'saved'].includes(path)) {
      return path as ActiveTab;
    }
  } catch {
    // ignore
  }
  return 'daily';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(parseInitialTab);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPillarForFilter, setSelectedPillarForFilter] = useState<CatechismPillar>(CatechismPillar.CREED);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  
  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [activeVoice, setActiveVoice] = useState<AiVoiceName>(() => {
    try {
      const saved = localStorage.getItem('ccc_voice');
      return (saved as AiVoiceName) || 'Kore';
    } catch {
      return 'Kore';
    }
  });
  const [useAiVoice, setUseAiVoice] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ccc_use_ai_voice');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [currentAudioText, setCurrentAudioText] = useState<string>('');
  const [currentAudioTitle, setCurrentAudioTitle] = useState<string>('');
  const [showAudioPlayer, setShowAudioPlayer] = useState<boolean>(false);

  // Local Storage Data
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('ccc_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<UserNote[]>(() => {
    try {
      const saved = localStorage.getItem('ccc_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedDays, setCompletedDays] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ccc_completed_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ccc_streak');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Liturgical context for selected date
  const liturgical = getLiturgicalContext(selectedDate);
  const currentDailyEntry = getDailyLookup(selectedDate);
  const allDailyEntries = getAllDailyLookups();

  // Sync voice settings
  useEffect(() => {
    try {
      localStorage.setItem('ccc_voice', activeVoice);
    } catch (e) {
      console.error(e);
    }
  }, [activeVoice]);

  useEffect(() => {
    try {
      localStorage.setItem('ccc_use_ai_voice', String(useAiVoice));
    } catch (e) {
      console.error(e);
    }
  }, [useAiVoice]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ccc_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('ccc_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('ccc_completed_days', JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  // Sync activeTab to URL hash and listen for browser history navigation
  useEffect(() => {
    try {
      const currentHash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (currentHash !== activeTab) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
    } catch {
      // ignore in environments with restricted history
    }
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const tab = parseInitialTab();
      setActiveTab(tab);
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Play a specific piece of text with title
  const handlePlayAudio = async (textToRead: string, title?: string) => {
    stopAudio();
    setIsAudioPlaying(false);
    setIsLoadingAudio(true);
    setCurrentAudioText(textToRead);
    setCurrentAudioTitle(title || currentDailyEntry.themeTitle);
    setShowAudioPlayer(true);

    if (useAiVoice) {
      try {
        await playHumanAudio(
          textToRead,
          activeVoice,
          () => {
            setIsLoadingAudio(false);
            setIsAudioPlaying(true);
          },
          () => {
            setIsAudioPlaying(false);
            setIsLoadingAudio(false);
          },
          (err) => {
            console.error('Audio playback error:', err);
            setIsAudioPlaying(false);
            setIsLoadingAudio(false);
          }
        );
      } catch {
        setIsAudioPlaying(false);
        setIsLoadingAudio(false);
      }
    } else {
      setIsLoadingAudio(false);
      setIsAudioPlaying(true);
      speakWithBrowserSynthesis(
        textToRead,
        () => setIsAudioPlaying(true),
        () => setIsAudioPlaying(false),
        () => setIsAudioPlaying(false)
      );
    }
  };

  // Toggle Daily Audio
  const handleToggleAudio = () => {
    if (isAudioPlaying || checkAudioPlaying()) {
      handleStopAudio();
    } else {
      const textToRead = `${currentDailyEntry.themeTitle}. Primary Catechism Reference: ${currentDailyEntry.primaryCccCitation}. The Catechism teaches: ${currentDailyEntry.officialCccText}. Scripture anchor from ${currentDailyEntry.scriptureCitation}: ${currentDailyEntry.scriptureText}. Living it today: ${currentDailyEntry.practicalTakeaway.headline}. ${currentDailyEntry.practicalTakeaway.contextForAdults}. Reflection: ${currentDailyEntry.practicalTakeaway.reflectionQuestion}. Prayer: ${currentDailyEntry.practicalTakeaway.prayer}`;
      handlePlayAudio(textToRead, `Day ${currentDailyEntry.dayOfYear}: ${currentDailyEntry.themeTitle}`);
    }
  };

  const handleStopAudio = () => {
    stopAudio();
    setIsAudioPlaying(false);
    setIsLoadingAudio(false);
  };

  const handleReplayAudio = () => {
    if (currentAudioText) {
      handlePlayAudio(currentAudioText, currentAudioTitle);
    } else {
      handleToggleAudio();
    }
  };

  // Stop audio on tab or date change
  useEffect(() => {
    stopAudio();
    setIsAudioPlaying(false);
    setIsLoadingAudio(false);
  }, [activeTab, selectedDate]);

  // Toggle Bookmark
  const handleToggleBookmark = (entry: DailyLookup) => {
    const exists = bookmarks.some(b => b.targetId === entry.id);
    if (exists) {
      setBookmarks(prev => prev.filter(b => b.targetId !== entry.id));
    } else {
      const newBm: SavedBookmark = {
        id: `bm-${Date.now()}`,
        targetId: entry.id,
        type: 'daily',
        title: entry.themeTitle,
        subtitle: entry.practicalTakeaway.headline,
        pillar: entry.pillar,
        savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setBookmarks(prev => [newBm, ...prev]);
    }
  };

  // Toggle Completed Day
  const handleToggleCompleted = (entryId: string) => {
    setCompletedDays(prev => {
      const exists = prev.includes(entryId);
      let updated: string[];
      if (exists) {
        updated = prev.filter(id => id !== entryId);
      } else {
        updated = [...prev, entryId];
        setStreakCount(c => c + 1);
        try {
          localStorage.setItem('ccc_streak', String(streakCount + 1));
        } catch {}
      }
      return updated;
    });
  };

  // Save Note for current entry
  const handleSaveNote = (noteText: string) => {
    if (!noteText.trim()) return;
    const existingIndex = notes.findIndex(n => n.entryId === currentDailyEntry.id);
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    if (existingIndex >= 0) {
      const updated = [...notes];
      updated[existingIndex] = {
        ...updated[existingIndex],
        noteText,
        updatedAt: dateStr,
      };
      setNotes(updated);
    } else {
      const newNote: UserNote = {
        id: `note-${Date.now()}`,
        entryId: currentDailyEntry.id,
        entryTitle: currentDailyEntry.themeTitle,
        entryType: 'daily',
        noteText,
        updatedAt: dateStr,
      };
      setNotes([newNote, ...notes]);
    }
  };

  // Find user note for current daily entry
  const currentNote = notes.find(n => n.entryId === currentDailyEntry.id)?.noteText || '';

  // Select a bookmark from Saved view
  const handleSelectBookmarkDaily = (dayId: string) => {
    const match = allDailyEntries.find(e => e.id === dayId);
    if (match) {
      setActiveTab('daily');
    }
  };

  const handleSelectPillarFromAnywhere = (pillar: CatechismPillar) => {
    setSelectedPillarForFilter(pillar);
    setActiveTab('pillars');
  };

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col font-sans selection:bg-amber-200 pb-20">
      {/* App Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liturgical={liturgical}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        textSize={textSize}
        setTextSize={setTextSize}
        bookmarkCount={bookmarks.length}
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'daily' && (
          <DailyInsightView
            entry={currentDailyEntry}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            isBookmarked={bookmarks.some(b => b.targetId === currentDailyEntry.id)}
            onToggleBookmark={handleToggleBookmark}
            isCompleted={completedDays.includes(currentDailyEntry.id)}
            onToggleCompleted={handleToggleCompleted}
            textSize={textSize}
            isAudioPlaying={isAudioPlaying}
            isLoadingAudio={isLoadingAudio}
            onToggleAudio={handleToggleAudio}
            onPlaySectionAudio={handlePlayAudio}
            onSelectPillar={handleSelectPillarFromAnywhere}
            userNote={currentNote}
            onSaveNote={handleSaveNote}
            onOpenShare={() => setIsShareModalOpen(true)}
          />
        )}

        {activeTab === 'pillars' && (
          <PillarsView
            dailyEntries={allDailyEntries}
            onSelectDailyEntry={(entry) => {
              setActiveTab('daily');
            }}
            selectedPillar={selectedPillarForFilter}
          />
        )}

        {activeTab === 'guides' && (
          <PracticalGuidesView
            onSelectPillar={handleSelectPillarFromAnywhere}
          />
        )}

        {activeTab === 'search' && (
          <CccSearchView
            onSelectPillar={handleSelectPillarFromAnywhere}
          />
        )}

        {activeTab === 'ask' && (
          <AskCatechismView />
        )}

        {activeTab === 'saved' && (
          <SavedAndJournalView
            bookmarks={bookmarks}
            onRemoveBookmark={(id) => setBookmarks(prev => prev.filter(b => b.id !== id))}
            onSelectBookmarkDaily={handleSelectBookmarkDaily}
            notes={notes}
            onDeleteNote={(id) => setNotes(prev => prev.filter(n => n.id !== id))}
            completedDays={completedDays}
            streakCount={streakCount}
          />
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      {(showAudioPlayer || isAudioPlaying || isLoadingAudio) && (
        <AudioPlayerBar
          isPlaying={isAudioPlaying}
          isLoading={isLoadingAudio}
          currentTitle={currentAudioTitle}
          activeVoice={activeVoice}
          onSelectVoice={(v) => {
            setActiveVoice(v);
            if (currentAudioText && isAudioPlaying) {
              // restart with new voice
              playHumanAudio(currentAudioText, v, () => setIsAudioPlaying(true), () => setIsAudioPlaying(false));
            }
          }}
          useAiVoice={useAiVoice}
          onToggleAiVoice={(useAi) => {
            setUseAiVoice(useAi);
            if (currentAudioText && isAudioPlaying) {
              handlePlayAudio(currentAudioText, currentAudioTitle);
            }
          }}
          onPlay={() => {
            if (currentAudioText) {
              handlePlayAudio(currentAudioText, currentAudioTitle);
            } else {
              handleToggleAudio();
            }
          }}
          onStop={handleStopAudio}
          onReplay={handleReplayAudio}
        />
      )}

      {/* Liturgical Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-8 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-2xl">
            <p className="font-semibold text-stone-200 font-display text-sm">
              Catholic Catechism Daily — Adult Faith Learning Companion
            </p>
            <p className="text-stone-300 leading-relaxed">
              <strong className="font-bold text-amber-300">
                Created by: Dan Bullock. All data and information provided in this app are sourced from public domain records and are free to use without restriction.
              </strong>
            </p>
            <p className="text-stone-400">
              Primary Reference: <em className="text-amber-200">Catechism of the Catholic Church (CCC)</em> promulgation of St. John Paul II (Fidei Depositum). Designed for inquirers, OCIA/RCIA candidates, converts, and returning Catholics.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-stone-400">
            <button
              id="footer-share-btn"
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 hover:border-amber-700/60 transition-colors font-medium shadow-xs"
              title="Share Web App & QR Code"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Web App</span>
            </button>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <button
              onClick={() => setActiveTab('daily')}
              className="hover:text-amber-300 transition-colors"
            >
              Today’s Insight
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('pillars')}
              className="hover:text-amber-300 transition-colors"
            >
              The 4 Pillars
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('guides')}
              className="hover:text-amber-300 transition-colors"
            >
              Adult Guides
            </button>
          </div>
        </div>
      </footer>

      {/* Share Modal with Web App QR Code */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activeTab={activeTab}
      />
    </div>
  );
}

