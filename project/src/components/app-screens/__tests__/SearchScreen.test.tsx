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

  it('не показывает профессиональное вознаграждение покупателю', () => {
    render(<SearchScreen />)
    expect(screen.queryByText('Вознаграждение риэлтора')).not.toBeInTheDocument()
  })

  it('добавляет вознаграждение в компактные карточки каталога риэлтора', () => {
    render(<SearchScreen audience="realtor" />)
    expect(screen.getAllByText('Вознаграждение риэлтора')).toHaveLength(2)
    expect(screen.getByText('256 000 ₽')).toBeInTheDocument()
    expect(screen.getByText('300 000 ₽')).toBeInTheDocument()
    expect(screen.queryByText('188 000 ₽')).not.toBeInTheDocument()
  })

  it('раскрывает полный список и фильтры на следующем состоянии каталога', () => {
    const { container } = render(<SearchScreen audience="realtor" view="expanded" />)
    expect(container.querySelector('.catalog-sheet-expanded')).toBeInTheDocument()
    expect(container.querySelector('.catalog-expanded-controls')).toBeInTheDocument()
    expect(screen.getAllByText('Вознаграждение риэлтора')).toHaveLength(3)
    expect(screen.getByText('188 000 ₽')).toBeInTheDocument()
  })
})
