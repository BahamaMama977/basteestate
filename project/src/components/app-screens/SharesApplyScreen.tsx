import Image from 'next/image'
import { Check, ChevronLeft } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, otherObjects, promo } from '@/lib/demo-deal'

const listings = [
  { title: demoObject.title, price: demoObject.price, photo: demoObject.photo, checked: true },
  { title: otherObjects[0].title, price: otherObjects[0].price, photo: otherObjects[0].photo, checked: true },
  { title: otherObjects[1].title, price: otherObjects[1].price, photo: otherObjects[1].photo, checked: true },
  { title: otherObjects[2].title, price: otherObjects[2].price, photo: otherObjects[2].photo, checked: false },
]

/** Пакетное применение акции: акция сразу к нескольким объявлениям. */
export function SharesApplyScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-dark-text" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-dark-text">Выберите объявления</p>
        </div>

        <div className="shrink-0 px-4 pt-3">
          <p className="text-[12px] text-app-dark-caption">
            Выберите объявления для акции <span className="text-app-dark-trust">«{promo.title}»</span>
          </p>
          <span className="mt-2 inline-block text-[12px] font-semibold text-app-dark-trust">Выбрать все</span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3">
          <div className="space-y-2">
            {listings.map((l) => (
              <div key={l.title} className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-2.5">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${l.checked ? 'border-app-dark-trust bg-app-dark-trust text-app-dark-bg' : 'border-app-dark-border'}`}>
                  {l.checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-app-dark-inset">
                  <Image src={l.photo} alt="" fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-app-dark-text">{l.price}</p>
                  <p className="truncate text-[11px] text-app-dark-caption">{l.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">Сохранить</span>
        </div>
      </div>
    </PhoneFrame>
  )
}
