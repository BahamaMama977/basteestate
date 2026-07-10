import Image from 'next/image'
import { ChevronLeft, Gift, Heart, MessageCircle, Phone, Share2, ShieldCheck } from 'lucide-react'
import { PhoneFrame, demo } from './PhoneFrame'

const metrics = [demo.object.area, demo.object.beds, demo.object.floors, demo.object.land]

const specs = [
  ['Тип дома', 'Кирпич'],
  ['Год', demo.object.year],
  ['Отопление', 'Газ'],
  ['Санузел', '2'],
] as const

export function ListingScreen() {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Медиа-герой */}
        <div className="relative h-44 shrink-0">
          <Image src={demo.object.photo} alt="" fill className="object-cover" sizes="372px" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
              <Heart className="h-[18px] w-[18px] fill-white" strokeWidth={2} />
            </span>
          </div>
          <span className="absolute bottom-3 right-4 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            1 / 8
          </span>
        </div>

        {/* Тело со скроллом (визуально) */}
        <div className="min-h-0 flex-1 overflow-hidden bg-app-bg px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-app-brand-soft px-2.5 py-1 text-[11px] font-semibold text-app-brand">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
            Проверено
          </span>

          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-[22px] font-bold leading-tight text-app-ink">{demo.object.title}, {demo.object.area}</h3>
            <div className="flex shrink-0 gap-2 pt-1 text-app-caption">
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              <Share2 className="h-5 w-5" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-app-caption">{demo.object.address}</p>

          <div className="mt-3">
            <p className="whitespace-nowrap text-[25px] font-bold leading-none text-app-ink">{demo.object.price}</p>
            <p className="mt-1 text-[12px] text-app-caption">{demo.object.perMeter}</p>
          </div>

          {/* Метрики */}
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-app-muted px-3 py-2.5 text-[12px] font-medium text-app-ink">
            {metrics.map((m, i) => (
              <span key={m} className="flex items-center gap-2">
                {i > 0 && <span className="h-3 w-px bg-app-inset" />}
                {m}
              </span>
            ))}
          </div>

          {/* Что вы получаете */}
          <div className="mt-4">
            <p className="text-[13px] font-semibold text-app-ink">Что вы получаете</p>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-app-gold/40 bg-app-gold-soft/60 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-gold text-white">
                <Gift className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[12px] font-semibold text-app-ink">Сертификат на отделку</p>
                <p className="text-[11px] text-app-caption">Партнёрское предложение по объекту</p>
              </div>
            </div>
          </div>

          {/* Характеристики */}
          <div className="mt-4">
            <p className="text-[13px] font-semibold text-app-ink">Характеристики</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {specs.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-app-muted px-3 py-2">
                  <p className="text-[10px] text-app-caption">{label}</p>
                  <p className="text-[13px] font-semibold text-app-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Нижний бар действий */}
        <div className="flex shrink-0 items-center gap-2.5 border-t border-app-line bg-app-bg px-4 pb-6 pt-3">
          <div className="mr-auto min-w-0">
            <p className="text-[10px] text-app-caption">Цена</p>
            <p className="whitespace-nowrap text-[14px] font-bold text-app-ink">{demo.object.price}</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-app-brand/30 text-app-brand">
            <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
          <span className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-app-brand px-5 text-[14px] font-semibold text-white">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Написать
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
