import type { Metadata } from 'next'
import { BuyersPage } from '@/components/buyers/BuyersPage'

export const metadata: Metadata = {
  title: 'Покупателям — поиск дома и сопровождение сделки в «БАСТ»',
  description: 'Объявления в Удмуртии, общение с продавцом и бесплатное сопровождение специалиста «БАСТ» для покупателя без своего риэлтора.',
}

export default function Page() {
  return <BuyersPage />
}
