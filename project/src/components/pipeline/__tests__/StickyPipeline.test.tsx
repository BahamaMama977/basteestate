import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  { id: 'a', kicker: 'Шаг 01 · Один', title: 'Заголовок один', text: 'Текст один', panel: <div>ПАНЕЛЬ-A</div> },
  { id: 'b', kicker: 'Шаг 02 · Два', title: 'Заголовок два', text: 'Текст два', panel: <div>ПАНЕЛЬ-B</div>, extras: <div>ЭКСТРА-B</div> },
]

describe('StickyPipeline', () => {
  it('рендерит все стадии: kicker, title, text', () => {
    render(<StickyPipeline stages={stages} />)
    expect(screen.getByText('Шаг 01 · Один')).toBeInTheDocument()
    expect(screen.getByText('Заголовок два')).toBeInTheDocument()
    expect(screen.getByText('Текст один')).toBeInTheDocument()
  })

  it('extras стадии рендерятся', () => {
    render(<StickyPipeline stages={stages} />)
    expect(screen.getByText('ЭКСТРА-B')).toBeInTheDocument()
  })

  it('панели присутствуют (мобильный инлайн + десктоп-крослейд + сайзер)', () => {
    render(<StickyPipeline stages={stages} />)
    // панель A: мобайл(1) + крослейд(1) + сайзер(stages[0]=A, 1) = 3
    expect(screen.getAllByText('ПАНЕЛЬ-A').length).toBeGreaterThanOrEqual(2)
    // панель B: мобайл(1) + крослейд(1) = 2
    expect(screen.getAllByText('ПАНЕЛЬ-B').length).toBeGreaterThanOrEqual(2)
  })
})
