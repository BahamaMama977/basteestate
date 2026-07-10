# Экраны-копии «Живой сделки» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Все экраны приложения на сайте рендерятся из канона демо-сделки и параметризуются актом; появляются два тёмных CRM-экрана (риэлтор, застройщик) в палитре `app-dark`.

**Architecture:** Канон (`src/lib/demo-deal.ts`) расширяется полями из спеки (материалы, чек-лист проверки, другие объекты, CRM-данные). Четыре существующих экрана избавляются от хардкодов и принимают проп `act?: DealAct`. PhoneFrame получает вариант `dark`. Два новых CRM-экрана строятся на `app-dark.*`. Компонентные тесты — vitest + jsdom + Testing Library с моком `next/image`.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind, vitest 4, @testing-library/react, jsdom.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md`
**Фундамент (план №1):** канон, токены `paper`/`graphite`/`app-dark`, `font-mono` — уже в ветке.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project` (все команды из неё).
- Демо-данные только из канона `src/lib/demo-deal.ts` — в компонентах экранов не должно остаться ни одной захардкоженной цены, имени, адреса или этапа.
- Этапов сделки ровно 4 (канон `stages`); любые «этап N из 5» — дефект.
- Точка зрения чата: покупатель пишет продавцу. Сообщения покупателя — справа (зелёные), ответы продавца — слева (белые). Шапка чата — продавец.
- Палитра светлых экранов — группа `app.*`; тёмных CRM-экранов — только `app-dark.*`. Терракота (`clay`) и легаси-группы (`mist`, `secondary`, яркий `accent`) в новом коде запрещены.
- Русские тексты: «ёлочки», тире «—», неразрывные пробелы (нормы ru-text).
- Значение нового токена: `app.canvas = '#F7F8F5'` (канвас приложения, совпадает с `paper`).
- Существующий публичный API не ломать: экраны экспортируются из `src/components/app-screens/index.ts`, пропы только добавляются (опциональные).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Расширение канона демо-сделки

**Files:**
- Modify: `src/lib/demo-deal.ts`
- Modify: `src/lib/__tests__/demo-deal.test.ts`
- Modify: `tailwind.config.ts` (одна строка — `canvas` в группе `app`)
- Modify: `src/lib/__tests__/tokens.test.ts` (одна проверка)

**Interfaces:**
- Consumes: канон из плана №1 (`demoObject`, `participants`, `chat`, `stages`, `acts`, `demo`).
- Produces (для задач 2–6 и плана «Главная»):
  - `demoObject` дополнен: `houseType: 'Кирпич'`, `heating: 'Газ'`, `bathrooms: '2'`.
  - `otherObjects: OtherObject[]` (ровно 3), `OtherObject = { title: string; district: string; price: string; priceShort: string; photo: string }`.
  - `verification: VerificationItem[]` (ровно 5), `VerificationItem = { key: string; label: string; caption: string }`.
  - `crm: { inquiry: { text: string; time: string; status: string; assignee: string }; reminder: { text: string; when: string } }`.
  - Класс `bg-app-canvas` в Tailwind.

- [ ] **Step 1: Дополнить тест канона**

Добавить в `src/lib/__tests__/demo-deal.test.ts` импорты `otherObjects`, `verification`, `crm` (в существующую строку импорта из `@/lib/demo-deal`) и новые тесты внутрь существующего `describe`:

```ts
it('материалы объекта — из спеки (кирпич, газ, 2 санузла)', () => {
  expect(demoObject.houseType).toBe('Кирпич')
  expect(demoObject.heating).toBe('Газ')
  expect(demoObject.bathrooms).toBe('2')
})

it('ровно 3 других объекта — без дублей с каноном', () => {
  expect(otherObjects).toHaveLength(3)
  for (const o of otherObjects) {
    expect(o.title).not.toBe(demoObject.title)
    expect(o.photo).toBeTruthy()
    expect(o.priceShort).toMatch(/млн ₽$/)
  }
})

it('чек-лист проверки — ровно 5 пунктов из спеки', () => {
  expect(verification.map((v) => v.label)).toEqual([
    'Продавец',
    'Документы',
    'Цена',
    'Характеристики',
    'Наличие объекта',
  ])
  for (const v of verification) expect(v.caption).toBeTruthy()
})

it('CRM-данные согласованы с чатом', () => {
  expect(crm.inquiry.text).toBe(chat[0].text)
  expect(crm.inquiry.time).toBe(chat[0].time)
  expect(crm.reminder.when).toBeTruthy()
})

it('реплики продавца — от множественного лица (отдел продаж)', () => {
  const sellerTexts = chat.filter((m) => m.from === 'seller').map((m) => m.text)
  expect(sellerTexts.join(' ')).not.toMatch(/Готова /)
})
```

