import Image from 'next/image'
import { ChevronLeft, MessageCircle, ShieldCheck } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, participants } from '@/lib/demo-deal'

/** Принятие приглашения покупателем: объект закреплён за риэлтором, который его привёл. */
export function ReferralAcceptScreen() {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col bg-app-bg">
        {/* Хедер */}
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-ink" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-ink">Приглашение</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-5">
          <h3 className="text-center text-[20px] font-bold text-app-ink">Объявление закреплено</h3>
          <div className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-app-brand-soft px-3 py-1.5 text-[12px] font-semibold text-app-brand">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
            Закреплено за вами
          </div>

          {/* Карточка объекта */}
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

          {/* Карточка риэлтора */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-app-line p-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-[14px] font-bold text-app-brand">
              {participants.realtor.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-app-ink">{participants.realtor.name}</p>
              <p className="text-[11px] text-app-caption">Ваш риелтор</p>
            </div>
          </div>

          <p className="mt-4 text-[12px] leading-snug text-app-caption">
            Риелтор сопроводит вас по этому объекту — от просмотра до сделки. Найти его можно в совместном пространстве.
          </p>
        </div>

        {/* Кнопки */}
        <div className="shrink-0 space-y-2 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center rounded-full bg-app-brand text-[14px] font-semibold text-white">
            Открыть объявление
          </span>
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-app-brand-border text-[14px] font-semibold text-app-brand">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Написать риелтору
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
