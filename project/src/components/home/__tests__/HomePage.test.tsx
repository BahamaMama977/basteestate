import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from '@/components/home/HomePage'

describe('HomePage — обзор платформы', () => {
  it('объясняет платформу, роли и две рабочие поверхности', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('От поиска дома до подписания документов')
    expect(screen.getByRole('heading', { level: 2, name: 'Телефон в поле. Рабочий стол — в офисе.' })).toBeInTheDocument()
    expect(screen.getByText(/Один объект · три стороны/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Три рабочих сценария одной сделки' })).toBeInTheDocument()
    expect(screen.getByText('Объекты видят риэлторы платформы')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Посмотреть путь покупателя' })).toHaveAttribute('href', '/buyers')
  })

  it('показывает выгоды до и после сделки', () => {
    render(<HomePage />)
    expect(screen.getByText('Акции застройщика')).toBeInTheDocument()
    expect(screen.getByText('Сертификаты партнёров')).toBeInTheDocument()
  })

  it('переключает поверхности мышью и стандартными клавишами вкладок', () => {
    render(<HomePage />)
    const mobileTab = screen.getByRole('tab', { name: 'Мобильное приложение' })
    const webTab = screen.getByRole('tab', { name: 'Веб-CRM' })

    expect(mobileTab).toHaveAttribute('aria-selected', 'true')
    expect(mobileTab).toHaveAttribute('tabindex', '0')
    expect(webTab).toHaveAttribute('tabindex', '-1')

    mobileTab.focus()
    fireEvent.keyDown(mobileTab, { key: 'ArrowRight' })
    expect(webTab).toHaveFocus()
    expect(webTab).toHaveAttribute('aria-selected', 'true')
    expect(mobileTab).toHaveAttribute('tabindex', '-1')

    fireEvent.keyDown(webTab, { key: 'Home' })
    expect(mobileTab).toHaveFocus()
    expect(mobileTab).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(mobileTab, { key: 'End' })
    expect(webTab).toHaveFocus()
    expect(webTab).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(webTab, { key: 'ArrowLeft' })
    expect(mobileTab).toHaveFocus()
    expect(mobileTab).toHaveAttribute('aria-selected', 'true')

    fireEvent.click(webTab)
    expect(webTab).toHaveAttribute('aria-selected', 'true')
  })

  it('показывает статус рядом с продуктом, а проверку — до дополнительных выгод', () => {
    render(<HomePage />)
    const productStatus = screen.getByLabelText('Статус платформы')
    expect(within(productStatus).getByText('Доступно')).toBeInTheDocument()
    expect(within(productStatus).getByText('Мобильное приложение')).toBeInTheDocument()
    expect(within(productStatus).getByText('В App Store и Google Play')).toBeInTheDocument()
    expect(within(productStatus).getByText('Сейчас объекты представлены в Удмуртии')).toBeInTheDocument()
    expect(within(productStatus).getByText('Готовится')).toBeInTheDocument()
    expect(within(productStatus).queryByText('01')).not.toBeInTheDocument()

    const verification = screen.getByRole('heading', { name: 'Объявление проходит проверку до публикации' })
    const benefits = screen.getByRole('heading', { name: 'Польза появляется в нужный момент' })
    expect(verification.compareDocumentPosition(benefits) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('ведёт в отдельный покупательский маршрут', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: 'Найти дом' })).toHaveAttribute('href', '/buyers')
    expect(screen.queryByText(/Скрольте — сделка идёт/)).not.toBeInTheDocument()
  })

  it('описывает этапы сделки конкретными действиями', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 2, name: 'От объявления до подписанных документов' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Покупатель открывает объект' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Переписка остаётся у объекта' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Источник обращения и участники зафиксированы' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Все видят текущий этап сделки' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Посмотреть весь путь сделки' })).toHaveAttribute('href', '/how-it-works')
  })

  it('оставляет в FAQ ограничения и честно формулирует финальный выбор', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 2, name: 'Вопросы о платформе' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Где покупатель видит объекты?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Что означает проверка объявления?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Можно ли уже войти в веб-CRM?' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Чем мобильное приложение отличается от веб-CRM?' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Где уже доступны объекты?' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Что бесплатно для покупателя?' }))
    expect(screen.getByRole('region', { name: 'Что бесплатно для покупателя?' })).toHaveTextContent('Приложение бесплатно')
    expect(screen.queryByRole('region', { name: 'Где покупатель видит объекты?' })).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { level: 2, name: 'Продолжите свой сценарий в «БАСТ»' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Найти дом в приложении' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Перейти к риэлторам' })).toHaveAttribute('href', '/realtors')
  })
})
