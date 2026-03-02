import { NextRequest, NextResponse } from 'next/server'
import { saveNote, getNotes } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const session_id = searchParams.get('session_id') || 'default'
  const book = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')
  const verse = parseInt(searchParams.get('verse') || '0')

  const notes = getNotes(session_id, book, chapter, verse)
  return NextResponse.json({ notes })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { session_id = 'default', book, chapter, verse, note_text } = body

  if (!book || !chapter || !verse || !note_text) {
    return NextResponse.json({ error: 'book, chapter, verse, note_text required' }, { status: 400 })
  }

  saveNote(session_id, book, parseInt(chapter), parseInt(verse), note_text)
  return NextResponse.json({ success: true })
}
