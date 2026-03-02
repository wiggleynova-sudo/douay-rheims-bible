'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { STUDY_PATHS } from '@/data/study-paths'
import { getBook, getVerse } from '@/data/bible-data'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

export default function StudyPathPage() {
  const params = useParams()
  const router = useRouter()
  const pathId = params.path as string
  const studyPath = STUDY_PATHS.find(p => p.id === pathId)
  const [current, setCurrent] = useState(0)

  if (!studyPath) return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', color: '#7A0E1C', marginBottom: 16 }}>Study path not found</div>
        <Link href="/study" style={{ fontFamily: 'Cinzel, serif', fontSize: 12, color: '#9A7320' }}>← Back to paths</Link>
      </div>
    </div>
  )

  const total = studyPath.verses.length
  const sv = studyPath.verses[current]
  const book = getBook(sv.book)
  const verse = getVerse(sv.book, sv.chapter, sv.verse)
  const pct = ((current + 1) / total) * 100

  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405' }}>

      {/* Header */}
      <header style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/study" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#9A7320', letterSpacing: '0.1em' }}>
            ← STUDY PATHS
          </span>
        </Link>
        <span style={{ color: '#4A2010', fontSize: 12 }}>✦</span>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#C9A848', letterSpacing: '0.08em' }}>
          {studyPath.icon} {studyPath.title.toUpperCase()}
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Cinzel, serif', fontSize: 10, color: '#6A4828' }}>
          {current + 1} / {total}
        </span>
      </header>

      {/* Progress bar */}
      <div style={{ height: 3, background: '#E6D5A8' }}>
        <div style={{
          height: '100%', background: studyPath.color as string,
          width: `${pct}%`, transition: 'width 0.3s ease',
        }}/>
      </div>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '44px 24px 80px' }}>

        {/* Verse ref */}
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 11,
          color: studyPath.color as string, letterSpacing: '0.22em',
          marginBottom: 18, fontWeight: 600, textAlign: 'center',
        }}>
          ✦ {book?.name.toUpperCase()} {sv.chapter}:{sv.verse} ✦
        </div>

        {/* Verse text */}
        <blockquote style={{
          fontFamily: 'EB Garamond, Georgia, serif', fontSize: 22,
          fontStyle: 'italic', color: '#2A1405', lineHeight: 1.8,
          borderLeft: `4px solid ${studyPath.color}`,
          paddingLeft: 22, marginLeft: 0, marginBottom: 32,
        }}>
          "{verse?.text || 'Verse text not yet included in this edition.'}"
        </blockquote>

        {/* Ornament */}
        <div style={{
          textAlign: 'center', fontFamily: 'EB Garamond, serif', fontSize: 18,
          color: '#9A7320', opacity: 0.5, marginBottom: 24, letterSpacing: '0.2em',
        }}>
          ─── ✦ ───
        </div>

        {/* Study note */}
        <div style={{
          background: '#EFE3C2', border: '1px solid #D4BC8A',
          borderTop: `3px solid ${studyPath.color}`,
          borderRadius: 4, padding: '20px 22px',
          marginBottom: 36,
        }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.2em',
            color: '#9A7320', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <BookOpen size={11}/> STUDY NOTE
          </div>
          <div style={{
            fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
            color: '#2A1405', lineHeight: 1.85,
          }}>
            {sv.note}
          </div>
        </div>

        {/* Dot progress */}
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center', marginBottom: 28 }}>
          {studyPath.verses.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 22 : 9, height: 9, borderRadius: 5,
              background: i === current
                ? studyPath.color as string
                : i < current ? `${studyPath.color}55` : '#D4BC8A',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.25s ease, background 0.25s ease',
            }}/>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px',
            background: '#EFE3C2', border: '1px solid #D4BC8A',
            borderRadius: 3, fontFamily: 'Cinzel, serif', fontSize: 10,
            letterSpacing: '0.1em', cursor: current === 0 ? 'default' : 'pointer',
            color: current === 0 ? '#C4B8A0' : '#5C3A1E',
          }}>
            <ChevronLeft size={13}/> PREV
          </button>

          <Link href={`/read/${sv.book}/${sv.chapter}`} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px',
            background: '#2A1008',
            border: `1px solid ${studyPath.color}`,
            borderRadius: 3, textDecoration: 'none',
            fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.1em',
            color: studyPath.color as string,
          }}>
            READ FULL CHAPTER ✦
          </Link>

          <button onClick={() => setCurrent(c => Math.min(total - 1, c + 1))} disabled={current === total - 1} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 18px',
            background: '#EFE3C2', border: '1px solid #D4BC8A',
            borderRadius: 3, fontFamily: 'Cinzel, serif', fontSize: 10,
            letterSpacing: '0.1em', cursor: current === total - 1 ? 'default' : 'pointer',
            color: current === total - 1 ? '#C4B8A0' : '#5C3A1E',
          }}>
            NEXT <ChevronRight size={13}/>
          </button>
        </div>

        {/* Completion */}
        {current === total - 1 && (
          <div style={{ textAlign: 'center', marginTop: 28, padding: '16px 20px', background: '#EFE3C2', border: '1px solid #D4BC8A', borderRadius: 4 }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 11, color: '#9A7320', letterSpacing: '0.15em', marginBottom: 8 }}>
              ✦ PATH COMPLETE ✦
            </div>
            <div style={{ fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic', fontSize: 16, color: '#5C3A1E', marginBottom: 12 }}>
              You have completed the <em>{studyPath.title}</em> study path.
            </div>
            <Link href="/study" style={{
              fontFamily: 'Cinzel, serif', fontSize: 10, color: '#7A0E1C',
              letterSpacing: '0.12em', textDecoration: 'none',
            }}>
              ← Browse more paths
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
