import { getDb } from '@/lib/db'
import { getBook, getVerse } from '@/data/bible-data'

export const GET = async () => {
  try {
    const db = getDb()
    const highlights = db.prepare(`
      SELECT book, chapter, verse, color, created_at
      FROM highlights
      ORDER BY created_at DESC
    `).all() as Array<{ book: string; chapter: number; verse: number; color: string; created_at: string }>

    const enriched = highlights.map(h => {
      const b = getBook(h.book)
      const v = getVerse(h.book, h.chapter, h.verse)
      return {
        ...h,
        bookName: b?.name || h.book,
        verseText: v?.text || `${h.book} ${h.chapter}:${h.verse}`,
      }
    })

    return Response.json({ count: enriched.length, highlights: enriched })
  } catch (e) {
    console.error(e)
    return Response.json({ error: 'Failed to fetch highlights' }, { status: 500 })
  }
}

export const DELETE = async (req: Request) => {
  try {
    const { book, chapter, verse } = await req.json()
    const db = getDb()
    db.prepare('DELETE FROM highlights WHERE book = ? AND chapter = ? AND verse = ?')
      .run(book, chapter, verse)
    return Response.json({ ok: true })
  } catch (e) {
    console.error(e)
    return Response.json({ error: 'Failed to delete highlight' }, { status: 500 })
  }
}
