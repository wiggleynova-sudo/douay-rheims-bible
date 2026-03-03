import { NextRequest, NextResponse } from 'next/server'
import { saveNote, getNotes, verifySession } from '@/lib/db'
import { COOKIE_NAME } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function getEffectiveSession(req: NextRequest, fallback: string): string {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (token) {
    const user = verifySession(token)
    if (user) return `user_${user.id}`
  }
  return fallback
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const fallback = searchParams.get('session_id') || 'default'
  const session_id = getEffectiveSession(req, fallback)
  const book = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')
  const verse = parseInt(searchParams.get('verse') || '0')
  const notes = getNotes(session_id, book, chapter, verse)
  return NextResponse.json({ notes })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { session_id: fallback = 'default', book, chapter, verse, note_text } = body
  const session_id = getEffectiveSession(req, fallback)
  if (!book || !chapter || !verse || !note_text) {
    return NextResponse.json({ error: 'book, chapter, verse, note_text required' }, { status: 400 })
  }
  saveNote(session_id, book, parseInt(chapter), parseInt(verse), note_text)
  return NextResponse.json({ success: true })
}
