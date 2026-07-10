import Image from 'next/image'
import { Check, ChevronRight, MessageCircle, Phone, Plus } from 'lucide-react'
import { PhoneFrame, demo } from './PhoneFrame'

const stages = ['Начата', 'Объект', 'Договор', 'Подписание', 'Готово'] as const
const currentStage = 2 // «Договор готовится» — этап 3 из 5

const viewed = [
  { price: '9,4 млн ₽', addr: 'Октябрьский р-н', img: '/images/hero-house.png' },
  { price: '7,9 млн ₽', addr: 'Игринский р-н', img: '/images/cta-house.png' },
] as const

export function DealScreen() {
  return (
    <PhoneFrame>
      {/* Хедер */}
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-ink">Рабочее пространство</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-muted/40 px-4 pt-2">
        {/* Карточка партнёра */}
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-[14px] font-bold text-app-brand">
            АК
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-app-ink">{demo.realtor.name}</p>
              <span className="rounded-full bg-app-brand-soft px-2 py-0.5 text-[10px] font-semibold text-app-brand">
                {demo.realtor.role}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-app-caption">{demo.realtor.phone}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-brand text-white">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-brand text-white">
            <Phone className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>

        {/* Секция «Сделка» */}
        <div className="mb-2 mt-4 flex items-center gap-2">
          <p className="text-[15px] font-bold text-app-ink">Сделка</p>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-app-inset px-1.5 text-[11px] font-semibold text-app-caption">1</span>
        </div>

        {/* Карточка сделки */}
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex gap-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-inset">
              <Image src={demo.object.photo} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-app-brand-soft px-2 py-0.5 text-[10px] font-semibold text-app-brand">В работе</span>
                <span className="text-[11px] font-medium text-app-placeholder">#1042</span>
              </div>
              <p className="mt-1 text-[14px] font-bold text-app-ink">{demo.object.price}</p>
              <p className="truncate text-[11px] text-app-caption">{demo.object.district}</p>
            </div>
          </div>

          {/* Этапы */}
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-app-caption">Этап 3 из 5</p>
          <p className="text-[15px] font-bold text-app-ink">Договор готовится</p>
          <div className="mt-2 flex items-center gap-1">
            {stages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= currentStage ? 'bg-app-brand' : 'bg-app-inset'}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <span className="flex items-center gap-1 rounded-full bg-app-brand px-4 py-1.5 text-[12px] font-semibold text-white">
              Открыть
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </div>
        </div>

        {/* Напоминания */}
        <div className="mb-2 mt-4 flex items-center justify-between">
          <p className="text-[15px] font-bold text-app-ink">Напоминания</p>
          <p className="text-[11px] text-app-caption">Дальше: завтра 09:00</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <span className="h-3 w-3 shrink-0 rounded-full border-2 border-app-brand" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-app-ink">Согласовать показ дома у леса</p>
            <p className="text-[11px] text-app-caption">завтра 09:00</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-app-brand-soft px-2.5 py-1 text-[11px] font-semibold text-app-brand">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Выполнить
          </span>
        </div>

        {/* Просмотрел */}
        <div className="mb-2 mt-4">
          <p className="text-[15px] font-bold text-app-ink">Просмотрел</p>
        </div>
        <div className="flex gap-2.5">
          {viewed.map((v) => (
            <div key={v.addr} className="w-32 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative h-16">
                <Image src={v.img} alt="" fill className="object-cover" sizes="128px" />
                <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-app-brand text-white">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
              <div className="p-2">
                <p className="text-[12px] font-bold text-app-ink">{v.price}</p>
                <p className="truncate text-[10px] text-app-caption">{v.addr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
