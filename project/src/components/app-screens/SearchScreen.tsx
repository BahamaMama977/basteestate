import Image from 'next/image'
import { ChevronDown, RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, otherObjects } from '@/lib/demo-deal'

const chips = ['Тип', 'Цена', 'Площадь', 'Комнат'] as const

const markerPositions: { left: string; top: string; active?: boolean }[] = [
  { left: '58%', top: '34%', active: true },
  { left: '26%', top: '50%' },
  { left: '72%', top: '62%' },
  { left: '38%', top: '72%' },
]

const markers = [demoObject, ...otherObjects].map((o, i) => ({
  label: o.priceShort,
  ...markerPositions[i],
}))

const list = [
  { title: `${demoObject.title}, ${demoObject.area}`, sub: demoObject.district, price: demoObject.price, img: demoObject.photo },
  { title: otherObjects[0].title, sub: otherObjects[0].district, price: otherObjects[0].price, img: otherObjects[0].photo },
]

export function SearchScreen() {
  return (
    <PhoneFrame>
      {/* Карта */}
      <div className="absolute inset-0 bg-[#EAEDE6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,#DCE6DC,transparent_55%),radial-gradient(circle_at_25%_70%,#E5E9DF,transparent_50%)]" />
        <svg viewBox="0 0 380 760" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-20 210 C120 180 180 260 380 220" fill="none" stroke="#CBD3C6" strokeWidth="10" />
          <path d="M60 -20 C90 200 40 420 120 780" fill="none" stroke="#D5DCCF" strokeWidth="8" />
          <path d="M-20 520 C160 480 240 560 400 500" fill="none" stroke="#CBD3C6" strokeWidth="12" />
          <path d="M300 -20 C280 220 340 460 300 780" fill="none" stroke="#D5DCCF" strokeWidth="7" />
          <path d="M-20 210 C120 180 180 260 380 220" fill="none" stroke="#F4F2EC" strokeWidth="2" strokeDasharray="2 8" />
        </svg>
      </div>

      {/* Маркеры цен */}
      {markers.map((m) => (
        <div key={m.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: m.left, top: m.top }}>
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-md ring-1 ${
              m.active
                ? 'bg-app-brand text-white ring-app-brand'
                : 'bg-white text-app-ink ring-black/5'
            }`}
          >
            {m.label}
          </span>
          <span
            className={`mx-auto block h-1.5 w-1.5 rotate-45 ${m.active ? 'bg-app-brand' : 'bg-white'}`}
            style={{ marginTop: -2 }}
          />
        </div>
      ))}

      {/* Верхний оверлей */}
      <div className="relative z-20 px-3.5 pt-2">
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(11,23,18,0.1)]">
          <Search className="h-4 w-4 text-app-placeholder" strokeWidth={2} />
          <span className="text-[13px] text-app-placeholder">Поиск по названию или адресу</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto overscroll-x-contain pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-app-brand px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
            Фильтры
            <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[10px]">2</span>
          </span>
          {chips.map((chip) => (
            <span
              key={chip}
              className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-app-ink shadow-sm ring-1 ring-black/5"
            >
              {chip}
              <ChevronDown className="h-3.5 w-3.5 text-app-caption" strokeWidth={2} />
            </span>
          ))}
        </div>
      </div>

      {/* Нижний лист */}
      <div className="relative z-20 mt-auto rounded-t-3xl bg-white pb-6 pt-2 shadow-[0_-12px_40px_rgba(11,23,18,0.12)]">
        <div className="mx-auto h-1 w-10 rounded-full bg-app-inset" />
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <p className="text-[15px] font-semibold text-app-ink">247 объявлений</p>
          <RefreshCw className="h-4 w-4 text-app-brand" strokeWidth={2} />
        </div>
        <div className="space-y-2.5 px-4">
          {list.map((item) => (
            <div key={item.title} className="flex gap-3 rounded-2xl bg-app-muted/70 p-2">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-inset">
                <Image src={item.img} alt="" fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="truncate text-[13px] font-semibold text-app-ink">{item.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-app-caption">{item.sub}</p>
                <p className="mt-1 text-[14px] font-bold text-app-ink">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
