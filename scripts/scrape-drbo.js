#!/usr/bin/env node
/**
 * scrape-drbo.js — Douay-Rheims Bible scraper from drbo.org
 * Fetches every chapter of all 73 books and stores verse text in SQLite.
 * Rate-limited to 300ms between requests. Idempotent (skips existing rows).
 */

const path = require('path')
const Database = require('better-sqlite3')

const DB_PATH = path.join(__dirname, '..', 'data', 'bible.db')
const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

// Create verses table
db.exec(`
  CREATE TABLE IF NOT EXISTS bible_verses (
    book_id   TEXT,
    chapter   INTEGER,
    verse_num INTEGER,
    verse_text TEXT,
    PRIMARY KEY (book_id, chapter, verse_num)
  )
`)

const insertVerse = db.prepare('INSERT OR REPLACE INTO bible_verses VALUES (?,?,?,?)')
const chapterExists = db.prepare(
  'SELECT COUNT(*) as n FROM bible_verses WHERE book_id=? AND chapter=?'
)

// ── Book mapping: drbo number → book_id slug ──────────────────────────────
const BOOKS = [
  { num: 1,  id: 'genesis',          chapters: 50 },
  { num: 2,  id: 'exodus',           chapters: 40 },
  { num: 3,  id: 'leviticus',        chapters: 27 },
  { num: 4,  id: 'numbers',          chapters: 36 },
  { num: 5,  id: 'deuteronomy',      chapters: 34 },
  { num: 6,  id: 'josue',            chapters: 24 },
  { num: 7,  id: 'judges',           chapters: 21 },
  { num: 8,  id: 'ruth',             chapters: 4  },
  { num: 9,  id: '1-kings',          chapters: 31 },
  { num: 10, id: '2-kings',          chapters: 24 },
  { num: 11, id: '3-kings',          chapters: 22 },
  { num: 12, id: '4-kings',          chapters: 25 },
  { num: 13, id: '1-paralipomenon',  chapters: 29 },
  { num: 14, id: '2-paralipomenon',  chapters: 36 },
  { num: 15, id: '1-esdras',         chapters: 10 },
  { num: 16, id: '2-esdras',         chapters: 13 },
  { num: 17, id: 'tobias',           chapters: 14 },
  { num: 18, id: 'judith',           chapters: 16 },
  { num: 19, id: 'esther',           chapters: 16 },
  { num: 20, id: 'job',              chapters: 42 },
  { num: 21, id: 'psalms',           chapters: 150 },
  { num: 22, id: 'proverbs',         chapters: 31 },
  { num: 23, id: 'ecclesiastes',     chapters: 12 },
  { num: 24, id: 'canticle',         chapters: 8  },
  { num: 25, id: 'wisdom',           chapters: 19 },
  { num: 26, id: 'ecclesiasticus',   chapters: 51 },
  { num: 27, id: 'isaiah',           chapters: 66 },
  { num: 28, id: 'jeremias',         chapters: 52 },
  { num: 29, id: 'lamentations',     chapters: 5  },
  { num: 30, id: 'baruch',           chapters: 6  },
  { num: 31, id: 'ezechiel',         chapters: 48 },
  { num: 32, id: 'daniel',           chapters: 14 },
  { num: 33, id: 'osee',             chapters: 14 },
  { num: 34, id: 'joel',             chapters: 3  },
  { num: 35, id: 'amos',             chapters: 9  },
  { num: 36, id: 'abdias',           chapters: 1  },
  { num: 37, id: 'jonas',            chapters: 4  },
  { num: 38, id: 'micheas',          chapters: 7  },
  { num: 39, id: 'nahum',            chapters: 3  },
  { num: 40, id: 'habacuc',          chapters: 3  },
  { num: 41, id: 'sophonias',        chapters: 3  },
  { num: 42, id: 'aggeus',           chapters: 2  },
  { num: 43, id: 'zacharias',        chapters: 14 },
  { num: 44, id: 'malachias',        chapters: 4  },
  { num: 45, id: '1-machabees',      chapters: 16 },
  { num: 46, id: '2-machabees',      chapters: 15 },
  // NT
  { num: 47, id: 'matthew',          chapters: 28 },
  { num: 48, id: 'mark',             chapters: 16 },
  { num: 49, id: 'luke',             chapters: 24 },
  { num: 50, id: 'john',             chapters: 21 },
  { num: 51, id: 'acts',             chapters: 28 },
  { num: 52, id: 'romans',           chapters: 16 },
  { num: 53, id: '1-corinthians',    chapters: 16 },
  { num: 54, id: '2-corinthians',    chapters: 13 },
  { num: 55, id: 'galatians',        chapters: 6  },
  { num: 56, id: 'ephesians',        chapters: 6  },
  { num: 57, id: 'philippians',      chapters: 4  },
  { num: 58, id: 'colossians',       chapters: 4  },
  { num: 59, id: '1-thessalonians',  chapters: 5  },
  { num: 60, id: '2-thessalonians',  chapters: 3  },
  { num: 61, id: '1-timothy',        chapters: 6  },
  { num: 62, id: '2-timothy',        chapters: 4  },
  { num: 63, id: 'titus',            chapters: 3  },
  { num: 64, id: 'philemon',         chapters: 1  },
  { num: 65, id: 'hebrews',          chapters: 13 },
  { num: 66, id: 'james',            chapters: 5  },
  { num: 67, id: '1-peter',          chapters: 5  },
  { num: 68, id: '2-peter',          chapters: 3  },
  { num: 69, id: '1-john',           chapters: 5  },
  { num: 70, id: '2-john',           chapters: 1  },
  { num: 71, id: '3-john',           chapters: 1  },
  { num: 72, id: 'jude',             chapters: 1  },
  { num: 73, id: 'revelation',       chapters: 22 },
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchPage(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Bible Study Bot; +https://catholic-bible-app)',
          'Accept': 'text/html',
        },
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.text()
    } catch (err) {
      if (i < retries - 1) {
        console.warn(`  ↩ retry ${i+1} for ${url}: ${err.message}`)
        await sleep(1000 * (i + 1))
      } else {
        throw err
      }
    }
  }
}

