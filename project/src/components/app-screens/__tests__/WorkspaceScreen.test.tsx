import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WorkspaceScreen } from '@/components/app-screens'
import { crm, participants } from '@/lib/demo-deal'

describe('WorkspaceScreen', () => {
  it('карточка партнёра-клиента из канона', () => {
    render(<WorkspaceScreen />)
    expect(screen.getByText('Рабочее пространство')).toBeInTheDocument()
    expect(screen.getByText(participants.buyer.name)).toBeInTheDocument()
    expect(screen.getByText('Клиент')).toBeInTheDocument()
  })

  it('напоминание из канона', () => {
    render(<WorkspaceScreen />)
    expect(screen.getByText(crm.reminder.text)).toBeInTheDocument()
  })
})
