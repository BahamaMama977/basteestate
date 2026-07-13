import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CommissionScreen } from '@/components/app-screens'
import { participants } from '@/lib/demo-deal'

describe('CommissionScreen', () => {
  it('показывает авторство клиента и источник закрепления в сделке', () => {
    render(<CommissionScreen />)
    expect(screen.getByText('Авторство клиента')).toBeInTheDocument()
    expect(screen.getByText(participants.realtor.name)).toBeInTheDocument()
    expect(screen.getByText('Персональная ссылка или QR')).toBeInTheDocument()
  })
})
