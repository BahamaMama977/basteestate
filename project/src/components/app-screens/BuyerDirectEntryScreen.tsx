import Image from 'next/image'
import { BadgeCheck, ChevronLeft, MessageCircle, UserRoundCheck } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject } from '@/lib/demo-deal'

/** Покупатель написал застройщику сам: к сделке подключён риэлтор команды «БАСТ». */
export function BuyerDirectEntryScreen() {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col bg-app-bg">
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-ink" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-ink">Сделка начата</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-5">
          <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-app-brand-soft px-3 py-1.5 text-[12px] font-semibold text-app-brand">
            <BadgeCheck className="h-4 w-4" strokeWidth={2.25} />
            Риэлтор «БАСТ» подключён
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-app-line bg-app-bg shadow-sm">
            <div className="relative h-28">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="340px" />
            </div>
            <div className="p-3">
              <p className="text-[15px] font-bold text-app-ink">{demoObject.priceShort}</p>
              <p className="truncate text-[12px] text-app-caption">{demoObject.title}, {demoObject.area}</p>
              <p className="truncate text-[11px] text-app-caption">{demoObject.district}</p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-app-line p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                <UserRoundCheck className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-app-ink">Елена Миронова</p>
                <p className="text-[11px] text-app-caption">Риэлтор команды «БАСТ»</p>
              </div>
            </div>
            <p className="mt-3 text-[12px] leading-snug text-app-caption">
              Поможет договориться о показе и проведёт оформление до подписания документов.
            </p>
          </div>

          <div className="mt-3 rounded-2xl bg-app-muted px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-app-caption">Для покупателя</p>
            <p className="mt-1 text-[13px] font-semibold text-app-ink">Сопровождение без оплаты</p>
          </div>
        </div>

        <div className="shrink-0 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-app-brand text-[14px] font-semibold text-white">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Написать риэлтору
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
