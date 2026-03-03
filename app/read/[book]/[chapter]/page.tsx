'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BIBLE_BOOKS, getBook, getChapter } from '@/data/bible-data'
import CommentaryDrawer from '@/components/CommentaryDrawer'
import BookNavigator from '@/components/BookNavigator'
import { useAuth } from '@/components/AuthProvider'
import { Menu, Volume2, VolumeX, ChevronLeft, ChevronRight, X, Type, LogIn, LogOut, User } from 'lucide-react'

const FONT_SIZES = [
  { key: 'sm', label: 'A',  size: 14 },
  { key: 'md', label: 'A',  size: 17 },
  { key: 'lg', label: 'A',  size: 21 },
  { key: 'xl', label: 'A',  size: 25 },
]

const HIGHLIGHT_BG: Record<string, string> = {
  yellow: 'rgba(184,134,11,0.22)',
  blue:   'rgba(26,42,94,0.15)',
  red:    'rgba(122,14,28,0.15)',
  green:  'rgba(42,74,26,0.15)',
}
const HIGHLIGHT_BORDER: Record<string, string> = {
  yellow: '#B8860B',
  blue:   '#1A2A5E',
  red:    '#7A0E1C',
  green:  '#2A4A1A',
}

type VerseHighlight = { verse: number; color: string }

