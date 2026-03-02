'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, BookMarked } from 'lucide-react'

type HighlightItem = {
  book: string
  chapter: number
  verse: number
  color: string
  created_at: string
  bookName: string
  verseText: string
}

const colorLabels: Record<string, { label: string; bg: string; ring: string }> = {
  'yellow': { label: 'Yellow', bg: '#B8860B', ring: 'rgba(184,134,11,0.3)' },
  'green': { label: 'Green', bg: '#32B450', ring: 'rgba(50,180,80,0.3)' },
  'blue': { label: 'Blue', bg: '#4a9eff', ring: 'rgba(74,158,255,0.3)' },
  'pink': { label: 'Pink', bg: '#EC4899', ring: 'rgba(236,72,153,0.3)' },
}

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/highlights-summary')
      .then(r => r.json())
      .then(d => {
        setHighlights(d.highlights || [])
        setLoading(false)
      })
      .catch(e => {
        console.error(e)
        setLoading(false)
      })
  }, [])

  const deleteHighlight = async (h: HighlightItem) => {
    await fetch('/api/highlights-summary', {
      method: 'DELETE',
      body: JSON.stringify({ book: h.book, chapter: h.chapter, verse: h.verse }),
    })
    setHighlights(highlights.filter(x => !(x.book === h.book && x.chapter === h.chapter && x.verse === h.verse)))
  }

  const filtered = filter ? highlights.filter(h => h.color === filter) : highlights
  const colorCounts = highlights.reduce((acc: Record<string, number>, h) => {
    acc[h.color] = (acc[h.color] || 0) + 1
    return acc
  }, {})

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', fontFamily: 'monospace' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #1a1a1a', padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        position: 'sticky', top: 0, background: '#050505', zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: 10, color: '#8B0000', letterSpacing: '0.2em' }}>
          ← D-R BIBLE
        </Link>
        <span style={{ color: '#1e1e1e' }}>·</span>
        <span style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>SAVED HIGHLIGHTS</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#333' }}>
          {highlights.length} total
        </span>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: '#C9A84C', letterSpacing: '0.3em', marginBottom: 12 }}>
            ✦ HIGHLIGHTS
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontSize: 28, color: '#F0E8D8',
            marginBottom: 8, fontWeight: 700,
          }}>Your Saved Highlights</h1>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 12, color: '#555',
            lineHeight: 1.6,
          }}>
            {highlights.length === 0
              ? 'Start highlighting verses as you read. They\'ll appear here.'
              : 'Click a highlight to navigate back to that verse. Delete with the trash icon.'}
          </p>
        </div>

        {/* Filter buttons */}
        {highlights.length > 0 && (
          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28,
            flexWrap: 'wrap',
          }}>
            <button onClick={() => setFilter(null)} style={{
              padding: '8px 14px', borderRadius: 4,
              background: filter === null ? '#C9A84C44' : 'transparent',
              border: `1px solid ${filter === null ? '#C9A84C' : '#2a2a2a'}`,
              color: filter === null ? '#C9A84C' : '#555',
              fontFamily: 'monospace', fontSize: 9, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              All ({highlights.length})
            </button>
            {Object.entries(colorCounts).map(([c, count]) => {
              const cfg = colorLabels[c]
              if (!cfg) return null
              return (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '8px 14px', borderRadius: 4,
                  background: filter === c ? `${cfg.bg}44` : 'transparent',
                  border: `1px solid ${filter === c ? cfg.bg : '#2a2a2a'}`,
                  color: filter === c ? cfg.bg : '#555',
                  fontFamily: 'monospace', fontSize: 9, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  {cfg.label} ({count})
                </button>
              )
            })}
          </div>
        )}

        {/* Highlights list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#333' }}>
            Loading highlights...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '40px 20px', color: '#333',
            fontFamily: 'Georgia, serif', fontSize: 14,
          }}>
            {filter
              ? `No highlights with this color.`
              : 'No highlights yet. Click on a verse to highlight it.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((h, i) => {
              const cfg = colorLabels[h.color] || { label: 'Unknown', bg: '#666', ring: 'rgba(100,100,100,0.3)' }
              return (
                <div key={i} style={{
                  background: cfg.ring,
                  border: `1px solid ${cfg.bg}44`,
                  borderLeft: `3px solid ${cfg.bg}`,
                  borderRadius: 6, padding: '14px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Verse ref */}
                    <Link href={`/read/${h.book}/${h.chapter}`} style={{
                      display: 'block', textDecoration: 'none',
                      fontSize: 10, color: cfg.bg, fontFamily: 'monospace', letterSpacing: '0.08em',
                      marginBottom: 6, fontWeight: 700,
                    }}>
                      {h.bookName} {h.chapter}:{h.verse}
                    </Link>

                    {/* Verse text */}
                    <blockquote style={{
                      fontFamily: 'Georgia, serif', fontSize: 13, color: '#D8CEB8',
                      lineHeight: 1.6, fontStyle: 'italic',
                      margin: 0, marginBottom: 6,
                    }}>
                      "{h.verseText.slice(0, 140)}{h.verseText.length > 140 ? '...' : ''}"
                    </blockquote>

                    {/* Timestamp */}
                    <div style={{
                      fontSize: 9, color: '#444',
                      fontFamily: 'monospace',
                    }}>
                      {new Date(h.created_at).toLocaleDateString()} {new Date(h.created_at).toLocaleTimeString()}
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteHighlight(h)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#444', padding: '4px 8px', flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#8B0000')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
