import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '@/components/home/sections/HeroSection'
import { demoObject } from '@/lib/demo-deal'

describe('HeroSection', () => {
  it('антиква-заголовок и подзаголовок трёх аудиторий', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Найдите дом.')
    expect(screen.getByText(/Риэлторы ведут клиентов/)).toBeInTheDocument()
  })

  it('телефон показывает поиск (акт 1) с объектом канона', () => {
    render(<HeroSection />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText(/Акт 01/)).toBeInTheDocument()
  })
})
