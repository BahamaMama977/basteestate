# Страницы «Живой сделки» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Весь сайт переезжает на палитру «Живой сделки», /how-it-works становится покадровой демонстрацией сделки (критерий №5 спеки), /product перестаёт быть заглушкой, дубли канона на подстраницах устраняются.

**Architecture:** Ключевой ход — **ремап значений легаси-токенов**: ~630 использований pine/limestone/clay/sage/mist/ink/surface/accent в подстраницах перекрашиваются одной правкой tailwind.config (легаси-имена становятся алиасами новой палитры), без построчного редактирования четырёх больших страниц. Поверх ремапа — точечные задачи: типографика секций (гротеск вместо антиквы, кроме hero и CTA), канон вместо локальных дублей, новая /how-it-works, редирект /product, зачистка неиспользуемых групп.

**Tech Stack:** Next.js 14, Tailwind, vitest + RTL. Всё готово из планов №1–3.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md`

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- **Водяные знаки `font-display` «18» (Geography) и «?» (FAQ) на главной — принятое декоративное исключение: не трогать и не тиражировать.**
- Антиква (`font-display`: `display-title`/`section-title`) на каждой странице — только H1 первого экрана и H2 финального CTA; остальные заголовки секций — `section-heading` (гротеск).
- Канон `src/lib/demo-deal.ts` — единственный источник демо-данных и связанных с продуктом списков (этапы, чек-лист проверки). Копирайт страниц (заголовки, описания, FAQ) остаётся локальным.
- FAQ главной остаётся тёмным; мобильный кадр акта 1 НЕ добавляется (hero на мобайле и так высокий) — оба решения приняты финальным ревью плана №3.
- Значения групп `app`, `app-dark`, `graphite`, `paper`, `gold` не меняются; тесты-защита от дрейфа должны оставаться зелёными.
- Русские тексты: «ёлочки», тире «—» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Ремап легаси-палитры на «Живую сделку»

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css` (значения CSS-переменных `:root`)
- Modify: `src/lib/__tests__/tokens.test.ts`

**Interfaces:**
- Consumes: палитра «Живой сделки» (графит, бумага, trust, золото).
- Produces: все легаси-классы (`pine-*`, `limestone-*`, `clay-*`, `sage-*`, `mist-*`, `ink-*`, `surface-*`, `accent-*`) рендерятся цветами новой палитры на всех страницах без правки компонентов.

- [ ] **Step 1: Дополнить тест токенов**

В `src/lib/__tests__/tokens.test.ts` добавить внутрь describe:

```ts
it('легаси-группы — алиасы палитры «Живой сделки»', () => {
  expect(colors.pine['950']).toBe('#0F1217')
  expect(colors.pine['600']).toBe('#4C5560')
  expect(colors.limestone['100']).toBe('#F7F8F5')
  expect(colors.limestone['50']).toBe('#FFFFFF')
  expect(colors.clay['500']).toBe('#2F6B5F')
  expect(colors.clay['400']).toBe('#C8A96A')
  expect(colors.accent['500']).toBe('#2F6B5F')
  expect(colors.mist['100']).toBe('#F2F3F0')
  expect(colors.sage['300']).toBe('#A3ABB8')
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — старые значения (`#0B1712`, `#B86746` и т.д.).

- [ ] **Step 3: Заменить значения легаси-групп в tailwind.config.ts**

Заменить значения (имена ключей и структуру групп не менять). Комментарий над каждой группой: `// Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах`.

