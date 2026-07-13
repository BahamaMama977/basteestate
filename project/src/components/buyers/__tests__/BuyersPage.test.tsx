import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyersPage } from '@/components/buyers/BuyersPage'

describe('BuyersPage', () => {
  it('разводит вход со своим риэлтором и без него', () => {
    render(<BuyersPage />)
    expect(screen.getAllByText('Вас пригласил риэлтор').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Нашли дом сами').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/бесплатны для покупателя/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/риэлтор команды «БАСТ»/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/риэлтор-партнёр/i).length).toBeGreaterThanOrEqual(1)
  })

  it('показывает акции до покупки и сертификаты после сделки', () => {
    render(<BuyersPage />)
    expect(screen.getByText('Акции застройщика')).toBeInTheDocument()
    expect(screen.getByText('Сертификаты партнёров')).toBeInTheDocument()
  })

  it('содержит подробный маршрут сделки', () => {
    render(<BuyersPage />)
    expect(screen.getByText('Напишите продавцу из карточки дома')).toBeInTheDocument()
    expect(screen.getByText('Объявление проходит проверку до публикации')).toBeInTheDocument()
  })
})
