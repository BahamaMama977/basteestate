import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VerificationSection } from '@/components/home/sections/VerificationSection'
import { verification } from '@/lib/demo-deal'

describe('VerificationSection', () => {
  it('чек-лист — все пять пунктов канона с подписями', () => {
    render(<VerificationSection />)
    for (const v of verification) {
      expect(screen.getByText(v.label)).toBeInTheDocument()
      expect(screen.getByText(v.caption)).toBeInTheDocument()
    }
  })

  it('дисклеймер о юридической проверке', () => {
    render(<VerificationSection />)
    const disclaimer = screen.getByText(/не заменяет юридическую проверку/)
    expect(disclaimer).toBeInTheDocument()
    expect(disclaimer.parentElement).toHaveClass('lg:bg-graphite/[0.82]')
  })
})
