import type { ReactNode } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { Reveal } from '@/components/home/Reveal'
import { RoleHeroBackground } from '@/components/site/RoleHeroBackground'
import { ChatScreen, DealScreen, SearchScreen } from '@/components/app-screens'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { acts, verification } from '@/lib/demo-deal'

type Frame = {
  id: number
  kicker: string
  title: string
  text: string
  screen: ReactNode
  checklist?: boolean
}

const frames: Frame[] = [
  {
    id: 1,
    kicker: 'Поиск',
    title: 'Найдите дом на карте или в каталоге',
    text: 'Фильтры по цене, площади и району. В каталоге — объявления, прошедшие проверку команды «БАСТ».',
    screen: <SearchScreen />,
  },
  {
    id: 2,
    kicker: 'Диалог',
    title: 'Напишите продавцу из карточки дома',
    text: 'Чат привязан к объекту: вопросы, ответы и документы остаются рядом с домом, о котором идёт речь.',
    screen: <ChatScreen act={acts[1]} />,
  },
  {
    id: 3,
    kicker: 'Старт сделки',
    title: 'Сделка фиксирует объект и участников',
    text: 'Покупатель, продавец и ответственный риэлтор видят одну и ту же сделку. Это может быть риэлтор команды «БАСТ» или партнёр, который пригласил клиента.',
    screen: <DealScreen act={acts[2]} />,
  },
  {
    id: 4,
    kicker: 'Проверка и договор',
    title: 'Договор готовится — статус виден всем',
    text: 'Объявление прошло проверку до публикации, а этап оформления обновляется прямо в приложении.',
    screen: <DealScreen act={acts[3]} />,
    checklist: true,
  },
  {
    id: 5,
    kicker: 'Подпись',
    title: 'Документы подписаны — сценарий завершён',
    text: 'От первого сообщения до подписи — один непрерывный маршрут без потери контекста.',
    screen: <DealScreen act={acts[4]} />,
  },
]

function VerificationChecklist() {
  return (
    <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
      {verification.map((v) => (
        <li key={v.key} className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium">{v.label}</p>
            <p className="text-xs text-graphite/70">{v.caption}</p>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </li>
      ))}
    </ul>
  )
}

const pipelineFrames: PipelineStage[] = frames.map((frame) => ({
  id: String(frame.id),
  kicker: `Акт 0${frame.id} · ${frame.kicker}`,
  title: frame.title,
  text: frame.text,
  panel: frame.screen,
  extras: frame.checklist ? <VerificationChecklist /> : undefined,
}))

/** Полный путь сделки: все этапы показаны экранами приложения. */
export function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative min-h-[88dvh] overflow-hidden bg-app-inset pb-16 pt-32 text-graphite md:pt-36">
          <RoleHeroBackground />
          <div className="page-container relative grid min-h-[calc(88dvh-8rem)] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
            <Reveal immediate>
              <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">
                Как работает
              </span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">
                От поиска объекта до подписания документов
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">
                Посмотрите, как объект, переписка, участники и документы остаются связаны на каждом этапе — от первого сообщения до подписания.
              </p>
            </Reveal>
            <Reveal immediate delay={0.08} className="relative hidden min-h-[660px] place-items-center overflow-hidden rounded-[2rem] border border-graphite/10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.96),transparent_30%),linear-gradient(180deg,#edf3f0,#e4e9e5)] p-8 shadow-soft lg:grid">
              <div className="w-full max-w-[340px]"><DealScreen act={acts[3]} /></div>
              <p className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/55">Сделка в приложении</p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell bg-paper">
          <div className="page-container">
            <StickyPipeline stages={pipelineFrames} caption="Сделка в приложении" mobileCaption="Сделка в приложении" />
          </div>
        </section>

        <section className="section-shell bg-app-inset text-graphite">
          <div className="page-container grid overflow-hidden rounded-[2rem] border border-graphite/10 bg-paper lg:grid-cols-[.9fr_1.1fr]">
            <Reveal className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
              <h2 className="editorial-title max-w-3xl">Пройдите этот путь со своим домом</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-graphite/70">
                Установите приложение, посмотрите объекты в Удмуртии и напишите продавцу или риэлтору.
              </p>
              <div className="mt-9">
                <AppStoreButtons />
              </div>
            </Reveal>
            <div className="relative min-h-[380px] lg:min-h-[560px]">
              <Image src="/images/generated/bast-deal-documents-real-v2.webp" alt="Документы и план загородного дома перед подписанием" fill className="object-cover object-center" sizes="(min-width:1024px) 55vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-paper/20 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
