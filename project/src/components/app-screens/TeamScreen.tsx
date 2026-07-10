import { MessageCircle, UserPlus } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { team } from '@/lib/demo-deal'

/** Команда застройщика: сотрудники и заявка на вступление. */
export function TeamScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="shrink-0 px-4 pb-2 pt-2">
          <p className="text-[19px] font-bold text-app-dark-text">Отдел продаж</p>
        </div>

        {/* Сегменты */}
        <div className="mx-4 flex shrink-0 rounded-full bg-app-dark-inset p-1 text-[12px] font-semibold">
          <span className="flex-1 rounded-full bg-app-dark-surface py-1.5 text-center text-app-dark-text">Сотрудники</span>
          <span className="flex-1 py-1.5 text-center text-app-dark-caption">Вступление</span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-3">
          {/* Сотрудники */}
          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.initials} className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[13px] font-bold text-app-dark-trust">{m.initials}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-app-dark-text">{m.name}</p>
                  <p className="text-[11px] text-app-dark-caption">{m.role} · {m.deals} сделок</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
            ))}
          </div>

          {/* Заявка на вступление */}
          <div className="mt-4 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-app-dark-gold/15 px-2.5 py-0.5 text-[10px] font-semibold text-app-dark-gold">Заявка на вступление</span>
              <span className="text-[11px] text-app-dark-caption">сегодня, 14:32</span>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-inset text-[12px] font-bold text-app-dark-text">ДП</span>
              <p className="flex-1 text-[13px] font-medium text-app-dark-text">Дмитрий Панов</p>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="flex h-9 flex-1 items-center justify-center rounded-full border border-app-dark-border text-[12px] font-semibold text-app-dark-text">Отклонить</span>
              <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-app-dark-trust text-[12px] font-semibold text-app-dark-bg">Принять</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Добавить сотрудника
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