- [ ] **Step 2: Дополнить тест токенов**

В `src/lib/__tests__/tokens.test.ts`, в тест «светлая палитра приложения не дрейфует», добавить строку:

```ts
expect(colors.app.canvas).toBe('#F7F8F5')
```

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `npm test`
Expected: FAIL — `demoObject.houseType` undefined, `otherObjects` не экспортирован, `colors.app.canvas` undefined, «Готова показать» найдена.

- [ ] **Step 4: Расширить канон**

В `src/lib/demo-deal.ts`:

4a. В `demoObject` после `year: '2025',` добавить:

```ts
houseType: 'Кирпич',
heating: 'Газ',
bathrooms: '2',
```

4b. В `chat` заменить текст второго сообщения:

```ts
{ from: 'seller', text: 'Да, актуально. Готовы показать в эти выходные.', time: '13:44' },
```

4c. После блока `chat` добавить:

```ts
export type OtherObject = { title: string; district: string; price: string; priceShort: string; photo: string }

/** Другие объекты каталога — для карты, списков и блока «Просмотрел». */
export const otherObjects: OtherObject[] = [
  { title: 'Коттедж у пруда, 210 м²', district: 'Октябрьский район', price: '15 200 000 ₽', priceShort: '15,2 млн ₽', photo: '/images/hero-house.png' },
  { title: 'Дом с террасой, 156 м²', district: 'Октябрьский район', price: '9 400 000 ₽', priceShort: '9,4 млн ₽', photo: '/images/hero-house.png' },
  { title: 'Дом в посёлке, 128 м²', district: 'Игринский район', price: '7 900 000 ₽', priceShort: '7,9 млн ₽', photo: '/images/cta-house.png' },
]

export type VerificationItem = { key: string; label: string; caption: string }

/** Чек-лист проверки объявления до публикации (спека, акт 4 и секция «Проверка»). */
export const verification: VerificationItem[] = [
  { key: 'seller', label: 'Продавец', caption: 'кто продаёт и на каком основании' },
  { key: 'docs', label: 'Документы', caption: 'сведения по объекту' },
  { key: 'price', label: 'Цена', caption: 'данные в объявлении' },
  { key: 'specs', label: 'Характеристики', caption: 'параметры дома и участка' },
  { key: 'availability', label: 'Наличие объекта', caption: 'актуальность предложения' },
]

/** Данные CRM-экранов: обращение застройщику и напоминание риэлтора. */
export const crm = {
  inquiry: { text: chat[0].text, time: chat[0].time, status: 'Новое обращение', assignee: 'Отдел продаж' },
  reminder: { text: 'Согласовать показ дома у леса', when: 'завтра 09:00' },
} as const
```

4d. В `tailwind.config.ts`, в группу `app` (после `bg: '#FFFFFF',`) добавить:

```ts
canvas: '#F7F8F5',
```

- [ ] **Step 5: Убедиться, что тесты и типы проходят**

Run: `npm test && npm run type-check`
Expected: все PASS, типы чисты.

- [ ] **Step 6: Commit**

```bash
git add src/lib/demo-deal.ts src/lib/__tests__/demo-deal.test.ts tailwind.config.ts src/lib/__tests__/tokens.test.ts
git commit -m "feat(canon): материалы, другие объекты, чек-лист проверки и CRM-данные"
```

---

### Task 2: Компонентные тесты + ChatScreen из канона

**Files:**
- Modify: `package.json` (devDependencies), `vitest.config.ts`
- Create: `src/test/setup.tsx`
- Create: `src/components/app-screens/__tests__/ChatScreen.test.tsx`
- Modify: `src/components/app-screens/ChatScreen.tsx`

**Interfaces:**
- Consumes: `chat`, `participants`, `demoObject`, `acts`, `DealAct` из канона.
- Produces: `ChatScreen({ act?: DealAct })` — по умолчанию `acts[1]` (акт 2, все 4 сообщения); инфраструктура компонентных тестов (jsdom, RTL, мок next/image) для задач 3–6.

