import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Douay-Rheims Catholic Bible | With Commentary',
  description: 'The Douay-Rheims Catholic Bible with scholarly commentary, Catechism cross-references, Church Fathers, and personal study tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#050505', color: '#E8E8E8' }}>
        {children}
      </body>
    </html>
  )
}
