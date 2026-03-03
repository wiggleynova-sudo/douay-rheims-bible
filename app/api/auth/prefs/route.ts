import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { setUserFontSize } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    const { fontSize } = await req.json()
    if (!['sm', 'md', 'lg', 'xl'].includes(fontSize)) {
      return NextResponse.json({ error: 'Invalid font size' }, { status: 400 })
    }
    if (user) {
      setUserFontSize(user.id, fontSize)
    }
    // Always return ok — anonymous users just use localStorage
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
