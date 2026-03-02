import { NextRequest, NextResponse } from 'next/server'
import { getCommentaries, saveCommentary, getCCCRefs, getCrossRefs } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const book = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')
  const verse = parseInt(searchParams.get('verse') || '0')

  if (!book || !chapter || !verse) {
    return NextResponse.json({ error: 'book, chapter, verse required' }, { status: 400 })
  }

  const commentaries = getCommentaries(book, chapter, verse)
  const cccRefs = getCCCRefs(book, chapter, verse)
  const crossRefs = getCrossRefs(book, chapter, verse)

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
