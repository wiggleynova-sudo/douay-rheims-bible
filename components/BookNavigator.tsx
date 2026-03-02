'use client'
import Link from 'next/link'
import { BIBLE_BOOKS } from '@/data/bible-data'

interface Props {
  currentBook?: string
  currentChapter?: number
  onClose?: () => void
}

export default function BookNavigator({ currentBook, currentChapter, onClose }: Props) {
  const OT = BIBLE_BOOKS.filter(b => b.testament === 'old')
  const NT = BIBLE_BOOKS.filter(b => b.testament === 'new')

  const BookSection = ({ title, books }: { title: string; books: typeof BIBLE_BOOKS }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 9, color: '#8B0000', fontFamily: 'monospace',
        letterSpacing: '0.2em', padding: '6px 12px',
        borderBottom: '1px solid #1a1a1a', marginBottom: 4,
      }}>{title}</div>
      {books.map(book => {
        const isActive = book.id === currentBook
        return (
          <div key={book.id}>
            <Link
              href={`/read/${book.id}/1`}
              onClick={onClose}
              style={{
                display: 'block', padding: '5px 12px',
                color: isActive ? '#C9A84C' : '#555',
                fontFamily: 'monospace', fontSize: 11,
                textDecoration: 'none', letterSpacing: '0.05em',
                background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid #C9A84C' : '2px solid transparent',
              }}
            >
              {book.name}
            </Link>
            {isActive && book.chapters.map(ch => (
              <Link
                key={ch.chapter}
                href={`/read/${book.id}/${ch.chapter}`}
                onClick={onClose}
                style={{
                  display: 'block', padding: '3px 12px 3px 24px',
                  color: ch.chapter === currentChapter ? '#C9A84C' : '#333',
                  fontFamily: 'monospace', fontSize: 10,
                  textDecoration: 'none',
                  background: ch.chapter === currentChapter ? 'rgba(201,168,76,0.06)' : 'transparent',
                }}
              >
                Ch. {ch.chapter}
              </Link>
            ))}
          </div>
        )
      })}
    </div>
  )

  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: '#080808', borderRight: '1px solid #1a1a1a',
    }}>
      <div style={{ padding: '14px 12px 6px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ fontSize: 10, color: '#8B0000', fontFamily: 'monospace', letterSpacing: '0.2em', fontWeight: 700 }}>
          DOUAY-RHEIMS
        </div>
        <div style={{ fontSize: 9, color: '#333', fontFamily: 'monospace', marginTop: 2 }}>Catholic Bible</div>
      </div>
      <div style={{ padding: '10px 0 40px' }}>
        <BookSection title="OLD TESTAMENT" books={OT} />
        <BookSection title="NEW TESTAMENT" books={NT} />
      </div>
    </div>
  )
}
