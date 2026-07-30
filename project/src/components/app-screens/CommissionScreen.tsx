import { BadgeCheck, Link2, UsersRound } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, participants } from '@/lib/demo-deal'

/** Авторство риэлтора внутри сделки: связь клиента с тем, кто его привёл. */
export function CommissionScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="shrink-0 px-4 pb-2 pt-2">
          <p className="text-[19px] font-bold text-app-dark-text">Авторство клиента</p>
          <p className="mt-1 text-[11px] text-app-dark-caption">Связь участников в текущей сделке</p>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-hidden bg-app-dark-muted px-4 pt-3">
          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-app-dark-caption">Сделка № 1042</p>
                <p className="mt-1 text-[14px] font-semibold text-app-dark-text">{demoObject.title}, {demoObject.area}</p>
              </div>
              <span className="rounded-full bg-app-dark-trust-soft px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust">В работе</span>
            </div>
          </div>

          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
                <Link2 className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] text-app-dark-caption">Автор клиента</p>
                <p className="mt-0.5 text-[14px] font-semibold text-app-dark-text">{participants.realtor.name}</p>
                <p className="mt-1 text-[11px] text-app-dark-trust">Закреплён в сделке</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-gold/15 text-app-dark-gold">
                <UsersRound className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] text-app-dark-caption">Как закреплён клиент</p>
                <p className="mt-0.5 text-[14px] font-semibold text-app-dark-text">Персональная ссылка или QR</p>
                <p className="mt-1 text-[11px] leading-4 text-app-dark-caption">Источник сохраняется при создании сделки.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-app-dark-border px-4 pb-6 pt-3">
          <div className="flex items-center gap-2 text-[11px] leading-4 text-app-dark-caption">
            <BadgeCheck className="h-4 w-4 shrink-0 text-app-dark-trust" strokeWidth={2} />
            Риэлтор остаётся участником связанной с клиентом сделки.
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
