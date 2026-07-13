# BAST Investors Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать страницу `/investors` (инфраструктура загородной сделки: рынок, продукт, бизнес-модель, момент, roadmap, гейт на материалы, FAQ) и подключить её в навигацию и футер.

**Architecture:** Статический Next.js (App Router, `output: 'export'`). Страница — новый компонент `InvestorsPage` из инлайновых секций-компонентов в одном файле, по паттерну `DevelopersPage.tsx`/`AgenciesPage.tsx`. Роут `src/app/investors/page.tsx` рендерит компонент. Навигация подключается через `siteLinks`/`navItems` и `Footer`.

**Tech Stack:** Next.js 14.2, React 18, TypeScript, Tailwind CSS 3.4, Framer Motion (через `Reveal`), lucide-react.

## Global Constraints

- **Честный тон, без цифр.** На странице НЕТ никаких метрик/тракшна/юнит-экономики. Легаси-метрики (2 500 объектов, 150+ риэлторов, 40 застройщиков, 1,2 млрд ₽ GMV) НЕ использовать. Все цифры — только «в материалах по запросу».
- **Нет секции «Команда».**
- **Roadmap — без дат**, направлениями.
- Допустимые факты: приложение в App Store и Google Play; покупатели бесплатно; объекты в Удмуртии; архитектура позволяет подключать участников из других регионов; сценарий сделки завершается подписанием документов (передачу ключей НЕ обещать).
- **Лид — mailto.** Константы: Pitch Deck → `mailto:partners@bast-estate.ru?subject=Запрос Pitch Deck БАСТ`; Financial Model → `mailto:partners@bast-estate.ru?subject=Запрос финансовой модели БАСТ`.
- **Скриншоты** — стилизованный плейсхолдер `ScreenshotSlot`, не `<img>`.
- **Типографика:** ёлочки «», тире «—», без прямых кавычек. Бренд в тексте — «БАСТ»; программа — латиницей «BAST».
- **Нет тест-раннера:** проверка = `npx tsc --noEmit` (в задачах; НЕ `npm run build` — параллельно работает dev-сервер, build ломает `.next`) + Playwright-проверка контроллером. Финальный `npm run build` — один раз в конце всей ветки.
- Рабочая директория для команд — `/Users/romanmensikov/basteestate/project`.
- Копирайт секций — в спеке `docs/superpowers/specs/2026-07-07-bast-investors-page-design.md` (источник истины); в задачах приведён финальный текст.

---

## File Structure

- **Create** `project/src/components/investors/InvestorsPage.tsx` — страница инвесторов (9 секций-компонентов + export).
- **Create** `project/src/app/investors/page.tsx` — роут с `metadata`, рендерит `<InvestorsPage />`.
- **Modify** `project/src/lib/site.ts` — `siteLinks.investors` + пункт в `navItems`.
- **Modify** `project/src/components/Footer.tsx` — ссылка «Инвесторам» в группе «Партнёрам».

Декомпозиция: страница — самостоятельный файл-ответственность (как DevelopersPage). Разбита на две задачи (по 4–5 секций) для чистого ревью. Навигация — отдельная задача, идёт ПОСЛЕ создания роута, чтобы ссылки не вели в 404.

---

### Task 1: /investors — страница, часть 1 (Hero + Рынок + Продукт + Бизнес-модель)

**Files:**
- Create: `project/src/components/investors/InvestorsPage.tsx`
- Create: `project/src/app/investors/page.tsx`

**Interfaces:**
- Consumes: `Header`, `Footer`, `HomeButton`, `Reveal`, `Image`, `siteLinks`; классы дизайн-системы.
- Produces: `export function InvestorsPage()`; хелпер `ScreenshotSlot({label, className})`; константы `pitchHref`, `financeHref`. В части 1 — 4 секции; Task 2 дополнит до 9 (тот же export).

- [ ] **Step 1: Создать файл страницы с частью 1**

Create `project/src/components/investors/InvestorsPage.tsx`:

