import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyersPage } from '@/components/buyers/BuyersPage'
import { stages, verification } from '@/lib/demo-deal'

describe('BuyersPage — канон', () => {
  it('чек-лист содержит пункты канона и дополнения страницы', () => {
    render(<BuyersPage />)
    for (const v of verification) expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Обременения')).toBeInTheDocument()
    expect(screen.getByText('Реальность объекта')).toBeInTheDocument()
  })

  it('этапы сделки — из канона', () => {
    render(<BuyersPage />)
    for (const s of stages) expect(screen.getAllByText(s.label).length).toBeGreaterThanOrEqual(1)
  })
})
