'use client'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { LogIn, LogOut } from 'lucide-react'

export default function NavUserBadge() {
  const { user, loading, logout } = useAuth()
  if (loading) return null
  if (user) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
        fontSize: 14, color: '#C9A848',
      }}>
        {user.displayName?.split(' ')[0] || user.email.split('@')[0]}
      </span>
      <button onClick={logout} title="Sign out" style={{
        background: 'none', border: '1px solid #4A2010', borderRadius: 3,
        color: '#6A4828', cursor: 'pointer', padding: '4px 7px',
        display: 'flex', alignItems: 'center',
      }}>
        <LogOut size={13}/>
      </button>
    </div>
  )
  return (
    <Link href="/login" style={{
      display: 'flex', alignItems: 'center', gap: 5,
      fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.1em',
      color: '#C9A848', textDecoration: 'none',
      border: '1px solid #4A2010', borderRadius: 3, padding: '6px 12px',
    }}>
      <LogIn size={13}/> SIGN IN
    </Link>
  )
}
