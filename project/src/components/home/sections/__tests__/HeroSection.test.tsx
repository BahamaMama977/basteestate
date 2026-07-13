import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '@/components/home/sections/HeroSection'

describe('HeroSection', () => {
  it('объясняет платформу и три стороны сделки', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('БАСТ — от поиска дома до подписания документов')
    expect(screen.getByText(/Одна платформа для всех участников рынка/)).toBeInTheDocument()
    expect(screen.getByText('БАСТ Недвижимость')).toBeInTheDocument()
  })

  it('отделяет тезисную сцену от следующей продуктовой демонстрации', () => {
    render(<HeroSection />)
    expect(screen.getByRole('img', { name: 'Загородный дом среди леса' })).toBeInTheDocument()
    expect(screen.getByText('Платформа загородной недвижимости')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Подключить объекты' })).toHaveAttribute('href', '/developers')
  })
})
