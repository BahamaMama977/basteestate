# Фундамент «Живой сделки» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заложить фундамент визуальной концепции «Живая сделка»: канон демо-данных, токены палитры (бумага/графит/CRM-тёмная), моношрифт — всё, на что обопрутся планы «Экраны», «Главная», «Страницы».

**Architecture:** Канон демо-сделки — один типизированный модуль `src/lib/demo-deal.ts`, из которого рендерятся все HTML-копии экранов. Палитра сайта наследуется из токенов приложения (`bast/shared/designSystem/theme`): светлая тема уже есть в Tailwind как `app.*`, добавляем базу «бумаги», графитовые якоря и тёмную CRM-группу `app-dark.*`. Тесты — vitest (юнит-тесты канона и защита токенов от дрейфа).

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, vitest, next/font (JetBrains Mono).

**Спека:** `docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md`

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project` (все команды выполняются из неё).
- Палитра приложения не меняется; репозиторий приложения `/Users/romanmensikov/bast` — только для чтения.
- Точные значения токенов (light): paper `#F7F8F5`, graphite `#23262F`, graphite deep `#0F1217`, trust `#2F6B5F`, gold `#C8A96A`.
- Точные значения токенов (dark/CRM): bg `#0F1217`, surface `#1A1D24`, raised `#20242D`, muted `#171B23`, inset `#10141B`, text `#F4F5F7`, caption `#A3ABB8`, muted-text `#737B88`, border `#2A2D35`, trust `#6FA89B`, gold `#D4BC82`.
- Легаси-токены (`clay`, `mist`, `secondary`, яркий `accent`) НЕ удалять — их использования уходят в планах «Главная» и «Страницы»; в этом плане только пометить deprecated-комментарием.
- Терракота (`clay`) в новом коде запрещена.
- Русские тексты: «ёлочки», тире «—», неразрывные пробелы в связках (нормы ru-text).
- Демо-данные только из канона: никаких захардкоженных цен/имён в компонентах.

---

### Task 1: Vitest и npm-скрипты

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/lib/__tests__/smoke.test.ts` (временный, удаляется в Task 2)

**Interfaces:**
- Consumes: —
- Produces: команды `npm test` (vitest run) и `npm run type-check` (tsc --noEmit); алиас `@ → ./src` в тестах.

- [ ] **Step 1: Установить vitest**

Run: `npm install -D vitest`
Expected: пакет добавлен в devDependencies без ошибок.

- [ ] **Step 2: Создать vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Добавить скрипты в package.json**

В блок `"scripts"` добавить две строки (dev/build/start/lint не трогать):

```json
"test": "vitest run",
"type-check": "tsc --noEmit"
```

- [ ] **Step 4: Написать smoke-тест**

```ts
// src/lib/__tests__/smoke.test.ts
import { describe, expect, it } from 'vitest'

