import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyerDirectEntryScreen } from '@/components/app-screens'

describe('BuyerDirectEntryScreen', () => {
  it('показывает прямой сценарий с риэлтором команды БАСТ', () => {
    render(<BuyerDirectEntryScreen />)
    expect(screen.getByText('Риэлтор «БАСТ» подключён')).toBeInTheDocument()
    expect(screen.getByText('Риэлтор команды «БАСТ»')).toBeInTheDocument()
    expect(screen.getByText('Сопровождение без оплаты')).toBeInTheDocument()
  })
})