```ts
pine: {
  50: '#F1F2F4', 100: '#E4E6EA', 200: '#C6CBD3', 300: '#A3ABB8',
  400: '#737B88', 500: '#5C6470', 600: '#4C5560', 700: '#2A2D35',
  800: '#1A1D24', 900: '#171B23', 950: '#0F1217',
},
limestone: { 50: '#FFFFFF', 100: '#F7F8F5', 200: '#ECEBE5', 300: '#D6D8D2', 400: '#B9BCB6' },
sage: { 300: '#A3ABB8', 400: '#8A93A0', 500: '#6E7683', 600: '#555D6A', 700: '#3E454F' },
mist: { 100: '#F2F3F0', 200: '#E2E5E0', 300: '#CBD2CC' },
clay: { 300: '#D4BC82', 400: '#C8A96A', 500: '#2F6B5F', 600: '#285D52', 700: '#225047' },
surface: { 50: '#FFFFFF', 100: '#F7F8F5', 200: '#F0F1ED', 300: '#E3E6E0', 400: '#CDD2CB' },
ink: {
  50: '#F1F2F4', 100: '#E4E6EA', 200: '#C6CBD3', 300: '#A3ABB8',
  400: '#737B88', 500: '#5C6470', 600: '#3E454F', 700: '#2A2D35',
  800: '#1A1D24', 900: '#10141B', 950: '#0B0D11',
},
accent: {
  50: '#EFF5F3', 100: '#E4EDEA', 200: '#CBDCD6', 300: '#9FC2B8',
  400: '#5E978A', 500: '#2F6B5F', 600: '#285D52', 700: '#225047',
  800: '#1B4038', 900: '#14312B',
},
```

Семантика ремапа: pine/ink → графитовая шкала; limestone/surface → бумага и белые поверхности; sage → нейтральные полутона подписей; mist → бумажные заливки; clay-300/400 → золото (акценты на тёмном, точка логотипа), clay-500/600/700 → trust-зелёный (плашки, кнопки); accent (яркая цифровая зелень) → trust-шкала.

- [ ] **Step 4: Обновить rgba в backgroundImage и boxShadow**

Там же в конфиге:

- `accent-shimmer`: `rgba(24, 182, 106, 0.16)` → `rgba(47, 107, 95, 0.16)`
- `green-mesh`: `rgba(24, 182, 106, 0.08)` → `rgba(47, 107, 95, 0.08)`; `rgba(155, 225, 93, 0.08)` → `rgba(200, 169, 106, 0.06)`
- `accent-glow`: `rgba(24, 182, 106, 0.18)` → `rgba(47, 107, 95, 0.18)`
- `green-glow`: `rgba(24, 182, 106, 0.22)` → `rgba(47, 107, 95, 0.22)`
- `inner-accent`: `rgba(24, 182, 106, 0.10)` → `rgba(47, 107, 95, 0.10)`
- `soft`/`medium`/`elevated`: все `rgba(7, 18, 14, …)` → `rgba(11, 13, 17, …)` (те же альфы)

- [ ] **Step 5: Обновить CSS-переменные в globals.css**

В `:root`: `--pine: #0f1217; --ink: #171b23; --limestone: #f7f8f5; --sage: #6e7683; --mist: #e2e5e0; --clay: #2f6b5f;` (переменные `--paper`/`--graphite` не трогать).

- [ ] **Step 6: Проверки**

