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

  insertCommentary.run('psalm', 23, 1,
    'The Twenty-Third Psalm is perhaps the most beloved of all 150 Psalms, traditionally attributed to David the shepherd-king. "The Lord is my shepherd" — this image was radical in the ancient world, where kings claimed the title of shepherd for themselves. Here it is given to God.\n\nThe Church Fathers universally read this Psalm in light of Christ. St. Augustine: "The Lord Jesus Christ is my shepherd; I shall want for nothing." Christ himself claimed the title explicitly: "I am the good shepherd" (John 10:11,14).\n\nIn the Catholic tradition, this Psalm is sung at funerals, Masses for the Dead, and Baptismal liturgies — it accompanies Christians through the entire journey of salvation, from Baptism (the waters of refreshment) through death (the valley of the shadow) to the Eucharistic feast (thou preparest a table before me).',
    'St. Augustine', 'Enarrationes in Psalmos 22', 'verse')

  insertCommentary.run('psalm', 23, 4,
    '"Though I walk through the valley of the shadow of death" — the Hebrew tsalmaveth, "the shadow of death," evokes the darkest possible human experience. Yet the Psalmist does not shrink from naming it. Faith does not pretend that suffering and death are not real.\n\n"Thy rod and thy staff, they comfort me." The shepherd\'s rod was for discipline and defense against predators; the staff for guidance and support. Both aspects of God\'s care — discipline and tenderness — are comforting, not just the tender mercies. Catholic spirituality has always held that suffering, when united to Christ\'s Passion, is itself a form of divine accompaniment.',
    'Editorial', 'Patristic Commentary', 'verse')

  // === CCC REFERENCES ===
  insertCCC.run('genesis', 1, 1, '279', 'Among all the Scriptural texts about creation, the first three chapters of Genesis occupy a unique place. The literary genre of these texts calls for a particular interpretation: "The question is not to know what literary genre Genesis is employing but to grasp the religious truth that God wants to reveal to us through the sacred author."')
  insertCCC.run('genesis', 1, 26, '1702', 'The divine image is present in every man. It shines forth in the communion of persons, in the likeness of the union of the divine persons among themselves. Endowed with a spiritual soul, with intellect and free will, the human person is from his very conception ordered to God and destined for eternal beatitude.')
  insertCCC.run('john', 1, 1, '241', 'Jesus revealed that God is Father in an unheard-of sense: he is Father not only in being Creator; he is eternally Father in relation to his only Son, who, reciprocally, is Son only in relation to his Father.')
  insertCCC.run('john', 3, 16, '458', 'The Word became flesh so that thus we might know God\'s love: "In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him."')
  insertCCC.run('matthew', 5, 3, '1716', 'The Beatitudes are at the heart of Jesus\' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven.')
  insertCCC.run('psalm', 23, 1, '2736', 'In the Sermon on the Mount Jesus insists on the conversion of heart: reconciliation with one\'s brother before presenting an offering on the altar, love of enemies, and prayer for persecutors, prayer to the Father in secret, not heaping up empty phrases.')

  // === CROSS REFERENCES ===
  insertXRef.run('genesis', 1, 1, 'john', 1, 1, 'parallel')
  insertXRef.run('genesis', 1, 26, 'john', 1, 14, 'typology')
  insertXRef.run('genesis', 22, 2, 'john', 3, 16, 'typology')
  insertXRef.run('psalm', 23, 1, 'john', 10, 11, 'fulfillment')
  insertXRef.run('matthew', 5, 17, 'john', 1, 17, 'parallel')
  insertXRef.run('john', 1, 1, 'genesis', 1, 1, 'parallel')
  insertXRef.run('john', 1, 14, 'psalm', 23, 1, 'thematic')
  insertXRef.run('john', 3, 16, 'genesis', 22, 2, 'typology')

  console.log('✓ Bible DB seeded')
}

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
