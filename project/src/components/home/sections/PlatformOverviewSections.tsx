'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Gift, Tag } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { ChatScreen, DealScreen, SearchScreen } from '@/components/app-screens'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { acts } from '@/lib/demo-deal'
import { siteLinks } from '@/lib/site'

function CinematicPhotoReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0.94, transform: 'scale(1.018)' }}
      whileInView={reduced ? undefined : { opacity: 1, transform: 'scale(1)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.64, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const roles = [
  {
    label: 'Покупателю',
    text: 'Найдите проверенный загородный дом и следите за сделкой до подписания документов.',
    href: siteLinks.buyersPipeline,
    cta: 'Посмотреть путь покупателя',
  },
  {
    label: 'Риэлтору',
    text: 'Закрепляйте клиента по своей ссылке и сохраняйте авторство на всех этапах сделки.',
    href: siteLinks.realtors,
    cta: 'Посмотреть путь риэлтора',
  },
  {
    label: 'Застройщику',
    text: 'Управляйте объектами, обращениями и сделками в одной платформе.',
    href: siteLinks.developers,
    cta: 'Посмотреть путь застройщика',
  },
] as const

const roleLayouts = [
  'lg:grid-cols-[1.08fr_.92fr]',
  'lg:grid-cols-[.9fr_1.1fr]',
  'lg:grid-cols-[1fr_1fr]',
] as const

function RoleVisual({ index }: { index: number }) {
  const images = [
    {
      src: '/images/generated/bast-role-buyer-day-real-v2.webp',
      alt: 'Покупатели изучают загородный дом в приложении',
      position: 'object-center',
    },
    {
      src: '/images/generated/bast-role-realtor-day-real-v2.webp',
      alt: 'Риэлтор обсуждает загородный дом с покупателями',
      position: 'object-center',
    },
    {
      src: '/images/generated/bast-role-developer-day-real-v2.webp',
      alt: 'Команда застройщика управляет объектами посёлка',
      position: 'object-center',
    },
  ] as const
  const image = images[index] ?? images[0]

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-app-inset sm:min-h-[340px] lg:min-h-[540px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover ${image.position}`}
        sizes="(min-width: 1024px) 48vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/12 via-transparent to-white/5" aria-hidden="true" />
    </div>
  )
}

export function RoleValueSection() {
  return (
    <section id="roles" className="section-shell scroll-mt-24 overflow-hidden bg-app-inset">
      <div className="page-container">
        <Reveal className="max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">Один объект · три стороны</p>
          <h2 className="section-title mt-5">Три сценария<span className="block">одной сделки</span></h2>
        </Reveal>

        <div className="mt-14 space-y-7">
          {roles.map((role, index) => {
            const imageFirst = index === 1
            return (
              <Reveal
                key={role.label}
                className={`grid overflow-hidden rounded-[2rem] border border-graphite/10 bg-paper ${roleLayouts[index]}`}
              >
                <div className={`flex flex-col p-6 md:p-12 lg:min-h-[500px] lg:justify-between ${imageFirst ? 'lg:order-last' : ''}`}>
                  <h3 className="card-title text-graphite">
                    {role.label}
                  </h3>
                  <div className="mt-10 border-t border-graphite/10 pt-6 md:mt-14 md:pt-8">
                    <p className="max-w-xl font-heading text-lg font-semibold leading-[1.2] tracking-[-0.025em] text-graphite/78 md:text-2xl">
                      {role.text}
                    </p>
                    <HomeButton
                      href={role.href}
                      variant="outline"
                      className="mt-8"
                    >
                      {role.cta}
                    </HomeButton>
                  </div>
                </div>
                <div className={`relative h-[280px] overflow-hidden border-t border-graphite/10 sm:h-[340px] lg:h-auto lg:min-h-[500px] lg:border-t-0 ${imageFirst ? 'lg:order-first lg:border-r' : 'lg:border-l'}`}>
                  <RoleVisual index={index} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const dealSteps = [
  ['01', 'Объект', 'Объявление можно закрепить самостоятельно, по персональной ссылке риэлтора или QR.'],
  ['02', 'Диалог', 'Все вопросы, документы и договорённости хранятся в общем рабочем пространстве.'],
  ['03', 'Участники', 'Риэлтор остаётся закреплён за клиентом, а застройщик видит, от кого пришло обращение и кто ведёт сделку.'],
  ['04', 'Документы', 'После согласования условий участники подписывают документы.'],
] as const

const overviewStages: PipelineStage[] = [
  { id: 'object', kicker: '01 · Объект', title: 'Покупатель выбирает объект', text: dealSteps[0][2], panel: <SearchScreen /> },
  { id: 'dialog', kicker: '02 · Диалог', title: 'Переписка привязана к объекту', text: dealSteps[1][2], panel: <ChatScreen act={acts[1]} /> },
  { id: 'participants', kicker: '03 · Участники', title: 'Источник обращения и участники зафиксированы', text: dealSteps[2][2], panel: <DealScreen act={acts[2]} /> },
  { id: 'documents', kicker: '04 · Документы', title: 'Все видят текущий этап сделки', text: dealSteps[3][2], panel: <DealScreen act={acts[4]} /> },
]

export function DealOverviewSection() {
  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <Reveal className="mx-auto max-w-[1400px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">Как проходит сделка</p>
          <h2 className="story-section-title mt-5">От объявления<span className="block">к подписанным документам</span></h2>
        </Reveal>
        <div className="mt-16">
          <StickyPipeline stages={overviewStages} headingLevel={3} />
        </div>
        <div className="mt-8 text-center"><HomeButton href={siteLinks.howItWorks} variant="text">Посмотреть весь путь сделки</HomeButton></div>
      </div>
    </section>
  )
}

export function DealBenefitsSection() {
  return (
    <section className="section-shell bg-app-inset">
      <div className="page-container">
        <Reveal className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">Вокруг сделки</p>
          <h2 className="section-title mt-5">Польза появляется<span className="block">в нужный момент</span></h2>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-graphite/10 bg-paper shadow-[0_36px_100px_-64px_rgba(15,18,23,.42)]">
          <div className="grid lg:grid-cols-[1.35fr_.85fr]">
            <div className="relative min-h-[520px] overflow-hidden lg:min-h-[680px]">
              <CinematicPhotoReveal className="absolute inset-0">
                <Image src="/images/generated/bast-after-deal-day-real-v2.webp" alt="Покупатели въезжают в новый загородный дом" fill className="object-cover object-center" sizes="(min-width:1024px) 62vw, 100vw" />
              </CinematicPhotoReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10 lg:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">Момент перехода · документы подписаны</p>
                <h3 className="feature-title mt-4 max-w-2xl">После подписания документов открываются скидочные сертификаты партнёров</h3>
              </div>
            </div>

            <div className="grid divide-y divide-graphite/10 border-t border-graphite/10 lg:border-l lg:border-t-0">
              <Reveal className="relative isolate min-h-[310px] overflow-hidden bg-app-brand-soft p-7 md:p-10">
                <Image src="/images/generated/bast-promotion-day-real-v2.webp" alt="" fill className="pointer-events-none -z-[2] object-cover object-center" aria-hidden="true" />
                <div className="absolute inset-0 -z-[1] bg-gradient-to-r from-app-brand-soft via-app-brand-soft/90 to-app-brand-soft/15" aria-hidden="true" />
                <div className="relative flex h-full max-w-sm flex-col justify-end">
                  <Tag className="h-7 w-7 text-app-brand" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-app-brand">До покупки</p>
                  <h3 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em]">Акции застройщика</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/70">Скидка, подарок или дополнительная комплектация видны прямо в объявлении.</p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="relative isolate min-h-[310px] overflow-hidden bg-app-gold-soft p-7 md:p-10">
                <Image src="/images/generated/bast-partner-benefits-day-real-v2.webp" alt="" fill className="pointer-events-none -z-[2] object-cover object-center" aria-hidden="true" />
                <div className="absolute inset-0 -z-[1] bg-gradient-to-r from-app-gold-soft via-app-gold-soft/90 to-app-gold-soft/10" aria-hidden="true" />
                <div className="relative flex h-full max-w-sm flex-col justify-end">
                  <Gift className="h-7 w-7 text-app-warn" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-app-warn">Документы подписаны</p>
                  <h3 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em]">Скидочные сертификаты партнёров</h3>
                  <p className="mt-4 text-sm leading-7 text-graphite/70">Каждому покупателю открывается одинаковый набор скидок на материалы, кухни, заборы, потолки, ландшафтный дизайн и другие товары и работы для дома.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export function CurrentStateSection() {
  const facts = [
    ['Приложение', 'Доступно в App Store и Google Play'],
    ['География', 'Объекты представлены в Удмуртии'],
    ['Веб-CRM', 'Доступна риэлторам, агентствам и застройщикам'],
  ] as const
  return (
    <section className="section-shell bg-app-inset">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Что работает сейчас</span>
          <h2 className="section-heading mt-6">Где и как работает платформа</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-graphite/10 bg-graphite/10 md:grid-cols-3">
          {facts.map(([title, text]) => <div key={title} className="bg-paper p-6"><p className="text-sm font-semibold">{title}</p><p className="mt-3 text-sm leading-7 text-graphite/70">{text}</p></div>)}
        </div>
      </div>
    </section>
  )
}

const platformFaq = [
  ['Где покупатель видит объекты?', 'В мобильном приложении, доступном в App Store и Google Play.'],
  ['Что бесплатно для покупателя?', 'Приложение бесплатно. Если у покупателя нет своего риэлтора, за сопровождение специалиста «БАСТ» он тоже не платит. Банковские, нотариальные и государственные расходы оплачиваются отдельно.'],
  ['Что означает статус «Юридическая чистота проверена»?', 'До публикации юрист проверяет продавца, право собственности, документы-основания, сведения ЕГРН, ограничения и обременения, а также соответствие основных характеристик объекта документам.'],
  ['Как сохраняется авторство риэлтора?', 'Клиент закрепляется по персональной ссылке или QR, а риэлтор остаётся участником связанной с ним сделки.'],
  ['Кому доступна веб-CRM?', 'Веб-CRM доступна риэлторам, агентствам и застройщикам для работы с каталогом, клиентами и сделками.'],
] as const

export function PlatformFAQSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="section-shell bg-paper">
      <div className="page-container grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
        <Reveal><span className="eyebrow bg-app-inset text-graphite/70">Коротко о важном</span><h2 className="section-heading mt-6">Вопросы о платформе</h2></Reveal>
        <Reveal className="divide-y divide-graphite/10 border-y border-graphite/10">
          {platformFaq.map(([question, answer], index) => {
            const open = active === index
            return (
              <div key={question}>
                <button
                  id={`platform-faq-trigger-${index}`}
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand"
                  aria-expanded={open}
                  aria-controls={`platform-faq-${index}`}
                >
                  <span className="font-heading text-lg font-semibold md:text-xl">{question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {open && (
                  <div id={`platform-faq-${index}`} role="region" aria-labelledby={`platform-faq-trigger-${index}`}>
                    <p className="max-w-2xl pb-6 text-sm leading-7 text-graphite/70">{answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export function PlatformFinalCTASection() {
  return (
    <section className="section-shell bg-app-inset">
      <div className="page-container">
        <div className="relative isolate min-h-[680px] overflow-hidden rounded-[2.75rem] border border-graphite/10 bg-paper shadow-[0_40px_120px_-64px_rgba(15,18,23,.42)] lg:min-h-[620px]">
          <Image
            src="/images/generated/bast-role-hero-landscape-day-v2.webp"
            alt=""
            fill
            className="-z-[3] object-cover object-center"
            sizes="(min-width: 1536px) 1440px, calc(100vw - 2rem)"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-[2] bg-gradient-to-b from-paper via-paper/90 to-paper/45 lg:bg-gradient-to-r lg:from-paper lg:via-paper/90 lg:to-paper/15" aria-hidden="true" />
          <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,.12),transparent_38%)]" aria-hidden="true" />

          <div className="relative grid min-h-[680px] gap-12 p-6 sm:p-10 md:p-12 lg:min-h-[620px] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-end lg:p-16">
            <Reveal className="flex h-full max-w-4xl flex-col justify-between">
              <div>
                <span className="eyebrow border border-app-brand/15 bg-app-brand-soft text-app-brand">Выберите роль</span>
                <h2 className="editorial-title mt-6">Продолжите свой сценарий в «БАСТ»</h2>
                <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg md:leading-8">Подключите объекты как застройщик, ведите клиентов как риэлтор или ищите дом в приложении.</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <HomeButton href={siteLinks.developers}>Подключить объекты</HomeButton>
                <HomeButton href={siteLinks.realtors} variant="outline" className="bg-paper/70 backdrop-blur-sm">Перейти к риэлторам</HomeButton>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="flex items-end lg:justify-end">
              <div className="w-full max-w-md rounded-[2rem] border border-white/55 bg-paper/85 p-6 shadow-[0_24px_70px_-42px_rgba(15,18,23,.48)] backdrop-blur-xl md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-app-brand">Покупателю</p>
                <h3 className="mt-4 font-heading text-3xl font-semibold leading-[1.02] tracking-[-0.035em]">Найти дом в приложении</h3>
                <p className="mt-4 text-sm leading-6 text-graphite/70">Приложение бесплатно. Если своего риэлтора нет, сопровождение специалиста «БАСТ» тоже бесплатно.</p>
                <AppStoreButtons className="mt-6" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
