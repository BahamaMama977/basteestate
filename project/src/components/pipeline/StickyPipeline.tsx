'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type PipelineStage = {
  id: string
  kicker: string
  title: string
  text: string
  panel: ReactNode
  extras?: ReactNode
}

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * Sticky-хореография ролевого конвейера. Текст стадий слева, sticky-панель справа.
 * Смена панели — прерываемый крослейд (все слои смонтированы, переключение
 * ретаргетит CSS-transition от текущего состояния; только opacity/transform).
 *
 * Слои сложены в одну grid-ячейку: высота стека = самая высокая панель, поэтому
 * панели могут быть разной высоты (телефон-экраны или карточки). Подписи — в пропах:
 * `caption={null}` для панелей, которые не являются экранами приложения.
 */
export function StickyPipeline({
  stages,
  caption = 'Живой экран приложения',
  mobileCaption = 'Экран приложения · демо-данные',
}: {
  stages: PipelineStage[]
  caption?: string | null
  mobileCaption?: string | null
}) {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? '')
  const blockRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.stage
            if (id) setActiveId(id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blockRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (stages.length === 0) return null

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_minmax(360px,0.9fr)]">
      {/* Текст стадий */}
      <div className="space-y-24 lg:space-y-[42vh]">
        {stages.map((stage) => (
          <article
            key={stage.id}
            data-stage={stage.id}
            ref={(el) => {
              if (el) blockRefs.current.set(stage.id, el)
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">{stage.kicker}</p>
            <h3 className="section-heading mt-4">{stage.title}</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{stage.text}</p>
            {stage.extras}

            {/* Мобильный кадр */}
            <div className="mt-8 lg:hidden">
              {stage.panel}
              {mobileCaption && (
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                  {mobileCaption}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Sticky-панель: прерываемый крослейд, только opacity/transform */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          {/* Grid-стек: все слои в одной ячейке, высота = самая высокая панель */}
          <div className="grid">
            {stages.map((stage) => {
              const active = stage.id === activeId
              // Неактивный слой — вне a11y-дерева и tab-порядка. React 18 рендерит
              // inert только как строковый атрибут; типы 18.3 объявляют boolean.
              // ВНИМАНИЕ при апгрейде на React 19: там inert — нативный boolean-проп,
              // и пустая строка '' станет falsy — атрибут перестанет рендериться.
              // Заменить на inert={!active} (т.е. { inert: true }) без каста типов.
              const inertProps = active ? {} : { inert: '' as unknown as boolean }
              return (
                <div
                  key={stage.id}
                  {...inertProps}
                  className="col-start-1 row-start-1 motion-safe:transition-[opacity,transform] motion-safe:duration-[260ms]"
                  style={{
                    transitionTimingFunction: EASE,
                    opacity: active ? 1 : 0,
                    transform: active ? 'none' : 'translateY(8px) scale(0.99)',
                    pointerEvents: active ? 'auto' : 'none',
                  }}
                >
                  {stage.panel}
                </div>
              )
            })}
          </div>
          {caption && (
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