export default function ReadPage() {
  const params = useParams()
  const router = useRouter()
  const bookId   = (params.book as string) || 'genesis'
  const chapterN = parseInt((params.chapter as string) || '1')

  const book    = getBook(bookId)
  const chapter = getChapter(bookId, chapterN)

  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeVerse, setActiveVerse] = useState<{ verse: number; text: string } | null>(null)
  const [highlights, setHighlights] = useState<VerseHighlight[]>([])
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [fontMenuOpen, setFontMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState('md')
  const [dbVerses, setDbVerses] = useState<{ verse: number; text: string }[]>([])
  const [loadingVerses, setLoadingVerses] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('bible_session')) {
      localStorage.setItem('bible_session', `session_${Date.now()}`)
    }
    // Apply saved font size
    const saved = (localStorage.getItem('fontSize') || 'md') as string
    setFontSize(saved)
    document.documentElement.setAttribute('data-fsize', saved)
  }, [])

  const changeFontSize = (key: string) => {
    setFontSize(key)
    setFontMenuOpen(false)
    document.documentElement.setAttribute('data-fsize', key)
    localStorage.setItem('fontSize', key)
    if (user) {
      fetch('/api/auth/prefs', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fontSize: key }),
      })
    }
  }

  useEffect(() => {
    const session = localStorage.getItem('bible_session') || 'default'
    fetch(`/api/highlight?session_id=${session}&book=${bookId}&chapter=${chapterN}`)
      .then(r => r.json())
      .then(d => setHighlights((d.highlights || []).map((h: {verse:number;color:string}) => ({ verse: h.verse, color: h.color }))))
      .catch(() => {})
  }, [bookId, chapterN])

  useEffect(() => {
    audioRef.current?.pause()
    setAudioPlaying(false)
    setDbVerses([])
  }, [bookId, chapterN])

  // Fetch verses from DB if this chapter has no inline text
  useEffect(() => {
    if (!chapter || chapter.verses.length > 0) return
    setLoadingVerses(true)
    fetch(`/api/verses?book=${bookId}&chapter=${chapterN}`)
      .then(r => r.json())
      .then(d => {
        if (d.verses && d.verses.length > 0) setDbVerses(d.verses)
      })
      .catch(() => {})
      .finally(() => setLoadingVerses(false))
  }, [bookId, chapterN, chapter])

  const readChapterAloud = async () => {
    if (audioPlaying) { audioRef.current?.pause(); setAudioPlaying(false); return }
    if (!chapter) return
    const text = displayVerses.map(v => v.text).join(' ')
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
    if (book?.chapters.find(c => c.chapter === newCh)) {
      router.push(`/read/${bookId}/${newCh}`)
      return
    }
    const idx = BIBLE_BOOKS.findIndex(b => b.id === bookId)
    if (dir === 1 && idx < BIBLE_BOOKS.length - 1) router.push(`/read/${BIBLE_BOOKS[idx + 1].id}/1`)
    else if (dir === -1 && idx > 0) {
      const prev = BIBLE_BOOKS[idx - 1]
      router.push(`/read/${prev.id}/${prev.chapters[prev.chapters.length - 1].chapter}`)
    }
  }

  const handleNavigateFromDrawer = (toBook: string, toChapter: number) => {
    setActiveVerse(null)
    router.push(`/read/${toBook}/${toChapter}`)
  }

  const addHighlight = (verse: number, color: string) => {
    setHighlights(prev => [...prev.filter(h => h.verse !== verse), { verse, color }])
  }

  if (!book || !chapter) return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', color: '#7A0E1C', marginBottom: 16 }}>This book is not yet in this edition.</div>
        <Link href="/" style={{ fontFamily: 'Cinzel, serif', fontSize: 12, color: '#9A7320' }}>← Return to Library</Link>
      </div>
    </div>
  )

  const prevChapter = book.chapters.find(c => c.chapter === chapterN - 1)
  const bookIdx = BIBLE_BOOKS.findIndex(b => b.id === bookId)
  const displayVerses = dbVerses.length > 0 ? dbVerses : chapter.verses

  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC', color: '#2A1405', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        position: 'sticky', top: 0, zIndex: 100, flexWrap: 'nowrap',
      }}>
        {/* Hamburger */}
        <button onClick={() => setSidebarOpen(o => !o)} style={{
          background: 'none', border: '1px solid #4A2010', borderRadius: 3,
          color: '#9A7320', cursor: 'pointer', padding: '6px 8px', flexShrink: 0,
        }}><Menu size={17}/></button>

        {/* Logo + book */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <span style={{ fontSize: 18, color: '#9A7320' }}>☧</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: '#9A7320', letterSpacing: '0.12em' }}>
            D-R BIBLE
          </span>
        </Link>

        <span style={{ color: '#4A2010', fontSize: 14, flexShrink: 0 }}>✦</span>
        <span style={{
          fontFamily: 'Cinzel, serif', fontSize: 14, color: '#C9A848',
          letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {book.name} {chapterN}
        </span>

        {/* Right controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>

          {/* Font size toggle */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setFontMenuOpen(o => !o)} title="Font size" style={{
              background: fontMenuOpen ? 'rgba(154,115,32,0.25)' : 'transparent',
              border: '1px solid #4A2010', borderRadius: 3,
              color: '#9A7320', cursor: 'pointer', padding: '6px 9px',
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.05em',
            }}>
              <Type size={13}/> Aa
            </button>
            {fontMenuOpen && (
              <div style={{
                position: 'absolute', right: 0, top: '100%', marginTop: 4,
                background: '#F7F0DC', border: '1px solid #D4BC8A',
                borderRadius: 3, zIndex: 200, overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(42,16,8,0.2)',
              }}>
                {FONT_SIZES.map(f => (
                  <button key={f.key} onClick={() => changeFontSize(f.key)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 18px', width: '100%',
                    background: fontSize === f.key ? '#EFE3C2' : 'transparent',
                    border: 'none', borderBottom: '1px solid #E6D5A8',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>
                    <span style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: f.size, color: '#2A1405', lineHeight: 1 }}>A</span>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.12em', color: fontSize === f.key ? '#7A0E1C' : '#9A7320' }}>
                      {f.key === 'sm' ? 'SMALL' : f.key === 'md' ? 'MEDIUM' : f.key === 'lg' ? 'LARGE' : 'X-LARGE'}
                    </span>
                    {fontSize === f.key && <span style={{ color: '#7A0E1C', fontSize: 12, marginLeft: 'auto' }}>✦</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Parallel */}
          <Link href={`/parallel/${bookId}/${chapterN}`} style={{
            fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.08em',
            color: '#9A7320', textDecoration: 'none',
            border: '1px solid #4A2010', borderRadius: 3, padding: '6px 10px',
          }}>Parallel</Link>

          {/* Listen */}
          <button onClick={readChapterAloud} style={{
            background: audioPlaying ? 'rgba(122,14,28,0.3)' : 'transparent',
            border: `1px solid ${audioPlaying ? '#7A0E1C' : '#4A2010'}`,
            borderRadius: 3, color: audioPlaying ? '#E88080' : '#9A7320',
            cursor: 'pointer', padding: '6px 10px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {audioPlaying ? <VolumeX size={14}/> : <Volume2 size={14}/>}
          </button>

          {/* User / Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                fontSize: 13, color: '#C9A848',
              }}>{user.displayName?.split(' ')[0] || user.email.split('@')[0]}</span>
              <button onClick={logout} title="Sign out" style={{
                background: 'none', border: '1px solid #4A2010', borderRadius: 3,
                color: '#6A4828', cursor: 'pointer', padding: '5px 7px',
              }}><LogOut size={13}/></button>
            </div>
          ) : (
            <Link href="/login" title="Sign in" style={{
              border: '1px solid #9A7320', borderRadius: 3,
              color: '#C9A848', padding: '6px 10px', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 5,
              fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.08em',
            }}>
              <LogIn size={13}/> Sign In
            </Link>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(42,16,8,0.6)', zIndex: 150,
          }}/>
        )}

        {/* Sidebar */}
        <div style={{
          position: 'fixed', left: 0, top: 55, bottom: 0, width: 210,
          zIndex: 160,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.22s ease',
        }}>
          <button onClick={() => setSidebarOpen(false)} style={{
            position: 'absolute', right: -34, top: 12,
            background: '#2A1008', border: '1px solid #9A7320',
            color: '#9A7320', borderRadius: '0 3px 3px 0',
            padding: '4px 8px', cursor: 'pointer',
          }}><X size={12}/></button>
          <BookNavigator currentBook={bookId} currentChapter={chapterN} onClose={() => setSidebarOpen(false)}/>
        </div>

        {/* ── Reading Column ── */}
        <main style={{ flex: 1, maxWidth: 680, margin: '0 auto', padding: '40px 24px 120px' }}>

          {/* Chapter header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em',
              color: '#9A7320', marginBottom: 10,
            }}>
              {book.testament === 'old' ? '✦ OLD TESTAMENT ✦' : '✦ NEW TESTAMENT ✦'}
            </div>
            <h1 style={{
              fontFamily: 'Cinzel Decorative, Cinzel, serif',
              fontSize: 28, fontWeight: 700, color: '#7A0E1C',
              letterSpacing: '0.04em', marginBottom: 6,
            }}>{book.name}</h1>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 16, color: '#9A7320',
              letterSpacing: '0.1em',
            }}>Chapter {chapterN}</div>
            <div style={{
              fontFamily: 'EB Garamond, Georgia, serif', fontSize: 18,
              color: '#9A7320', letterSpacing: '0.2em', marginTop: 14, opacity: 0.6,
            }}>─── ✦ ───</div>
          </div>

          {/* Hint */}
          <div style={{
            textAlign: 'center', marginBottom: 28,
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            fontSize: 14, color: '#8B6040', letterSpacing: '0.02em',
          }}>
            ✝ Tap any verse for commentary, Church Fathers, and study tools
          </div>

          {/* ── Verse text ── */}
          {chapter.verses.length === 0 && loadingVerses && (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              background: '#EFE3C2', border: '1px solid #D4BC8A',
              borderTop: '3px solid #9A7320', borderRadius: 4,
              marginBottom: 40,
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 14, color: '#9A7320',
                letterSpacing: '0.2em', marginBottom: 16,
              }}>✦</div>
              <div style={{
                fontFamily: 'EB Garamond, Georgia, serif',
                fontSize: 18, fontStyle: 'italic', color: '#6A4828',
                lineHeight: 1.7, marginBottom: 8,
              }}>
                Loading verses…
              </div>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 10,
                color: '#9A7320', letterSpacing: '0.15em',
              }}>
                DOUAY-RHEIMS CHALLONER REVISION, 1749
              </div>
            </div>
          )}
          {chapter.verses.length === 0 && !loadingVerses && dbVerses.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              background: '#EFE3C2', border: '1px solid #D4BC8A',
              borderTop: '3px solid #9A7320', borderRadius: 4,
              marginBottom: 40,
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 14, color: '#9A7320',
                letterSpacing: '0.2em', marginBottom: 16,
              }}>✦ ✦ ✦</div>
              <div style={{
                fontFamily: 'EB Garamond, Georgia, serif',
                fontSize: 20, fontStyle: 'italic', color: '#2A1405',
                lineHeight: 1.7, marginBottom: 16,
              }}>
                Full verse-by-verse text for this chapter is being typeset and will appear soon.
              </div>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 10,
                color: '#9A7320', letterSpacing: '0.15em',
              }}>
                DOUAY-RHEIMS CHALLONER REVISION, 1749
              </div>
            </div>
          )}
          <div style={{ lineHeight: 1, marginBottom: 40 }}>
            {displayVerses.map((v, idx) => {
              const hl = highlights.find(h => h.verse === v.verse)
              const isActive = activeVerse?.verse === v.verse
              const isDropCap = chapterN === 1 && idx === 0

              return (
                <span
                  key={v.verse}
                  onClick={() => setActiveVerse(isActive ? null : { verse: v.verse, text: v.text })}
                  style={{
                    display: 'inline',
                    cursor: 'pointer',
                    background: isActive
                      ? 'rgba(122,14,28,0.1)'
                      : hl ? HIGHLIGHT_BG[hl.color] : 'transparent',
                    borderBottom: isActive
                      ? '1px solid rgba(122,14,28,0.4)'
                      : hl ? `1px solid ${HIGHLIGHT_BORDER[hl.color]}44` : 'none',
                    borderRadius: 2,
                    transition: 'background 0.15s',
                  }}
                >
                  <sup style={{
                    fontSize: 10,
                    fontFamily: 'Cinzel, serif',
                    color: isActive ? '#7A0E1C' : hl ? HIGHLIGHT_BORDER[hl.color] : '#B8952A',
                    marginRight: 3, marginLeft: 8,
                    verticalAlign: 'super', lineHeight: 0,
                    letterSpacing: '0.02em',
                    position: 'relative',
                  }}>
                    {v.verse}
                    {hl && (
                      <span style={{
                        display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
                        background: HIGHLIGHT_BORDER[hl.color],
                        marginLeft: 2, verticalAlign: 'super', position: 'relative', bottom: 1,
                      }}/>
                    )}
                  </sup>
                  <span
                    className={isDropCap ? 'drop-cap' : ''}
                    style={{
                      fontFamily: 'EB Garamond, Georgia, serif',
                      fontSize: 'var(--verse-size)',
                      color: isActive ? '#2A1405' : '#3A1E0A',
                      lineHeight: 'var(--verse-lh)',
                    }}
                  >
                    {v.text}{' '}
                  </span>
                </span>
              )
            })}
          </div>

          {/* Chapter navigation */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 24, borderTop: '1px solid #D4BC8A',
          }}>
            <button onClick={() => navigateChapter(-1)}
              disabled={!prevChapter && bookIdx === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#EFE3C2', border: '1px solid #D4BC8A', borderRadius: 3,
                color: '#5C3A1E', fontFamily: 'Cinzel, serif', fontSize: 10,
                letterSpacing: '0.1em', padding: '9px 16px', cursor: 'pointer',
                opacity: (!prevChapter && bookIdx === 0) ? 0.4 : 1,
              }}>
              <ChevronLeft size={12}/> PREV
            </button>

            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: 11, color: '#9A7320',
              letterSpacing: '0.08em',
            }}>
              {book.abbreviation} {chapterN}
            </span>

            <button onClick={() => navigateChapter(1)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#EFE3C2', border: '1px solid #D4BC8A', borderRadius: 3,
              color: '#5C3A1E', fontFamily: 'Cinzel, serif', fontSize: 10,
              letterSpacing: '0.1em', padding: '9px 16px', cursor: 'pointer',
            }}>
              NEXT <ChevronRight size={12}/>
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
