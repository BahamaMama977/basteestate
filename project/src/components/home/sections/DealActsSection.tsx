import { Check, Link2, UserRound } from 'lucide-react'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { ChatScreen, DealScreen, ReferralAcceptScreen, SearchScreen } from '@/components/app-screens'
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
    text: 'Объявление прошло проверку до публикации, а этап оформления обновляется прямо в приложении.',
  },
  signed: {
    kicker: 'Подпись',
    title: 'Документы подписаны — сценарий завершён',
    text: 'От первого сообщения до подписи — один непрерывный маршрут без потери контекста.',
  },
}

function EntryOptions() {
  return (
    <div className="mt-6 grid max-w-lg gap-3">
      <div className="rounded-2xl border border-graphite/10 bg-paper p-4">
        <div className="flex items-center gap-3">
          <Link2 className="h-4 w-4 text-app-brand" aria-hidden="true" />
          <p className="text-sm font-semibold">Вас пригласил риэлтор</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-graphite/70">Объект сохранится, а риэлтор останется участником сделки.</p>
      </div>
      <div className="rounded-2xl border border-app-brand-border bg-app-brand-soft p-4">
        <div className="flex items-center gap-3">
          <UserRound className="h-4 w-4 text-app-brand" aria-hidden="true" />
          <p className="text-sm font-semibold">Вы нашли объект сами</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-graphite/70">Специалист команды «БАСТ» бесплатно сопроводит вас до подписания документов.</p>
      </div>
    </div>
  )
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

/** Полный путь покупателя: поиск, вход и четыре состояния сделки. */
export function DealActsSection() {
  const dealStages: PipelineStage[] = acts.slice(1).map((act, index) => {
    const copy = actCopy[act.key]
    return {
      id: act.key,
      kicker: `Этап 0${index + 3} · ${copy.kicker}`,
      title: copy.title,
      text: copy.text,
      panel: screenFor(act),
      extras: act.key === 'progress' ? <VerificationChecklist act={act} /> : undefined,
    }
  })

  const stages: PipelineStage[] = [
    {
      id: 'search',
      kicker: 'Этап 01 · Поиск',
      title: 'Найдите подходящий дом на карте',
      text: 'Сравнивайте цену, площадь и расположение. Проверенные объявления собраны в одном каталоге.',
      panel: <SearchScreen />,
    },
    {
      id: 'entry',
      kicker: 'Этап 02 · Вход',
      title: 'Войдите в сделку удобным способом',
      text: 'Откройте приглашение своего риэлтора или подключите специалиста команды «БАСТ», если нашли дом самостоятельно.',
      panel: <ReferralAcceptScreen />,
      extras: <EntryOptions />,
    },
    ...dealStages,
  ]

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <StickyPipeline stages={stages} headingLevel={3} />
      </div>
    </section>
  )
}