```tsx
'use client'

import Image from 'next/image'
import {
  BadgeCheck,
  BadgeX,
  Gift,
  Handshake,
  Layers,
  LayoutDashboard,
  MapPin,
  Percent,
  TrendingDown,
  Unlink,
  Wallet,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { siteLinks } from '@/lib/site'

const pitchHref = 'mailto:partners@bast-estate.ru?subject=Запрос Pitch Deck БАСТ'
const financeHref = 'mailto:partners@bast-estate.ru?subject=Запрос финансовой модели БАСТ'

function ScreenshotSlot({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[1.6rem] bg-pine-900 ring-1 ring-inset ring-white/10 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(111,133,117,.22),transparent_55%)]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-clay-400">
          <Layers className="h-5 w-5" strokeWidth={1.15} />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Экран приложения</p>
        <p className="max-w-[16rem] text-sm leading-6 text-limestone-200">{label}</p>
      </div>
    </div>
  )
}

function InvestorHero() {
  const pillars = [
    ['Маркетплейс на карте', MapPin],
    ['CRM для профи', LayoutDashboard],
    ['Авторство и бонусы', BadgeCheck],
    ['Программа BAST', Handshake],
  ] as const

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородная недвижимость"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.85)_46%,rgba(11,23,18,.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Инвесторам</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Инфраструктура{' '}
            <span className="block text-mist-200">загородной сделки</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Одна платформа связывает покупателей, риэлторов и застройщиков — от поиска объекта до подписания договора. Приложение работает и развивается на рынке загородной недвижимости.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={pitchHref} variant="light" external>
              Запросить Pitch Deck
            </HomeButton>
            <HomeButton href={financeHref} variant="text" external className="text-limestone-100">
              Запросить финмодель
            </HomeButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Приложение в App Store и Google Play</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Старт в Удмуртии</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Материалы — по запросу</span>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="hidden lg:block">
          <div className="bezel-dark mx-auto w-full max-w-[460px]">
            <div className="bezel-core-dark p-6 text-limestone-50 md:p-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что внутри платформы</p>
              <div className="mt-6 space-y-3">
                {pillars.map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-3 rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-clay-400">
                      <Icon className="h-4 w-4" strokeWidth={1.2} />
                    </span>
                    <p className="text-sm font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MarketSection() {
  const problems = [
    { title: 'Разрозненные каналы', text: 'Объект, чат и документы живут отдельно друг от друга.', icon: Unlink },
    { title: 'Потерянное авторство', text: 'Непонятно, кто привёл клиента и кому принадлежит сделка.', icon: BadgeX },
    { title: 'Сделка не доходит до конца', text: 'Без единого контура часть сделок теряется по пути.', icon: TrendingDown },
  ]

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Рынок</span>
            <h2 className="section-title mt-7">Загородная сделка живёт вне единой системы</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Загородная недвижимость остаётся фрагментированной: объекты, переписка и документы разнесены по разным каналам. Из-за этого теряется авторство сделки, а часть сделок не доходит до договора.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {problems.map((p, index) => (
            <Reveal key={p.title} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[300px] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <p.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-14 font-display text-3xl leading-none md:text-4xl">{p.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSection() {
  const pillars = [
    ['Маркетплейс на карте', 'Поиск объектов с фильтрами и чаты по объекту.', MapPin],
    ['CRM для профи', 'Клиенты, объявления и сделки для риэлторов и застройщиков.', LayoutDashboard],
    ['Авторство и бонусы', 'Привязка клиента ссылкой, инвайт-кодом или QR, авторство в сделке.', BadgeCheck],
    ['Программа BAST', 'Маркетплейс свободных сделок между застройщиками и риэлторами.', Handshake],
  ] as const

  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Продукт</span>
          <h2 className="section-title mt-7">Продукт, который уже работает</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-limestone-300">
            БАСТ — не концепт, а работающее приложение: маркетплейс объектов на карте, встроенная CRM для профессионалов, реферальная привязка клиента с сохранением авторства и сквозная сделка до подписания документов.
          </p>
          <div className="mt-10 space-y-4">
            {pillars.map(([title, text, Icon]) => (
              <div key={title} className="flex items-start gap-4 border-b border-white/10 pb-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-clay-400">
                  <Icon className="h-4 w-4" strokeWidth={1.2} />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <HomeButton href={siteLinks.agencies} variant="light">Для агентств</HomeButton>
            <HomeButton href={siteLinks.developers} variant="text" className="text-limestone-100">Для застройщиков</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot label="Карта объектов и карточка сделки" className="min-h-[460px]" />
        </Reveal>
      </div>
    </section>
  )
}

function BusinessModelSection() {
  const streams = [
    { title: 'SaaS-подписки', text: 'Агентства и застройщики платят за рабочее пространство: CRM, объявления, команды.', icon: Wallet },
    { title: 'Комиссии со сделок', text: 'Платформа участвует в сделках, доведённых до договора.', icon: Percent },
    { title: 'Партнёрские программы', text: 'Сертификаты и предложения партнёров вокруг сделки.', icon: Gift },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-clay-500 text-limestone-50">Монетизация</span>
          <h2 className="section-title mt-7">Три источника выручки на одной платформе</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Платформа зарабатывает на профессиональных участниках рынка, а не на покупателях — для них приложение бесплатно.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {streams.map((s, index) => (
            <Reveal key={s.title} delay={index * 0.08}>
              <div className="rounded-[2rem] bg-limestone-50 p-7 shadow-[0_24px_70px_rgba(11,23,18,0.08)]">
                <div className="flex items-center justify-between">
                  <s.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                </div>
                <p className="mt-14 font-display text-4xl leading-none">{s.title}</p>
                <p className="mt-5 text-sm leading-7 text-pine-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm leading-7 text-pine-500">
            Юнит-экономику и разбивку выручки предоставляем в финансовой модели по запросу.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function InvestorsPage() {
  return (
    <>
      <Header />
      <main>
        <InvestorHero />
        <MarketSection />
        <ProductSection />
        <BusinessModelSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Создать роут**

Create `project/src/app/investors/page.tsx`:

```tsx
import { InvestorsPage } from '@/components/investors/InvestorsPage'

