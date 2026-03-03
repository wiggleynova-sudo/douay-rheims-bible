import { NextResponse } from 'next/server'
import { loginUser, createSession } from '@/lib/db'
import { COOKIE_NAME, COOKIE_OPTS } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

    const user = await loginUser(email, password)
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })

    const token = createSession(user.id)
    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, displayName: user.display_name, fontSize: user.font_size }
    })
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTS)
    return res
  } catch (e: any) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
