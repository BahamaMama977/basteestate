import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SharesApplyScreen } from '@/components/app-screens'
import { demoObject, promo } from '@/lib/demo-deal'

describe('SharesApplyScreen', () => {
  it('пакетный выбор объявлений для акции канона', () => {
    render(<SharesApplyScreen />)
    expect(screen.getByText('Выберите объявления')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(promo.title))).toBeInTheDocument()
    expect(screen.getByText('Выбрать все')).toBeInTheDocument()
  })

  it('строка объявления с ценой из канона', () => {
    render(<SharesApplyScreen />)
    expect(screen.getAllByText(demoObject.price).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Сохранить')).toBeInTheDocument()
  })
})
