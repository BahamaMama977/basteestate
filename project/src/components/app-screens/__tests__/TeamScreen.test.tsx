import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamScreen } from '@/components/app-screens'
import { team } from '@/lib/demo-deal'

describe('TeamScreen', () => {
  it('сегменты и члены команды из канона', () => {
    render(<TeamScreen />)
    expect(screen.getByText('Сотрудники')).toBeInTheDocument()
    expect(screen.getByText('Вступление')).toBeInTheDocument()
    for (const m of team) expect(screen.getByText(m.name)).toBeInTheDocument()
  })

  it('заявка на вступление с действиями', () => {
    render(<TeamScreen />)
    expect(screen.getByText('Заявка на вступление')).toBeInTheDocument()
    expect(screen.getByText('Принять')).toBeInTheDocument()
    expect(screen.getByText('Отклонить')).toBeInTheDocument()
  })
})
