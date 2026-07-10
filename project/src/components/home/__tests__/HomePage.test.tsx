import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from '@/components/home/HomePage'

describe('HomePage — порядок «Живой сделки»', () => {
  it('новые секции на месте', () => {
    render(<HomePage />)
    expect(screen.getByText(/Скрольте — сделка идёт/)).toBeInTheDocument()
    expect(screen.getByText(/у профессионалов идёт работа/)).toBeInTheDocument()
    expect(screen.getByText('Объект проверяется до публикации')).toBeInTheDocument()
  })

  it('удалённые секции не рендерятся', () => {
    render(<HomePage />)
    expect(screen.queryByText('Одна платформа — три рабочих маршрута')).not.toBeInTheDocument()
    expect(screen.queryByText('Клиент закреплён за тем, кто его привёл')).not.toBeInTheDocument()
    expect(screen.queryByText(/Предложения, связанные/)).not.toBeInTheDocument()
    expect(screen.queryByText('Основание для доверия')).not.toBeInTheDocument()
  })
})
