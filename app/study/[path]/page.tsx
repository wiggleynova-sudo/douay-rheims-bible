'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { STUDY_PATHS } from '@/data/study-paths'
import { getBook, getVerse } from '@/data/bible-data'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

export default function StudyPathPage() {
  const params = useParams()
  const pathId = params.path as string
  const studyPath = STUDY_PATHS.find(p => p.id === pathId)
  const [current, setCurrent] = useState(0)

  if (!studyPath) return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', fontFamily: 'monospace' }}>
        <div style={{ color: '#8B0000', marginBottom: 12 }}>Study path not found</div>
        <Link href="/study" style={{ color: '#C9A84C', textDecoration: 'none' }}>← Back to paths</Link>
      </div>
    </div>
  )

  const total = studyPath.verses.length
  const sv = studyPath.verses[current]
  const book = getBook(sv.book)
  const verse = getVerse(sv.book, sv.chapter, sv.verse)

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', fontFamily: 'monospace' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #1a1a1a', padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, background: '#050505', zIndex: 50,
      }}>
        <Link href="/study" style={{ textDecoration: 'none', fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>
          ← STUDY PATHS
        </Link>
        <span style={{ color: '#1e1e1e' }}>·</span>
        <span style={{ fontSize: 10, color: studyPath.color, letterSpacing: '0.1em' }}>
          {studyPath.icon} {studyPath.title.toUpperCase()}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#333' }}>
          {current + 1} / {total}
        </span>
      </header>

      {/* Progress bar */}
      <div style={{ height: 2, background: '#0f0f0f' }}>
        <div style={{
          height: '100%', background: studyPath.color,
          width: `${((current + 1) / total) * 100}%`,
          transition: 'width 0.3s ease',
        }}/>
      </div>

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Verse ref */}
        <div style={{
          fontSize: 10, color: studyPath.color, letterSpacing: '0.25em',
          marginBottom: 16, fontWeight: 700,
        }}>
          {book?.name.toUpperCase()} {sv.chapter}:{sv.verse}
        </div>

        {/* Verse text */}
        <blockquote style={{
          fontFamily: 'Georgia, serif', fontSize: 22, color: '#F0E8D8',
          lineHeight: 1.7, fontStyle: 'italic',
          borderLeft: `3px solid ${studyPath.color}`,
          paddingLeft: 20, marginLeft: 0, marginBottom: 28,
        }}>
          "{verse?.text || 'Verse text not yet included in this edition.'}"
        </blockquote>

        {/* Study note */}
        <div style={{
          background: '#0a0a0a', border: '1px solid #161616',
          borderRadius: 6, padding: '20px 22px', marginBottom: 32,
        }}>
          <div style={{
            fontSize: 9, color: '#555', letterSpacing: '0.2em',
            marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <BookOpen size={11}/> STUDY NOTE
          </div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 14, color: '#C8C0B0',
            lineHeight: 1.75,
          }}>
            {sv.note}
          </div>
        </div>

        {/* Dot index */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
          {studyPath.verses.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 20 : 8, height: 8, borderRadius: 4,
              background: i === current ? studyPath.color : '#1e1e1e',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.2s ease, background 0.2s ease',
            }}/>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', background: 'none',
            border: '1px solid #2a2a2a', borderRadius: 4,
            color: current === 0 ? '#2a2a2a' : '#555',
            fontFamily: 'monospace', fontSize: 10, cursor: current === 0 ? 'default' : 'pointer',
          }}>
            <ChevronLeft size={13}/> PREV
          </button>

          <Link href={`/read/${sv.book}/${sv.chapter}`} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px',
            background: `${studyPath.color}18`,
            border: `1px solid ${studyPath.color}44`, borderRadius: 4,
            color: studyPath.color, textDecoration: 'none',
            fontFamily: 'monospace', fontSize: 10,
          }}>
            READ FULL CHAPTER →
          </Link>

          <button onClick={() => setCurrent(c => Math.min(total - 1, c + 1))} disabled={current === total - 1} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', background: 'none',
            border: '1px solid #2a2a2a', borderRadius: 4,
            color: current === total - 1 ? '#2a2a2a' : '#555',
            fontFamily: 'monospace', fontSize: 10, cursor: current === total - 1 ? 'default' : 'pointer',
          }}>
            NEXT <ChevronRight size={13}/>
          </button>
        </div>

        {current === total - 1 && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/study" style={{
              fontSize: 10, color: '#555', textDecoration: 'none',
              fontFamily: 'monospace', letterSpacing: '0.1em',
            }}>
              ✓ PATH COMPLETE — Browse more paths →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
