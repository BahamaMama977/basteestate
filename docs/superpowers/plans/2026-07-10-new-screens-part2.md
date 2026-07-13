# Новые экраны, часть 2: экраны застройщика — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить HTML-копии экранов застройщика: создание объявления (шаг мастера), пакетное применение акции, команда, статистика объявления. Плюс расширение канона под них. Экраны верны реальному приложению (сверено).

**Architecture:** Экраны — компоненты в `src/components/app-screens/`, на `PhoneFrame` (`variant="dark"` — CRM-регистр застройщика) и канон-данных. Экспорт из `index.ts`, витрина `/app-screens` пополняется. Панели будущего конвейера застройщика.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, lucide-react, vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md`.
**Реальные источники** в `/Users/romanmensikov/bast`: `WizardLayout`/`SectionedPhotoStep`, `CompanyShareApplyScreen`/`PostSelectItem`, `TeamPageScreen`/`RealtorCard`/`TeamRequestCard`, `ListingStatisticsScreen`.
**Зависимость:** часть 1 (`2026-07-10-new-screens-part1.md`) — канон и первые экраны; эта часть расширяет канон дальше.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Демо-данные только из канона `src/lib/demo-deal.ts`.
- Палитра — только `app-dark.*` (CRM-регистр). Легаси (`clay/pine/limestone/sage/mist`) запрещены.
- Все экраны — внутри `PhoneFrame variant="dark"`.
- Русские тексты: «ёлочки», тире «—», средник «·» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Расширение канона под экраны застройщика

**Files:**
- Modify: `src/lib/demo-deal.ts`
- Modify: `src/lib/__tests__/demo-deal.test.ts`

**Interfaces:**
- Consumes: существующий канон (`demoObject`, `otherObjects`).
- Produces:
  - `promo: { title: string; description: string; count: number }` — демо-акция для пакетного применения.
  - `team: TeamMember[]` (ровно 3), `TeamMember = { initials: string; name: string; role: string; deals: number }`.
  - `listingStats: { views: number; pins: number; favorites: number; shares: number }`.

- [ ] **Step 1: Дополнить тест канона**

Добавить в `src/lib/__tests__/demo-deal.test.ts` импорты `promo, team, listingStats` и тесты внутрь describe:

```ts
it('демо-акция застройщика', () => {
  expect(promo.title).toBeTruthy()
  expect(promo.count).toBeGreaterThan(0)
})

it('ровно 3 члена команды с ролями', () => {
  expect(team).toHaveLength(3)
  for (const m of team) {
    expect(m.initials).toMatch(/^[А-ЯЁ]{2}$/)
    expect(m.name).toBeTruthy()
    expect(m.role).toBeTruthy()
  }
})

