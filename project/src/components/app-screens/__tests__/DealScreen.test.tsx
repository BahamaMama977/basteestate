import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealScreen } from '@/components/app-screens'
import { acts, crm, stages } from '@/lib/demo-deal'

describe('DealScreen', () => {
  it('по умолчанию — этап 3 из 4, «Договор готовится»', () => {
    render(<DealScreen />)
    expect(screen.getByText('Этап 3 из 4')).toBeInTheDocument()
    expect(screen.getByText(stages[2].label)).toBeInTheDocument()
  })

  it('акт 5 — этап 4 из 4, «Документы подписаны»', () => {
    render(<DealScreen act={acts[4]} />)
    expect(screen.getByText('Этап 4 из 4')).toBeInTheDocument()
    expect(screen.getByText(stages[3].label)).toBeInTheDocument()
  })

  it('нигде нет «из 5»', () => {
    render(<DealScreen />)
    expect(screen.queryByText(/из 5/)).not.toBeInTheDocument()
  })

  it('напоминание — из канона', () => {
    render(<DealScreen />)
    expect(screen.getByText(crm.reminder.text)).toBeInTheDocument()
  })
})
