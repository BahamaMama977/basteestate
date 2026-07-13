# Главная «Живой сделки» — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Главная страница становится непрерывной демонстрацией одной сделки: графитовый hero (акт 1) → «бумага» с актами 2–5 и sticky-телефоном → графитовая CRM-интермедия → проверка, география, FAQ на «бумаге» → графитовый CTA.

**Architecture:** Тема страницы переводится на «бумагу» (`paper`) с графитовыми якорями. Новые секции — отдельные файлы в `src/components/home/sections/`; хореография актов — клиентский компонент с IntersectionObserver (десктоп: sticky-телефон, мобайл: экраны инлайн), деградация через `motion-safe`/`prefers-reduced-motion`. Старые секции, дублирующие смыслы (Trust, Routes, Context, Referral, Journey, Professionals, Offers), с главной удаляются — их контент остаётся на подстраницах (/buyers, /agencies, /developers), которые приводит в порядок план «Страницы».

**Tech Stack:** Next.js 14, React 18, Tailwind, vitest + RTL (jsdom), qrcode.react, lucide-react. Без framer-motion — только CSS-переходы и IntersectionObserver.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md`
**Фундамент и экраны (планы №1–2):** канон `src/lib/demo-deal.ts`; экраны `@/components/app-screens` (act есть у Chat/Deal/RealtorCrm; Search/Listing/DeveloperCrm статичны); токены `paper`/`graphite`/`app`/`app-dark`; `font-mono`.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Демо-данные только из канона; тексты секций (копирайт сайта) живут в файлах секций.
- Антиква (`font-display`) на главной только в двух местах: H1 hero и H2 финального CTA. Заголовки остальных секций — гротеск (утилита `.section-heading`, добавляется задачей 1).
- Моношрифт (`font-mono`) — для меток актов («Акт 02»), таймингов и номеров этапов вокруг экранов.
- Палитра: база `bg-paper`, тёмные якоря `bg-graphite-deep`/`bg-graphite`, действия и статусы `app.brand`/`app.gold`. Токены `clay`, `mist`, `secondary`, яркий `accent` в новом и переписываемом коде главной запрещены.
- Пропорция светлого/тёмного на странице ≈ 80/20: тёмные только hero, CRM-интермедия, FAQ+CTA-хвост.
- Анимируются только состояния продукта (смена экрана, появление сообщений/галочек); длительность 300–400 мс; только transform/opacity; все анимации — под `motion-safe:` (при `prefers-reduced-motion` — статичные кадры).
- В акты 1–2 нельзя передавать `DealScreen`/`RealtorCrmScreen` (у них `completedStages: 0` — «Этап 0 из 4», известный латентный дефект).
- Header, Footer и подстраницы в этом плане не трогать (план «Страницы»).
- Русские тексты: «ёлочки», тире «—», неразрывные пробелы (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Тема «бумаги» и типографика секций

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: токены `paper`, `graphite`, `app.brand` из Tailwind.
- Produces: база страницы `bg-paper text-graphite`; утилита `.section-heading` (гротеск-заголовок секций); keyframes `act-in` для смены экрана в хореографии (класс `motion-safe:animate-act-in` — добавляется в tailwind.config задачей 4, keyframes здесь).

- [ ] **Step 1: Перевести базовый слой на бумагу и графит**

В `src/app/globals.css`:

1a. В `:root` добавить переменные (существующие не удалять — их используют старые страницы до плана «Страницы»):

```css
--paper: #f7f8f5;
--graphite: #23262f;
```

1b. Заменить `html { … background: var(--limestone); }` → `background: var(--paper);`.

1c. Заменить строку body `@apply overflow-x-hidden bg-limestone-100 text-pine-900 antialiased;` → `@apply overflow-x-hidden bg-paper text-graphite antialiased;` и `-webkit-tap-highlight-color: rgba(184, 103, 70, 0.14);` → `rgba(47, 107, 95, 0.14)`.

1d. Заменить `::selection { @apply bg-clay-500 text-limestone-50; }` → `@apply bg-app-brand text-white;`.

- [ ] **Step 2: Добавить утилиту заголовка секций и keyframes актов**

В `@layer components` (рядом с `.section-title`) добавить:

```css
/* «Живая сделка»: заголовки секций — гротеск; антиква остаётся hero и CTA */
.section-heading {
  @apply font-heading text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.02em];
}
```

В конец файла добавить:

```css
/* Смена экрана в хореографии актов: только transform/opacity, 360 мс */
@keyframes act-in {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

- [ ] **Step 3: Проверить сборку и общий вид**

Run: `npm run build`
Expected: успешна. (Смена базы затронет светлые участки всех страниц — бумага чуть холоднее лаймстоуна; это ожидаемо и допустимо до плана «Страницы».)

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): база «бумаги», графитовый текст, section-heading и keyframes актов"
```

---

### Task 2: Канон и экраны — довесок для хореографии

**Files:**
- Modify: `src/lib/demo-deal.ts`
- Modify: `src/lib/__tests__/demo-deal.test.ts`
- Modify: `src/components/app-screens/ChatScreen.tsx`
- Modify: `src/components/app-screens/DealScreen.tsx`
- Modify: `src/components/app-screens/RealtorCrmScreen.tsx`
- Modify: `src/components/app-screens/__tests__/DealScreen.test.tsx`
- Modify: `src/components/app-screens/__tests__/RealtorCrmScreen.test.tsx`

**Interfaces:**
- Consumes: канон и экраны планов №1–2.
- Produces:
  - `participants.seller.shortName: 'Сосновый бор'` (тип `Participant` получает `shortName?: string`); шапка ChatScreen использует shortName — трункация уходит.
  - `crm.otherClient: { initials: 'ДП'; name: 'Дмитрий Панов'; role: 'Покупатель' }` — второй клиент риэлтора (заполняет пустую нижнюю треть RealtorCrm).
  - `DealAct.verifiedCount: number` (0–5): acts 1–3 → 0, acts 4–5 → 5. Носитель чек-листа проверки для акта 4.
  - DealScreen читает `act.showParticipants`: при true рендерит строку участников (инициалы из канона + подпись «покупатель · риэлтор · продавец»).
  - RealtorCrmScreen: под напоминанием — блок «Клиенты» с buyer (закреплён) и otherClient.

- [ ] **Step 1: Дополнить тесты канона**

В `src/lib/__tests__/demo-deal.test.ts` добавить внутрь describe:

```ts
it('короткое имя продавца — для узких шапок', () => {
  expect(participants.seller.shortName).toBe('Сосновый бор')
})