export const metadata = {
  title: 'Инвесторам — инфраструктура загородной сделки БАСТ',
}

export default function Page() {
  return <InvestorsPage />
}
```

- [ ] **Step 3: Проверка типов**

Run: `cd /Users/romanmensikov/basteestate/project && npx tsc --noEmit`
Expected: без ошибок. (НЕ запускать `npm run build`.)

- [ ] **Step 4: Визуальная проверка (контроллер, Playwright)**

- `http://localhost:3000/investors/` — hero + рынок + продукт + бизнес-модель.
- Консоль без ошибок; на 390px нет overflow; hero-изображение и ScreenshotSlot видны.

- [ ] **Step 5: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/investors/InvestorsPage.tsx project/src/app/investors/page.tsx && git commit -m "feat(investors): страница — hero, рынок, продукт, бизнес-модель"
```

---

### Task 2: /investors — страница, часть 2 (Почему сейчас + Roadmap + Материалы + FAQ + CTA)

**Files:**
- Modify: `project/src/components/investors/InvestorsPage.tsx`

**Interfaces:**
- Consumes: всё из Task 1 (`ScreenshotSlot`, `pitchHref`, `financeHref`, иконки).
- Produces: 5 новых секций и обновлённый `InvestorsPage` export (9 секций).

- [ ] **Step 1: Добавить иконки части 2 в импорт**

В импорт из `lucide-react` добавить (в алфавитном порядке к существующим): `Check`, `ChevronDown`, `FileText`, `Globe`, `LineChart`, `Network`, `Smartphone`, `Sparkles`, `TreePine`. Итоговый список импорта: `BadgeCheck, BadgeX, Check, ChevronDown, FileText, Gift, Globe, Handshake, Layers, LayoutDashboard, LineChart, MapPin, Network, Percent, Smartphone, Sparkles, TreePine, TrendingDown, Unlink, Wallet`.

- [ ] **Step 2: Добавить `WhyNowSection`**

Вставить перед `export function InvestorsPage()`:

```tsx
function WhyNowSection() {
  const points = [
    { title: 'Спрос на загород', text: 'Интерес к загородной жизни устойчиво высок.', icon: TreePine },
    { title: 'Мобильное поведение', text: 'Сделка и общение уходят в телефон; QR и приложения привычны.', icon: Smartphone },
    { title: 'Нет инфраструктурного слоя', text: 'Единой системы «объект → сделка → договор» для загорода не сложилось.', icon: Network },
  ]

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_38%,rgba(111,133,117,.2),transparent_42%)]" />
      <div className="page-container relative">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-white/[0.08] text-sage-300">Момент</span>
          <h2 className="section-title mt-7">Почему это работает именно сейчас</h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {points.map((p, index) => (
            <Reveal key={p.title} delay={index * 0.08}>
              <div className="bezel-dark h-full">
                <div className="bezel-core-dark flex h-full min-h-[280px] flex-col p-7 md:p-9">
                  <p.icon className="h-7 w-7 text-clay-400" strokeWidth={1.1} />
                  <h3 className="mt-auto pt-12 font-display text-3xl leading-none md:text-4xl">{p.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-limestone-300">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Добавить `RoadmapSection`**

```tsx
function RoadmapSection() {
  const steps = [
    ['Веб-каталог для покупателей', 'Сейчас каталог живёт в приложении, следующий шаг — веб.', Globe],
    ['Новые регионы', 'Архитектура позволяет подключать продавцов и агентства из других регионов России.', MapPin],
    ['Персональные подборки', 'Автоматический подбор объектов под запрос покупателя.', Sparkles],
    ['Расширение сценария сделки', 'Развитие этапов вокруг подписания документов.', FileText],
  ] as const

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-pine-950 text-limestone-50">Направление</span>
          <h2 className="section-title mt-7">Куда развивается платформа</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Развитие идёт от работающего ядра. Ближайшие направления — без привязки к датам.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="bezel">
          <div className="bezel-core p-7 md:p-10">
            {steps.map(([title, text, Icon], index) => (
              <div key={title} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-9 last:pb-0">
                {index < steps.length - 1 && (
                  <span className="absolute bottom-0 left-[1.31rem] top-12 w-px bg-pine-950/10" />
                )}
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-pine-950 text-limestone-50">
                  <Icon className="h-4 w-4" strokeWidth={1.2} />
                </span>
                <div className="pt-1">
                  <p className="font-display text-3xl leading-none">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-pine-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Добавить `MaterialsSection`** (гейт на цифры)

```tsx
function MaterialsSection() {
  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300">Материалы</span>
          <h2 className="section-title mt-7">Цифры и модель — в материалах по запросу</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-limestone-300">
            Тракшн, юнит-экономику и финансовую модель мы не публикуем на сайте — передаём в материалах по запросу. Напишите, и мы направим Pitch Deck и финансовую модель.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={pitchHref} variant="light" external>Запросить Pitch Deck</HomeButton>
            <HomeButton href={financeHref} variant="text" external className="text-limestone-100">Запросить финмодель</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bezel-dark">
            <div className="bezel-core-dark p-6 text-limestone-50 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что внутри материалов</p>
              <div className="mt-6 space-y-3">
                {[
                  ['Pitch Deck', 'Продукт, рынок, модель, команда, планы.', FileText],
                  ['Financial Model', 'Выручка, юнит-экономика, сценарии.', LineChart],
                ].map(([title, text, Icon]) => {
                  const IconComponent = Icon as typeof FileText
                  return (
                    <div key={title as string} className="flex items-start gap-4 rounded-[1.25rem] bg-white/[0.055] p-5 ring-1 ring-inset ring-white/[0.07]">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-clay-400">
                        <IconComponent className="h-4 w-4" strokeWidth={1.2} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{title as string}</p>
                        <p className="mt-1 text-xs leading-5 text-limestone-300">{text as string}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 border-t border-white/10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что приложить к запросу</p>
                <p className="mt-3 text-xs leading-5 text-limestone-300">Фонд или компания · стадия интереса · контакт</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Добавить `InvestorFaqSection`** (светлый вариант FAQ)

```tsx
function InvestorFaqSection() {
  const faqItems = [
    ['На какой стадии проект?', 'Приложение работает и доступно в App Store и Google Play, объекты представлены в Удмуртии. Детали стадии — в материалах по запросу.'],
    ['Как платформа зарабатывает?', 'SaaS-подписки профессиональных участников, комиссии с доведённых до договора сделок и партнёрские программы. Для покупателей приложение бесплатно.'],
    ['Как устроено масштабирование по регионам?', 'Архитектура продукта позволяет подключать продавцов, агентства и застройщиков из других регионов России.'],
    ['Где взять цифры и финмодель?', 'Запросите Pitch Deck и финансовую модель — направим их в ответ на обращение.'],
  ] as const

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
        <Reveal>
          <span className="eyebrow bg-pine-950 text-limestone-50">Вопросы</span>
          <h2 className="section-title mt-7">Коротко для инвестора</h2>
        </Reveal>

        <Reveal delay={0.1} className="bezel">
          <div className="bezel-core divide-y divide-pine-950/10 px-6 md:px-9">
            {faqItems.map(([question, answer], index) => (
              <details key={question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-2xl leading-none md:text-3xl">{question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine-950/[0.06] text-pine-700 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180 group-open:bg-clay-500 group-open:text-white">
                    <ChevronDown className="h-4 w-4" strokeWidth={1.1} />
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 text-sm leading-7 text-pine-600">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Добавить `InvestorCtaSection`**

```tsx
function InvestorCtaSection() {
  return (
    <section className="relative min-h-[640px] overflow-hidden bg-pine-950 text-limestone-50">
      <Image src="/images/cta-house.png" alt="Загородный дом" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.5),rgba(11,23,18,.82)_52%,rgba(11,23,18,.95))]" />
      <div className="section-shell page-container relative flex min-h-[640px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Обсудить участие</span>
            <h2 className="section-title mt-7 max-w-4xl">Обсудим участие в БАСТ</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-limestone-200">
              Ответим и направим материалы для инвестора.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <HomeButton href={pitchHref} variant="light" external>Запросить Pitch Deck</HomeButton>
              <HomeButton href={financeHref} variant="text" external className="text-limestone-100">Запросить финмодель</HomeButton>
            </div>
          </div>

          <div className="bezel-dark max-w-xs">
            <div className="bezel-core-dark p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Материалы</p>
              <div className="mt-6 space-y-4">
                {['Pitch Deck', 'Financial Model'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={1.3} />
                    </span>
                    <p className="text-sm text-limestone-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Обновить `InvestorsPage` export**

Заменить блок `export function InvestorsPage()` на полный состав:

```tsx
export function InvestorsPage() {
  return (
    <>
      <Header />
      <main>
        <InvestorHero />
        <MarketSection />
        <ProductSection />
        <BusinessModelSection />
        <WhyNowSection />
        <RoadmapSection />
        <MaterialsSection />
        <InvestorFaqSection />
        <InvestorCtaSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 8: Проверка типов**

Run: `cd /Users/romanmensikov/basteestate/project && npx tsc --noEmit`
Expected: без ошибок. Убедиться, что все импортированные иконки используются и нет использования иконок вне импорта. Привести список импортированных иконок в отчёте.

- [ ] **Step 9: Визуальная проверка (контроллер, Playwright)**

- `http://localhost:3000/investors/` — полная страница из 9 секций; FAQ (светлый) раскрывается; overflow нет; консоль чистая.

- [ ] **Step 10: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/investors/InvestorsPage.tsx && git commit -m "feat(investors): почему сейчас, roadmap, материалы, FAQ и CTA"
```

---

### Task 3: Навигация — пункт «Инвесторам» в меню и футере

**Files:**
- Modify: `project/src/lib/site.ts`
- Modify: `project/src/components/Footer.tsx`

**Interfaces:**
- Consumes: `siteLinks` (расширяется), `navItems` (пункт), `Footer` группы.
- Produces: рабочая ссылка `/investors` в шапке (через `navItems`, который читает `Header`) и в футере.

- [ ] **Step 1: Добавить роут в `siteLinks` и пункт в `navItems`**

В `project/src/lib/site.ts`:
1. В объект `siteLinks` добавить строку после `developers`:

```tsx
  developers: '/developers',
  investors: '/investors',
```

2. В массив `navItems` добавить пункт после «Застройщикам»:

```tsx
export const navItems = [
  { label: 'Покупателям', href: siteLinks.buyers },
  { label: 'Агентствам', href: siteLinks.agencies },
  { label: 'Застройщикам', href: siteLinks.developers },
  { label: 'Инвесторам', href: siteLinks.investors },
  { label: 'Как работает', href: siteLinks.howItWorks },
  { label: 'О БАСТ', href: siteLinks.about },
] as const
```

- [ ] **Step 2: Добавить ссылку в футер**

В `project/src/components/Footer.tsx`, в группе «Партнёрам», добавить строку после «Застройщикам»:

```tsx
      ['Агентствам', siteLinks.agencies],
      ['Застройщикам', siteLinks.developers],
      ['Инвесторам', siteLinks.investors],
      ['Возможности платформы', siteLinks.product],
      ['Контакты', siteLinks.contact],
```

- [ ] **Step 3: Проверка типов**

Run: `cd /Users/romanmensikov/basteestate/project && npx tsc --noEmit`
Expected: без ошибок.

- [ ] **Step 4: Визуальная проверка (контроллер, Playwright)**

- На `http://localhost:3000/` в шапке появился пункт «Инвесторам», ведёт на `/investors/`; в футере в группе «Партнёрам» есть «Инвесторам».
- Проверить, что 6 пунктов меню помещаются на десктопе (1440px) без переноса/налезания; мобильное меню содержит новый пункт.

- [ ] **Step 5: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/lib/site.ts project/src/components/Footer.tsx && git commit -m "feat(nav): пункт «Инвесторам» в меню и футере"
```

---

## Self-Review

**Spec coverage:**
- Hero (§1) → Task 1 `InvestorHero`. ✔
- Рынок и проблема (§2) → Task 1 `MarketSection` (3 пункта). ✔
- Что построено (§3) → Task 1 `ProductSection` (4 пилара + ссылки + ScreenshotSlot). ✔
- Бизнес-модель (§4) → Task 1 `BusinessModelSection` (3 потока + подпись про юнит-экономику). ✔
- Почему сейчас (§5) → Task 2 `WhyNowSection` (3 пункта). ✔
- Roadmap (§6) → Task 2 `RoadmapSection` (4 направления, без дат). ✔
- Материалы-гейт (§7) → Task 2 `MaterialsSection` (что внутри + что приложить + 2 CTA). ✔
- FAQ (§8) → Task 2 `InvestorFaqSection` (4 вопроса) + финальный CTA `InvestorCtaSection`. ✔
- Навигация (nav + footer) → Task 3. ✔
- «Без секции Команда», «без цифр» — соблюдено во всех секциях. ✔

**Placeholder scan:** `[СКРИНШОТ: …]` → компонент `ScreenshotSlot` с реальной разметкой. Нет TODO/«implement later».

**Type consistency:** `ScreenshotSlot({label, className})`, `pitchHref`, `financeHref` определены в Task 1 и используются в Task 2 (тот же файл). Имена секций уникальны и совпадают между определением и export. Импорт иконок разбит: Task 1 — 11 иконок (BadgeCheck, BadgeX, Gift, Handshake, Layers, LayoutDashboard, MapPin, Percent, TrendingDown, Unlink, Wallet), все используются в части 1; Task 2 добавляет 9 (Check, ChevronDown, FileText, Globe, LineChart, Network, Smartphone, Sparkles, TreePine), все используются в части 2. Итог — 20 иконок, каждая используется.

**Известный приём (не дефект):** двойной каст в кортеже (`Icon as typeof FileText`, `title as string`) в `MaterialsSection` — тот же приём, что уже в HomePage/AgenciesPage/DevelopersPage; оставлен для консистентности.
