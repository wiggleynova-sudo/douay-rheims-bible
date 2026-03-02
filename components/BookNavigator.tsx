'use client'
import Link from 'next/link'
import { BIBLE_BOOKS } from '@/data/bible-data'
import { X } from 'lucide-react'

interface Props {
  currentBook: string
  currentChapter: number
  onClose: () => void
}

export default function BookNavigator({ currentBook, currentChapter, onClose }: Props) {
  const OT = BIBLE_BOOKS.filter(b => b.testament === 'old')
  const NT = BIBLE_BOOKS.filter(b => b.testament === 'new')

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#EFE3C2',
      borderRight: '2px solid #9A7320',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: '#2A1008', borderBottom: '2px solid #9A7320',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontFamily: 'Cinzel Decorative, Cinzel, serif',
            fontSize: 12, color: '#C9A848', letterSpacing: '0.06em',
          }}>Scripture</div>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8.5, color: '#9A7320',
            letterSpacing: '0.2em', marginTop: 2,
          }}>DOUAY-RHEIMS</div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: '1px solid #4A2010',
          color: '#9A7320', borderRadius: 3,
          padding: '4px 6px', cursor: 'pointer',
        }}>
          <X size={13}/>
        </button>
      </div>

      {/* Scrollable book list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>

        {/* Old Testament */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.22em',
            color: '#9A7320', padding: '6px 14px 4px',
            borderBottom: '1px solid #D4BC8A', marginBottom: 4,
          }}>
            ✦ OLD TESTAMENT
          </div>
          {OT.map(b => {
            const isActive = b.id === currentBook
            return (
              <Link key={b.id} href={`/read/${b.id}/1`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  padding: '7px 16px',
                  background: isActive ? 'rgba(122,14,28,0.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid #7A0E1C' : '3px solid transparent',
                  fontFamily: 'EB Garamond, Georgia, serif',
                  fontSize: 14, color: isActive ? '#7A0E1C' : '#3A1E0A',
                  cursor: 'pointer', transition: 'background 0.12s',
                  lineHeight: 1.4,
                }}>
                  {b.name}
                  {isActive && (
                    <span style={{
                      marginLeft: 8, fontFamily: 'Cinzel, serif',
                      fontSize: 10, color: '#9A7320',
                    }}>ch. {currentChapter}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* New Testament */}
        <div>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.22em',
            color: '#7A0E1C', padding: '6px 14px 4px',
            borderBottom: '1px solid #D4BC8A', marginBottom: 4,
          }}>
            ✦ NEW TESTAMENT
          </div>
          {NT.map(b => {
            const isActive = b.id === currentBook
            return (
              <Link key={b.id} href={`/read/${b.id}/1`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  padding: '7px 16px',
                  background: isActive ? 'rgba(122,14,28,0.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid #7A0E1C' : '3px solid transparent',
                  fontFamily: 'EB Garamond, Georgia, serif',
                  fontSize: 14, color: isActive ? '#7A0E1C' : '#3A1E0A',
                  cursor: 'pointer', transition: 'background 0.12s',
                  lineHeight: 1.4,
                }}>
                  {b.name}
                  {isActive && (
                    <span style={{
                      marginLeft: 8, fontFamily: 'Cinzel, serif',
                      fontSize: 10, color: '#9A7320',
                    }}>ch. {currentChapter}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #D4BC8A', padding: '10px 14px',
        background: '#EFE3C2', flexShrink: 0,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.12em',
            color: '#9A7320', textAlign: 'center',
          }}>
            ☧ DOUAY-RHEIMS HOME
          </div>
        </Link>
      </div>
    </div>
  )
}
