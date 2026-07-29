import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '@/components/home/sections/HeroSection'

describe('HeroSection', () => {
  it('объясняет приложение и три роли одной сделки', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Одно приложение для всей загородной сделки')
    expect(screen.getByText(/Покупатель ищет дом/)).toHaveTextContent(
      'Покупатель ищет дом. Риэлтор ведёт клиента. Застройщик управляет объектами.'
    )
    expect(screen.getByText('БАСТ Недвижимость')).toBeInTheDocument()
    expect(screen.queryByText(/инвестор|банк/i)).not.toBeInTheDocument()
  })

  it('ведёт к продукту и ролям, не показывая магазины приложений', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: 'Посмотреть, как работает' })).toHaveAttribute('href', '#product')
    expect(screen.getByRole('link', { name: 'Выбрать свою роль' })).toHaveAttribute('href', '#roles')
    expect(screen.queryByRole('link', { name: /App Store/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Google Play/i })).not.toBeInTheDocument()
  })

  it('показывает светлую рабочую сцену у загородного дома', () => {
    render(<HeroSection />)
    expect(
      screen.getByRole('img', { name: 'Покупатель и риэлтор обсуждают загородный дом' })
    ).toBeInTheDocument()
  })
})
