import { Gift } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { bonuses, demoObject } from '@/lib/demo-deal'

/** Скидочные сертификаты партнёров после подписания документов. */
export function RewardsScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Скидочные сертификаты</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Группа по сделке */}
        <div className="flex items-center gap-2 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <Gift className="h-5 w-5 shrink-0 text-app-dark-gold" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-app-dark-text">Сделка № 1042 · {demoObject.title}</p>
            <p className="text-[11px] text-app-dark-caption">{demoObject.district}</p>
          </div>
        </div>

        <div className="mt-3 space-y-2.5">
          {bonuses.map((b) => (
            <div key={b.key} className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-app-dark-caption">{b.kind}</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-app-dark-text">{b.title}</p>
                  <p className="text-[11px] text-app-dark-caption">{b.provider} · {b.until}</p>
                </div>
                <p className="shrink-0 text-[18px] font-bold text-app-dark-gold">{b.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
