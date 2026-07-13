import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReferralAcceptScreen } from '@/components/app-screens'
import { demoObject, participants } from '@/lib/demo-deal'

describe('ReferralAcceptScreen', () => {
  it('объявление закреплено за покупателем', () => {
    render(<ReferralAcceptScreen />)
    expect(screen.getByText('Объявление закреплено')).toBeInTheDocument()
    expect(screen.getByText('Закреплено за вами')).toBeInTheDocument()
  })

  it('карточка объекта и риэлтора из канона', () => {
    render(<ReferralAcceptScreen />)
    expect(screen.getByText(demoObject.priceShort)).toBeInTheDocument()
    expect(screen.getByText(participants.realtor.name)).toBeInTheDocument()
    expect(screen.getByText('Риэлтор-партнёр «БАСТ»')).toBeInTheDocument()
  })
})
