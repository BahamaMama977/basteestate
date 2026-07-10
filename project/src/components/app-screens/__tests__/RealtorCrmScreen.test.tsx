import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorCrmScreen } from '@/components/app-screens'
import { participants } from '@/lib/demo-deal'

describe('RealtorCrmScreen', () => {
  it('клиент из канона закреплён за риэлтором', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText(participants.buyer.name)).toBeInTheDocument()
    expect(screen.getByText('Закреплён за вами')).toBeInTheDocument()
    expect(screen.getByText(/Автор привязки/)).toBeInTheDocument()
  })

  it('сделка по объекту канона с этапом', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText('12,8 млн ₽')).toBeInTheDocument()
    expect(screen.getByText('Этап 2 из 4')).toBeInTheDocument()
  })
})
