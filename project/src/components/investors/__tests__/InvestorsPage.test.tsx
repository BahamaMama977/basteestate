import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InvestorsPage } from '@/components/investors/InvestorsPage'

describe('InvestorsPage', () => {
  it('hero и шесть стадий инвест-истории', () => {
    render(<InvestorsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('рынок описан как сложившаяся ситуация, а не приговор', () => {
    render(<InvestorsPage />)
    expect(screen.getByText(/Сегодня рынок загородной недвижимости живёт разрозненно/)).toBeInTheDocument()
  })

  it('реклама и банки явно обозначены как направления роста', () => {
    render(<InvestorsPage />)
    expect(screen.getAllByText(/Реклама — направление роста/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/банк/i).length).toBeGreaterThanOrEqual(1)
  })

  it('финал: материалы по запросу', () => {
    render(<InvestorsPage />)
    expect(screen.getByRole('link', { name: /Pitch Deck/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /финмодель/i })).toBeInTheDocument()
  })

  it('подписи «экран приложения» не навешены на карточки', () => {
    render(<InvestorsPage />)
    expect(screen.queryByText('Живой экран приложения')).not.toBeInTheDocument()
  })
})
