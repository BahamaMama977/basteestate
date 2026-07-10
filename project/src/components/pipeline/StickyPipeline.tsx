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
 */
export function StickyPipeline({ stages }: { stages: PipelineStage[] }) {
  const [activeId, setActiveId] = useState(stages[0].id)
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
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                Экран приложения · демо-данные
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Sticky-панель: прерываемый крослейд, только opacity/transform */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative">
            {/* Сайзер задаёт высоту (все панели одной высоты) */}
            <div className="invisible" aria-hidden="true">
              {stages[0].panel}
            </div>
            {stages.map((stage) => {
              const active = stage.id === activeId
              return (
                <div
                  key={stage.id}
                  className="absolute inset-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[260ms]"
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
            <p className="absolute inset-x-0 top-full mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
              Живой экран приложения
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
