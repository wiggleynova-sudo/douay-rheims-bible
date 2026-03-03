'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import NavUserBadge from './NavUserBadge'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/study',           label: 'STUDY PATHS', gold: true },
  { href: '/highlights',      label: 'HIGHLIGHTS' },
  { href: '/parallel/john/1', label: 'PARALLEL' },
  { href: '/read/genesis/1',  label: 'READ' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <header style={{
      background: '#2A1008',
      borderBottom: '2px solid #9A7320',
      padding: '0 20px',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, color: '#9A7320' }}>☧</span>
          <div>
            <div style={{
              fontFamily: 'Cinzel Decorative, Cinzel, serif',
              fontSize: 13, fontWeight: 700,
              color: '#C9A848', letterSpacing: '0.08em', lineHeight: 1.2,
            }}>Douay-Rheims</div>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 8,
              color: '#9A7320', letterSpacing: '0.18em',
            }}>SACRED SCRIPTURE</div>
          </div>
        </Link>

        {/* Desktop nav */}
        {!mobile && (
          <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {NAV_LINKS.map((item, i) => (
              <span key={item.href} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ color: '#4A2010', fontSize: 10 }}>✦</span>}
                <Link href={item.href} style={{
                  fontFamily: 'Cinzel, serif', fontSize: 12,
                  letterSpacing: '0.1em',
                  color: item.gold ? '#C9A848' : '#9A7320',
                  textDecoration: 'none',
                }}>
                  {item.label}
                </Link>
              </span>
            ))}
            <span style={{ color: '#4A2010', fontSize: 10, marginLeft: 4 }}>✦</span>
            <NavUserBadge />
          </nav>
        )}

        {/* Mobile: Sign In + Hamburger */}
        {mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} ref={menuRef}>
            <NavUserBadge />
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                background: open ? 'rgba(154,115,32,0.2)' : 'none',
                border: '1px solid #4A2010', borderRadius: 3,
                color: '#9A7320', cursor: 'pointer', padding: '7px 9px',
                display: 'flex', alignItems: 'center',
              }}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>

            {/* Dropdown */}
            {open && (
              <div style={{
                position: 'absolute', top: 56, right: 0, left: 0,
                background: '#1A0804',
                borderBottom: '2px solid #9A7320',
                zIndex: 300, padding: '8px 0',
              }}>
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block', padding: '14px 24px',
                      fontFamily: 'Cinzel, serif', fontSize: 13,
                      letterSpacing: '0.12em',
                      color: item.gold ? '#C9A848' : '#9A7320',
                      textDecoration: 'none',
                      borderBottom: '1px solid #2A1208',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
