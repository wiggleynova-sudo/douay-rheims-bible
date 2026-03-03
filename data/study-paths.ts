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
  // ── 1. MARY IN SCRIPTURE ──────────────────────────────────────
  {
    id: 'mary-in-scripture',
    title: 'Mary in Scripture',
    icon: '🌹',
    color: '#4a9eff',
    description: 'From the first Marian prophecy in Genesis to the Woman of the Apocalypse — the Scriptural foundations of Catholic Mariology. Each passage reveals a facet of Mary\'s unique role in salvation history.',
    verses: [
      { book: 'genesis',       chapter: 3,  verse: 15, note: 'THE PROTOEVANGELIUM — "I will put enmities between thee and the woman, and thy seed and her seed: she shall crush thy head." The very first promise of redemption contains the first Marian text. The woman and her seed foreshadow Mary and Christ.' },
      { book: 'isaiah',        chapter: 7,  verse: 14, note: '"ECCE VIRGO CONCIPIET" — "Behold a virgin shall conceive and bear a son." Isaiah foresees the Incarnation seven centuries before Bethlehem. Matthew 1:23 identifies Mary as the fulfillment of this prophecy.' },
      { book: 'judith',        chapter: 13, verse: 18, note: 'TYPE OF MARY — "Blessed art thou, O daughter, by the Lord the most high God, above all women upon the earth." Judith, the woman who crushed the head of the enemy, is a pre-figure of Mary crushing the serpent. The praise given to Judith is echoed in Elizabeth\'s greeting to Mary (Luke 1:42).' },
      { book: 'judith',        chapter: 15, verse: 10, note: '"THOU ART THE GLORY OF JERUSALEM, thou art the joy of Israel, thou art the honour of our people." A title given to Judith — and by typology, to Mary, the glory of the Church, the joy of the redeemed.' },
      { book: 'ecclesiasticus', chapter: 24, verse: 14, note: 'WISDOM-MARY — "I was exalted like a cedar in Libanus... I grew up as a rose plant in Jericho." The Wisdom literature of Ecclesiasticus 24 has traditionally been read as a type of Our Lady. The Church applies this passage to Mary in several liturgical antiphons.' },
      { book: 'matthew',       chapter: 1,  verse: 23, note: 'FULFILLMENT — Matthew explicitly identifies Mary as the fulfillment of Isaiah 7:14: "Emmanuel, which being interpreted is, God with us." The Evangelist makes the typological connection explicit.' },
      { book: 'john',          chapter: 2,  verse: 1,  note: 'THE WEDDING AT CANA — Mary\'s intercession prompts Christ\'s first public miracle. "Whatsoever he shall say to you, do ye" — Mary\'s standing instruction to the Church. Her mediation is not competition with Christ\'s; it flows from it.' },
      { book: 'john',          chapter: 19, verse: 26, note: '"WOMAN, BEHOLD THY SON." From the Cross, Christ gives Mary to the Beloved Disciple — and through him, to all the faithful. The spiritual motherhood of Mary is formally constituted in the very moment of Redemption.' },
      { book: 'john',          chapter: 19, verse: 27, note: '"And from that hour, the disciple took her to his own." The Church receives Mary as mother. Every Christian who stands at the foot of the Cross takes her into his own life.' },
      { book: 'revelation',    chapter: 12, verse: 1,  note: '"A WOMAN CLOTHED WITH THE SUN, and the moon under her feet, and on her head a crown of twelve stars." Catholic tradition identifies this as Mary — the New Eve, Queen of Heaven, Mother of the Church — in her final triumph.' },
    ],
  },

  // ── 2. THE EUCHARIST IN SCRIPTURE ─────────────────────────────
  {
    id: 'eucharist-in-scripture',
    title: 'The Eucharist in Scripture',
    icon: '✝️',
    color: '#C9A84C',
    description: 'The Eucharist is the "source and summit of the Christian life" (CCC 1324). Scripture prepares for, promises, and institutes this great Sacrament — from Melchisedech\'s offering through the Passover Lamb, the Bread of Life Discourse, and the Last Supper, to the Wedding Feast of the Lamb.',
    verses: [
      { book: 'genesis',       chapter: 14, verse: 18, note: 'MELCHISEDECH\'S OFFERING — "But Melchisedech the king of Salem, bringing forth bread and wine, for he was the priest of the most high God, blessed him." This is the first prefigurement of the Eucharist: a priest-king offering bread and wine. Psalm 109:4 and Hebrews 7 identify Melchisedech as a type of Christ the eternal High Priest.' },
      { book: 'exodus',        chapter: 12, verse: 5,  note: 'THE PASSOVER LAMB — "Your lamb shall be without blemish." The Paschal lamb of Exodus — without spot, sacrificed, its blood marking the doorposts — is the supreme Old Testament type of Christ in the Eucharist. "Christ our Pasch is sacrificed" (1 Corinthians 5:7).' },
      { book: 'exodus',        chapter: 16, verse: 4,  note: 'MANNA IN THE DESERT — "I will rain bread from heaven for you." The manna with which God fed Israel for forty years is the figure of the Eucharist. Christ explicitly invokes this type in John 6:31-35: "I am the bread of life."' },
      { book: 'psalms',        chapter: 22, verse: 5,  note: '"Thou hast prepared a table before me... my chalice which inebriateth me, how goodly is it!" The Psalmist anticipates the Eucharistic banquet — a table prepared even against enemies, an overflowing chalice of salvation.' },
      { book: 'wisdom',        chapter: 16, verse: 20, note: 'BREAD FROM HEAVEN — "Instead of which things thou didst feed thy people with the food of angels, and gavest them bread from heaven prepared without labour; having in it all that is delicious and the sweetness of every taste." Wisdom reflects on the manna, prefiguring the Eucharist.' },
      { book: 'ecclesiasticus', chapter: 15, verse: 3,  note: '"She shall feed him with the bread of life and understanding, and give him the water of wholesome wisdom to drink." The Wisdom literature points to a nourishment deeper than physical food — fulfilled in the Bread of Life.' },
      { book: 'isaiah',        chapter: 53, verse: 7,  note: '"Led as a sheep to the slaughter." Isaiah\'s Suffering Servant — whose body is broken and blood is poured out — is identified by John the Baptist as "the Lamb of God" (John 1:29). The Eucharist IS the Lamb.' },
      { book: 'malachias',     chapter: 1,  verse: 11, note: 'THE PURE OBLATION — "From the rising of the sun even to the going down, my name is great among the Gentiles, and in every place there is sacrifice, and there is offered to my name a clean oblation." The Fathers and the Council of Trent identify this as a prophecy of the Mass offered throughout the world.' },
      { book: 'john',          chapter: 6,  verse: 35, note: '"I AM THE BREAD OF LIFE." The Bread of Life Discourse (John 6) is the great Eucharistic chapter. Christ states plainly that he himself is the bread — not a symbol of it, not a reminder of it, but the thing itself.' },
      { book: 'john',          chapter: 6,  verse: 53, note: '"EXCEPT YOU EAT THE FLESH of the Son of man, and drink his blood, you shall not have life in you." The Greek uses trōgō — to gnaw or chew in the most physical sense. Many disciples left at this teaching. Christ did not call them back or explain it as metaphor.' },
      { book: 'matthew',       chapter: 26, verse: 26, note: '"HOC EST CORPUS MEUM." "This is my body." The words of Institution at the Last Supper. Christ, the eternal High Priest, offers himself to the Father through the hands of the Apostles — the first Mass.' },
      { book: 'matthew',       chapter: 26, verse: 28, note: '"This is my blood of the new testament, which shall be shed for many unto the remission of sins." The New Covenant is sealed in blood — as the Old Covenant at Sinai (Exodus 24:8). The cup IS the blood.' },
      { book: 'revelation',    chapter: 19, verse: 9,  note: '"BLESSED ARE THEY that are called to the marriage supper of the Lamb." The Eucharist is the foretaste of the Wedding Feast of the Lamb — the final and eternal Eucharistic banquet in the New Jerusalem.' },
    ],
  },

  // ── 3. THE PAPACY IN SCRIPTURE ────────────────────────────────
  {
    id: 'papacy-in-scripture',
    title: 'The Papacy in Scripture',
    icon: '⚓',
    color: '#8B0000',
    description: 'The Catholic teaching on Papal primacy is not an invention of later centuries — it is grounded in explicit Scriptural texts. Christ gives unique authority to Peter and his successors. These are the passages every Catholic should know by heart.',
    verses: [
      { book: 'isaiah',    chapter: 22, verse: 22, note: 'THE KEY OF DAVID — "And I will lay the key of the house of David upon his shoulder: and he shall open, and none shall shut: and he shall shut, and none shall open." This is the Old Testament background to Matthew 16:19. The steward of the royal household carries the key of authority. Christ gives this key to Peter.' },
      { book: 'matthew',   chapter: 16, verse: 18, note: '"TU ES PETRUS" — "And I say to thee: That thou art Peter; and upon this rock I will build my church, and the gates of hell shall not prevail against it." Peter alone receives the name "Rock" (Aramaic: Kēphā). On this rock Christ builds his Church — not on Peter\'s faith abstractly, but on Peter himself, his person and office.' },
      { book: 'matthew',   chapter: 16, verse: 19, note: '"THE KEYS OF THE KINGDOM" — "I will give to thee the keys of the kingdom of heaven." The keys are the symbol of royal stewardship from Isaiah 22:22. Christ gives Peter the authority of a prime minister over his household the Church: to bind and loose, to open and close.' },
      { book: 'luke',      chapter: 22, verse: 32, note: '"CONFIRMA FRATRES TUOS" — "But I have prayed for thee, that thy faith fail not: and thou, being once converted, confirm thy brethren." Christ prays for Peter specifically that his faith not fail — and then assigns him the task of strengthening the other Apostles. A perpetual Petrine function.' },
      { book: 'john',      chapter: 21, verse: 15, note: '"PASCE OVES MEAS" — "Feed my lambs... feed my sheep." Three times (matching Peter\'s three denials) Christ entrusts to Peter the universal flock. "Sheep" includes the other Apostles: Peter is shepherd even over his brother Apostles.' },
      { book: 'john',      chapter: 21, verse: 17, note: '"He saith to him the third time: Simon, son of John, lovest thou me? Peter was grieved, because he had said to him the third time... And he said to him: Feed my sheep." The threefold commission seals the office. The grief of Peter, recalling his threefold denial, makes this restoration all the more solemn.' },
    ],
  },

  // ── 4. SALVATION HISTORY ──────────────────────────────────────
  {
    id: 'salvation-history',
    title: 'Salvation History Timeline',
    icon: '🗺️',
    color: '#32B450',
    description: 'The entire Bible is one continuous story of God\'s plan to rescue humanity from sin and restore communion with himself. This path traces the major movements — Creation, Fall, Covenants, Incarnation, and final Consummation — from Genesis to the Apocalypse.',
    verses: [
      { book: 'genesis',       chapter: 1,  verse: 1,  note: 'CREATION — "In the beginning God created heaven and earth." The story begins with a God who creates freely, out of love, and calls his creation very good. Being itself comes from love.' },
      { book: 'genesis',       chapter: 1,  verse: 27, note: 'THE IMAGO DEI — "God created man to his own image." Human dignity rests on this: we are made in the image and likeness of the Trinity. This single verse is the foundation of Catholic anthropology and ethics.' },
      { book: 'genesis',       chapter: 3,  verse: 6,  note: 'THE FALL — "She took of the fruit thereof and did eat." Original sin enters the world. The consequences: spiritual death, suffering, disordered desire (concupiscence), exile from God\'s presence. All of human history is shaped by this event.' },
      { book: 'genesis',       chapter: 3,  verse: 15, note: 'THE FIRST PROMISE — "I will put enmities between thee and the woman, and thy seed and her seed." Immediately after the Fall, God promises a Redeemer. The entire Old Testament is the unfolding of this promise.' },
      { book: 'genesis',       chapter: 22, verse: 18, note: 'THE COVENANT WITH ABRAHAM — "In thy seed shall all the nations of the earth be blessed." God makes an irrevocable covenant with Abraham: through his offspring, salvation will come to all peoples. Paul identifies the "seed" as Christ (Galatians 3:16).' },
      { book: 'exodus',        chapter: 12, verse: 13, note: 'THE PASSOVER — "The blood shall be unto you for a sign... and the blood shall be for a sign on the houses where you are: and I shall see the blood, and shall pass over you." The Passover is the defining redemptive event of the Old Covenant — and the most direct type of the Passion and the Eucharist.' },
      { book: 'exodus',        chapter: 19, verse: 5,  note: 'THE SINAI COVENANT — "If therefore you will hear my voice, and keep my covenant, you shall be my peculiar possession above all people." At Sinai, Israel becomes the People of God. The Law is not punishment but gift — the terms of a covenant with the living God.' },
      { book: 'daniel',        chapter: 7,  verse: 13, note: 'THE SON OF MAN — "I beheld therefore in the vision of the night, and lo, one like the son of man came with the clouds of heaven." Daniel\'s vision of the Son of Man — the Messianic figure who receives universal and everlasting dominion — is the title Christ most often applies to himself.' },
      { book: 'isaiah',        chapter: 9,  verse: 6,  note: 'PROPHECY OF THE INCARNATION — "A child is born to us, and a son is given to us... and his name shall be called, Wonderful, Counsellor, God the Mighty, the Father of the world to come, the Prince of Peace." Isaiah, 700 years before Christ, sees him born and names his divine nature.' },
      { book: 'micheas',       chapter: 5,  verse: 2,  note: 'BETHLEHEM — "And thou Bethlehem Ephrata, art a little one among the thousands of Juda: out of thee shall he come forth unto me that is to be the ruler in Israel: and his going forth is from the beginning, from the days of eternity." Micheas names the birthplace of the Messiah 700 years before it happens.' },
      { book: 'malachias',     chapter: 3,  verse: 1,  note: 'THE MESSENGER — "Behold I send my angel, and he shall prepare the way before my face." The final Old Testament prophet foretells the Precursor — John the Baptist — who will prepare the way of the Lord. Then silence for 400 years.' },
      { book: 'john',          chapter: 1,  verse: 14, note: 'THE INCARNATION — "THE WORD WAS MADE FLESH." The turning point of all history. God himself enters creation as a human being. The eternal Logos takes on our nature to redeem it from within. Creation is renewed from within.' },
      { book: 'matthew',       chapter: 26, verse: 28, note: 'THE NEW COVENANT — "My blood of the new testament, which shall be shed for many unto the remission of sins." At the Last Supper, Christ seals the new and eternal covenant — fulfilling and surpassing all the covenants of the Old Testament.' },
      { book: 'acts',          chapter: 2,  verse: 4,  note: 'THE CHURCH IS BORN — "And they were all filled with the Holy Ghost." At Pentecost, the Spirit descends and the Church is born. The third Person of the Trinity becomes the soul of the Body of Christ, animating it through history.' },
      { book: 'revelation',    chapter: 21, verse: 1,  note: 'THE CONSUMMATION — "A new heaven and a new earth." The story ends not with destruction but with transformation. God makes all things new. The original goodness of creation, wounded by sin, is restored and elevated beyond what was lost.' },
      { book: 'revelation',    chapter: 21, verse: 4,  note: '"GOD SHALL WIPE AWAY ALL TEARS." Every tear traced to Genesis 3 is wiped away forever. Death is no more. The wounds of the Fall are healed. The plan that began in a garden ends in a city — the New Jerusalem, the Bride of the Lamb.' },
    ],
  },

  // ── 5. CATHOLIC APOLOGETICS ───────────────────────────────────
  {
    id: 'apologetics-core',
    title: 'Catholic Apologetics',
    icon: '⚔️',
    color: '#FF8C00',
    description: '"Always be ready to give an answer to every man that asketh you a reason for the hope that is in you" (1 Peter 3:15). These are the key Scriptural passages for defending core Catholic doctrines — with the Catholic interpretation and how to answer common objections.',
    verses: [
      { book: 'matthew',       chapter: 16, verse: 18, note: 'PAPAL PRIMACY — "Thou art Peter, and upon this rock I will build my church." The rock is Peter himself (Aramaic Kēphā = rock). Objection: "the rock is Peter\'s faith." Response: Christ renames Simon to Rock — names in Scripture denote vocation and nature. The Church is built on the man, not merely on an abstract confession.' },
      { book: 'john',          chapter: 6,  verse: 53, note: 'REAL PRESENCE — "Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you." Objection: "This is merely symbolic." Response: Christ uses trōgō (gnaw), not phagō (eat abstractly). Many disciples left; Christ did not retract or explain it as metaphor. If it were symbolic, he would have called them back.' },
      { book: 'john',          chapter: 20, verse: 23, note: 'CONFESSION — "Whose sins you shall forgive, they are forgiven them: and whose sins you shall retain, they are retained." Objection: "Only God can forgive sins." Response: God CAN forgive sins through human ministers — which is precisely what he is doing here. Note: only a MINISTER can retain sins; you cannot retain what you have not heard in confession.' },
      { book: '2-machabees',   chapter: 12, verse: 46, note: 'PURGATORY — "It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins." A deuterocanonical text removed by Protestant reformers precisely because it teaches prayer for the dead. The Catholic canon preserves the Scriptural basis for purgatory and the practice of offering Masses for the dead.' },
      { book: 'james',         chapter: 5,  verse: 14, note: 'ANOINTING OF THE SICK — "Is any man sick among you? Let him bring in the priests of the church, and let them pray over him, anointing him with oil in the name of the Lord." A direct New Testament institution of the sacrament of Anointing of the Sick. Not a Protestant "prayer for healing" but an ordered sacramental act by priests.' },
      { book: 'john',          chapter: 3,  verse: 5,  note: 'BAPTISMAL REGENERATION — "Unless a man be born again of water and the Holy Ghost, he cannot enter into the kingdom of God." Objection: "Born again means a personal conversion experience, not water baptism." Response: Christ specifies "water and the Holy Ghost." The context is Nicodemus asking how a man can be "born again" — physically. Christ\'s answer is baptism.' },
      { book: 'john',          chapter: 19, verse: 27, note: 'MARIAN DEVOTION — Honoring Mary is not idolatry; it is honoring the one Christ himself honoured with divine motherhood. "Behold thy mother — and from that hour, the disciple took her to his own." We are that disciple. To take Mary to our own is Christ\'s command from the Cross.' },
      { book: '1-peter',       chapter: 3,  verse: 15, note: 'THE APOLOGETICS MANDATE — "But sanctify the Lord Christ in your hearts, being ready always to satisfy every one that asketh you a reason of that hope which is in you." The Catholic tradition of intellectual defense of the faith — from Justin Martyr to Aquinas to Newman — begins here.' },
      { book: 'genesis',       chapter: 1,  verse: 27, note: 'HUMAN DIGNITY — "God created man to his own image." Every person, at every stage of development, bears the divine image. The Catholic opposition to abortion, euthanasia, and exploitation is not arbitrary social conservatism but flows from this foundational anthropological truth.' },
      { book: 'hebrews',       chapter: 7,  verse: 24, note: 'THE PRIESTHOOD — "But this, for that he continueth for ever, hath an everlasting priesthood." Christ\'s priesthood is eternal — and he shares it with his Church. The ministerial priesthood is a participation in Christ\'s one eternal priesthood, not a rival to it.' },
    ],
  },

  // ── 6. PRAYER IN SCRIPTURE ────────────────────────────────────
  {
    id: 'prayer-of-scripture',
    title: 'Prayer in Scripture',
    icon: '🙏',
    color: '#A78BFA',
    description: 'Scripture is itself a school of prayer. From the Psalms — the prayer book of Israel and the Church — through the Our Father, to the final Amen of the Apocalypse, the Bible teaches us how to speak to God and listen to him in return.',
    verses: [
      { book: 'psalms',        chapter: 1,  verse: 1,  note: '"BLESSED IS THE MAN" who meditates on God\'s law day and night. Lectio Divina — the prayerful reading of Scripture — is itself a form of prayer. Meditation on the Word is communion with God who speaks through it.' },
      { book: 'psalms',        chapter: 22, verse: 1,  note: '"THE LORD IS MY SHEPHERD" — Psalm 22 (23) is the simplest and most beloved prayer of trust. A prayer for daily recitation, for the dining table, and for the dying hour.' },
      { book: 'psalms',        chapter: 50, verse: 3,  note: 'THE MISERERE — Psalm 50 (51) is the great prayer of repentance, composed by David after his sin with Bathsheba. "Have mercy on me, O God, according to thy great mercy." Prayed daily at Night Prayer in the Liturgy of the Hours.' },
      { book: 'psalms',        chapter: 50, verse: 12, note: '"CREATE A CLEAN HEART IN ME, O God." The essential prayer for conversion. Not moral self-improvement but divine creation: only God can make the heart clean. This is the difference between the Catholic and the merely moralistic understanding of sanctification.' },
      { book: 'tobias',        chapter: 12, verse: 8,  note: 'PRAYER AND FASTING — "Prayer is good with fasting and alms more than to lay up treasures of gold." The angel Raphael\'s teaching to Tobias. The three pillars of interior life — prayer, fasting, almsgiving — appear explicitly in Tobias and are ratified by Christ in Matthew 6.' },
      { book: 'ecclesiasticus', chapter: 35, verse: 21, note: '"THE PRAYER OF HIM THAT HUMBLETH HIMSELF shall pierce the clouds: and till it come nigh he will not be comforted: and he will not depart till the most High behold him." Ecclesiasticus 35 is the great chapter on prayer — humility, confidence, persistence.' },
      { book: 'daniel',        chapter: 3,  verse: 52, note: 'THE CANTICLE OF THE THREE YOUNG MEN — "Blessed art thou, O Lord God of our fathers." The great prayer of Ananias, Azarias, and Misael from the furnace — still sung in the Liturgy of the Hours (Lauds on Sundays and feasts). Drawn from Daniel\'s deuterocanonical additions.' },
      { book: 'matthew',       chapter: 6,  verse: 9,  note: 'THE OUR FATHER — Christ\'s own prayer, given when asked "Lord, teach us to pray." The Catechism calls it "the summary of the whole Gospel" (CCC 2761). Prayed at every Mass, in the Rosary, in the Divine Office. The model for all Christian prayer.' },
      { book: 'matthew',       chapter: 6,  verse: 11, note: '"PANEM NOSTRUM SUPERSUBSTANTIALEM" — The Vulgate renders "daily bread" as "supersubstantial bread" — bread beyond substance. St. Jerome\'s translation links the Our Father directly to the Eucharist. We pray for ordinary food AND for the Bread that endures to eternal life.' },
      { book: 'ephesians',     chapter: 6,  verse: 18, note: '"BY ALL PRAYER AND SUPPLICATION, praying at all times in the Spirit." Paul\'s summary of the Christian life of prayer: constant, in the Spirit, for all the saints. The Church\'s Liturgy of the Hours is the institutionalisation of this command.' },
    ],
  },

  // ── 7. THE DEUTEROCANONICAL BOOKS ─────────────────────────────
  {
    id: 'deuterocanonical-books',
    title: 'The Deuterocanonical Books',
    icon: '📜',
    color: '#7A0E1C',
    description: 'Seven books included in the Catholic and Orthodox canon but removed by Protestant reformers in the 16th century: Tobias, Judith, 1 & 2 Machabees, Wisdom, Ecclesiasticus (Sirach), and Baruch. These passages present the Catholic distinctives of purgatory, prayer for the dead, angelic intercession, and the rich tradition of Jewish wisdom literature.',
    verses: [
      { book: 'tobias',        chapter: 12, verse: 15, note: 'THE SEVEN ANGELS — "I am the angel Raphael, one of the seven who stand before the Lord." Raphael\'s revelation confirms the Catholic doctrine of angelic intercession. The seven archangels "stand before the Lord" — they are present at the heavenly throne, able to present prayers and intercede.' },
      { book: 'tobias',        chapter: 4,  verse: 15, note: 'THE GOLDEN RULE — "See thou never do to another what thou wouldst hate to have done to thee by another." Tobias 4:15 contains the negative formulation of the Golden Rule — centuries before Christ gives the positive form (Matthew 7:12). This shows the Deuterocanonical books\' place within authentic Jewish wisdom tradition.' },
      { book: 'judith',        chapter: 9,  verse: 4,  note: 'THE PRAYER OF JUDITH — "O Lord God of my father Simeon, who gavest him a sword to execute vengeance against strangers..." Judith\'s prayer before she risks her life is one of the great prayers of the Old Testament — courageous, theologically precise, and wholly trusting in God alone.' },
      { book: 'judith',        chapter: 16, verse: 1,  note: 'THE CANTICLE OF JUDITH — "Begin ye to the Lord with timbrels, sing ye to the Lord with cymbals..." Judith\'s victory hymn echoes the Canticle of Miriam (Exodus 15) and foreshadows the Magnificat (Luke 1:46). The Church includes a version of this canticle in the Liturgy of the Hours.' },
      { book: 'wisdom',        chapter: 3,  verse: 1,  note: 'THE SOULS OF THE JUST — "But the souls of the just are in the hand of God, and the torment of death shall not touch them." A crucial deuterocanonical text on the immortality of the soul and the blessedness of those who die in God\'s grace.' },
      { book: 'wisdom',        chapter: 7,  verse: 26, note: 'WISDOM AND THE LOGOS — "For she is the brightness of eternal light, and the unspotted mirror of God\'s majesty, and the image of his goodness." The personified Wisdom of this passage is interpreted by the Fathers as a prophecy of the Logos — the eternal Son who became incarnate.' },
      { book: 'ecclesiasticus', chapter: 24, verse: 1,  note: 'WISDOM PRAISES HERSELF — "Wisdom shall praise her own self, and shall be honoured in God, and shall glory in the midst of her people." Ecclesiasticus 24 is the great Wisdom chapter — applied by the Church to Mary (in the liturgy of her feasts) and to Christ himself.' },
      { book: 'ecclesiasticus', chapter: 2,  verse: 1,  note: '"MY SON, when thou comest to the service of God, stand in justice and in fear, and prepare thy soul for temptation." The opening of Ecclesiasticus 2 — a solemn preparation for the spiritual life. Adversity will come; the man who fears God is not broken by it but purified.' },
      { book: 'baruch',        chapter: 3,  verse: 36, note: '"THIS IS OUR GOD, and there shall no other be accounted of in comparison of him. He found out all the way of knowledge, and gave it to Jacob his servant, and to Israel his beloved. Afterwards he was seen upon earth, and conversed with men." The Church Fathers quote Baruch 3:36-38 as one of the clearest Old Testament prophecies of the Incarnation.' },
      { book: '1-machabees',   chapter: 2,  verse: 50, note: '"Be zealous for the law, and give your lives for the covenant of your fathers." Mathathias\' dying exhortation to his sons — the founding charter of the Machabean resistance. The willingness to die for the faith rather than apostatise is the spirit of every Catholic martyr.' },
      { book: '2-machabees',   chapter: 7,  verse: 9,  note: 'THE RESURRECTION — The martyrdom of the Machabean brothers contains the clearest pre-Christian affirmation of bodily resurrection in the Old Testament. "Thou indeed, O most wicked man, destroyest us out of this present life: but the King of the world will raise us up." A basis for Catholic eschatology.' },
      { book: '2-machabees',   chapter: 12, verse: 46, note: 'PURGATORY — "It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins." The entire point of offering sacrifices for the dead is that they CAN be helped by our prayers — there must therefore exist a state in which purification is still possible. This is the Scriptural foundation of purgatory and Masses for the dead.' },
    ],
  },

  // ── 8. PROPHECY AND FULFILLMENT ───────────────────────────────
  {
    id: 'prophecy-and-fulfillment',
    title: 'Prophecy & Fulfillment',
    icon: '✦',
    color: '#9A7320',
    description: 'The unity of Old and New Testaments is demonstrated nowhere more powerfully than in the fulfillment of specific prophecies. These passages — drawn from Isaiah, the Minor Prophets, the Psalms, and the wisdom books — were written centuries before Christ and fulfilled in precise historical detail. The same God who speaks in both Testaments is their author.',
    verses: [
      { book: 'isaiah',        chapter: 7,  verse: 14, note: 'THE VIRGIN BIRTH — "Behold a virgin shall conceive, and bear a son." Isaiah 7:14 (written c. 735 BC) is explicitly fulfilled in Matthew 1:23. The Hebrew word \'almah (virgin/young woman) is rendered parthenos (virgin) in the Septuagint — the translation Christ and the Apostles used.' },
      { book: 'micheas',       chapter: 5,  verse: 2,  note: 'BORN IN BETHLEHEM — "And thou Bethlehem... out of thee shall he come forth." Written c. 700 BC. Fulfilled: Matthew 2:1, Luke 2:4-7. When King Herod asks the chief priests where Christ is to be born, they quote this text without hesitation (Matthew 2:5-6).' },
      { book: 'zacharias',     chapter: 9,  verse: 9,  note: 'THE KING ON A DONKEY — "Behold thy king will come to thee, the just and saviour: he is poor, and riding upon an ass." Written c. 520 BC. Fulfilled: Matthew 21:5, John 12:15. The Palm Sunday entry into Jerusalem fulfills this prophecy to the letter.' },
      { book: 'zacharias',     chapter: 11, verse: 13, note: 'THIRTY PIECES OF SILVER — "And they weighed for my wages thirty pieces of silver. And the Lord said to me: Cast it to the statuary, a handsome price, that I was prized at by them." Written c. 520 BC. Fulfilled: Matthew 27:9-10 — the price of Judas\' betrayal, cast back into the Temple.' },
      { book: 'zacharias',     chapter: 12, verse: 10, note: '"THEY SHALL LOOK UPON ME WHOM THEY HAVE PIERCED." Written c. 520 BC. Fulfilled: John 19:37 — the soldier pierces Christ\'s side. John explicitly quotes this text. The word \'pierced\' here translates the Hebrew dāqar — to stab with a spear.' },
      { book: 'psalms',        chapter: 21, verse: 2,  note: '"MY GOD, MY GOD, why hast thou forsaken me?" Psalm 21 (22), written by David c. 1000 BC, describes the crucifixion with breathtaking precision — the mocking, the casting of lots for garments, the piercing of hands and feet. Christ quotes its opening words from the Cross.' },
      { book: 'psalms',        chapter: 21, verse: 19, note: '"THEY PARTED MY GARMENTS amongst them; and upon my vesture they cast lots." Written c. 1000 BC. Fulfilled: John 19:24 — "That the scripture might be fulfilled." John quotes this verse explicitly as he describes the soldiers dividing Christ\'s clothing.' },
      { book: 'osee',          chapter: 11, verse: 1,  note: '"OUT OF EGYPT I CALLED MY SON." Written c. 750 BC. Fulfilled: Matthew 2:15 — the flight of the Holy Family into Egypt and their return. Hosea spoke historically of Israel; Matthew sees the deeper fulfillment in Christ, the true Israel, recapitulating the Exodus.' },
      { book: 'jonas',         chapter: 2,  verse: 1,  note: 'SIGN OF JONAS — "Now the Lord prepared a great fish to swallow up Jonas: and Jonas was in the belly of the fish three days and three nights." Written c. 760 BC. Christ himself identifies this as the "sign of Jonas" — his three days in the heart of the earth (Matthew 12:40). Jonas is the greatest Old Testament type of the Resurrection.' },
      { book: 'isaiah',        chapter: 53, verse: 5,  note: '"HE WAS WOUNDED FOR OUR INIQUITIES, he was bruised for our sins: the chastisement of our peace was upon him, and by his bruises we are healed." Written c. 700 BC. The Fourth Servant Song — so precise in its description of the Passion that Justin Martyr used it in the 2nd century as the centerpiece of his Christian apologetic.' },
      { book: 'daniel',        chapter: 9,  verse: 25, note: 'THE SEVENTY WEEKS — "From the going forth of the word, to build up Jerusalem again, unto Christ the prince, there shall be seven weeks, and sixty-two weeks." Daniel\'s prophecy (given c. 535 BC) predicts the exact timing of the Messiah\'s coming. Beginning from the decree of Artaxerxes (445 BC), 483 years (69 "weeks" of years) brings us to the ministry of Christ.' },
    ],
  },
]

export function getStudyPath(id: string): StudyPath | undefined {
  return STUDY_PATHS.find(p => p.id === id)
}
