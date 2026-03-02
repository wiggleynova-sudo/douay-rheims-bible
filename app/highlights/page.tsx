'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

type HighlightItem = {
  book: string; chapter: number; verse: number
  color: string; created_at: string
  bookName: string; verseText: string
}

const COLORS: Record<string, { label: string; swatch: string; bg: string; border: string }> = {
  yellow: { label: 'Key Text', swatch: '#E8B840', bg: 'rgba(184,134,11,0.1)',  border: '#B8860B' },
  blue:   { label: 'Marian',   swatch: '#4A6ABE', bg: 'rgba(26,42,94,0.08)',   border: '#1A2A5E' },
  red:    { label: 'Christ',   swatch: '#A02030', bg: 'rgba(122,14,28,0.08)',  border: '#7A0E1C' },
  green:  { label: 'Prayer',   swatch: '#4A8030', bg: 'rgba(42,74,26,0.08)',   border: '#2A4A1A' },
}

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/highlights-summary')
      .then(r => r.json())
      .then(d => { setHighlights(d.highlights || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const deleteHighlight = async (h: HighlightItem) => {
    await fetch('/api/highlights-summary', {
      method: 'DELETE',
      body: JSON.stringify({ book: h.book, chapter: h.chapter, verse: h.verse }),
    })
    setHighlights(hs => hs.filter(x => !(x.book === h.book && x.chapter === h.chapter && x.verse === h.verse)))
  }

  const filtered = filter ? highlights.filter(h => h.color === filter) : highlights
  const colorCounts = highlights.reduce((acc: Record<string, number>, h) => {
    acc[h.color] = (acc[h.color] || 0) + 1; return acc
  }, {})

  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405' }}>

      {/* Header */}
      <header style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 14,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, color: '#9A7320' }}>☧</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#9A7320', letterSpacing: '0.15em' }}>D-R BIBLE</span>
        </Link>
        <span style={{ color: '#4A2010', fontSize: 12 }}>✦</span>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#C9A848', letterSpacing: '0.1em' }}>
          SAVED HIGHLIGHTS
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic', fontSize: 14, color: '#6A4828' }}>
          {highlights.length} {highlights.length === 1 ? 'verse' : 'verses'} marked
        </span>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '44px 24px 80px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.35em',
            color: '#9A7320', marginBottom: 14,
          }}>✦ YOUR SCRIPTURE GARDEN ✦</div>
          <h1 style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 26, fontWeight: 700, color: '#2A1405',
            letterSpacing: '0.04em', marginBottom: 12,
          }}>Marked Passages</h1>
          <p style={{
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            fontSize: 17, color: '#5C3A1E', lineHeight: 1.65,
          }}>
            {highlights.length === 0
              ? 'As you read, tap any verse and mark it. Your passages will gather here.'
              : 'Tap a reference to return to that passage in its chapter. Remove with the × icon.'}
          </p>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 18, color: '#9A7320', letterSpacing: '0.2em', marginTop: 18, opacity: 0.5 }}>
            ─── ✦ ───
          </div>
        </div>

        {/* Filter bar */}
        {highlights.length > 0 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
            <button onClick={() => setFilter(null)} style={{
              padding: '7px 16px', borderRadius: 2,
              background: filter === null ? '#2A1008' : '#EFE3C2',
              border: `1px solid ${filter === null ? '#9A7320' : '#D4BC8A'}`,
              color: filter === null ? '#C9A848' : '#5C3A1E',
              fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.12em',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              ALL ({highlights.length})
            </button>
            {Object.entries(colorCounts).map(([c, count]) => {
              const cfg = COLORS[c]
              if (!cfg) return null
              return (
                <button key={c} onClick={() => setFilter(c)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 2,
                  background: filter === c ? '#2A1008' : '#EFE3C2',
                  border: `1px solid ${filter === c ? cfg.border : '#D4BC8A'}`,
                  color: filter === c ? cfg.swatch : '#5C3A1E',
                  fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.1em',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <span style={{
                    display: 'inline-block', width: 10, height: 10,
                    borderRadius: '50%', background: cfg.swatch, flexShrink: 0,
                  }}/>
                  {cfg.label.toUpperCase()} ({count})
                </button>
              )
            })}
          </div>
        )}

        {/* Highlights list */}
        {loading ? (
          <div style={{
            textAlign: 'center', padding: '40px 0',
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            fontSize: 16, color: '#8B6040',
          }}>
            ✦ Loading your passages…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            background: '#EFE3C2', border: '1px solid #D4BC8A', borderRadius: 4,
          }}>
            <div style={{
              fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
              fontSize: 17, color: '#8B6040', lineHeight: 1.7,
            }}>
              {filter ? `No passages marked with that colour.` : 'No passages marked yet.'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((h, i) => {
              const cfg = COLORS[h.color] || { label: '—', swatch: '#888', bg: 'transparent', border: '#888' }
              return (
                <div key={i} style={{
                  background: cfg.bg, border: '1px solid #D4BC8A',
                  borderLeft: `4px solid ${cfg.border}`,
                  borderRadius: 3, padding: '14px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Ref */}
                    <Link href={`/read/${h.book}/${h.chapter}`} style={{
                      display: 'block', textDecoration: 'none', marginBottom: 7,
                    }}>
                      <span style={{
                        fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.08em',
                        color: cfg.border, fontWeight: 600,
                      }}>
                        {h.bookName} {h.chapter}:{h.verse}
                      </span>
                      <span style={{
                        marginLeft: 10, fontFamily: 'Cinzel, serif', fontSize: 8.5,
                        letterSpacing: '0.12em', color: '#8B6040',
                      }}>
                        {cfg.label.toUpperCase()}
                      </span>
                    </Link>
                    {/* Text */}
                    <blockquote style={{
                      fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                      fontSize: 16, color: '#2A1405', lineHeight: 1.7, margin: 0, marginBottom: 6,
                    }}>
                      "{h.verseText.slice(0, 160)}{h.verseText.length > 160 ? '…' : ''}"
                    </blockquote>
                    {/* Date */}
                    <div style={{
                      fontFamily: 'EB Garamond, Georgia, serif', fontSize: 12, color: '#9A7320',
                    }}>
                      {new Date(h.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Remove */}
                  <button onClick={() => deleteHighlight(h)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#C4B8A0', padding: '4px', flexShrink: 0,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7A0E1C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#C4B8A0')}
                  >
                    <Trash2 size={15}/>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#2A1008', borderTop: '2px solid #9A7320',
        padding: '20px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#6A4828', letterSpacing: '0.15em' }}>
          ☧ &nbsp; DOUAY-RHEIMS SACRED SCRIPTURE &nbsp; ☧
        </div>
      </footer>
    </div>
  )
}
