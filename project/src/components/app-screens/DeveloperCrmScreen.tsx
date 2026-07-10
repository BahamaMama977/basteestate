import Image from 'next/image'
import { ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { crm, demoObject, participants } from '@/lib/demo-deal'

/** CRM застройщика (тёмная тема): объект опубликован, обращение пришло, ответственный назначен. */
export function DeveloperCrmScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Объекты</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Карточка объекта */}
        <div className="overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
          <div className="relative h-24">
            <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="340px" />
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-app-dark-bg/70 px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
              Проверено
            </span>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[14px] font-semibold text-app-dark-text">{demoObject.title}, {demoObject.area}</p>
              <p className="shrink-0 text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-app-dark-caption">{demoObject.address}</p>
          </div>
        </div>

        {/* Обращение */}
        <div className="mb-2 mt-4 flex items-center gap-2">
          <p className="text-[15px] font-bold text-app-dark-text">Обращения</p>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-app-dark-trust px-1.5 text-[11px] font-semibold text-app-dark-bg">1</span>
        </div>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-app-dark-trust-soft px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust">
              {crm.inquiry.status}
            </span>
            <span className="text-[11px] text-app-dark-caption">{crm.inquiry.time}</span>
          </div>
          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-inset text-[12px] font-bold text-app-dark-text">
              {participants.buyer.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-app-dark-caption">{crm.inquiry.text}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-app-dark-border pt-2.5">
            <p className="text-[11px] text-app-dark-caption">Ответственный: {crm.inquiry.assignee}</p>
            <span className="flex items-center gap-1 rounded-full bg-app-dark-trust px-3.5 py-1.5 text-[12px] font-semibold text-app-dark-bg">
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.25} />
              Ответить
            </span>
          </div>
        </div>

        {/* Сводка */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <p className="text-[18px] font-bold text-app-dark-text">3</p>
            <p className="text-[11px] text-app-dark-caption">объекта в каталоге</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div>
              <p className="text-[18px] font-bold text-app-dark-text">1</p>
              <p className="text-[11px] text-app-dark-caption">сделка в работе</p>
            </div>
            <ChevronRight className="h-4 w-4 text-app-dark-caption" strokeWidth={2} />
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
