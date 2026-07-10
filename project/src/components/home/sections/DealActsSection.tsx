'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { ChatScreen, DealScreen } from '@/components/app-screens'
import { acts, verification, type DealAct } from '@/lib/demo-deal'

/** Копирайт актов 2–5. Ключи совпадают с канон-acts. */
const actCopy: Record<string, { kicker: string; title: string; text: string }> = {
  dialog: {
    kicker: 'Диалог',
    title: 'Напишите продавцу из карточки дома',
    text: 'Чат привязан к объекту: вопросы, ответы и документы остаются рядом с домом, о котором идёт речь.',
  },
  start: {
    kicker: 'Старт сделки',
    title: 'Сделка фиксирует объект и участников',
    text: 'Покупатель, риэлтор и продавец видят одну и ту же сделку. Клиент закреплён за риэлтором, который его привёл.',
  },
  progress: {
    kicker: 'Проверка и договор',
    title: 'Договор готовится — статус виден всем',
    text: 'Объект прошёл проверку ещё до публикации, а этап оформления обновляется прямо в приложении.',
  },
  signed: {
    kicker: 'Подпись',
    title: 'Документы подписаны — сценарий завершён',
    text: 'От первого сообщения до подписи — один непрерывный маршрут без потери контекста.',
  },
}

function screenFor(act: DealAct): ReactNode {
  return act.screen === 'chat' ? <ChatScreen act={act} /> : <DealScreen act={act} />
}

/** Акты 2–5: sticky-телефон на десктопе, инлайн-кадры на мобайле. */
export function DealActsSection() {
  const storyActs = acts.slice(1) // акты 2–5
  const [activeKey, setActiveKey] = useState(storyActs[0].key)
  const blockRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveKey((entry.target as HTMLElement).dataset.act ?? storyActs[0].key)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blockRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeAct = storyActs.find((a) => a.key === activeKey) ?? storyActs[0]

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow bg-graphite text-paper">Одна сделка от начала до конца</span>
          <h2 className="section-heading mt-6 max-w-3xl">
            Скрольте — сделка идёт: от первого сообщения до подписанных документов
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_minmax(360px,0.9fr)]">
          {/* Текст актов */}
          <div className="space-y-24 lg:space-y-[42vh]">
            {storyActs.map((act) => {
              const copy = actCopy[act.key]
              return (
                <article
                  key={act.key}
                  data-act={act.key}
                  ref={(el) => {
                    if (el) blockRefs.current.set(act.key, el)
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">
                    Акт 0{act.id} · {copy.kicker}
                  </p>
                  <h3 className="section-heading mt-4">{copy.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{copy.text}</p>

                  {act.key === 'progress' && (
                    <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
                      {verification.map((v, i) => (
                        <li key={v.key} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-sm font-medium">{v.label}</p>
                            <p className="text-xs text-graphite/55">{v.caption}</p>
                          </div>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand motion-safe:animate-act-in ${
                              i < act.verifiedCount ? '' : 'opacity-25'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Мобильный кадр акта */}
                  <div className="mt-8 lg:hidden">
                    {screenFor(act)}
                    <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                      Экран приложения · демо-данные
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Sticky-телефон */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div key={activeAct.key} className="motion-safe:animate-act-in">
                {screenFor(activeAct)}
              </div>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
                Акт 0{activeAct.id} · живой экран приложения
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
