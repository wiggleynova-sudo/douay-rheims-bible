import Link from 'next/link'
import { BIBLE_BOOKS } from '@/data/bible-data'

export const metadata = { title: 'Douay-Rheims Catholic Bible — With Commentary' }

const OT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'old')
const NT_BOOKS = BIBLE_BOOKS.filter(b => b.testament === 'new')

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405' }}>

      {/* ── Header / Nav ── */}
      <header style={{
        background: '#2A1008',
        borderBottom: '2px solid #9A7320',
        padding: '0 28px',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22, color: '#9A7320', letterSpacing: '0.05em' }}>☧</span>
            <div>
              <div style={{
                fontFamily: 'Cinzel Decorative, Cinzel, serif',
                fontSize: 13, fontWeight: 700,
                color: '#C9A848', letterSpacing: '0.08em',
                lineHeight: 1.2,
              }}>Douay-Rheims</div>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 8.5,
                color: '#9A7320', letterSpacing: '0.18em',
              }}>SACRED SCRIPTURE</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[
              { href: '/study',        label: 'Study Paths', gold: true },
              { href: '/highlights',   label: 'Highlights' },
              { href: '/parallel/john/1', label: 'Parallel' },
              { href: '/read/matthew/5',  label: 'Read' },
              { href: '/admin/commentary', label: 'Admin' },
            ].map((item, i, arr) => (
              <span key={item.href} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span style={{ color: '#4A2010', fontSize: 10 }}>✦</span>}
                <Link href={item.href} style={{
                  fontFamily: 'Cinzel, serif', fontSize: 11,
                  letterSpacing: '0.12em',
                  color: item.gold ? '#C9A848' : '#9A7888',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                  {item.label.toUpperCase()}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(180deg, #2A1008 0%, #3E1A0A 60%, #F7F0DC 100%)',
        padding: '52px 28px 60px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 11,
          color: '#9A7320', letterSpacing: '0.35em', marginBottom: 16,
        }}>
          ✦ &nbsp; SACRA SCRIPTURA &nbsp; ✦
        </div>

        <h1 style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 38, fontWeight: 700,
          color: '#F0DCA0', lineHeight: 1.25,
          marginBottom: 12, letterSpacing: '0.04em',
        }}>
          The Holy Bible
        </h1>

        <div style={{
          fontFamily: 'EB Garamond, Georgia, serif',
          fontSize: 18, fontStyle: 'italic',
          color: '#C9A060', marginBottom: 24,
          letterSpacing: '0.02em',
        }}>
          Douay-Rheims Version · Challoner Revision, 1749
        </div>

        {/* Ornamental rule */}
        <div style={{
          fontFamily: 'EB Garamond, serif', fontSize: 18,
          color: '#9A7320', letterSpacing: '0.2em', marginBottom: 28,
        }}>
          ─────── ✦ ───────
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 10,
          color: '#8A6840', letterSpacing: '0.2em',
          marginBottom: 32,
        }}>
          WITH COMMENTARY OF THE CHURCH FATHERS · CATECHISM REFERENCES · α Ω
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/read/genesis/1" style={{
            fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.12em',
            background: '#9A7320', color: '#F7F0DC',
            padding: '12px 28px', borderRadius: 2,
            border: '1px solid #C9A848', textDecoration: 'none',
          }}>
            BEGIN READING
          </Link>
          <Link href="/study" style={{
            fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.12em',
            background: 'transparent', color: '#C9A848',
            padding: '12px 28px', borderRadius: 2,
            border: '1px solid #9A7320', textDecoration: 'none',
          }}>
            STUDY PATHS
          </Link>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 28px 80px' }}>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { icon: '📖', sym: '☩', title: 'Guided Study Paths', desc: 'Six curated theological themes — Mary, Eucharist, Papacy, Apologetics, Prayer, Salvation History. Verse-by-verse with Church Fathers notes.', href: '/study' },
            { icon: '🔤', sym: 'α Ω', title: 'Parallel Columns', desc: 'Read the Douay-Rheims alongside the Latin Vulgate of St. Jerome — the Bible of the Councils and the Mass.', href: '/parallel/john/1' },
            { icon: '✦', sym: '✦', title: 'Your Highlights', desc: 'Colour-mark verses that speak to you. Review, organise, and return to your saved passages.', href: '/highlights' },
            { icon: '✍', sym: '✍', title: 'Commentary & Notes', desc: 'Church Fathers, Catechism references, and cross-references open beside every verse. Write your own reflections.', href: '/read/john/1' },
          ].map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#EFE3C2', border: '1px solid #D4BC8A',
                borderTop: '3px solid #9A7320',
                borderRadius: 4, padding: '22px 20px 20px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: '#9A7320', opacity: 0.6 }}>{f.sym}</span>
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600,
                  color: '#2A1405', marginBottom: 8, letterSpacing: '0.04em',
                }}>{f.title}</div>
                <div style={{
                  fontFamily: 'EB Garamond, serif', fontSize: 15, color: '#5C3A1E', lineHeight: 1.6,
                }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          textAlign: 'center', marginBottom: 40,
          fontFamily: 'EB Garamond, serif', fontSize: 20, color: '#9A7320',
          letterSpacing: '0.2em', opacity: 0.7,
        }}>
          ─────── ✦ ───────
        </div>

        {/* Old Testament */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.3em',
              color: '#9A7320', marginBottom: 6,
            }}>✦ THE OLD LAW ✦</div>
            <h2 style={{
              fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 600,
              color: '#2A1405', letterSpacing: '0.06em',
            }}>Old Testament</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
            {OT_BOOKS.map(book => (
              <Link key={book.id} href={`/read/${book.id}/1`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#F0E6CC', border: '1px solid #D4BC8A',
                  borderRadius: 3, padding: '10px 12px',
                  transition: 'background 0.15s, border-color 0.15s',
                }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 500,
                    color: '#2A1405', letterSpacing: '0.03em', marginBottom: 2,
                  }}>{book.name}</div>
                  <div style={{
                    fontFamily: 'EB Garamond, serif', fontSize: 12, color: '#9A7320',
                  }}>
                    {book.chapters.length} ch.
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.3em',
              color: '#7A0E1C', marginBottom: 6,
            }}>✦ THE NEW COVENANT ✦</div>
            <h2 style={{
              fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 600,
              color: '#2A1405', letterSpacing: '0.06em',
            }}>New Testament</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
            {NT_BOOKS.map(book => (
              <Link key={book.id} href={`/read/${book.id}/1`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#F0E6CC', border: '1px solid #D4BC8A',
                  borderLeft: '2px solid #7A0E1C',
                  borderRadius: 3, padding: '10px 12px',
                  transition: 'background 0.15s',
                }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 500,
                    color: '#2A1405', letterSpacing: '0.03em', marginBottom: 2,
                  }}>{book.name}</div>
                  <div style={{
                    fontFamily: 'EB Garamond, serif', fontSize: 12, color: '#7A0E1C',
                  }}>
                    {book.chapters.length} ch.
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        background: '#2A1008', borderTop: '2px solid #9A7320',
        padding: '28px 28px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 20, color: '#9A7320', marginBottom: 8,
        }}>α · ✦ · Ω</div>
        <div style={{
          fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
          fontSize: 15, color: '#8A6840', marginBottom: 6,
        }}>
          "Verbum Domini Manet In Aeternum"
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 9, color: '#4A2A10',
          letterSpacing: '0.15em',
        }}>
          THE WORD OF THE LORD ENDURES FOREVER · DOUAY-RHEIMS · PUBLIC DOMAIN
        </div>
      </footer>
    </div>
  )
}
