import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorCrmScreen } from '@/components/app-screens'
import { crm, participants } from '@/lib/demo-deal'

describe('RealtorCrmScreen', () => {
  it('клиент из канона закреплён за риэлтором', () => {
    render(<RealtorCrmScreen />)
    // buyer виден дважды: карточка клиента + список «Клиенты»
    expect(screen.getAllByText(participants.buyer.name)).toHaveLength(2)
    expect(screen.getByText('Закреплён за вами')).toBeInTheDocument()
    expect(screen.getByText(/Автор привязки/)).toBeInTheDocument()
  })

  it('сделка по объекту канона с этапом', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText('12,8 млн ₽')).toBeInTheDocument()
    expect(screen.getByText('Этап 2 из 4')).toBeInTheDocument()
  })

  it('второй клиент из канона', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText(crm.otherClient.name)).toBeInTheDocument()
  })
})
