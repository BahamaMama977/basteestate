import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorRewardsCatalogScreen } from '@/components/app-screens/RealtorRewardsCatalogScreen'
import { realtorRewardListings } from '@/lib/demo-deal'

describe('RealtorRewardsCatalogScreen', () => {
  it('показывает сумму вознаграждения рядом с каждым объектом', () => {
    render(<RealtorRewardsCatalogScreen />)

    expect(screen.getAllByText('Вознаграждение риэлтора')).toHaveLength(realtorRewardListings.length)
    for (const listing of realtorRewardListings) {
      expect(screen.getByText(listing.title)).toBeInTheDocument()
      expect(screen.getByText(listing.rewardAmount)).toBeInTheDocument()
    }
  })

  it('не раскрывает способ и условия расчёта', () => {
    const { container } = render(<RealtorRewardsCatalogScreen />)

    expect(container).not.toHaveTextContent(/процент|фиксирован|условия|выплачен/i)
    expect(container).not.toHaveTextContent(/\d+(?:[.,]\d+)?\s*%/)
  })
})
