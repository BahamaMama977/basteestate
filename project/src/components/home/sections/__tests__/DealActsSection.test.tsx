import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { verification } from '@/lib/demo-deal'

describe('DealActsSection', () => {
  it('четыре общих этапа после подключения риэлтора', () => {
    render(<DealActsSection />)
    expect(screen.getByRole('heading', { name: 'Как проходит сделка' })).toBeInTheDocument()
    for (const label of [/Общий путь 01/, /Общий путь 02/, /Общий путь 03/, /Общий путь 04/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('акт 4 несёт чек-лист проверки из канона', () => {
    render(<DealActsSection />)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('в хореографии присутствуют экраны общей части сделки', () => {
    render(<DealActsSection />)
    expect(screen.getAllByText('Этап 2 из 4').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
