import Image from 'next/image'
import { ChevronLeft, Plus } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject } from '@/lib/demo-deal'

const STEPS = 8
const CURRENT = 4 // шаг «Медиа» (5-й, индекс 4)

const sections = [
  { key: 'photo', title: 'Фото', sub: 'Снимки готового дома', count: 6 },
  { key: 'plans', title: 'Планировки', sub: 'PDF или фото', count: 2 },
  { key: '3d', title: '3D-визуализации', sub: 'Рендеры (если есть)', count: 0 },
] as const

/** Мастер создания объявления, шаг «Медиа»: секции фото с прогрессом. */
export function CreateListingScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        {/* Nav */}
        <div className="flex shrink-0 items-center justify-between px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-dark-text" strokeWidth={2} />
          <span className="text-[13px] font-medium text-app-dark-caption">Закрыть</span>
        </div>

        {/* Заголовок + призрачная цифра */}
        <div className="relative shrink-0 px-4 pt-3">
          <span className="absolute right-4 top-1 font-bold text-app-dark-text/10" style={{ fontSize: 48 }}>05</span>
          <h3 className="text-[22px] font-bold text-app-dark-text">Медиа</h3>
          <p className="mt-1 text-[13px] text-app-dark-caption">Покажите дом — фото и видео</p>
        </div>

        {/* Прогресс */}
        <div className="mt-3 flex shrink-0 items-center gap-1 px-4">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < CURRENT ? 'bg-app-dark-trust' : i === CURRENT ? 'h-2 bg-app-dark-trust' : 'bg-app-dark-inset'}`} />
          ))}
        </div>
        <div className="mt-2 flex shrink-0 items-center gap-1.5 px-4 text-[11px] text-app-dark-caption">
          <span className="h-1.5 w-1.5 rounded-full bg-app-dark-trust" />
          Сохранено локально только что
        </div>

        {/* Секции фото */}
        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3">
          <p className="text-[12px] text-app-dark-caption">8 из 20 фотографий · первое фото — главное</p>
          <div className="mt-3 space-y-3">
            {sections.map((s) => (
              <div key={s.key}>
                <p className="text-[13px] font-semibold text-app-dark-text">{s.title}</p>
                <p className="text-[11px] text-app-dark-caption">{s.sub}</p>
                <div className="mt-2 flex gap-2">
                  {Array.from({ length: Math.min(s.count, 2) }).map((_, i) => (
                    <div key={i} className="relative h-14 w-14 overflow-hidden rounded-lg bg-app-dark-inset">
                      <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="56px" />
                    </div>
                  ))}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-app-dark-border text-app-dark-caption">
                    <Plus className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Футер */}
        <div className="shrink-0 border-t border-app-dark-border px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">Далее</span>
        </div>
      </div>
    </PhoneFrame>
  )
}