Run: `npm test && npm run type-check && npm run build`
Expected: всё зелёное (существующие тесты `app`/`app-dark`/`paper`/`graphite` не тронуты).

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/lib/__tests__/tokens.test.ts
git commit -m "feat(theme): ремап легаси-палитры — весь сайт на цветах «Живой сделки»"
```

---

### Task 2: Полировка общих компонентов

**Files:**
- Modify: `src/components/home/HomeButton.tsx` (focus-ring)
- Modify: `src/components/home/sections/DealActsSection.tsx` (чекмарки акта 4)
- Modify: `src/components/Header.tsx`, `src/components/Footer.tsx` (только тени `rgba(11,23,18,…)` → `rgba(15,18,23,…)`, если встречаются)

**Interfaces:**
- Consumes: результат Task 1.
- Produces: семантически чистые общие компоненты (без легаси-имён в фокус-кольцах), статичные чекмарки акта 4.

- [ ] **Step 1: HomeButton — фокус-кольцо**

В `src/components/home/HomeButton.tsx` заменить `focus-visible:ring-clay-500` на `focus-visible:ring-app-brand` (значение то же после ремапа — правка семантическая, чтобы shared-компонент не зависел от легаси-имён).

- [ ] **Step 2: Чекмарки акта 4 — статично**

В `src/components/home/sections/DealActsSection.tsx` в чек-листе акта 4 удалить класс `motion-safe:animate-act-in` со `<span>` галочки (оставить только условные `opacity`-классы). Причина: анимация отыгрывала при mount (невидима пользователю), а fill-mode `both` переопределял `opacity-25` при будущем `verifiedCount < 5`.

- [ ] **Step 3: Тени Header/Footer**

Run: `grep -n "rgba(11,23,18\|rgba(11, 23, 18" src/components/Header.tsx src/components/Footer.tsx`
Каждое найденное вхождение: `11,23,18` → `15,18,23` (альфы сохранить). Если grep пуст — шаг пропустить с пометкой в отчёте.

- [ ] **Step 4: Усилить тест композиции главной — порядок секций**

В `src/components/home/__tests__/HomePage.test.tsx` добавить тест:

```tsx
it('секции идут в порядке спеки', () => {
  const { container } = render(<HomePage />)
  const html = container.innerHTML
  const order = [
    'Найдите дом.',
    'Скрольте — сделка идёт',
    'у профессионалов идёт работа',
    'Объект проверяется до публикации',
    'Начинаем с Удмуртии',
    'Вопросы перед установкой',
    'Начните поиск дома',
  ].map((probe) => html.indexOf(probe))
  expect(order.every((i) => i >= 0)).toBe(true)
  expect([...order].sort((a, b) => a - b)).toEqual(order)
})
```

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/HomeButton.tsx src/components/home/sections/DealActsSection.tsx src/components/Header.tsx src/components/Footer.tsx src/components/home/__tests__/HomePage.test.tsx
git commit -m "polish(ui): app-brand фокус-кольцо, статичные чекмарки, тест порядка секций"
```

---

### Task 3: /how-it-works — покадровая демонстрация сделки

**Files:**
- Create: `src/components/how-it-works/HowItWorksPage.tsx`
- Create: `src/components/how-it-works/__tests__/HowItWorksPage.test.tsx`
- Modify: `src/app/how-it-works/page.tsx` (полная замена содержимого)

**Interfaces:**
- Consumes: `acts`, `stages`, `verification` из канона; `SearchScreen`, `ChatScreen`, `DealScreen` (+act); `Header`, `Footer`, `AppStoreButtons`, `Reveal`.
- Produces: страница, где каждый акт сделки показан кадром экрана с пояснением — CTA «Посмотреть этапы сделки» наконец ведёт туда, где этапы показаны (критерий №5 спеки).

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/how-it-works/__tests__/HowItWorksPage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HowItWorksPage } from '@/components/how-it-works/HowItWorksPage'
import { stages, verification } from '@/lib/demo-deal'

