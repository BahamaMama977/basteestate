import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchScreen } from '@/components/app-screens'
import { demoObject, otherObjects } from '@/lib/demo-deal'

describe('SearchScreen', () => {
  it('первая карточка списка — объект канона', () => {
    render(<SearchScreen />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText(demoObject.price)).toBeInTheDocument()
  })

  it('маркеры карты — цены канона', () => {
    render(<SearchScreen />)
    expect(screen.getByText(demoObject.priceShort)).toBeInTheDocument()
    for (const o of otherObjects) expect(screen.getByText(o.priceShort)).toBeInTheDocument()
  })
})
