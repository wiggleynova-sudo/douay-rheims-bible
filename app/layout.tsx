import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Douay-Rheims Catholic Bible | With Commentary',
  description: 'The Douay-Rheims Catholic Bible with scholarly commentary, Catechism cross-references, Church Fathers, and personal study tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F7F0DC', color: '#2A1405' }}>
        {children}
      </body>
    </html>
  )
}
