'use client'
import { useState, useEffect } from 'react'
import { X, BookOpen, Link2, MessageSquare, Volume2 } from 'lucide-react'

type CommentaryTab = 'commentary' | 'ccc' | 'crossrefs' | 'notes'

interface Commentary { id: number; text: string; author: string; source: string; type: string }
interface CCCRef { ccc_paragraph: string; ccc_summary: string }
interface CrossRef { to_book: string; to_chapter: number; to_verse: number; relationship: string }

interface Props {
  book: string; chapter: number; verse: number; verseText: string
  onClose: () => void
  onNavigate: (book: string, chapter: number) => void
}

const HIGHLIGHT_COLORS = [
  { id: 'yellow', label: 'Key', bg: 'rgba(255,220,0,0.35)', border: '#FFD700' },
  { id: 'blue',   label: 'Mary', bg: 'rgba(74,158,255,0.30)', border: '#4a9eff' },
  { id: 'red',    label: 'Christ', bg: 'rgba(220,50,50,0.30)', border: '#DC3232' },
  { id: 'green',  label: 'Prayer', bg: 'rgba(50,180,80,0.30)', border: '#32B450' },
]

export default function CommentaryDrawer({ book, chapter, verse, verseText, onClose, onNavigate }: Props) {
  const [tab, setTab] = useState<CommentaryTab>('commentary')
  const [commentaries, setCommentaries] = useState<Commentary[]>([])
  const [cccRefs, setCccRefs] = useState<CCCRef[]>([])
  const [crossRefs, setCrossRefs] = useState<CrossRef[]>([])
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setLoading(true)
    setTab('commentary')
    fetch(`/api/commentary?book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(d => {
        setCommentaries(d.commentaries || [])
        setCccRefs(d.cccRefs || [])
        setCrossRefs(d.crossRefs || [])
      })
      .finally(() => setLoading(false))

    const session = localStorage.getItem('bible_session') || 'default'
    fetch(`/api/note?session_id=${session}&book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(d => setNotes((d.notes || []).map((n: {note_text: string}) => n.note_text)))
  }, [book, chapter, verse])

  const saveNote = async () => {
    if (!newNote.trim()) return
    const session = localStorage.getItem('bible_session') || 'default'
    await fetch('/api/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session, book, chapter, verse, note_text: newNote.trim() }),
    })
    setNotes(prev => [...prev, newNote.trim()])
    setNewNote('')
  }

  const saveHighlight = async (color: string) => {
    const session = localStorage.getItem('bible_session') || 'default'
    await fetch('/api/highlight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session, book, chapter, verse, color }),
    })
  }

  const speakVerse = async () => {
    if (speaking) { audioEl?.pause(); setSpeaking(false); return }
    setSpeaking(true)
    const res = await fetch('/api/tts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: verseText }),
    })
    if (!res.ok) { setSpeaking(false); return }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    setAudioEl(audio)
    audio.play()
    audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url) }
  }

  const TABS: { id: CommentaryTab; label: string; icon: React.ReactNode }[] = [
    { id: 'commentary', label: 'Commentary', icon: <BookOpen size={13}/> },
    { id: 'ccc',        label: 'Catechism',  icon: <BookOpen size={13}/> },
    { id: 'crossrefs',  label: 'Cross-Refs', icon: <Link2 size={13}/> },
    { id: 'notes',      label: 'My Notes',   icon: <MessageSquare size={13}/> },
  ]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      maxHeight: '72vh', display: 'flex', flexDirection: 'column',
      background: '#0c0c0c', borderTop: '2px solid #8B0000',
      boxShadow: '0 -8px 40px rgba(0,0,0,0.8)',
    }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ fontSize: 10, color: '#8B0000', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: 4 }}>
              {book.toUpperCase()} {chapter}:{verse}
            </div>
            <div style={{ fontSize: 14, color: '#E8D8B8', fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{verseText}"
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={speakVerse} style={{
              background: speaking ? 'rgba(139,0,0,0.25)' : 'none',
              border: `1px solid ${speaking ? '#8B0000' : '#2a2a2a'}`,
              color: speaking ? '#FF6666' : '#555', borderRadius: 4,
              width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Volume2 size={14}/></button>
            <button onClick={onClose} style={{
              background: 'none', border: '1px solid #2a2a2a', color: '#555',
              borderRadius: 4, width: 30, height: 30, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><X size={14}/></button>
          </div>
        </div>

        {/* Highlight row */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 9, color: '#444', fontFamily: 'monospace', letterSpacing: '0.1em' }}>HIGHLIGHT:</span>
          {HIGHLIGHT_COLORS.map(c => (
            <button key={c.id} onClick={() => saveHighlight(c.id)} title={c.label} style={{
              width: 22, height: 22, borderRadius: 3, cursor: 'pointer',
              background: c.bg, border: `1px solid ${c.border}`,
              fontSize: 9, color: c.border, fontFamily: 'monospace',
            }}>{c.id[0].toUpperCase()}</button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1e1e1e' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 12px', fontFamily: 'monospace', fontSize: 10,
              letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4,
              color: tab === t.id ? '#C9A84C' : '#444',
              borderBottom: tab === t.id ? '2px solid #C9A84C' : '2px solid transparent',
              marginBottom: -1,
            }}>
              {t.icon}{t.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {loading && <div style={{ color: '#333', fontFamily: 'monospace', fontSize: 11 }}>Loading...</div>}

        {/* Commentary Tab */}
        {!loading && tab === 'commentary' && (
          <div>
            {commentaries.length === 0 ? (
              <div style={{ color: '#444', fontFamily: 'monospace', fontSize: 11, fontStyle: 'italic' }}>
                No commentary yet for this verse. Commentary is being written for all passages.
              </div>
            ) : commentaries.map((c, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#D4C4A0', fontFamily: 'Georgia, serif', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {c.text}
                </div>
                <div style={{ marginTop: 8, fontSize: 10, color: '#555', fontFamily: 'monospace' }}>
                  — {c.author} · {c.source}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CCC Tab */}
        {!loading && tab === 'ccc' && (
          <div>
            {cccRefs.length === 0 ? (
              <div style={{ color: '#444', fontFamily: 'monospace', fontSize: 11, fontStyle: 'italic' }}>
                No Catechism cross-references indexed for this verse yet.
              </div>
            ) : cccRefs.map((r, i) => (
              <div key={i} style={{ marginBottom: 16, padding: '12px 14px', background: '#0d0d0d', border: '1px solid #1e1e1e', borderLeft: '3px solid #8B0000', borderRadius: 4 }}>
                <div style={{ fontSize: 10, color: '#8B0000', fontFamily: 'monospace', marginBottom: 6, letterSpacing: '0.1em' }}>
                  CCC §{r.ccc_paragraph}
                </div>
                <div style={{ fontSize: 13, color: '#C8C0B0', fontFamily: 'Georgia, serif', lineHeight: 1.65, fontStyle: 'italic' }}>
                  "{r.ccc_summary}"
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cross-Refs Tab */}
        {!loading && tab === 'crossrefs' && (
          <div>
            {crossRefs.length === 0 ? (
              <div style={{ color: '#444', fontFamily: 'monospace', fontSize: 11, fontStyle: 'italic' }}>
                No cross-references indexed for this verse yet.
              </div>
            ) : crossRefs.map((r, i) => (
              <button key={i} onClick={() => onNavigate(r.to_book, r.to_chapter)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '10px 14px', marginBottom: 8,
                background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 4,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <div>
                  <span style={{ fontSize: 13, color: '#C9A84C', fontFamily: 'monospace' }}>
                    {r.to_book.charAt(0).toUpperCase() + r.to_book.slice(1)} {r.to_chapter}:{r.to_verse}
                  </span>
                  <span style={{ marginLeft: 10, fontSize: 10, color: '#555', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                    {r.relationship}
                  </span>
                </div>
                <Link2 size={12} style={{ color: '#444' }}/>
              </button>
            ))}
          </div>
        )}

        {/* Notes Tab */}
        {!loading && tab === 'notes' && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write your personal note on this verse..."
                style={{
                  width: '100%', minHeight: 80, background: '#0a0a0a',
                  border: '1px solid #2a2a2a', borderRadius: 4, color: '#D4C4A0',
                  fontFamily: 'Georgia, serif', fontSize: 13, padding: 10, resize: 'vertical',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button onClick={saveNote} style={{
                marginTop: 6, padding: '6px 16px', background: '#8B0000',
                border: 'none', borderRadius: 4, color: '#fff',
                fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
              }}>SAVE NOTE</button>
            </div>
            {notes.map((n, i) => (
              <div key={i} style={{ padding: '10px 14px', marginBottom: 8, background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 4 }}>
                <div style={{ fontSize: 13, color: '#C8C0B0', fontFamily: 'Georgia, serif', lineHeight: 1.6 }}>{n}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
