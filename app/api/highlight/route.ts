import { NextRequest, NextResponse } from 'next/server'
import { saveHighlight, getHighlights } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const session_id = searchParams.get('session_id') || 'default'
  const book = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')

  const highlights = getHighlights(session_id, book, chapter)
  return NextResponse.json({ highlights })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { session_id = 'default', book, chapter, verse, color = 'yellow' } = body

  if (!book || !chapter || !verse) {
    return NextResponse.json({ error: 'book, chapter, verse required' }, { status: 400 })
  }

  saveHighlight(session_id, book, parseInt(chapter), parseInt(verse), color)
  return NextResponse.json({ success: true })
}
