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

  it('показывает разрыв рабочего процесса на рынке', () => {
    render(<InvestorsPage />)
    expect(screen.getByText(/Объект, клиент и договор разнесены/)).toBeInTheDocument()
  })

  it('монетизация обозначена как планируемая, а банки — как направление роста', () => {
    render(<InvestorsPage />)
    expect(screen.getAllByText(/Планируемая модель монетизации/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/банк/i).length).toBeGreaterThanOrEqual(1)
  })

  it('рост включает выход на рынок квартир вместо веб-каталога и персональных подборок', () => {
    render(<InvestorsPage />)
    expect(screen.getAllByText(/Выход на рынок квартир/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/многоэтажных жилых домов/).length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText('Веб-каталог')).not.toBeInTheDocument()
    expect(screen.queryByText('Персональные подборки')).not.toBeInTheDocument()
  })

  it('финал ведёт к встрече без обещания материалов', () => {
    render(<InvestorsPage />)
    expect(screen.getByRole('link', { name: /Запросить встречу/ })).toHaveAttribute('href', expect.stringContaining('mailto:bast-it@yandex.ru'))
    expect(screen.queryByText(/Pitch Deck|финмодел/i)).not.toBeInTheDocument()
  })

  it('подписи «экран приложения» не навешены на карточки', () => {
    render(<InvestorsPage />)
    expect(screen.queryByText('Живой экран приложения')).not.toBeInTheDocument()
  })
})
