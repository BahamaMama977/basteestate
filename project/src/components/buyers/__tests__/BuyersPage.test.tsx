import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyersPage } from '@/components/buyers/BuyersPage'

describe('BuyersPage', () => {
  it('разводит вход со своим риэлтором и без него', () => {
    render(<BuyersPage />)
    expect(screen.getByText('Вас пригласил риэлтор')).toBeInTheDocument()
    expect(screen.getByText('Вы нашли объект сами')).toBeInTheDocument()
    expect(screen.getAllByText(/за сопровождение специалиста команды «БАСТ» покупатель не платит/i).length).toBeGreaterThanOrEqual(1)
  })

  it('показывает акции до покупки и сертификаты после сделки', () => {
    render(<BuyersPage />)
    expect(screen.getByText('Акции застройщика')).toBeInTheDocument()
    expect(screen.getByText('Сертификаты партнёров')).toBeInTheDocument()
  })

  it('содержит подробный маршрут сделки', () => {
    render(<BuyersPage />)
    expect(screen.getByText('Найдите подходящий дом на карте')).toBeInTheDocument()
    expect(screen.getByText('Объявление проходит проверку до публикации')).toBeInTheDocument()
  })
})
