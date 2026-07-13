import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ListingStatsScreen } from '@/components/app-screens'
import { listingStats } from '@/lib/demo-deal'

describe('ListingStatsScreen', () => {
  it('KPI-плитки аудитории из канона', () => {
    render(<ListingStatsScreen />)
    expect(screen.getByText('Статистика')).toBeInTheDocument()
    expect(screen.getByText('Просмотры')).toBeInTheDocument()
    expect(screen.getByText('Закрепления')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${listingStats.views}`))).toBeInTheDocument()
  })

  it('CTA создать сделку', () => {
    render(<ListingStatsScreen />)
    expect(screen.getByText('Создать сделку')).toBeInTheDocument()
  })
})
