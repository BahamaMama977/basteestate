'use client'

import Image from 'next/image'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ChevronDown, MapPin } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from './AppStoreButtons'
import { HomeButton } from './HomeButton'
import { Reveal } from './Reveal'
import { HeroSection } from './sections/HeroSection'
import { DealActsSection } from './sections/DealActsSection'
import { CrmIntermezzoSection } from './sections/CrmIntermezzoSection'
import { VerificationSection } from './sections/VerificationSection'
import { siteLinks } from '@/lib/site'

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
    <div className="rounded-2xl bg-paper p-3 text-graphite shadow-[0_22px_60px_rgba(0,0,0,0.16)]">
      <QRCodeSVG
        value={value}
        size={112}
        bgColor="#F7F8F5"
        fgColor="#0F1217"
        level="M"
        marginSize={1}
        title={`QR-код: ${label}`}
      />
      <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.14em]">{label}</p>
    </div>
  )
}

function GeographySection() {
  return (
    <section className="section-shell relative overflow-hidden bg-paper">
      <div className="page-container relative grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-app-brand text-white">География</span>
          <h2 className="section-heading mt-6">Начинаем с Удмуртии</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-graphite/70">
            Сейчас здесь доступны объекты. Новые регионы подключаются вместе с продавцами, агентствами и застройщиками.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <HomeButton href={siteLinks.appStore} external>Открыть объекты в приложении</HomeButton>
            <HomeButton href={siteLinks.contact} variant="text">Подключить новый регион</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="bezel">
            <div className="bezel-core relative min-h-[500px] overflow-hidden p-6 md:p-10">
              <div className="absolute -right-10 top-10 font-display text-[12rem] leading-none text-graphite/[0.05] md:text-[18rem]">18</div>
              <svg viewBox="0 0 760 430" className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)]" aria-hidden="true">
                <path d="M75 85 L165 55 L240 95 L310 72 L395 125 L515 115 L630 180 L690 260 L610 340 L505 360 L430 320 L330 350 L235 305 L140 315 L80 245 Z" fill="rgba(111,133,117,.1)" stroke="rgba(23,33,28,.14)" strokeWidth="2" />
                <path d="M355 190 L397 178 L425 208 L410 250 L365 258 L338 228 Z" fill="#23262F" />
                <path d="M382 219 C455 195 520 210 610 170" fill="none" stroke="rgba(47,107,95,.6)" strokeWidth="2" strokeDasharray="7 8" />
                <path d="M382 219 C300 175 220 160 132 115" fill="none" stroke="rgba(111,133,117,.45)" strokeWidth="2" strokeDasharray="7 8" />
                <circle cx="382" cy="219" r="9" fill="#2F6B5F" />
                <circle cx="610" cy="170" r="6" fill="#CBDCD6" />
                <circle cx="132" cy="115" r="6" fill="#CBDCD6" />
              </svg>
              <div className="absolute bottom-8 left-8 rounded-[1.5rem] bg-graphite p-5 text-app-dark-text shadow-[0_24px_70px_rgba(11,23,18,.18)] md:left-10">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-app-gold" strokeWidth={1.2} />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.17em] text-app-dark-caption">Активный регион</p>
                    <p className="mt-1 font-heading text-2xl font-semibold">Удмуртия</p>
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
    <section className="section-shell relative overflow-hidden bg-graphite-deep text-app-dark-text">
      <div className="page-container relative grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
        <Reveal className="relative">
          <span className="eyebrow bg-white/[0.08] text-app-dark-caption">FAQ</span>
          <h2 className="section-heading mt-6">Вопросы перед установкой</h2>
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
                    <span className="font-heading text-lg font-semibold md:text-xl">{question}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? 'bg-app-brand text-white' : 'bg-white/[0.06] text-app-dark-caption'
                    }`}>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.2} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-sm leading-7 text-app-dark-caption">{answer}</p>
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
    <section className="relative min-h-[720px] overflow-hidden bg-graphite-deep text-app-dark-text">
      <Image src="/images/cta-house.png" alt="Загородный дом вечером" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,23,.5),rgba(15,18,23,.78)_52%,rgba(15,18,23,.9))]" />
      <div className="section-shell page-container relative flex min-h-[720px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-app-dark-caption">Бесплатно для покупателей</span>
            <h2 className="section-title mt-7 max-w-5xl">Начните поиск дома в «БАСТ»</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-app-dark-caption">
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
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-app-dark-caption">
                Наведите камеру на нужный код
              </p>
            </div>
          </div>
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
        <DealActsSection />
        <CrmIntermezzoSection />
        <VerificationSection />
        <GeographySection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