it('KPI статистики объявления', () => {
  for (const v of [listingStats.views, listingStats.pins, listingStats.favorites, listingStats.shares]) {
    expect(v).toBeGreaterThanOrEqual(0)
  }
  expect(listingStats.views).toBeGreaterThan(listingStats.pins)
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `promo`/`team`/`listingStats` не экспортированы.

- [ ] **Step 3: Расширить канон**

В `src/lib/demo-deal.ts` в конец добавить:

```ts
/** Демо-акция застройщика для пакетного применения к объявлениям. */
export const promo = {
  title: 'Чистовая отделка в подарок',
  description: 'Скидка на отделку при покупке до конца квартала',
  count: 3,
} as const

export type TeamMember = { initials: string; name: string; role: string; deals: number }

/** Команда застройщика: отдел продаж. */
export const team: TeamMember[] = [
  { initials: 'ОП', name: 'Ольга Петрова', role: 'Руководитель продаж', deals: 21 },
  { initials: 'ИС', name: 'Игорь Соловьёв', role: 'Менеджер', deals: 14 },
  { initials: 'ЕК', name: 'Елена Кузьмина', role: 'Менеджер', deals: 9 },
]

/** Статистика объявления (аудитория). */
export const listingStats = {
  views: 1284,
  pins: 37,
  favorites: 92,
  shares: 18,
} as const
```

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/demo-deal.ts src/lib/__tests__/demo-deal.test.ts
git commit -m "feat(canon): демо-акция, команда, KPI статистики объявления"
```

---

### Task 2: CreateListingScreen (мастер создания, шаг «Медиа»)

**Files:**
- Create: `src/components/app-screens/CreateListingScreen.tsx`
- Create: `src/components/app-screens/__tests__/CreateListingScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `demoObject` из канона; `PhoneFrame` (dark).
- Produces: `CreateListingScreen()` — шаг мастера «Медиа» с прогресс-баром и секциями фото.

Источник `WizardLayout` + `SectionedPhotoStep`: nav (назад + «Закрыть»), h1 шага + призрачная цифра, сегментный прогресс, автосохранение, секции Фото/Планировки/3D, футер «Далее».

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/CreateListingScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreateListingScreen } from '@/components/app-screens'

describe('CreateListingScreen', () => {
  it('шаг «Медиа» с секциями фото', () => {
    render(<CreateListingScreen />)
    expect(screen.getByText('Медиа')).toBeInTheDocument()
    expect(screen.getByText('Фото')).toBeInTheDocument()
    expect(screen.getByText('Планировки')).toBeInTheDocument()
    expect(screen.getByText('3D-визуализации')).toBeInTheDocument()
  })

  it('прогресс мастера и кнопка далее', () => {
    render(<CreateListingScreen />)
    expect(screen.getByText('Далее')).toBeInTheDocument()
    expect(screen.getByText(/из 20 фотографий/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/CreateListingScreen.tsx
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
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { CreateListingScreen } from './CreateListingScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/CreateListingScreen.tsx src/components/app-screens/__tests__/CreateListingScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): CreateListingScreen — мастер создания, шаг «Медиа»"
```

---

### Task 3: SharesApplyScreen (пакетное применение акции)

**Files:**
- Create: `src/components/app-screens/SharesApplyScreen.tsx`
- Create: `src/components/app-screens/__tests__/SharesApplyScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `promo`, `demoObject`, `otherObjects` из канона; `PhoneFrame` (dark).
- Produces: `SharesApplyScreen()` — «Выберите объявления»: чекбокс-список с мультивыбором.

Источник `CompanyShareApplyScreen`/`PostSelectItem`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/SharesApplyScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SharesApplyScreen } from '@/components/app-screens'
import { demoObject, promo } from '@/lib/demo-deal'

describe('SharesApplyScreen', () => {
  it('пакетный выбор объявлений для акции канона', () => {
    render(<SharesApplyScreen />)
    expect(screen.getByText('Выберите объявления')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(promo.title))).toBeInTheDocument()
    expect(screen.getByText('Выбрать все')).toBeInTheDocument()
  })

  it('строка объявления с ценой из канона', () => {
    render(<SharesApplyScreen />)
    expect(screen.getAllByText(demoObject.price).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Сохранить')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/SharesApplyScreen.tsx
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
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { SharesApplyScreen } from './SharesApplyScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/SharesApplyScreen.tsx src/components/app-screens/__tests__/SharesApplyScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): SharesApplyScreen — пакетное применение акции"
```

---

### Task 4: TeamScreen (команда)

**Files:**
- Create: `src/components/app-screens/TeamScreen.tsx`
- Create: `src/components/app-screens/__tests__/TeamScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `team` из канона; `PhoneFrame` (dark).
- Produces: `TeamScreen()` — сегменты «Сотрудники»/«Вступление», список команды, заявка.

Источник `TeamPageScreen`/`RealtorCard`/`TeamRequestCard`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/TeamScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamScreen } from '@/components/app-screens'
import { team } from '@/lib/demo-deal'

describe('TeamScreen', () => {
  it('сегменты и члены команды из канона', () => {
    render(<TeamScreen />)
    expect(screen.getByText('Сотрудники')).toBeInTheDocument()
    expect(screen.getByText('Вступление')).toBeInTheDocument()
    for (const m of team) expect(screen.getByText(m.name)).toBeInTheDocument()
  })

  it('заявка на вступление с действиями', () => {
    render(<TeamScreen />)
    expect(screen.getByText('Заявка на вступление')).toBeInTheDocument()
    expect(screen.getByText('Принять')).toBeInTheDocument()
    expect(screen.getByText('Отклонить')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/TeamScreen.tsx
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
```

Примечание: «Дмитрий Панов» / «ДП» согласованы с `crm.otherClient` из части 1 (то же имя-заявитель). Если ревьюер сочтёт заявителя данными — вынести в `team`-канон отдельным полем (допустимое улучшение).

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { TeamScreen } from './TeamScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/TeamScreen.tsx src/components/app-screens/__tests__/TeamScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): TeamScreen — команда застройщика"
```

---

### Task 5: ListingStatsScreen (статистика объявления)

**Files:**
- Create: `src/components/app-screens/ListingStatsScreen.tsx`
- Create: `src/components/app-screens/__tests__/ListingStatsScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `demoObject`, `listingStats` из канона; `PhoneFrame` (dark).
- Produces: `ListingStatsScreen()` — «Статистика»: KPI-плитки аудитории.

Источник `ListingStatisticsScreen` (вкладка «Аудитория»).

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/ListingStatsScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ListingStatsScreen } from '@/components/app-screens'
import { listingStats } from '@/lib/demo-deal'

describe('ListingStatsScreen', () => {
  it('KPI-плитки аудитории из канона', () => {
    render(<ListingStatsScreen />)
    expect(screen.getByText('Статистика')).toBeInTheDocument()
    expect(screen.getByText('Просмотры')).toBeInTheDocument()
    expect(screen.getByText('Закрепления')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${listingStats.views}`))).toBeInTheDocument()
  })

  it('CTA создать сделку', () => {
    render(<ListingStatsScreen />)
    expect(screen.getByText('Создать сделку')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/ListingStatsScreen.tsx
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
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { ListingStatsScreen } from './ListingStatsScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/ListingStatsScreen.tsx src/components/app-screens/__tests__/ListingStatsScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): ListingStatsScreen — статистика объявления (KPI)"
```

---

### Task 6: Витрина + верификация

**Files:**
- Modify: `src/app/app-screens/page.tsx`

**Interfaces:**
- Consumes: четыре новых экрана застройщика.
- Produces: витрина пополнена группой «Застройщик».

- [ ] **Step 1: Добавить экраны в витрину**

В `src/app/app-screens/page.tsx` импортировать `CreateListingScreen, SharesApplyScreen, TeamScreen, ListingStatsScreen` и добавить группу:

```tsx
['Застройщик', [
  ['Создание объявления · Медиа', <CreateListingScreen key="cl" />],
  ['Пакетное применение акции', <SharesApplyScreen key="sa" />],
  ['Команда', <TeamScreen key="tm" />],
  ['Статистика объявления', <ListingStatsScreen key="ls" />],
]],
```

- [ ] **Step 2: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 3: Проверка витрины (оркестратор — скриншот)**

`npm run dev` (в фоне), открыть `/app-screens`, убедиться, что четыре экрана застройщика рендерятся (все тёмные CRM). Остановить сервер.

- [ ] **Step 4: Commit**

```bash
git add src/app/app-screens/page.tsx
git commit -m "feat(screens): витрина — экраны застройщика"
```

---

## Что дальше

- План четырёх конвейеров на StickyPipeline (со свитчером в шапке и редиректами) — использует все экраны частей 1–2 плюс существующие.
- Каркас StickyPipeline перед конвейером инвестора эволюционирует на grid-стек (переменная высота панелей) — вход зафиксирован в спеке.
