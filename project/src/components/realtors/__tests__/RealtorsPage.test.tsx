import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorsPage } from '@/components/realtors/RealtorsPage'

describe('RealtorsPage', () => {
  it('hero и семь стадий пути риэлтора', () => {
    render(<RealtorsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/, /Шаг 07/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('риэлтор заранее видит вознаграждение по каждому объекту', () => {
    render(<RealtorsPage />)
    expect(screen.getByText('Заранее знайте своё вознаграждение')).toBeInTheDocument()
    expect(screen.getAllByText('Вознаграждение риэлтора').length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByText('256 000 ₽').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('300 000 ₽').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('188 000 ₽').length).toBeGreaterThanOrEqual(1)
  })

  it('стадия-дифференциатор: клиент закреплён по ссылке', () => {
    render(<RealtorsPage />)
    expect(screen.getByText('Клиент закрепляется по вашей ссылке')).toBeInTheDocument()
  })

  it('авторство риэлтора сохраняется в контексте сделки', () => {
    render(<RealtorsPage />)
    expect(screen.getByText('Авторство не теряется при передаче клиента')).toBeInTheDocument()
    expect(screen.getAllByText('Персональная ссылка или QR').length).toBeGreaterThanOrEqual(1)
  })

  it('финал «Руководите агентством?» с CTA', () => {
    render(<RealtorsPage />)
    expect(screen.getByText(/Руководите агентством/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Запросить демонстрацию/ })).toHaveAttribute('href', expect.stringContaining('mailto:bast-it@yandex.ru'))
    expect(screen.getByText('Продолжайте работу с командой за рабочим столом')).toBeInTheDocument()
  })

  it('объясняет скачивание материалов для внешнего продвижения', () => {
    render(<RealtorsPage />)
    expect(screen.getByText(/Фото и планировки объявления можно скачать одним архивом/)).toBeInTheDocument()
    expect(screen.getByText(/досках объявлений, собственном сайте, в соцсетях/)).toBeInTheDocument()
  })
})
