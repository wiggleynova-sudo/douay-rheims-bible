'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BIBLE_BOOKS } from '@/data/bible-data'

const PASSWORD = 'rsv2026'

const fieldStyle = {
  width: '100%', padding: '10px 12px',
  background: '#FAF4E6', border: '1px solid #D4BC8A',
  borderRadius: 3, color: '#2A1405',
  fontFamily: 'EB Garamond, Georgia, serif', fontSize: 15,
  outline: 'none', boxSizing: 'border-box' as const,
  marginBottom: 12,
}
const labelStyle = {
  fontFamily: 'Cinzel, sans-serif', fontSize: 9,
  letterSpacing: '0.18em', color: '#9A7320',
  marginBottom: 5, display: 'block',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [book, setBook] = useState('genesis')
  const [chapter, setChapter] = useState('1')
  const [verse, setVerse] = useState('1')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('Editorial')
  const [source, setSource] = useState('Study Notes')
  const [type, setType] = useState('verse')
  const [saved, setSaved] = useState(false)

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#2A1008', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#F7F0DC', border: '2px solid #9A7320',
        borderRadius: 4, padding: '36px 32px', width: 340, textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 20, color: '#9A7320', marginBottom: 4 }}>☧</div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 11, color: '#7A0E1C', letterSpacing: '0.2em', marginBottom: 24 }}>
          ADMIN ACCESS
        </div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && pw === PASSWORD && setAuthed(true)}
          placeholder="Enter password"
          style={{ ...fieldStyle, textAlign: 'center', fontSize: 16 }}
        />
        <button onClick={() => pw === PASSWORD && setAuthed(true)} style={{
          width: '100%', padding: '11px', background: '#2A1008',
          border: '1px solid #9A7320', borderRadius: 3, color: '#C9A848',
          fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.12em', cursor: 'pointer',
        }}>ENTER ✦</button>
        {pw && pw !== PASSWORD && (
          <div style={{ marginTop: 10, fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 14, color: '#7A0E1C' }}>
            Incorrect password.
          </div>
        )}
      </div>
    </div>
  )

  const handleSave = async () => {
    await fetch('/api/commentary', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book, chapter: parseInt(chapter), verse: parseInt(verse), text, author, source, type }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setText('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F0DC' }}>
      <header style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Link href="/" style={{ textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 10, color: '#9A7320', letterSpacing: '0.12em' }}>
          ☧ D-R BIBLE
        </Link>
        <span style={{ color: '#4A2010' }}>✦</span>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#C9A848', letterSpacing: '0.1em' }}>
          COMMENTARY ADMIN
        </span>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', fontSize: 22, color: '#2A1405', marginBottom: 8 }}>
            Add Commentary
          </h1>
          <p style={{ fontFamily: 'EB Garamond, Georgia, serif', fontStyle: 'italic', fontSize: 16, color: '#5C3A1E' }}>
            Add Church Fathers quotations, theological notes, and verse commentary.
          </p>
        </div>

        <div style={{ background: '#EFE3C2', border: '1px solid #D4BC8A', borderRadius: 4, padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 0 }}>
            <div>
              <label style={labelStyle}>BOOK</label>
              <select value={book} onChange={e => setBook(e.target.value)} style={{ ...fieldStyle, cursor: 'pointer' }}>
                {BIBLE_BOOKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>CHAPTER</label>
              <input type="number" value={chapter} onChange={e => setChapter(e.target.value)} style={fieldStyle} min={1}/>
            </div>
            <div>
              <label style={labelStyle}>VERSE</label>
              <input type="number" value={verse} onChange={e => setVerse(e.target.value)} style={fieldStyle} min={1}/>
            </div>
          </div>

          <label style={labelStyle}>COMMENTARY TEXT</label>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="Write commentary, patristic quotation, or theological reflection…"
            rows={9}
            style={{
              ...fieldStyle, resize: 'vertical', lineHeight: 1.75,
              fontSize: 16, minHeight: 200,
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>AUTHOR</label>
              <input value={author} onChange={e => setAuthor(e.target.value)} style={fieldStyle}/>
            </div>
            <div>
              <label style={labelStyle}>SOURCE</label>
              <input value={source} onChange={e => setSource(e.target.value)} style={fieldStyle}/>
            </div>
            <div>
              <label style={labelStyle}>TYPE</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ ...fieldStyle, cursor: 'pointer' }}>
                <option value="verse">Verse Comment</option>
                <option value="theological">Theological Note</option>
                <option value="historical">Historical</option>
              </select>
            </div>
          </div>

          <button onClick={handleSave} disabled={!text.trim()} style={{
            width: '100%', padding: '12px',
            background: saved ? '#2A4A1A' : '#2A1008',
            border: `1px solid ${saved ? '#4A8030' : '#9A7320'}`,
            borderRadius: 3, color: saved ? '#80C060' : '#C9A848',
            fontFamily: 'Cinzel, serif', fontSize: 11,
            letterSpacing: '0.12em', cursor: text.trim() ? 'pointer' : 'default',
            transition: 'all 0.2s',
          }}>
            {saved ? '✓ COMMENTARY SAVED' : 'SAVE COMMENTARY ✦'}
          </button>
        </div>
      </main>
    </div>
  )
}
