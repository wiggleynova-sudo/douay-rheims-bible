import { cookies } from 'next/headers'
import { verifySession } from './db'

export const COOKIE_NAME = 'bible_auth'
export const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
}

/** Get the current authenticated user from the request cookie (server-side) */
export async function getCurrentUser() {
  try {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return null
    return verifySession(token)
  } catch {
    return null
  }
}

/** Get session token from cookie store */
export async function getSessionToken() {
  try {
    const store = await cookies()
    return store.get(COOKIE_NAME)?.value ?? null
  } catch {
    return null
  }
}
