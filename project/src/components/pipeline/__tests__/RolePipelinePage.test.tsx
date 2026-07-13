import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import type { PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  { id: 'a', kicker: 'Шаг 01', title: 'Стадия А', text: 'Текст А', panel: <div>ПАНЕЛЬ-A</div> },
  { id: 'b', kicker: 'Шаг 02', title: 'Стадия Б', text: 'Текст Б', panel: <div>ПАНЕЛЬ-B</div> },
]

describe('RolePipelinePage', () => {
  it('hero, стадии и финал на месте', () => {
    render(
      <RolePipelinePage
        eyebrow="Риэлторам"
        title="Заголовок конвейера"
        subtitle="Подзаголовок конвейера"
        stages={stages}
        finale={<section>ФИНАЛ-БЛОК</section>}
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Заголовок конвейера')
    expect(screen.getByText('Стадия А')).toBeInTheDocument()
    expect(screen.getByText('Стадия Б')).toBeInTheDocument()
    expect(screen.getByText('ФИНАЛ-БЛОК')).toBeInTheDocument()
  })
})
