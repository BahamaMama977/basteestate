'use client'

import Image from 'next/image'
import {
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  Handshake,
  Home,
  Layers,
  MessageCircle,
  Ruler,
  Ticket,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { siteLinks } from '@/lib/site'

const developerHref = 'mailto:partners@bast-estate.ru?subject=Подключение объектов к БАСТ'

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

function DeveloperHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородный объект застройщика"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.84)_46%,rgba(11,23,18,.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Застройщикам</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Управляйте интересом к объектам{' '}
            <span className="block text-mist-200">до подписания договора</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Публикуйте объекты и подряды, принимайте обращения, назначайте ответственных и доводите сделки до договора — в одной системе.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={developerHref} variant="light" external>
              Обсудить подключение объектов
            </HomeButton>
            <HomeButton href={siteLinks.agencies} variant="text" className="text-limestone-100">
              Как это работает для риэлторов
            </HomeButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Готовые дома и подряды</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Программа BAST</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Сейчас в Удмуртии</span>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="hidden lg:block">
          <div className="bezel-dark mx-auto w-full max-w-[520px]">
            <div className="bezel-core-dark p-5 text-limestone-50 md:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Кабинет застройщика</p>
                  <p className="mt-1 text-sm font-semibold">Объекты и обращения</p>
                </div>
                <Building2 className="h-6 w-6 text-clay-400" strokeWidth={1.1} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[['Готовые дома', Home], ['Подряды', Ruler], ['Обращения', MessageCircle], ['Акции', Ticket]].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof Home
                  return (
                    <div key={label as string} className="rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                      <IconComponent className="h-5 w-5 text-clay-400" strokeWidth={1.15} />
                      <p className="mt-6 text-xs font-semibold">{label as string}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-sage-300">Дом 184 м²</p>
                    <p className="mt-2 text-sm font-semibold">Новое обращение</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-clay-400 ring-8 ring-clay-400/10" />
                </div>
                <p className="mt-5 text-[11px] text-limestone-300">Ответственный: отдел продаж</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CatalogSection() {
  const items = [
    { title: 'Готовые дома', text: 'Объявления с характеристиками, фотографиями и видео построенных объектов.', icon: Home },
    { title: 'Подряды', text: 'Материалы стен с ценой и доступностью, поля участка, планировки и секции 3D.', icon: Ruler },
    { title: 'Посёлки', text: 'Объекты, собранные в единый проект, с общим представлением для покупателя.', icon: Boxes },
  ]

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Каталог</span>
            <h2 className="section-title mt-7">Готовые дома и подряды в одном каталоге</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Публикуйте готовые объекты и контракты-подряды. По подряду покажите материалы, планировки и 3D — покупатель видит проект целиком, ещё до строительства.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[320px] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-14 font-display text-4xl leading-none">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RequestsSection() {
  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Обращения</span>
          <h2 className="section-title mt-7">Покупатель пишет из карточки — команда видит контекст</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-limestone-300">
            Обращение приходит прямо из карточки объекта: сразу понятно, о каком доме речь. Назначьте ответственного и ведите диалог в чате с историей.
          </p>
          <div className="mt-10 space-y-4">
            {[
              ['Контекст обращения', 'Объект, к которому относится вопрос, виден сразу.'],
              ['Ответственные', 'Сотрудник закреплён за обращением и сделкой.'],
              ['Чаты', 'Переписка, статусы «онлайн» и «печатает», поиск по сообщениям.'],
            ].map(([title, text]) => (
              <div key={title} className="flex items-start gap-4 border-b border-white/10 pb-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-clay-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot label="Обращение из карточки объекта и чат с покупателем" className="min-h-[420px]" />
        </Reveal>
      </div>
    </section>
  )
}

function SharesSection() {
  const items = [
    { title: 'Акции на объекте', text: 'Предложение показывается прямо в объявлении.', icon: Ticket },
    { title: 'Сертификаты', text: 'Скидка или условие, привязанные к конкретному дому.', icon: BadgeCheck },
    { title: 'Партнёрский сертификат', text: 'Выдаётся клиенту при завершении сделки.', icon: Handshake },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-clay-500 text-limestone-50">Акции и сертификаты</span>
          <h2 className="section-title mt-7">Акции и сертификаты, привязанные к объектам</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Запускайте акции компании и сертификаты на конкретных объектах. Покупатель видит предложение в карточке, а партнёрский сертификат выдаётся при закрытии сделки.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="rounded-[2rem] bg-limestone-50 p-7 shadow-[0_24px_70px_rgba(11,23,18,0.08)]">
                <div className="flex items-center justify-between">
                  <item.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
                </div>
                <p className="mt-14 font-display text-4xl leading-none">{item.title}</p>
                <p className="mt-5 text-sm leading-7 text-pine-600">{item.text}</p>
                <div className="mt-8 border-t border-pine-950/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-pine-400">
                  В приложении «БАСТ»
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DevelopersPage() {
  return (
    <>
      <Header />
      <main>
        <DeveloperHero />
        <CatalogSection />
        <RequestsSection />
        <SharesSection />
      </main>
      <Footer />
    </>
  )
}
