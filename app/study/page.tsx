import Link from 'next/link'
import { STUDY_PATHS } from '@/data/study-paths'
import { getBook } from '@/data/bible-data'

export const metadata = { title: 'Thematic Study Paths | Douay-Rheims Catholic Bible' }

export default function StudyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405' }}>

      {/* Header */}
      <header style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16, color: '#9A7320' }}>☧</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#9A7320', letterSpacing: '0.15em' }}>
            D-R BIBLE
          </span>
        </Link>
        <span style={{ color: '#4A2010', fontSize: 12 }}>✦</span>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#C9A848', letterSpacing: '0.1em' }}>
          THEMATIC STUDY PATHS
        </span>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.35em',
            color: '#9A7320', marginBottom: 14,
          }}>✦ &nbsp; GUIDED STUDY &nbsp; ✦</div>
          <h1 style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 30, fontWeight: 700, color: '#2A1405',
            letterSpacing: '0.04em', marginBottom: 16,
          }}>Thematic Study Paths</h1>
          <div style={{
            fontFamily: 'EB Garamond, Georgia, serif',
            fontStyle: 'italic', fontSize: 18, color: '#5C3A1E',
            maxWidth: 560, margin: '0 auto', lineHeight: 1.7,
          }}>
            Six curated collections of Scripture passages — each illuminating
            a central doctrine of the Catholic Faith through the sacred text itself.
          </div>
          <div style={{
            fontFamily: 'EB Garamond, serif', fontSize: 18,
            color: '#9A7320', letterSpacing: '0.2em', marginTop: 22, opacity: 0.6,
          }}>─── ✦ ───</div>
        </div>

        {/* Path cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
          {STUDY_PATHS.map(path => (
            <div key={path.id} style={{
              background: '#EFE3C2', border: '1px solid #D4BC8A',
              borderLeft: `4px solid ${path.color}`,
              borderRadius: 4,
            }}>
              {/* Card header */}
              <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #D4BC8A' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{path.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 600,
                      color: '#2A1405', letterSpacing: '0.04em', marginBottom: 6,
                    }}>{path.title}</h2>
                    <p style={{
                      fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                      fontSize: 15, color: '#5C3A1E', lineHeight: 1.6,
                    }}>{path.description.slice(0, 120)}…</p>
                  </div>
                </div>
              </div>

              {/* Verse list */}
              <div style={{ padding: '10px 16px' }}>
                {path.verses.slice(0, 5).map((v, i) => {
                  const b = getBook(v.book)
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'baseline', gap: 10,
                      padding: '6px 0',
                      borderBottom: i < Math.min(path.verses.length, 5) - 1 ? '1px solid #E6D5A8' : 'none',
                    }}>
                      <Link href={`/read/${v.book}/${v.chapter}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <span style={{
                          fontFamily: 'Cinzel, serif', fontSize: 10,
                          color: path.color as string, letterSpacing: '0.05em',
                          minWidth: 100, display: 'inline-block',
                        }}>
                          {b?.abbreviation || v.book} {v.chapter}:{v.verse}
                        </span>
                      </Link>
                      <span style={{
                        fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                        fontSize: 13, color: '#6B4423', lineHeight: 1.4,
                      }}>
                        {v.note.slice(0, 75)}{v.note.length > 75 ? '…' : ''}
                      </span>
                    </div>
                  )
                })}
                {path.verses.length > 5 && (
                  <div style={{
                    fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                    fontSize: 13, color: '#8B6040', paddingTop: 6, paddingLeft: 2,
                  }}>
                    + {path.verses.length - 5} more passages…
                  </div>
                )}
              </div>

              {/* CTA */}
              <div style={{ padding: '12px 16px 16px' }}>
                <Link href={`/study/${path.id}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 20px',
                  background: '#2A1008',
                  border: `1px solid ${path.color as string}`,
                  borderRadius: 3, textDecoration: 'none',
                  fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.12em',
                  color: path.color as string,
                  transition: 'background 0.2s',
                }}>
                  BEGIN PATH ✦
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#2A1008', borderTop: '2px solid #9A7320',
        padding: '20px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 18, color: '#9A7320', marginBottom: 6 }}>α · ✦ · Ω</div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 14, color: '#6A4828' }}>
          "Thy word is a lamp to my feet, and a light to my paths." — Psalm 118:105
        </div>
      </footer>
    </div>
  )
}
