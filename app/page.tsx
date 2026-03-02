import Link from 'next/link'
import { BIBLE_BOOKS } from '@/data/bible-data'

const FEATURED_VERSES = [
  { ref: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', book: 'john', chapter: 1 },
  { ref: 'Genesis 1:1', text: 'In the beginning God created heaven, and earth.', book: 'genesis', chapter: 1 },
  { ref: 'John 3:16', text: 'For God so loved the world, as to give his only begotten Son; that whosoever believeth in him, may not perish, but may have life everlasting.', book: 'john', chapter: 3 },
  { ref: 'Psalm 22:1', text: 'The Lord ruleth me: and I shall want nothing.', book: 'psalms', chapter: 22 },
  { ref: 'Matthew 5:3', text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.', book: 'matthew', chapter: 5 },
  { ref: 'Romans 8:28', text: 'We know that to them that love God, all things work together unto good, to such as, according to his purpose, are called to be saints.', book: 'romans', chapter: 8 },
]

const day = new Date().getDay()
const featured = FEATURED_VERSES[day % FEATURED_VERSES.length]

const OT = BIBLE_BOOKS.filter(b => b.testament === 'old')
const NT = BIBLE_BOOKS.filter(b => b.testament === 'new')

const TESTAMENT_COLORS: Record<string, string> = {
  old: 'rgba(201,168,76,0.12)',
  new: 'rgba(139,0,0,0.12)',
}

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#E8E8E8', fontFamily: 'monospace' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid #1a1a1a', padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: '#050505', zIndex: 50,
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#8B0000', letterSpacing: '0.25em', fontWeight: 700 }}>
            ✟ DOUAY-RHEIMS CATHOLIC BIBLE
          </div>
          <div style={{ fontSize: 9, color: '#333', letterSpacing: '0.15em', marginTop: 2 }}>
            CHALLONER REVISION · WITH COMMENTARY
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/study" style={{ fontSize: 10, color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.1em' }}>
            STUDY PATHS
          </Link>
          <Link href="/parallel/john/1" style={{ fontSize: 10, color: '#555', textDecoration: 'none', letterSpacing: '0.1em' }}>
            PARALLEL
          </Link>
          <Link href="/read/matthew/5" style={{ fontSize: 10, color: '#555', textDecoration: 'none', letterSpacing: '0.1em' }}>
            READ
          </Link>
          <Link href="/admin/commentary" style={{ fontSize: 10, color: '#333', textDecoration: 'none', letterSpacing: '0.1em' }}>
            ADMIN
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: '60px 24px 48px', textAlign: 'center',
        borderBottom: '1px solid #1a1a1a',
        background: 'linear-gradient(180deg, rgba(139,0,0,0.06) 0%, transparent 100%)',
      }}>
        <div style={{ fontSize: 9, color: '#8B0000', letterSpacing: '0.35em', marginBottom: 16 }}>
          ✟ THE WORD OF GOD ✟
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 900,
          color: '#F0E8D8', fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em', marginBottom: 12, lineHeight: 1.1,
        }}>
          Douay-Rheims<br/>
          <span style={{ color: '#C9A84C' }}>Catholic Bible</span>
        </h1>
        <p style={{ fontSize: 13, color: '#555', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>
          The classic English Catholic translation with scholarly commentary,
          Catechism cross-references, Church Fathers, and personal study tools.
        </p>

        {/* Featured verse */}
        <div style={{
          maxWidth: 600, margin: '0 auto', padding: '20px 24px',
          background: '#0a0a0a', border: '1px solid #1e1e1e',
          borderLeft: '3px solid #8B0000', borderRadius: 6, textAlign: 'left',
        }}>
          <div style={{ fontSize: 9, color: '#8B0000', letterSpacing: '0.2em', marginBottom: 10 }}>
            VERSE OF THE DAY
          </div>
          <blockquote style={{
            fontFamily: 'Georgia, serif', fontSize: 16, color: '#D4C4A0',
            lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 10px',
          }}>
            "{featured.text}"
          </blockquote>
          <Link href={`/read/${featured.book}/${featured.chapter}`} style={{
            fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontFamily: 'monospace', letterSpacing: '0.1em',
          }}>
            — {featured.ref} →
          </Link>
        </div>

        {/* Quick start buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Read John 1', href: '/read/john/1' },
            { label: 'Sermon on the Mount', href: '/read/matthew/5' },
            { label: 'Psalm 22 (23)', href: '/read/psalms/22' },
            { label: 'Isaiah 53', href: '/read/isaiah/53' },
          ].map(btn => (
            <Link key={btn.label} href={btn.href} style={{
              padding: '8px 18px', background: 'rgba(139,0,0,0.12)',
              border: '1px solid rgba(139,0,0,0.3)', borderRadius: 4,
              color: '#C9A84C', textDecoration: 'none',
              fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.08em',
            }}>{btn.label}</Link>
          ))}
        </div>
      </section>

      {/* Books Grid */}
      <section style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 40 }}>
          {[
            { icon: '📖', title: 'Clickable Verses', desc: 'Tap any verse for deep commentary and cross-references' },
            { icon: '✝️', title: 'Church Fathers', desc: 'Augustine, Aquinas, Chrysostom commenting on Scripture' },
            { icon: '📚', title: 'CCC Linked', desc: 'Catechism cross-references on key doctrinal passages' },
            { icon: '🎧', title: 'Audio Reading', desc: 'Listen to chapters read aloud in a meditative voice' },
            { icon: '🖊️', title: 'Personal Notes', desc: 'Highlight verses and write your own study notes' },
            { icon: '🔗', title: 'Cross-References', desc: 'Prophecy fulfillments and thematic verse networks' },
          ].map(f => (
            <div key={f.title} style={{
              padding: '14px 16px', background: '#0a0a0a',
              border: '1px solid #161616', borderRadius: 6,
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 11, color: '#C9A84C', fontFamily: 'monospace', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: '#444', fontFamily: 'Georgia, serif', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* OT Books */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: '#8B0000', letterSpacing: '0.2em', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #1a1a1a' }}>
            OLD TESTAMENT
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
            {OT.map(book => (
              <Link key={book.id} href={`/read/${book.id}/1`} style={{
                padding: '12px 14px', background: TESTAMENT_COLORS.old,
                border: '1px solid rgba(201,168,76,0.15)', borderRadius: 5,
                textDecoration: 'none', display: 'block',
              }}>
                <div style={{ fontSize: 12, color: '#C9A84C', fontFamily: 'Georgia, serif', marginBottom: 3 }}>{book.name}</div>
                <div style={{ fontSize: 9, color: '#444', fontFamily: 'monospace' }}>
                  {book.chapters.length} ch · {book.abbreviation}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* NT Books */}
        <div>
          <div style={{ fontSize: 10, color: '#8B0000', letterSpacing: '0.2em', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #1a1a1a' }}>
            NEW TESTAMENT
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
            {NT.map(book => (
              <Link key={book.id} href={`/read/${book.id}/1`} style={{
                padding: '12px 14px', background: TESTAMENT_COLORS.new,
                border: '1px solid rgba(139,0,0,0.2)', borderRadius: 5,
                textDecoration: 'none', display: 'block',
              }}>
                <div style={{ fontSize: 12, color: '#E8D0D0', fontFamily: 'Georgia, serif', marginBottom: 3 }}>{book.name}</div>
                <div style={{ fontSize: 9, color: '#444', fontFamily: 'monospace' }}>
                  {book.chapters.length} ch · {book.abbreviation}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '20px 24px', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <div style={{ fontSize: 9, color: '#2a2a2a', fontFamily: 'monospace', letterSpacing: '0.15em' }}>
          DOUAY-RHEIMS BIBLE · CHALLONER REVISION · PUBLIC DOMAIN · STUDY COMMENTARY © 2025
        </div>
      </footer>
    </div>
  )
}
