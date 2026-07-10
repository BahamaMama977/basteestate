import Image from 'next/image'
import { Bell, MessageCircle, Phone, Plus } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { crm, demoObject, otherObjects, participants, stages } from '@/lib/demo-deal'

/** Совместное пространство «риэлтор ↔ клиент»: партнёр, сделка, напоминание, просмотренное. */
export function WorkspaceScreen() {
  const viewed = otherObjects.slice(0, 2)
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Рабочее пространство</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Партнёр */}
        <div className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[14px] font-bold text-app-dark-trust">
            {participants.buyer.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <span className="rounded-full border border-app-dark-border px-2 py-0.5 text-[10px] font-semibold text-app-dark-caption">Клиент</span>
            </div>
            <p className="mt-0.5 text-[11px] text-app-dark-caption">{participants.buyer.phone}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
            <Phone className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>

        {/* Сделка */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Сделка</p>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex gap-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-dark-inset">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-app-dark-trust-soft px-2 py-0.5 text-[10px] font-semibold text-app-dark-trust">В работе</span>
                <span className="text-[11px] text-app-dark-caption">#1042</span>
              </div>
              <p className="mt-1 text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
              <p className="truncate text-[11px] text-app-dark-caption">{demoObject.district}</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-app-dark-caption">Этап 3 из {stages.length}</p>
          <p className="text-[13px] font-semibold text-app-dark-text">{stages[2].label}</p>
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

        {/* Просмотрел */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Просмотрел</p>
        <div className="flex gap-2.5">
          {viewed.map((v) => (
            <div key={v.title} className="w-32 shrink-0 overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
              <div className="relative h-16">
                <Image src={v.photo} alt="" fill className="object-cover" sizes="128px" />
                <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-app-dark-trust text-app-dark-bg">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
              <div className="p-2">
                <p className="text-[12px] font-bold text-app-dark-text">{v.priceShort}</p>
                <p className="truncate text-[10px] text-app-dark-caption">{v.district}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
