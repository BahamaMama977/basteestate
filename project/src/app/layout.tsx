import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, DM_Sans, Sora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'БАСТ Недвижимость — Платформа для сделок с загородной недвижимостью',
  description: 'Объединяем застройщиков, риэлторов и покупателей. QR-технология, прозрачные сделки, автоматические выплаты. Для инвесторов и партнеров.',
  keywords: 'PropTech, недвижимость, платформа для застройщиков, CRM для риэлторов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${montserrat.variable} ${dmSans.variable} ${sora.variable}`}>
      <body className="font-body">
        {/* Paper texture overlay for premium feel */}
        <div className="paper-texture" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
