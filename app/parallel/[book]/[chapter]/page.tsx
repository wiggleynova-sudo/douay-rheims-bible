'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BIBLE_BOOKS, getBook, getChapter } from '@/data/bible-data'
import { getVulgateChapter, getVulgateVerse } from '@/data/vulgate-data'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ParallelPage() {
  const params = useParams()
  const router = useRouter()
  const bookId   = params.book as string
  const chapterN = parseInt(params.chapter as string || '1')

  const book    = getBook(bookId)
  const chapter = getChapter(bookId, chapterN)
  const [highlightVerse, setHighlightVerse] = useState<number | null>(null)

  const nav = (dir: -1 | 1) => {
    const newCh = chapterN + dir
    if (book?.chapters.find(c => c.chapter === newCh)) {
      router.push(`/parallel/${bookId}/${newCh}`)
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.id === bookId)
      if (dir === 1 && idx < BIBLE_BOOKS.length - 1) router.push(`/parallel/${BIBLE_BOOKS[idx + 1].id}/1`)
      else if (dir === -1 && idx > 0) {
        const prev = BIBLE_BOOKS[idx - 1]
        router.push(`/parallel/${prev.id}/${prev.chapters[prev.chapters.length - 1].chapter}`)
      }
    }
  }

  if (!book || !chapter) return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', color: '#7A0E1C', marginBottom: 16 }}>This book is not yet in this edition.</div>
        <Link href="/" style={{ fontFamily: 'Cinzel, serif', fontSize: 12, color: '#9A7320' }}>← Home</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405' }}>

      {/* Header */}
      <header style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href={`/read/${bookId}/${chapterN}`} style={{
          textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 10,
          color: '#9A7320', letterSpacing: '0.1em',
        }}>← READING VIEW</Link>
        <span style={{ color: '#4A2010', fontSize: 12 }}>✦</span>
        <span style={{
          fontFamily: 'Cinzel, serif', fontSize: 13, color: '#C9A848', letterSpacing: '0.04em',
        }}>
          {book.name} · {chapterN}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Cinzel, serif', fontSize: 8.5, color: '#6A4828', letterSpacing: '0.1em' }}>
          PARALLEL EDITION
        </span>
      </header>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: '#3A1E08', borderBottom: '2px solid #9A7320',
      }}>
        <div style={{
          padding: '10px 20px', borderRight: '1px solid #5A3018',
          fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.18em', color: '#C9A848',
        }}>
          ✦ DOUAY-RHEIMS (Challoner, 1749)
        </div>
        <div style={{
          padding: '10px 20px',
          fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.18em', color: '#E88080',
        }}>
          ✦ VULGATA CLEMENTINA (St. Jerome, 4th c.)
        </div>
      </div>

      {/* Chapter title */}
      <div style={{
        textAlign: 'center', padding: '22px 20px 14px',
        borderBottom: '1px solid #D4BC8A', background: '#F0E6CC',
      }}>
        <div style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 22, fontWeight: 700, color: '#7A0E1C', letterSpacing: '0.04em', marginBottom: 4,
        }}>
          {book.name}
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 13, color: '#9A7320', letterSpacing: '0.1em',
        }}>
          Chapter {chapterN}
        </div>
        <div style={{
          fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
          fontSize: 13, color: '#8B6040', marginTop: 8,
        }}>
          Click a verse to illuminate both columns simultaneously
        </div>
      </div>

      {/* Verses */}
      <main style={{ paddingBottom: 80 }}>
        {chapter.verses.map((v, idx) => {
          const vv = getVulgateVerse(bookId, chapterN, v.verse)
          const isHl = highlightVerse === v.verse
          const rowBg = isHl ? 'rgba(184,134,11,0.12)' : idx % 2 === 0 ? '#F7F0DC' : '#F2E8CE'

          return (
            <div
              key={v.verse}
              onClick={() => setHighlightVerse(isHl ? null : v.verse)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: rowBg, borderBottom: '1px solid #E6D5A8',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              {/* D-R column */}
              <div style={{
                padding: '14px 20px', borderRight: '1px solid #E6D5A8',
                borderLeft: isHl ? '3px solid #B8860B' : '3px solid transparent',
              }}>
                <sup style={{
                  fontFamily: 'Cinzel, serif', fontSize: 10,
                  color: isHl ? '#B8860B' : '#9A7320', marginRight: 6,
                  verticalAlign: 'super', letterSpacing: '0.04em',
                }}>{v.verse}</sup>
                <span style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
                  color: '#2A1405', lineHeight: 1.85,
                }}>{v.text}</span>
              </div>

              {/* Vulgate column */}
              <div style={{
                padding: '14px 20px',
                borderLeft: isHl ? '3px solid #7A0E1C' : '3px solid transparent',
              }}>
                {vv ? (
                  <>
                    <sup style={{
                      fontFamily: 'Cinzel, serif', fontSize: 10,
                      color: isHl ? '#7A0E1C' : '#8B4030', marginRight: 6,
                      verticalAlign: 'super',
                    }}>{v.verse}</sup>
                    <span style={{
                      fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                      fontSize: 16, color: '#3A1E0A', lineHeight: 1.85,
                    }}>{vv.latin}</span>
                  </>
                ) : (
                  <span style={{
                    fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                    fontSize: 14, color: '#B4A080',
                  }}>
                    Latin not yet indexed.
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </main>

      {/* Nav footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#2A1008', borderTop: '2px solid #9A7320',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px',
      }}>
        <button onClick={() => nav(-1)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.05)', border: '1px solid #4A2010',
          borderRadius: 3, color: '#9A7320', fontFamily: 'Cinzel, serif', fontSize: 10,
          letterSpacing: '0.1em', padding: '8px 14px', cursor: 'pointer',
        }}>
          <ChevronLeft size={12}/> PREV
        </button>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Link href={`/read/${bookId}/${chapterN}`} style={{
            fontFamily: 'Cinzel, serif', fontSize: 10, color: '#6A4828',
            textDecoration: 'none', letterSpacing: '0.08em',
          }}>READING VIEW</Link>
          <span style={{ color: '#3A1808' }}>✦</span>
          <select
            value={bookId}
            onChange={e => router.push(`/parallel/${e.target.value}/1`)}
            style={{
              background: '#3A1808', border: '1px solid #5A3020',
              borderRadius: 2, color: '#9A7320',
              fontFamily: 'Cinzel, serif', fontSize: 10, padding: '4px 8px',
            }}
          >
            {BIBLE_BOOKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <button onClick={() => nav(1)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.05)', border: '1px solid #4A2010',
          borderRadius: 3, color: '#9A7320', fontFamily: 'Cinzel, serif', fontSize: 10,
          letterSpacing: '0.1em', padding: '8px 14px', cursor: 'pointer',
        }}>
          NEXT <ChevronRight size={12}/>
        </button>
      </div>
    </div>
  )
}
