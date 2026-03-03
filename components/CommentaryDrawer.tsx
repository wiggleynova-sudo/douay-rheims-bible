'use client'
import { useState, useEffect } from 'react'
import { X, BookOpen, Link2, PenLine, Volume2, Trash2 } from 'lucide-react'

type CommentaryTab = 'commentary' | 'ccc' | 'crossrefs' | 'notes'

interface Commentary { id: number; text: string; author: string; source: string; type: string }
interface CCCRef { ccc_paragraph: string; ccc_summary: string }
interface CrossRef { to_book: string; to_chapter: number; to_verse: number; relationship: string }
interface Note { id?: number; note_text: string }

interface Props {
  book: string; chapter: number; verse: number; verseText: string
  onClose: () => void
  onNavigate: (book: string, chapter: number) => void
}

const HIGHLIGHT_COLORS = [
  { id: 'yellow', label: 'Key Text',   bg: 'rgba(184,134,11,0.22)',  border: '#B8860B', swatch: '#E8B840' },
  { id: 'blue',   label: 'Marian',     bg: 'rgba(26,42,94,0.15)',    border: '#1A2A5E', swatch: '#4A6ABE' },
  { id: 'red',    label: 'Christ',     bg: 'rgba(122,14,28,0.15)',   border: '#7A0E1C', swatch: '#A02030' },
  { id: 'green',  label: 'Prayer',     bg: 'rgba(42,74,26,0.15)',    border: '#2A4A1A', swatch: '#4A8030' },
]

const REL_LABELS: Record<string, string> = {
  fulfillment: 'Fulfillment',
  typology: 'Type / Antitype',
  parallel: 'Parallel Passage',
  thematic: 'Thematic Link',
}