- [ ] **Step 1: Установить тестовые зависимости**

Run: `npm install -D jsdom @testing-library/react @testing-library/jest-dom`
Expected: пакеты добавлены без ошибок.

- [ ] **Step 2: Настроить jsdom и setup-файл**

В `vitest.config.ts` заменить блок `test` на:

```ts
test: {
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.tsx'],
},
```

Создать `src/test/setup.tsx`:

```tsx
import React from 'react'
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// next/image в jsdom не работает без окружения Next — рендерим обычный img.
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, sizes: _sizes, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />
  },
}))
```

- [ ] **Step 3: Написать падающий тест ChatScreen**

```tsx
// src/components/app-screens/__tests__/ChatScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatScreen } from '@/components/app-screens'
import { acts, chat, participants } from '@/lib/demo-deal'

describe('ChatScreen', () => {
  it('шапка — продавец из канона', () => {
    render(<ChatScreen />)
    expect(screen.getByText(participants.seller.name)).toBeInTheDocument()
  })

  it('по умолчанию (акт 2) — все сообщения канона', () => {
    render(<ChatScreen />)
    for (const m of chat) expect(screen.getByText(m.text)).toBeInTheDocument()
  })

  it('акт 1 — сообщений ещё нет', () => {
    render(<ChatScreen act={acts[0]} />)
    for (const m of chat) expect(screen.queryByText(m.text)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — шапка содержит имя риэлтора, а не продавца; проп `act` не существует (TS-ошибка при type-check тоже допустима как RED).

- [ ] **Step 5: Переписать ChatScreen на канон**

Заменить содержимое `src/components/app-screens/ChatScreen.tsx`:

```tsx
import Image from 'next/image'
import { CheckCheck, ChevronLeft, MoreVertical, Send } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { acts, chat, demoObject, participants, type DealAct } from '@/lib/demo-deal'

