'use client'
import { useState } from 'react'
import { BIBLE_BOOKS } from '@/data/bible-data'

const PASSWORD = 'rsv2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [book, setBook] = useState('genesis')
  const [chapter, setChapter] = useState('1')
  const [verse, setVerse] = useState('1')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('Editorial')
  const [source, setSource] = useState('Study Notes')
  const [saved, setSaved] = useState(false)

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 6, padding: 32, width: 300 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#8B0000', letterSpacing: '0.2em', marginBottom: 16 }}>ADMIN ACCESS</div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && pw === PASSWORD && setAuthed(true)}
          placeholder="Password" style={{
            width: '100%', padding: '8px 12px', background: '#111', border: '1px solid #2a2a2a',
            borderRadius: 4, color: '#E8E8E8', fontFamily: 'monospace', fontSize: 12, outline: 'none',
          }}/>
        <button onClick={() => pw === PASSWORD && setAuthed(true)} style={{
          marginTop: 10, width: '100%', padding: '8px', background: '#8B0000',
          border: 'none', borderRadius: 4, color: '#fff', fontFamily: 'monospace', fontSize: 11, cursor: 'pointer',
        }}>ENTER</button>
        {pw && pw !== PASSWORD && <div style={{ marginTop: 8, fontSize: 10, color: '#FF3333', fontFamily: 'monospace' }}>Incorrect password</div>}
      </div>
    </div>
  )

  const handleSave = async () => {
    await fetch('/api/commentary', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book, chapter: parseInt(chapter), verse: parseInt(verse), text, author, source }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setText('')
  }

  const label = (t: string) => (
    <div style={{ fontSize: 9, color: '#555', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 4 }}>{t}</div>
  )
  const inputStyle = {
    width: '100%', padding: '8px 12px', background: '#0a0a0a',
    border: '1px solid #2a2a2a', borderRadius: 4, color: '#E8E8E8',
    fontFamily: 'monospace', fontSize: 12, outline: 'none', marginBottom: 12,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', padding: '40px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#8B0000', letterSpacing: '0.2em', marginBottom: 24 }}>
          ✟ COMMENTARY ADMIN
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: 6, padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 4 }}>
            <div>
              {label('BOOK')}
              <select value={book} onChange={e => setBook(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {BIBLE_BOOKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              {label('CHAPTER')}
              <input type="number" value={chapter} onChange={e => setChapter(e.target.value)} style={inputStyle} min={1}/>
            </div>
            <div>
              {label('VERSE')}
              <input type="number" value={verse} onChange={e => setVerse(e.target.value)} style={inputStyle} min={1}/>
            </div>
          </div>
          <div>
            {label('COMMENTARY TEXT')}
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write commentary..." rows={8} style={{
              ...inputStyle, resize: 'vertical', fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.6,
            }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              {label('AUTHOR')}
              <input value={author} onChange={e => setAuthor(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              {label('SOURCE')}
              <input value={source} onChange={e => setSource(e.target.value)} style={inputStyle}/>
            </div>
          </div>
          <button onClick={handleSave} disabled={!text.trim()} style={{
            padding: '10px 24px', background: saved ? '#1a5c2a' : '#8B0000',
            border: 'none', borderRadius: 4, color: '#fff',
            fontFamily: 'monospace', fontSize: 11, cursor: 'pointer', letterSpacing: '0.1em',
          }}>{saved ? '✓ SAVED' : 'SAVE COMMENTARY'}</button>
        </div>
      </div>
    </div>
  )
}
