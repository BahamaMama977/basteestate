import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RewardsScreen } from '@/components/app-screens'
import { bonuses } from '@/lib/demo-deal'

describe('RewardsScreen', () => {
  it('все бонусы канона с номиналом и поставщиком', () => {
    render(<RewardsScreen />)
    for (const b of bonuses) {
      expect(screen.getByText(b.title)).toBeInTheDocument()
      expect(screen.getByText(b.value)).toBeInTheDocument()
    }
  })

  it('заголовок бонусов', () => {
    render(<RewardsScreen />)
    expect(screen.getByText('Бонусы')).toBeInTheDocument()
  })
})
