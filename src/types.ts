export enum CatechismPillar {
  CREED = 'CREED',
  SACRAMENTS = 'SACRAMENTS',
  MORALITY = 'MORALITY',
  PRAYER = 'PRAYER',
}

export interface CccParagraphRef {
  num: number;
  text: string;
}

export interface PracticalTakeaway {
  headline: string;
  contextForAdults: string;
  livingItToday: string[];
  reflectionQuestion: string;
  prayer: string;
}

export interface CommonMisconception {
  myth: string;
  clarification: string;
  cccReference: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface DailyLookup {
  id: string;
  dayOfYear: number;
  dateKey?: string; // e.g. "09-01"
  themeTitle: string;
  pillar: CatechismPillar;
  primaryCccCitation: string;
  cccParagraphs: number[];
  officialCccText: string;
  secondaryCccQuotes?: { citation: string; text: string }[];
  scriptureCitation: string;
  scriptureText: string;
  practicalTakeaway: PracticalTakeaway;
  commonMisconception?: CommonMisconception;
  keyTerms?: KeyTerm[];
  tags: string[];
  saintOrQuote?: {
    author: string;
    quote: string;
    context?: string;
  };
}

export interface PracticalGuideStep {
  stepNumber?: number;
  title: string;
  explanation: string;
  practicalTip: string;
  cccRef?: string;
}

export interface PracticalGuideFaq {
  question: string;
  answer: string;
  cccRef: string;
}

export interface PracticalTopicGuide {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mass & Liturgy' | 'Confession & Reconciliation' | 'Moral Decisions & Work' | 'Daily Prayer Habits' | 'Creed & Big Questions' | 'Adult Catholic Living';
  pillar: CatechismPillar;
  estimatedReadTime: string;
  summary: string;
  cccSections: string;
  steps: PracticalGuideStep[];
  faqs: PracticalGuideFaq[];
  quickCheatSheet?: string[];
}

export interface UserNote {
  id: string;
  entryId: string;
  entryTitle: string;
  entryType: 'daily' | 'guide' | 'lookup';
  noteText: string;
  updatedAt: string;
}

export interface SavedBookmark {
  id: string;
  targetId: string;
  type: 'daily' | 'guide';
  title: string;
  subtitle?: string;
  pillar: CatechismPillar;
  savedAt: string;
}

export interface AskAiResponse {
  answer: string;
  cccCitations: string[];
  scriptureReferences: string[];
  practicalApplication: string[];
  recommendedDailyTopics?: string[];
}
