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

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

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
  mobileCaption = 'Экран приложения',
  headingLevel = 2,
}: {
  stages: PipelineStage[]
  caption?: string | null
  mobileCaption?: string | null
  headingLevel?: 2 | 3
}) {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? '')
  const [revealedPieces, setRevealedPieces] = useState<Set<string>>(() => new Set())
  const blockRefs = useRef<Map<string, HTMLElement>>(new Map())
  const textPieceRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    let frame = 0
    const updateActiveStage = () => {
      frame = 0
      const anchor = window.innerHeight * 0.5
      let closestId = stages[0]?.id ?? ''
      let closestDistance = Number.POSITIVE_INFINITY

      blockRefs.current.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - anchor)
        if (distance < closestDistance) {
          closestDistance = distance
          closestId = el.dataset.stage ?? closestId
        }
      })

      if (closestId) setActiveId((current) => current === closestId ? current : closestId)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveStage)
    }

    updateActiveStage()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [stages])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleKeys = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => (entry.target as HTMLElement).dataset.textPiece)
          .filter((key): key is string => Boolean(key))

        if (visibleKeys.length === 0) return
        setRevealedPieces((current) => {
          const next = new Set(current)
          visibleKeys.forEach((key) => next.add(key))
          return next
        })

        for (const entry of entries) {
          if (entry.isIntersecting) observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    )
    textPieceRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (stages.length === 0) return null
  const StageHeading = headingLevel === 3 ? 'h3' : 'h2'

  const activeIndex = Math.max(0, stages.findIndex((stage) => stage.id === activeId))

  const panelLayer = (stage: PipelineStage, mobile = false) => {
    const active = stage.id === activeId
    const inertProps = active ? {} : { inert: '' as unknown as boolean }

    return (
      <div
        key={`${mobile ? 'mobile' : 'desktop'}-${stage.id}`}
        {...inertProps}
        className="col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:!transition-none"
        style={{
          transitionTimingFunction: EASE_OUT,
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
        }}
      >
        {stage.panel}
      </div>
    )
  }

  const textPieceState = (key: string, order: number) => {
    const revealed = revealedPieces.has(key)

    return {
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'none' : 'translateY(16px)',
      transitionTimingFunction: EASE_OUT,
      transitionDuration: '240ms',
      transitionDelay: revealed ? `${order * 40}ms` : '0ms',
    }
  }

  const registerTextPiece = (key: string) => (el: HTMLElement | null) => {
    if (el) textPieceRefs.current.set(key, el)
    else textPieceRefs.current.delete(key)
  }

  return (
    <div className="min-w-0">
      {/* Мобильная хореография: один липкий экран меняет состояние по мере прокрутки текста. */}
      <div className="mobile-sticky-stage sticky top-24 z-10 grid h-[56dvh] min-h-[400px] max-h-[500px] place-items-center overflow-hidden rounded-2xl border border-graphite/10 bg-paper/95 shadow-soft backdrop-blur-xl lg:hidden">
        <div className="grid w-full place-items-center">
          {stages.map((stage) => panelLayer(stage, true))}
        </div>
        {mobileCaption && (
          <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/65">
            {mobileCaption}
          </p>
        )}
      </div>

      {/* Десктоп: телефон остаётся справа, меняется только экран внутри него. */}
      <div className="desktop-sticky-stage sticky top-24 z-10 hidden h-[calc(100dvh-6rem)] grid-cols-2 items-center gap-16 lg:grid">
          {stages.map((stage) => (
            <div key={`desktop-panel-${stage.id}`} className="col-span-2 col-start-1 row-start-1 grid grid-cols-2 gap-16">
              <div className="col-start-2 grid justify-items-center">
                <div className="grid">{panelLayer(stage)}</div>
              </div>
            </div>
          ))}
          {caption && (
            <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/65">
              {caption}
            </p>
          )}
      </div>

      {/* Единая копия текста: карточки на мобильном, левая колонка на десктопе. */}
      <div className="relative z-20 lg:-mt-[calc(100dvh-6rem)]">
        {stages.map((stage) => {
          const kickerKey = `${stage.id}-kicker`
          const titleKey = `${stage.id}-title`
          const bodyKey = `${stage.id}-body`
          const extrasKey = `${stage.id}-extras`
          return (
            <article
              key={stage.id}
              data-stage={stage.id}
              data-stage-active={stage.id === activeId ? 'true' : undefined}
              ref={(el) => {
                if (el) blockRefs.current.set(stage.id, el)
              }}
              className="flex min-h-[72dvh] min-w-0 items-end pb-8 lg:grid lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-0"
            >
              <div
                className="pipeline-copy-frame w-full rounded-2xl border border-graphite/10 bg-paper/95 p-5 shadow-soft backdrop-blur-xl lg:col-start-1 lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
              >
                <div ref={registerTextPiece(kickerKey)} data-text-piece={kickerKey} className="motion-safe:transition-[opacity,transform] motion-reduce:!transform-none motion-reduce:!opacity-100" style={textPieceState(kickerKey, 0)}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">{stage.kicker}</p>
                </div>
                <div ref={registerTextPiece(titleKey)} data-text-piece={titleKey} className="mt-4 motion-safe:transition-[opacity,transform] motion-reduce:!transform-none motion-reduce:!opacity-100" style={textPieceState(titleKey, 1)}>
                  <StageHeading className="pipeline-stage-heading">{stage.title}</StageHeading>
                </div>
                <div ref={registerTextPiece(bodyKey)} data-text-piece={bodyKey} className="mt-4 motion-safe:transition-[opacity,transform] motion-reduce:!transform-none motion-reduce:!opacity-100" style={textPieceState(bodyKey, 2)}>
                  <p className="max-w-md text-base leading-7 text-graphite/70">{stage.text}</p>
                </div>
                {stage.extras && (
                  <div
                    ref={registerTextPiece(extrasKey)}
                    data-text-piece={extrasKey}
                    className="motion-safe:transition-[opacity,transform] motion-reduce:!transform-none motion-reduce:!opacity-100"
                    style={textPieceState(extrasKey, 3)}
                  >
                    {stage.extras}
                  </div>
                )}
              </div>
            </article>
          )
        })}
        {/* Даёт финальной стадии дойти до верхней линии телефона до отпускания sticky. */}
        <div className="hidden h-[42dvh] lg:block" aria-hidden="true" />
      </div>
    </div>
  )
}
