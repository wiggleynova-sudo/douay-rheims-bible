/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

const DB_PATH = path.join(DATA_DIR, 'bible.db')

let _db: any = null

function getDb() {
  if (_db) return _db
  const Database = require('better-sqlite3')
  _db = new Database(DB_PATH)
  _db.pragma('journal_mode = WAL')

  _db.exec(`
    CREATE TABLE IF NOT EXISTS commentaries (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      book        TEXT NOT NULL,
      chapter     INTEGER NOT NULL,
      verse       INTEGER NOT NULL,
      text        TEXT NOT NULL,
      author      TEXT DEFAULT 'Editorial',
      source      TEXT DEFAULT 'Study Notes',
      type        TEXT DEFAULT 'verse',
      created_at  INTEGER DEFAULT (strftime('%s','now'))
    );
    CREATE INDEX IF NOT EXISTS idx_commentary ON commentaries(book, chapter, verse);

    CREATE TABLE IF NOT EXISTS highlights (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id  TEXT NOT NULL,
      book        TEXT NOT NULL,
      chapter     INTEGER NOT NULL,
      verse       INTEGER NOT NULL,
      color       TEXT DEFAULT 'yellow',
      created_at  INTEGER DEFAULT (strftime('%s','now'))
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_highlight ON highlights(session_id, book, chapter, verse);

    CREATE TABLE IF NOT EXISTS notes (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id  TEXT NOT NULL,
      book        TEXT NOT NULL,
      chapter     INTEGER NOT NULL,
      verse       INTEGER NOT NULL,
      note_text   TEXT NOT NULL,
      created_at  INTEGER DEFAULT (strftime('%s','now'))
    );
    CREATE INDEX IF NOT EXISTS idx_notes ON notes(session_id, book, chapter, verse);

    CREATE TABLE IF NOT EXISTS ccc_refs (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      book          TEXT NOT NULL,
      chapter       INTEGER NOT NULL,
      verse         INTEGER NOT NULL,
      ccc_paragraph TEXT NOT NULL,
      ccc_summary   TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_ccc ON ccc_refs(book, chapter, verse);

    CREATE TABLE IF NOT EXISTS cross_refs (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      from_book     TEXT NOT NULL,
      from_chapter  INTEGER NOT NULL,
      from_verse    INTEGER NOT NULL,
      to_book       TEXT NOT NULL,
      to_chapter    INTEGER NOT NULL,
      to_verse      INTEGER NOT NULL,
      relationship  TEXT DEFAULT 'thematic'
    );
    CREATE INDEX IF NOT EXISTS idx_xref ON cross_refs(from_book, from_chapter, from_verse);
  `)

  // Seed commentaries if empty
  const count = (_db.prepare('SELECT COUNT(*) as n FROM commentaries').get() as any).n
  if (count === 0) {
    seedData(_db)
  }

  return _db
}

