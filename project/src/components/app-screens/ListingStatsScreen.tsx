import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, listingStats } from '@/lib/demo-deal'

const kpi = [
  { key: 'views', label: 'Просмотры', hint: 'Сколько раз открывали', value: listingStats.views },
  { key: 'pins', label: 'Закрепления', hint: 'Клиенты закрепили объект', value: listingStats.pins },
  { key: 'favorites', label: 'Избранное', hint: 'Добавили в избранное', value: listingStats.favorites },
  { key: 'shares', label: 'Поделились', hint: 'Поделились ссылкой', value: listingStats.shares },
] as const

/** Статистика объявления, вкладка «Аудитория»: KPI-плитки. */
export function ListingStatsScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-dark-text" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-dark-text">Статистика</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3">
          {/* Карточка объекта */}
          <div className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-2.5">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-app-dark-inset">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="64px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
              <p className="truncate text-[11px] text-app-dark-caption">{demoObject.title}, {demoObject.area}</p>
            </div>
            <span className="rounded-full bg-app-dark-trust-soft px-2 py-0.5 text-[10px] font-semibold text-app-dark-trust">Активно</span>
          </div>

          {/* Сегменты */}
          <div className="mt-3 flex rounded-full bg-app-dark-inset p-1 text-[12px] font-semibold">
            <span className="flex-1 py-1.5 text-center text-app-dark-caption">Инфо</span>
            <span className="flex-1 rounded-full bg-app-dark-surface py-1.5 text-center text-app-dark-text">Аудитория</span>
            <span className="flex-1 py-1.5 text-center text-app-dark-caption">Сделки</span>
          </div>

          {/* KPI 2×2 */}
          <p className="mb-2 mt-4 text-[13px] font-semibold text-app-dark-caption">Ключевые метрики</p>
          <div className="grid grid-cols-2 gap-2.5">
            {kpi.map((k) => (
              <div key={k.key} className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
                <p className="text-[22px] font-bold text-app-dark-text">{k.value}</p>
                <p className="text-[12px] font-medium text-app-dark-text">{k.label}</p>
                <p className="text-[10px] text-app-dark-caption">{k.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="shrink-0 border-t border-app-dark-border px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">Создать сделку</span>
        </div>
      </div>
    </PhoneFrame>
  )
}
