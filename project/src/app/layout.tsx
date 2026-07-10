import type { Metadata } from 'next'
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'БАСТ Недвижимость — поиск домов и сопровождение сделки',
  description:
    'Приложение для поиска загородных домов, общения с продавцом и сопровождения сделки до подписания договора. Объекты в Удмуртии.',
  keywords:
    'БАСТ Недвижимость, загородные дома Удмуртия, приложение для недвижимости, CRM для риэлторов, платформа для застройщиков',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <div className="site-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
