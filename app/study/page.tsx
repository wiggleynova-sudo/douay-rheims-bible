import Link from 'next/link'
import { STUDY_PATHS } from '@/data/study-paths'
import { getBook } from '@/data/bible-data'

export const metadata = { title: 'Thematic Study Paths | Douay-Rheims Catholic Bible' }

export default function StudyPage() {
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
        <span style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>THEMATIC STUDY PATHS</span>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 9, color: '#8B0000', letterSpacing: '0.3em', marginBottom: 12 }}>
            ✟ GUIDED STUDY
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontSize: 32, color: '#F0E8D8',
            marginBottom: 12, fontWeight: 700,
          }}>Thematic Study Paths</h1>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 14, color: '#555',
            maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
          }}>
            Curated collections of Scripture passages organized by theological theme.
            Each path guides you through the Biblical foundations of a central Catholic truth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16 }}>
          {STUDY_PATHS.map(path => (
            <div key={path.id} style={{
              background: '#0a0a0a', border: '1px solid #161616',
              borderLeft: `3px solid ${path.color}`, borderRadius: 6,
              padding: '20px 20px 16px',
            }}>
              {/* Path header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{path.icon}</span>
                <div>
                  <h2 style={{
                    fontFamily: 'Georgia, serif', fontSize: 17, color: '#F0E8D8',
                    marginBottom: 6, fontWeight: 700,
                  }}>{path.title}</h2>
                  <p style={{
                    fontFamily: 'Georgia, serif', fontSize: 12, color: '#555',
                    lineHeight: 1.6,
                  }}>{path.description}</p>
                </div>
              </div>

              {/* Verse list */}
              <div style={{ borderTop: '1px solid #161616', paddingTop: 12, marginBottom: 14 }}>
                {path.verses.map((v, i) => {
                  const book = getBook(v.book)
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '8px 0', borderBottom: '1px solid #0f0f0f',
                    }}>
                      <Link href={`/read/${v.book}/${v.chapter}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <span style={{
                          display: 'inline-block', minWidth: 100,
                          fontSize: 10, color: path.color,
                          fontFamily: 'monospace', letterSpacing: '0.05em',
                        }}>
                          {book?.abbreviation || v.book} {v.chapter}:{v.verse}
                        </span>
                      </Link>
                      <span style={{
                        fontSize: 11, color: '#444', fontFamily: 'Georgia, serif',
                        lineHeight: 1.5, fontStyle: 'italic',
                      }}>
                        {v.note.slice(0, 90)}{v.note.length > 90 ? '…' : ''}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Begin path button */}
              <Link href={`/study/${path.id}`} style={{
                display: 'inline-block', padding: '8px 18px',
                background: `${path.color}18`,
                border: `1px solid ${path.color}44`, borderRadius: 4,
                color: path.color, textDecoration: 'none',
                fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em',
              }}>
                BEGIN PATH →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
