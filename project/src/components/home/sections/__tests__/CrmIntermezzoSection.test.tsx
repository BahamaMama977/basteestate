import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CrmIntermezzoSection } from '@/components/home/sections/CrmIntermezzoSection'
import { crm, participants } from '@/lib/demo-deal'

describe('CrmIntermezzoSection', () => {
  it('обе стороны сделки на тёмных экранах', () => {
    render(<CrmIntermezzoSection />)
    expect(screen.getByText('Закреплён за вами')).toBeInTheDocument()
    expect(screen.getByText(crm.inquiry.status)).toBeInTheDocument()
    expect(screen.getAllByText(participants.buyer.name).length).toBeGreaterThanOrEqual(2)
  })

  it('ссылки на разделы агентств и застройщиков', () => {
    render(<CrmIntermezzoSection />)
    expect(screen.getByRole('link', { name: /агентств/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /застройщик/i })).toBeInTheDocument()
  })
})
