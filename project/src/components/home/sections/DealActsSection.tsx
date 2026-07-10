import { Check } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'
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

function screenFor(act: DealAct) {
  return act.screen === 'chat' ? <ChatScreen act={act} /> : <DealScreen act={act} />
}

function VerificationChecklist({ act }: { act: DealAct }) {
  return (
    <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
      {verification.map((v, i) => (
        <li key={v.key} className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium">{v.label}</p>
            <p className="text-xs text-graphite/55">{v.caption}</p>
          </div>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand ${
              i < act.verifiedCount ? '' : 'opacity-25'
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Акты 2–5 на каркасе StickyPipeline. */
export function DealActsSection() {
  const stages: PipelineStage[] = acts.slice(1).map((act) => {
    const copy = actCopy[act.key]
    return {
      id: act.key,
      kicker: `Акт 0${act.id} · ${copy.kicker}`,
      title: copy.title,
      text: copy.text,
      panel: screenFor(act),
      extras: act.key === 'progress' ? <VerificationChecklist act={act} /> : undefined,
    }
  })

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow bg-graphite text-paper">Одна сделка от начала до конца</span>
          <h2 className="section-heading mt-6 max-w-3xl">
            Скрольте — сделка идёт: от первого сообщения до подписанных документов
          </h2>
        </Reveal>

        <div className="mt-16">
          <StickyPipeline stages={stages} />
        </div>
      </div>
    </section>
  )
}
