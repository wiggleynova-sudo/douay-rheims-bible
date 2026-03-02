export type StudyVerse = {
  book: string; chapter: number; verse: number
  note: string // brief context for why this verse is in the path
}

export type StudyPath = {
  id: string; title: string; icon: string
  description: string; color: string
  verses: StudyVerse[]
}

export const STUDY_PATHS: StudyPath[] = [
  {
    id: 'mary-in-scripture',
    title: 'Mary in Scripture',
    icon: '🌹',
    color: '#4a9eff',
    description: 'From the first Marian prophecy in Genesis to the Woman of the Apocalypse — the Scriptural foundations of Catholic Mariology. Each passage reveals a facet of Mary\'s unique role in salvation history.',
    verses: [
      { book: 'genesis',    chapter: 3,  verse: 15, note: 'The Protoevangelium — "enmity between thee and the woman." The first Messianic prophecy, and the first Marian text. The "woman" and her "seed" foreshadow Mary and Christ.' },
      { book: 'isaiah',     chapter: 7,  verse: 14, note: '"Behold a virgin shall conceive" — the great Messianic prophecy quoted in Matthew 1:23. Isaiah sees the Incarnation seven centuries before Bethlehem.' },
      { book: 'matthew',    chapter: 1,  verse: 23, note: 'Matthew explicitly identifies Mary as the fulfillment of Isaiah 7:14: "Emmanuel, which being interpreted is, God with us."' },
      { book: 'john',       chapter: 2,  verse: 1,  note: 'The Wedding at Cana. Mary\'s intercession prompts Christ\'s first miracle. "Whatsoever he shall say to you, do ye." Mary\'s perpetual role as mediatrix of grace.' },
      { book: 'john',       chapter: 19, verse: 26, note: '"Woman, behold thy son." From the Cross, Christ gives Mary to the Beloved Disciple — and through him, to all the faithful. The spiritual motherhood of Mary.' },
      { book: 'john',       chapter: 19, verse: 27, note: '"And from that hour, the disciple took her to his own." The Church receives Mary as mother.' },
      { book: 'revelation', chapter: 12, verse: 1,  note: '"A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars." Catholic tradition identifies this as Mary — the New Eve, Queen of Heaven.' },
    ],
  },
  {
    id: 'eucharist-in-scripture',
    title: 'The Eucharist in Scripture',
    icon: '✝️',
    color: '#C9A84C',
    description: 'The Eucharist is the "source and summit of the Christian life" (CCC 1324). Scripture prepares for, promises, and institutes this great Sacrament. Follow the Scriptural thread from Melchizedek\'s offering through the Last Supper to the Wedding Feast of the Lamb.',
    verses: [
      { book: 'psalms',     chapter: 22, verse: 5,  note: '"Thou hast prepared a table before me... my chalice which inebriateth me." The Psalmist anticipates the Eucharistic banquet — a table prepared even against enemies, an overflowing chalice.' },
      { book: 'isaiah',     chapter: 53, verse: 7,  note: '"Led as a sheep to the slaughter." Isaiah\'s Suffering Servant — whose body is broken and blood poured out — is identified by John the Baptist as "the Lamb of God" (John 1:29).' },
      { book: 'john',       chapter: 1,  verse: 29, note: '"Behold the Lamb of God, who taketh away the sin of the world." The Eucharist IS the Lamb — the same sacrifice of Calvary, made present on every altar.' },
      { book: 'john',       chapter: 6,  verse: 35, note: '"I am the bread of life." The Bread of Life Discourse prepares the disciples for the radical gift of the Eucharist. Jesus speaks of himself as food and drink.' },
      { book: 'john',       chapter: 6,  verse: 51, note: '"The bread that I will give is my flesh, for the life of the world." An explicit statement of the Real Presence — the bread is his flesh, not merely a symbol of it.' },
      { book: 'john',       chapter: 6,  verse: 53, note: '"Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you." Many disciples left after this teaching. Jesus did not call them back or explain it as metaphor.' },
      { book: 'john',       chapter: 6,  verse: 55, note: '"My flesh is meat indeed, and my blood is drink indeed." The Greek word used is trōgō — "to gnaw" or "to eat" in the most physical sense. Not metaphorical.' },
      { book: 'matthew',    chapter: 26, verse: 26, note: '"This is my body." The words of Institution at the Last Supper. Christ, the eternal High Priest, offers himself to the Father through the hands of the Apostles.' },
      { book: 'matthew',    chapter: 26, verse: 28, note: '"This is my blood of the new testament, which shall be shed for many." The New Covenant is sealed in blood — just as the Old Covenant at Sinai (Exodus 24:8).' },
    ],
  },
  {
    id: 'papacy-in-scripture',
    title: 'The Papacy in Scripture',
    icon: '⚓',
    color: '#8B0000',
    description: 'The Catholic teaching on Papal primacy is not an invention of later centuries — it is grounded in explicit Scriptural texts. Christ gives unique authority to Peter and his successors. These are the passages every Catholic should know by heart.',
    verses: [
      { book: 'matthew',    chapter: 16, verse: 18, note: '"Tu es Petrus, et super hanc petram aedificabo Ecclesiam meam." Peter alone receives the name "Rock" (Aramaic: Kēphā). On this rock Christ builds his Church — not on Peter\'s faith alone, but on Peter himself.' },
      { book: 'matthew',    chapter: 16, verse: 19, note: '"I will give to thee the keys of the kingdom of heaven." The keys are the symbol of royal stewardship in Isaiah 22:22. Christ gives Peter the authority of a prime minister over his household, the Church.' },
    ],
  },
  {
    id: 'salvation-history',
    title: 'Salvation History Timeline',
    icon: '🗺️',
    color: '#32B450',
    description: 'The entire Bible is one continuous story of God\'s plan to rescue humanity from sin and restore us to communion with himself. This path traces the major movements of that story — from Creation through the Fall, the Covenants, the Incarnation, and the final Consummation.',
    verses: [
      { book: 'genesis',    chapter: 1,  verse: 1,  note: 'CREATION — "In the beginning God created heaven and earth." The story begins with a God who creates freely, out of love, and calls his creation very good.' },
      { book: 'genesis',    chapter: 1,  verse: 27, note: 'THE IMAGO DEI — "God created man to his own image." Human dignity rests on this: we are made in the image and likeness of the Trinity.' },
      { book: 'genesis',    chapter: 3,  verse: 6,  note: 'THE FALL — "She took of the fruit thereof, and did eat." Original sin enters the world. The consequences: death, suffering, disordered desire, exile from God\'s presence.' },
      { book: 'genesis',    chapter: 3,  verse: 15, note: 'THE PROMISE — "I will put enmities between thee and the woman." Immediately after the Fall, God promises a Redeemer. The entire Old Testament is the story of waiting for this promise\'s fulfillment.' },
      { book: 'isaiah',     chapter: 9,  verse: 6,  note: 'PROPHECY — "A child is born to us, and a son is given to us." Isaiah, 700 years before Christ, sees the Incarnation: a child who is simultaneously "God the Mighty, the Father of the world to come."' },
      { book: 'john',       chapter: 1,  verse: 14, note: 'THE INCARNATION — "The Word was made flesh." The turning point of all history. God himself enters creation as a human being. The second Person of the Trinity takes on our nature to redeem it from within.' },
      { book: 'matthew',    chapter: 26, verse: 28, note: 'THE NEW COVENANT — "My blood of the new testament, which shall be shed for many." At the Last Supper, Christ seals the new and eternal covenant — fulfilling and surpassing all the covenants of the Old Testament.' },
      { book: 'john',       chapter: 3,  verse: 16, note: 'THE MISSION — "God so loved the world as to give his only begotten Son." The theological summary of the entire salvation event: motive (love), means (the Son), and goal (eternal life).' },
      { book: 'revelation', chapter: 21, verse: 1,  note: 'THE CONSUMMATION — "A new heaven and a new earth." The story ends not with destruction but with renewal. God makes all things new. The original goodness of creation is restored and elevated beyond what was lost.' },
      { book: 'revelation', chapter: 21, verse: 4,  note: 'THE PROMISE KEPT — "God shall wipe away all tears from their eyes: and death shall be no more." The wounds of the Fall are healed. Every tear traced back to Genesis 3 is wiped away forever.' },
    ],
  },
  {
    id: 'apologetics-core',
    title: 'Catholic Apologetics',
    icon: '⚔️',
    color: '#FF8C00',
    description: 'The key Scriptural texts for defending core Catholic doctrines. Know these passages, their Catholic interpretation, and how they differ from common objections. "Always be ready to give an answer to every man that asketh you a reason for the hope that is in you" (1 Peter 3:15).',
    verses: [
      { book: 'matthew',    chapter: 16, verse: 18, note: 'PAPAL PRIMACY — The rock on which the Church is built is Peter himself (Aramaic Kēphā = rock). Objection: "the rock is Peter\'s faith, not Peter." Response: Christ renames Simon to Rock — names in Scripture denote vocation and nature, not just description.' },
      { book: 'matthew',    chapter: 16, verse: 19, note: 'KEYS OF THE KINGDOM — The authority to bind and loose refers to the rabbinic authority to permit and forbid, to make authoritative rulings. The Church\'s Magisterium participates in this authority.' },
      { book: 'john',       chapter: 6,  verse: 53, note: 'REAL PRESENCE — "Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you." This is the strongest possible statement — Christ uses the word trōgō (gnaw), not phagō (eat abstractly). Many disciples left; Christ did not retract.' },
      { book: 'john',       chapter: 20, verse: 23, note: 'CONFESSION — "Whose sins you shall forgive, they are forgiven them: and whose sins you shall retain, they are retained." Christ gives the Apostles — not the individual sinner — the power to forgive or retain sins. Requires auricular confession.' },
      { book: 'john',       chapter: 19, verse: 27, note: 'MARIAN DEVOTION — Honoring Mary is not worship; it is honoring the one Christ himself honored with the gift of motherhood. "Behold thy mother" — the disciple takes her "into his own." We are that disciple.' },
      { book: 'genesis',    chapter: 1,  verse: 27, note: 'HUMAN DIGNITY — Every person, regardless of development stage, bears the divine image. The Catholic opposition to abortion, euthanasia, and exploitation is rooted here.' },
      { book: 'matthew',    chapter: 26, verse: 26, note: 'THE MASS AS SACRIFICE — "This is my body." The Mass is not a re-crucifixion but the one Sacrifice of Christ made perpetually present. The Eucharist is the re-presentation (making present again) of Calvary, not a repetition.' },
      { book: 'romans',     chapter: 8,  verse: 28, note: 'SUFFERING & PROVIDENCE — "All things work together unto good for those who love God." Catholic theodicy: evil is not the final word. God does not cause evil but permits it and draws greater good from it.' },
    ],
  },
  {
    id: 'prayer-of-scripture',
    title: 'Prayer in Scripture',
    icon: '🙏',
    color: '#A78BFA',
    description: 'Scripture is itself a school of prayer. From the Psalms — the prayer book of Israel and the Church — through the Our Father, to the final Amen of Revelation, the Bible teaches us how to speak to God and listen to him.',
    verses: [
      { book: 'psalms',     chapter: 1,  verse: 1,  note: 'BLESSED MAN — The one who meditates on God\'s law day and night. Lectio Divina — the prayerful reading of Scripture — is itself a form of prayer. Meditation on the Word is communion with God.' },
      { book: 'psalms',     chapter: 22, verse: 1,  note: '"THE LORD IS MY SHEPHERD" — The simplest and most beloved prayer of trust. A prayer for daily recitation and for the dying hour.' },
      { book: 'psalms',     chapter: 51, verse: 1,  note: 'THE MISERERE — The great prayer of repentance, attributed to David after his sin with Bathsheba. Prayed daily at Night Prayer in the Liturgy of the Hours.' },
      { book: 'psalms',     chapter: 51, verse: 10, note: '"Create a clean heart in me, O God" — The essential prayer for conversion. Not moral improvement but divine creation: only God can make the heart clean.' },
      { book: 'matthew',    chapter: 6,  verse: 9,  note: 'THE OUR FATHER — Christ\'s own prayer, given when asked "Lord, teach us to pray." The Catechism calls it "the summary of the whole Gospel" (CCC 2761). Prayed at every Mass.' },
      { book: 'matthew',    chapter: 6,  verse: 11, note: '"PANEM NOSTRUM SUPERSUBSTANTIALEM" — The Vulgate gives a fascinating translation: "supersubstantial bread" — bread beyond substance. St. Jerome\'s translation links the Our Father directly to the Eucharist.' },
      { book: 'john',       chapter: 3,  verse: 5,  note: 'BORN OF WATER AND SPIRIT — Baptism is not merely a ritual but a new birth — a supernatural event. Prayer flows from this new identity: we pray as children of God, addressed as "Our Father."' },
    ],
  },
]

export function getStudyPath(id: string): StudyPath | undefined {
  return STUDY_PATHS.find(p => p.id === id)
}
