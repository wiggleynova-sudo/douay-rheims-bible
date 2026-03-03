import { NextRequest, NextResponse } from 'next/server'
import { getChapterVersesFromDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const book = searchParams.get('book') || ''
  const chapter = parseInt(searchParams.get('chapter') || '0')
  if (!book || !chapter) return NextResponse.json({ verses: [] })
  const verses = getChapterVersesFromDB(book, chapter)
  return NextResponse.json({ verses })
}