/**
 * Parse verse text from drbo.org HTML.
 *
 * The page has a <div class="verse"> structure or uses inline <p> tags.
 * Pattern: verse lines look like:
 *   <p>  1 In the beginning...</p>
 * Footnotes look like [1] "The beginning..." — strip these.
 *
 * We extract text content and parse numerically.
 */
function parseVerses(html) {
  // Strip script/style
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '')
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '')

  // Decode HTML entities
  html = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&apos;/g, "'")

  // Strip all HTML tags
  const text = html.replace(/<[^>]+>/g, ' ')

  // Split into lines
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean)

  const verses = []
  let currentVerse = null
  let currentText = []

  // Regex: line starting with verse number (1-3 digits) followed by text
  // We look for lines that START with a standalone number
  const verseStart = /^\s*(\d{1,3})\s+(.+)/

  for (const line of lines) {
    // Skip footnote lines like [1] or [1-3] or [a] at start
    if (/^\s*\[\d+/.test(line) || /^\s*\[?[a-z]\]/.test(line)) continue
    // Skip empty or navigation junk
    if (line.length < 3) continue
    // Skip lines that are clearly navigation (e.g. "Previous Chapter", "Next Chapter", etc.)
    if (/^(previous|next|chapter|home|bible|search|drbo|copyright|latin|\s*©)/i.test(line)) continue

    const m = verseStart.exec(line)
    if (m) {
      const vNum = parseInt(m[1])
      // Only accept if verse number is reasonable (1-300)
      if (vNum >= 1 && vNum <= 300) {
        // Save previous verse
        if (currentVerse !== null && currentText.length > 0) {
          const txt = currentText.join(' ').replace(/\s+/g, ' ').trim()
          if (txt.length > 2) {
            verses.push({ verse: currentVerse, text: txt })
          }
        }
        currentVerse = vNum
        currentText = [m[2].trim()]
        continue
      }
    }

    // Continuation of current verse
    if (currentVerse !== null) {
      // Stop collecting if line looks like a footnote section header
      if (/^\[\d+\]/.test(line)) continue
      currentText.push(line)
    }
  }

  // Flush last verse
  if (currentVerse !== null && currentText.length > 0) {
    const txt = currentText.join(' ').replace(/\s+/g, ' ').trim()
    if (txt.length > 2) {
      verses.push({ verse: currentVerse, text: txt })
    }
  }

  return verses
}

async function scrapeChapter(bookNum, bookId, chapterNum) {
  const bookPad = String(bookNum).padStart(2, '0')
  const chapPad = String(chapterNum).padStart(3, '0')
  const url = `https://www.drbo.org/chapter/${bookPad}${chapPad}.htm`

  const html = await fetchPage(url)
  const verses = parseVerses(html)
  return { url, verses }
}

async function main() {
  let totalBooks = 0
  let totalChapters = 0
  let totalVerses = 0
  let skippedChapters = 0

  console.log('📖 Starting Douay-Rheims scraper — drbo.org')
  console.log(`   Target: ${BOOKS.length} books, rate-limited to 300ms/request\n`)

  for (const book of BOOKS) {
    let bookVerses = 0
    let bookChapters = 0

    for (let ch = 1; ch <= book.chapters; ch++) {
      // Check if already scraped
      const existing = chapterExists.get(book.id, ch)
      if (existing && existing.n > 0) {
        skippedChapters++
        bookVerses += existing.n
        bookChapters++
        continue
      }

      try {
        const { verses } = await scrapeChapter(book.num, book.id, ch)

        if (verses.length === 0) {
          console.warn(`  ⚠ ${book.id} ch ${ch} — no verses parsed (check URL or HTML structure)`)
        } else {
          const saveMany = db.transaction((rows) => {
            for (const v of rows) {
              insertVerse.run(book.id, ch, v.verse, v.text)
            }
          })
          saveMany(verses)
          bookVerses += verses.length
          totalVerses += verses.length
        }

        bookChapters++
        process.stdout.write(`  [${book.id}] ch ${ch}/${book.chapters} — ${verses.length} verses\r`)

        await sleep(300)
      } catch (err) {
        console.error(`  ✗ ${book.id} ch ${ch}: ${err.message}`)
        await sleep(500)
      }
    }

    totalChapters += bookChapters
    totalBooks++
    console.log(`✓ ${book.id.padEnd(20)} ${bookChapters} chapters, ${bookVerses} verses total`)
  }

  console.log('\n══════════════════════════════════════════')
  console.log(`✅ DONE: ${totalBooks} books, ${totalChapters} chapters, ${totalVerses} new verses`)
  console.log(`   Skipped ${skippedChapters} already-scraped chapters`)
  console.log('══════════════════════════════════════════')

  db.close()
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