describe('HowItWorksPage', () => {
  it('все пять актов покадрово', () => {
    render(<HowItWorksPage />)
    for (const label of [/Акт 01/, /Акт 02/, /Акт 03/, /Акт 04/, /Акт 05/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('этапы и чек-лист проверки из канона', () => {
    render(<HowItWorksPage />)
    expect(screen.getAllByText(stages[2].label).length).toBeGreaterThanOrEqual(1)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('экраны демо-сделки на месте', () => {
    render(<HowItWorksPage />)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать HowItWorksPage**

```tsx
// src/components/how-it-works/HowItWorksPage.tsx
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { Reveal } from '@/components/home/Reveal'
import { ChatScreen, DealScreen, SearchScreen } from '@/components/app-screens'
import { acts, verification } from '@/lib/demo-deal'

type Frame = {
  id: number
  kicker: string
  title: string
  text: string
  screen: ReactNode
  checklist?: boolean
}

const frames: Frame[] = [
  {
    id: 1,
    kicker: 'Поиск',
    title: 'Найдите дом на карте или в каталоге',
    text: 'Фильтры по цене, площади и району. Каждая карточка — проверенный объект с полными характеристиками.',
    screen: <SearchScreen />,
  },
  {
    id: 2,
    kicker: 'Диалог',
    title: 'Напишите продавцу из карточки дома',
    text: 'Чат привязан к объекту: вопросы, ответы и документы остаются рядом с домом, о котором идёт речь.',
    screen: <ChatScreen act={acts[1]} />,
  },
  {
    id: 3,
    kicker: 'Старт сделки',
    title: 'Сделка фиксирует объект и участников',
    text: 'Покупатель, риэлтор и продавец видят одну и ту же сделку. Клиент закреплён за риэлтором, который его привёл.',
    screen: <DealScreen act={acts[2]} />,
  },
  {
    id: 4,
    kicker: 'Проверка и договор',
    title: 'Договор готовится — статус виден всем',
    text: 'Объект прошёл проверку ещё до публикации, а этап оформления обновляется прямо в приложении.',
    screen: <DealScreen act={acts[3]} />,
    checklist: true,
  },
  {
    id: 5,
    kicker: 'Подпись',
    title: 'Документы подписаны — сценарий завершён',
    text: 'От первого сообщения до подписи — один непрерывный маршрут без потери контекста.',
    screen: <DealScreen act={acts[4]} />,
  },
]

/** Покадровая версия демо-сделки: все акты с живыми экранами и пояснениями. */
export function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-graphite-deep pb-20 pt-40 text-app-dark-text">
          <div className="page-container px-5 sm:px-8 lg:px-12">
            <Reveal>
              <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">
                Как работает
              </span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">
                От поиска объекта до подписания документов
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">
                Одна демонстрационная сделка, показанная покадрово: те же экраны, что и в приложении, — с демо-данными.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-shell bg-paper">
          <div className="page-container space-y-24 lg:space-y-32">
            {frames.map((frame, index) => (
              <Reveal key={frame.id}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">
                      Акт 0{frame.id} · {frame.kicker}
                    </p>
                    <h2 className="section-heading mt-4">{frame.title}</h2>
                    <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{frame.text}</p>
                    {frame.checklist && (
                      <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
                        {verification.map((v) => (
                          <li key={v.key} className="flex items-center justify-between px-4 py-3">
                            <div>
                              <p className="text-sm font-medium">{v.label}</p>
                              <p className="text-xs text-graphite/55">{v.caption}</p>
                            </div>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="justify-self-center">
                    {frame.screen}
                    <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                      Экран приложения · демо-данные
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell bg-graphite-deep text-app-dark-text">
          <div className="page-container text-center">
            <Reveal>
              <h2 className="section-title mx-auto max-w-3xl">Пройдите этот путь со своим домом</h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-app-dark-caption">
                Установите приложение, посмотрите объекты в Удмуртии и напишите продавцу или риэлтору.
              </p>
              <div className="mt-9 flex justify-center">
                <AppStoreButtons light />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Подключить страницу**

Заменить содержимое `src/app/how-it-works/page.tsx`:

```tsx
import { HowItWorksPage } from '@/components/how-it-works/HowItWorksPage'

export const metadata = {
  title: 'Как проходит сделка — этапы в приложении БАСТ',
  description:
    'Покадровая демонстрация сделки: поиск дома, чат с продавцом, старт сделки, проверка, договор и подписание документов.',
}

export default function Page() {
  return <HowItWorksPage />
}
```

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное.

- [ ] **Step 6: Commit**

```bash
git add src/components/how-it-works/ src/app/how-it-works/page.tsx
git commit -m "feat(how-it-works): покадровая демонстрация сделки — лечит заглушку"
```

---

### Task 4: /product — редирект до готовности контента

**Files:**
- Modify: `src/app/product/page.tsx` (полная замена)

**Interfaces:**
- Consumes: /how-it-works из Task 3.
- Produces: `/product` больше не заглушка — постоянный редирект на /how-it-works (решение спеки: «до готовности — честный редирект»).

- [ ] **Step 1: Заменить страницу редиректом**

Проект собирается в статический экспорт (`output: 'export'` в next.config.js), поэтому серверный `redirect()` недоступен — используется meta-refresh с видимой ссылкой-фолбэком. Содержимое `src/app/product/page.tsx` целиком:

```tsx
// «Возможности платформы» до собственного контента ведут на покадровую
// демонстрацию сделки (решение спеки «Живой сделки», план №4).
// Статический экспорт: серверный redirect() недоступен — meta refresh + фолбэк.
export const metadata = {
  title: 'Возможности платформы — БАСТ',
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/how-it-works/" />
      <main className="flex min-h-screen items-center justify-center bg-paper text-graphite">
        <p className="text-sm">
          Раздел переехал:{' '}
          <a className="underline underline-offset-4" href="/how-it-works/">
            как проходит сделка
          </a>
        </p>
      </main>
    </>
  )
}
```

- [ ] **Step 2: Проверить редирект**

Run: `npm run build`
Expected: сборка успешна. Затем `npm run dev` (в фоне):

```bash
curl -s http://localhost:3000/product/ | grep -c 'url=/how-it-works/'
```

Expected: ≥ 1 (meta refresh в разметке). Остановить dev-сервер.

- [ ] **Step 3: Commit**

```bash
git add src/app/product/page.tsx
git commit -m "feat(product): редирект на /how-it-works до готовности контента"
```

---

### Task 5: /buyers — канон и типографика

**Files:**
- Modify: `src/components/buyers/BuyersPage.tsx`

**Interfaces:**
- Consumes: `verification`, `stages` из канона.
- Produces: /buyers без локальных дублей канона; заголовки секций — гротеск.

- [ ] **Step 1: Написать падающий тест-инвариант**

Создать `src/components/buyers/__tests__/BuyersPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyersPage } from '@/components/buyers/BuyersPage'
import { stages, verification } from '@/lib/demo-deal'

describe('BuyersPage — канон', () => {
  it('чек-лист содержит пункты канона и дополнения страницы', () => {
    render(<BuyersPage />)
    for (const v of verification) expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Обременения')).toBeInTheDocument()
    expect(screen.getByText('Реальность объекта')).toBeInTheDocument()
  })

  it('этапы сделки — из канона', () => {
    render(<BuyersPage />)
    for (const s of stages) expect(screen.getAllByText(s.label).length).toBeGreaterThanOrEqual(1)
  })
})
```

Run: `npm test` — тест может частично проходить на текущих дублях; RED-фиксация здесь вторична, тест — защита после замены. Отметить фактическое состояние в отчёте.

- [ ] **Step 2: Заменить локальные массивы каноном**

В `BuyersPage.tsx` добавить в импорты `verification, stages` из `@/lib/demo-deal` и заменить блоки строк 45–59:

```tsx
/** Дополнения страницы к канону проверки — не входят в базовый чек-лист. */
const verificationExtras = [
  ['Обременения', 'аресты, залоги и ограничения по объекту'],
  ['Реальность объекта', 'дом существует и соответствует объявлению'],
] as const

const verificationItems = [
  ...verification.map((v) => [v.label, v.caption] as const),
  ...verificationExtras,
]

const dealStages = stages.map((s) => [s.label, s.caption] as const)
```

Места рендера (строки ~301, ~366) не меняются — формы совпадают.

- [ ] **Step 3: Типографика секций**

Все `section-title` в файле заменить на `section-heading`, КРОМЕ: (а) заголовка первого экрана (hero, H1 — если он на `section-title` или `display-title`, оставить как есть), (б) H2 финального CTA-блока (последняя секция с кнопками установки — оставить антикву).

Верификация: `grep -c "section-title\|display-title" src/components/buyers/BuyersPage.tsx` — ожидается ≤ 2.

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное.

- [ ] **Step 5: Commit**

```bash
git add src/components/buyers/
git commit -m "refactor(buyers): чек-лист и этапы из канона, гротеск в секциях"
```

---

### Task 6: /agencies и /developers — канон и типографика

**Files:**
- Modify: `src/components/agencies/AgenciesPage.tsx`
- Modify: `src/components/developers/DevelopersPage.tsx`

**Interfaces:**
- Consumes: `verification` из канона.
- Produces: CRM-страницы без дублей канона, заголовки секций — гротеск.

- [ ] **Step 1: AgenciesPage — verificationItems из канона**

В `AgenciesPage.tsx` добавить `verification` в импорт из `@/lib/demo-deal` (создать импорт, если его нет) и заменить строки 52–57:

```tsx
const verificationItems = verification.map((v) => v.label)
```

Место рендера (строка ~368, `verificationItems.map((item) => …)`) не меняется — форма (массив строк) совпадает; пунктов станет 5 вместо 4, с формулировками канона.

- [ ] **Step 2: Типографика обеих страниц**

В обоих файлах: все `section-title` → `section-heading`, кроме H1 первого экрана и H2 финального CTA (правило Task 5 Step 3).

Верификация: `grep -c "section-title\|display-title" src/components/agencies/AgenciesPage.tsx src/components/developers/DevelopersPage.tsx` — по каждому файлу ≤ 2.

- [ ] **Step 3: Смоук-тест страниц**

Создать `src/components/agencies/__tests__/AgenciesPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AgenciesPage } from '@/components/agencies/AgenciesPage'
import { verification } from '@/lib/demo-deal'

describe('AgenciesPage — канон', () => {
  it('чек-лист проверки — формулировки канона', () => {
    render(<AgenciesPage />)
    for (const v of verification) expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
  })
})
```

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное.

- [ ] **Step 5: Commit**

```bash
git add src/components/agencies/ src/components/developers/
git commit -m "refactor(b2b-pages): чек-лист из канона, гротеск в секциях"
```

---

### Task 7: /investors — типографика

**Files:**
- Modify: `src/components/investors/InvestorsPage.tsx`

**Interfaces:**
- Consumes: —
- Produces: /investors в типографике «трёх голосов» (палитра уже переехала ремапом Task 1: золото `clay-300/400` и trust вместо терракоты).

- [ ] **Step 1: Типографика**

Все `section-title` → `section-heading`, кроме H1 первого экрана и H2 финального CTA (правило Task 5 Step 3).

Верификация: `grep -c "section-title\|display-title" src/components/investors/InvestorsPage.tsx` — ≤ 2.

- [ ] **Step 2: Проверки**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 3: Commit**

```bash
git add src/components/investors/
git commit -m "refactor(investors): гротеск в секциях, антиква — hero и CTA"
```

---

### Task 8: Зачистка и верификация сайта

**Files:**
- Modify: `tailwind.config.ts` (удаление мёртвых групп)
- Modify: `src/app/globals.css` (мёртвые утилиты)
- Test: вся кодовая база.

**Interfaces:**
- Consumes: результаты Task 1–7.
- Produces: конфиг без мёртвых групп; подтверждённый сайт целиком. Скриншот-ревью — контроллером после этой задачи.

- [ ] **Step 1: Удалить группы без использований**

Для каждой из групп `secondary`, `navy`, `cream` выполнить:

Run: `grep -rn "secondary-[0-9]\|navy-[0-9]\|cream-[0-9]" src --include="*.tsx" --include="*.css"`
Expected: пусто. Если пусто — удалить группу из `tailwind.config.ts` (вместе с deprecated-комментарием). Если найдены использования — группу НЕ удалять, зафиксировать в отчёте.

- [ ] **Step 2: Проверить мёртвые утилиты globals.css**

Run: `grep -rn "route-line\|route-node" src --include="*.tsx"`
Если пусто — удалить блоки `.route-line`, `.route-line::before`, `.route-node` из `globals.css`. Если используются — оставить.

- [ ] **Step 3: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное; фактическое число маршрутов зафиксировать в отчёте.

- [ ] **Step 4: Смоук всех страниц**

Run: `npm run dev` (в фоне), затем для каждого пути `/ /buyers /agencies /developers /investors /how-it-works /about /verification /security /contact /product` выполнить `curl -s -o /dev/null -w "%{http_code} " http://localhost:3000<путь>/` — все 200 (`/product/` — 200 с meta refresh на /how-it-works, проверить `grep -c 'url=/how-it-works/'` ≥ 1).

Затем проверить отсутствие старой палитры в отдаваемом CSS:

```bash
curl -s http://localhost:3000/buyers/ | grep -oE '#B86746|#0B1712|#18B66A' | sort -u
```

Expected: пусто (терракота, старая ночь и цифровая зелень не встречаются). Остановить dev-сервер.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "chore(theme): зачистка мёртвых групп и утилит после ремапа"
```

---

## Что дальше

- Скриншот-ревью всех страниц (контроллер): особенно /buyers, /agencies, /investors после ремапа и /how-it-works.
- Финальное ревью ветки плана — субагент на максимальной модели.
- После него — superpowers:finishing-a-development-branch: ветка feature/content-b2b накопила спеку + 4 плана и готова к интеграции.
