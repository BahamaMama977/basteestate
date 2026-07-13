import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { Reveal } from '@/components/home/Reveal'
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
    text: 'Покупатель, риэлтор и продавец видят одну и ту же сделку. Клиент закреплён за риэлтором, который его привёл.',
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

/** Покадровая версия демо-сделки: все акты с живыми экранами и пояснениями. */
export function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="paper-grid relative overflow-hidden bg-app-inset pb-20 pt-36 text-graphite md:pt-40">
          <div className="page-container px-5 sm:px-8 lg:px-12">
            <Reveal immediate>
              <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">
                Как работает
              </span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">
                От поиска объекта до подписания документов
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">
                Одна демонстрационная сделка, показанная покадрово: те же экраны, что и в приложении, — с демо-данными.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell bg-paper">
          <div className="page-container">
            <StickyPipeline stages={pipelineFrames} caption="Экран приложения · демо-данные" />
          </div>
        </section>

        <section className="section-shell bg-app-inset text-graphite">
          <div className="page-container text-center">
            <Reveal>
              <h2 className="editorial-title mx-auto max-w-3xl">Пройдите этот путь со своим домом</h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-graphite/70">
                Установите приложение, посмотрите объекты в Удмуртии и напишите продавцу или риэлтору.
              </p>
              <div className="mt-9 flex justify-center">
                <AppStoreButtons />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
