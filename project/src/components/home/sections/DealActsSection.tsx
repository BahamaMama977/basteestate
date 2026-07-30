import { Check } from 'lucide-react'
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
    text: 'В сделке зафиксированы объект, покупатель, продавец и ответственный риэлтор — команды «БАСТ» или партнёр.',
  },
  progress: {
    kicker: 'Проверка и договор',
    title: 'Договор готовится — статус виден всем',
    text: 'Объявление прошло проверку до публикации, а этап оформления обновляется прямо в приложении.',
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
            <p className="text-xs text-graphite/70">{v.caption}</p>
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

/** Общая часть пути покупателя после подключения ответственного риэлтора. */
export function DealActsSection() {
  const dealStages: PipelineStage[] = acts.slice(1).map((act, index) => {
    const copy = actCopy[act.key]
    return {
      id: act.key,
      kicker: `Общий путь 0${index + 1} · ${copy.kicker}`,
      title: copy.title,
      text: copy.text,
      panel: screenFor(act),
      extras: act.key === 'progress' ? <VerificationChecklist act={act} /> : undefined,
    }
  })

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <div className="mb-14 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-app-brand">После подключения риэлтора</p>
          <h2 className="section-title mt-5">Как проходит сделка</h2>
        </div>
        <StickyPipeline stages={dealStages} headingLevel={3} caption="Сделка в приложении" mobileCaption="Сделка в приложении" />
      </div>
    </section>
  )
}
