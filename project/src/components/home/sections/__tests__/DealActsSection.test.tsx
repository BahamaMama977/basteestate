import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { verification } from '@/lib/demo-deal'

describe('DealActsSection', () => {
  it('шесть этапов с mono-метками', () => {
    render(<DealActsSection />)
    for (const label of [/Этап 01/, /Этап 02/, /Этап 03/, /Этап 04/, /Этап 05/, /Этап 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('акт 4 несёт чек-лист проверки из канона', () => {
    render(<DealActsSection />)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('в хореографии присутствуют поиск и экраны всех состояний сделки', () => {
    render(<DealActsSection />)
    expect(screen.getAllByText('247 объявлений').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Этап 2 из 4').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
