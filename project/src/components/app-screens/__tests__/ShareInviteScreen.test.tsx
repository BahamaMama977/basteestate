import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShareInviteScreen } from '@/components/app-screens'
import { referral } from '@/lib/demo-deal'

describe('ShareInviteScreen', () => {
  it('заголовок и реф-ссылка из канона', () => {
    render(<ShareInviteScreen />)
    expect(screen.getByText('Поделиться')).toBeInTheDocument()
    expect(screen.getByText(referral.url)).toBeInTheDocument()
  })

  it('кнопки поделиться и копировать', () => {
    render(<ShareInviteScreen />)
    expect(screen.getByText('Поделиться ссылкой')).toBeInTheDocument()
    expect(screen.getByText('Копировать')).toBeInTheDocument()
  })
})