/** Чат по объекту глазами покупателя: его сообщения справа, ответы продавца слева. */
export function ChatScreen({ act = acts[1] }: { act?: DealAct }) {
  const messages = chat.slice(0, act.chatCount)
  return (
    <PhoneFrame>
      {/* Шапка — продавец */}
      <div className="flex shrink-0 items-center gap-3 border-b border-app-line bg-app-bg px-3 py-2.5">
        <ChevronLeft className="h-6 w-6 text-app-ink" strokeWidth={2} />
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-app-brand-soft">
          <span className="flex h-full w-full items-center justify-center text-[13px] font-bold text-app-brand">
            {participants.seller.initials}
          </span>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-app-success" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-app-ink">{participants.seller.name}</p>
          <p className="text-[11px] font-medium text-app-success">онлайн</p>
        </div>
        <MoreVertical className="h-5 w-5 text-app-caption" strokeWidth={2} />
      </div>

      {/* Карточка объекта чата */}
      <div className="shrink-0 px-3 py-2">
        <div className="flex items-center gap-3 rounded-2xl bg-app-muted p-2">
          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-xl bg-app-inset">
            <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-app-ink">{demoObject.title}, {demoObject.area}</p>
            <p className="truncate text-[11px] text-app-caption">{demoObject.district}</p>
          </div>
          <p className="shrink-0 text-[13px] font-bold text-app-ink">{demoObject.priceShort}</p>
        </div>
      </div>

      {/* Лента сообщений */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden bg-app-muted/40 px-3 py-3">
        {messages.length > 0 && (
          <div className="mx-auto rounded-full bg-app-inset px-3 py-1 text-[10px] font-medium text-app-caption">Сегодня</div>
        )}
        {messages.map((m) => {
          const me = m.from === 'buyer'
          return (
            <div key={m.time} className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[76%] px-3 py-2 text-[13px] leading-snug shadow-sm ${
                  me
                    ? 'rounded-2xl rounded-br-md bg-app-brand text-white'
                    : 'rounded-2xl rounded-bl-md border border-black/5 bg-white text-app-ink'
                }`}
              >
                <p>{m.text}</p>
                <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${me ? 'text-white/70' : 'text-app-placeholder'}`}>
                  <span>{m.time}</span>
                  {me && <CheckCheck className="h-3.5 w-3.5" strokeWidth={2} />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Поле ввода */}
      <div className="flex shrink-0 items-center gap-2 border-t border-app-line bg-app-bg px-3 py-2.5 pb-6">
        <div className="flex flex-1 items-center rounded-full bg-app-muted px-4 py-2.5">
          <span className="text-[13px] text-app-placeholder">Сообщение</span>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app-brand text-white">
          <Send className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </PhoneFrame>
  )
}
```

- [ ] **Step 6: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: все PASS (включая старые тесты канона и токенов).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.tsx src/components/app-screens/ChatScreen.tsx src/components/app-screens/__tests__/ChatScreen.test.tsx
git commit -m "feat(screens): ChatScreen из канона с точкой зрения покупателя + RTL-инфраструктура"
```

---

### Task 3: DealScreen — этапы из канона, параметризация актом

**Files:**
- Create: `src/components/app-screens/__tests__/DealScreen.test.tsx`
- Modify: `src/components/app-screens/DealScreen.tsx`

**Interfaces:**
- Consumes: `stages`, `acts`, `otherObjects`, `crm`, `participants`, `demoObject`, `DealAct`.
- Produces: `DealScreen({ act?: DealAct })` — по умолчанию `acts[3]` (этап 3 из 4 «Договор готовится»).

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/DealScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealScreen } from '@/components/app-screens'
import { acts, crm, stages } from '@/lib/demo-deal'

describe('DealScreen', () => {
  it('по умолчанию — этап 3 из 4, «Договор готовится»', () => {
    render(<DealScreen />)
    expect(screen.getByText('Этап 3 из 4')).toBeInTheDocument()
    expect(screen.getByText(stages[2].label)).toBeInTheDocument()
  })

  it('акт 5 — этап 4 из 4, «Документы подписаны»', () => {
    render(<DealScreen act={acts[4]} />)
    expect(screen.getByText('Этап 4 из 4')).toBeInTheDocument()
    expect(screen.getByText(stages[3].label)).toBeInTheDocument()
  })

  it('нигде нет «из 5»', () => {
    render(<DealScreen />)
    expect(screen.queryByText(/из 5/)).not.toBeInTheDocument()
  })

  it('напоминание — из канона', () => {
    render(<DealScreen />)
    expect(screen.getByText(crm.reminder.text)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — сейчас «Этап 3 из 5» и локальный массив `stages` из 5 элементов.

- [ ] **Step 3: Переписать DealScreen**

В `src/components/app-screens/DealScreen.tsx`:

3a. Заменить строки 1–11 (импорты и локальные `stages`/`currentStage`/`viewed`) на:

```tsx
import Image from 'next/image'
import { Check, ChevronRight, MessageCircle, Phone, Plus } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { acts, crm, demo, otherObjects, stages, type DealAct } from '@/lib/demo-deal'
```

3b. Сигнатуру компонента заменить на:

```tsx
/** Рабочее пространство покупателя: партнёр, сделка с этапами канона, напоминания. */
export function DealScreen({ act = acts[3] }: { act?: DealAct }) {
  const stageIndex = Math.max(0, act.completedStages - 1)
  const viewed = otherObjects.slice(1, 3)
```

3c. Блок «Этапы» (бывшие строки 66–76) заменить на:

```tsx
<p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-app-caption">
  Этап {act.completedStages} из {stages.length}
</p>
<p className="text-[15px] font-bold text-app-ink">{stages[stageIndex].label}</p>
<div className="mt-2 flex items-center gap-1">
  {stages.map((s, i) => (
    <span
      key={s.key}
      className={`h-1.5 flex-1 rounded-full ${i < act.completedStages ? 'bg-app-brand' : 'bg-app-inset'}`}
    />
  ))}
</div>
```

3d. В блоке «Напоминания» заменить захардкоженные тексты: «Согласовать показ дома у леса» → `{crm.reminder.text}`, оба «завтра 09:00» → `{crm.reminder.when}` (и в заголовке секции: `Дальше: {crm.reminder.when}`).

3e. В блоке «Просмотрел» карточки рендерить из `viewed`: `v.priceShort` вместо `v.price`, `v.district` вместо `v.addr`, `v.photo` вместо `v.img`; `key={v.title}`.

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/app-screens/DealScreen.tsx src/components/app-screens/__tests__/DealScreen.test.tsx
git commit -m "fix(screens): DealScreen — 4 этапа из канона, параметризация актом"
```

---

### Task 4: SearchScreen и ListingScreen — без хардкодов

**Files:**
- Create: `src/components/app-screens/__tests__/SearchScreen.test.tsx`
- Modify: `src/components/app-screens/SearchScreen.tsx`
- Modify: `src/components/app-screens/ListingScreen.tsx:6-11` (specs из канона)

**Interfaces:**
- Consumes: `demoObject`, `otherObjects`.
- Produces: экраны без локальных демо-данных; сигнатуры не меняются (`SearchScreen()`, `ListingScreen()`).

Особенность задачи: это рефакторинг с сохранением поведения — канон намеренно совпадает с текущими хардкодами, поэтому «падающего теста» здесь не будет. Схема: характеризационные тесты (зелёные до и после) + структурная проверка отсутствия хардкодов после рефакторинга.

- [ ] **Step 1: Написать характеризационный тест**

```tsx
// src/components/app-screens/__tests__/SearchScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchScreen } from '@/components/app-screens'
import { demoObject, otherObjects } from '@/lib/demo-deal'

describe('SearchScreen', () => {
  it('первая карточка списка — объект канона', () => {
    render(<SearchScreen />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText(demoObject.price)).toBeInTheDocument()
  })

  it('маркеры карты — цены канона', () => {
    render(<SearchScreen />)
    expect(screen.getByText(demoObject.priceShort)).toBeInTheDocument()
    for (const o of otherObjects) expect(screen.getByText(o.priceShort)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест зелёный на текущем коде**

Run: `npm test`
Expected: PASS — тест фиксирует текущее поведение (канон и хардкоды сейчас совпадают). Это базовая линия рефакторинга.

- [ ] **Step 3: Переключить SearchScreen на канон**

В `src/components/app-screens/SearchScreen.tsx` заменить строки 3–17 (импорт PhoneFrame и локальные массивы `markers`/`list`) на:

```tsx
import { PhoneFrame } from './PhoneFrame'
import { demoObject, otherObjects } from '@/lib/demo-deal'

const chips = ['Тип', 'Цена', 'Площадь', 'Комнат'] as const

const markerPositions = [
  { left: '58%', top: '34%', active: true },
  { left: '26%', top: '50%' },
  { left: '72%', top: '62%' },
  { left: '38%', top: '72%' },
] as const

const markers = [demoObject, ...otherObjects].map((o, i) => ({
  label: o.priceShort,
  ...markerPositions[i],
}))

const list = [
  { title: `${demoObject.title}, ${demoObject.area}`, sub: demoObject.district, price: demoObject.price, img: demoObject.photo },
  { title: otherObjects[0].title, sub: otherObjects[0].district, price: otherObjects[0].price, img: otherObjects[0].photo },
]
```

(У `OtherObject` площадь уже входит в `title` — «Коттедж у пруда, 210 м²», поэтому суффикс площади добавляется только объекту канона.)

- [ ] **Step 4: ListingScreen — specs из канона**

В `src/components/app-screens/ListingScreen.tsx` заменить строки 6–11 (массив `specs`) на:

```tsx
const specs = [
  ['Тип дома', demo.object.houseType],
  ['Год', demo.object.year],
  ['Отопление', demo.object.heating],
  ['Санузел', demo.object.bathrooms],
] as const
```

- [ ] **Step 5: Убедиться, что тесты по-прежнему зелёные и хардкоды исчезли**

Run: `npm test && npm run type-check`
Expected: все PASS (поведение не изменилось).

Run: `grep -nE '[0-9] (000|млн) ₽|Коттедж|Октябрьский|Игринский' src/components/app-screens/SearchScreen.tsx src/components/app-screens/ListingScreen.tsx src/components/app-screens/DealScreen.tsx`
Expected: пусто (ни одной захардкоженной цены или адреса в компонентах).

- [ ] **Step 6: Commit**

```bash
git add src/components/app-screens/SearchScreen.tsx src/components/app-screens/ListingScreen.tsx src/components/app-screens/__tests__/SearchScreen.test.tsx
git commit -m "refactor(screens): Search и Listing рендерятся из канона, хардкоды удалены"
```

---

### Task 5: Тёмный PhoneFrame + CRM-экран риэлтора

**Files:**
- Create: `src/components/app-screens/__tests__/RealtorCrmScreen.test.tsx`
- Modify: `src/components/app-screens/PhoneFrame.tsx`
- Create: `src/components/app-screens/RealtorCrmScreen.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `participants`, `demoObject`, `stages`, `acts`, `crm`, `DealAct`; токены `app-dark.*`.
- Produces:
  - `PhoneFrame({ children, className?, variant?: 'light' | 'dark' })` — dark: экран `bg-app-dark-bg`, статус-бар `text-app-dark-text`.
  - `RealtorCrmScreen({ act?: DealAct })` — по умолчанию `acts[2]` (клиент закреплён, сделка начата); тёмная тема.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/RealtorCrmScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorCrmScreen } from '@/components/app-screens'
import { participants } from '@/lib/demo-deal'

describe('RealtorCrmScreen', () => {
  it('клиент из канона закреплён за риэлтором', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText(participants.buyer.name)).toBeInTheDocument()
    expect(screen.getByText('Закреплён за вами')).toBeInTheDocument()
    expect(screen.getByText(/Автор привязки/)).toBeInTheDocument()
  })

  it('сделка по объекту канона с этапом', () => {
    render(<RealtorCrmScreen />)
    expect(screen.getByText('12,8 млн ₽')).toBeInTheDocument()
    expect(screen.getByText('Этап 2 из 4')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `RealtorCrmScreen` не экспортирован.

- [ ] **Step 3: Добавить вариант dark в PhoneFrame**

В `src/components/app-screens/PhoneFrame.tsx` заменить сигнатуру и две строки классов:

```tsx
export function PhoneFrame({
  children,
  className = '',
  variant = 'light',
}: {
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark'
}) {
  const dark = variant === 'dark'
```

Экран (`rounded-[2.35rem] bg-app-bg`) → `` `relative flex aspect-[9/19.3] flex-col overflow-hidden rounded-[2.35rem] ${dark ? 'bg-app-dark-bg' : 'bg-app-bg'}` ``.
Статус-бар (`text-app-ink`) → `` `... ${dark ? 'text-app-dark-text' : 'text-app-ink'}` `` (тем же шаблоном).
Домашний индикатор (`bg-app-ink/25`) → `` `${dark ? 'bg-app-dark-text/25' : 'bg-app-ink/25'}` ``.

- [ ] **Step 4: Создать RealtorCrmScreen**

```tsx
// src/components/app-screens/RealtorCrmScreen.tsx
import Image from 'next/image'
import { BadgeCheck, Bell, ChevronRight, Link2 } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { acts, crm, demoObject, participants, stages, type DealAct } from '@/lib/demo-deal'

/** CRM риэлтора (тёмная тема): клиент закреплён, авторство зафиксировано, сделка идёт. */
export function RealtorCrmScreen({ act = acts[2] }: { act?: DealAct }) {
  const stageIndex = Math.max(0, act.completedStages - 1)
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Мои клиенты</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Карточка клиента */}
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[14px] font-bold text-app-dark-trust">
              {participants.buyer.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <p className="text-[11px] text-app-dark-caption">{participants.buyer.role}</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-app-dark-trust-soft px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
              Закреплён за вами
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-app-dark-inset px-2.5 py-1.5 text-[11px] text-app-dark-caption">
            <Link2 className="h-3.5 w-3.5 shrink-0 text-app-dark-trust" strokeWidth={2} />
            Автор привязки: вы · по ссылке · сохраняется в сделке
          </div>
        </div>

        {/* Сделка клиента */}
        <p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Сделка</p>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex gap-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-app-dark-inset">
              <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
              <p className="truncate text-[11px] text-app-dark-caption">{demoObject.district}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-app-dark-caption">
                Этап {act.completedStages} из {stages.length}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[13px] font-semibold text-app-dark-text">{stages[stageIndex].label}</p>
          <div className="mt-2 flex items-center gap-1">
            {stages.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 flex-1 rounded-full ${i < act.completedStages ? 'bg-app-dark-trust' : 'bg-app-dark-inset'}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <span className="flex items-center gap-1 rounded-full bg-app-dark-trust px-4 py-1.5 text-[12px] font-semibold text-app-dark-bg">
              Открыть
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </div>
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
      </div>
    </PhoneFrame>
  )
}
```

- [ ] **Step 5: Экспортировать из index.ts**

В `src/components/app-screens/index.ts` добавить:

```ts
export { RealtorCrmScreen } from './RealtorCrmScreen'
```

- [ ] **Step 6: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: все PASS (существующие экраны с `variant` по умолчанию не изменились).

- [ ] **Step 7: Commit**

```bash
git add src/components/app-screens/PhoneFrame.tsx src/components/app-screens/RealtorCrmScreen.tsx src/components/app-screens/index.ts src/components/app-screens/__tests__/RealtorCrmScreen.test.tsx
git commit -m "feat(screens): тёмный PhoneFrame и CRM-экран риэлтора на app-dark"
```

---

### Task 6: CRM-экран застройщика

**Files:**
- Create: `src/components/app-screens/__tests__/DeveloperCrmScreen.test.tsx`
- Create: `src/components/app-screens/DeveloperCrmScreen.tsx`
- Modify: `src/components/app-screens/index.ts`

**Interfaces:**
- Consumes: `demoObject`, `crm`, `participants`, `verification`; токены `app-dark.*`; `PhoneFrame variant="dark"`.
- Produces: `DeveloperCrmScreen()` — объект застройщика, новое обращение, ответственный.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/app-screens/__tests__/DeveloperCrmScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DeveloperCrmScreen } from '@/components/app-screens'
import { crm, demoObject } from '@/lib/demo-deal'

describe('DeveloperCrmScreen', () => {
  it('объект канона со статусом проверки', () => {
    render(<DeveloperCrmScreen />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText('Проверено')).toBeInTheDocument()
  })

  it('обращение из канона с ответственным', () => {
    render(<DeveloperCrmScreen />)
    expect(screen.getByText(crm.inquiry.status)).toBeInTheDocument()
    expect(screen.getByText(crm.inquiry.text)).toBeInTheDocument()
    expect(screen.getByText(`Ответственный: ${crm.inquiry.assignee}`)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `DeveloperCrmScreen` не экспортирован.

- [ ] **Step 3: Создать DeveloperCrmScreen**

```tsx
// src/components/app-screens/DeveloperCrmScreen.tsx
import Image from 'next/image'
import { ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { crm, demoObject, participants } from '@/lib/demo-deal'

/** CRM застройщика (тёмная тема): объект опубликован, обращение пришло, ответственный назначен. */
export function DeveloperCrmScreen() {
  return (
    <PhoneFrame variant="dark">
      <div className="shrink-0 px-4 pb-2 pt-2">
        <p className="text-[19px] font-bold text-app-dark-text">Объекты</p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-app-dark-muted px-4 pt-2">
        {/* Карточка объекта */}
        <div className="overflow-hidden rounded-2xl border border-app-dark-border bg-app-dark-surface">
          <div className="relative h-24">
            <Image src={demoObject.photo} alt="" fill className="object-cover" sizes="340px" />
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-app-dark-bg/70 px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
              Проверено
            </span>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[14px] font-semibold text-app-dark-text">{demoObject.title}, {demoObject.area}</p>
              <p className="shrink-0 text-[14px] font-bold text-app-dark-text">{demoObject.priceShort}</p>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-app-dark-caption">{demoObject.address}</p>
          </div>
        </div>

        {/* Обращение */}
        <div className="mb-2 mt-4 flex items-center gap-2">
          <p className="text-[15px] font-bold text-app-dark-text">Обращения</p>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-app-dark-trust px-1.5 text-[11px] font-semibold text-app-dark-bg">1</span>
        </div>
        <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-app-dark-trust-soft px-2.5 py-1 text-[10px] font-semibold text-app-dark-trust">
              {crm.inquiry.status}
            </span>
            <span className="text-[11px] text-app-dark-caption">{crm.inquiry.time}</span>
          </div>
          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-inset text-[12px] font-bold text-app-dark-text">
              {participants.buyer.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-app-dark-text">{participants.buyer.name}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-app-dark-caption">{crm.inquiry.text}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-app-dark-border pt-2.5">
            <p className="text-[11px] text-app-dark-caption">Ответственный: {crm.inquiry.assignee}</p>
            <span className="flex items-center gap-1 rounded-full bg-app-dark-trust px-3.5 py-1.5 text-[12px] font-semibold text-app-dark-bg">
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.25} />
              Ответить
            </span>
          </div>
        </div>

        {/* Сводка */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <p className="text-[18px] font-bold text-app-dark-text">3</p>
            <p className="text-[11px] text-app-dark-caption">объекта в каталоге</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
            <div>
              <p className="text-[18px] font-bold text-app-dark-text">1</p>
              <p className="text-[11px] text-app-dark-caption">сделка в работе</p>
            </div>
            <ChevronRight className="h-4 w-4 text-app-dark-caption" strokeWidth={2} />
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
```

Примечание: «3 объекта в каталоге» согласовано с каноном — `[demoObject, ...otherObjects]` минус один в работе; если ревьюер сочтёт цифру данными — вынести в `crm` канона (допустимое улучшение, не обязательное).

- [ ] **Step 4: Экспортировать из index.ts**

```ts
export { DeveloperCrmScreen } from './DeveloperCrmScreen'
```

- [ ] **Step 5: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/app-screens/DeveloperCrmScreen.tsx src/components/app-screens/index.ts src/components/app-screens/__tests__/DeveloperCrmScreen.test.tsx
git commit -m "feat(screens): CRM-экран застройщика на app-dark"
```

---

### Task 7: Витрина /app-screens и верификация

**Files:**
- Modify: `src/app/app-screens/page.tsx`

**Interfaces:**
- Consumes: все шесть экранов, `acts`.
- Produces: служебная страница с двумя регистрами и состояниями по актам — база для визуального ревью плана «Главная».

- [ ] **Step 1: Обновить витрину**

Заменить содержимое `src/app/app-screens/page.tsx`:

```tsx
import {
  ChatScreen,
  DealScreen,
  DeveloperCrmScreen,
  ListingScreen,
  RealtorCrmScreen,
  SearchScreen,
} from '@/components/app-screens'
import { acts } from '@/lib/demo-deal'

export const metadata = {
  title: 'Экраны приложения — макеты · БАСТ',
}

const showcase = [
  ['Витрина покупателя', [
    ['Поиск на карте', <SearchScreen key="s" />],
    ['Карточка объекта', <ListingScreen key="l" />],
    ['Чат по объекту', <ChatScreen key="c" />],
    ['Сделка — этап 3 из 4', <DealScreen key="d" />],
  ]],
  ['CRM для профи (тёмный регистр)', [
    ['Риэлтор: клиент закреплён', <RealtorCrmScreen key="r" />],
    ['Застройщик: обращение', <DeveloperCrmScreen key="dev" />],
  ]],
  ['Состояния по актам', [
    ['Акт 3 — сделка начата', <DealScreen key="a3" act={acts[2]} />],
    ['Акт 5 — документы подписаны', <DealScreen key="a5" act={acts[4]} />],
  ]],
] as const

export default function Page() {
  return (
    <main className="min-h-screen bg-graphite-deep px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-app-dark-caption">Витрина макетов</p>
        <h1 className="mt-3 font-display text-4xl text-app-dark-text">Экраны приложения «БАСТ»</h1>
        <p className="mt-3 max-w-2xl text-sm text-app-dark-caption">
          Live-макеты на реальной палитре приложения с демо-данными из канона. Служебная страница для ревью — в навигацию не входит.
        </p>
        {showcase.map(([group, screens]) => (
          <section key={group}>
            <h2 className="mt-16 text-sm font-semibold uppercase tracking-[0.16em] text-app-dark-gold">{group}</h2>
            <div className="mt-8 grid justify-items-center gap-x-8 gap-y-16 sm:grid-cols-2">
              {screens.map(([label, node]) => (
                <div key={label}>
                  {node}
                  <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-app-dark-caption">{label}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Полный прогон проверок**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 3: Проверка витрины**

Run: `npm run dev`, затем `curl -s http://localhost:3000/app-screens/ | grep -o "Закреплён за вами\|Новое обращение\|Этап 3 из 4\|из 5" | sort | uniq -c`
Expected: «Закреплён за вами», «Новое обращение», «Этап 3 из 4» присутствуют; «из 5» — ноль вхождений. Остановить dev-сервер.

- [ ] **Step 4: Commit**

```bash
git add src/app/app-screens/page.tsx
git commit -m "feat(screens): витрина двух регистров и состояний по актам"
```

---

## Что дальше

- Визуальное ревью витрины скриншотами — контроллер сессии.
- План «Главная» (пять актов, sticky-хореография, CRM-интермедия) — consumes: все шесть экранов с пропом `act`, канон целиком.
- План «Страницы» — регистры по страницам, /how-it-works, редирект /product, вывод deprecated-токенов.
