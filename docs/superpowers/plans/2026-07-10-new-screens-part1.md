# Новые экраны, часть 1: канон + спайн «покупатель → риэлтор» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить HTML-копии экранов приложения, покрывающие спайн «покупатель попадает к риэлтору → закрепление → совместная работа → бонусы»: принятие приглашения, шаринг реф-ссылки/QR, Workspace, профиль риэлтора, бонусы. Плюс расширение канона под них. Экраны верны реальному приложению (сверено).

**Architecture:** Экраны — компоненты в `src/components/app-screens/`, экспортируются из `index.ts`, строятся на `PhoneFrame` (variant light/dark) и канон-данных. Палитра по регистрам: покупательский экран — `app.*` (светлый), CRM-экраны риэлтора — `app-dark.*`. Витрина `/app-screens` пополняется. Эти экраны — панели будущих ролевых конвейеров.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, lucide-react, qrcode.react (уже зависимость), vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (раздел «Новые экраны», сверено с приложением).
**Реальные источники** в `/Users/romanmensikov/bast`: `ReferralPinSuccess`, `QrShareModal`/`QrShareCard`, `WorkspaceScreenV2`/`PartnerCard`/`ReminderRow`, `ProfileScreen`/`ProfileHeader`, `BonusesList`/`RewardCard`.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Демо-данные только из канона `src/lib/demo-deal.ts` — ни цен/имён/ссылок в компонентах.
- Палитра: покупательский экран — `app.*`; CRM-экраны — только `app-dark.*`. Легаси (`clay/pine/limestone/sage/mist`) запрещены.
- Все экраны — внутри `PhoneFrame` (`variant="dark"` для CRM); используют существующий публичный API.
- Русские тексты: «ёлочки», тире «—», средник «·» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Расширение канона под новые экраны

**Files:**
- Modify: `src/lib/demo-deal.ts`
- Modify: `src/lib/__tests__/demo-deal.test.ts`

**Interfaces:**
- Consumes: существующий канон (`demoObject`, `participants`, `otherObjects`, `crm`, `verification`).
- Produces:
  - `referral: { url: string; code: string }` — шаринг/QR.
  - `realtorStats: { rating: string; reviews: number; deals: number; objects: number; since: string }` — профиль риэлтора.
  - `bonuses: Bonus[]` (ровно 3), `Bonus = { key: string; kind: 'Сертификат' | 'Акция'; title: string; value: string; until: string; provider: string }`.

- [ ] **Step 1: Дополнить тест канона**

Добавить в `src/lib/__tests__/demo-deal.test.ts` импорты `referral, realtorStats, bonuses` и тесты внутрь describe:

```ts
it('реферальная ссылка и код', () => {
  expect(referral.code).toMatch(/^[А-ЯЁA-Z0-9-]+$/)
  expect(referral.url).toContain(referral.code)
})

it('статистика риэлтора', () => {
  expect(realtorStats.rating).toMatch(/^\d\.\d$/)
  expect(realtorStats.deals).toBeGreaterThan(0)
  expect(realtorStats.objects).toBeGreaterThan(0)
})

it('ровно 3 бонуса с полями', () => {
  expect(bonuses).toHaveLength(3)
  for (const b of bonuses) {
    expect(['Сертификат', 'Акция']).toContain(b.kind)
    expect(b.title).toBeTruthy()
    expect(b.value).toBeTruthy()
    expect(b.provider).toBeTruthy()
  }
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `referral`/`realtorStats`/`bonuses` не экспортированы.

- [ ] **Step 3: Расширить канон**

В `src/lib/demo-deal.ts` добавить телефон покупателю (в `participants.buyer` — тип `Participant` уже допускает `phone?`): `phone: '+7 902 118 44 30'`. Затем после блока `crm` добавить:

```ts
/** Реферальная ссылка риэлтора для шаринга объекта и QR. */
export const referral = {
  url: 'bast.app/s/АК-2F',
  code: 'АК-2F',
} as const

/** Публичная статистика риэлтора (профиль). */
export const realtorStats = {
  rating: '4.8',
  reviews: 12,
  deals: 34,
  objects: 18,
  since: 'март 2024',
} as const

export type Bonus = {
  key: string
  kind: 'Сертификат' | 'Акция'
  title: string
  value: string
  until: string
  provider: string
}

