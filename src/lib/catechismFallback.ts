import { CCC_SEARCH_DATABASE, CccSearchEntry } from '../data/cccDatabase';
import { CORE_DAILY_ENTRIES } from '../data/dailyEntries';

export interface FallbackAnswerResult {
  answer: string;
  source: 'database_synthesis' | 'exact_match';
  matchedParagraphs: number[];
}

export function generateCatechismFallbackAnswer(
  question: string,
  userContext?: string,
  selectedPillar?: string
): FallbackAnswerResult {
  const qLower = question.toLowerCase();
  const matchedParagraphs: number[] = [];

  // Keyword topic mapping for rich theological answers
  if (qLower.includes('confess') || qLower.includes('priest') || qLower.includes('reconciliation') || qLower.includes('absolution')) {
    matchedParagraphs.push(1422, 1441, 1442, 1448);
    return {
      source: 'exact_match',
      matchedParagraphs,
      answer: `### 1. Why Confess to a Priest?
The Catholic Church teaches that **only God forgives sins** (CCC 1441). However, because Jesus is the Son of God, He said of Himself: *"The Son of Man has authority on earth to forgive sins"* (Mark 2:10). Christ willed that His whole Church should be the sign and instrument of forgiveness. 

Crucially, Jesus explicitly entrusted the exercise of the power of absolution to His Apostles on Easter Sunday night:
> *"He breathed on them and said to them: 'Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained.'"* (John 20:22–23; CCC 1441–1442).

By Christ's divine design, the priest acts *in persona Christi capitis* (in the person of Christ the Head) and represents the whole Christian community that was wounded by sin.

### 2. The Underlying "Why"
Sin is never purely private. Every sin:
1. **Offends God** and breaks our communion with Him.
2. **Wounds the Body of Christ**, the Church. 

Because sin harms both our relationship with God and the Church community, reconciliation must visibly express both reconciliations. In the confessional, you are not speaking to a mere private individual, but to Christ ministering through His ordained shepherd who is bound by the inviolable **Seal of Confession** (CCC 1467) to never reveal what was heard, under pain of automatic excommunication.

### 3. Dispelling Common Misunderstandings
* **Myth:** *"Catholics believe priests have divine power in themselves."*
  * **Truth:** The priest has no power of his own; he is solely an earthen vessel and minister of Christ's mercy (CCC 1442).
* **Myth:** *"You can just confess privately in your room with no need for the Sacrament."*
  * **Truth:** While we should pray daily for forgiveness, mortal sins cut off sanctifying grace and require sacramental reconciliation as established by Christ (CCC 1456). Hearing the words *"I absolve you from your sins"* gives absolute objective psychological and spiritual certainty that you are forgiven.

### 4. Practical Adult Applications
1. **Prepare with an Examination of Conscience:** Rather than feeling anxious, view confession as stepping into the hospital of divine mercy. Use the Ten Commandments or the Beatitudes as an adult guide.
2. **Be Concrete and Brief:** State your state of life, how long since your last confession, and confess your sins by kind and approximate number without lengthy rationalizations.
3. **Rest in the Divine Promise:** When the priest raises his hand and says *"I absolve you,"* Christ Himself deletes the debt of your guilt forever.

### 5. Closing Prayer
*Lord Jesus Christ, Divine Physician, grant me the humility to bring my wounds into Your light. Remove all shame and fear, and fill my soul with the peace that only Your holy absolution can bestow. Amen.*`,
    };
  }

  if (qLower.includes('eucharist') || qLower.includes('real presence') || qLower.includes('transubstantiation') || qLower.includes('communion')) {
    matchedParagraphs.push(1324, 1374, 1375, 1376);
    return {
      source: 'exact_match',
      matchedParagraphs,
      answer: `### 1. The Real Presence in the Eucharist
The Holy Eucharist is *"the source and summit of the Christian life"* (CCC 1324; *Lumen Gentium* 11). The Catholic Church firmly believes that in the Blessed Sacrament, the **Body and Blood, together with the soul and divinity, of our Lord Jesus Christ and, therefore, the whole Christ is truly, really, and substantially contained** (CCC 1374; Council of Trent).

This is not a metaphor or a mere symbolic reminder. At the Last Supper, Jesus did not say *"This represents my body"*; He said:
> *"Take, eat; this is my body... Drink of it, all of you; for this is my blood of the covenant"* (Matthew 26:26–28).

In John 6 (the Bread of Life discourse), when the crowds objected saying *"How can this man give us his flesh to eat?"*, Jesus did not soften His words. Instead, He repeated: *"Unless you eat the flesh of the Son of Man and drink his blood, you have no life in you"* (John 6:53).

### 2. Transubstantiation Explained
By the consecration of the bread and wine, there occurs a change of the entire substance of the bread into the substance of the Body of Christ our Lord, and of the entire substance of the wine into the substance of His Blood. This unique and wonderful change the Catholic Church fittingly calls **transubstantiation** (CCC 1376).
* The **accidents** (the physical appearance, taste, smell, texture, and chemical properties) remain those of bread and wine.
* The **substance** (the metaphysical reality of what the thing actually is) becomes the living, glorified Christ Himself.

### 3. Dispelling Common Misunderstandings
* **Myth:** *"It's just a cannibalistic ritual or physical flesh."*
  * **Truth:** It is Christ's risen, glorified, and sacramental presence, not dead flesh. We receive Christ whole and entire.
* **Myth:** *"It's only a symbolic memorial."*
  * **Truth:** From the earliest Church Fathers (St. Ignatius of Antioch in 110 AD, St. Justin Martyr in 150 AD), Christians unanimously testified that the Eucharist is the identical flesh of Christ.

### 4. Practical Adult Applications
1. **Prepare Yourself with Reverence:** Fast from food and drink (except water and medicine) for at least one hour before Holy Communion (CCC 1387). If conscious of grave/mortal sin, receive the Sacrament of Penance first.
2. **Practice Eucharistic Adoration:** Spend 15 to 30 minutes in quiet prayer before the Blessed Sacrament in the tabernacle or monstrance. Speak to Jesus directly as your friend and Lord.
3. **Make a Genuine Thanksgiving:** After receiving Holy Communion, do not rush out of Mass; spend several quiet minutes in heartfelt gratitude for receiving the Creator of the universe into your very body.

### 5. Closing Prayer
*O Sacrament Most Holy, O Sacrament Divine, all praise and all thanksgiving be every moment Thine. Lord Jesus, increase my faith in Your living presence, that I may receive You with a clean and humble heart. Amen.*`,
    };
  }

  if (qLower.includes('mary') || qLower.includes('saints') || qLower.includes('intercession') || qLower.includes('worship mary') || qLower.includes('pray to saints')) {
    matchedParagraphs.push(956, 964, 969, 971, 2677);
    return {
      source: 'exact_match',
      matchedParagraphs,
      answer: `### 1. Honoring Mary and the Communion of Saints
The Catholic Church makes a strict, non-negotiable theological distinction:
* **Latria (Adoration / Worship):** Due to **God alone** (Father, Son, and Holy Spirit). No Catholic may ever worship Mary or any saint (CCC 971, 2112). Doing so would be grave idolatry.
* **Dulia (Veneration / Honor):** Paid to the holy men and women who have run the race and are with God in heaven (CCC 956).
* **Hyperdulia (Highest Veneration):** A special honor given to Mary as the Mother of God (*Theotokos*) and the first disciple of Christ (CCC 971).

### 2. Why Pray to Saints? (The Biblical Logic)
When Catholics "pray" to saints, the word *pray* is used in its traditional English meaning: **to ask / to petition** (as in "pray tell"). 
Just as you would ask a faithful Christian friend on earth to pray for you when you are sick or struggling (1 Timothy 2:1–3, James 5:16), Catholics ask our brothers and sisters who are alive in Christ in heaven to intercede on our behalf before the Throne of God.
* Revelation 5:8 depicts the elders in heaven holding *"golden bowls full of incense, which are the prayers of the saints."*
* The saints are not dead; they are more alive in Christ than we are (Mark 12:27, Hebrews 12:1).

### 3. Mary’s Role: Pointing to Jesus
Mary’s last recorded words in the Gospels are her timeless command to all believers:
> *"Do whatever he tells you."* (John 2:5).

Mary never draws attention to herself; her entire life magnifies the Lord (Luke 1:46). At the foot of the Cross, Jesus gave her to the Apostle John—and through him, to all faithful disciples: *"Behold, your mother"* (John 19:27; CCC 964).

### 4. Practical Adult Applications
1. **Pray the Hail Mary with Contemplation:** Notice the words are drawn directly from the Bible: the greeting of Archangel Gabriel (Luke 1:28) and St. Elizabeth's praise (Luke 1:42).
2. **Choose a Patron Saint for Your Vocation:** Read the biography of a saint who faced similar trials (e.g., St. Thomas More for career ethics, St. Gianna for parents, St. Augustine for late bloomers).
3. **Ask for Intercession in Trials:** When carrying a heavy cross, ask the Mother of Sorrows to stand beside you just as she stood beneath the Cross of her Son.

### 5. Closing Prayer
*Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Lead us always into deeper, unreserved love for your Son, our Savior Jesus Christ. Amen.*`,
    };
  }

  if (qLower.includes('suffering') || qLower.includes('evil') || qLower.includes('why do bad things happen') || qLower.includes('pain') || qLower.includes('tragedy')) {
    matchedParagraphs.push(309, 311, 312, 1500, 1508);
    return {
      source: 'exact_match',
      matchedParagraphs,
      answer: `### 1. The Mystery of Suffering and Evil
The Catechism acknowledges that *"there is not a single aspect of the Christian message that is not in part an answer to the question of evil"* (CCC 309).
God is infinitely good and can never be the cause of moral evil:
> *"God is in no way, directly or indirectly, the cause of moral evil. He permits it, however, because he respects the freedom of his creatures"* (CCC 311).

In creating beings with free will, God created the real possibility that love could be chosen—and the tragic possibility that love could be rejected, which introduced sin and disorder into creation.

### 2. Divine Providence: Bringing Good from Evil
God’s almighty power is displayed most brilliantly in His ability to bring greater good out of the worst evils. 
The paramount example is the **Crucifixion of Christ**: from the greatest crime ever committed (the rejection and murder of God's only Son), God brought forth the greatest good: the salvation and redemption of the entire human race (CCC 312).

### 3. Redemptive Suffering
Catholicism does not view suffering as meaningless or merely to be escaped at all costs. Through Christ’s Passion, suffering was transformed from an empty punishment into a tool of redemption:
* St. Paul wrote: *"I rejoice in my sufferings for your sake, and in my flesh I complete what is lacking in Christ’s afflictions for the sake of his body, that is, the Church"* (Colossians 1:24; CCC 1508).
* When united to Jesus on the Cross, our daily trials and illnesses become fruitful prayers of intercession for others.

### 4. Practical Adult Applications
1. **Offer It Up:** In moments of physical pain, grief, or frustration, pray silently: *"Lord, I unite this pain with Your wounds on Calvary for the salvation of my family."*
2. **Accompany the Suffering:** True faith does not offer glib platitudes to those in pain. Be a minister of presence: visit the sick, console the grieving, and alleviate distress (CCC 2447).
3. **Anchor in Eternity:** Remember St. Paul's perspective: *"I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us"* (Romans 8:18).

### 5. Closing Prayer
*Lord Jesus, You took upon Yourself the weight of our sorrows. When pain touches my life, save me from bitterness and despair. Help me to trust that in Your hands, no suffering is ever wasted. Amen.*`,
    };
  }

  if (qLower.includes('mortal sin') || qLower.includes('venial sin') || qLower.includes('difference between sins')) {
    matchedParagraphs.push(1854, 1855, 1857, 1859);
    return {
      source: 'exact_match',
      matchedParagraphs,
      answer: `### 1. Mortal Sin vs. Venial Sin
The distinction between mortal and venial sin is rooted in Sacred Scripture: *"There is sin which is mortal... and there is sin which is not mortal"* (1 John 5:16–17; CCC 1854).

* **Mortal Sin:** Destroys charity in the heart of man by a grave violation of God’s law; it turns man away from God, who is his ultimate end and his beatitude, by preferring an inferior good to Him (CCC 1855).
* **Venial Sin:** Allows charity to subsist, even though it offends and wounds it (CCC 1855). It impedes the soul’s progress in virtue and merits temporal punishment.

### 2. The Three Necessary Conditions for Mortal Sin
For a sin to be mortal, **all three** of the following conditions must be simultaneously met (CCC 1857):
1. **Grave Matter:** The action must involve serious subject matter, specified by the Ten Commandments (e.g., murder, adultery, theft, perjury, grave hatred) (CCC 1858).
2. **Full Knowledge:** The person must know that the act is contrary to God’s law and seriously sinful (CCC 1859).
3. **Deliberate / Complete Consent:** The person must freely choose the act with personal deliberate will (CCC 1859).

If any of these three conditions is lacking (e.g. lack of awareness or impaired freedom due to panic or addiction), the sin is venial, not mortal.

### 3. Practical Adult Applications
1. **Do Not Receive Communion in Mortal Sin:** Anyone conscious of a grave sin must receive sacramental absolution in the Sacrament of Penance before approaching Holy Communion (CCC 1457).
2. **Do Not Become Scrupulous:** Temptation itself is NOT a sin. An involuntary fleeting thought or passing emotional reaction is not a mortal sin because deliberate consent is absent.
3. **Confess Venial Sins Regularly:** While venial sins are forgiven by genuine acts of contrition, prayer, and receiving the Eucharist, confessing them regularly strengthens our spiritual immune system against mortal sin (CCC 1863).

### 4. Closing Prayer
*O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who art all-good and deserving of all my love. Firmly resolve, with the help of Thy grace, to sin no more and avoid the near occasions of sin. Amen.*`,
    };
  }

  // General search fallback across CCC database
  const searchTerms = qLower.split(/\s+/).filter(term => term.length > 3);
  let bestMatch: CccSearchEntry | null = null;
  let highestScore = 0;

  for (const entry of CCC_SEARCH_DATABASE) {
    let score = 0;
    const searchable = `${entry.title} ${entry.topic} ${entry.excerpt} ${entry.fullText} ${entry.tags.join(' ')}`.toLowerCase();
    for (const term of searchTerms) {
      if (searchable.includes(term)) score += 2;
      if (entry.title.toLowerCase().includes(term)) score += 3;
      if (entry.tags.some(t => t.toLowerCase().includes(term))) score += 4;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore > 0) {
    matchedParagraphs.push(bestMatch.paragraphNumber);
    return {
      source: 'database_synthesis',
      matchedParagraphs,
      answer: `### 1. Catechism Foundation: ${bestMatch.title} (CCC ${bestMatch.paragraphNumber})
The *Catechism of the Catholic Church* addresses this inquiry in the context of **${bestMatch.pillar}**:

> *"${bestMatch.fullText}"* (CCC ${bestMatch.paragraphNumber})

### 2. Theological & Doctrinal Meaning
The Church teaches that our faith is an organic whole where every truth is connected. Concerning **${bestMatch.topic}**, the Church invites every adult to reflect on God's intentional design:
* **The Principle:** ${bestMatch.keyPracticalPoint}
* **Scriptural Harmony:** Sacred Scripture and the living Tradition of the Church testify that God continuously calls the human person into union with Himself, providing the grace to live faithfully.

### 3. Practical Application for Daily Living
1. **Reflect Personally:** Ask how **${bestMatch.topic}** directly impacts your family, career, or daily decisions today.
2. **Cultivate Virtue:** Take concrete steps to grow in this area through regular prayer, the Sacraments, and works of charity.
3. **Study Deeper:** Read the surrounding Catechism paragraphs (CCC ${Math.max(1, bestMatch.paragraphNumber - 2)}–${bestMatch.paragraphNumber + 2}) to grasp the full doctrinal context.

### 4. Closing Thought & Prayer
*Lord, You are the way, the truth, and the life. Enlighten my mind to understand Your holy teachings, and give strength to my will to put them into practice with joy and steadfastness. Amen.*`,
    };
  }

  // Default Catechism Overview fallback
  matchedParagraphs.push(1, 27, 1814);
  return {
    source: 'database_synthesis',
    matchedParagraphs,
    answer: `### 1. Faith Seeking Understanding (*Fides Quaerens Intellectum*)
Regarding your question: *"**${question}**"*:
The *Catechism of the Catholic Church* begins with this fundamental reality:
> *"God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man."* (CCC 1)

Every Catholic doctrine, moral command, and sacramental rite exists for one purpose: to facilitate and protect this living friendship between the human person and the Triune God.

### 2. The Core Pillars of Catholic Doctrine
When considering questions of faith as an adult learner:
* **The Profession of Faith (Creed):** What God has revealed to us through Scripture and Tradition (CCC 26–1065).
* **The Celebration of the Christian Mystery (Sacraments):** How Christ’s redemptive grace is physically communicated to us (CCC 1066–1690).
* **Life in Christ (Morality & Conscience):** How we act as disciples made in the image and likeness of God (CCC 1691–2557).
* **Christian Prayer:** How we converse with and abide in the living God (CCC 2558–2865).

### 3. Practical Daily Guidance
1. **Bring Your Questions to God in Prayer:** An intellectual question about the faith is an invitation into conversation with God.
2. **Consult the Catechism Directly:** The Catechism is cross-referenced with Sacred Scripture and the Church Fathers.
3. **Seek Faithful Accompaniment:** Discuss your questions with an OCIA catechist, priest, or mature adult in the faith.

### 4. A Prayer for Guidance
*Holy Spirit, Spirit of Truth and Wisdom, guide my heart and mind as I seek to know and love the Church that Christ founded. Fill me with light and grant me peace on this journey. Amen.*`,
  };
}
