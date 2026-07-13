import Image from 'next/image'
import { Briefcase, Home, Star, Users } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { otherObjects, participants, realtorStats } from '@/lib/demo-deal'

const menu = [
  { key: 'posts', label: 'Мои объявления', icon: Home },
  { key: 'clients', label: 'Клиенты', icon: Users },
  { key: 'deals', label: 'Сделки', icon: Briefcase },
] as const

/** Профиль риэлтора: идентичность, рейтинг, объявления, рабочее меню. */
export function RealtorProfileScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted">
        {/* Идентичность */}
        <div className="px-4 pt-6 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-app-dark-trust-soft text-[24px] font-bold text-app-dark-trust">
            {participants.realtor.initials}
          </span>
          <span className="mt-3 inline-block rounded-full bg-app-dark-trust-soft px-3 py-1 text-[11px] font-semibold text-app-dark-trust">Риэлтор</span>
          <p className="mt-2 text-[18px] font-bold text-app-dark-text">{participants.realtor.name}</p>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[12px] text-app-dark-caption">
            <Star className="h-3.5 w-3.5 text-app-dark-gold" strokeWidth={2} fill="currentColor" />
            <span>{realtorStats.rating}</span>
            <span>·</span>
            <span>{realtorStats.reviews} отзывов</span>
            <span>·</span>
            <span>на сайте с {realtorStats.since}</span>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 px-4">
          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <p className="text-[18px] font-bold text-app-dark-text">{realtorStats.deals}</p>
            <p className="text-[11px] text-app-dark-caption">сделок проведено</p>
          </div>
          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <p className="text-[18px] font-bold text-app-dark-text">{realtorStats.objects}</p>
            <p className="text-[11px] text-app-dark-caption">объектов в работе</p>
          </div>
        </div>

        {/* Меню */}
        <div className="mt-4 px-4">
          <div className="divide-y divide-app-dark-border overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
            {menu.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center gap-3 px-3 py-3">
                <Icon className="h-5 w-5 text-app-dark-trust" strokeWidth={2} />
                <p className="flex-1 text-[14px] text-app-dark-text">{label}</p>
                <span className="text-app-dark-caption">›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Объявления */}
        <p className="mb-2 mt-4 px-4 text-[13px] font-semibold text-app-dark-caption">Активные объявления</p>
        <div className="flex gap-2.5 px-4">
          {otherObjects.slice(0, 2).map((o) => (
            <div key={o.title} className="w-32 shrink-0 overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
              <div className="relative h-16">
                <Image src={o.photo} alt="" fill className="object-cover" sizes="128px" />
              </div>
              <div className="p-2">
                <p className="text-[12px] font-bold text-app-dark-text">{o.priceShort}</p>
                <p className="truncate text-[10px] text-app-dark-caption">{o.district}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
