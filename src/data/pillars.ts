import { CatechismPillar } from '../types';

export interface PillarInfo {
  id: CatechismPillar;
  number: number;
  title: string;
  latinTitle: string;
  theme: string;
  cccRange: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    lightBg: string;
    accent: string;
  };
  summary: string;
  practicalQuestion: string;
  coreThemes: string[];
}

export const PILLARS_DATA: Record<CatechismPillar, PillarInfo> = {
  [CatechismPillar.CREED]: {
    id: CatechismPillar.CREED,
    number: 1,
    title: 'The Profession of Faith',
    latinTitle: 'Lex Credendi',
    theme: 'What the Church Believes',
    cccRange: 'CCC 26–1065',
    colorClass: {
      bg: 'bg-amber-900',
      text: 'text-amber-900',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      lightBg: 'bg-amber-50/70',
      accent: 'text-amber-700',
    },
    summary: 'Explores God’s Revelation, the Trinity, Creation, the Incarnation, Redemption, the Holy Spirit, the Church, and the Four Last Things as confessed in the Apostles’ & Nicene Creeds.',
    practicalQuestion: 'How does what we believe about God change how we understand who we are and why we exist?',
    coreThemes: ['Trinity & Divine Love', 'God’s Revelation in Scripture & Tradition', 'Human Dignity & Creation', 'The Mystery of Christ', 'The Four Last Things'],
  },
  [CatechismPillar.SACRAMENTS]: {
    id: CatechismPillar.SACRAMENTS,
    number: 2,
    title: 'Celebration of the Mystery',
    latinTitle: 'Lex Celebrandi',
    theme: 'How the Church Celebrates',
    cccRange: 'CCC 1066–1690',
    colorClass: {
      bg: 'bg-rose-900',
      text: 'text-rose-900',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
      lightBg: 'bg-rose-50/70',
      accent: 'text-rose-700',
    },
    summary: 'The 7 Sacraments of the Church (Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, Matrimony) and the sacred Liturgy as tangible encounters with Christ’s grace.',
    practicalQuestion: 'How do physical signs (bread, wine, oil, water, gestures) transmit real divine life and healing into our everyday bodies and souls?',
    coreThemes: ['The Holy Mass & Liturgy', 'Sacraments of Initiation', 'Sacraments of Healing (Confession & Anointing)', 'Sacraments of Service (Marriage & Orders)', 'Sacramentals & Blessings'],
  },
  [CatechismPillar.MORALITY]: {
    id: CatechismPillar.MORALITY,
    number: 3,
    title: 'Life in Christ',
    latinTitle: 'Lex Vivendi',
    theme: 'How Catholics Live & Decide',
    cccRange: 'CCC 1691–2557',
    colorClass: {
      bg: 'bg-emerald-900',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      lightBg: 'bg-emerald-50/70',
      accent: 'text-emerald-700',
    },
    summary: 'Human dignity, freedom, conscience, virtues, sin, grace, Catholic Social Teaching, and the Ten Commandments applied to modern adult ethical dilemmas and relationships.',
    practicalQuestion: 'How do we make moral choices that lead to true freedom, justice, and human flourishing rather than guilt or legalism?',
    coreThemes: ['Freedom & Conscience Formation', 'The Virtues (Cardinal & Theological)', 'Sin & Mercy', 'The 10 Commandments for Adults', 'Catholic Social Justice & Dignity'],
  },
  [CatechismPillar.PRAYER]: {
    id: CatechismPillar.PRAYER,
    number: 4,
    title: 'Christian Prayer',
    latinTitle: 'Lex Orandi',
    theme: 'How Catholics Pray & Commune with God',
    cccRange: 'CCC 2558–2865',
    colorClass: {
      bg: 'bg-indigo-900',
      text: 'text-indigo-900',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      lightBg: 'bg-indigo-50/70',
      accent: 'text-indigo-700',
    },
    summary: 'The nature of prayer, expressions of prayer (vocal, meditation, contemplation), overcoming spiritual dryness, and the profound depth of the Lord’s Prayer (Our Father).',
    practicalQuestion: 'How can a busy adult cultivate an authentic, honest interior dialogue and friendship with the Living God?',
    coreThemes: ['Forms of Prayer (Adoration, Contrition, Thanksgiving, Supplication)', 'The Battle of Prayer & Distraction', 'Lectio Divina & Scripture', 'The 7 Petitions of the Lord’s Prayer', 'Silence & Contemplation'],
  },
};
