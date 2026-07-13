# Конвейер инвестора /investors — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать `/investors` в четвёртый ролевой конвейер на `RolePipelinePage` — шесть стадий инвест-истории (рынок → продукт → выручка → момент → рост → материалы). Для этого `StickyPipeline` эволюционирует: панели переменной высоты (карточки-доказательства, а не только телефон-экраны) и подписи панели — в пропы.

**Architecture:** Две части. (1) Каркас: `relative` + невидимый сайзер `stages[0].panel` + слои `absolute inset-0` заменяются на **grid-стек** — все слои в одной grid-ячейке (`col-start-1 row-start-1`), высота контейнера = максимальная панель, сайзер-дубль исчезает. Подписи (`Живой экран приложения` / `Экран приложения · демо-данные`) становятся пропами `caption`/`mobileCaption` с `null` для отключения — для инвест-карточек подпись «экран приложения» была бы ложью. (2) Страница: `InvestorsPage` — конфиг шести `PipelineStage` для `RolePipelinePage`; панели — карточки-доказательства, телефон (`SearchScreen`) только в стадии «продукт».

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (разделы «Конвейер инвестора» и «Входы для планов конвейеров»).
**Образцы:** `src/components/realtors/RealtorsPage.tsx`, `src/components/developers/DevelopersPage.tsx`.
**Правки заказчика:** `pravki.md` — hero инвесторов смягчить вводной конструкцией («сейчас на рынке сложилась ситуация…», не приговор); разрозненные каналы промо (риэлторы не знают про акции застройщика, мелкие застройщики не умеют в продвижение — БАСТ как площадка, где всё видно); авторство сделки; реклама как источник выручки; партнёрство с банками (льготная ипотека, финансирование застройщиков).

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Честный тон инвест-страницы сохраняется: никаких неподтверждённых метрик и дат; тракшн и юнит-экономика — только «в материалах по запросу».
- Палитра: hero/финал — `bg-graphite-deep` + `app-dark.*`; стадии — `bg-paper`. Легаси (`clay/pine/limestone/sage/mist`) запрещены.
- Антиква — только H1 hero и H2 финала. Заголовки стадий — гротеск (рендерит `StickyPipeline`).
- Моушен каркаса не деградирует: крослейд остаётся прерываемым (`transition` по `opacity`/`transform`), высота между стадиями НЕ анимируется (layout-свойство), reduced-motion сохраняет фейды.
- Существующие конвейеры (`/`, `/realtors`, `/developers`) не должны измениться визуально — их тесты и есть регресс-контроль правки каркаса.
- Русские тексты: «ёлочки», тире «—» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: StickyPipeline — grid-стек и подписи в пропы

**Files:**
- Modify: `src/components/pipeline/StickyPipeline.tsx`
- Modify: `src/components/pipeline/__tests__/StickyPipeline.test.tsx`
- Modify: `src/components/pipeline/RolePipelinePage.tsx` (проброс `caption`/`mobileCaption`)

**Interfaces:**
- Produces: `StickyPipeline({ stages, caption?, mobileCaption? })` — `caption: string | null` (`null` — подпись не рендерится); дефолты прежние, поэтому существующие конвейеры не меняются.
- Produces: `RolePipelinePage({ ..., caption?, mobileCaption? })` — проброс в `StickyPipeline`.

- [ ] **Step 1: Написать падающие тесты**

Дописать в `StickyPipeline.test.tsx`:

```tsx
  it('панели переменной высоты: сайзера-дубля нет (grid-стек)', () => {
    render(<StickyPipeline stages={stages} />)
    // мобайл-инлайн(1) + десктоп-слой(1) — ровно два, без невидимого сайзера
    expect(screen.getAllByText('ПАНЕЛЬ-A')).toHaveLength(2)
  })

  it('подписи панели по умолчанию — про экран приложения', () => {
    render(<StickyPipeline stages={stages} />)
    expect(screen.getByText('Живой экран приложения')).toBeInTheDocument()
  })

  it('caption={null} убирает подписи (панели-карточки, а не экраны)', () => {
    render(<StickyPipeline stages={stages} caption={null} mobileCaption={null} />)
    expect(screen.queryByText('Живой экран приложения')).not.toBeInTheDocument()
    expect(screen.queryByText(/Экран приложения/)).not.toBeInTheDocument()
  })
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npm test -- StickyPipeline`
Expected: FAIL — сайзер даёт третью «ПАНЕЛЬ-A», проп `caption` не существует.

- [ ] **Step 3: Перевести sticky-стек на grid и вынести подписи**

В `StickyPipeline.tsx`:
- сигнатура: `{ stages, caption = 'Живой экран приложения', mobileCaption = 'Экран приложения · демо-данные' }: { stages: PipelineStage[]; caption?: string | null; mobileCaption?: string | null }`;
- мобильный кадр: подпись рендерится только если `mobileCaption`;
- десктоп-стек: вместо `relative` + невидимый сайзер + `absolute inset-0` — `<div className="grid">`, каждый слой `className="col-start-1 row-start-1 motion-safe:transition-[opacity,transform] motion-safe:duration-[260ms]"`; высота ячейки = самая высокая панель, сайзер удаляется;
- подпись под стеком — в потоке (`mt-4`), только если `caption`.

