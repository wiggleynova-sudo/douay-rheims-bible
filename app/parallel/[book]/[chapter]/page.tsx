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
  const vulgate = getVulgateChapter(bookId, chapterN)

  const [highlightVerse, setHighlightVerse] = useState<number | null>(null)

  const nav = (dir: -1 | 1) => {
    const newCh = chapterN + dir
    if (book?.chapters.find(c => c.chapter === newCh)) {
      router.push(`/parallel/${bookId}/${newCh}`)
    } else {
      const allBooks = BIBLE_BOOKS
      const idx = allBooks.findIndex(b => b.id === bookId)
      if (dir === 1 && idx < allBooks.length - 1) {
        router.push(`/parallel/${allBooks[idx + 1].id}/1`)
      } else if (dir === -1 && idx > 0) {
        const prev = allBooks[idx - 1]
        router.push(`/parallel/${prev.id}/${prev.chapters[prev.chapters.length - 1].chapter}`)
      }
    }
  }

  if (!book || !chapter) return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#8B0000', marginBottom: 12 }}>Book not available in this edition.</div>
        <Link href="/" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: 12 }}>← Home</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', fontFamily: 'monospace' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #1a1a1a', padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        position: 'sticky', top: 0, background: '#050505', zIndex: 50,
      }}>
        <Link href={`/read/${bookId}/${chapterN}`} style={{ textDecoration: 'none', fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>
          ← READING VIEW
        </Link>
        <span style={{ color: '#1e1e1e' }}>·</span>
        <span style={{ fontSize: 10, color: '#C9A84C', fontFamily: 'Georgia, serif' }}>
          {book.name} {chapterN}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 9, color: '#333', letterSpacing: '0.1em' }}>
          PARALLEL: DOUAY-RHEIMS | LATIN VULGATE
        </span>
      </header>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #1a1a1a', background: '#070707',
      }}>
        <div style={{
          padding: '10px 20px', borderRight: '1px solid #1a1a1a',
          fontSize: 9, color: '#C9A84C', letterSpacing: '0.15em',
        }}>
          DOUAY-RHEIMS (Challoner, 1749)
        </div>
        <div style={{
          padding: '10px 20px',
          fontSize: 9, color: '#8B0000', letterSpacing: '0.15em',
        }}>
          VULGATA CLEMENTINA (St. Jerome, 4th c.)
        </div>
      </div>

      {/* Chapter header */}
      <div style={{ textAlign: 'center', padding: '24px 20px 16px', borderBottom: '1px solid #0f0f0f' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#F0E8D8' }}>
          {book.name} — Chapter {chapterN}
        </div>
        {vulgate && (
          <div style={{ fontSize: 11, color: '#555', fontFamily: 'Georgia, serif', marginTop: 4, fontStyle: 'italic' }}>
            {BIBLE_BOOKS.find(b => b.id === bookId)?.name}
            {' '}·{' '}
            {getVulgateChapter(bookId, chapterN) ? 'Latin text available' : 'Latin text not yet indexed for this chapter'}
          </div>
        )}
        <div style={{ fontSize: 10, color: '#2a2a2a', marginTop: 8, fontFamily: 'monospace' }}>
          Click a verse to highlight both columns simultaneously
        </div>
      </div>

      {/* Parallel verses */}
      <main style={{ paddingBottom: 80 }}>
        {chapter.verses.map(v => {
          const vv = getVulgateVerse(bookId, chapterN, v.verse)
          const isHl = highlightVerse === v.verse

          return (
            <div
              key={v.verse}
              onClick={() => setHighlightVerse(isHl ? null : v.verse)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: isHl ? 'rgba(201,168,76,0.07)' : 'transparent',
                borderBottom: '1px solid #0f0f0f',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              {/* DR column */}
              <div style={{
                padding: '14px 20px', borderRight: '1px solid #111',
                borderLeft: isHl ? '2px solid #C9A84C' : '2px solid transparent',
              }}>
                <sup style={{ fontSize: 10, color: isHl ? '#C9A84C' : '#5a4520', fontFamily: 'monospace', marginRight: 6 }}>
                  {v.verse}
                </sup>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#D8CEB8', lineHeight: 1.8 }}>
                  {v.text}
                </span>
              </div>

              {/* Vulgate column */}
              <div style={{
                padding: '14px 20px',
                borderLeft: isHl ? '2px solid #8B0000' : '2px solid transparent',
              }}>
                {vv ? (
                  <>
                    <sup style={{ fontSize: 10, color: isHl ? '#8B0000' : '#5a2020', fontFamily: 'monospace', marginRight: 6 }}>
                      {v.verse}
                    </sup>
                    <span style={{
                      fontFamily: 'Georgia, serif', fontSize: 15, color: '#C8B0B0',
                      lineHeight: 1.8, fontStyle: 'italic',
                    }}>
                      {vv.latin}
                    </span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#2a2a2a', fontStyle: 'italic' }}>
                    Latin text not yet indexed for this verse.
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
        background: '#070707', borderTop: '1px solid #1a1a1a',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px',
      }}>
        <button onClick={() => nav(-1)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid #2a2a2a', borderRadius: 4,
          color: '#555', fontFamily: 'monospace', fontSize: 10,
          padding: '8px 14px', cursor: 'pointer',
        }}>
          <ChevronLeft size={12}/> PREV
        </button>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href={`/read/${bookId}/${chapterN}`} style={{
            fontSize: 10, color: '#555', textDecoration: 'none',
            fontFamily: 'monospace', letterSpacing: '0.08em',
          }}>
            READING VIEW
          </Link>
          <span style={{ color: '#1e1e1e' }}>·</span>
          <select
            value={bookId}
            onChange={e => router.push(`/parallel/${e.target.value}/1`)}
            style={{
              background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: 3,
              color: '#555', fontFamily: 'monospace', fontSize: 10, padding: '4px 8px',
            }}
          >
            {BIBLE_BOOKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <button onClick={() => nav(1)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid #2a2a2a', borderRadius: 4,
          color: '#555', fontFamily: 'monospace', fontSize: 10,
          padding: '8px 14px', cursor: 'pointer',
        }}>
          NEXT <ChevronRight size={12}/>
        </button>
      </div>
    </div>
  )
}