function seedData(db: any) {
  const insertCommentary = db.prepare(`
    INSERT INTO commentaries (book, chapter, verse, text, author, source, type) VALUES (?,?,?,?,?,?,?)
  `)
  const insertCCC = db.prepare(`
    INSERT INTO ccc_refs (book, chapter, verse, ccc_paragraph, ccc_summary) VALUES (?,?,?,?,?)
  `)
  const insertXRef = db.prepare(`
    INSERT INTO cross_refs (from_book, from_chapter, from_verse, to_book, to_chapter, to_verse, relationship) VALUES (?,?,?,?,?,?,?)
  `)

  // === COMMENTARIES ===
  insertCommentary.run('genesis', 1, 1,
    'The opening words of Scripture establish God as the eternal Creator, existing before and beyond all created things. The Hebrew "bereshit" (in the beginning) points to an absolute beginning — there was no pre-existing matter, no chaos from which God fashioned the world. God created ex nihilo: from nothing.\n\nSt. Augustine of Hippo taught that this verse refutes both materialism and dualism — matter is not co-eternal with God. St. Thomas Aquinas, in the Summa Theologiae, argued that creation from nothing is uniquely a divine act, not a natural process. The Catholic Church solemnly teaches creation ex nihilo in CCC 296-298.\n\nThe word "God" here is Elohim in Hebrew — a plural form used with a singular verb. The Church Fathers, particularly Justin Martyr and Tertullian, saw in this plural a foreshadowing of the Trinity, though the full revelation awaited the New Testament.',
    'Editorial', 'RSV Catholic Study Bible Notes', 'verse')

  insertCommentary.run('genesis', 1, 2,
    'The "void and empty" (tohu va-bohu in Hebrew) describes not eternal chaos but a formlessness awaiting divine ordering. The "spirit of God" (ruah Elohim) moving over the waters is the first appearance of the Holy Spirit in Scripture, prefiguring the dove descending over the waters at Christ\'s Baptism (Matthew 3:16).\n\nSt. Basil the Great, in his Hexaemeron, describes this as the Holy Spirit warming and vivifying creation like a mother bird over her nest — a tender image of divine care.',
    'St. Basil the Great', 'Hexaemeron, Homily 2', 'theological')

  insertCommentary.run('genesis', 1, 26,
    '"Let us make man in our image" — the plural "us" has fascinated theologians since the earliest centuries. Philo of Alexandria saw a reference to angelic beings; the Church Fathers more commonly read it as an address within the Trinity itself, the Father speaking to the Son and Holy Spirit.\n\nThe "image of God" (imago Dei) is foundational to Catholic anthropology. CCC 1702 states: "The divine image is present in every man. It shines forth in the communion of persons, in the likeness of the union of the divine persons among themselves." This image, though wounded by original sin, is never entirely destroyed and is the basis of every human being\'s dignity.',
    'Editorial', 'Patristic Commentary', 'theological')

  insertCommentary.run('genesis', 1, 31,
    'God\'s declaration that creation is "very good" (Hebrew: tov meod) is the final seal on the creation narrative. Evil is not co-eternal with good — it is not built into the structure of the world. This verse is the Catholic answer to Gnosticism and Manichaeism, which taught that matter itself was corrupt or evil.\n\nThe Catholic Church teaches that the original goodness of creation is real, though now affected by the Fall. The Incarnation — God himself taking on material flesh — is the ultimate vindication of creation\'s goodness.',
    'Editorial', 'Study Notes', 'verse')

  insertCommentary.run('john', 1, 1,
    'The Prologue of John\'s Gospel is among the most profound texts in all of Scripture. It deliberately echoes Genesis 1:1 — "In the beginning" (Greek: en archē) — identifying Christ as present at and indeed as the principle of all creation.\n\nThe "Word" (Greek: Logos) was a concept already rich in meaning. For Greek philosophers, Logos was the rational principle ordering the cosmos. For Jewish thinkers, it evoked the "Word of the Lord" by which God spoke creation into being (Psalm 33:6). John takes both and transcends them: the Logos is a divine Person.\n\n"And the Word was God" — this is the strongest possible statement of Christ\'s divinity. St. Thomas Aquinas noted that John places the Logos in three relationships in verse 1: with time (in the beginning), with the Father (was with God), and with the divine nature (was God). Arianism — which denied Christ\'s full divinity — is destroyed by this single verse.',
    'Editorial', 'Johannine Commentary', 'verse')

  insertCommentary.run('john', 1, 14,
    '"And the Word was made flesh" — the Incarnation in five words. This verse is the axis of all Christian theology. The eternal, uncreated Logos took on human nature completely: body, soul, and intellect.\n\n"And dwelt among us" uses the Greek eskēnōsen — literally "pitched his tent" among us, evoking the Tabernacle in the wilderness where God\'s glory (Shekinah) dwelt among Israel. Christ\'s body is the new Tabernacle, the new Temple.\n\n"Full of grace and truth" — the Greek plērēs charitos kai alētheias corresponds to the Hebrew hesed ve-emet (loving-kindness and faithfulness), the covenant attributes of God in the Old Testament. Christ is the fullness of God\'s covenant love.',
    'Editorial', 'Johannine Commentary', 'theological')

  insertCommentary.run('john', 3, 16,
    'Called "the Gospel in miniature," this verse summarizes the entire economy of salvation. Three movements: the motive (God so loved), the gift (his only-begotten Son), and the purpose (that those who believe may have eternal life).\n\n"So loved the world" — the Greek houtōs means "in this manner," pointing to the manner of love: sacrificial, total, costly. God\'s love is not sentiment but action. He gives his Son.\n\n"Only-begotten" (Greek: monogenēs) is the same word used in Hebrews 11:17 of Isaac, the beloved son offered by Abraham — a deliberate typological echo. Christ is the true Isaac, the beloved Son genuinely offered.\n\nThe Fathers universally read "eternal life" (zoē aiōnios) as not merely unending existence but participation in the divine life itself.',
    'St. John Chrysostom', 'Homilies on John', 'verse')

  insertCommentary.run('matthew', 5, 3,
    'The Beatitudes open the Sermon on the Mount — Christ\'s authoritative teaching on the New Law. Like Moses on Sinai, Christ ascends a mountain to give the Law, but the New Law is written on hearts, not stone tablets.\n\n"Blessed are the poor in spirit" (Greek: ptōchoi tō pneumati) does not glorify material destitution as such, but interior poverty: the acknowledgment that one possesses nothing before God, that one is wholly dependent on divine mercy. This is the opposite of pride.\n\nSt. John Chrysostom: "What is \'poor in spirit\'? Humble, and contrite in heart." St. Augustine: "The poor in spirit are those who know how to possess nothing in this world, for they know that while they are in this world, they are pilgrims." CCC 1716 teaches that the Beatitudes respond to the natural desire for happiness and reveal the goal of human existence.',
    'St. John Chrysostom', 'Homilies on Matthew', 'verse')

  insertCommentary.run('matthew', 5, 17,
    '"Do not think that I have come to abolish the law or the prophets. I have not come to abolish, but to fulfil." This verse is the hermeneutical key to the entire Sermon on the Mount and to the relationship between Old and New Testaments.\n\nChrist does not repeal the Mosaic Law but brings it to its full meaning and depth. In the six antitheses that follow ("You have heard... but I say to you"), Christ does not contradict Moses but penetrates to the interior intention behind each commandment. The prohibition of murder extends to anger; the prohibition of adultery extends to lust; the requirement of oaths gives way to perfect truthfulness.\n\nSt. Thomas Aquinas taught that the Old Law was like a sketch and the New Law like the completed painting — the same reality, fully revealed.',
    'St. Thomas Aquinas', 'Summa Theologiae I-II, q. 107', 'theological')

  insertCommentary.run('psalms', 23, 1,
    'The Twenty-Third Psalm is perhaps the most beloved of all 150 Psalms, traditionally attributed to David the shepherd-king. "The Lord is my shepherd" — this image was radical in the ancient world, where kings claimed the title of shepherd for themselves. Here it is given to God.\n\nThe Church Fathers universally read this Psalm in light of Christ. St. Augustine: "The Lord Jesus Christ is my shepherd; I shall want for nothing." Christ himself claimed the title explicitly: "I am the good shepherd" (John 10:11,14).\n\nIn the Catholic tradition, this Psalm is sung at funerals, Masses for the Dead, and Baptismal liturgies — it accompanies Christians through the entire journey of salvation, from Baptism (the waters of refreshment) through death (the valley of the shadow) to the Eucharistic feast (thou preparest a table before me).',
    'St. Augustine', 'Enarrationes in Psalmos 22', 'verse')

  insertCommentary.run('psalms', 23, 4,
    '"Though I walk through the valley of the shadow of death" — the Hebrew tsalmaveth, "the shadow of death," evokes the darkest possible human experience. Yet the Psalmist does not shrink from naming it. Faith does not pretend that suffering and death are not real.\n\n"Thy rod and thy staff, they comfort me." The shepherd\'s rod was for discipline and defense against predators; the staff for guidance and support. Both aspects of God\'s care — discipline and tenderness — are comforting, not just the tender mercies. Catholic spirituality has always held that suffering, when united to Christ\'s Passion, is itself a form of divine accompaniment.',
    'Editorial', 'Patristic Commentary', 'verse')

  // === ADDITIONAL CHURCH FATHERS COMMENTARIES ===

  insertCommentary.run('john', 6, 53,
    '"Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you." This verse is the most unambiguous statement of Real Presence in all of Scripture. When many disciples left after this teaching, Jesus did not call them back to explain it as metaphor. He turned to the Twelve and asked, "Will you also go away?" — confirming that the teaching was meant literally.\n\nSt. Ignatius of Antioch, writing around 110 AD (within living memory of the Apostles): "The Eucharist is the flesh of our Savior Jesus Christ, which suffered for our sins, and which the Father in His goodness raised up again." He warned against heretics who "abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Savior Jesus Christ."\n\nSt. Cyril of Jerusalem (4th century), instructing new Catholics: "Since Christ himself has declared the Bread to be His Body, who shall dare to doubt? Since He has said and signed, \'This is My Blood,\' who shall ever hesitate, saying that it is not His blood?"',
    'St. Ignatius of Antioch', 'Epistle to the Smyrnaeans, c. 110 AD', 'theological')

  insertCommentary.run('matthew', 16, 18,
    '"Tu es Petrus, et super hanc petram aedificabo Ecclesiam meam." The wordplay in the original Aramaic is crucial: Jesus spoke in Aramaic, in which both "Peter" and "rock" are the same word — Kēphā (hence the Greek Cephas). There is no distinction between "Petros" and "petra" in the original language; Christ is saying "You are Rock, and on this rock I will build my Church."\n\nSt. John Chrysostom: "On this rock I will build my Church — that is, on the faith of this confession." Yet Chrysostom also affirms Peter\'s primacy: Christ "separates him from the rest and appoints him first."\n\nSt. Leo the Great (Pope, 440-461): "Our Lord Jesus Christ... established the sacrament of his unity... Peter received this power over the rock which itself confessed... Through Peter, the permanence of the faith was ordained, and the grace of Peter was extended to all the Apostles."\n\nThe "gates of hell" (portae inferi) — not merely the powers of evil, but death itself. The Church will not be destroyed by the death of her members or of her earthly structures. She is built on an imperishable foundation.',
    'St. Leo the Great', 'Sermon 4 on the Anniversary of his Elevation to the Pontificate', 'theological')

  insertCommentary.run('matthew', 26, 26,
    '"This is my body" — four words that changed the world. The verb "is" (Greek: estin) admits no weakening. Christ does not say "this represents" or "this signifies" — he uses the present tense indicative of the verb to be: "This IS my body."\n\nSt. John Chrysostom, on why we must approach with faith, not the senses: "Do not think of the Bread and the Wine as bare elements, for they are, according to the Lord\'s declaration, the Body and Blood of Christ. Although your senses suggest this to you, let faith reassure you. Do not judge the matter from the taste, but from the faith that cannot deceive."\n\nThe Eucharist fulfills the Passover. At the original Passover (Exodus 12), Israel ate the lamb whose blood protected them from death. Christ is the true Passover Lamb (1 Corinthians 5:7). The institution of the Eucharist AT the Passover supper is not coincidence — it is the moment the type gives way to the reality.',
    'St. John Chrysostom', 'Homily 82 on Matthew', 'verse')

  insertCommentary.run('isaiah', 53, 5,
    '"He was wounded for our iniquities, he was bruised for our sins: the chastisement of our peace was upon him, and by his bruises we are healed." Written seven centuries before the Crucifixion, Isaiah 53 is the most remarkable Messianic prophecy in Scripture. The early Church used it constantly to explain the death of Christ to Jewish inquirers: Philip uses this very passage when he evangelizes the Ethiopian eunuch (Acts 8:32-35).\n\nThe Hebrew word for "wounded" (mehulal) connotes being pierced or stabbed — fulfilled in John 19:34: "one of the soldiers opened his side with a spear." "Bruised" (medukka) implies a crushing, grinding — fulfilled in the scourging and the bearing of the Cross.\n\n"By his bruises we are healed" — the logic of substitutionary atonement is here: the punishment that should fall on us (for our iniquities) falls on the Servant instead, and the result is not merely forgiveness but healing — the restoration of right relationship, of shalom (peace), with God.',
    'Editorial', 'Servant Songs Commentary', 'theological')

  insertCommentary.run('revelation', 12, 1,
    '"A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars." Catholic tradition has consistently identified this woman as Mary — and the child she brings forth as Christ. This is not a reading imposed on the text; it is demanded by the parallel with Genesis 3:15, where enmity is placed between the serpent and "the woman" whose seed crushes his head.\n\nSt. Pius X (1904): "This woman... is certainly the Virgin Mary, the mother of Our Lord Jesus Christ."\n\nThe twelve stars echo the twelve tribes of Israel and the twelve Apostles — Mary stands at the convergence of both covenants. The sun she is clothed with is Christ himself; the moon under her feet is the Old Covenant whose light she has superseded.\n\nThe dragon\'s war against "the rest of her seed" (v.17) — those who keep the commandments of God — identifies Mary\'s spiritual children as the entire Church. What began in Genesis 3:15 as enmity between the serpent and the Woman culminates here in the Book of Revelation: Mary and the Church, united, finally triumph.',
    'St. Pius X', 'Ad Diem Illum Laetissimum, 1904', 'theological')

  insertCommentary.run('genesis', 3, 15,
    '"Inimicitias ponam inter te et mulierem, et semen tuum et semen illius: ipsa conteret caput tuum." The Protoevangelium — the "first gospel" — is God\'s first promise of a Redeemer immediately after the Fall. It is remarkable that God addresses the serpent\'s doom before he addresses Adam and Eve\'s punishment: mercy precedes judgment.\n\nThe Vulgate uses "ipsa" (she) — the woman will crush the head. Many Greek manuscripts read "ipse" (he) — the seed will crush. Both readings are legitimate: in crushing the serpent, Christ acts through and with Mary. The New Eve cooperates with the New Adam in reversing the damage done by the first Eve and first Adam.\n\nSt. Irenaeus (2nd century): "As Eve was seduced by the word of an angel to flee from God, having rebelled against his Word, so Mary by the word of an angel received the glad tidings that she should bear God by obeying his Word. And whereas the former was seduced to disobey God, the latter was persuaded to obey God, that the Virgin Mary might become the advocate of the virgin Eve."',
    'St. Irenaeus of Lyons', 'Against Heresies, Book 5, Chapter 19', 'theological')

  insertCommentary.run('john', 19, 26,
    '"Woman, behold thy son." From the Cross — his last act before dying — Christ gives his mother to the Beloved Disciple. This is not merely a practical arrangement for Mary\'s care in old age. The Beloved Disciple represents all believers; Mary becomes mother not of one man but of all the faithful.\n\nSt. Augustine: "He who made his mother was made of his mother. He who created all things was born of one whom he himself created." The one who speaks from the Cross is her Creator — and from that Cross, he extends her motherhood to the whole Church.\n\nPope John Paul II (Redemptoris Mater, 1987): "In entrusting to John his mother, with the words \'Behold your mother,\' Christ addresses every human being, every man, to whom he is close through the mystery of Redemption. Christ speaks to man about his mother and designates her in a particular way as his mother. With these words he accepts Mary as his mother... in a new sense, as the mother of all those who, like himself, are born of God."',
    'Pope St. John Paul II', 'Redemptoris Mater §23', 'theological')

  insertCommentary.run('romans', 8, 38,
    '"Neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor might, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." Paul\'s list is exhaustive by design — he wants to leave no room for doubt or exception.\n\nSt. John Chrysostom: "He who has said \'I am sure\' has shut out all doubt, and speaks with no less authority than does the prophet when he says \'The Lord is my shepherd, I shall not want.\'" Paul speaks from experience — he has been beaten, imprisoned, shipwrecked, threatened by his own people and by pagans. And his conclusion is not despair but triumph: nothing can separate us.\n\nNote the final phrase: "in Christ Jesus." The love Paul describes is not an abstract universal force — it is located. It is in a Person. We cannot be separated from God\'s love because God\'s love for us has become incarnate, has died and risen, and now intercedes for us at the right hand of the Father.',
    'St. John Chrysostom', 'Homilies on Romans, Homily 15', 'verse')

  // === CCC REFERENCES — EXPANDED ===
  insertCCC.run('genesis', 1, 1, '279', 'Among all the Scriptural texts about creation, the first three chapters of Genesis occupy a unique place. The literary genre of these texts calls for a particular interpretation.')
  insertCCC.run('genesis', 1, 1, '296', 'We believe that God needs no pre-existent thing or any help in order to create, nor is creation any sort of necessary emanation from the divine substance. God creates freely "out of nothing."')
  insertCCC.run('genesis', 1, 1, '290', 'In the beginning God created the heavens and the earth: three things are affirmed in these first words of Scripture: the eternal God gave a beginning to all that exists outside of himself; he alone is Creator.')
  insertCCC.run('genesis', 1, 26, '1702', 'The divine image is present in every man. It shines forth in the communion of persons, in the likeness of the union of the divine persons among themselves.')
  insertCCC.run('genesis', 1, 26, '355', 'The human person, created in the image of God, is a being at once corporeal and spiritual. The biblical account expresses this reality in symbolic language when it affirms that "then the LORD God formed man of dust from the ground, and breathed into his nostrils the breath of life."')
  insertCCC.run('genesis', 1, 27, '369', '"Man and woman" is the only creature that God has willed for itself. Mankind comprises two sexes: they are equal in dignity, "each of them with the same dignity and the same unique vocation."')
  insertCCC.run('genesis', 3, 15, '410', 'After his fall, man was not abandoned by God. On the contrary, God calls him and in a mysterious way heralds the coming victory over evil and his restoration from his fall. This passage in Genesis is called the Protoevangelium.')
  insertCCC.run('genesis', 3, 15, '411', 'The Christian tradition sees in this passage an announcement of the "New Adam" who, because he "became obedient unto death, even death on a cross," makes amends superabundantly for the disobedience of Adam.')
  insertCCC.run('john', 1, 1, '241', 'Jesus revealed that God is Father in an unheard-of sense: he is Father not only in being Creator; he is eternally Father in relation to his only Son.')
  insertCCC.run('john', 1, 1, '454', 'Jesus Christ is true God and true man, in the unity of his divine person; for this reason he is the one and only mediator between God and men.')
  insertCCC.run('john', 1, 14, '461', 'Taking up St. John\'s expression, "The Word became flesh," the Church calls "Incarnation" the fact that the Son of God assumed a human nature in order to accomplish our salvation in it.')
  insertCCC.run('john', 1, 14, '470', 'Because "human nature was assumed, not absorbed," in the mysterious union of the Incarnation, the Church was led over the course of centuries to confess the full reality of Christ\'s human soul.')
  insertCCC.run('john', 3, 5, '1215', 'This sacrament is also called "the bath of regeneration and renewal by the Holy Spirit," for it signifies and actually brings about the birth of water and the Spirit without which no one "can enter the kingdom of God."')
  insertCCC.run('john', 3, 5, '1257', 'The Lord himself affirms that Baptism is necessary for salvation. He also commands his disciples to proclaim the Gospel to all nations and to baptize them.')
  insertCCC.run('john', 3, 16, '458', 'The Word became flesh so that thus we might know God\'s love: "In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him."')
  insertCCC.run('john', 6, 51, '1355', 'In the epiclesis, the Church asks the Father to send his Holy Spirit on the bread and wine, so that by his power they may become the body and blood of Jesus Christ.')
  insertCCC.run('john', 6, 53, '1374', 'In the most blessed sacrament of the Eucharist "the body and blood, together with the soul and divinity, of our Lord Jesus Christ and, therefore, the whole Christ is truly, really, and substantially contained."')
  insertCCC.run('john', 6, 55, '1375', 'It is by the conversion of the bread and wine into Christ\'s body and blood that Christ becomes present in this sacrament. The Council of Trent affirms that this wonderful conversion is called transubstantiation.')
  insertCCC.run('john', 10, 11, '754', 'The Church is the sheepfold, the sole and necessary gateway to which is Christ. It is also the flock of which God himself foretold that he would be the shepherd, and whose sheep, even though guided by human shepherds, are unfailingly nourished and led by Christ himself.')
  insertCCC.run('john', 19, 26, '501', 'Jesus is Mary\'s only son, but her spiritual motherhood extends to all men whom indeed he has come to save: "The Son whom she brought forth is he whom God placed as the first-born among many brethren."')
  insertCCC.run('john', 19, 27, '964', 'Mary\'s role in the Church is inseparable from her union with Christ and flows directly from it. This union of the mother with the Son in the work of salvation is made manifest from the time of Christ\'s virginal conception up to his death.')
  insertCCC.run('matthew', 5, 3, '1716', 'The Beatitudes are at the heart of Jesus\' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven.')
  insertCCC.run('matthew', 5, 3, '1820', 'Christian hope unfolds from the beginning of Jesus\' preaching in the proclamation of the beatitudes. The beatitudes raise our hope toward heaven as the new Promised Land; they trace the path that leads through the trials that await the disciples of Jesus.')
  insertCCC.run('matthew', 5, 17, '577', 'Jesus did not abolish the Law of Sinai, but rather fulfilled it with such perfection that he revealed its ultimate meaning and redeemed the transgressions against it.')
  insertCCC.run('matthew', 6, 9, '2777', 'In Roman law the pater familias, the head of the family, had authority over all members of his household. The same Roman term is used of God the Father, Lord and Father of all creation.')
  insertCCC.run('matthew', 6, 9, '2761', 'The Lord\'s Prayer "is truly the summary of the whole gospel." "Since the Lord... after handing over the practice of prayer, said elsewhere, \'Ask and you will receive,\' and since everyone has petitions which are peculiar to his circumstances, the regular and appropriate prayer comes first."')
  insertCCC.run('matthew', 16, 18, '552', 'Simon Peter holds the first place in the college of the Twelve; Jesus entrusted a unique mission to him. Through a revelation from the Father, Peter had confessed: "You are the Christ, the Son of the living God." Our Lord then declared to him: "You are Peter, and on this rock I will build my Church."')
  insertCCC.run('matthew', 16, 18, '881', 'The Lord made Simon alone, whom he named Peter, the "rock" of his Church. He gave him the keys of his Church and instituted him shepherd of the whole flock. "The office of binding and loosing which was given to Peter was also assigned to the college of apostles united to its head."')
  insertCCC.run('matthew', 16, 19, '553', 'Jesus entrusted a specific authority to Peter: "I will give you the keys of the kingdom of heaven, and whatever you bind on earth shall be bound in heaven, and whatever you loose on earth shall be loosed in heaven."')
  insertCCC.run('matthew', 26, 26, '1333', 'At the Last Supper, on the night he was betrayed, our Savior instituted the Eucharistic sacrifice of his Body and Blood. This he did in order to perpetuate the sacrifice of the cross throughout the ages until he should come again.')
  insertCCC.run('matthew', 26, 28, '613', 'The death of Christ is both the Paschal sacrifice that accomplishes the definitive redemption of men, through "the Lamb of God, who takes away the sin of the world," and the sacrifice of the New Covenant, which restores man to communion with God.')
  insertCCC.run('isaiah', 7, 14, '497', 'The Gospel accounts understand the virginal conception of Jesus as a divine work that surpasses all human understanding and possibility: "That which is conceived in her is of the Holy Spirit," said the angel to Joseph.')
  insertCCC.run('isaiah', 53, 5, '601', 'The Scriptures had foretold this divine plan of salvation through the putting to death of "the righteous one, my Servant" as a mystery of universal redemption, that is, as the ransom that would free men from the slavery of sin.')
  insertCCC.run('psalms', 22, 1, '2736', 'Are we convinced that "we do not know how to pray as we ought"? Are we asking God for "suitable gifts"? Our Father knows what we need before we ask him, but he awaits our petition because the dignity of his children lies in their freedom.')
  insertCCC.run('revelation', 12, 1, '966', 'Finally the Immaculate Virgin, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heavenly glory, and exalted by the Lord as Queen over all things.')
  insertCCC.run('revelation', 21, 4, '1044', 'In this new universe, the heavenly Jerusalem, God will have his dwelling place among men. "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning nor crying nor pain any more, for the former things have passed away."')
  insertCCC.run('romans', 8, 28, '313', 'We firmly believe that God is master of the world and of its history. But the ways of his providence are often unknown to us. Only at the end, when our partial knowledge ceases, when we see God "face to face," will we fully know the ways by which — even through the dramas of evil and sin — God has guided his creation to that definitive sabbath rest.')
  insertCCC.run('romans', 8, 38, '1010', 'Because of Christ, Christian death has a positive meaning: "For to me to live is Christ, and to die is gain." "The saying is sure: if we have died with him, we will also live with him." What is essentially new about Christian death is this: through Baptism, the Christian has already "died with Christ" sacramentally.')

  // === CROSS REFERENCES — EXPANDED ===
  insertXRef.run('genesis', 1, 1, 'john', 1, 1, 'parallel')
  insertXRef.run('genesis', 1, 2, 'matthew', 3, 16, 'typology')
  insertXRef.run('genesis', 1, 26, 'john', 1, 14, 'typology')
  insertXRef.run('genesis', 1, 27, 'matthew', 19, 4, 'fulfillment')
  insertXRef.run('genesis', 2, 24, 'matthew', 19, 5, 'fulfillment')
  insertXRef.run('genesis', 3, 15, 'revelation', 12, 1, 'fulfillment')
  insertXRef.run('genesis', 3, 15, 'john', 19, 26, 'typology')
  insertXRef.run('isaiah', 7, 14, 'matthew', 1, 23, 'fulfillment')
  insertXRef.run('isaiah', 9, 6, 'john', 1, 1, 'fulfillment')
  insertXRef.run('isaiah', 53, 7, 'john', 1, 29, 'fulfillment')
  insertXRef.run('isaiah', 53, 5, 'john', 19, 34, 'fulfillment')
  insertXRef.run('psalms', 22, 1, 'john', 10, 11, 'fulfillment')
  insertXRef.run('psalms', 22, 5, 'matthew', 26, 26, 'typology')
  insertXRef.run('psalms', 51, 10, 'john', 3, 5, 'thematic')
  insertXRef.run('matthew', 5, 3, 'psalm', 51, 1, 'thematic')
  insertXRef.run('matthew', 5, 17, 'john', 1, 17, 'parallel')
  insertXRef.run('matthew', 6, 9, 'john', 17, 1, 'thematic')
  insertXRef.run('matthew', 16, 18, 'john', 21, 15, 'parallel')
  insertXRef.run('matthew', 26, 26, 'john', 6, 51, 'parallel')
  insertXRef.run('matthew', 26, 28, 'isaiah', 53, 5, 'fulfillment')
  insertXRef.run('john', 1, 1, 'genesis', 1, 1, 'parallel')
  insertXRef.run('john', 1, 1, 'isaiah', 9, 6, 'fulfillment')
  insertXRef.run('john', 1, 14, 'psalm', 22, 1, 'thematic')
  insertXRef.run('john', 1, 29, 'isaiah', 53, 7, 'fulfillment')
  insertXRef.run('john', 3, 5, 'psalm', 51, 10, 'thematic')
  insertXRef.run('john', 3, 16, 'genesis', 22, 2, 'typology')
  insertXRef.run('john', 3, 16, 'romans', 5, 8, 'parallel')
  insertXRef.run('john', 6, 51, 'matthew', 26, 26, 'parallel')
  insertXRef.run('john', 6, 53, 'matthew', 26, 28, 'parallel')
  insertXRef.run('john', 10, 11, 'psalm', 22, 1, 'fulfillment')
  insertXRef.run('john', 19, 26, 'genesis', 3, 15, 'typology')
  insertXRef.run('revelation', 12, 1, 'genesis', 3, 15, 'fulfillment')
  insertXRef.run('revelation', 21, 1, 'genesis', 1, 1, 'parallel')
  insertXRef.run('revelation', 21, 4, 'revelation', 12, 1, 'thematic')

  console.log('✓ Bible DB seeded')
}