/** Бонусы по закрытой сделке: партнёрские сертификаты и акции застройщика. */
export const bonuses: Bonus[] = [
  { key: 'finish', kind: 'Сертификат', title: 'Чистовая отделка', value: '−15%', until: 'до 31 декабря', provider: 'Партнёр «Отделка+»' },
  { key: 'insurance', kind: 'Сертификат', title: 'Страхование дома', value: 'первый год', until: 'после подписания', provider: 'СК «Щит»' },
  { key: 'furnish', kind: 'Акция', title: 'Обустройство участка', value: '50 000 ₽', until: 'до конца сделки', provider: 'Застройщик' },
]
```

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/demo-deal.ts src/lib/__tests__/demo-deal.test.ts
git commit -m "feat(canon): реф-ссылка, статистика риэлтора, бонусы"
```

---

### Task 2: ReferralAcceptScreen (вход покупателя, светлый)

**Files:**
- Create: `src/components/app-screens/ReferralAcceptScreen.tsx`
- Create: `src/components/app-screens/__tests__/ReferralAcceptScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `demoObject`, `participants` из канона; `PhoneFrame` (light).
- Produces: `ReferralAcceptScreen()` — экран «Объявление закреплено» с карточкой объекта и риэлтора.

Источник `ReferralPinSuccess`: заголовок «Объявление закреплено», зелёная плашка «Закреплено за вами», карточка объекта, карточка риэлтора «Ваш риелтор», кнопки.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/ReferralAcceptScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReferralAcceptScreen } from '@/components/app-screens'
import { demoObject, participants } from '@/lib/demo-deal'

describe('ReferralAcceptScreen', () => {
  it('объявление закреплено за покупателем', () => {
    render(<ReferralAcceptScreen />)
    expect(screen.getByText('Объявление закреплено')).toBeInTheDocument()
    expect(screen.getByText('Закреплено за вами')).toBeInTheDocument()
  })

  it('карточка объекта и риэлтора из канона', () => {
    render(<ReferralAcceptScreen />)
    expect(screen.getByText(demoObject.priceShort)).toBeInTheDocument()
    expect(screen.getByText(participants.realtor.name)).toBeInTheDocument()
    expect(screen.getByText('Ваш риелтор')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/ReferralAcceptScreen.tsx
import Image from 'next/image'
import { ChevronLeft, MessageCircle, ShieldCheck } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, participants } from '@/lib/demo-deal'

/** Принятие приглашения покупателем: объект закреплён за риэлтором, который его привёл. */
export function ReferralAcceptScreen() {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col bg-app-bg">
        {/* Хедер */}
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-ink" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-ink">Приглашение</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-5">
          <h3 className="text-center text-[20px] font-bold text-app-ink">Объявление закреплено</h3>
          <div className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-app-brand-soft px-3 py-1.5 text-[12px] font-semibold text-app-brand">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
            Закреплено за вами
          </div>

          {/* Карточка объекта */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-app-line bg-app-bg shadow-sm">
            <div className="relative h-28">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="340px" />
            </div>
            <div className="p-3">
              <p className="text-[15px] font-bold text-app-ink">{demoObject.priceShort}</p>
              <p className="truncate text-[12px] text-app-caption">{demoObject.title}, {demoObject.area}</p>
              <p className="truncate text-[11px] text-app-caption">{demoObject.district}</p>
            </div>
          </div>

          {/* Карточка риэлтора */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-app-line p-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-[14px] font-bold text-app-brand">
              {participants.realtor.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-app-ink">{participants.realtor.name}</p>
              <p className="text-[11px] text-app-caption">Ваш риелтор</p>
            </div>
          </div>

          <p className="mt-4 text-[12px] leading-snug text-app-caption">
            Риелтор сопроводит вас по этому объекту — от просмотра до сделки. Найти его можно в совместном пространстве.
          </p>
        </div>

        {/* Кнопки */}
        <div className="shrink-0 space-y-2 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center rounded-full bg-app-brand text-[14px] font-semibold text-white">
            Открыть объявление
          </span>
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-app-brand-border text-[14px] font-semibold text-app-brand">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Написать риелтору
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
```

- [ ] **Step 4: Экспортировать и проверить**