- [ ] **Step 4: Пробросить пропы в RolePipelinePage**

`RolePipelinePage` принимает `caption?: string | null`, `mobileCaption?: string | null` и передаёт в `StickyPipeline` (не задавая дефолтов сам — дефолты живут в каркасе).

- [ ] **Step 5: Проверки (регресс существующих конвейеров)**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное — включая тесты главной, `/realtors`, `/developers`.

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(pipeline): grid-стек панелей переменной высоты и подписи в пропы"
```

---

### Task 2: Конвейер инвестора /investors

**Files:**
- Rewrite: `src/components/investors/InvestorsPage.tsx`
- Create: `src/components/investors/__tests__/InvestorsPage.test.tsx`
- Modify: `src/app/investors/page.tsx` (метаданные)

**Interfaces:**
- Consumes: `RolePipelinePage` с `caption={null}`, `SearchScreen`, `HomeButton`, `Reveal`.
- Produces: `InvestorsPage()` — шесть стадий инвест-истории + финал «Материалы по запросу».

Шесть стадий (спека + `pravki.md`):

1. **Рынок** — «Сегодня рынок загородной недвижимости живёт разрозненно» (вводная конструкция вместо приговора). Панель: три карточки-боли — разрозненные каналы промо (про акции застройщика не знают ни риэлтор, ни покупатель), споры об авторстве, сделка не доходит до договора.
2. **Продукт** — работающее приложение (единственный телефон: `SearchScreen`).
3. **Выручка** — четыре источника: SaaS-подписки, комиссии со сделок, партнёрские программы, реклама (смежная со строительством, ремонтом, благоустройством).
4. **Момент** — почему сейчас: спрос на загород, мобильное поведение, нет инфраструктурного слоя.
5. **Рост** — куда растёт платформа: веб-каталог, новые регионы, партнёрство с банками (льготная ипотека покупателю, финансирование застройщиков — польза пользователям и новый источник комиссий), персональные подборки.
6. **Материалы** — Pitch Deck и финмодель по запросу; цифры не публикуются на сайте.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/investors/__tests__/InvestorsPage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InvestorsPage } from '@/components/investors/InvestorsPage'

describe('InvestorsPage', () => {
  it('hero и шесть стадий инвест-истории', () => {
    render(<InvestorsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('рынок описан как сложившаяся ситуация, а не приговор', () => {
    render(<InvestorsPage />)
    expect(screen.getByText(/Сегодня рынок загородной недвижимости живёт разрозненно/)).toBeInTheDocument()
  })

  it('реклама и банки — в источниках выручки и в росте', () => {
    render(<InvestorsPage />)
    expect(screen.getAllByText(/Реклама/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/банк/i).length).toBeGreaterThanOrEqual(1)
  })

  it('финал: материалы по запросу, без метрик на сайте', () => {
    render(<InvestorsPage />)
    expect(screen.getByRole('link', { name: /Pitch Deck/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /финмодель/i })).toBeInTheDocument()
  })

  it('подписи «экран приложения» не навешены на карточки', () => {
    render(<InvestorsPage />)
    expect(screen.queryByText('Живой экран приложения')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test -- InvestorsPage`
Expected: FAIL.

- [ ] **Step 3: Переписать страницу**

`InvestorsPage` — конфиг `RolePipelinePage` (`eyebrow="Инвесторам"`, `caption={null}`, `mobileCaption={null}`). Панели-карточки — локальные компоненты на `bg-app-dark-*`/`bg-white` карточках в стиле «бумаги»; финал — графитовая секция с двумя CTA (`mailto` Pitch Deck / финмодель) и честной строкой, что тракшн и юнит-экономика — в материалах.

- [ ] **Step 4: Метаданные маршрута**

`src/app/investors/page.tsx` — title/description под инвест-конвейер.

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Run: `grep -rnE "clay-|pine-|limestone-|sage-|mist-" src/components/investors/`
Expected: всё зелёное; легаси-палитры нет.

- [ ] **Step 6: Commit**

---

### Task 3: Верификация конвейера

- [ ] **Step 1:** Полный прогон: `npm test && npm run type-check && npm run lint && npm run build`.
- [ ] **Step 2:** Смоук `/investors` (dev + скриншоты): графитовый hero, шесть стадий, панели-карточки разной высоты не «прыгают» и не обрезаются, телефон только в стадии продукта, подписей «экран приложения» под карточками нет, финал с двумя CTA. Мобайл: панели инлайн.
- [ ] **Step 3:** Регресс: `/`, `/realtors`, `/developers` — панели телефонов и подписи на месте (grid-стек не сломал их).

---

## Что дальше (отдельные планы)

1. **Ролевой свитчер + редиректы + вход покупателя** — все четыре конвейера существуют: свитчер в шапке (Покупателям/Риэлторам/Застройщикам/Инвесторам), редиректы `/buyers`→`/`, `/agencies`→`/realtors`, `/how-it-works`→`/`, `/product`→`/`, стадия входа покупателя на `/`.
2. **Правки покупателя из `pravki.md`** — сертификаты и акции застройщика, бесплатное сопровождение сделки, проверка объектов.
