export interface LiturgicalContext {
  season: 'Ordinary Time' | 'Advent' | 'Christmas' | 'Lent' | 'Holy Week' | 'Easter';
  color: 'green' | 'purple' | 'white' | 'red' | 'rose';
  colorName: string;
  seasonDescription: string;
  todaySaintOrFeast: string;
  liturgicalYearCycle: string;
  dayOfYear: number;
}

export function getLiturgicalContext(date: Date = new Date()): LiturgicalContext {
  const month = date.getMonth(); // 0-indexed (0 = Jan, 8 = Sept)
  const day = date.getDate();

  // Day of year calculation
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Approximate liturgical seasons
  let season: LiturgicalContext['season'] = 'Ordinary Time';
  let color: LiturgicalContext['color'] = 'green';
  let colorName = 'Green';
  let seasonDescription = 'A time of steady spiritual growth, walking with Christ through His public ministry and teachings.';

  if (month === 11 && day >= 1 && day <= 24) {
    season = 'Advent';
    color = 'purple';
    colorName = 'Violet';
    seasonDescription = 'A joyful and penitential season of expectant waiting and preparation for the Nativity of Christ.';
  } else if ((month === 11 && day >= 25) || (month === 0 && day <= 10)) {
    season = 'Christmas';
    color = 'white';
    colorName = 'White & Gold';
    seasonDescription = 'Celebrating the unfathomable mystery of the Incarnation—God dwelling with us in human flesh.';
  } else if (month === 2 || (month === 1 && day >= 14) || (month === 3 && day <= 15)) {
    season = 'Lent';
    color = 'purple';
    colorName = 'Violet';
    seasonDescription = 'Forty days of prayer, fasting, and almsgiving in the desert with Christ to prepare for the Paschal Mystery.';
  } else if (month === 3 && day > 15 && day <= 25) {
    season = 'Holy Week';
    color = 'red';
    colorName = 'Red / Violet';
    seasonDescription = 'The holiest week of the Christian year, remembering the Last Supper, Passion, and Death of Our Lord.';
  } else if (month === 4 || (month === 3 && day > 25) || (month === 5 && day <= 10)) {
    season = 'Easter';
    color = 'white';
    colorName = 'White & Gold';
    seasonDescription = 'Fifty days of radiant joy proclaiming Christ’s glorious victory over sin and death.';
  }

  // Notable feast days mapping for practical learning
  const feastMap: Record<string, string> = {
    '01-01': 'Solemnity of Mary, Mother of God',
    '01-28': 'St. Thomas Aquinas, Priest & Doctor of the Church',
    '03-19': 'Solemnity of St. Joseph, Spouse of the Blessed Virgin Mary',
    '03-25': 'Solemnity of the Annunciation of the Lord',
    '05-01': 'St. Joseph the Worker',
    '06-24': 'Nativity of St. John the Baptist',
    '06-29': 'Solemnity of Sts. Peter and Paul, Apostles',
    '08-15': 'Solemnity of the Assumption of the Blessed Virgin Mary',
    '08-28': 'St. Augustine of Hippo, Bishop & Doctor of the Church',
    '09-01': 'World Day of Prayer for the Care of Creation',
    '09-08': 'Nativity of the Blessed Virgin Mary',
    '09-14': 'Exaltation of the Holy Cross',
    '09-29': 'Sts. Michael, Gabriel, and Raphael, Archangels',
    '09-30': 'St. Jerome, Priest & Doctor of the Church (Patron of Bible Study)',
    '10-01': 'St. Thérèse of Lisieux (The Little Flower)',
    '10-04': 'St. Francis of Assisi',
    '10-15': 'St. Teresa of Ávila, Virgin & Doctor of the Church',
    '10-22': 'Pope St. John Paul II',
    '11-01': 'Solemnity of All Saints',
    '11-02': 'Commemoration of All the Faithful Departed (All Souls Day)',
    '12-08': 'Solemnity of the Immaculate Conception',
    '12-12': 'Our Lady of Guadalupe',
    '12-25': 'The Nativity of the Lord (Christmas)',
  };

  const monthKey = String(month + 1).padStart(2, '0');
  const dayKey = String(day).padStart(2, '0');
  const key = `${monthKey}-${dayKey}`;

  const todaySaintOrFeast = feastMap[key] || 'Daily Liturgical Memorial & Ferial Day';

  return {
    season,
    color,
    colorName,
    seasonDescription,
    todaySaintOrFeast,
    liturgicalYearCycle: 'Year C / Cycle II',
    dayOfYear,
  };
}
