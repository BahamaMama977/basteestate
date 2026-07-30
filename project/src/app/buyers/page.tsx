import type { Metadata } from 'next'
import { BuyersPage } from '@/components/buyers/BuyersPage'

export const metadata: Metadata = {
  title: 'Покупателям — проверенные загородные дома в «БАСТ»',
  description: 'Ищите загородный дом самостоятельно или с риэлтором-партнёром и следите за сделкой до подписания документов.',
}

export default function Page() {
  return <BuyersPage />
}
