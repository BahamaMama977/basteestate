import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DevelopersPage } from '@/components/developers/DevelopersPage'

describe('DevelopersPage', () => {
  it('hero и шесть стадий пути застройщика', () => {
    render(<DevelopersPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('акции и сертификаты дают покупателю больше причин выбрать объект', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Больше причин выбрать ваш объект')).toBeInTheDocument()
    expect(screen.getAllByText(/автоматически/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/сертификаты партнёров/i).length).toBeGreaterThanOrEqual(1)
  })

  it('стадия канала сбыта: все независимые риэлторы-партнёры', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Все риэлторы-партнёры могут продвигать ваши объекты')).toBeInTheDocument()
    expect(screen.getByText(/Независимые риэлторы и агентства/)).toBeInTheDocument()
    expect(screen.getByText(/досках объявлений, своих сайтах, в соцсетях/)).toBeInTheDocument()
  })

  it('финал «Подключите объекты» с CTA и строкой про Удмуртию', () => {
    render(<DevelopersPage />)
    expect(screen.getByText(/Подключите объекты/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Обсудить размещение объектов/ })).toHaveAttribute('href', expect.stringContaining('mailto:bast-it@yandex.ru'))
    expect(screen.getByText(/Сейчас каталог и партнёрская сеть работают в Удмуртии/)).toBeInTheDocument()
    expect(screen.getByText('Что приложить к заявке')).toBeInTheDocument()
    expect(screen.getByText('Каталог, клиенты и сделки — в одном рабочем окне')).toBeInTheDocument()
  })
})
