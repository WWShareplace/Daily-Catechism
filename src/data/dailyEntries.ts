import { CatechismPillar, DailyLookup } from '../types';

export const CORE_DAILY_ENTRIES: DailyLookup[] = [
  {
    id: 'day-001',
    dayOfYear: 1,
    dateKey: '01-01',
    themeTitle: 'The Restless Heart: Why Adults Seek Meaning & God',
    pillar: CatechismPillar.CREED,
    primaryCccCitation: 'CCC 27–30',
    cccParagraphs: [27, 28, 29, 30],
    officialCccText: '“The desire for God is written in the human heart, because man is created by God and for God; and God never ceases to draw man to himself. Only in God will he find the truth and happiness he never stops searching for.” (CCC 27)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 30',
        text: '“Let the hearts of those who seek the LORD rejoice. Although man can forget God or reject him, God never ceases to call every man to seek him, so as to find life and happiness.”',
      },
    ],
    scriptureCitation: 'Psalm 63:1; Acts 17:27–28',
    scriptureText: '“O God, you are my God, for you I long; for you my soul is thirsting, like a land, parched, lifeless, and without water.” (Psalm 63:1)',
    practicalTakeaway: {
      headline: 'Recognize your natural hunger for truth as God’s invitation, not random anxiety.',
      contextForAdults: 'Modern adult life pushes us toward work, success, material comfort, and endless digital entertainment. Yet deep inside, an ache remains—a sense that there must be something more lasting. The Catechism affirms that this longing is not a defect or psychological weakness; it is your soul’s internal compass pointing to its Creator.',
      livingItToday: [
        'Pause for 2 minutes of complete silence before checking your phone or starting work today.',
        'Acknowledge one restless craving (for approval, control, or security) and consciously offer it to God.',
        'Write down one deep question about life or faith you have carried into adulthood.',
      ],
      reflectionQuestion: 'Where in my busy routine do I notice a quiet hunger for deeper peace and eternal purpose?',
      prayer: 'Lord God, you made us for yourself, and our hearts are restless until they rest in you. Guide my search today and teach me to find my true home in your eternal love. Amen.',
    },
    commonMisconception: {
      myth: '“Faith is an irrational crutch for people who cannot handle the harsh realities of adult life.”',
      clarification: 'The Catholic Church teaches that human reason and faith work in harmony (Fides et Ratio). Our intellect is made to seek truth, and God reveals Himself to fulfill, rather than bypass, human reason.',
      cccReference: 'CCC 35, 39',
    },
    keyTerms: [
      { term: 'Revelation', definition: 'God’s free self-communication to humanity in deeds and words, culminating in Jesus Christ.' },
      { term: 'Natural Reason', definition: 'The human mind’s capacity to know that God exists through created reality.' },
    ],
    tags: ['Purpose', 'Restlessness', 'Human Dignity', 'Beginning the Journey', 'Reason & Faith'],
    saintOrQuote: {
      author: 'St. Augustine of Hippo',
      quote: '“You have made us for yourself, O Lord, and our heart is restless until it rests in you.”',
      context: 'Confessions, Book I',
    },
  },
  {
    id: 'day-002',
    dayOfYear: 2,
    dateKey: '01-02',
    themeTitle: 'Scripture & Tradition: How God Speaks to Us Today',
    pillar: CatechismPillar.CREED,
    primaryCccCitation: 'CCC 80–84',
    cccParagraphs: [80, 81, 82, 83, 84],
    officialCccText: '“Sacred Tradition and Sacred Scripture, then, are bound closely together, and communicate one with the other. For both of them, flowing out from the same divine well-spring, in some sort merge into a unity and tend toward the same end.” (CCC 80)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 82',
        text: '“As a result the Church, to whom the transmission and interpretation of Revelation is entrusted, does not derive her certainty about all revealed truths from the holy Scriptures alone. Both Scripture and Tradition must be accepted and honored with equal sentiments of devotion and reverence.”',
      },
    ],
    scriptureCitation: '2 Thessalonians 2:15; 1 Timothy 3:15',
    scriptureText: '“So then, brothers and sisters, stand firm and hold fast to the traditions that you were taught by us, either by our spoken word or by our letter.” (2 Thessalonians 2:15)',
    practicalTakeaway: {
      headline: 'We receive faith not as isolated individuals with a book, but within a living 2,000-year family.',
      contextForAdults: 'Many adults wonder: “Why don’t Catholics follow the Bible alone (Sola Scriptura)?” The historical reality is that the Church lived the faith and passed it on orally (Sacred Tradition) for decades before the New Testament was written, and the Church under the Holy Spirit discerned the canon of the Bible. Scripture and Tradition are two streams of one single sacred deposit of faith.',
      livingItToday: [
        'Read 5 verses from the Gospel of Luke with the awareness that millions of saints read these same words across centuries.',
        'Appreciate how the liturgy you attend connects directly back to the Early Church Fathers (like St. Justin Martyr in 155 AD).',
        'When you encounter a difficult biblical passage, check how the Catechism interprets it rather than guessing in isolation.',
      ],
      reflectionQuestion: 'How does knowing the Bible was preserved and interpreted by a living community give me confidence in God’s guidance?',
      prayer: 'Holy Spirit, who inspired the Sacred Scriptures and guided the Apostles through Sacred Tradition, grant me wisdom to hear God’s living word within the heart of the Church today. Amen.',
    },
    commonMisconception: {
      myth: '“Catholic tradition is just human rules invented by popes and bishops over the centuries.”',
      clarification: 'Sacred Tradition (with a capital T) refers to the divine deposit of faith passed down from Christ and the Apostles. Human traditions (customs, devotions, vestment styles) can develop or change, but Sacred Tradition is eternal and unchanged.',
      cccReference: 'CCC 83',
    },
    keyTerms: [
      { term: 'Deposit of Faith', definition: 'The heritage of faith contained in Sacred Scripture and Tradition, handed on in the Church from the time of the Apostles.' },
      { term: 'Magisterium', definition: 'The living, teaching office of the Church (Pope and bishops in communion) whose task is to authentically interpret the Word of God.' },
    ],
    tags: ['Bible', 'Sacred Tradition', 'Magisterium', 'Truth', 'Church Authority'],
    saintOrQuote: {
      author: 'St. Irenaeus of Lyons (c. 180 AD)',
      quote: '“The Church, having received this preaching and this faith, although scattered throughout the whole world, yet, as if occupying but one house, carefully preserves it.”',
      context: 'Against Heresies',
    },
  },
  {
    id: 'day-003',
    dayOfYear: 3,
    dateKey: '01-03',
    themeTitle: 'The Holy Trinity: God as an Eternal Communion of Love',
    pillar: CatechismPillar.CREED,
    primaryCccCitation: 'CCC 232–237, 253–256',
    cccParagraphs: [232, 237, 253, 254, 255],
    officialCccText: '“The mystery of the Most Holy Trinity is the central mystery of Christian faith and life. It is the mystery of God in himself. It is therefore the source of all the other mysteries of faith, the light that enlightens them.” (CCC 234)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 253',
        text: '“The Trinity is One. We do not confess three Gods, but one God in three persons, the ‘consubstantial Trinity’. The divine persons do not share the one divinity among themselves but each of them is God whole and entire.”',
      },
    ],
    scriptureCitation: 'Matthew 28:19; 2 Corinthians 13:14; 1 John 4:8',
    scriptureText: '“Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.” (Matthew 28:19)',
    practicalTakeaway: {
      headline: 'Because God is a Trinity, love is not just something God does—love is who God IS.',
      contextForAdults: 'The Trinity is not a sterile mathematical puzzle (1+1+1=1), but the revelation that at the very root of reality exists an eternal communion of self-giving love: the Father loving the Son, the Son loving the Father, and the Holy Spirit as the eternal fruit of their love. We are created in this image to love and be in communion with others.',
      livingItToday: [
        'Make the Sign of the Cross slowly and deliberately before a task, honoring the Three Persons.',
        'Reflect on how your family, workplace, or friendships can reflect self-giving love rather than self-serving transactions.',
        'Pray specifically to one person of the Trinity today (Father, Son, or Holy Spirit) with your honest needs.',
      ],
      reflectionQuestion: 'If God is essentially relational love, how does that shape how I treat difficult colleagues or family members today?',
      prayer: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
    },
    commonMisconception: {
      myth: '“Catholics believe in three separate gods, or that God just wears three different masks at different times (modalism).”',
      clarification: 'Christianity is strictly monotheistic: ONE God in THREE distinct Divine Persons (Father, Son, Holy Spirit), of one substance/nature (consubstantial).',
      cccReference: 'CCC 253–255',
    },
    keyTerms: [
      { term: 'Consubstantial (Homoousios)', definition: 'Having the exact same divine nature or essence; affirmed in the Nicene Creed that Jesus is of one being with the Father.' },
      { term: 'Divine Communion', definition: 'The mutual indwelling and complete unity of love between the Father, Son, and Holy Spirit (Perichoresis).' },
    ],
    tags: ['Trinity', 'God is Love', 'Creed', 'Core Mystery', 'Relationships'],
    saintOrQuote: {
      author: 'St. Catherine of Siena',
      quote: '“O Eternal Trinity, you are a deep sea, into which the more I enter the more I find, and the more I find the more I seek.”',
      context: 'Dialogue on Divine Providence',
    },
  },
  {
    id: 'day-004',
    dayOfYear: 4,
    dateKey: '01-04',
    themeTitle: 'The Incarnation: Why God Stepped into Human History',
    pillar: CatechismPillar.CREED,
    primaryCccCitation: 'CCC 456–460',
    cccParagraphs: [456, 457, 458, 459, 460],
    officialCccText: '“The Word became flesh for us in order to save us by reconciling us with God... The Word became flesh so that thus we might know God’s love... The Word became flesh to be our model of holiness... The Word became flesh to make us ‘partakers of the divine nature’.” (CCC 457–460)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 460',
        text: '“For the Son of God became man so that we might become God [divinized through grace]... the only-begotten Son of God, wanting to make us sharers in his divinity, assumed our nature, so that he, made man, might make men gods.” (St. Athanasius / St. Thomas Aquinas)',
      },
    ],
    scriptureCitation: 'John 1:14; Philippians 2:5–8; 2 Peter 1:4',
    scriptureText: '“And the Word became flesh and lived among us, and we have seen his glory, the glory as of a father’s only son, full of grace and truth.” (John 1:14)',
    practicalTakeaway: {
      headline: 'God did not send a memo or philosophy—He entered our vulnerable, messy human condition.',
      contextForAdults: 'In other philosophies, God remains distant and detached from human sorrow. In Christianity, God became a baby, worked with human hands as a carpenter, felt fatigue, wept over loss, and suffered betrayal. Because Jesus assumed human nature, everything ordinary in your adult life—work, family, meals, fatigue—can now be sanctified and united with God.',
      livingItToday: [
        'Look at your physical body, fatigue, and daily duties not as obstacles to faith, but as the very place Jesus wants to meet you.',
        'Practice humility in one conversation today by listening fully without rushing to defend your ego.',
        'Thank Jesus for sharing in your human vulnerabilities.',
      ],
      reflectionQuestion: 'How does Jesus being truly human and truly God change how I bring my physical and emotional struggles to Him in prayer?',
      prayer: 'Lord Jesus Christ, True God and True Man, thank you for entering into our human weakness. Sanctify my everyday work and relationships with your holy presence. Amen.',
    },
    commonMisconception: {
      myth: '“Jesus was just a great human moral teacher who was later elevated to godhood by his followers.”',
      clarification: 'The Church confesses that Jesus Christ is the eternal Son of God who possessed full divinity from all eternity and assumed a real human nature in time (the Hypostatic Union).',
      cccReference: 'CCC 464–469',
    },
    keyTerms: [
      { term: 'Incarnation', definition: 'The mystery of the union of the divine and human natures in the one divine person of the Son of God (Jesus Christ).' },
      { term: 'Theosis / Divinization', definition: 'The transformation of a believer through sanctifying grace into likeness with God, becoming partakers in the divine life.' },
    ],
    tags: ['Jesus Christ', 'Incarnation', 'Humanity of Jesus', 'Sanctification', 'Christmas'],
    saintOrQuote: {
      author: 'St. Athanasius of Alexandria',
      quote: '“God became man so that man might become like God.”',
      context: 'On the Incarnation of the Word',
    },
  },
  {
    id: 'day-005',
    dayOfYear: 5,
    dateKey: '01-05',
    themeTitle: 'The Mass: Sacrifice, Thanksgiving & Real Presence',
    pillar: CatechismPillar.SACRAMENTS,
    primaryCccCitation: 'CCC 1362–1372, 1373–1381',
    cccParagraphs: [1362, 1364, 1374, 1375, 1376],
    officialCccText: '“The Mass is at the same time and inseparably the sacrificial memorial in which the sacrifice of the cross is perpetuated and the sacred banquet of communion with the Lord’s body and blood.” (CCC 1382)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 1374',
        text: '“In the most blessed sacrament of the Eucharist the body and blood, together with the soul and divinity, of our Lord Jesus Christ and, therefore, the whole Christ is truly, really, and substantially contained.”',
      },
    ],
    scriptureCitation: 'Luke 22:19–20; John 6:51–56; 1 Corinthians 11:23–26',
    scriptureText: '“For as often as you eat this bread and drink the cup, you proclaim the Lord’s death until he comes.” (1 Corinthians 11:26)',
    practicalTakeaway: {
      headline: 'The Mass is not a performance or community lecture—it is Calvary made present on the altar.',
      contextForAdults: 'For adult learners, Sunday Mass can sometimes feel repetitive if viewed merely as songs and a sermon. The Catechism unlocks the true reality: when the priest pronounces Christ’s words over the bread and wine, time and space bend. We are standing mystically at the foot of the Cross, joining our personal weekly sacrifices, hardships, and thanksgivings to Christ’s eternal offering to the Father.',
      livingItToday: [
        'Before attending your next Mass, mentally gather the heavy burdens and joys of your week to place on the altar during the Offertory.',
        'Observe the Eucharistic fast (abstaining from food and drink except water/medicine for 1 hour before Holy Communion).',
        'Make a sincere act of reverence (genuflection or profound bow) toward the Tabernacle when entering church.',
      ],
      reflectionQuestion: 'What personal struggles, career stresses, or loved ones do I need to bring and unite to Christ’s offering at Mass this week?',
      prayer: 'Lord Jesus Christ, we adore you in the Most Blessed Sacrament of the Altar. Transform our hearts with your real presence, that we may become what we receive. Amen.',
    },
    commonMisconception: {
      myth: '“Catholics believe Jesus is re-crucified and suffers again at every Mass.”',
      clarification: 'The Sacrifice of the Cross occurred once for all on Calvary. The Mass does not repeat or multiply Christ’s sacrifice; it makes that ONE eternal sacrifice sacramentally present in our time and applies its fruits to our lives.',
      cccReference: 'CCC 1367',
    },
    keyTerms: [
      { term: 'Transubstantiation', definition: 'The theological term for the change of the entire substance of bread and wine into the substance of the Body and Blood of Christ, while the physical appearances (accidents) remain.' },
      { term: 'Eucharist (Eucharistia)', definition: 'From the Greek word for “thanksgiving”; the supreme act of worship and the source and summit of Christian life.' },
    ],
    tags: ['The Mass', 'Eucharist', 'Sacraments', 'Real Presence', 'Liturgy'],
    saintOrQuote: {
      author: 'St. Padre Pio',
      quote: '“It would be easier for the world to survive without the sun than without the Holy Mass.”',
      context: 'Spiritual Counsels',
    },
  },
  {
    id: 'day-006',
    dayOfYear: 6,
    dateKey: '01-06',
    themeTitle: 'Confession: Why Confess Sins to a Human Priest?',
    pillar: CatechismPillar.SACRAMENTS,
    primaryCccCitation: 'CCC 1440–1449, 1455–1460',
    cccParagraphs: [1440, 1441, 1442, 1456, 1467],
    officialCccText: '“Only God forgives sins. Since he is the Son of God, Jesus says of himself, ‘The Son of man has authority on earth to forgive sins’ and exercises this divine power... Further, by virtue of his divine authority he gives this power to men to exercise in his name.” (CCC 1441)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 1467',
        text: '“Given the delicacy and greatness of this ministry and the respect due to persons, every priest who hears confessions is bound under very severe penalties to keep absolute secrecy regarding the sins that his penitents have confessed to him (the sacramental seal).”',
      },
    ],
    scriptureCitation: 'John 20:21–23; James 5:16; 2 Corinthians 5:18–20',
    scriptureText: '“Jesus said to them again, ‘Peace be with you. As the Father has sent me, so I send you.’ When he had said this, he breathed on them and said to them, ‘Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained.’” (John 20:21–23)',
    practicalTakeaway: {
      headline: 'Vocalizing your sins brings them out of the darkness of shame and into the healing light of Christ’s mercy.',
      contextForAdults: 'Almost every adult inquirer asks: “Why can’t I just tell God I’m sorry in private prayer?” You certainly should pray privately, but Jesus established the Sacrament of Reconciliation on Easter night so we could hear the audible words: “I absolve you from your sins.” Psychologically and spiritually, naming our faults aloud to Christ through His minister breaks the power of isolation and guarantees total forgiveness.',
      livingItToday: [
        'Do a gentle 5-minute adult examination of conscience reviewing your speech, digital habits, and treatment of others.',
        'If you have been away from Confession for months or years, look up your local parish’s confession schedule and resolve to go.',
        'Rest in the knowledge of the absolute Sacramental Seal: a priest can never reveal what you confess under pain of excommunication and mortal sin.',
      ],
      reflectionQuestion: 'What fear or shame has kept me from opening my heart fully to God’s forgiveness in the sacrament of mercy?',
      prayer: 'O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin. Amen. (Act of Contrition)',
    },
    commonMisconception: {
      myth: '“The priest is judging you or gossiping about what you say.”',
      clarification: 'Priests are trained to see penitents as wounded children coming to the Divine Physician. Moreover, the Sacramental Seal is inviolable—a priest would die before breaking it, and thousands of martyrs have chosen execution over revealing a confession.',
      cccReference: 'CCC 1467',
    },
    keyTerms: [
      { term: 'Absolution', definition: 'The sacramental formula spoken by the priest through which God grants pardon and peace to the repentant sinner.' },
      { term: 'Contrition', definition: 'Heartfelt sorrow for sins committed along with the firm intention not to sin again.' },
      { term: 'Sacramental Seal', definition: 'The absolute duty of priests not to disclose anything learned during sacramental confession under any circumstances.' },
    ],
    tags: ['Confession', 'Reconciliation', 'Forgiveness', 'Healing', 'Mercy', 'Guilt'],
    saintOrQuote: {
      author: 'St. John Vianney (Curé d’Ars)',
      quote: '“It is not the sinner who returns to God to beg His pardon, but God Himself who runs after the sinner and makes him return to Him.”',
      context: 'Sermons on the Sacrament of Penance',
    },
  },
  {
    id: 'day-007',
    dayOfYear: 7,
    dateKey: '01-07',
    themeTitle: 'Forming an Adult Conscience in a Confusing World',
    pillar: CatechismPillar.MORALITY,
    primaryCccCitation: 'CCC 1776–1785, 1790–1794',
    cccParagraphs: [1776, 1778, 1783, 1784, 1785],
    officialCccText: '“Deep within his conscience man discovers a law which he has not laid upon himself but which he must obey. Its voice, ever calling him to love and to do what is good and to avoid evil, sounds in his heart at the right moment.” (CCC 1776)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 1783',
        text: '“Conscience must be informed and moral judgment enlightened. A well-formed conscience is upright and truthful. It formulates its judgments according to reason, in conformity with the true good willed by the wisdom of the Creator.”',
      },
    ],
    scriptureCitation: 'Romans 2:14–16; Sirach 15:14–17; 1 Timothy 1:5',
    scriptureText: '“The aim of such instruction is love that comes from a pure heart, a good conscience, and sincere faith.” (1 Timothy 1:5)',
    practicalTakeaway: {
      headline: 'Conscience is not an emotional whim or license to do whatever feels right—it is the sanctuary where we hear God’s voice.',
      contextForAdults: 'Modern culture often equates conscience with subjective preference: “If it feels right to me, it must be okay.” The Catechism teaches that conscience is an act of practical human judgment that must be educated and formed throughout adult life using Scripture, Church teaching, prayer, and wise counsel. Conscience is not our own invention; it is our capacity to recognize objective truth.',
      livingItToday: [
        'When facing a difficult moral dilemma at work or in personal relationships, don’t just rely on gut feelings—consult Catholic moral principles.',
        'Read 10 minutes of solid Catholic spiritual or moral writing to nourish your moral discernment.',
        'Admit if you have rationalized a compromise recently and realign your choice with what is truly right.',
      ],
      reflectionQuestion: 'In what area of my life (finances, speech, relationships) am I tempted to substitute convenience or cultural peer pressure for true moral integrity?',
      prayer: 'Lord, illuminate the eyes of my heart. Give me a clean and sensitive conscience, courageous enough to stand for truth and humble enough to be corrected by your Holy Spirit. Amen.',
    },
    commonMisconception: {
      myth: '“Catholic obedience means turning off your brain and blindly following rules.”',
      clarification: 'The Church teaches that every human person has a grave duty to follow their certain conscience. But because human beings can suffer from ignorance or self-deception, we have an equally grave duty to continually form and enlighten our conscience in truth.',
      cccReference: 'CCC 1783, 1790',
    },
    keyTerms: [
      { term: 'Moral Conscience', definition: 'A judgment of reason whereby the human person recognizes the moral quality of a concrete act that he is going to perform, is in the process of performing, or has already completed.' },
      { term: 'Invincible Ignorance', definition: 'Ignorance of the moral law that could not have been dispelled by reasonable effort on the part of the person.' },
    ],
    tags: ['Conscience', 'Moral Choices', 'Ethics', 'Workplace', 'Truth', 'Freedom'],
    saintOrQuote: {
      author: 'St. John Henry Newman',
      quote: '“Conscience is the aboriginal Vicar of Christ... a messenger from Him, who, both in nature and in grace, speaks to us behind a veil.”',
      context: 'Letter to the Duke of Norfolk',
    },
  },
  {
    id: 'day-008',
    dayOfYear: 8,
    dateKey: '01-08',
    themeTitle: 'The Battle of Prayer: Overcoming Distraction & Dryness',
    pillar: CatechismPillar.PRAYER,
    primaryCccCitation: 'CCC 2725–2733, 2738–2745',
    cccParagraphs: [2725, 2729, 2731, 2732, 2742],
    officialCccText: '“Prayer is both a gift of grace and a determined response on our part. It always presupposes effort. The great figures of old... all teach us that prayer is a battle. Against whom? Against ourselves and against the wiles of the tempter who does all he can to turn man away from prayer.” (CCC 2725)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 2731',
        text: '“Dryness belongs to contemplative prayer when the heart is separated from God, with no taste for thoughts, memories, and feelings, even spiritual ones. This is the moment of sheer faith clinging faithfully to Jesus in his agony and in his tomb.”',
      },
    ],
    scriptureCitation: 'Luke 18:1; Ephesians 6:18; Romans 8:26',
    scriptureText: '“Likewise the Spirit helps us in our weakness; for we do not know how to pray as we ought, but that very Spirit intercedes with sighs too deep for words.” (Romans 8:26)',
    practicalTakeaway: {
      headline: 'Feelings are not the gauge of prayer; fidelity is.',
      contextForAdults: 'Every adult who attempts a prayer routine runs into two obstacles: mental distractions (to-do lists, emails, worries) and emotional dryness (feeling nothing, boredom). The Catechism is remarkably honest: prayer is spiritual warfare. When you show up and sit in prayer despite feeling nothing, your prayer is often purest because you are seeking God Himself, not just good feelings from God.',
      livingItToday: [
        'When distracted during prayer, don’t get angry at yourself. Simply turn your heart gently back to God each time.',
        'Establish a set 10-minute time and quiet spot in your home for daily prayer (e.g. 7:00 AM with your morning coffee).',
        'If words fail, repeat the Holy Name of Jesus slowly: “Lord Jesus Christ, Son of the Living God, have mercy on me, a sinner.”',
      ],
      reflectionQuestion: 'Have I given up on prayer in the past because I didn’t “feel” anything, and can I commit to showing up faithfully this week anyway?',
      prayer: 'Lord Jesus, when my mind wanders and my heart feels dry, remind me that you are with me. Send your Holy Spirit to pray within me when I do not know how to pray. Amen.',
    },
    commonMisconception: {
      myth: '“Holiness means you never get distracted and always feel warm spiritual feelings when you pray.”',
      clarification: 'Even great doctors of the Church like St. Thérèse of Lisieux and St. Teresa of Ávila struggled with falling asleep and wandering thoughts in prayer. Holiness is persistent love, not emotional fireworks.',
      cccReference: 'CCC 2729, 2731',
    },
    keyTerms: [
      { term: 'Spiritual Dryness', definition: 'A state in prayer where one experiences no sensible consolation or emotional warmth, calling for pure faith and fidelity.' },
      { term: 'Acedia (Sloth)', definition: 'A form of spiritual depression or laziness arising from lax ascetical practice and lack of vigilance in prayer.' },
    ],
    tags: ['Prayer Habits', 'Distractions', 'Spiritual Warfare', 'Dryness', 'Perseverance'],
    saintOrQuote: {
      author: 'St. Teresa of Ávila',
      quote: '“Mental prayer, in my opinion, is nothing else than an intimate sharing between friends; it means taking time frequently to be alone with Him who we know loves us.”',
      context: 'The Book of Her Life',
    },
  },
  {
    id: 'day-009',
    dayOfYear: 9,
    dateKey: '01-09',
    themeTitle: 'The Communion of Saints & Mary: Family in Heaven',
    pillar: CatechismPillar.CREED,
    primaryCccCitation: 'CCC 946–953, 963–975',
    cccParagraphs: [946, 956, 957, 969, 971],
    officialCccText: '“Being more closely united to Christ, those who are in heaven fix the whole Church more firmly in holiness... They do not cease to intercede with the Father for us, as they offer the merits which they acquired on earth through the one mediator between God and men, Christ Jesus.” (CCC 956)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 971',
        text: '“The Church’s devotion to the Blessed Virgin is intrinsic to Christian worship... While this worship is entirely unique, it differs essentially from the cult of adoration, which is offered to the Incarnate Word as well to the Father and the Holy Spirit.”',
      },
    ],
    scriptureCitation: 'Hebrews 12:1; Revelation 5:8; Luke 1:46–49',
    scriptureText: '“Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight and the sin that clings so closely, and let us run with perseverance the race that is set before us.” (Hebrews 12:1)',
    practicalTakeaway: {
      headline: 'Asking a saint or Mary to pray for you is no different than asking a trusted Christian friend—except they are already before God’s throne.',
      contextForAdults: 'One of the most misunderstood Catholic teachings is devotion to Mary and the Saints. Catholics do not worship saints; worship (latria) belongs to God alone. We honor the saints (dulia) and Mary (hyperdulia) as our elder brothers and sisters in Christ who cheer us on and present our prayers to the Lord like incense (Rev 5:8).',
      livingItToday: [
        'Find a patron saint who shares your profession (e.g. St. Joseph for workers, St. Thomas More for lawyers/public servants, St. Luke for doctors).',
        'Pray a Hail Mary today, meditating on Mary’s humble “Yes” (Fiat) to God’s will.',
        'Remember that loved ones who have died in Christ remain connected to you through the communion of the Church.',
      ],
      reflectionQuestion: 'Which saint’s life story or heroic virtue inspires me most in my current stage of adult life?',
      prayer: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    },
    commonMisconception: {
      myth: '“Catholics worship statues, put Mary on the same level as Jesus, and violate 1 Timothy 2:5 (Christ as sole mediator).”',
      clarification: 'Christ is the one Mediator. Just as you can ask a friend on earth to pray for you without violating Christ’s unique mediation, we can ask holy members of Christ’s Body in heaven to intercede for us.',
      cccReference: 'CCC 956, 970',
    },
    keyTerms: [
      { term: 'Latria', definition: 'The highest worship and adoration due to the Holy Trinity alone.' },
      { term: 'Dulia', definition: 'Veneration and honor given to the holy saints and angels as faithful servants of God.' },
      { term: 'Hyperdulia', definition: 'Special preeminent honor given to Mary as the Mother of God (Theotokos), distinct from divine adoration.' },
    ],
    tags: ['Mary', 'Saints', 'Intercession', 'Heaven', 'Communion of Saints'],
    saintOrQuote: {
      author: 'St. Thérèse of Lisieux',
      quote: '“I will spend my heaven doing good on earth. I will let fall a shower of roses.”',
      context: 'Story of a Soul',
    },
  },
  {
    id: 'day-010',
    dayOfYear: 10,
    dateKey: '01-10',
    themeTitle: 'Catholic Social Teaching: Living Faith in the Public Square',
    pillar: CatechismPillar.MORALITY,
    primaryCccCitation: 'CCC 1877–1889, 1905–1912, 1939–1942',
    cccParagraphs: [1878, 1883, 1906, 1939, 2401],
    officialCccText: '“The dignity of the human person requires the pursuit of the common good. Everyone should be concerned to create and support institutions that improve the conditions of human life.” (CCC 1926)',
    secondaryCccQuotes: [
      {
        citation: 'CCC 1883',
        text: '“A community of a higher order should not interfere in the internal life of a community of a lower order, depriving the latter of its functions, but rather should support it in case of need and help to co-ordinate its activity with the activities of the rest of society (Subsidiarity).”',
      },
    ],
    scriptureCitation: 'Matthew 25:35–40; Micah 6:8; James 2:14–17',
    scriptureText: '“He has told you, O mortal, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?” (Micah 6:8)',
    practicalTakeaway: {
      headline: 'Catholic faith is never a private hobby—it demands working for human dignity, fair wages, family protection, and care for the poor.',
      contextForAdults: 'Catholic Social Teaching (CST) transcends secular political party lines. It rests on permanent pillars: the inalienable Dignity of the Human Person from conception to natural death, the Common Good, Subsidiarity (solving problems at the most local level possible), and Solidarity (recognizing all humans as one family). As an adult citizen and worker, you are called to bring Christ’s justice into economics, policy, and charity.',
      livingItToday: [
        'Evaluate how your workplace practices, purchasing decisions, or business treat workers, vendors, and the vulnerable.',
        'Donate directly to or volunteer with a local shelter, food pantry, or pregnancy support center.',
        'Engage in political conversations with Christian charity, avoiding dehumanizing language toward opponents.',
      ],
      reflectionQuestion: 'How can I apply Catholic Social Teaching to my professional work and civic responsibilities this month?',
      prayer: 'Lord Jesus, King of Justice and Peace, give us eyes to see your image in the poor, the unborn, the immigrant, and the forgotten. Empower us to build a civilization of love. Amen.',
    },
    commonMisconception: {
      myth: '“Catholic Social Teaching is either just socialism or pure free-market libertarianism.”',
      clarification: 'The Church rejects both collectivist socialism (which destroys personal freedom and subsidiarity) and unbridled capitalism (which reduces humans to mere economic utility). CST places the transcendent dignity of the human person at the center.',
      cccReference: 'CCC 2424, 2425',
    },
    keyTerms: [
      { term: 'Common Good', definition: 'The sum total of social conditions which allow people, either as groups or as individuals, to reach their fulfillment more fully and easily.' },
      { term: 'Subsidiarity', definition: 'The principle that matters should be handled by the smallest, lowest, or least centralized competent authority rather than a distant central bureaucracy.' },
      { term: 'Solidarity', definition: 'A firm and persevering determination to commit oneself to the common good of all, because we are all really responsible for all.' },
    ],
    tags: ['Catholic Social Teaching', 'Justice', 'Subsidiarity', 'Solidarity', 'Workplace Ethics', 'Charity'],
    saintOrQuote: {
      author: 'Pope St. John Paul II',
      quote: '“Solidarity is not a feeling of vague compassion... on the contrary, it is a firm and persevering determination to commit oneself to the common good.”',
      context: 'Sollicitudo Rei Socialis',
    },
  },
];

// Helper to look up a daily entry by Day of Year (1-365) or Date Key ("MM-DD")
export function getDailyLookup(targetDate?: Date): DailyLookup {
  const date = targetDate || new Date();
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Format MM-DD
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;

  // Find exact entry or cyclic match from CORE_DAILY_ENTRIES
  const exactMatch = CORE_DAILY_ENTRIES.find(e => e.dateKey === dateKey);
  if (exactMatch) {
    return exactMatch;
  }

  const index = (dayOfYear - 1) % CORE_DAILY_ENTRIES.length;
  const template = CORE_DAILY_ENTRIES[index >= 0 ? index : 0];
  
  return {
    ...template,
    dayOfYear,
    dateKey,
  };
}

export function getAllDailyLookups(): DailyLookup[] {
  return CORE_DAILY_ENTRIES;
}
