import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Home,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react'

const navigation = [
  ['Дашборд', LayoutDashboard],
  ['Объявления', Home],
  ['Клиенты', Users],
  ['Сделки', BriefcaseBusiness],
  ['Напоминания', Bell],
  ['Чаты', MessageSquare],
] as const

/** Компактная HTML-копия веб-CRM: тот же рабочий контур, что и в bast-web-v2. */
export function WebCrmPreview() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-app-dark-surface p-2 shadow-elevated ring-1 ring-inset ring-white/10 md:hidden">
        <div className="overflow-hidden rounded-xl bg-paper text-graphite">
          <div className="flex h-9 items-center gap-2 bg-app-dark-bg px-3" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <div className="ml-2 h-5 flex-1 rounded-md bg-white/[0.08]" />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-heading text-xl font-bold tracking-[-0.03em]">Клиенты</p>
                <p className="mt-1 text-xs leading-5 text-graphite/70">Закреплённые контакты и сделки</p>
              </div>
              <span className="rounded-lg bg-app-brand-soft px-2.5 py-1.5 text-xs font-semibold text-app-brand">12 активных</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {navigation.slice(1, 4).map(([label, Icon]) => (
                <div key={label} className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[11px] font-medium ${label === 'Клиенты' ? 'bg-app-brand text-white' : 'bg-app-muted text-graphite/70'}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-app-line bg-white">
              {[
                ['Мария Соколова', 'Дом у леса', 'Договор готовится', 'МС'],
                ['Дмитрий Панов', 'Коттедж у пруда', 'Подбор объекта', 'ДП'],
              ].map(([name, listing, status, initials]) => (
                <div key={name} className="flex items-center gap-3 border-b border-app-line px-3 py-3 last:border-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-xs font-bold text-app-brand">{initials}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{name}</p>
                    <p className="mt-0.5 truncate text-xs text-graphite/70">{listing}</p>
                  </div>
                  <span className="max-w-[7.5rem] text-right text-[11px] font-medium leading-4 text-app-brand">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-app-dark-surface p-2 shadow-[0_24px_70px_rgba(15,18,23,0.18)] ring-1 ring-inset ring-white/10 md:block">
      <div className="min-w-[700px] overflow-hidden rounded-[1.35rem] bg-paper text-graphite">
        <div className="flex h-10 items-center gap-2 bg-app-dark-bg px-4">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/[0.08] px-3 font-mono text-[9px] tracking-[0.1em] text-white/60">
            app.bast.ru / clients
          </div>
        </div>

        <div className="grid min-h-[438px] grid-cols-[168px_1fr]">
          <aside className="border-r border-graphite/10 bg-white px-3 py-4">
            <div className="flex items-center gap-2 px-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-app-brand text-xs font-bold text-white">Б</span>
              <span className="font-display text-xl tracking-[-0.04em]">БАСТ.</span>
            </div>
            <div className="mt-7 space-y-1">
              {navigation.map(([label, Icon]) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium ${label === 'Клиенты' ? 'bg-app-brand-soft text-app-brand' : 'text-app-caption'}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-graphite/10 pt-4">
              <div className="flex items-center gap-2 px-2 text-[11px] text-app-caption">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-[9px] font-bold text-app-brand">АК</span>
                Анна Ковалёва
                <ChevronDown className="ml-auto h-3 w-3" />
              </div>
            </div>
          </aside>

          <div className="min-w-0 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-lg font-bold tracking-[-0.03em]">Клиенты</p>
                <p className="mt-1 text-[11px] text-app-caption">Закреплённые контакты и активные сделки</p>
              </div>
              <span className="flex h-8 items-center gap-1.5 rounded-lg bg-app-brand px-3 text-[11px] font-semibold text-white">
                <Plus className="h-3.5 w-3.5" /> Добавить клиента
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-graphite/10 bg-white px-3 py-2">
              <span className="flex items-center gap-2 text-[11px] text-app-caption"><Search className="h-3.5 w-3.5" /> Поиск по клиентам</span>
              <span className="rounded-md bg-app-muted px-2 py-1 text-[10px] font-medium text-app-caption">Все сделки</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-graphite/10 bg-white">
              <div className="grid grid-cols-[1.25fr_0.8fr_0.75fr_26px] gap-3 border-b border-graphite/10 bg-app-canvas px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-app-caption">
                <span>Клиент</span><span>Объект</span><span>Статус</span><span />
              </div>
              {[
                ['Мария Соколова', 'Дом у леса', 'Договор готовится', 'МС'],
                ['Дмитрий Панов', 'Коттедж у пруда', 'Подбор объекта', 'ДП'],
                ['Елена Сергеева', 'Дом с террасой', 'Новый контакт', 'ЕС'],
              ].map(([name, listing, status, initials]) => (
                <div key={name} className="grid grid-cols-[1.25fr_0.8fr_0.75fr_26px] items-center gap-3 border-b border-graphite/[0.07] px-4 py-3 last:border-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-[9px] font-bold text-app-brand">{initials}</span>
                    <span className="truncate text-[11px] font-semibold">{name}</span>
                  </div>
                  <span className="truncate text-[11px] text-app-caption">{listing}</span>
                  <span className="w-fit rounded-full bg-app-brand-soft px-2 py-1 text-[9px] font-semibold text-app-brand">{status}</span>
                  <MoreHorizontal className="h-4 w-4 text-app-placeholder" />
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ['12', 'активных клиентов'],
                ['4', 'сделки в работе'],
                ['3', 'задачи на сегодня'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-graphite/10 bg-white px-3 py-2.5">
                  <p className="font-heading text-lg font-bold tabular-nums">{value}</p>
                  <p className="mt-0.5 text-[10px] text-app-caption">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
