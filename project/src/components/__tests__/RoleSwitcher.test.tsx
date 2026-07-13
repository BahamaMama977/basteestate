import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RoleSwitcher } from '@/components/RoleSwitcher'

vi.mock('next/navigation', () => ({ usePathname: () => '/realtors/' }))

describe('RoleSwitcher', () => {
  it('обзор платформы и четыре ролевых маршрута', () => {
    render(<RoleSwitcher />)
    for (const label of ['Платформа', 'Покупателям', 'Риэлторам', 'Застройщикам', 'Инвесторам']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Покупателям' })).toHaveAttribute('href', '/buyers')
  })

  it('активная роль помечена aria-current', () => {
    render(<RoleSwitcher />)
    expect(screen.getByRole('link', { name: 'Риэлторам' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Покупателям' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Инвесторам' })).not.toHaveAttribute('aria-current')
  })
})