describe('vitest setup', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Убедиться, что тесты запускаются**

Run: `npm test`
Expected: `1 passed`

- [ ] **Step 6: Убедиться, что type-check проходит**

Run: `npm run type-check`
Expected: завершение без ошибок.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/__tests__/smoke.test.ts
git commit -m "chore(test): vitest и скрипты test/type-check"
```

---

### Task 2: Канон демо-сделки

**Files:**
- Create: `src/lib/demo-deal.ts`
- Create: `src/lib/__tests__/demo-deal.test.ts`
- Modify: `src/components/app-screens/PhoneFrame.tsx:37-54` (убрать локальный `demo`, реэкспортировать из канона)
- Delete: `src/lib/__tests__/smoke.test.ts`

**Interfaces:**
- Consumes: алиас `@` из Task 1.
- Produces (на эти имена и типы опираются планы «Экраны» и «Главная»):
  - `demo: { object, realtor }` — обратная совместимость с текущими экранами (форма не меняется).
  - `demoObject: DemoObject` — объект сделки (title, address, price, priceShort, perMeter, area, beds, floors, land, year, photo и т.д.).
  - `participants: { buyer, realtor, seller }`, каждый `{ initials: string; name: string; role: string }` (у realtor ещё `phone`).
  - `chat: ChatMessage[]`, `ChatMessage = { from: 'buyer' | 'seller'; text: string; time: string }`.
  - `stages: DealStage[]` (ровно 4), `DealStage = { key: string; label: string; caption: string }`.
  - `acts: DealAct[]` (ровно 5), `DealAct = { id: 1|2|3|4|5; key: string; title: string; screen: 'search'|'listing'|'chat'|'deal'; chatCount: number; completedStages: number; showParticipants: boolean }`.

- [ ] **Step 1: Написать падающий тест канона**

```ts
// src/lib/__tests__/demo-deal.test.ts
import { describe, expect, it } from 'vitest'
import { acts, chat, demo, demoObject, participants, stages } from '@/lib/demo-deal'

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

describe('канон демо-сделки', () => {
  it('объект — «Дом у леса» за 12 800 000 ₽ (канон спеки)', () => {
    expect(demoObject.title).toBe('Дом у леса')
    expect(demoObject.price).toBe('12 800 000 ₽')
    expect(demoObject.area).toBe('184 м²')
  })

  it('обратная совместимость: demo.object и demo.realtor', () => {
    expect(demo.object).toBe(demoObject)
    expect(demo.realtor).toBe(participants.realtor)
  })

  it('три участника с ролями', () => {
    expect(participants.buyer.role).toBe('Покупатель')
    expect(participants.realtor.role).toBe('Риэлтор')
    expect(participants.seller.role).toBe('Продавец')
    for (const p of Object.values(participants)) {
      expect(p.initials).toMatch(/^[А-ЯЁ]{2}$/)
    }
  })

  it('время в чате движется вперёд', () => {
    const times = chat.map((m) => toMinutes(m.time))
    const sorted = [...times].sort((a, b) => a - b)
    expect(times).toEqual(sorted)
    expect(chat.length).toBeGreaterThanOrEqual(4)
  })

  it('ровно 4 этапа сделки', () => {
    expect(stages).toHaveLength(4)
    expect(stages.map((s) => s.label)).toEqual([
      'Сделка начата',
      'Объект выбран',
      'Договор готовится',
      'Документы подписаны',
    ])
  })

  it('ровно 5 актов, id по возрастанию, состояния согласованы', () => {
    expect(acts).toHaveLength(5)
    expect(acts.map((a) => a.id)).toEqual([1, 2, 3, 4, 5])
    for (const act of acts) {
      expect(['search', 'listing', 'chat', 'deal']).toContain(act.screen)
      expect(act.chatCount).toBeGreaterThanOrEqual(0)
      expect(act.chatCount).toBeLessThanOrEqual(chat.length)
      expect(act.completedStages).toBeGreaterThanOrEqual(0)
      expect(act.completedStages).toBeLessThanOrEqual(stages.length)
    }
    // прогресс не откатывается назад по ходу актов
    const progress = acts.map((a) => a.completedStages)
    expect([...progress].sort((a, b) => a - b)).toEqual(progress)
    // финал: все этапы завершены
    expect(acts[4].completedStages).toBe(4)
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/lib/demo-deal'` (или аналогичная ошибка резолва).

- [ ] **Step 3: Создать канон**

```ts
// src/lib/demo-deal.ts
/**
 * Канон демо-сделки «Живая сделка» — единственный источник демо-данных
 * для всех HTML-копий экранов приложения на сайте.
 * Спека: docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md
 */

export type DemoObject = typeof demoObject
export type Participant = { initials: string; name: string; role: string; phone?: string }
export type ChatMessage = { from: 'buyer' | 'seller'; text: string; time: string }
export type DealStage = { key: string; label: string; caption: string }
export type DealAct = {
  id: 1 | 2 | 3 | 4 | 5
  key: string
  title: string
  screen: 'search' | 'listing' | 'chat' | 'deal'
  chatCount: number
  completedStages: number
  showParticipants: boolean
}

export const demoObject = {
  title: 'Дом у леса',
  district: 'Завьяловский район',
  address: 'Завьяловский район, кп «Сосновый бор»',
  price: '12 800 000 ₽',
  priceShort: '12,8 млн ₽',
  perMeter: '69 600 ₽/м²',
  area: '184 м²',
  beds: '4 спал',
  floors: '2 эт',
  land: '9 сот',
  year: '2025',
  photo: '/images/verification-house.png',
} as const

export const participants: Record<'buyer' | 'realtor' | 'seller', Participant> = {
  buyer: { initials: 'МС', name: 'Мария Соколова', role: 'Покупатель' },
  realtor: { initials: 'АК', name: 'Анна Ковалёва', role: 'Риэлтор', phone: '+7 912 445 20 71' },
  seller: { initials: 'ОП', name: 'Отдел продаж «Сосновый бор»', role: 'Продавец' },
}

export const chat: ChatMessage[] = [
  { from: 'buyer', text: 'Здравствуйте! Дом ещё в продаже?', time: '13:42' },
  { from: 'seller', text: 'Да, актуально. Готова показать в эти выходные.', time: '13:44' },
  { from: 'buyer', text: 'Отлично. А документы можно посмотреть заранее?', time: '13:45' },
  { from: 'seller', text: 'Конечно — прикреплю в чат к объекту.', time: '13:46' },
]

export const stages: DealStage[] = [
  { key: 'started', label: 'Сделка начата', caption: 'Зафиксирован объект и участники' },
  { key: 'object', label: 'Объект выбран', caption: 'Дом связан с текущей сделкой' },
  { key: 'contract', label: 'Договор готовится', caption: 'Команда собирает данные и документы' },
  { key: 'signed', label: 'Документы подписаны', caption: 'Текущий сценарий сделки завершён' },
]

/** Пять актов главной страницы: какой экран и в каком состоянии показан. */
export const acts: DealAct[] = [
  { id: 1, key: 'search', title: 'Найти объект', screen: 'search', chatCount: 0, completedStages: 0, showParticipants: false },
  { id: 2, key: 'dialog', title: 'Написать продавцу', screen: 'chat', chatCount: 4, completedStages: 0, showParticipants: false },
  { id: 3, key: 'start', title: 'Начать сделку', screen: 'deal', chatCount: 4, completedStages: 2, showParticipants: true },
  { id: 4, key: 'progress', title: 'Договор готовится', screen: 'deal', chatCount: 4, completedStages: 3, showParticipants: true },
  { id: 5, key: 'signed', title: 'Документы подписаны', screen: 'deal', chatCount: 4, completedStages: 4, showParticipants: true },
]

/** Обратная совместимость с экранами, писавшимися до канона. */
export const demo = {
  object: demoObject,
  realtor: participants.realtor,
} as const
```

- [ ] **Step 4: Переключить PhoneFrame на канон**

В `src/components/app-screens/PhoneFrame.tsx` удалить строки 37–54 (блок `/** Демо-данные (Удмуртия)… */` с локальным `export const demo`) и добавить в конец файла:

```ts
export { demo } from '@/lib/demo-deal'
```

Импорты в ChatScreen/DealScreen/ListingScreen/SearchScreen (`import { PhoneFrame, demo } from './PhoneFrame'`) менять не нужно.

- [ ] **Step 5: Удалить smoke-тест**

Run: `rm src/lib/__tests__/smoke.test.ts`

- [ ] **Step 6: Убедиться, что тесты и типы проходят**

Run: `npm test && npm run type-check`
Expected: все тесты PASS; type-check без ошибок.

- [ ] **Step 7: Убедиться, что сборка не сломана**

Run: `npm run build`
Expected: сборка успешна (экраны берут `demo` через реэкспорт).

- [ ] **Step 8: Commit**

```bash
git add src/lib/demo-deal.ts src/lib/__tests__/demo-deal.test.ts src/components/app-screens/PhoneFrame.tsx
git rm src/lib/__tests__/smoke.test.ts
git commit -m "feat(canon): канон демо-сделки — участники, чат, этапы, пять актов"
```

---

### Task 3: Токены палитры — бумага, графит, CRM-тёмная

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/lib/__tests__/tokens.test.ts`

**Interfaces:**
- Consumes: —
- Produces (классы для планов «Экраны», «Главная», «Страницы»):
  - `bg-paper` — база страницы `#F7F8F5`.
  - `graphite.DEFAULT #23262F`, `graphite.deep #0F1217` → `bg-graphite`, `bg-graphite-deep`, `text-graphite`.
  - Группа `app-dark.*` — тёмная CRM-тема приложения: `bg`, `surface`, `raised`, `muted`, `inset`, `text`, `caption`, `muted-text`, `border`, `trust`, `trust-soft`, `gold`.

- [ ] **Step 1: Написать падающий тест токенов**

```ts
// src/lib/__tests__/tokens.test.ts
import { describe, expect, it } from 'vitest'
import config from '../../../tailwind.config'

// Точные значения из bast/shared/designSystem/theme — защита от дрейфа.
const colors = (config.theme?.extend?.colors ?? {}) as Record<string, any>

describe('токены «Живой сделки»', () => {
  it('бумага — канвас приложения', () => {
    expect(colors.paper).toBe('#F7F8F5')
  })

  it('графитовые якоря', () => {
    expect(colors.graphite.DEFAULT).toBe('#23262F')
    expect(colors.graphite.deep).toBe('#0F1217')
  })

  it('светлая палитра приложения не дрейфует', () => {
    expect(colors.app.brand).toBe('#2F6B5F')
    expect(colors.app.gold).toBe('#C8A96A')
    expect(colors.app.ink).toBe('#23262F')
  })

  it('тёмная CRM-палитра приложения', () => {
    expect(colors['app-dark']).toEqual({
      bg: '#0F1217',
      surface: '#1A1D24',
      raised: '#20242D',
      muted: '#171B23',
      inset: '#10141B',
      text: '#F4F5F7',
      caption: '#A3ABB8',
      'muted-text': '#737B88',
      border: '#2A2D35',
      trust: '#6FA89B',
      'trust-soft': 'rgba(111, 168, 155, 0.18)',
      gold: '#D4BC82',
    })
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `colors.paper` undefined.

- [ ] **Step 3: Добавить токены в tailwind.config.ts**

В `theme.extend.colors` добавить (рядом с группой `app`):

```ts
// «Живая сделка»: база страницы = канвас приложения
paper: '#F7F8F5',
// Графитовые якоря (hero, CTA, текст) — из Graphite Gold приложения
graphite: {
  DEFAULT: '#23262F',
  deep: '#0F1217',
},
// Тёмная CRM-тема приложения — для экранов риэлтора/застройщика
// (значения из bast/shared/designSystem/theme, dark mode)
'app-dark': {
  bg: '#0F1217',
  surface: '#1A1D24',
  raised: '#20242D',
  muted: '#171B23',
  inset: '#10141B',
  text: '#F4F5F7',
  caption: '#A3ABB8',
  'muted-text': '#737B88',
  border: '#2A2D35',
  trust: '#6FA89B',
  'trust-soft': 'rgba(111, 168, 155, 0.18)',
  gold: '#D4BC82',
},
```

- [ ] **Step 4: Пометить легаси-токены deprecated**

Добавить комментарии над группами `clay`, `mist`, `secondary`, `accent` в `tailwind.config.ts` (сами значения не трогать):

```ts
// DEPRECATED: уходит с редизайном «Живая сделка»
// (спека 2026-07-10) — не использовать в новом коде.
```

- [ ] **Step 5: Убедиться, что тесты проходят**

Run: `npm test`
Expected: все PASS.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts src/lib/__tests__/tokens.test.ts
git commit -m "feat(tokens): бумага, графит и тёмная CRM-палитра из токенов приложения"
```

---

### Task 4: Моношрифт для демо-данных

**Files:**
- Modify: `src/app/layout.tsx` (импорт и переменная шрифта)
- Modify: `tailwind.config.ts` (fontFamily.mono)
- Modify: `src/lib/__tests__/tokens.test.ts` (тест на mono)

**Interfaces:**
- Consumes: —
- Produces: класс `font-mono` → JetBrains Mono (переменная `--font-mono`) — «третий голос» типографики для цен, таймингов, номеров этапов.

- [ ] **Step 1: Дополнить тест токенов**

Добавить в `src/lib/__tests__/tokens.test.ts`:

```ts
it('моношрифт — третий голос типографики', () => {
  const fonts = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>
  expect(fonts.mono[0]).toBe('var(--font-mono)')
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — `fonts.mono` undefined.

- [ ] **Step 3: Подключить JetBrains Mono в layout.tsx**

В `src/app/layout.tsx`:

```ts
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
})
```

Заменить строку 32 (`<html lang="ru" className={...}>`) на:

```tsx
<html lang="ru" className={`${manrope.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
```

- [ ] **Step 4: Добавить fontFamily.mono в tailwind.config.ts**

В `theme.extend.fontFamily`:

```ts
mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
```

- [ ] **Step 5: Убедиться, что тесты и сборка проходят**

Run: `npm test && npm run build`
Expected: тесты PASS; сборка успешна.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx tailwind.config.ts src/lib/__tests__/tokens.test.ts
git commit -m "feat(fonts): JetBrains Mono — третий голос для демо-данных"
```

---

### Task 5: Верификация фундамента

**Files:**
- Test: вся кодовая база (без новых файлов).

**Interfaces:**
- Consumes: результаты Task 1–4.
- Produces: зелёный фундамент для планов «Экраны-копии», «Главная», «Страницы».

- [ ] **Step 1: Полный прогон проверок**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное, ноль ошибок.

- [ ] **Step 2: Визуальная проверка экранов**

Run: `npm run dev`, открыть `http://localhost:3000/app-screens`.
Expected: четыре экрана (Поиск, Карточка, Чат, Сделка) рендерятся как до рефакторинга — данные из канона, ничего не разъехалось. Сверить цену «12 800 000 ₽» и имя «Анна Ковалёва» на экранах.

- [ ] **Step 3: Финальный коммит (если были правки)**

```bash
git status
# если чисто — фундамент готов, коммит не нужен
```

---

## Что дальше (отдельные планы, пишутся по очереди)

1. **Экраны-копии** — CRM-экраны риэлтора/застройщика в `app-dark`-теме; параметризация экранов актом (`act: DealAct`); consumes: канон, `app-dark.*`, `font-mono`.
2. **Главная** — пять актов со sticky-хореографией, CRM-интермедия, ритм 80/20.
3. **Страницы** — регистры по страницам, /how-it-works покадрово, редирект /product, вывод терракоты и мятного из использования, снятие deprecated-токенов.
