import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RewardsScreen } from '@/components/app-screens'
import { bonuses } from '@/lib/demo-deal'

describe('RewardsScreen', () => {
  it('все скидочные сертификаты с категориями', () => {
    render(<RewardsScreen />)
    for (const b of bonuses) {
      expect(screen.getByText(b.title)).toBeInTheDocument()
    }
    expect(screen.getAllByText('Скидка')).toHaveLength(bonuses.length)
  })

  it('заголовок скидочных сертификатов', () => {
    render(<RewardsScreen />)
    expect(screen.getByText('Скидочные сертификаты')).toBeInTheDocument()
  })
})