it('второй клиент риэлтора', () => {
  expect(crm.otherClient.name).toBe('Дмитрий Панов')
  expect(crm.otherClient.initials).toMatch(/^[А-ЯЁ]{2}$/)
})

it('прогресс чек-листа по актам: 0 до проверки, 5 после', () => {
  expect(acts.map((a) => a.verifiedCount)).toEqual([0, 0, 0, 5, 5])
  for (const act of acts) {
    expect(act.verifiedCount).toBeLessThanOrEqual(verification.length)
  }
})
```

- [ ] **Step 2: Дополнить тесты экранов**

В `__tests__/DealScreen.test.tsx`:

```tsx
it('участники появляются по showParticipants', () => {
  render(<DealScreen act={acts[2]} />)
  expect(screen.getByText('покупатель · риэлтор · продавец')).toBeInTheDocument()
})

it('без showParticipants строки участников нет', () => {
  render(<DealScreen act={{ ...acts[2], showParticipants: false }} />)
  expect(screen.queryByText('покупатель · риэлтор · продавец')).not.toBeInTheDocument()
})
```

В `__tests__/RealtorCrmScreen.test.tsx`:

```tsx
it('второй клиент из канона', () => {
  render(<RealtorCrmScreen />)
  expect(screen.getByText(crm.otherClient.name)).toBeInTheDocument()
})
```

(добавить `crm` в импорт из `@/lib/demo-deal`).

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `npm test`
Expected: FAIL — `shortName`, `otherClient`, `verifiedCount` не существуют; строк участников и второго клиента нет на экранах.

- [ ] **Step 4: Расширить канон**

В `src/lib/demo-deal.ts`:

4a. В типе `Participant` добавить `shortName?: string`. В `participants.seller` добавить `shortName: 'Сосновый бор'`.

4b. В типе `DealAct` добавить поле `verifiedCount: number`. В каждый элемент `acts` добавить `verifiedCount`: `0, 0, 0, 5, 5` соответственно.

4c. В объект `crm` добавить:

```ts
otherClient: { initials: 'ДП', name: 'Дмитрий Панов', role: 'Покупатель' },
```

- [ ] **Step 5: Обновить экраны**

5a. `ChatScreen.tsx` — в шапке заменить `{participants.seller.name}` на:

```tsx
{participants.seller.shortName ?? participants.seller.name}
```

5b. `DealScreen.tsx` — дополнить импорт канона (`participants` к уже импортируемым `acts, crm, demo, otherObjects, stages`), затем после блока «Этапы» (после `</div>` прогресс-полосок, перед кнопкой «Открыть») добавить:

```tsx
{act.showParticipants && (
  <div className="mt-3 flex items-center gap-2">
    <div className="flex -space-x-1.5">
      {[participants.buyer, participants.realtor, participants.seller].map((p) => (
        <span
          key={p.initials}
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-app-brand-soft text-[9px] font-bold text-app-brand"
        >
          {p.initials}
        </span>
      ))}
    </div>
    <span className="text-[10px] text-app-caption">покупатель · риэлтор · продавец</span>
  </div>
)}
```

5c. `RealtorCrmScreen.tsx` — после блока «Напоминания» добавить:

```tsx
{/* Клиенты */}
<p className="mb-2 mt-4 text-[15px] font-bold text-app-dark-text">Клиенты</p>
<div className="space-y-2">
  {[
    { p: participants.buyer, note: 'Закреплён · сделка идёт' },
    { p: crm.otherClient, note: 'Новый · подбор объекта' },
  ].map(({ p, note }) => (
    <div key={p.initials} className="flex items-center gap-3 rounded-2xl border border-app-dark-border bg-app-dark-surface p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-dark-trust-soft text-[12px] font-bold text-app-dark-trust">
        {p.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-app-dark-text">{p.name}</p>
        <p className="text-[11px] text-app-dark-caption">{note}</p>
      </div>
    </div>
  ))}
</div>
```

(добавить `crm` в импорт канона, если отсутствует).

- [ ] **Step 6: Убедиться, что тесты и типы проходят**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/demo-deal.ts src/lib/__tests__/demo-deal.test.ts src/components/app-screens/ChatScreen.tsx src/components/app-screens/DealScreen.tsx src/components/app-screens/RealtorCrmScreen.tsx src/components/app-screens/__tests__/DealScreen.test.tsx src/components/app-screens/__tests__/RealtorCrmScreen.test.tsx
git commit -m "feat(canon): shortName, второй клиент, verifiedCount; участники в DealScreen"
```

---

### Task 3: Новый HeroSection — акт 1

**Files:**
- Create: `src/components/home/sections/HeroSection.tsx`
- Create: `src/components/home/sections/__tests__/HeroSection.test.tsx`

**Interfaces:**
- Consumes: `SearchScreen` (статичный, акт 1), `AppStoreButtons`, `HomeButton`, `Reveal`, `siteLinks`.
- Produces: `HeroSection()` — графитовый hero с антиквой и телефоном-поиском; подключается в HomePage задачей 7 (до неё старый hero продолжает работать).

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/home/sections/__tests__/HeroSection.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '@/components/home/sections/HeroSection'
import { demoObject } from '@/lib/demo-deal'

describe('HeroSection', () => {
  it('антиква-заголовок и подзаголовок трёх аудиторий', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Найдите дом.')
    expect(screen.getByText(/Риэлторы ведут клиентов/)).toBeInTheDocument()
  })

  it('телефон показывает поиск (акт 1) с объектом канона', () => {
    render(<HeroSection />)
    expect(screen.getByText(`${demoObject.title}, ${demoObject.area}`)).toBeInTheDocument()
    expect(screen.getByText(/Акт 01/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль `sections/HeroSection` не существует.

- [ ] **Step 3: Создать HeroSection**

```tsx
// src/components/home/sections/HeroSection.tsx
import Image from 'next/image'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { SearchScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** Акт 1 «Поиск»: графитовый hero, антиква-заголовок, телефон с картой. */
export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-graphite-deep text-app-dark-text">
      <Image
        src="/images/hero-house.png"
        alt="Загородный дом рядом с лесом"
        fill
        priority
        className="object-cover object-center opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,23,.95)_0%,rgba(15,18,23,.78)_42%,rgba(15,18,23,.28)_78%,rgba(15,18,23,.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite-deep to-transparent" />

      <div className="page-container relative z-10 flex min-h-[100dvh] items-end px-5 pb-16 pt-32 sm:px-8 md:pb-20 lg:px-12">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">
              Мобильная платформа для загородной недвижимости
            </span>
            <h1 className="display-title mt-7 max-w-5xl text-balance">
              Найдите дом.
              <span className="block text-app-dark-caption">Доведите сделку до договора</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">
              Покупатели ищут объекты и общаются с продавцами. Риэлторы ведут клиентов. Застройщики управляют обращениями — всё в одной платформе.
            </p>
            <div className="mt-9">
              <AppStoreButtons light />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-app-dark-caption">
              <span>Бесплатно для покупателей</span>
              <span className="h-1 w-1 rounded-full bg-app-dark-trust" />
              <span>Объекты в Удмуртии</span>
              <HomeButton href={siteLinks.developers} variant="text" className="text-app-dark-text">
                Размещаете объекты?
              </HomeButton>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="hidden lg:block">
            <SearchScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Акт 01 · Поиск дома
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

Примечание: Header в этот файл не входит — он остаётся в HomePage.

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/sections/HeroSection.tsx src/components/home/sections/__tests__/HeroSection.test.tsx
git commit -m "feat(home): графитовый hero — акт 1 с экраном поиска"
```

---

### Task 4: DealActsSection — акты 2–5 со sticky-хореографией

**Files:**
- Modify: `tailwind.config.ts` (анимация `act-in`)
- Modify: `src/test/setup.tsx` (стаб IntersectionObserver)
- Create: `src/components/home/sections/DealActsSection.tsx`
- Create: `src/components/home/sections/__tests__/DealActsSection.test.tsx`

**Interfaces:**
- Consumes: `acts`, `verification`, `stages` из канона; `ChatScreen`, `DealScreen` (пропом `act`); keyframes `act-in` из задачи 1.
- Produces: `DealActsSection()` — клиентский компонент: слева текст актов 2–5, справа sticky-телефон (lg+), на мобайле экраны инлайн; активный акт по IntersectionObserver; `motion-safe:animate-act-in` при смене экрана.

- [ ] **Step 1: Анимация в tailwind.config**

В `theme.extend.animation` добавить:

```ts
'act-in': 'act-in 0.36s cubic-bezier(0.32, 0.72, 0, 1) both',
```

(keyframes уже в globals.css из задачи 1 — в `theme.extend.keyframes` НЕ дублировать).

- [ ] **Step 2: Стаб IntersectionObserver в setup.tsx**

В конец `src/test/setup.tsx` добавить:

```tsx
// jsdom не реализует IntersectionObserver — хореография в тестах статична.
class IOStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}
globalThis.IntersectionObserver = IOStub as unknown as typeof IntersectionObserver
```

- [ ] **Step 3: Написать падающий тест**

```tsx
// src/components/home/sections/__tests__/DealActsSection.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { verification } from '@/lib/demo-deal'

describe('DealActsSection', () => {
  it('четыре акта с mono-метками', () => {
    render(<DealActsSection />)
    // метки — составной текст («Акт 02 · Диалог»), поэтому regex; sticky-подпись дублирует активный акт — getAllByText
    for (const label of [/Акт 02/, /Акт 03/, /Акт 04/, /Акт 05/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('акт 4 несёт чек-лист проверки из канона', () => {
    render(<DealActsSection />)
    for (const v of verification) {
      expect(screen.getAllByText(v.label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('мобильные кадры: экраны всех четырёх актов присутствуют', () => {
    render(<DealActsSection />)
    // чат (акт 2) + три состояния DealScreen (акты 3–5): «Этап 2 из 4», «Этап 3 из 4», «Этап 4 из 4»
    expect(screen.getAllByText('Этап 2 из 4').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Этап 4 из 4').length).toBeGreaterThanOrEqual(1)
  })
})
```

- [ ] **Step 4: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 5: Создать DealActsSection**

```tsx
// src/components/home/sections/DealActsSection.tsx
'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { ChatScreen, DealScreen } from '@/components/app-screens'
import { acts, verification, type DealAct } from '@/lib/demo-deal'

/** Копирайт актов 2–5. Ключи совпадают с канон-acts. */
const actCopy: Record<string, { kicker: string; title: string; text: string }> = {
  dialog: {
    kicker: 'Диалог',
    title: 'Напишите продавцу из карточки дома',
    text: 'Чат привязан к объекту: вопросы, ответы и документы остаются рядом с домом, о котором идёт речь.',
  },
  start: {
    kicker: 'Старт сделки',
    title: 'Сделка фиксирует объект и участников',
    text: 'Покупатель, риэлтор и продавец видят одну и ту же сделку. Клиент закреплён за риэлтором, который его привёл.',
  },
  progress: {
    kicker: 'Проверка и договор',
    title: 'Договор готовится — статус виден всем',
    text: 'Объект прошёл проверку ещё до публикации, а этап оформления обновляется прямо в приложении.',
  },
  signed: {
    kicker: 'Подпись',
    title: 'Документы подписаны — сценарий завершён',
    text: 'От первого сообщения до подписи — один непрерывный маршрут без потери контекста.',
  },
}

function screenFor(act: DealAct): ReactNode {
  return act.screen === 'chat' ? <ChatScreen act={act} /> : <DealScreen act={act} />
}

/** Акты 2–5: sticky-телефон на десктопе, инлайн-кадры на мобайле. */
export function DealActsSection() {
  const storyActs = acts.slice(1) // акты 2–5
  const [activeKey, setActiveKey] = useState(storyActs[0].key)
  const blockRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveKey((entry.target as HTMLElement).dataset.act ?? storyActs[0].key)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blockRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeAct = storyActs.find((a) => a.key === activeKey) ?? storyActs[0]

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow bg-graphite text-paper">Одна сделка от начала до конца</span>
          <h2 className="section-heading mt-6 max-w-3xl">
            Скрольте — сделка идёт: от первого сообщения до подписанных документов
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_minmax(360px,0.9fr)]">
          {/* Текст актов */}
          <div className="space-y-24 lg:space-y-[42vh]">
            {storyActs.map((act) => {
              const copy = actCopy[act.key]
              return (
                <article
                  key={act.key}
                  data-act={act.key}
                  ref={(el) => {
                    if (el) blockRefs.current.set(act.key, el)
                  }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">
                    Акт 0{act.id} · {copy.kicker}
                  </p>
                  <h3 className="section-heading mt-4">{copy.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{copy.text}</p>

                  {act.key === 'progress' && (
                    <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
                      {verification.map((v, i) => (
                        <li key={v.key} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-sm font-medium">{v.label}</p>
                            <p className="text-xs text-graphite/55">{v.caption}</p>
                          </div>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand motion-safe:animate-act-in ${
                              i < act.verifiedCount ? '' : 'opacity-25'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Мобильный кадр акта */}
                  <div className="mt-8 lg:hidden">
                    {screenFor(act)}
                    <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                      Экран приложения · демо-данные
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Sticky-телефон */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div key={activeAct.key} className="motion-safe:animate-act-in">
                {screenFor(activeAct)}
              </div>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
                Акт 0{activeAct.id} · живой экран приложения
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: PASS (jsdom рендерит все блоки; sticky и observer в тестах инертны).

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts src/test/setup.tsx src/components/home/sections/DealActsSection.tsx src/components/home/sections/__tests__/DealActsSection.test.tsx
git commit -m "feat(home): акты 2–5 — sticky-хореография с живыми экранами"
```

---

### Task 5: CRM-интермедия — «переворот камеры»

**Files:**
- Create: `src/components/home/sections/CrmIntermezzoSection.tsx`
- Create: `src/components/home/sections/__tests__/CrmIntermezzoSection.test.tsx`

**Interfaces:**
- Consumes: `RealtorCrmScreen` (default acts[2]), `DeveloperCrmScreen`, `HomeButton`, `Reveal`, `siteLinks`.
- Produces: `CrmIntermezzoSection()` — графитовый разворот той же сделки глазами профи.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/home/sections/__tests__/CrmIntermezzoSection.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CrmIntermezzoSection } from '@/components/home/sections/CrmIntermezzoSection'
import { crm, participants } from '@/lib/demo-deal'

describe('CrmIntermezzoSection', () => {
  it('обе стороны сделки на тёмных экранах', () => {
    render(<CrmIntermezzoSection />)
    expect(screen.getByText('Закреплён за вами')).toBeInTheDocument()
    expect(screen.getByText(crm.inquiry.status)).toBeInTheDocument()
    expect(screen.getAllByText(participants.buyer.name).length).toBeGreaterThanOrEqual(2)
  })

  it('ссылки на разделы агентств и застройщиков', () => {
    render(<CrmIntermezzoSection />)
    expect(screen.getByRole('link', { name: /агентств/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /застройщик/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать секцию**

```tsx
// src/components/home/sections/CrmIntermezzoSection.tsx
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { DeveloperCrmScreen, RealtorCrmScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** «Переворот камеры»: та же сделка глазами риэлтора и застройщика. Тёмный регистр CRM. */
export function CrmIntermezzoSection() {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">
            Та же сделка — с другой стороны
          </span>
          <h2 className="section-heading mt-6">
            Пока покупатель выбирает дом, у профессионалов идёт работа
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-app-dark-caption">
            Клиент закреплён за риэлтором, который его привёл, — авторство и бонус сохраняются в сделке.
            Застройщик видит обращение прямо из карточки объекта и назначает ответственного.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          <Reveal>
            <RealtorCrmScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Риэлтор · клиент закреплён
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.agencies} variant="text" className="text-app-dark-text">
                Возможности для агентств
              </HomeButton>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DeveloperCrmScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Застройщик · новое обращение
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.developers} variant="text" className="text-app-dark-text">
                Возможности для застройщиков
              </HomeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/sections/CrmIntermezzoSection.tsx src/components/home/sections/__tests__/CrmIntermezzoSection.test.tsx
git commit -m "feat(home): CRM-интермедия — сделка глазами риэлтора и застройщика"
```

---

### Task 6: VerificationSection из канона

**Files:**
- Create: `src/components/home/sections/VerificationSection.tsx`
- Create: `src/components/home/sections/__tests__/VerificationSection.test.tsx`

**Interfaces:**
- Consumes: `verification` из канона (закрывает M6 финального ревью №2: локальный `verificationItems` уходит вместе со старой секцией в задаче 7), `HomeButton`, `Reveal`, `siteLinks`.
- Produces: `VerificationSection()` — светлая секция чек-листа проверки с фото-карточкой.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/home/sections/__tests__/VerificationSection.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VerificationSection } from '@/components/home/sections/VerificationSection'
import { verification } from '@/lib/demo-deal'

describe('VerificationSection', () => {
  it('чек-лист — все пять пунктов канона с подписями', () => {
    render(<VerificationSection />)
    for (const v of verification) {
      expect(screen.getByText(v.label)).toBeInTheDocument()
      expect(screen.getByText(v.caption)).toBeInTheDocument()
    }
  })

  it('дисклеймер о юридической проверке', () => {
    render(<VerificationSection />)
    expect(screen.getByText(/не заменяет юридическую проверку/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль не существует.

- [ ] **Step 3: Создать секцию**

```tsx
// src/components/home/sections/VerificationSection.tsx
import Image from 'next/image'
import { Check, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { verification } from '@/lib/demo-deal'
import { siteLinks } from '@/lib/site'

/** Проверка объявления до публикации: чек-лист из канона + фото-карточка со статусом. */
export function VerificationSection() {
  return (
    <section className="section-shell bg-paper">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-app-brand text-white">Проверка объектов</span>
          <h2 className="section-heading mt-6">Объект проверяется до публикации</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
            Команда проверяет сведения в объявлении до того, как объект увидит покупатель.
          </p>
          <ul className="mt-8 max-w-xl divide-y divide-graphite/10">
            {verification.map((v) => (
              <li key={v.key} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-base font-medium">{v.label}</p>
                  <p className="text-sm text-graphite/55">{v.caption}</p>
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-graphite/55">Проверка не заменяет юридическую проверку перед покупкой.</p>
          <div className="mt-7">
            <HomeButton href={siteLinks.verification} variant="text">Как проходит проверка</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/verification-house.png"
              alt="Проверяемый загородный дом"
              width={960}
              height={720}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-graphite/85 px-5 py-4 text-white backdrop-blur-sm">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Статус объявления</p>
                <p className="mt-1 text-sm font-semibold">Проверено командой «БАСТ»</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app-brand text-white">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Примечание: `siteLinks.verification = '/verification'` существует в `src/lib/site.ts:10`.

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/sections/VerificationSection.tsx src/components/home/sections/__tests__/VerificationSection.test.tsx
git commit -m "feat(home): секция проверки — чек-лист из канона"
```

---

### Task 7: Сборка новой главной

**Files:**
- Modify: `src/components/home/HomePage.tsx` (крупная перестройка)
- Create: `src/components/home/__tests__/HomePage.test.tsx`

**Interfaces:**
- Consumes: секции задач 3–6; остающиеся секции Geography/FAQ/FinalCTA (рестайл по таблицам ниже).
- Produces: главная в порядке спеки: Hero → DealActs → CrmIntermezzo → Verification → Geography → FAQ → FinalCTA.

- [ ] **Step 1: Написать падающий тест композиции**

```tsx
// src/components/home/__tests__/HomePage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HomePage } from '@/components/home/HomePage'

describe('HomePage — порядок «Живой сделки»', () => {
  it('новые секции на месте', () => {
    render(<HomePage />)
    expect(screen.getByText(/Скрольте — сделка идёт/)).toBeInTheDocument()
    expect(screen.getByText(/у профессионалов идёт работа/)).toBeInTheDocument()
    expect(screen.getByText('Объект проверяется до публикации')).toBeInTheDocument()
  })

  it('удалённые секции не рендерятся', () => {
    render(<HomePage />)
    expect(screen.queryByText('Одна платформа — три рабочих маршрута')).not.toBeInTheDocument()
    expect(screen.queryByText('Клиент закреплён за тем, кто его привёл')).not.toBeInTheDocument()
    expect(screen.queryByText(/Предложения, связанные/)).not.toBeInTheDocument()
    expect(screen.queryByText('Основание для доверия')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — новых секций в HomePage нет.

- [ ] **Step 3: Перестроить HomePage.tsx**

3a. Удалить целиком функции: `HeroSection` (локальную), `TrustSection`, `RoutesSection`, `ContextSection`, `ReferralSection`, `JourneySection`, `VerificationSection` (локальную), `ProfessionalsSection`, `OffersSection` — и связанные данные `trustItems`, `journey`, `verificationItems`. Удалить неиспользуемые после этого импорты (`ListingScreen`, `ShieldCheck`, `Check` — по факту, ориентируясь на type-check/lint).

3b. Добавить импорты новых секций:

```tsx
import { HeroSection } from './sections/HeroSection'
import { DealActsSection } from './sections/DealActsSection'
import { CrmIntermezzoSection } from './sections/CrmIntermezzoSection'
import { VerificationSection } from './sections/VerificationSection'
```

3c. Композиция:

```tsx
export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DealActsSection />
        <CrmIntermezzoSection />
        <VerificationSection />
        <GeographySection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Рестайл остающихся секций (точечные замены классов)**

`GeographySection`:

| Было | Стало |
|---|---|
| `bg-limestone-100` (section) | `bg-paper` |
| `eyebrow bg-clay-500 text-limestone-50` | `eyebrow bg-app-brand text-white` |
| `section-title mt-7` | `section-heading mt-6` |
| `text-pine-600` | `text-graphite/70` |
| `stroke="rgba(184,103,70,.66)"` (svg-путь) | `stroke="rgba(47,107,95,.6)"` |
| `fill="#B86746"` (circle) | `fill="#2F6B5F"` |
| `bg-pine-950` (карточка региона) | `bg-graphite` |
| `text-clay-400` (MapPin) | `text-app-gold` |
| `text-sage-300` (подпись региона) | `text-app-dark-caption` |
| `fill="rgba(111,133,117,.1)" stroke="rgba(23,33,28,.14)"` (контур) | без изменений |
| `text-pine-950/[0.035]` («18») | `text-graphite/[0.05]` |
| `fill="#0B1712"` (гексагон) | `fill="#23262F"` |
| `fill="#D4DDD6"` (два circle) | `fill="#CBDCD6"` |

`FAQSection`:

| Было | Стало |
|---|---|
| `bg-pine-950 text-limestone-50` (section) | `bg-graphite-deep text-app-dark-text` |
| `eyebrow bg-white/[0.08] text-sage-300` | `eyebrow bg-white/[0.08] text-app-dark-caption` |
| `section-title mt-7` | `section-heading mt-6` |
| `font-display text-2xl … md:text-3xl` (вопрос) | `font-heading text-lg font-semibold md:text-xl` |
| `bg-clay-500 text-white` (открытая иконка) | `bg-app-brand text-white` |
| `text-limestone-200` / `text-limestone-300` | `text-app-dark-caption` |

`FinalCTASection` (антиква `section-title` заголовка CTA сохраняется — это разрешённое место):

| Было | Стало |
|---|---|
| `bg-pine-950 text-limestone-50` | `bg-graphite-deep text-app-dark-text` |
| `rgba(11,23,18,…)` в градиенте (3 вхождения) | `rgba(15,18,23,…)` (те же альфы) |
| `eyebrow … text-sage-300` | `eyebrow … text-app-dark-caption` |
| `text-limestone-200` | `text-app-dark-caption` |
| `text-sage-300` (подпись QR) | `text-app-dark-caption` |

`QrMark`:

| Было | Стало |
|---|---|
| `bg-limestone-50 … text-pine-950` | `bg-paper … text-graphite` |
| `bgColor="#FAF8F2"` | `bgColor="#F7F8F5"` |
| `fgColor="#0B1712"` | `fgColor="#0F1217"` |

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: все PASS; lint не находит неиспользуемых импортов.

Run: `grep -nE "clay-|mist-|pine-|limestone-|sage-" src/components/home/HomePage.tsx src/components/home/sections/*.tsx`
Expected: пусто — легаси-палитры на новой главной не осталось.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/HomePage.tsx src/components/home/__tests__/HomePage.test.tsx
git commit -m "feat(home): сборка «Живой сделки» — порядок спеки, ритм 80/20, рестайл хвоста"
```

---

### Task 8: Верификация главной

**Files:**
- Test: вся кодовая база.

**Interfaces:**
- Consumes: результаты задач 1–7.
- Produces: подтверждённая главная; скриншоты — контроллером сессии после этой задачи.

- [ ] **Step 1: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 2: Смоук главной без браузера**

Run: `npm run dev` (в фоне), дождаться готовности, затем:

```bash
curl -s http://localhost:3000/ | python3 -c "
import sys, re, html
raw = sys.stdin.read()
text = re.sub(r'<script[^>]*>.*?</script>', '', raw, flags=re.S)
text = re.sub(r'<!--.*?-->', '', text, flags=re.S)
text = html.unescape(re.sub(r'<[^>]+>', ' ', text))
for probe in ['Акт 02', 'Акт 05', 'Закреплён за вами', 'Новое обращение', 'Объект проверяется до публикации', 'Начните поиск дома']:
    print(probe, '=>', 'OK' if probe in text else 'MISSING')
for absent in ['Одна платформа — три рабочих маршрута', 'Основание для доверия', 'из 5']:
    print('нет', absent, '=>', 'OK' if absent not in text else 'FOUND (дефект)')
"
```

Expected: все probe → OK, все absent → OK. Остановить dev-сервер.

- [ ] **Step 3: Финальный коммит (если были правки)**

```bash
git status
# если чисто — главная готова; скриншот-ревью делает контроллер
```

---

## Что дальше

- Скриншот-ревью главной (десктоп 1440 + мобайл 390, включая reduced-motion) — контроллер сессии.
- План «Страницы»: регистры /buyers—/agencies—/developers—/investors, /how-it-works покадрово, редирект /product, перевод Header/Footer и подстраниц с pine/limestone на paper/graphite, снятие deprecated-токенов (clay, mist, secondary, accent), перенос контента удалённых секций на подстраницы.
