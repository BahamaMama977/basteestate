import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreateListingScreen } from '@/components/app-screens'

describe('CreateListingScreen', () => {
  it('шаг «Медиа» с секциями фото', () => {
    render(<CreateListingScreen />)
    expect(screen.getByText('Медиа')).toBeInTheDocument()
    expect(screen.getByText('Фото')).toBeInTheDocument()
    expect(screen.getByText('Планировки')).toBeInTheDocument()
    expect(screen.getByText('3D-визуализации')).toBeInTheDocument()
  })

  it('прогресс мастера и кнопка далее', () => {
    render(<CreateListingScreen />)
    expect(screen.getByText('Далее')).toBeInTheDocument()
    expect(screen.getByText(/из 20 фотографий/)).toBeInTheDocument()
  })
})
