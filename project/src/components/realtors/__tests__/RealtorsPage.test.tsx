import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorsPage } from '@/components/realtors/RealtorsPage'

describe('RealtorsPage', () => {
  it('hero и шесть стадий пути риэлтора', () => {
    render(<RealtorsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('стадия-дифференциатор: клиент закреплён по ссылке', () => {
    render(<RealtorsPage />)
    expect(screen.getByText('Клиент закрепляется по вашей ссылке')).toBeInTheDocument()
  })

  it('финал «Руководите агентством?» с CTA', () => {
    render(<RealtorsPage />)
    expect(screen.getByText(/Руководите агентством/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Подключить агентство/ })).toBeInTheDocument()
  })
})
