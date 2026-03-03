'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type User = { id: number; email: string; displayName: string; fontSize: string } | null

const AuthCtx = createContext<{
  user: User
  loading: boolean
  refresh: () => void
  logout: () => Promise<void>
}>({ user: null, loading: true, refresh: () => {}, logout: async () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        setUser(d.user || null)
        if (d.user?.fontSize) {
          document.documentElement.setAttribute('data-fsize', d.user.fontSize)
          localStorage.setItem('fontSize', d.user.fontSize)
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Apply locally saved font size immediately (before server confirms)
    const saved = localStorage.getItem('fontSize')
    if (saved) document.documentElement.setAttribute('data-fsize', saved)
    refresh()
  }, [refresh])

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.location.href = '/'
  }

  return <AuthCtx.Provider value={{ user, loading, refresh, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth() { return useContext(AuthCtx) }
