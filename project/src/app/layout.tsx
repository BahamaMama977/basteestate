import type { Metadata } from 'next'
import { Cormorant_Garamond, JetBrains_Mono, Onest } from 'next/font/google'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
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
  title: 'БАСТ — мобильное приложение и веб-CRM для загородной недвижимости',
  description:
    'Мобильное приложение и веб-CRM связывают покупателей, риэлторов и застройщиков — от первого интереса к объекту до подписания документов.',
  keywords:
    'БАСТ Недвижимость, загородные дома Удмуртия, приложение для недвижимости, CRM для риэлторов, платформа для застройщиков',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${onest.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <a href="#main-content" className="skip-link">Перейти к содержанию</a>
        <div className="site-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