export default function CommentaryDrawer({ book, chapter, verse, verseText, onClose, onNavigate }: Props) {
  const [tab, setTab] = useState<CommentaryTab>('commentary')
  const [commentaries, setCommentaries] = useState<Commentary[]>([])
  const [cccRefs, setCccRefs] = useState<CCCRef[]>([])
  const [crossRefs, setCrossRefs] = useState<CrossRef[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    setLoading(true)
    setGenerating(false)
    setTab('commentary')
    // After 1.5s still loading → likely generating AI commentary
    const genTimer = setTimeout(() => setGenerating(true), 1500)
    fetch(`/api/commentary?book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(d => {
        setCommentaries(d.commentaries || [])
        setCccRefs(d.cccRefs || [])
        setCrossRefs(d.crossRefs || [])
      })
      .finally(() => {
        clearTimeout(genTimer)
        setGenerating(false)
        setLoading(false)
      })

    const session = localStorage.getItem('bible_session') || 'default'
    fetch(`/api/note?session_id=${session}&book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(d => setNotes(d.notes || []))
  }, [book, chapter, verse])

  const saveNote = async () => {
    if (!newNote.trim()) return
    const session = localStorage.getItem('bible_session') || 'default'
    await fetch('/api/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: session, book, chapter, verse, note_text: newNote.trim() }),
    })
    setNotes(prev => [...prev, { note_text: newNote.trim() }])
    setNewNote('')
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 2000)
  }

  const saveHighlight = async (color: string) => {
    const session = localStorage.getItem('bible_session') || 'default'
    await fetch('/api/highlight', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
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

  const bookLabel = book.charAt(0).toUpperCase() + book.slice(1)

  const TABS: { id: CommentaryTab; label: string; count?: number }[] = [
    { id: 'commentary', label: 'Fathers',  count: commentaries.length || undefined },
    { id: 'ccc',        label: 'Catechism', count: cccRefs.length || undefined },
    { id: 'crossrefs',  label: 'Links',    count: crossRefs.length || undefined },
    { id: 'notes',      label: 'My Notes', count: notes.length || undefined },
  ]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      maxHeight: '76vh', display: 'flex', flexDirection: 'column',
      background: '#F7F0DC',
      borderTop: '3px solid #9A7320',
      boxShadow: '0 -12px 48px rgba(42,16,8,0.35)',
    }}>

      {/* ── Drawer Header ── */}
      <div style={{
        background: '#2A1008',
        padding: '12px 18px 0',
        flexShrink: 0,
      }}>
        {/* Verse ref + close */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.2em',
              color: '#9A7320', marginBottom: 6,
            }}>
              ✦ {bookLabel.toUpperCase()} {chapter}:{verse}
            </div>
            <div style={{
              fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
              fontStyle: 'italic', color: '#E8D8B8', lineHeight: 1.55,
            }}>
              "{verseText}"
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingTop: 2 }}>
            <button onClick={speakVerse} title="Read verse aloud" style={{
              background: speaking ? 'rgba(122,14,28,0.4)' : 'rgba(42,16,8,0.6)',
              border: `1px solid ${speaking ? '#7A0E1C' : '#4A2010'}`,
              color: speaking ? '#E88080' : '#9A7320',
              borderRadius: 3, padding: '5px 8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Volume2 size={13}/>
            </button>
            <button onClick={onClose} title="Close" style={{
              background: 'rgba(42,16,8,0.6)', border: '1px solid #4A2010',
              color: '#9A7320', borderRadius: 3, padding: '5px 8px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
            }}>
              <X size={13}/>
            </button>
          </div>
        </div>

        {/* Highlight swatches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{
            fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.18em',
            color: '#6A4828',
          }}>MARK:</span>
          {HIGHLIGHT_COLORS.map(c => (
            <button key={c.id} onClick={() => saveHighlight(c.id)} title={c.label} style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px',
              background: 'rgba(42,16,8,0.4)', border: `1px solid ${c.border}55`,
              borderRadius: 2, cursor: 'pointer',
            }}>
              <span style={{
                display: 'inline-block', width: 12, height: 12, borderRadius: '50%',
                background: c.swatch, flexShrink: 0,
              }}/>
              <span style={{
                fontFamily: 'Cinzel, serif', fontSize: 8.5, color: c.swatch,
                letterSpacing: '0.08em',
              }}>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? '#F7F0DC' : 'transparent',
              border: 'none',
              borderTop: tab === t.id ? '2px solid #9A7320' : '2px solid transparent',
              borderLeft: tab === t.id ? '1px solid #9A732040' : '1px solid transparent',
              borderRight: tab === t.id ? '1px solid #9A732040' : '1px solid transparent',
              padding: '7px 14px',
              fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.1em',
              cursor: 'pointer',
              color: tab === t.id ? '#7A0E1C' : '#8A6040',
              borderRadius: '4px 4px 0 0',
              marginBottom: tab === t.id ? '-1px' : 0,
              transition: 'color 0.15s',
            }}>
              {t.label.toUpperCase()}
              {t.count ? (
                <span style={{
                  marginLeft: 6, fontFamily: 'EB Garamond, serif', fontSize: 11,
                  color: tab === t.id ? '#9A7320' : '#5A3A20',
                }}>({t.count})</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* ── Drawer Body ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 20px 28px',
        background: '#F7F0DC',
      }}>
        {loading && (
          <div style={{
            fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
            color: '#8B6040', fontSize: 15, textAlign: 'center', padding: '24px 0',
          }}>
            {generating
              ? '✦ Writing commentary for this verse…'
              : '✦ Loading commentary…'
            }
          </div>
        )}

        {/* ── COMMENTARY / CHURCH FATHERS ── */}
        {!loading && tab === 'commentary' && (
          <div>
            {commentaries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 11, color: '#9A7320', letterSpacing: '0.1em', marginBottom: 12 }}>
                  ✦ ✦ ✦
                </div>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 16, color: '#8B6040', lineHeight: 1.7,
                }}>
                  No commentary yet for this verse.
                  Commentary is being written and added for all passages.
                </div>
              </div>
            ) : commentaries.map((c, i) => (
              <div key={i} style={{
                marginBottom: 24, paddingBottom: 24,
                borderBottom: i < commentaries.length - 1 ? '1px solid #D4BC8A' : 'none',
              }}>
                {/* Author badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.15em',
                    background: '#2A1008', color: '#C9A848',
                    padding: '3px 10px', borderRadius: 2,
                  }}>
                    {c.type === 'theological' ? 'THEOLOGY' : c.type === 'verse' ? 'VERSE COMMENT' : 'STUDY NOTE'}
                  </span>
                </div>
                {/* Commentary text */}
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16.5,
                  color: '#2A1405', lineHeight: 1.85, whiteSpace: 'pre-line',
                  marginBottom: 10,
                }}>
                  {c.text}
                </div>
                {/* Attribution */}
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 13, color: '#9A7320',
                }}>
                  — {c.author}{c.source && c.source !== 'Study Notes' ? `, ${c.source}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CATECHISM ── */}
        {!loading && tab === 'ccc' && (
          <div>
            {cccRefs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 16, color: '#8B6040', lineHeight: 1.7,
                }}>
                  No Catechism cross-references indexed for this verse yet.
                </div>
              </div>
            ) : cccRefs.map((r, i) => (
              <div key={i} style={{
                marginBottom: 16, padding: '16px 18px',
                background: '#EFE3C2', border: '1px solid #D4BC8A',
                borderLeft: '4px solid #7A0E1C', borderRadius: 3,
              }}>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.15em',
                  color: '#7A0E1C', marginBottom: 8,
                }}>
                  CATECHISM OF THE CATHOLIC CHURCH §{r.ccc_paragraph}
                </div>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
                  fontStyle: 'italic', color: '#2A1405', lineHeight: 1.75,
                }}>
                  "{r.ccc_summary}"
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CROSS-REFERENCES ── */}
        {!loading && tab === 'crossrefs' && (
          <div>
            {crossRefs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 16, color: '#8B6040', lineHeight: 1.7,
                }}>
                  No cross-references indexed for this verse yet.
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 14, color: '#8B6040', marginBottom: 16, textAlign: 'center',
                }}>
                  Tap a reference to navigate to that passage
                </div>
                {crossRefs.map((r, i) => {
                  const refLabel = r.to_book.charAt(0).toUpperCase() + r.to_book.slice(1)
                  return (
                    <button key={i} onClick={() => onNavigate(r.to_book, r.to_chapter)} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '12px 16px', marginBottom: 8,
                      background: '#EFE3C2', border: '1px solid #D4BC8A',
                      borderRadius: 3, cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.15s',
                    }}>
                      <div>
                        <span style={{
                          fontFamily: 'Cinzel, serif', fontSize: 13,
                          color: '#7A0E1C', letterSpacing: '0.04em',
                        }}>
                          {refLabel} {r.to_chapter}:{r.to_verse}
                        </span>
                        <span style={{
                          marginLeft: 12,
                          fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                          fontSize: 13, color: '#8B6040',
                        }}>
                          {REL_LABELS[r.relationship] || r.relationship}
                        </span>
                      </div>
                      <Link2 size={14} style={{ color: '#9A7320', flexShrink: 0 }}/>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── MY NOTES ── */}
        {!loading && tab === 'notes' && (
          <div>
            {/* Write new note */}
            <div style={{
              background: '#FAF4E6', border: '1px solid #D4BC8A',
              borderRadius: 4, padding: '18px 18px 14px',
              marginBottom: 24,
            }}>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.18em',
                color: '#7A0E1C', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <PenLine size={13}/> WRITE A REFLECTION
              </div>
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write your reflection on this verse…"
                rows={5}
                style={{
                  width: '100%',
                  minHeight: 160,
                  background: '#FFFDF6',
                  border: '1px solid #D4BC8A',
                  borderRadius: 3, color: '#2A1405',
                  fontFamily: 'EB Garamond, Georgia, serif',
                  fontSize: 16, lineHeight: 1.75,
                  padding: '12px 14px', resize: 'vertical',
                  outline: 'none', boxSizing: 'border-box',
                  boxShadow: 'inset 0 2px 4px rgba(42,16,8,0.05)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#9A7320'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(42,16,8,0.05), 0 0 0 2px rgba(154,115,32,0.15)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#D4BC8A'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(42,16,8,0.05)' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                <button onClick={saveNote} style={{
                  flex: 1, padding: '11px 0',
                  background: '#2A1008', border: '1px solid #9A7320',
                  borderRadius: 3, color: '#C9A848',
                  fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.1em',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}>
                  SAVE REFLECTION
                </button>
                {savedFlash && (
                  <span style={{
                    fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                    fontSize: 14, color: '#2A4A1A',
                  }}>✓ Saved</span>
                )}
              </div>
            </div>

            {/* Saved notes */}
            {notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic',
                  fontSize: 16, color: '#8B6040', lineHeight: 1.7,
                }}>
                  ✍ Your reflections on this verse will appear here.
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.2em',
                  color: '#9A7320', marginBottom: 12,
                }}>YOUR REFLECTIONS</div>
                {notes.map((n, i) => (
                  <div key={i} style={{
                    background: '#EFE3C2', border: '1px solid #D4BC8A',
                    borderLeft: '3px solid #9A7320',
                    borderRadius: 3, padding: '14px 16px',
                    marginBottom: 10,
                  }}>
                    <div style={{
                      fontFamily: 'EB Garamond, Georgia, serif', fontSize: 16,
                      color: '#2A1405', lineHeight: 1.75,
                    }}>
                      {n.note_text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