В `src/components/app-screens/index.ts` добавить `export { ReferralAcceptScreen } from './ReferralAcceptScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/ReferralAcceptScreen.tsx src/components/app-screens/__tests__/ReferralAcceptScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): ReferralAcceptScreen — принятие приглашения (вход покупателя)"
```

---

### Task 3: ShareInviteScreen (шаринг реф-ссылки/QR, тёмный)

**Files:**
- Create: `src/components/app-screens/ShareInviteScreen.tsx`
- Create: `src/components/app-screens/__tests__/ShareInviteScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `demoObject`, `referral` из канона; `PhoneFrame` (dark); `QRCodeSVG` из `qrcode.react`.
- Produces: `ShareInviteScreen()` — «Поделиться»: QR + ссылка + кнопки.

Источник `QrShareModal`/`QrShareCard`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/ShareInviteScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShareInviteScreen } from '@/components/app-screens'
import { referral } from '@/lib/demo-deal'

describe('ShareInviteScreen', () => {
  it('заголовок и реф-ссылка из канона', () => {
    render(<ShareInviteScreen />)
    expect(screen.getByText('Поделиться')).toBeInTheDocument()
    expect(screen.getByText(referral.url)).toBeInTheDocument()
  })

  it('кнопки поделиться и копировать', () => {
    render(<ShareInviteScreen />)
    expect(screen.getByText('Поделиться ссылкой')).toBeInTheDocument()
    expect(screen.getByText('Копировать')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/ShareInviteScreen.tsx
import { QRCodeSVG } from 'qrcode.react'
import { ChevronLeft, Copy, Link2, Share2 } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { demoObject, referral } from '@/lib/demo-deal'

/** Шаринг объекта с персональной реф-ссылкой: клиент закрепляется за риэлтором. */
export function ShareInviteScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="flex min-h-0 flex-1 flex-col bg-app-dark-bg">
        <div className="flex shrink-0 items-center gap-3 px-4 pt-3">
          <ChevronLeft className="h-6 w-6 text-app-dark-text" strokeWidth={2} />
          <p className="text-[15px] font-semibold text-app-dark-text">Поделиться</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-4">
          <p className="text-[13px] text-app-dark-caption">Поделитесь ссылкой или QR-кодом на объект «{demoObject.title}, {demoObject.area}».</p>

          {/* QR-карточка */}
          <div className="mt-4 rounded-2xl border border-app-dark-border bg-app-dark-surface p-4">
            <div className="mx-auto w-fit rounded-xl bg-white p-3">
              <QRCodeSVG value={`https://${referral.url}`} size={150} bgColor="#FFFFFF" fgColor="#0F1217" level="M" marginSize={0} title="QR-код приглашения" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-app-dark-inset px-3 py-2.5">
              <Link2 className="h-4 w-4 shrink-0 text-app-dark-trust" strokeWidth={2} />
              <p className="truncate text-[12px] text-app-dark-caption">{referral.url}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-app-dark-trust-soft px-3 py-2 text-[11px] text-app-dark-trust">
            Клиент откроет ссылку — и закрепится за вами. Авторство сохранится в сделке.
          </div>
        </div>

        <div className="shrink-0 space-y-2 px-4 pb-6 pt-3">
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-app-dark-trust text-[14px] font-semibold text-app-dark-bg">
            <Share2 className="h-4 w-4" strokeWidth={2} />
            Поделиться ссылкой
          </span>
          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-app-dark-border text-[14px] font-semibold text-app-dark-text">
            <Copy className="h-4 w-4" strokeWidth={2} />
            Копировать
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { ShareInviteScreen } from './ShareInviteScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/ShareInviteScreen.tsx src/components/app-screens/__tests__/ShareInviteScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): ShareInviteScreen — шаринг реф-ссылки и QR"
```

---

### Task 4: WorkspaceScreen (совместное пространство, тёмный)

**Files:**
- Create: `src/components/app-screens/WorkspaceScreen.tsx`
- Create: `src/components/app-screens/__tests__/WorkspaceScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `participants`, `demoObject`, `otherObjects`, `crm`, `stages` из канона; `PhoneFrame` (dark).
- Produces: `WorkspaceScreen()` — «Рабочее пространство»: партнёр, сделка, напоминание, просмотрел.

