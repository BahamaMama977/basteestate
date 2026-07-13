'use client'

import { useState } from 'react'
import { Link2, MessageCircle, UserRoundCheck } from 'lucide-react'
import { BuyerDirectEntryScreen, ReferralAcceptScreen } from '@/components/app-screens'
import { Reveal } from '@/components/home/Reveal'

const routes = [
  {
    id: 'direct',
    label: 'Нашли дом сами',
    title: 'Сначала — застройщик. Затем подключается риэлтор «БАСТ»',
    text: 'Напишите застройщику из объявления. К сделке подключится риэлтор команды «БАСТ»: поможет договориться о показе и проведёт оформление. Покупатель не платит за его сопровождение.',
    note: 'Риэлтор команды «БАСТ»',
    icon: MessageCircle,
    screen: <BuyerDirectEntryScreen />,
  },
  {
    id: 'partner',
    label: 'Вас пригласил риэлтор',
    title: 'Клиент закрепляется за риэлтором-партнёром',
    text: 'Откройте персональную ссылку или QR риэлтора-партнёра «БАСТ». Он останется ответственным по клиенту и проведёт сделку до подписания документов.',
    note: 'Риэлтор-партнёр «БАСТ»',
    icon: Link2,
    screen: <ReferralAcceptScreen />,
  },
] as const

export function BuyerEntryForkSection() {
  const [activeId, setActiveId] = useState<(typeof routes)[number]['id']>('direct')
  const activeRoute = routes.find((route) => route.id === activeId) ?? routes[0]

  return (
    <section className="section-shell overflow-hidden bg-app-inset">
      <div className="page-container">
        <Reveal className="max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">Как начинается сделка</p>
          <h2 className="section-title mt-5">Два способа начать.<span className="block">Один путь до документов.</span></h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-graphite/70">
            Ответственный риэлтор зависит от того, как покупатель пришёл в «БАСТ». После подключения риэлтора оба сценария продолжаются в одной сделке.
          </p>
        </Reveal>

        <div className="mt-10 lg:hidden">
          <div className="grid grid-cols-2 rounded-full border border-graphite/10 bg-paper p-1" aria-label="Способ входа в сделку">
            {routes.map((route) => (
              <button
                key={route.id}
                type="button"
                aria-pressed={activeId === route.id}
                onClick={() => setActiveId(route.id)}
                className={`min-h-11 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand ${activeId === route.id ? 'bg-app-brand text-white' : 'text-graphite/65'}`}
              >
                {route.label}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-[2rem] border border-graphite/10 bg-paper p-5 shadow-soft">
            <div className="mx-auto max-w-[280px]">{activeRoute.screen}</div>
            <p className="mt-6 font-heading text-2xl font-semibold tracking-[-0.03em]">{activeRoute.title}</p>
            <p className="mt-3 text-sm leading-6 text-graphite/70">{activeRoute.text}</p>
          </div>
        </div>

        <div className="mt-14 hidden gap-5 lg:grid lg:grid-cols-2">
          {routes.map((route, index) => {
            const Icon = route.icon
            return (
              <Reveal key={route.id} delay={index * 0.06} className="h-full">
                <article className="grid h-full overflow-hidden rounded-[2rem] border border-graphite/10 bg-paper xl:grid-cols-[minmax(0,.8fr)_minmax(300px,1fr)]">
                  <div className="flex flex-col justify-between p-8 xl:p-10">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-app-brand">
                        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                        {route.label}
                      </div>
                      <h3 className="card-title mt-6">{route.title}</h3>
                      <p className="mt-5 text-sm leading-7 text-graphite/70">{route.text}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-3 border-t border-graphite/10 pt-5 text-sm font-semibold text-graphite">
                      <UserRoundCheck className="h-5 w-5 text-app-brand" strokeWidth={1.6} aria-hidden="true" />
                      {route.note}
                    </div>
                  </div>
                  <div className="grid min-h-[680px] place-items-center bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.95),transparent_32%),linear-gradient(180deg,#edf3f0,#e4e9e5)] p-8">
                    <div className="w-full max-w-[310px]">{route.screen}</div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 flex items-start gap-4 border-y border-graphite/10 py-6">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-app-brand" aria-hidden="true" />
          <p className="max-w-3xl text-sm leading-7 text-graphite/70">
            Дальше маршрут совпадает: объект, переписка, участники, подготовка договора и подписанные документы остаются в одной сделке.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
