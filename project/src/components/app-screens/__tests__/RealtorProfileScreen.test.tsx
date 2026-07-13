import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorProfileScreen } from '@/components/app-screens'
import { participants, realtorStats } from '@/lib/demo-deal'

describe('RealtorProfileScreen', () => {
  it('имя, роль и рейтинг риэлтора', () => {
    render(<RealtorProfileScreen />)
    expect(screen.getByText(participants.realtor.name)).toBeInTheDocument()
    expect(screen.getByText('Риэлтор')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(realtorStats.rating))).toBeInTheDocument()
  })

  it('статистика сделок и объектов', () => {
    render(<RealtorProfileScreen />)
    expect(screen.getByText(new RegExp(`${realtorStats.deals}`))).toBeInTheDocument()
  })
})
