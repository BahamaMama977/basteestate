'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { CircleCheck, Laptop, Link2, MapPin, Smartphone } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { RealtorCrmScreen } from '@/components/app-screens'
import { WebCrmPreview } from './WebCrmPreview'

const surfaces = [
  { id: 'mobile', label: 'Мобильное приложение', icon: Smartphone },
  { id: 'web', label: 'Веб-CRM', icon: Laptop },
] as const

const productStatus = [
  {
    status: 'Доступно',
    title: 'Мобильное приложение',
    text: 'В App Store и Google Play',
    icon: Smartphone,
    iconClass: 'border-app-brand/15 bg-app-brand-soft text-app-brand',
    statusClass: 'bg-app-brand-soft text-app-brand',
  },
  {
    status: 'География',
    title: 'Удмуртия',
    text: 'Объекты представлены в Удмуртии',
    icon: MapPin,
    iconClass: 'border-graphite/10 bg-app-inset text-graphite/70',
    statusClass: 'bg-app-inset text-graphite/65',
  },
  {
    status: 'Для команд',
    title: 'Веб-CRM',
    text: 'Удобные инструменты для застройщика и риэлтора',
    icon: Laptop,
    iconClass: 'border-app-warn/15 bg-app-gold-soft text-app-warn',
    statusClass: 'bg-app-gold-soft text-app-warn',
  },
] as const

function SurfaceNote({
  className,
  label,
  title,
  children,
}: {
  className: string
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <div className={`absolute hidden w-64 rounded-[1.5rem] border border-graphite/10 bg-paper/90 p-5 shadow-soft backdrop-blur-xl xl:block ${className}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-app-brand">{label}</p>
      <p className="mt-3 font-heading text-xl font-semibold tracking-[-0.02em] text-graphite">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

/** Product theater: одна большая сцена вместо двух одинаково важных превью. */
export function ProductSurfacesSection() {
  const [active, setActive] = useState<(typeof surfaces)[number]['id']>('mobile')
  const [animateSwitch, setAnimateSwitch] = useState(true)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const hiddenPanelProps = { inert: '' as unknown as boolean }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % surfaces.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + surfaces.length) % surfaces.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = surfaces.length - 1

    if (nextIndex === null) return

    event.preventDefault()
    setAnimateSwitch(false)
    setActive(surfaces[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section
      id="product"
      className="scroll-mt-24 overflow-hidden bg-paper px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32"
    >
      <div className="page-container">
        <Reveal className="mx-auto max-w-5xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">Одна платформа · две поверхности</p>
            <h2 className="section-title mx-auto mt-5 max-w-4xl">Приложение — на выезде.<span className="block">Веб-CRM — в офисе.</span></h2>
            <div className="mt-8 inline-flex rounded-full border border-graphite/10 bg-app-inset p-1" role="tablist" aria-label="Поверхности платформы" aria-orientation="horizontal">
              {surfaces.map((surface, index) => {
                const Icon = surface.icon
                const selected = active === surface.id
                return (
                  <button
                    key={surface.id}
                    ref={(node) => { tabRefs.current[index] = node }}
                    id={`surface-tab-${surface.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`surface-panel-${surface.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => {
                      setAnimateSwitch(true)
                      setActive(surface.id)
                    }}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ${animateSwitch ? 'transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100' : 'transition-none'} ${selected ? 'bg-app-brand text-white shadow-green-glow' : 'text-graphite/65 hover:text-graphite'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand focus-visible:ring-offset-2`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    {surface.label}
                  </button>
                )
              })}
            </div>
        </Reveal>

        <div className="relative mt-10 min-h-[620px] overflow-hidden rounded-[2rem] border border-graphite/10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.92),transparent_28%),radial-gradient(circle_at_50%_35%,rgba(47,107,95,.18),transparent_58%),linear-gradient(180deg,#edf3f0,#e4e9e5)] shadow-[0_35px_100px_-50px_rgba(15,18,23,.35)] md:min-h-[740px]">
          <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-px bg-gradient-to-r from-transparent via-app-brand/15 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-[-38%] left-1/2 aspect-square w-[72%] -translate-x-1/2 rounded-full border border-app-brand/10" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-[-27%] left-1/2 aspect-square w-[58%] -translate-x-1/2 rounded-full border border-app-brand/10" aria-hidden="true" />
          <div
            id="surface-panel-mobile"
            role="tabpanel"
            aria-labelledby="surface-tab-mobile"
            aria-hidden={active !== 'mobile'}
            tabIndex={active === 'mobile' ? 0 : -1}
            className={`absolute inset-0 grid place-items-center px-5 pt-10 ${animateSwitch ? 'transition-[opacity,transform] duration-200 ease-[var(--ease-out)] motion-reduce:transition-opacity' : 'transition-none'} ${active === 'mobile' ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0'}`}
            {...(active !== 'mobile' ? hiddenPanelProps : {})}
          >
            <SurfaceNote className="left-[6%] top-[18%]" label="Клиент" title="Мария Соколова">
              <div className="flex items-center gap-2 text-sm text-app-brand">
                <CircleCheck className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                <span>Закреплена за риэлтором</span>
              </div>
            </SurfaceNote>
            <SurfaceNote className="right-[6%] top-[27%]" label="Источник" title="Персональная ссылка">
              <div className="flex items-center gap-2 text-sm text-graphite/65">
                <Link2 className="h-4 w-4 text-app-brand" strokeWidth={1.7} aria-hidden="true" />
                <span>Авторство сохраняется</span>
              </div>
            </SurfaceNote>
            <SurfaceNote className="bottom-[12%] right-[10%]" label="Сделка № 1042" title="Объект выбран">
              <div className="grid grid-cols-4 gap-1.5" aria-label="Этап 2 из 4">
                <span className="h-1.5 rounded-full bg-app-brand" />
                <span className="h-1.5 rounded-full bg-app-brand" />
                <span className="h-1.5 rounded-full bg-graphite/10" />
                <span className="h-1.5 rounded-full bg-graphite/10" />
              </div>
            </SurfaceNote>

            <div className="relative z-[1] w-full max-w-[250px] md:max-w-[340px]">
              <RealtorCrmScreen />
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/60">Мобильное приложение · работает сейчас</p>
            </div>
          </div>
          <div
            id="surface-panel-web"
            role="tabpanel"
            aria-labelledby="surface-tab-web"
            aria-hidden={active !== 'web'}
            tabIndex={active === 'web' ? 0 : -1}
            className={`absolute inset-0 grid place-items-center px-4 py-10 md:px-10 ${animateSwitch ? 'transition-[opacity,transform] duration-200 ease-[var(--ease-out)] motion-reduce:transition-opacity' : 'transition-none'} ${active === 'web' ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0'}`}
            {...(active !== 'web' ? hiddenPanelProps : {})}
          >
            <div className="w-full max-w-6xl">
              <WebCrmPreview />
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/60">Веб-CRM · для профессиональных команд</p>
            </div>
          </div>
        </div>

        <Reveal className="mt-8 border-y border-graphite/10">
          <div className="grid md:grid-cols-3" aria-label="Статус платформы">
            {productStatus.map((item, index) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className={`py-7 md:px-8 ${index > 0 ? 'border-t border-graphite/10 md:border-l md:border-t-0' : ''} ${index === 0 ? 'md:pl-0' : ''}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${item.iconClass}`} aria-hidden="true">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${item.statusClass}`}>{item.status}</span>
                  </div>
                  <h3 className="mt-7 font-heading text-2xl font-semibold tracking-[-0.025em] text-graphite">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-graphite/70">{item.text}</p>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
