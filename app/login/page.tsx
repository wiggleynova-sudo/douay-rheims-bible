'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Mode = 'login' | 'register'

const field = {
  width: '100%', padding: '12px 14px', marginBottom: 14,
  background: '#FAF4E6', border: '1px solid #D4BC8A',
  borderRadius: 3, color: '#2A1405',
  fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
  outline: 'none', boxSizing: 'border-box' as const,
}

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const body = mode === 'login'
      ? { email, password }
      : { email, password, displayName: name || email.split('@')[0] }

    try {
      const res = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) { setError(data.error || 'Something went wrong.'); setLoading(false); return }
      // Success — apply font size preference if set
      if (data.user?.fontSize) {
        document.documentElement.setAttribute('data-fsize', data.user.fontSize)
        localStorage.setItem('fontSize', data.user.fontSize)
      }
      router.push('/')
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#2A1008',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 32, color: '#9A7320', marginBottom: 6 }}>☧</div>
        <div style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 18, color: '#C9A848', letterSpacing: '0.06em', marginBottom: 4 }}>
          Douay-Rheims
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, color: '#6A4828', letterSpacing: '0.25em' }}>
          SACRED SCRIPTURE
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: '#F7F0DC', border: '2px solid #9A7320',
        borderRadius: 4, padding: '32px 28px',
        width: '100%', maxWidth: 400,
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: 28, borderBottom: '1px solid #D4BC8A' }}>
          {(['login', 'register'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }} style={{
              flex: 1, padding: '10px 0',
              background: 'none', border: 'none',
              borderBottom: mode === m ? '2px solid #7A0E1C' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer',
              fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.12em',
              color: mode === m ? '#7A0E1C' : '#9A7320',
              transition: 'color 0.15s',
            }}>
              {m === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          ))}
        </div>

        {/* Form */}
        {mode === 'register' && (
          <input
            type="text" placeholder="Your name (optional)"
            value={name} onChange={e => setName(e.target.value)}
            style={field}
          />
        )}
        <input
          type="email" placeholder="Email address"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          style={field}
        />
        <input
          type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          style={{ ...field, marginBottom: 18 }}
        />

        {error && (
          <div style={{
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            fontSize: 14, color: '#7A0E1C', marginBottom: 14, textAlign: 'center',
          }}>{error}</div>
        )}

        <button onClick={submit} disabled={loading} style={{
          width: '100%', padding: '13px',
          background: loading ? '#4A2010' : '#2A1008',
          border: '1px solid #9A7320', borderRadius: 3,
          color: '#C9A848', fontFamily: 'Cinzel, serif',
          fontSize: 11, letterSpacing: '0.12em', cursor: loading ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}>
          {loading ? '✦ ENTERING…' : mode === 'login' ? 'ENTER ✦' : 'CREATE ACCOUNT ✦'}
        </button>

        {mode === 'register' && (
          <div style={{
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            fontSize: 13, color: '#8B6040', textAlign: 'center', marginTop: 14,
          }}>
            Your notes, highlights, and font preferences will be saved across devices.
          </div>
        )}
      </div>

      {/* Continue as guest */}
      <div style={{ marginTop: 22 }}>
        <Link href="/" style={{
          fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
          fontSize: 15, color: '#6A4828', textDecoration: 'none',
        }}>
          Continue reading without an account →
        </Link>
      </div>

      {/* Footer ornament */}
      <div style={{
        marginTop: 36, fontFamily: 'Cinzel, serif', fontSize: 14,
        color: '#4A2010', letterSpacing: '0.2em',
      }}>α · ✦ · Ω</div>
    </div>
  )
}
