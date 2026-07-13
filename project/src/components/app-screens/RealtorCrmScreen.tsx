import Image from 'next/image'
import { BadgeCheck, Bell, ChevronRight, Link2 } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { acts, crm, demoObject, participants, stages, type DealAct } from '@/lib/demo-deal'

/** CRM риэлтора (тёмная тема): клиент закреплён, авторство зафиксировано, сделка идёт. */
export function RealtorCrmScreen({ act = acts[2] }: { act?: DealAct }) {
  const stageIndex = Math.max(0, act.completedStages - 1)
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Мои клиенты</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Карточка клиента */}
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[14px] font-bold text-app-dark-trust">
              {participants.buyer.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <p className="text-[11px] text-app-dark-caption">{participants.buyer.role}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-app-dark-trust-soft px-2 py-0.5 text-[10px] font-semibold text-app-dark-trust">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.25} />
                Закреплён за вами
              </span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-app-dark-inset px-2.5 py-1.5 text-[11px] text-app-dark-caption">
            <Link2 className="h-3.5 w-3.5 shrink-0 text-app-dark-trust" strokeWidth={2} />
            Автор привязки: вы · по ссылке · сохраняется в сделке
          </div>
        </div>

        {/* Сделка клиента */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Сделка</p>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex gap-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-dark-inset">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
              <p className="truncate text-[11px] text-app-dark-caption">{demoObject.district}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-app-dark-caption">
                Этап {act.completedStages} из {stages.length}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[13px] font-semibold text-app-dark-text">{stages[stageIndex].label}</p>
          <div className="mt-2 flex items-center gap-1">
            {stages.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 flex-1 rounded-full ${i < act.completedStages ? 'bg-app-dark-trust' : 'bg-app-dark-inset'}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <span className="flex items-center gap-1 rounded-full bg-app-dark-trust px-4 py-1.5 text-[12px] font-semibold text-app-dark-bg">
              Открыть
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </div>
        </div>

        {/* Напоминание */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Напоминания</p>
        <div className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <Bell className="h-4 w-4 shrink-0 text-app-dark-gold" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-app-dark-text">{crm.reminder.text}</p>
            <p className="text-[11px] text-app-dark-caption">{crm.reminder.when}</p>
          </div>
        </div>

        {/* Клиенты */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Клиенты</p>
        <div className="space-y-2">
          {[
            { p: participants.buyer, note: 'Закреплён · сделка идёт' },
            { p: crm.otherClient, note: 'Новый · подбор объекта' },
          ].map(({ p, note }) => (
            <div key={p.initials} className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[12px] font-bold text-app-dark-trust">
                {p.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-app-dark-text">{p.name}</p>
                <p className="text-[11px] text-app-dark-caption">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
