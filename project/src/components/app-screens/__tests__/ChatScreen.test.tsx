import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatScreen } from '@/components/app-screens'
import { acts, chat, participants } from '@/lib/demo-deal'

describe('ChatScreen', () => {
  it('шапка — продавец из канона', () => {
    render(<ChatScreen />)
    expect(screen.getByText(participants.seller.name)).toBeInTheDocument()
  })

  it('по умолчанию (акт 2) — все сообщения канона', () => {
    render(<ChatScreen />)
    for (const m of chat) expect(screen.getByText(m.text)).toBeInTheDocument()
  })

  it('акт 1 — сообщений ещё нет', () => {
    render(<ChatScreen act={acts[0]} />)
    for (const m of chat) expect(screen.queryByText(m.text)).not.toBeInTheDocument()
  })
})
