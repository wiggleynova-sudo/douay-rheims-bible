// Douay-Rheims Bible — Public Domain (Challoner Revision, 1749-1752)
// Selected books for initial release

export type Verse = { verse: number; text: string }
export type Chapter = { chapter: number; verses: Verse[] }
export type Book = {
  id: string; name: string; testament: 'old' | 'new'
  abbreviation: string; chapters: Chapter[]
  description: string
}

export const BIBLE_BOOKS: Book[] = [
  {
    id: 'genesis', name: 'Genesis', testament: 'old', abbreviation: 'Gen',
    description: 'The book of beginnings — creation, the Fall, the Flood, the patriarchs Abraham, Isaac, Jacob, and Joseph.',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 1, text: 'In the beginning God created heaven, and earth.' },
          { verse: 2, text: 'And the earth was void and empty, and darkness was upon the face of the deep; and the spirit of God moved over the waters.' },
          { verse: 3, text: 'And God said: Be light made. And light was made.' },
          { verse: 4, text: 'And God saw the light that it was good; and he divided the light from the darkness.' },
          { verse: 5, text: 'And he called the light Day, and the darkness Night; and there was evening and morning one day.' },
          { verse: 6, text: 'And God said: Let there be a firmament made amidst the waters: and let it divide the waters from the waters.' },
          { verse: 7, text: 'And God made a firmament, and divided the waters that were under the firmament, from those that were above the firmament, and it was so.' },
          { verse: 8, text: 'And God called the firmament, Heaven; and the evening and morning were the second day.' },
          { verse: 9, text: 'God also said: Let the waters that are under the heaven, be gathered together into one place: and let the dry land appear. And it was so done.' },
          { verse: 10, text: 'And God called the dry land, Earth; and the gathering together of the waters, he called Seas. And God saw that it was good.' },
          { verse: 11, text: 'And he said: Let the earth bring forth the green herb, and such as may seed, and the fruit tree yielding fruit after its kind, which may have seed in itself upon the earth. And it was so done.' },
          { verse: 12, text: 'And the earth brought forth the green herb, and such as yieldeth seed according to its kind, and the tree that beareth fruit, having seed each one according to its kind. And God saw that it was good.' },
          { verse: 13, text: 'And the evening and the morning were the third day.' },
          { verse: 14, text: 'And God said: Let there be lights made in the firmament of heaven, to divide the day and the night, and let them be for signs, and for seasons, and for days and years.' },
          { verse: 15, text: 'To shine in the firmament of heaven, and to give light upon the earth, and it was so done.' },
          { verse: 16, text: 'And God made two great lights: a greater light to rule the day; and a lesser light to rule the night: and the stars.' },
          { verse: 17, text: 'And he set them in the firmament of heaven to shine upon the earth.' },
          { verse: 18, text: 'And to rule the day and the night, and to divide the light and the darkness. And God saw that it was good.' },
          { verse: 19, text: 'And the evening and morning were the fourth day.' },
          { verse: 20, text: 'God also said: let the waters bring forth the creeping creature having life, and the fowl that may fly over the earth under the firmament of heaven.' },
          { verse: 21, text: 'And God created the great whales, and every living and moving creature, which the waters brought forth, according to their kinds, and every winged fowl according to its kind. And God saw that it was good.' },
          { verse: 22, text: 'And he blessed them, saying: Increase and multiply, and fill the waters of the sea: and let the birds be multiplied upon the earth.' },
          { verse: 23, text: 'And the evening and morning were the fifth day.' },
          { verse: 24, text: 'And God said: Let the earth bring forth the living creature in its kind, cattle and creeping things, and beasts of the earth, according to their kinds. And it was so done.' },
          { verse: 25, text: 'And God made the beasts of the earth according to their kinds, and cattle, and every thing that creepeth on the earth after its kind. And God saw that it was good.' },
          { verse: 26, text: 'And he said: Let us make man to our image and likeness: and let him have dominion over the fishes of the sea, and the fowls of the air, and the beasts, and the whole earth, and every creeping creature that moveth upon the earth.' },
          { verse: 27, text: 'And God created man to his own image: to the image of God he created him: male and female he created them.' },
          { verse: 28, text: 'And God blessed them, saying: Increase and multiply, and fill the earth, and subdue it, and rule over the fishes of the sea, and the fowls of the air, and all living creatures that move upon the earth.' },
          { verse: 29, text: 'And God said: Behold I have given you every herb bearing seed upon the earth, and all trees that have in themselves seed of their own kind, to be your meat:' },
          { verse: 30, text: 'And to all beasts of the earth, and to every fowl of the air, and to all that move upon the earth, and wherein there is life, that they may have to feed upon. And it was so done.' },
          { verse: 31, text: 'And God saw all the things that he had made, and they were very good. And the evening and morning were the sixth day.' },
        ],
      },
      {
        chapter: 2, verses: [
          { verse: 1, text: 'So the heavens and the earth were finished, and all the furniture of them.' },
          { verse: 2, text: 'And on the seventh day God ended his work which he had made: and he rested on the seventh day from all his work which he had done.' },
          { verse: 3, text: 'And he blessed the seventh day, and sanctified it: because in it he had rested from all his work which God created and made.' },
          { verse: 4, text: 'These are the generations of the heaven and the earth, when they were created, in the day that the Lord God made the heaven and the earth:' },
          { verse: 7, text: 'And the Lord God formed man of the slime of the earth: and breathed into his face the breath of life, and man became a living soul.' },
          { verse: 18, text: 'And the Lord God said: It is not good for man to be alone: let us make him a help like unto himself.' },
          { verse: 24, text: 'Wherefore a man shall leave father and mother, and shall cleave to his wife: and they shall be two in one flesh.' },
        ],
      },
      {
        chapter: 3, verses: [
          { verse: 1, text: 'Now the serpent was more subtle than any of the beasts of the earth which the Lord God had made. And he said to the woman: Why hath God commanded you, that you should not eat of every tree of paradise?' },
          { verse: 6, text: 'And the woman saw that the tree was good to eat, and fair to the eyes, and delightful to behold: and she took of the fruit thereof, and did eat, and gave to her husband who did eat.' },
          { verse: 15, text: 'I will put enmities between thee and the woman, and thy seed and her seed: she shall crush thy head, and thou shalt lie in wait for her heel.' },
          { verse: 19, text: 'In the sweat of thy face shalt thou eat bread till thou return to the earth, out of which thou wast taken: for dust thou art, and into dust thou shalt return.' },
        ],
      },
    ],
  },

  {
    id: 'psalms', name: 'Psalms', testament: 'old', abbreviation: 'Ps',
    description: 'The prayer book of Israel and the Church — 150 hymns, laments, and praises attributed largely to David.',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 1, text: 'Blessed is the man who hath not walked in the counsel of the ungodly, nor stood in the way of sinners, nor sat in the chair of pestilence.' },
          { verse: 2, text: 'But his will is in the law of the Lord, and on his law he shall meditate day and night.' },
          { verse: 3, text: 'And he shall be like a tree which is planted near the running waters, which shall bring forth its fruit, in due season. And his leaf shall not fall off: and all whatsoever he shall do shall prosper.' },
          { verse: 4, text: 'Not so the wicked, not so: but like the dust, which the wind driveth from the face of the earth.' },
          { verse: 5, text: 'Therefore the wicked shall not rise again in judgment: nor sinners in the council of the just.' },
          { verse: 6, text: 'For the Lord knoweth the way of the just: and the way of the wicked shall perish.' },
        ],
      },
      {
        chapter: 22, verses: [
          { verse: 1, text: 'The Lord ruleth me: and I shall want nothing.' },
          { verse: 2, text: 'He hath set me in a place of pasture. He hath brought me up, on the water of refreshment.' },
          { verse: 3, text: 'He hath converted my soul. He hath led me on the paths of justice, for his own name\'s sake.' },
          { verse: 4, text: 'For though I should walk in the midst of the shadow of death, I will fear no evils, for thou art with me. Thy rod and thy staff, they have comforted me.' },
          { verse: 5, text: 'Thou hast prepared a table before me against them that afflict me. Thou hast anointed my head with oil; and my chalice which inebriateth me, how goodly is it!' },
          { verse: 6, text: 'And thy mercy will follow me all the days of my life. And that I may dwell in the house of the Lord unto length of days.' },
        ],
      },
      {
        chapter: 51, verses: [
          { verse: 1, text: 'Have mercy on me, O God, according to thy great mercy. And according to the multitude of thy tender mercies blot out my iniquity.' },
          { verse: 2, text: 'Wash me yet more from my iniquity, and cleanse me from my sin.' },
          { verse: 3, text: 'For I know my iniquity, and my sin is always before me.' },
          { verse: 4, text: 'To thee only have I sinned, and have done evil before thee: that thou mayst be justified in thy words, and mayst overcome when thou art judged.' },
          { verse: 10, text: 'Create a clean heart in me, O God: and renew a right spirit within my bowels.' },
          { verse: 11, text: 'Cast me not away from thy face; and take not thy holy spirit from me.' },
          { verse: 12, text: 'Restore unto me the joy of thy salvation, and strengthen me with a perfect spirit.' },
        ],
      },
    ],
  },

  {
    id: 'isaiah', name: 'Isaiah', testament: 'old', abbreviation: 'Isa',
    description: 'Called the "Fifth Evangelist," Isaiah contains the most extensive Messianic prophecies in the Old Testament.',
    chapters: [
      {
        chapter: 7, verses: [
          { verse: 14, text: 'Therefore the Lord himself shall give you a sign. Behold a virgin shall conceive, and bear a son, and his name shall be called Emmanuel.' },
        ],
      },
      {
        chapter: 9, verses: [
          { verse: 6, text: 'For a CHILD IS BORN to us, and a son is given to us, and the government is upon his shoulder: and his name shall be called, Wonderful, Counsellor, God the Mighty, the Father of the world to come, the Prince of Peace.' },
        ],
      },
      {
        chapter: 53, verses: [
          { verse: 3, text: 'Despised, and the most abject of men, a man of sorrows, and acquainted with infirmity: and his look was as it were hidden and despised, whereupon we esteemed him not.' },
          { verse: 4, text: 'Surely he hath borne our infirmities and carried our sorrows: and we have thought him as it were a leper, and as one struck by God and afflicted.' },
          { verse: 5, text: 'But he was wounded for our iniquities, he was bruised for our sins: the chastisement of our peace was upon him, and by his bruises we are healed.' },
          { verse: 6, text: 'All we like sheep have gone astray, every one hath turned aside into his own way: and the Lord hath laid on him the iniquity of us all.' },
          { verse: 7, text: 'He was offered because it was his own will, and he opened not his mouth: he shall be led as a sheep to the slaughter, and shall be dumb as a lamb before his shearer, and he shall not open his mouth.' },
        ],
      },
    ],
  },

  {
    id: 'matthew', name: 'Matthew', testament: 'new', abbreviation: 'Mt',
    description: 'The first Gospel, written primarily for Jewish Christians, presenting Jesus as the fulfillment of the Old Testament and the new Moses.',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 21, text: 'And she shall bring forth a son: and thou shalt call his name JESUS. For he shall save his people from their sins.' },
          { verse: 23, text: 'Behold a virgin shall be with child, and bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.' },
        ],
      },
      {
        chapter: 5, verses: [
          { verse: 1, text: 'And seeing the multitudes, he went up into a mountain, and when he was set down, his disciples came unto him.' },
          { verse: 2, text: 'And opening his mouth he taught them, saying:' },
          { verse: 3, text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.' },
          { verse: 4, text: 'Blessed are the meek: for they shall possess the land.' },
          { verse: 5, text: 'Blessed are they that mourn: for they shall be comforted.' },
          { verse: 6, text: 'Blessed are they that hunger and thirst after justice: for they shall have their fill.' },
          { verse: 7, text: 'Blessed are the merciful: for they shall obtain mercy.' },
          { verse: 8, text: 'Blessed are the clean of heart: for they shall see God.' },
          { verse: 9, text: 'Blessed are the peacemakers: for they shall be called the children of God.' },
          { verse: 10, text: 'Blessed are they that suffer persecution for justice\' sake: for theirs is the kingdom of heaven.' },
          { verse: 11, text: 'Blessed are ye when they shall revile you, and persecute you, and speak all that is evil against you, untruly, for my sake.' },
          { verse: 12, text: 'Be glad and rejoice, for your reward is very great in heaven. For so they persecuted the prophets that were before you.' },
          { verse: 13, text: 'You are the salt of the earth. But if the salt lose its savour, wherewith shall it be salted? It is good for nothing any more but to be cast out, and to be trodden on by men.' },
          { verse: 14, text: 'You are the light of the world. A city seated on a mountain cannot be hid.' },
          { verse: 17, text: 'Do not think that I am come to destroy the law, or the prophets. I am not come to destroy, but to fulfil.' },
          { verse: 44, text: 'But I say to you, Love your enemies: do good to them that hate you: and pray for them that persecute and calumniate you.' },
          { verse: 48, text: 'Be you therefore perfect, as also your heavenly Father is perfect.' },
        ],
      },
      {
        chapter: 6, verses: [
          { verse: 9, text: 'Thus therefore shall you pray: Our Father who art in heaven, hallowed be thy name.' },
          { verse: 10, text: 'Thy kingdom come. Thy will be done on earth as it is in heaven.' },
          { verse: 11, text: 'Give us this day our supersubstantial bread.' },
          { verse: 12, text: 'And forgive us our debts, as we also forgive our debtors.' },
          { verse: 13, text: 'And lead us not into temptation. But deliver us from evil. Amen.' },
          { verse: 33, text: 'Seek ye therefore first the kingdom of God, and his justice, and all these things shall be added unto you.' },
        ],
      },
      {
        chapter: 16, verses: [
          { verse: 18, text: 'And I say to thee: That thou art Peter; and upon this rock I will build my church, and the gates of hell shall not prevail against it.' },
          { verse: 19, text: 'And I will give to thee the keys of the kingdom of heaven. And whatsoever thou shalt bind upon earth, it shall be bound also in heaven: and whatsoever thou shalt loose upon earth, it shall be loosed also in heaven.' },
        ],
      },
      {
        chapter: 26, verses: [
          { verse: 26, text: 'And whilst they were at supper, Jesus took bread, and blessed, and broke: and gave to his disciples, and said: Take ye, and eat. This is my body.' },
          { verse: 27, text: 'And taking the chalice, he gave thanks, and gave to them, saying: Drink ye all of this.' },
          { verse: 28, text: 'For this is my blood of the new testament, which shall be shed for many unto remission of sins.' },
        ],
      },
    ],
  },

  {
    id: 'john', name: 'John', testament: 'new', abbreviation: 'Jn',
    description: 'The Fourth Gospel — the most theological, written to reveal Jesus as the eternal Word of God made flesh.',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
          { verse: 2, text: 'The same was in the beginning with God.' },
          { verse: 3, text: 'All things were made by him: and without him was made nothing that was made.' },
          { verse: 4, text: 'In him was life, and the life was the light of men.' },
          { verse: 5, text: 'And the light shineth in darkness, and the darkness did not comprehend it.' },
          { verse: 6, text: 'There was a man sent from God, whose name was John.' },
          { verse: 7, text: 'This man came for a witness, to give testimony of the light, that all men might believe through him.' },
          { verse: 8, text: 'He was not the light, but was to give testimony of the light.' },
          { verse: 9, text: 'That was the true light, which enlighteneth every man that cometh into this world.' },
          { verse: 10, text: 'He was in the world, and the world was made by him, and the world knew him not.' },
          { verse: 11, text: 'He came unto his own, and his own received him not.' },
          { verse: 12, text: 'But as many as received him, he gave them power to be made the sons of God, to them that believe in his name.' },
          { verse: 13, text: 'Who are born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.' },
          { verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we saw his glory, the glory as it were of the only begotten of the Father,) full of grace and truth.' },
          { verse: 15, text: 'John beareth witness of him, and crieth out, saying: This was he of whom I spoke: He that shall come after me, is preferred before me: because he was before me.' },
          { verse: 16, text: 'And of his fulness we all have received, and grace for grace.' },
          { verse: 17, text: 'For the law was given by Moses; grace and truth came by Jesus Christ.' },
          { verse: 18, text: 'No man hath seen God at any time: the only begotten Son who is in the bosom of the Father, he hath declared him.' },
          { verse: 29, text: 'The next day, John saw Jesus coming to him, and he saith: Behold the Lamb of God, behold him who taketh away the sin of the world.' },
        ],
      },
      {
        chapter: 3, verses: [
          { verse: 3, text: 'Jesus answered, and said to him: Amen, amen I say to thee, unless a man be born again, he cannot see the kingdom of God.' },
          { verse: 5, text: 'Jesus answered: Amen, amen I say to thee, unless a man be born again of water and the Holy Ghost, he cannot enter into the kingdom of God.' },
          { verse: 16, text: 'For God so loved the world, as to give his only begotten Son; that whosoever believeth in him, may not perish, but may have life everlasting.' },
          { verse: 17, text: 'For God sent not his Son into the world, to judge the world, but that the world may be saved by him.' },
        ],
      },
      {
        chapter: 6, verses: [
          { verse: 35, text: 'And Jesus said to them: I am the bread of life: he that cometh to me shall not hunger: and he that believeth in me shall never thirst.' },
          { verse: 51, text: 'I am the living bread which came down from heaven. If any man eat of this bread, he shall live for ever; and the bread that I will give, is my flesh, for the life of the world.' },
          { verse: 53, text: 'Then Jesus said to them: Amen, amen I say unto you: Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you.' },
          { verse: 54, text: 'He that eateth my flesh, and drinketh my blood, hath everlasting life: and I will raise him up in the last day.' },
          { verse: 55, text: 'For my flesh is meat indeed: and my blood is drink indeed.' },
        ],
      },
      {
        chapter: 10, verses: [
          { verse: 11, text: 'I am the good shepherd. The good shepherd giveth his life for his sheep.' },
          { verse: 14, text: 'I am the good shepherd; and I know mine, and mine know me.' },
          { verse: 30, text: 'I and the Father are one.' },
        ],
      },
      {
        chapter: 19, verses: [
          { verse: 26, text: 'When Jesus therefore had seen his mother and the disciple standing whom he loved, he saith to his mother: Woman, behold thy son.' },
          { verse: 27, text: 'After that, he saith to the disciple: Behold thy mother. And from that hour, the disciple took her to his own.' },
        ],
      },
    ],
  },

  {
    id: 'romans', name: 'Romans', testament: 'new', abbreviation: 'Rom',
    description: 'St. Paul\'s masterwork on justification, grace, sin, and salvation — the most systematic theological letter in the New Testament.',
    chapters: [
      {
        chapter: 3, verses: [
          { verse: 23, text: 'For all have sinned, and do need the glory of God.' },
          { verse: 24, text: 'Being justified freely by his grace, through the redemption, that is in Christ Jesus,' },
          { verse: 25, text: 'Whom God hath proposed to be a propitiation, through faith in his blood, to the shewing of his justice, for the remission of former sins,' },
        ],
      },
      {
        chapter: 5, verses: [
          { verse: 1, text: 'Being justified therefore by faith, let us have peace with God, through our Lord Jesus Christ:' },
          { verse: 8, text: 'But God commendeth his charity towards us; because when as yet we were sinners, according to the time, Christ died for us.' },
        ],
      },
      {
        chapter: 8, verses: [
          { verse: 28, text: 'And we know that to them that love God, all things work together unto good, to such as, according to his purpose, are called to be saints.' },
          { verse: 31, text: 'What shall we then say to these things? If God be for us, who is against us?' },
          { verse: 38, text: 'For I am sure that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor might,' },
          { verse: 39, text: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' },
        ],
      },
    ],
  },

  {
    id: 'revelation', name: 'Revelation', testament: 'new', abbreviation: 'Rev',
    description: 'The Apocalypse of St. John — the final book of Scripture, revealing the ultimate victory of Christ over evil and the heavenly liturgy.',
    chapters: [
      {
        chapter: 1, verses: [
          { verse: 8, text: 'I am Alpha and Omega, the beginning and the end, saith the Lord God, who is, and who was, and who is to come, the Almighty.' },
        ],
      },
      {
        chapter: 12, verses: [
          { verse: 1, text: 'And a great sign appeared in heaven: A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars.' },
          { verse: 2, text: 'And being with child, she cried travailing in birth, and was in pain to be delivered.' },
          { verse: 5, text: 'And she brought forth a man child, who was to rule all nations with an iron rod: and her son was taken up to God, and to his throne.' },
        ],
      },
      {
        chapter: 21, verses: [
          { verse: 1, text: 'And I saw a new heaven and a new earth. For the first heaven and the first earth was gone, and the sea is now no more.' },
          { verse: 3, text: 'And I heard a great voice from the throne, saying: Behold the tabernacle of God with men, and he will dwell with them. And they shall be his people; and God himself with them shall be their God.' },
          { verse: 4, text: 'And God shall wipe away all tears from their eyes: and death shall be no more, nor mourning, nor crying, nor sorrow shall be any more, for the former things are passed away.' },
          { verse: 5, text: 'And he that sat on the throne, said: Behold, I make all things new. And he said to me: Write, for these words are most faithful and true.' },
        ],
      },
    ],
  },
]

export function getBook(id: string): Book | undefined {
  return BIBLE_BOOKS.find(b => b.id === id)
}

export function getChapter(bookId: string, chapter: number): Chapter | undefined {
  return getBook(bookId)?.chapters.find(c => c.chapter === chapter)
}

export function getVerse(bookId: string, chapter: number, verse: number): Verse | undefined {
  return getChapter(bookId, chapter)?.verses.find(v => v.verse === verse)
}

export const OLD_TESTAMENT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'old')
export const NEW_TESTAMENT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'new')
