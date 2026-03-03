import { NextResponse } from 'next/server'
import { createUser, loginUser, createSession } from '@/lib/db'
import { COOKIE_NAME, COOKIE_OPTS } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, displayName, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })

    await createUser(email, displayName || email.split('@')[0], password)

    // Auto-login after register
    const user = await loginUser(email, password)
    if (!user) return NextResponse.json({ error: 'Registration failed' }, { status: 500 })

    const token = createSession(user.id)
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, displayName: user.display_name } })
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTS)
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Registration failed' }, { status: 400 })
  }
}
