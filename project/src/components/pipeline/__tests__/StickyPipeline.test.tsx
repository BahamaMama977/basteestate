import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  { id: 'a', kicker: 'Шаг 01 · Один', title: 'Заголовок один', text: 'Текст один', panel: <div>ПАНЕЛЬ-A</div> },
  { id: 'b', kicker: 'Шаг 02 · Два', title: 'Заголовок два', text: 'Текст два', panel: <div>ПАНЕЛЬ-B</div>, extras: <div>ЭКСТРА-B</div> },
]

describe('StickyPipeline', () => {
  afterEach(() => {
    // unstubAllGlobals снимает и базовый no-op стаб IO из src/test/setup.tsx,
    // поэтому сразу возвращаем no-op — иначе new IntersectionObserver в соседних тестах упадёт.
    vi.unstubAllGlobals()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return []
        }
      },
    )
  })

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

  it('переключение активного слоя по IntersectionObserver', () => {
    // Локальный стаб IO захватывает callback компонента, чтобы дёрнуть его вручную.
    let ioCallback: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void = () => {}
    const observed: Element[] = []
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void) {
          ioCallback = cb
        }
        observe(el: Element) {
          observed.push(el)
        }
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return []
        }
      },
    )

    const { container } = render(<StickyPipeline stages={stages} />)

    // Компонент наблюдает блок стадии 'b'
    const target = container.querySelector('[data-stage="b"]') as HTMLElement
    expect(target).not.toBeNull()
    expect(observed).toContain(target)

    act(() => {
      ioCallback([{ isIntersecting: true, target }])
    })

    // В sticky-панели активный слой (opacity 1, без inert) содержит ПАНЕЛЬ-B
    const layers = Array.from(container.querySelectorAll('.sticky [style*="opacity"]')) as HTMLElement[]
    expect(layers).toHaveLength(stages.length)
    const active = layers.find((l) => l.style.opacity === '1')
    expect(active?.textContent).toContain('ПАНЕЛЬ-B')
    expect(active?.hasAttribute('inert')).toBe(false)
    const inactive = layers.filter((l) => l.style.opacity === '0')
    expect(inactive).toHaveLength(stages.length - 1)
    expect(inactive.every((l) => l.hasAttribute('inert'))).toBe(true)
  })
})
