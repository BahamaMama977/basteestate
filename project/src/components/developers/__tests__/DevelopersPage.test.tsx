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

  it('стадия-дифференциатор: акция применяется пакетно', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Одна акция — сразу на несколько объявлений')).toBeInTheDocument()
  })

  it('стадия канала сбыта: все риэлторы платформы', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Откройте объекты риэлторам платформы')).toBeInTheDocument()
  })

  it('финал «Подключите объекты» с CTA и строкой про Удмуртию', () => {
    render(<DevelopersPage />)
    expect(screen.getByText(/Подключите объекты/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Обсудить подключение/ })).toBeInTheDocument()
    expect(screen.getByText(/Честно о географии/)).toBeInTheDocument()
    expect(screen.getByText('Что приложить к заявке')).toBeInTheDocument()
    expect(screen.getByText('Каталог, клиенты и сделки — в одном рабочем окне')).toBeInTheDocument()
  })
})
