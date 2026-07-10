import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DeveloperCrmScreen } from '@/components/app-screens'
import { crm, demoObject } from '@/lib/demo-deal'

describe('DeveloperCrmScreen', () => {
  it('объект канона со статусом проверки', () => {
    render(<DeveloperCrmScreen />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText('Проверено')).toBeInTheDocument()
  })

  it('обращение из канона с ответственным', () => {
    render(<DeveloperCrmScreen />)
    expect(screen.getByText(crm.inquiry.status)).toBeInTheDocument()
    expect(screen.getByText(crm.inquiry.text)).toBeInTheDocument()
    expect(screen.getByText(`Ответственный: ${crm.inquiry.assignee}`)).toBeInTheDocument()
  })
})
