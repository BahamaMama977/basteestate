import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { Reveal } from '@/components/home/Reveal'
import { ChatScreen, DealScreen, SearchScreen } from '@/components/app-screens'
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
    text: 'Фильтры по цене, площади и району. Каждая карточка — проверенный объект с полными характеристиками.',
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
    text: 'Объект прошёл проверку ещё до публикации, а этап оформления обновляется прямо в приложении.',
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

/** Покадровая версия демо-сделки: все акты с живыми экранами и пояснениями. */
export function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-graphite-deep pb-20 pt-40 text-app-dark-text">
          <div className="page-container px-5 sm:px-8 lg:px-12">
            <Reveal>
              <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">
                Как работает
              </span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">
                От поиска объекта до подписания документов
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">
                Одна демонстрационная сделка, показанная покадрово: те же экраны, что и в приложении, — с демо-данными.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell bg-paper">
          <div className="page-container space-y-24 lg:space-y-32">
            {frames.map((frame, index) => (
              <Reveal key={frame.id}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">
                      Акт 0{frame.id} · {frame.kicker}
                    </p>
                    <h2 className="section-heading mt-4">{frame.title}</h2>
                    <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{frame.text}</p>
                    {frame.checklist && (
                      <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
                        {verification.map((v) => (
                          <li key={v.key} className="flex items-center justify-between px-4 py-3">
                            <div>
                              <p className="text-sm font-medium">{v.label}</p>
                              <p className="text-xs text-graphite/55">{v.caption}</p>
                            </div>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="justify-self-center">
                    {frame.screen}
                    <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                      Экран приложения · демо-данные
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell bg-graphite-deep text-app-dark-text">
          <div className="page-container text-center">
            <Reveal>
              <h2 className="section-title mx-auto max-w-3xl">Пройдите этот путь со своим домом</h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-app-dark-caption">
                Установите приложение, посмотрите объекты в Удмуртии и напишите продавцу или риэлтору.
              </p>
              <div className="mt-9 flex justify-center">
                <AppStoreButtons light />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
