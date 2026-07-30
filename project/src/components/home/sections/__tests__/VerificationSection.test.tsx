import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VerificationSection } from '@/components/home/sections/VerificationSection'
import { verification } from '@/lib/demo-deal'

describe('VerificationSection', () => {
  it('чек-лист — все шесть пунктов юридической проверки с подписями', () => {
    render(<VerificationSection />)
    for (const v of verification) {
      expect(screen.getByText(v.label)).toBeInTheDocument()
      expect(screen.getByText(v.caption)).toBeInTheDocument()
    }
  })

  it('не показывает удалённый дисклеймер о юридической проверке', () => {
    render(<VerificationSection />)
    expect(screen.queryByText(/не заменяет юридическую проверку/)).not.toBeInTheDocument()
  })
})
