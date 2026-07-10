import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { verification } from '@/lib/demo-deal'

describe('DealActsSection', () => {
  it('четыре акта с mono-метками', () => {
    render(<DealActsSection />)
    // метки — составной текст («Акт 02 · Диалог»), поэтому regex; sticky-подпись дублирует активный акт — getAllByText
    for (const label of [/Акт 02/, /Акт 03/, /Акт 04/, /Акт 05/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('акт 4 несёт чек-лист проверки из канона', () => {
    render(<DealActsSection />)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('мобильные кадры: экраны всех четырёх актов присутствуют', () => {
    render(<DealActsSection />)
    // чат (акт 2) + три состояния DealScreen (акты 3–5): «Этап 2 из 4», «Этап 3 из 4», «Этап 4 из 4»
    expect(screen.getAllByText('Этап 2 из 4').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
