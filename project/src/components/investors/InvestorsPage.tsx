'use client'

import Image from 'next/image'
import {
  BadgeCheck,
  BadgeX,
  Gift,
  Handshake,
  Layers,
  LayoutDashboard,
  MapPin,
  Percent,
  TrendingDown,
  Unlink,
  Wallet,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { siteLinks } from '@/lib/site'

const pitchHref = 'mailto:partners@bast-estate.ru?subject=Запрос Pitch Deck БАСТ'
const financeHref = 'mailto:partners@bast-estate.ru?subject=Запрос финансовой модели БАСТ'

function ScreenshotSlot({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.6rem] bg-pine-900 ring-1 ring-inset ring-white/10 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(111,133,117,.22),transparent_55%)]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-clay-400">
          <Layers className="h-5 w-5" strokeWidth={1.15} />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Экран приложения</p>
        <p className="max-w-[16rem] text-sm leading-6 text-limestone-200">{label}</p>
      </div>
    </div>
  )
}

function InvestorHero() {
  const pillars = [
    ['Маркетплейс на карте', MapPin],
    ['CRM для профи', LayoutDashboard],
    ['Авторство и бонусы', BadgeCheck],
    ['Программа BAST', Handshake],
  ] as const

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородная недвижимость"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.85)_46%,rgba(11,23,18,.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Инвесторам</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Инфраструктура{' '}
            <span className="block text-mist-200">загородной сделки</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Одна платформа связывает покупателей, риэлторов и застройщиков — от поиска объекта до подписания договора. Приложение работает и развивается на рынке загородной недвижимости.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={pitchHref} variant="light" external>
              Запросить Pitch Deck
            </HomeButton>
            <HomeButton href={financeHref} variant="text" external className="text-limestone-100">
              Запросить финмодель
            </HomeButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Приложение в App Store и Google Play</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Старт в Удмуртии</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Материалы — по запросу</span>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="hidden lg:block">
          <div className="bezel-dark mx-auto w-full max-w-[460px]">
            <div className="bezel-core-dark p-6 text-limestone-50 md:p-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что внутри платформы</p>
              <div className="mt-6 space-y-3">
                {pillars.map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-3 rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-clay-400">
                      <Icon className="h-4 w-4" strokeWidth={1.2} />
                    </span>
                    <p className="text-sm font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MarketSection() {
  const problems = [
    { title: 'Разрозненные каналы', text: 'Объект, чат и документы живут отдельно друг от друга.', icon: Unlink },
    { title: 'Потерянное авторство', text: 'Непонятно, кто привёл клиента и кому принадлежит сделка.', icon: BadgeX },
    { title: 'Сделка не доходит до конца', text: 'Без единого контура часть сделок теряется по пути.', icon: TrendingDown },
  ]

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Рынок</span>
            <h2 className="section-title mt-7">Загородная сделка живёт вне единой системы</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Загородная недвижимость остаётся фрагментированной: объекты, переписка и документы разнесены по разным каналам. Из-за этого теряется авторство сделки, а часть сделок не доходит до договора.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {problems.map((p, index) => (
            <Reveal key={p.title} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[300px] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <p.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-14 font-display text-3xl leading-none md:text-4xl">{p.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSection() {
  const pillars = [
    ['Маркетплейс на карте', 'Поиск объектов с фильтрами и чаты по объекту.', MapPin],
    ['CRM для профи', 'Клиенты, объявления и сделки для риэлторов и застройщиков.', LayoutDashboard],
    ['Авторство и бонусы', 'Привязка клиента ссылкой, инвайт-кодом или QR, авторство в сделке.', BadgeCheck],
    ['Программа BAST', 'Маркетплейс свободных сделок между застройщиками и риэлторами.', Handshake],
  ] as const

  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Продукт</span>
          <h2 className="section-title mt-7">Продукт, который уже работает</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-limestone-300">
            БАСТ — не концепт, а работающее приложение: маркетплейс объектов на карте, встроенная CRM для профессионалов, реферальная привязка клиента с сохранением авторства и сквозная сделка до подписания документов.
          </p>
          <div className="mt-10 space-y-4">
            {pillars.map(([title, text, Icon]) => (
              <div key={title} className="flex items-start gap-4 border-b border-white/10 pb-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-clay-400">
                  <Icon className="h-4 w-4" strokeWidth={1.2} />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <HomeButton href={siteLinks.agencies} variant="light">Для агентств</HomeButton>
            <HomeButton href={siteLinks.developers} variant="text" className="text-limestone-100">Для застройщиков</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot label="Карта объектов и карточка сделки" className="min-h-[460px]" />
        </Reveal>
      </div>
    </section>
  )
}

function BusinessModelSection() {
  const streams = [
    { title: 'SaaS-подписки', text: 'Агентства и застройщики платят за рабочее пространство: CRM, объявления, команды.', icon: Wallet },
    { title: 'Комиссии со сделок', text: 'Платформа участвует в сделках, доведённых до договора.', icon: Percent },
    { title: 'Партнёрские программы', text: 'Сертификаты и предложения партнёров вокруг сделки.', icon: Gift },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-clay-500 text-limestone-50">Монетизация</span>
          <h2 className="section-title mt-7">Три источника выручки на одной платформе</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Платформа зарабатывает на профессиональных участниках рынка, а не на покупателях — для них приложение бесплатно.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {streams.map((s, index) => (
            <Reveal key={s.title} delay={index * 0.08}>
              <div className="rounded-[2rem] bg-limestone-50 p-7 shadow-[0_24px_70px_rgba(11,23,18,0.08)]">
                <div className="flex items-center justify-between">
                  <s.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                </div>
                <p className="mt-14 font-display text-4xl leading-none">{s.title}</p>
                <p className="mt-5 text-sm leading-7 text-pine-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm leading-7 text-pine-500">
            Юнит-экономику и разбивку выручки предоставляем в финансовой модели по запросу.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function InvestorsPage() {
  return (
    <>
      <Header />
      <main>
        <InvestorHero />
        <MarketSection />
        <ProductSection />
        <BusinessModelSection />
      </main>
      <Footer />
    </>
  )
}
