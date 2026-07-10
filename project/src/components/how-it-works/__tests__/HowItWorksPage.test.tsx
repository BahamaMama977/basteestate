import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HowItWorksPage } from '@/components/how-it-works/HowItWorksPage'
import { stages, verification } from '@/lib/demo-deal'

describe('HowItWorksPage', () => {
  it('все пять актов покадрово', () => {
    render(<HowItWorksPage />)
    for (const label of [/Акт 01/, /Акт 02/, /Акт 03/, /Акт 04/, /Акт 05/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('этапы и чек-лист проверки из канона', () => {
    render(<HowItWorksPage />)
    expect(screen.getAllByText(stages[2].label).length).toBeGreaterThanOrEqual(1)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('экраны демо-сделки на месте', () => {
    render(<HowItWorksPage />)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