Источник `WorkspaceScreenV2`/`PartnerCard`/`ReminderRow`/`ViewedCompactCard`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/WorkspaceScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WorkspaceScreen } from '@/components/app-screens'
import { crm, participants } from '@/lib/demo-deal'

describe('WorkspaceScreen', () => {
  it('карточка партнёра-клиента из канона', () => {
    render(<WorkspaceScreen />)
    expect(screen.getByText('Рабочее пространство')).toBeInTheDocument()
    expect(screen.getByText(participants.buyer.name)).toBeInTheDocument()
    expect(screen.getByText('Клиент')).toBeInTheDocument()
  })

  it('напоминание из канона', () => {
    render(<WorkspaceScreen />)
    expect(screen.getByText(crm.reminder.text)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/WorkspaceScreen.tsx
import Image from 'next/image'
import { Bell, MessageCircle, Phone, Plus } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { crm, demoObject, otherObjects, participants, stages } from '@/lib/demo-deal'

/** Совместное пространство «риэлтор ↔ клиент»: партнёр, сделка, напоминание, просмотренное. */
export function WorkspaceScreen() {
  const viewed = otherObjects.slice(0, 2)
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Рабочее пространство</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Партнёр */}
        <div className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[14px] font-bold text-app-dark-trust">
            {participants.buyer.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <span className="rounded-full border border-app-dark-border px-2 py-0.5 text-[10px] font-semibold text-app-dark-caption">Клиент</span>
            </div>
            <p className="mt-0.5 text-[11px] text-app-dark-caption">{participants.buyer.phone}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-dark-trust-soft text-app-dark-trust">
            <Phone className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>

        {/* Сделка */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Сделка</p>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex gap-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-dark-inset">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-app-dark-trust-soft px-2 py-0.5 text-[10px] font-semibold text-app-dark-trust">В работе</span>
                <span className="text-[11px] text-app-dark-caption">#1042</span>
              </div>
              <p className="mt-1 text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
              <p className="truncate text-[11px] text-app-dark-caption">{demoObject.district}</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-app-dark-caption">Этап 3 из {stages.length}</p>
          <p className="text-[13px] font-semibold text-app-dark-text">{stages[2].label}</p>
        </div>

        {/* Напоминание */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Напоминания</p>
        <div className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <Bell className="h-4 w-4 shrink-0 text-app-dark-gold" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-app-dark-text">{crm.reminder.text}</p>
            <p className="text-[11px] text-app-dark-caption">{crm.reminder.when}</p>
          </div>
        </div>

        {/* Просмотрел */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Просмотрел</p>
        <div className="flex gap-2.5">
          {viewed.map((v) => (
            <div key={v.title} className="w-32 shrink-0 overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
              <div className="relative h-16">
                <Image src={v.photo} alt="" fill className="object-cover" sizes="128px" />
                <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-app-dark-trust text-app-dark-bg">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
              <div className="p-2">
                <p className="text-[12px] font-bold text-app-dark-text">{v.priceShort}</p>
                <p className="truncate text-[10px] text-app-dark-caption">{v.district}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { WorkspaceScreen } from './WorkspaceScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/WorkspaceScreen.tsx src/components/app-screens/__tests__/WorkspaceScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): WorkspaceScreen — совместное пространство риэлтор↔клиент"
```

---

### Task 5: RealtorProfileScreen (профиль риэлтора, тёмный)

**Files:**
- Create: `src/components/app-screens/RealtorProfileScreen.tsx`
- Create: `src/components/app-screens/__tests__/RealtorProfileScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `participants`, `realtorStats`, `otherObjects` из канона; `PhoneFrame` (dark).
- Produces: `RealtorProfileScreen()` — профиль с бейджем «Риэлтор», статистикой, объявлениями.

Источник `ProfileScreen`/`ProfileHeader`/`PublicProfileScreenV2`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/RealtorProfileScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorProfileScreen } from '@/components/app-screens'
import { participants, realtorStats } from '@/lib/demo-deal'

describe('RealtorProfileScreen', () => {
  it('имя, роль и рейтинг риэлтора', () => {
    render(<RealtorProfileScreen />)
    expect(screen.getByText(participants.realtor.name)).toBeInTheDocument()
    expect(screen.getByText('Риэлтор')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(realtorStats.rating))).toBeInTheDocument()
  })

  it('статистика сделок и объектов', () => {
    render(<RealtorProfileScreen />)
    expect(screen.getByText(new RegExp(`${realtorStats.deals}`))).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/RealtorProfileScreen.tsx
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
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { RealtorProfileScreen } from './RealtorProfileScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/RealtorProfileScreen.tsx src/components/app-screens/__tests__/RealtorProfileScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): RealtorProfileScreen — профиль риэлтора"
```

---

### Task 6: RewardsScreen (бонусы, тёмный)

**Files:**
- Create: `src/components/app-screens/RewardsScreen.tsx`
- Create: `src/components/app-screens/__tests__/RewardsScreen.test.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `bonuses`, `demoObject` из канона; `PhoneFrame` (dark).
- Produces: `RewardsScreen()` — «Бонусы»: партнёрские сертификаты и акции по закрытой сделке.

Источник `BonusesList`/`RewardCard`.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/RewardsScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RewardsScreen } from '@/components/app-screens'
import { bonuses } from '@/lib/demo-deal'

describe('RewardsScreen', () => {
  it('все бонусы канона с номиналом и поставщиком', () => {
    render(<RewardsScreen />)
    for (const b of bonuses) {
      expect(screen.getByText(b.title)).toBeInTheDocument()
      expect(screen.getByText(b.value)).toBeInTheDocument()
    }
  })

  it('заголовок бонусов', () => {
    render(<RewardsScreen />)
    expect(screen.getByText('Бонусы')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать экран**

```tsx
// src/components/app-screens/RewardsScreen.tsx
import { Gift } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { bonuses, demoObject } from '@/lib/demo-deal'

/** Бонусы по закрытой сделке: партнёрские сертификаты и акции застройщика. */
export function RewardsScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Бонусы</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Группа по сделке */}
        <div className="flex items-center gap-2 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <Gift className="h-5 w-5 shrink-0 text-app-dark-gold" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-app-dark-text">Сделка #1042 · {demoObject.title}</p>
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
```

- [ ] **Step 4: Экспортировать и проверить**

В `index.ts` добавить `export { RewardsScreen } from './RewardsScreen'`.

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/RewardsScreen.tsx src/components/app-screens/__tests__/RewardsScreen.test.tsx src/components/app-screens/index.ts
git commit -m "feat(screens): RewardsScreen — бонусы по закрытой сделке"
```

---

### Task 7: Витрина + верификация

**Files:**
- Modify: `src/app/app-screens/page.tsx`

**Interfaces:**
- Consumes: пять новых экранов.
- Produces: витрина пополнена группой «Спайн покупатель → риэлтор».

- [ ] **Step 1: Добавить новые экраны в витрину**

В `src/app/app-screens/page.tsx` импортировать `ReferralAcceptScreen, ShareInviteScreen, WorkspaceScreen, RealtorProfileScreen, RewardsScreen` и добавить в массив `showcase` новую группу:

```tsx
['Спайн покупатель → риэлтор', [
  ['Покупатель: приглашение принято', <ReferralAcceptScreen key="ra" />],
  ['Риэлтор: шаринг реф-ссылки', <ShareInviteScreen key="si" />],
  ['Риэлтор: рабочее пространство', <WorkspaceScreen key="ws" />],
  ['Риэлтор: профиль', <RealtorProfileScreen key="rp" />],
  ['Риэлтор: бонусы', <RewardsScreen key="rw" />],
]],
```

- [ ] **Step 2: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 3: Проверка витрины (оркестратор — скриншот)**

`npm run dev` (в фоне), открыть `/app-screens`, убедиться, что пять новых экранов рендерятся; ReferralAccept — светлый, остальные — тёмные CRM. Остановить сервер.

- [ ] **Step 4: Commit**

```bash
git add src/app/app-screens/page.tsx
git commit -m "feat(screens): витрина — спайн покупатель → риэлтор"
```

---

## Что дальше

- **Часть 2 (экраны застройщика):** CreateListingScreen (шаг мастера), SharesApplyScreen (пакетная акция, чекбоксы), TeamScreen (сотрудники/заявки), ListingStatsScreen (KPI). Отдельным планом со своим канон-расширением (шаги, акция, команда, статистика).
- Затем — план четырёх конвейеров на StickyPipeline (со свитчером и редиректами).
