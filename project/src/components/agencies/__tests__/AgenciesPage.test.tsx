import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AgenciesPage } from '@/components/agencies/AgenciesPage'
import { verification } from '@/lib/demo-deal'

describe('AgenciesPage — канон', () => {
  it('чек-лист проверки — формулировки канона', () => {
    render(<AgenciesPage />)
    for (const v of verification) expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
  })
})
