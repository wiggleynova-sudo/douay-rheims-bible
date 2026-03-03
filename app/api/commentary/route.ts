import { NextRequest, NextResponse } from 'next/server'
import { getCommentaries, saveCommentary, getCCCRefs, getCrossRefs, getChapterVersesFromDB } from '@/lib/db'

export const dynamic = 'force-dynamic'
// Allow up to 30s for AI generation
export const maxDuration = 30

// ── AI Commentary Generation ─────────────────────────────────────────────────

async function generateCommentary(
  book: string, chapter: number, verse: number, verseText: string
): Promise<{ text: string; author: string; source: string; type: string } | null> {
  const bookLabel = book.charAt(0).toUpperCase() + book.slice(1)

  const prompt = `You are a Catholic scripture scholar writing commentary for a digital Catholic Bible study app. Your commentary is modeled on the style of the RSV Catholic Study Bible, the Navarre Bible, and the great Church Fathers.

Write a thoughtful Catholic commentary for:

VERSE: ${bookLabel} ${chapter}:${verse}
TEXT: "${verseText}"

Requirements:
- 2–4 paragraphs, ~200–350 words total
- Begin with the theological or literary significance of this specific verse
- Reference at least one Church Father (Augustine, Aquinas, Chrysostom, Jerome, Ambrose, Origen, Cyril, Irenaeus, Gregory, Leo, Bernard, etc.) with a genuine insight tied to this verse
- Reference the Catechism of the Catholic Church (CCC) by paragraph number where relevant
- Connect to the broader story of salvation history (typology, fulfillment, covenant) if applicable
- Write in a reverent, scholarly but accessible tone — not dry academic, not modern therapeutic
- Do NOT use markdown formatting (no bold, no headers, no bullet points) — plain paragraphs only
- Do NOT start with "This verse" or "In this verse" — begin with the theological reality itself
- Use "\\n\\n" between paragraphs

Then on a new line write EXACTLY:
AUTHOR: [Name of the Church Father or scholar most central to your commentary]
SOURCE: [Brief source title or "Catholic Commentary" if general]
TYPE: [verse OR theological]`

  try {
    const res = await fetch('http://127.0.0.1:18789/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer WOLF_2026',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(25000),
    })

    if (!res.ok) {
      console.error('[commentary] AI generation failed:', res.status, await res.text())
      return null
    }

    const data = await res.json()
    const raw: string = data?.choices?.[0]?.message?.content || ''

    // Parse the structured response
    const authorMatch = raw.match(/\nAUTHOR:\s*(.+)/i)
    const sourceMatch = raw.match(/\nSOURCE:\s*(.+)/i)
    const typeMatch   = raw.match(/\nTYPE:\s*(.+)/i)

    // Strip the metadata lines to get just the commentary text
    const text = raw
      .replace(/\nAUTHOR:.+/i, '')
      .replace(/\nSOURCE:.+/i, '')
      .replace(/\nTYPE:.+/i, '')
      .trim()

    if (!text) return null

    return {
      text,
      author: authorMatch?.[1]?.trim() || 'Catholic Commentary',
      source: sourceMatch?.[1]?.trim() || 'Study Notes',
      type:   (typeMatch?.[1]?.trim() || 'verse').toLowerCase().replace(/[^a-z]/g, ''),
    }
  } catch (err) {
    console.error('[commentary] Generation error:', err)
    return null
  }
}

// ── Route Handlers ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const book    = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')
  const verse   = parseInt(searchParams.get('verse') || '0')

  if (!book || !chapter || !verse) {
    return NextResponse.json({ error: 'book, chapter, verse required' }, { status: 400 })
  }

  let commentaries = getCommentaries(book, chapter, verse)
  const cccRefs    = getCCCRefs(book, chapter, verse)
  const crossRefs  = getCrossRefs(book, chapter, verse)

  // ── On-demand generation ──────────────────────────────────────────────────
  if (commentaries.length === 0) {
    // Get the verse text from DB (scraped cache)
    const chapterVerses = getChapterVersesFromDB(book, chapter)
    const verseEntry    = chapterVerses.find(v => v.verse === verse)

    if (verseEntry?.text) {
      const generated = await generateCommentary(book, chapter, verse, verseEntry.text)
      if (generated) {
        saveCommentary({
          book, chapter, verse,
          text:   generated.text,
          author: generated.author,
          source: generated.source,
          type:   generated.type,
        })
        // Reload from DB so we return the persisted row with id + timestamps
        commentaries = getCommentaries(book, chapter, verse)
      }
    }
  }

  return NextResponse.json({ commentaries, cccRefs, crossRefs })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { book, chapter, verse, text, author, source, type } = body

  if (!book || !chapter || !verse || !text) {
    return NextResponse.json({ error: 'book, chapter, verse, text required' }, { status: 400 })
  }

  const result = saveCommentary({ book, chapter: parseInt(chapter), verse: parseInt(verse), text, author, source, type })
  return NextResponse.json({ id: result.lastInsertRowid, success: true })
}
