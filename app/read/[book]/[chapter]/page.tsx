'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BIBLE_BOOKS, getBook, getChapter } from '@/data/bible-data'
import CommentaryDrawer from '@/components/CommentaryDrawer'
import BookNavigator from '@/components/BookNavigator'
import { Menu, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react'

const HIGHLIGHT_BG: Record<string, string> = {
  yellow: 'rgba(255,220,0,0.22)',
  blue:   'rgba(74,158,255,0.22)',
  red:    'rgba(220,50,50,0.22)',
  green:  'rgba(50,180,80,0.22)',
}

type VerseHighlight = { verse: number; color: string }

export default function ReadPage() {
  const params = useParams()
  const router = useRouter()
  const bookId   = (params.book as string) || 'genesis'
  const chapterN = parseInt((params.chapter as string) || '1')

  const book    = getBook(bookId)
  const chapter = getChapter(bookId, chapterN)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeVerse, setActiveVerse] = useState<{ verse: number; text: string } | null>(null)
  const [highlights, setHighlights] = useState<VerseHighlight[]>([])
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Session ID
  useEffect(() => {
    if (!localStorage.getItem('bible_session')) {
      localStorage.setItem('bible_session', `session_${Date.now()}`)
    }
  }, [])

  // Load highlights for this chapter
  useEffect(() => {
    const session = localStorage.getItem('bible_session') || 'default'
    fetch(`/api/highlight?session_id=${session}&book=${bookId}&chapter=${chapterN}`)
      .then(r => r.json())
      .then(d => setHighlights((d.highlights || []).map((h: {verse:number;color:string}) => ({ verse: h.verse, color: h.color }))))
      .catch(() => {})
  }, [bookId, chapterN])

  // Stop audio on chapter change
  useEffect(() => {
    audioRef.current?.pause()
    setAudioPlaying(false)
  }, [bookId, chapterN])

  const readChapterAloud = async () => {
    if (audioPlaying) {
      audioRef.current?.pause()
      setAudioPlaying(false)
      return
    }
    if (!chapter) return
    const text = chapter.verses.map(v => v.text).join(' ')
    setAudioPlaying(true)
    const res = await fetch('/api/tts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.slice(0, 800) }),
    })
    if (!res.ok) { setAudioPlaying(false); return }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audioRef.current = audio
    audio.play()
    audio.onended = () => { setAudioPlaying(false); URL.revokeObjectURL(url) }
  }

  const navigateChapter = (dir: -1 | 1) => {
    const newCh = chapterN + dir
    const targetChapter = book?.chapters.find(c => c.chapter === newCh)
    if (!targetChapter) {
      // Navigate to next/prev book
      const allBooks = BIBLE_BOOKS
      const bookIdx = allBooks.findIndex(b => b.id === bookId)
      if (dir === 1 && bookIdx < allBooks.length - 1) {
        router.push(`/read/${allBooks[bookIdx + 1].id}/1`)
      } else if (dir === -1 && bookIdx > 0) {
        const prevBook = allBooks[bookIdx - 1]
        router.push(`/read/${prevBook.id}/${prevBook.chapters[prevBook.chapters.length - 1].chapter}`)
      }
      return
    }
    router.push(`/read/${bookId}/${newCh}`)
  }

  const handleNavigateFromDrawer = (toBook: string, toChapter: number) => {
    setActiveVerse(null)
    router.push(`/read/${toBook}/${toChapter}`)
  }

  const addHighlight = (verse: number, color: string) => {
    setHighlights(prev => {
      const filtered = prev.filter(h => h.verse !== verse)
      return [...filtered, { verse, color }]
    })
  }

  if (!book || !chapter) {
    return (
      <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#8B0000', marginBottom: 12 }}>Book not found</div>
          <Link href="/" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: 12 }}>← Back to home</Link>
        </div>
      </div>
    )
  }

  const prevChapter = book.chapters.find(c => c.chapter === chapterN - 1)
  const nextChapter = book.chapters.find(c => c.chapter === chapterN + 1)

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
        background: '#070707', borderBottom: '1px solid #1a1a1a',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <button onClick={() => setSidebarOpen(o => !o)} style={{
          background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: 4,
        }}><Menu size={18}/></button>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 10, color: '#8B0000', fontFamily: 'monospace', letterSpacing: '0.15em' }}>✟ D-R BIBLE</span>
        </Link>

        <span style={{ color: '#2a2a2a', fontSize: 12 }}>·</span>
        <span style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'Georgia, serif' }}>
          {book.name} {chapterN}
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={readChapterAloud} title={audioPlaying ? 'Stop' : 'Listen to chapter'} style={{
            background: audioPlaying ? 'rgba(139,0,0,0.2)' : 'none',
            border: `1px solid ${audioPlaying ? '#8B0000' : '#2a2a2a'}`,
            color: audioPlaying ? '#FF6666' : '#444',
            borderRadius: 4, padding: '5px 10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace', fontSize: 10,
          }}>
            {audioPlaying ? <VolumeX size={13}/> : <Volume2 size={13}/>}
            {audioPlaying ? 'STOP' : 'LISTEN'}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            zIndex: 150,
          }}/>
        )}

        {/* Sidebar */}
        <div style={{
          position: 'fixed', left: 0, top: 55, bottom: 0, width: 200,
          zIndex: 160,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.2s ease',
        }}>
          <div style={{ position: 'absolute', right: -36, top: 10 }}>
            <button onClick={() => setSidebarOpen(false)} style={{
              background: '#0c0c0c', border: '1px solid #2a2a2a', color: '#555',
              borderRadius: '0 4px 4px 0', padding: '4px 8px', cursor: 'pointer',
            }}><X size={13}/></button>
          </div>
          <BookNavigator currentBook={bookId} currentChapter={chapterN} onClose={() => setSidebarOpen(false)}/>
        </div>

        {/* Reading column */}
        <main style={{
          flex: 1, maxWidth: 680, margin: '0 auto', padding: '32px 20px 120px',
        }}>
          {/* Chapter header */}
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#8B0000', letterSpacing: '0.25em', marginBottom: 8, fontFamily: 'monospace' }}>
              {book.testament === 'old' ? 'OLD TESTAMENT' : 'NEW TESTAMENT'}
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#F0E8D8', marginBottom: 4, fontWeight: 700 }}>
              {book.name}
            </h1>
            <div style={{ fontSize: 18, color: '#C9A84C', fontFamily: 'Georgia, serif' }}>
              Chapter {chapterN}
            </div>
          </div>

          {/* Hint */}
          <div style={{
            fontSize: 10, color: '#2a2a2a', fontFamily: 'monospace',
            textAlign: 'center', marginBottom: 24, letterSpacing: '0.1em',
          }}>
            TAP ANY VERSE FOR COMMENTARY ↓
          </div>

          {/* Verses */}
          <div style={{ lineHeight: 1, marginBottom: 32 }}>
            {chapter.verses.map(v => {
              const hl = highlights.find(h => h.verse === v.verse)
              const isActive = activeVerse?.verse === v.verse

              return (
                <span
                  key={v.verse}
                  onClick={() => setActiveVerse(isActive ? null : { verse: v.verse, text: v.text })}
                  style={{
                    display: 'inline',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(201,168,76,0.18)' : hl ? HIGHLIGHT_BG[hl.color] : 'transparent',
                    borderBottom: isActive ? '1px solid rgba(201,168,76,0.5)' : hl ? `1px solid ${hl.color === 'yellow' ? '#FFD700' : hl.color === 'blue' ? '#4a9eff' : hl.color === 'red' ? '#DC3232' : '#32B450'}22` : 'none',
                    borderRadius: 2, padding: '1px 0',
                    transition: 'background 0.15s',
                  }}
                >
                  <sup style={{
                    fontSize: 10, color: isActive ? '#C9A84C' : '#5a4520',
                    fontFamily: 'monospace', marginRight: 4, marginLeft: 6,
                    verticalAlign: 'super', lineHeight: 0,
                  }}>{v.verse}</sup>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 17, color: '#D8CEB8', lineHeight: 1.85,
                  }}>{v.text} </span>
                </span>
              )
            })}
          </div>

          {/* Chapter nav */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 24, borderTop: '1px solid #1a1a1a',
          }}>
            <button
              onClick={() => navigateChapter(-1)}
              disabled={!prevChapter && BIBLE_BOOKS.findIndex(b => b.id === bookId) === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: '1px solid #2a2a2a', borderRadius: 4,
                color: '#555', fontFamily: 'monospace', fontSize: 10,
                padding: '8px 14px', cursor: 'pointer', letterSpacing: '0.1em',
              }}
            >
              <ChevronLeft size={13}/> PREV
            </button>

            <span style={{ fontSize: 10, color: '#2a2a2a', fontFamily: 'monospace' }}>
              {book.name} {chapterN}
            </span>

            <button
              onClick={() => navigateChapter(1)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: '1px solid #2a2a2a', borderRadius: 4,
                color: '#555', fontFamily: 'monospace', fontSize: 10,
                padding: '8px 14px', cursor: 'pointer', letterSpacing: '0.1em',
              }}
            >
              NEXT <ChevronRight size={13}/>
            </button>
          </div>
        </main>
      </div>

      {/* Commentary drawer */}
      {activeVerse && (
        <CommentaryDrawer
          book={bookId}
          chapter={chapterN}
          verse={activeVerse.verse}
          verseText={activeVerse.text}
          onClose={() => setActiveVerse(null)}
          onNavigate={handleNavigateFromDrawer}
        />
      )}
    </div>
  )
}
