'use client'

import Image from 'next/image'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Check,
  ChevronDown,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from './AppStoreButtons'
import { HomeButton } from './HomeButton'
import { Reveal } from './Reveal'
import { ListingScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

const trustItems = [
  ['01', 'App Store и Google Play'],
  ['02', 'Проверка перед публикацией'],
  ['03', 'Сопровождение сделки'],
  ['04', 'Сейчас в Удмуртии'],
] as const

const journey = [
  ['Найти объект', 'Карта, каталог и фильтры'],
  ['Написать', 'Продавцу или риэлтору'],
  ['Договориться о показе', 'В чате по объекту'],
  ['Начать сделку', 'Зафиксировать объект и участников'],
  ['Подписать документы', 'Завершить текущий сценарий'],
] as const

const verificationItems = ['Продавец', 'Документы', 'Цена', 'Характеристики', 'Наличие объекта'] as const

const faqItems = [
  ['Где скачать приложение?', 'Приложение доступно в App Store и Google Play.'],
  ['Приложение бесплатное?', 'Да, покупатели используют приложение бесплатно.'],
  ['В каких регионах доступны объекты?', 'Сейчас актуальные объекты представлены в Удмуртии.'],
  ['Кто проверяет объявления?', 'Перед публикацией команда «БАСТ» проверяет продавца, документы, цену, характеристики и наличие объекта.'],
  ['Можно написать продавцу напрямую?', 'Да. Из карточки объекта можно открыть чат с продавцом или ответственным риэлтором.'],
  ['Как договориться о показе?', 'Согласуйте дату и время в чате по выбранному объекту.'],
  ['Кто помогает с оформлением?', 'К сделке подключаются сотрудники продавца или команда «БАСТ» со своими риэлторами.'],
  ['Какие этапы видит покупатель?', 'Сделка начата, объект выбран, договор готовится, документы подписаны.'],
] as const

function QrMark({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-limestone-50 p-3 text-pine-950 shadow-[0_22px_60px_rgba(0,0,0,0.16)]">
      <QRCodeSVG
        value={value}
        size={112}
        bgColor="#FAF8F2"
        fgColor="#0B1712"
        level="M"
        marginSize={1}
        title={`QR-код: ${label}`}
      />
      <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.14em]">{label}</p>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородный дом рядом с лесом"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.94)_0%,rgba(11,23,18,.74)_42%,rgba(11,23,18,.18)_78%,rgba(11,23,18,.42)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 flex min-h-[100dvh] items-end px-5 pb-16 pt-32 sm:px-8 md:pb-20 lg:px-12">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-limestone-200">
              Мобильная платформа для загородной недвижимости
            </span>
            <h1 className="display-title mt-7 max-w-5xl text-balance">
              Найдите дом.
              <span className="block text-mist-200">Доведите сделку до договора</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
              Покупатели ищут объекты и общаются с продавцами. Риэлторы ведут клиентов. Застройщики управляют обращениями — всё в одной платформе.
            </p>
            <div className="mt-9">
              <AppStoreButtons light />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-limestone-300">
              <span>Бесплатно для покупателей</span>
              <span className="h-1 w-1 rounded-full bg-clay-400" />
              <span>Объекты в Удмуртии</span>
              <HomeButton href={siteLinks.developers} variant="text" className="text-limestone-100">
                Размещаете объекты?
              </HomeButton>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="hidden lg:block">
            <ListingScreen />
          </Reveal>
        </div>
      </div>

      <div className="route-line absolute bottom-9 left-0 right-0 z-10 hidden px-[8vw] lg:flex lg:items-center lg:justify-between">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className={index === 0 ? 'route-node' : 'relative z-10 h-2.5 w-2.5 rounded-full bg-limestone-100/60'} />
        ))}
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-limestone-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="page-container relative">
        <Reveal className="grid gap-10 lg:grid-cols-[0.38fr_1.62fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Основание для доверия</span>
            <p className="mt-5 max-w-xs text-sm leading-6 text-pine-600">
              Без неподтверждённых цифр и обещаний, которых ещё нет в продукте.
            </p>
          </div>
          <div className="route-line grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(([number, title]) => (
              <div key={title} className="relative z-10 bg-limestone-100 py-3 lg:px-4">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-clay-500">{number}</p>
                <p className="mt-4 max-w-[12rem] font-display text-2xl leading-none text-pine-950">{title}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function RoutesSection() {
  const routes: {
    label: string
    title: string
    href: string
    cta: string
    className: string
    image?: boolean
    tags?: string[]
  }[] = [
    {
      label: 'Ищу дом',
      title: 'Найти объект, написать продавцу и следить за договором',
      href: siteLinks.buyers,
      cta: 'Покупателям',
      className: 'lg:col-span-7 lg:row-span-2',
      image: true,
    },
    {
      label: 'Работаю с покупателями',
      title: 'Вести клиентов, рекомендации и сделки с телефона',
      href: siteLinks.agencies,
      cta: 'Агентствам',
      className: 'lg:col-span-5',
      tags: ['Клиенты', 'Рекомендации', 'Сделки'],
    },
    {
      label: 'Продаю объекты',
      title: 'Управлять объектами, обращениями и сотрудниками',
      href: siteLinks.developers,
      cta: 'Застройщикам',
      className: 'lg:col-span-5',
      tags: ['Объекты', 'Обращения', 'Сотрудники'],
    },
  ]

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="page-container relative">
        <Reveal className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Для кого</span>
            <h2 className="section-title mt-6 max-w-4xl">Одна платформа — три рабочих маршрута</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-limestone-300">
            Каждый участник видит свои действия, но объект и договор остаются в общем контексте.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          {routes.map((route, index) => (
            <Reveal key={route.label} delay={index * 0.08} className={route.className}>
              <div className="bezel-dark h-full">
                <div className="bezel-core-dark relative flex h-full min-h-[350px] flex-col overflow-hidden p-7 md:p-9">
                  {route.image && (
                    <>
                      <Image
                        src="/images/verification-house.png"
                        alt=""
                        fill
                        className="object-cover opacity-55"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/[0.45] to-pine-950/10" />
                    </>
                  )}
                  <div className="relative z-10 flex h-full flex-1 flex-col">
                    <span className="eyebrow w-fit bg-white/10 text-limestone-200">{route.label}</span>
                    {route.tags && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {route.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-limestone-200 ring-1 ring-inset ring-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="mt-auto max-w-2xl pt-12 font-display text-4xl leading-[0.98] md:text-5xl">
                      {route.title}
                    </h3>
                    <HomeButton href={route.href} variant="text" className="mt-7 w-fit text-limestone-100">
                      {route.cta}
                    </HomeButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContextSection() {
  const stations = [
    {
      label: 'Объект',
      detail: 'Дом 184 м²',
      mini: (
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pine-950 px-2.5 py-1 text-[11px] font-semibold text-limestone-50">12,8 млн ₽</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sage-500/15 px-2 py-1 text-[10px] font-semibold text-sage-700">
            <Check className="h-3 w-3" strokeWidth={2} /> Проверено
          </span>
        </div>
      ),
    },
    {
      label: 'Чат',
      detail: 'Продавец ответил',
      mini: (
        <div className="max-w-[94%] rounded-2xl rounded-bl-sm bg-mist-100 px-3 py-2 text-[11px] leading-4 text-pine-700">
          Здравствуйте! Дом ещё в&nbsp;продаже?
        </div>
      ),
    },
    {
      label: 'Участники',
      detail: '3 роли в сделке',
      mini: (
        <div className="flex items-center">
          {['АК', 'ИП', 'ОП'].map((initials) => (
            <span
              key={initials}
              className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-mist-200 text-[9px] font-bold text-pine-700 ring-2 ring-limestone-50 first:ml-0"
            >
              {initials}
            </span>
          ))}
          <span className="ml-3 text-[10px] leading-tight text-pine-500">покупатель · риэлтор · продавец</span>
        </div>
      ),
    },
    {
      label: 'Договор',
      detail: 'Готовится',
      mini: (
        <div className="w-full">
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((step) => (
              <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= 2 ? 'bg-clay-500' : 'bg-pine-950/10'}`} />
            ))}
          </div>
          <p className="mt-2 text-[10px] font-semibold text-pine-500">Этап 3 из 4</p>
        </div>
      ),
    },
  ]

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="mx-auto max-w-5xl text-center">
          <span className="eyebrow bg-mist-200 text-pine-700">Единый контекст</span>
          <h2 className="section-title mt-7 text-balance">Объект, переписка и договор остаются связаны</h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-pine-600">
            Покупатель начинает с карточки дома. После старта сделки участники видят ответственных и текущий этап оформления.
          </p>
        </Reveal>

        <Reveal className="route-line mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stations.map((station, index) => (
            <div key={station.label} className="bezel relative z-10 bg-limestone-100">
              <div className="bezel-core flex min-h-[15.5rem] flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className={index === 0 ? 'route-node' : 'h-3 w-3 rounded-full bg-sage-400'} />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-4xl leading-none">{station.label}</h3>
                <p className="mt-2 text-xs text-pine-500">{station.detail}</p>
                <div className="mt-auto pt-6">{station.mini}</div>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <HomeButton href={siteLinks.product} variant="text">Посмотреть возможности</HomeButton>
        </Reveal>
      </div>
    </section>
  )
}

function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_40%,rgba(111,133,117,.22),transparent_38%)]" />
      <div className="section-shell page-container relative">
        <div className="grid gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <Reveal>
            <div className="relative min-h-[530px] overflow-hidden rounded-[2.25rem] bg-sage-700/20 ring-1 ring-inset ring-white/10">
              <Image src="/images/hero-house.png" alt="" fill className="object-cover opacity-38" sizes="(max-width: 1024px) 100vw, 60vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-pine-950/[0.15] via-pine-950/[0.48] to-pine-950" />
              <div className="absolute inset-x-[8%] bottom-[10%] top-[10%]">
                <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden="true">
                  <path d="M45 410 C155 340, 160 220, 290 230 S430 380, 520 260 S630 100, 755 85" fill="none" stroke="rgba(244,240,231,.45)" strokeWidth="2" strokeDasharray="5 10" />
                </svg>
                {[
                  ['10%', '78%'],
                  ['28%', '41%'],
                  ['51%', '65%'],
                  ['69%', '33%'],
                  ['91%', '12%'],
                ].map(([left, top], index) => (
                  <div key={left} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
                    <span className={`block h-4 w-4 rounded-full ${index === 4 ? 'bg-clay-500 ring-8 ring-clay-500/[0.15]' : 'bg-limestone-100 ring-8 ring-white/[0.08]'}`} />
                    <span className="mt-4 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-limestone-200">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-7 left-7 rounded-full bg-limestone-50 px-4 py-2 text-xs font-semibold text-pine-950">
                Маршрут сделки
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Путь покупателя</span>
            <h2 className="section-title mt-7">От поиска дома до подписания документов</h2>
            <div className="mt-10 space-y-5">
              {journey.map(([title, detail], index) => (
                <div key={title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/10 pb-5">
                  <span className="text-xs font-semibold text-clay-400">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-none">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-limestone-300">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <HomeButton href={siteLinks.howItWorks} variant="light" className="mt-9">Посмотреть этапы сделки</HomeButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function VerificationSection() {
  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <Reveal className="bezel">
          <div className="bezel-core flex h-full min-h-[620px] flex-col p-7 md:p-10">
            <span className="eyebrow w-fit bg-clay-500 text-limestone-50">Проверка объектов</span>
            <h2 className="section-title mt-8">Объект проверяется до публикации</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-pine-600">
              Команда проверяет сведения в объявлении до того, как объект увидит покупатель.
            </p>
            <div className="mt-12 divide-y divide-pine-950/[0.08] border-y border-pine-950/[0.08]">
              {verificationItems.map((item, index) => (
                <div key={item} className="flex items-center justify-between py-4">
                  <span className="font-display text-2xl">{item}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-500/[0.12] text-sage-700">
                    <Check className="h-4 w-4" strokeWidth={1.35} />
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-6 text-pine-500">
              Проверка не заменяет юридическую проверку перед покупкой.
            </p>
            <HomeButton href={siteLinks.verification} variant="text" className="mt-auto pt-8">Как проходит проверка</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative min-h-[620px] overflow-hidden rounded-[2.25rem]">
          <Image
            src="/images/verification-house.png"
            alt="Проверяемый загородный дом"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/75 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-sm text-limestone-50">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-200">Статус объявления</p>
              <p className="mt-3 font-display text-4xl leading-none">Проверено командой «БАСТ»</p>
            </div>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay-500 text-white">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.2} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProfessionalsSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-mist-100">
      <div className="page-container relative">
        <Reveal className="mb-14">
          <span className="eyebrow bg-pine-950 text-limestone-50">Для тех, кто ведёт сделку</span>
        </Reveal>
        <div className="grid gap-7 lg:grid-cols-[1.16fr_0.84fr] lg:items-center">
          <Reveal className="bezel">
            <div className="bezel-core p-7 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600">Агентствам</p>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.94] md:text-6xl">Контекст клиента всегда под рукой</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-pine-600">
                Клиенты, рекомендации, чаты, напоминания и этапы сделки остаются в одном мобильном рабочем пространстве.
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {['Клиенты', 'Напоминания', 'Сделки'].map((label) => (
                  <div key={label} className="rounded-[1.25rem] bg-mist-100 p-4">
                    <p className="text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <HomeButton href={siteLinks.agencies} variant="text" className="mt-9">Возможности для агентств</HomeButton>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="bezel-dark lg:translate-y-16">
            <div className="bezel-core-dark p-7 text-limestone-50 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Застройщикам</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.94]">Объекты и обращения в одной системе</h2>
              <p className="mt-6 text-sm leading-7 text-limestone-300">
                Управляйте объявлениями, чатами, ответственными, акциями и сделками по каждому объекту.
              </p>
              <div className="mt-10 rounded-[1.5rem] bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-sage-300">Дом 184 м²</p>
                    <p className="mt-2 text-sm font-semibold">Новое обращение</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-clay-400 ring-8 ring-clay-400/10" />
                </div>
                <div className="mt-6 h-px bg-white/10" />
                <p className="mt-5 text-xs text-limestone-300">Ответственный: отдел продаж</p>
              </div>
              <HomeButton href={siteLinks.developers} variant="text" className="mt-9 text-limestone-50">Возможности для застройщиков</HomeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function OffersSection() {
  const offers = [
    { label: 'Отделка', title: 'Чистовая отделка', note: 'Условия зависят от объекта', rotate: '-rotate-3 lg:translate-y-9' },
    { label: 'Страхование', title: 'Защита на первый год', note: 'После подписания документов', rotate: 'rotate-2' },
    { label: 'Обустройство', title: 'Сертификат партнёра', note: 'Срок указан в предложении', rotate: 'rotate-6 lg:translate-y-12' },
  ]

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(111,133,117,.2),transparent_45%)]" />
      <div className="page-container relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="eyebrow bg-white/[0.08] text-sage-300">Акции и сертификаты</span>
          <h2 className="section-title mt-7 text-balance">Предложения, связанные с объектом или сделкой</h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
          {offers.map((offer, index) => (
            <Reveal key={offer.label} delay={index * 0.08} className={offer.rotate}>
              <div className="flex min-h-[300px] flex-col rounded-[2rem] bg-limestone-100 p-7 text-pine-950 shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
                <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-500">{offer.label}</p>
                <p className="mt-3 font-display text-4xl leading-none">{offer.title}</p>
                <p className="mt-4 text-xs leading-5 text-pine-500">{offer.note}</p>
                <div className="mt-auto border-t border-pine-950/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-pine-400">
                  В приложении «БАСТ»
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 text-center">
          <HomeButton href={siteLinks.buyers} variant="light">Смотреть предложения в приложении</HomeButton>
        </Reveal>
      </div>
    </section>
  )
}

function GeographySection() {
  return (
    <section className="section-shell relative overflow-hidden bg-limestone-100">
      <div className="page-container relative grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-clay-500 text-limestone-50">География</span>
          <h2 className="section-title mt-7">Начинаем с Удмуртии</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-pine-600">
            Сейчас здесь доступны объекты. Новые регионы подключаются вместе с продавцами, агентствами и застройщиками.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <HomeButton href={siteLinks.buyers}>Открыть объекты</HomeButton>
            <HomeButton href={siteLinks.contact} variant="text">Подключить новый регион</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="bezel">
            <div className="bezel-core relative min-h-[500px] overflow-hidden p-6 md:p-10">
              <div className="absolute -right-10 top-10 font-display text-[12rem] leading-none text-pine-950/[0.035] md:text-[18rem]">18</div>
              <svg viewBox="0 0 760 430" className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)]" aria-hidden="true">
                <path d="M75 85 L165 55 L240 95 L310 72 L395 125 L515 115 L630 180 L690 260 L610 340 L505 360 L430 320 L330 350 L235 305 L140 315 L80 245 Z" fill="rgba(111,133,117,.1)" stroke="rgba(23,33,28,.14)" strokeWidth="2" />
                <path d="M355 190 L397 178 L425 208 L410 250 L365 258 L338 228 Z" fill="#0B1712" />
                <path d="M382 219 C455 195 520 210 610 170" fill="none" stroke="rgba(184,103,70,.66)" strokeWidth="2" strokeDasharray="7 8" />
                <path d="M382 219 C300 175 220 160 132 115" fill="none" stroke="rgba(111,133,117,.45)" strokeWidth="2" strokeDasharray="7 8" />
                <circle cx="382" cy="219" r="9" fill="#B86746" />
                <circle cx="610" cy="170" r="6" fill="#D4DDD6" />
                <circle cx="132" cy="115" r="6" fill="#D4DDD6" />
              </svg>
              <div className="absolute bottom-8 left-8 rounded-[1.5rem] bg-pine-950 p-5 text-limestone-50 shadow-[0_24px_70px_rgba(11,23,18,.18)] md:left-10">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-clay-400" strokeWidth={1.2} />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.17em] text-sage-300">Активный регион</p>
                    <p className="mt-1 font-display text-3xl">Удмуртия</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FAQSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="page-container relative grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
        <Reveal className="relative">
          <span className="eyebrow bg-white/[0.08] text-sage-300">FAQ</span>
          <h2 className="section-title mt-7">Вопросы перед установкой</h2>
          <span className="pointer-events-none absolute -bottom-24 left-0 hidden font-display text-[23rem] leading-none text-white/[0.035] lg:block">?</span>
        </Reveal>

        <Reveal delay={0.1} className="bezel-dark">
          <div className="bezel-core-dark divide-y divide-white/10 px-6 md:px-9">
            {faqItems.map(([question, answer], index) => {
              const isOpen = active === index
              return (
                <div key={question}>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-2xl leading-none md:text-3xl">{question}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? 'bg-clay-500 text-white' : 'bg-white/[0.06] text-limestone-200'
                    }`}>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.2} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-sm leading-7 text-limestone-300">{answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-pine-950 text-limestone-50">
      <Image src="/images/cta-house.png" alt="Загородный дом вечером" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.5),rgba(11,23,18,.78)_52%,rgba(11,23,18,.9))]" />
      <div className="section-shell page-container relative flex min-h-[720px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Бесплатно для покупателей</span>
            <h2 className="section-title mt-7 max-w-5xl">Начните поиск дома в «БАСТ»</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-limestone-200">
              Установите приложение, посмотрите объекты в Удмуртии и напишите продавцу или риэлтору.
            </p>
            <AppStoreButtons light className="mt-8" />
          </div>
          <div className="bezel-dark w-fit">
            <div className="bezel-core-dark p-4">
              <div className="flex flex-wrap justify-center gap-3">
                <QrMark value={siteLinks.appStore} label="App Store" />
                <QrMark value={siteLinks.googlePlay} label="Google Play" />
              </div>
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-sage-300">
                Наведите камеру на нужный код
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ReferralSection() {
  const methods = [
    { label: 'Способы закрепления', title: 'Ссылка, инвайт-код или QR на показе', text: 'Клиент выбирает удобный способ, результат один: он привязан к риэлтору.' },
    { label: 'Авторство в сделке', title: 'Видно, кто привёл клиента', text: 'Авторство сохраняется на всех этапах сделки. Спор «чей клиент» закрыт до его начала.' },
    { label: 'Прозрачные бонусы', title: 'Бонус привязан к сделке', text: 'Вознаграждение за реферала считается прозрачно и не теряется при передаче между участниками.' },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Клиент и авторство</span>
            <h2 className="section-title mt-7">Клиент закреплён за тем, кто его привёл</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Риэлтор делится объектом ссылкой, инвайт-кодом или QR-кодом на показе. Клиент открывает — и закрепляется за риэлтором. Дальше авторство сохраняется в сделке, а бонусы за приведённого клиента считаются прозрачно.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {methods.map((method, index) => (
            <Reveal key={method.label} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[320px] flex-col p-7 md:p-9">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600">{method.label}</p>
                  <h3 className="mt-3 font-display text-3xl leading-none md:text-4xl">{method.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-pine-600">{method.text}</p>
                  <div className="mt-auto border-t border-pine-950/10 pt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-pine-400">
                    В приложении «БАСТ»
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <HomeButton href={siteLinks.agencies} variant="text">Подробнее для агентств</HomeButton>
        </Reveal>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <RoutesSection />
        <ContextSection />
        <ReferralSection />
        <JourneySection />
        <VerificationSection />
        <ProfessionalsSection />
        <OffersSection />
        <GeographySection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