export { getDb }

export function getCommentaries(book: string, chapter: number, verse: number) {
  const db = getDb()
  return db.prepare('SELECT * FROM commentaries WHERE book=? AND chapter=? AND verse=? ORDER BY id').all(book, chapter, verse)
}

export function saveCommentary(data: { book: string; chapter: number; verse: number; text: string; author?: string; source?: string; type?: string }) {
  const db = getDb()
  return db.prepare('INSERT INTO commentaries (book, chapter, verse, text, author, source, type) VALUES (?,?,?,?,?,?,?)').run(
    data.book, data.chapter, data.verse, data.text,
    data.author || 'Editorial', data.source || 'Study Notes', data.type || 'verse'
  )
}

export function getCCCRefs(book: string, chapter: number, verse: number) {
  const db = getDb()
  return db.prepare('SELECT * FROM ccc_refs WHERE book=? AND chapter=? AND verse=?').all(book, chapter, verse)
}

export function getCrossRefs(book: string, chapter: number, verse: number) {
  const db = getDb()
  return db.prepare('SELECT * FROM cross_refs WHERE from_book=? AND from_chapter=? AND from_verse=?').all(book, chapter, verse)
}

export function saveHighlight(session_id: string, book: string, chapter: number, verse: number, color: string) {
  const db = getDb()
  return db.prepare('INSERT OR REPLACE INTO highlights (session_id, book, chapter, verse, color) VALUES (?,?,?,?,?)').run(session_id, book, chapter, verse, color)
}

export function getHighlights(session_id: string, book: string, chapter: number) {
  const db = getDb()
  return db.prepare('SELECT * FROM highlights WHERE session_id=? AND book=? AND chapter=?').all(session_id, book, chapter)
}

export function saveNote(session_id: string, book: string, chapter: number, verse: number, note_text: string) {
  const db = getDb()
  return db.prepare('INSERT INTO notes (session_id, book, chapter, verse, note_text) VALUES (?,?,?,?,?)').run(session_id, book, chapter, verse, note_text)
}

export function getNotes(session_id: string, book: string, chapter: number, verse: number) {
  const db = getDb()
  return db.prepare('SELECT * FROM notes WHERE session_id=? AND book=? AND chapter=? AND verse=? ORDER BY created_at').all(session_id, book, chapter, verse)
}
