import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/db'
import { COOKIE_NAME, getSessionToken } from '@/lib/auth'

export async function POST() {
  const token = await getSessionToken()
  if (token) deleteSession(token)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' })
  return res
}
