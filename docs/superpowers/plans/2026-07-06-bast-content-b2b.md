# BAST Content B2B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Раскрыть на лендинге реальный функционал приложения для B2B-аудиторий — добавить на главную секцию про закрепление клиента, вставить секцию авторства на `/agencies` и собрать полноценную страницу `/developers` вместо тонкого шаблона.

**Architecture:** Проект — статический Next.js (App Router, `output: 'export'`). Страницы собираются из инлайновых секций-компонентов в одном файле на страницу (паттерн `HomePage.tsx`, `AgenciesPage.tsx`). Дизайн-система задана: классы `bezel/bezel-core`, `bezel-dark/bezel-core-dark`, `eyebrow`, `section-title`, `section-shell`, `page-container`, обёртка анимации `Reveal`, кнопка `HomeButton`, палитра `pine/limestone/clay/sage/mist`, шрифты Cormorant (`font-display`) + Manrope. Новые секции повторяют эти паттерны 1:1.

**Tech Stack:** Next.js 14.2 (App Router, static export), React 18, TypeScript, Tailwind CSS 3.4, Framer Motion (через `Reveal`), lucide-react (иконки).

## Global Constraints

- **Тон:** честный, без неподтверждённых цифр и обещаний вне продукта. Единственный географический факт — «объекты сейчас представлены в Удмуртии».
- **Запрещено** использовать метрики из мёртвого питч-кода (150+ риэлторов, 1,2 млрд ₽ GMV, 40 застройщиков и т.п.).
- **QR — один из способов закрепления**, не пьедестал. Рядом всегда равнозначны ссылка, инвайт-код, ручная привязка.
- **CTA B2B:** `mailto:partners@bast-estate.ru` с темой письма. Форма и согласие 152-ФЗ — отдельный воркстрим P1, здесь НЕ делаем.
- **Скриншоты приложения** на этом этапе — визуальные плейсхолдеры (стилизованный блок с подписью `[СКРИНШОТ: …]`), НЕ `<img>` с битым путём. Реальные кадры вставляются позже.
- **Типографика:** кавычки-«ёлочки», тире «—», без прямых кавычек `"`. Название бренда в тексте — «БАСТ» в ёлочках.
- **Нет тест-раннера:** проверка каждой задачи = `npm run build` (ловит ошибки TS/JSX) + `npm run lint` + Playwright-проверка (скриншот, консоль без ошибок, отсутствие горизонтального overflow). Это заменяет юнит-TDD, поскольку работа презентационная и не содержит логики для юнит-тестов.
- Рабочая директория для команд — `/Users/romanmensikov/basteestate/project`.
- Копирайт всех секций — в спеке `docs/superpowers/specs/2026-07-06-bast-content-map-b2b-design.md`; в задачах приведён финальный текст, спека — источник истины при расхождении.

---

## File Structure

- **Modify** `project/src/components/home/HomePage.tsx` — добавить `import` иконок, компонент `ReferralSection`, вставить его в `HomePage` между `ContextSection` и `JourneySection`. (Hero-подзаголовок уже корректен — не трогаем.)
- **Modify** `project/src/components/agencies/AgenciesPage.tsx` — добавить `import` иконок, компонент `ClientAttributionSection`, вставить его между `CabinetSection` и `WorkflowSection`.
- **Create** `project/src/components/developers/DevelopersPage.tsx` — полноценная страница застройщиков (8 секций) по паттерну `AgenciesPage.tsx`.
- **Modify** `project/src/app/developers/page.tsx` — заменить рендер `InternalPage` на `<DevelopersPage />`, сохранить `metadata`.

Причина такой декомпозиции: каждая страница — самостоятельный файл-ответственность; изменения независимы и ревьюятся раздельно. Компонент `DevelopersPage` вынесен в отдельный файл (как `AgenciesPage`), а не инлайн в route, — единый паттерн проекта.

---

### Task 1: Home — секция «Закрепление клиента»

**Files:**
- Modify: `project/src/components/home/HomePage.tsx` (импорт иконок — строки 6-21; новый компонент перед `HomePage` ~строка 687; вставка в `main` — строка 695)

**Interfaces:**
- Consumes: `Reveal`, `HomeButton`, `siteLinks` (уже импортированы в файле); классы дизайн-системы.
- Produces: функция-компонент `ReferralSection()` (без пропсов), отрисованная в `HomePage`.

- [ ] **Step 1: Добавить иконки в импорт lucide-react**

В блоке импорта `from 'lucide-react'` (строки 6-21) добавить `BadgeCheck`, `Gift`, `QrCode`, `Link2` в алфавитном порядке. Итоговый импорт:

```tsx
import {
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CircleUserRound,
  FileCheck2,
  FileText,
  Gift,
  Heart,
  Home,
  Link2,
  MapPin,
  MessageCircle,
  QrCode,
  Search,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from 'lucide-react'
```

- [ ] **Step 2: Добавить компонент `ReferralSection`**

Вставить перед `export function HomePage()` (перед строкой 687):

```tsx
function ReferralSection() {
  const methods = [
    { label: 'Способы закрепления', icon: QrCode, title: 'Ссылка, инвайт или QR на показе', text: 'Клиент выбирает удобный способ, результат один: он привязан к риэлтору.' },
    { label: 'Авторство в сделке', icon: BadgeCheck, title: 'Видно, кто привёл клиента', text: 'Авторство сохраняется на всех этапах сделки. Спор «чей клиент» закрыт до его начала.' },
    { label: 'Прозрачные бонусы', icon: Gift, title: 'Бонус привязан к сделке', text: 'Вознаграждение за реферала считается прозрачно и не теряется при передаче между участниками.' },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Клиент и авторство</span>
            <h2 className="section-title mt-7">Клиент закреплён за тем, кто его привёл</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Риэлтор делится объектом ссылкой, инвайтом или QR-кодом на показе. Клиент открывает — и закрепляется за риэлтором. Дальше авторство сохраняется в сделке, а бонусы за приведённого клиента считаются прозрачно.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {methods.map((method, index) => (
            <Reveal key={method.label} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[340px] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <method.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-600">{method.label}</p>
                  <h3 className="mt-auto pt-12 font-display text-3xl leading-none md:text-4xl">{method.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{method.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <HomeButton href={siteLinks.agencies} variant="text">Подробнее для агентств</HomeButton>
        </Reveal>
      </div>
    </section>
  )
}
```

Примечание: `Link2` импортируется для использования в Task 2 согласованности ради не требуется — если линтер ругается на неиспользуемый импорт в этом файле, убрать `Link2` из Step 1 (в Task 1 он не используется). Оставить только `BadgeCheck`, `Gift`, `QrCode`.

- [ ] **Step 3: Вставить секцию в `HomePage`**

В `main` (строки 691-703) добавить `<ReferralSection />` между `<ContextSection />` и `<JourneySection />`:

```tsx
      <main>
        <HeroSection />
        <TrustSection />
        <RoutesSection />
        <ContextSection />
        <ReferralSection />
        <JourneySection />
        <VerificationSection />
        <ProfessionalsSection />
        <OffersSection />
        <GeographySection />
        <FAQSection />
        <FinalCTASection />
      </main>
```

- [ ] **Step 4: Сборка и линт**

Run: `cd /Users/romanmensikov/basteestate/project && npm run build && npm run lint`
Expected: build SUCCESS, lint без новых ошибок (в частности, нет `unused var` по иконкам).

- [ ] **Step 5: Визуальная проверка (Playwright)**

Запустить dev-сервер (если не запущен) и проверить:
- `http://localhost:3000/` — новая секция «Клиент закреплён за тем, кто его привёл» отображается между «Единый контекст» и «Путь покупателя».
- Консоль без новых ошибок.
- На 390px нет горизонтального overflow (`document.documentElement.scrollWidth === clientWidth`).

- [ ] **Step 6: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/home/HomePage.tsx && git commit -m "feat(home): секция «Закрепление клиента и авторство»"
```

---

### Task 2: /agencies — секция «Закрепление клиента и авторство»

**Files:**
- Modify: `project/src/components/agencies/AgenciesPage.tsx` (импорт иконок — строки 4-16; новый компонент; вставка в `main` — строка 557)

**Interfaces:**
- Consumes: `Reveal`, `HomeButton`, `Image`, `siteLinks`, `partnerHref` (уже в файле).
- Produces: функция `ClientAttributionSection()`, отрисованная в `AgenciesPage` между `CabinetSection` и `WorkflowSection`.

- [ ] **Step 1: Добавить иконки в импорт**

В импорт `from 'lucide-react'` (строки 4-16) добавить `BadgeCheck`, `Gift`, `Link2`, `QrCode`, `UserPlus` в алфавитном порядке. Итог:

```tsx
import {
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  CircleUserRound,
  ClipboardList,
  FileCheck2,
  Gift,
  Home,
  LayoutDashboard,
  Link2,
  MessageCircle,
  QrCode,
  ShieldCheck,
  UserPlus,
  UsersRound,
} from 'lucide-react'
```

- [ ] **Step 2: Добавить компонент `ClientAttributionSection`**

Вставить после функции `CabinetSection` (после строки 314), перед `WorkflowSection`:

```tsx
function ClientAttributionSection() {
  const points = [
    ['Личная ссылка и QR', 'На объект или на вас. Ссылка стабильна, её можно разместить на баннере.', Link2],
    ['Привязка в один шаг', 'Клиент сканирует QR или открывает ссылку и закрепляется автоматически.', QrCode],
    ['Защита от ошибок', 'Нельзя привязаться к себе или к уже закреплённому клиенту.', ShieldCheck],
    ['Бонусы за рефералов', 'Вознаграждение привязано к сделке и считается прозрачно.', Gift],
  ] as const

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-pine-950 text-limestone-50">Клиент и авторство</span>
          <h2 className="section-title mt-7">Клиент закреплён за вами — спор об авторстве закрыт</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Поделитесь объектом или профилем ссылкой, инвайт-кодом или QR-кодом на показе. Клиент открывает — и привязывается к вам. Авторство фиксируется и сохраняется на всех этапах сделки.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map(([title, text, Icon]) => (
              <div key={title} className="border-t border-pine-950/10 pt-4">
                <Icon className="h-6 w-6 text-clay-500" strokeWidth={1.15} />
                <p className="mt-5 font-display text-2xl leading-none">{title}</p>
                <p className="mt-3 text-sm leading-6 text-pine-600">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bezel-dark">
            <div className="bezel-core-dark p-6 text-limestone-50 md:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Привязка клиента</p>
                  <p className="mt-2 font-display text-3xl leading-none">Клиент закреплён</p>
                </div>
                <BadgeCheck className="h-7 w-7 text-clay-400" strokeWidth={1.1} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[['Ссылка', Link2], ['Инвайт', UserPlus], ['QR на показе', QrCode]].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof Link2
                  return (
                    <div key={label as string} className="rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                      <IconComponent className="h-5 w-5 text-clay-400" strokeWidth={1.15} />
                      <p className="mt-6 text-xs font-semibold">{label as string}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 rounded-[1.25rem] bg-limestone-50 p-4 text-pine-950">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay-500 text-white">
                    <BadgeCheck className="h-4 w-4" strokeWidth={1.25} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Автор сделки — вы</p>
                    <p className="mt-1 text-[10px] text-pine-500">Бонус за клиента сохранён</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Вставить секцию в `AgenciesPage`**

В `main` (строки 556-567) добавить `<ClientAttributionSection />` между `<CabinetSection />` и `<WorkflowSection />`:

```tsx
      <main>
        <AgencyHero />
        <BenefitsSection />
        <CabinetSection />
        <ClientAttributionSection />
        <WorkflowSection />
        <VerificationSection />
        <GeographySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
```

- [ ] **Step 4: Добавить FAQ-пункт про закрепление**

В массив `faqItems` (строки 69-76) добавить пункт после второго элемента:

```tsx
  ['Как клиент закрепляется за риэлтором?', 'По вашей ссылке, инвайт-коду или QR-коду на показе. После первого открытия клиент привязан к вам, а авторство сохраняется в сделке.'],
```

- [ ] **Step 5: Сборка и линт**

Run: `cd /Users/romanmensikov/basteestate/project && npm run build && npm run lint`
Expected: build SUCCESS, lint без новых ошибок.

- [ ] **Step 6: Визуальная проверка (Playwright)**

- `http://localhost:3000/agencies/` — секция «Клиент закреплён за вами» отображается после «Личный кабинет», перед «Путь покупателя».
- Консоль без ошибок; на 390px нет overflow.

- [ ] **Step 7: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/agencies/AgenciesPage.tsx && git commit -m "feat(agencies): секция закрепления клиента и авторства"
```

---

### Task 3: /developers — новая страница, часть 1 (Hero + Каталог + Обращения + Акции)

**Files:**
- Create: `project/src/components/developers/DevelopersPage.tsx`
- Modify: `project/src/app/developers/page.tsx`

**Interfaces:**
- Consumes: `Header`, `Footer`, `HomeButton`, `Reveal`, `Image`, `siteLinks`; классы дизайн-системы.
- Produces: `export function DevelopersPage()` — рендерит `<Header/> <main>…</main> <Footer/>`. В части 1 создаём каркас и первые 4 секции; в Task 4 дополняем ещё 4 и это тот же export.

- [ ] **Step 1: Создать файл со скелетом и первыми секциями**

Create `project/src/components/developers/DevelopersPage.tsx`:

```tsx
'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  FileText,
  Handshake,
  Home,
  Layers,
  MessageCircle,
  Ruler,
  Ticket,
  UsersRound,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { siteLinks } from '@/lib/site'

const developerHref = 'mailto:partners@bast-estate.ru?subject=Подключение объектов к БАСТ'

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

function DeveloperHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородный объект застройщика"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.84)_46%,rgba(11,23,18,.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Застройщикам</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Управляйте интересом к объектам{' '}
            <span className="block text-mist-200">до подписания договора</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Публикуйте объекты и подряды, принимайте обращения, назначайте ответственных и доводите сделки до договора — в одной системе.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={developerHref} variant="light" external>
              Обсудить подключение объектов
            </HomeButton>
            <HomeButton href={siteLinks.agencies} variant="text" className="text-limestone-100">
              Как это работает для риэлторов
            </HomeButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Готовые дома и подряды</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Программа BAST</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Сейчас в Удмуртии</span>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="hidden lg:block">
          <div className="bezel-dark mx-auto w-full max-w-[520px]">
            <div className="bezel-core-dark p-5 text-limestone-50 md:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Кабинет застройщика</p>
                  <p className="mt-1 text-sm font-semibold">Объекты и обращения</p>
                </div>
                <Building2 className="h-6 w-6 text-clay-400" strokeWidth={1.1} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[['Готовые дома', Home], ['Подряды', Ruler], ['Обращения', MessageCircle], ['Акции', Ticket]].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof Home
                  return (
                    <div key={label as string} className="rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                      <IconComponent className="h-5 w-5 text-clay-400" strokeWidth={1.15} />
                      <p className="mt-6 text-xs font-semibold">{label as string}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-sage-300">Дом 184 м²</p>
                    <p className="mt-2 text-sm font-semibold">Новое обращение</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-clay-400 ring-8 ring-clay-400/10" />
                </div>
                <p className="mt-5 text-[11px] text-limestone-300">Ответственный: отдел продаж</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CatalogSection() {
  const items = [
    { title: 'Готовые дома', text: 'Объявления с характеристиками, фотографиями и видео построенных объектов.', icon: Home },
    { title: 'Подряды', text: 'Материалы стен с ценой и доступностью, поля участка, планировки и секции 3D.', icon: Ruler },
    { title: 'Посёлки', text: 'Объекты, собранные в единый проект, с общим представлением для покупателя.', icon: Boxes },
  ]

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Каталог</span>
            <h2 className="section-title mt-7">Готовые дома и подряды в одном каталоге</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Публикуйте готовые объекты и контракты-подряды. По подряду покажите материалы, планировки и 3D — покупатель видит проект целиком, ещё до строительства.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="bezel h-full">
                <div className="bezel-core flex h-full min-h-[320px] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-14 font-display text-4xl leading-none">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RequestsSection() {
  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Обращения</span>
          <h2 className="section-title mt-7">Покупатель пишет из карточки — команда видит контекст</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-limestone-300">
            Обращение приходит прямо из карточки объекта: сразу понятно, о каком доме речь. Назначьте ответственного и ведите диалог в чате с историей.
          </p>
          <div className="mt-10 space-y-4">
            {[
              ['Контекст обращения', 'Объект, к которому относится вопрос, виден сразу.'],
              ['Ответственные', 'Сотрудник закреплён за обращением и сделкой.'],
              ['Чаты', 'Переписка, статусы «онлайн» и «печатает», поиск по сообщениям.'],
            ].map(([title, text]) => (
              <div key={title} className="flex items-start gap-4 border-b border-white/10 pb-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-clay-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot label="Обращение из карточки объекта и чат с покупателем" className="min-h-[420px]" />
        </Reveal>
      </div>
    </section>
  )
}

function SharesSection() {
  const items = [
    { title: 'Акции на объекте', text: 'Предложение показывается прямо в объявлении.', icon: Ticket },
    { title: 'Сертификаты', text: 'Скидка или условие, привязанные к конкретному дому.', icon: BadgeCheck },
    { title: 'Партнёрский сертификат', text: 'Выдаётся клиенту при завершении сделки.', icon: Handshake },
  ]

  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-clay-500 text-limestone-50">Акции и сертификаты</span>
          <h2 className="section-title mt-7">Акции и сертификаты, привязанные к объектам</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Запускайте акции компании и сертификаты на конкретных объектах. Покупатель видит предложение в карточке, а партнёрский сертификат выдаётся при закрытии сделки.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="rounded-[2rem] bg-limestone-50 p-7 shadow-[0_24px_70px_rgba(11,23,18,0.08)]">
                <div className="flex items-center justify-between">
                  <item.icon className="h-7 w-7 text-clay-500" strokeWidth={1.1} />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage-500" />
                </div>
                <p className="mt-14 font-display text-4xl leading-none">{item.title}</p>
                <p className="mt-5 text-sm leading-7 text-pine-600">{item.text}</p>
                <div className="mt-8 border-t border-pine-950/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-pine-400">
                  В приложении «БАСТ»
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DevelopersPage() {
  return (
    <>
      <Header />
      <main>
        <DeveloperHero />
        <CatalogSection />
        <RequestsSection />
        <SharesSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Переключить роут на новую страницу**

Modify `project/src/app/developers/page.tsx` целиком:

```tsx
import { DevelopersPage } from '@/components/developers/DevelopersPage'

export const metadata = {
  title: 'Платформа для застройщиков загородной недвижимости — БАСТ',
}

export default function Page() {
  return <DevelopersPage />
}
```

- [ ] **Step 3: Сборка и линт**

Run: `cd /Users/romanmensikov/basteestate/project && npm run build && npm run lint`
Expected: build SUCCESS. Линт может предупредить о неиспользованных иконках (`ArrowUpRight`, `FileText`, `UsersRound`, `ChevronDown`, `Building2`) — они нужны в Task 4. Если линт-правило `no-unused-vars` = error и валит build, временно НЕ импортировать неиспользуемые: оставить в импорте только используемые в части 1 (`BadgeCheck`, `Boxes`, `Building2`, `Check`, `Handshake`, `Home`, `Layers`, `MessageCircle`, `Ruler`, `Ticket`), а остальные добавить в Task 4. Проверить фактическое поведение линта командой выше и действовать по факту.

- [ ] **Step 4: Визуальная проверка (Playwright)**

- `http://localhost:3000/developers/` — вместо трёх плоских карточек теперь hero + каталог + обращения + акции.
- Консоль без ошибок; на 390px нет overflow; hero-изображение грузится.

- [ ] **Step 5: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/developers/DevelopersPage.tsx project/src/app/developers/page.tsx && git commit -m "feat(developers): новая страница — hero, каталог, обращения, акции"
```

---

### Task 4: /developers — часть 2 (Программа BAST + Воронка + Скриншоты + FAQ/CTA)

**Files:**
- Modify: `project/src/components/developers/DevelopersPage.tsx`

**Interfaces:**
- Consumes: всё из Task 3 (тот же файл, `ScreenshotSlot`, `developerHref`, иконки).
- Produces: 4 новых секции и обновлённый `DevelopersPage` export с полным составом.

- [ ] **Step 1: Убедиться, что нужные иконки импортированы**

В импорте `from 'lucide-react'` файла должны присутствовать (добавить недостающие из Task 3, если их убирали): `ArrowUpRight`, `ChevronDown`, `FileText`, `Handshake`, `UsersRound`. Итоговый список используемых иконок в файле: `ArrowUpRight, BadgeCheck, Boxes, Building2, Check, ChevronDown, FileText, Handshake, Home, Layers, MessageCircle, Ruler, Ticket, UsersRound`.

- [ ] **Step 2: Добавить `BastProgramSection`**

Вставить перед `export function DevelopersPage()`:

```tsx
function BastProgramSection() {
  const items = [
    ['Предложение', 'Застройщик выставляет сделку — она видна партнёрам-риэлторам.'],
    ['В работе', 'Сделки, которые уже ведут риэлторы, видны в отдельном сегменте.'],
    ['Координатор БАСТ', 'Служебная роль-участник помогает довести сделку до договора.'],
  ] as const

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_38%,rgba(111,133,117,.2),transparent_42%)]" />
      <div className="page-container relative">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-white/[0.08] text-sage-300">Программа BAST</span>
          <h2 className="section-title mt-7">Свободные сделки между застройщиками и риэлторами</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-limestone-300">
            Участникам программы открывается пространство свободных сделок: застройщик выставляет предложение, риэлтор берёт его в работу. Сегменты «Свободные» и «В работе» показывают, что доступно и что уже ведётся.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="bezel-dark h-full">
                <div className="bezel-core-dark flex h-full min-h-[300px] flex-col p-7 md:p-9">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-clay-400">0{index + 1}</span>
                  <h3 className="mt-auto pt-14 font-display text-3xl leading-none md:text-4xl">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-limestone-300">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <HomeButton href={developerHref} variant="light" external>Узнать про программу BAST</HomeButton>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Добавить `FunnelSection`**

```tsx
function FunnelSection() {
  const steps = [
    ['Публикация', 'Объект или подряд выходит в каталог.'],
    ['Интерес', 'Обращения и статистика по объявлению.'],
    ['Сделка', 'Этапы, роли и история статусов.'],
    ['Документы', 'Сценарий доходит до подписания.'],
  ] as const

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-pine-950 text-limestone-50">От публикации до договора</span>
          <h2 className="section-title mt-7">Весь путь объекта — от публикации до подписания</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Объект живёт по понятному маршруту: публикация → обращения → сделка → подписание документов. По каждому объявлению видна статистика: просмотры, интерес, связанные чаты.
          </p>
          <HomeButton href={siteLinks.howItWorks} variant="text" className="mt-9">Посмотреть этапы сделки</HomeButton>
        </Reveal>

        <Reveal delay={0.1} className="bezel">
          <div className="bezel-core p-7 md:p-10">
            {steps.map(([title, text], index) => (
              <div key={title} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-9 last:pb-0">
                {index < steps.length - 1 && (
                  <span className="absolute bottom-0 left-[1.31rem] top-10 w-px bg-pine-950/10" />
                )}
                <span className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
                  index < steps.length - 1 ? 'bg-pine-950 text-limestone-50' : 'bg-mist-100 text-sage-600'
                }`}>
                  {index < steps.length - 1 ? <Check className="h-4 w-4" strokeWidth={1.3} /> : <FileText className="h-4 w-4" strokeWidth={1.1} />}
                </span>
                <div className="pt-1">
                  <p className="font-display text-3xl leading-none">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-pine-500">{text}</p>
                </div>
              </div>
            ))}
            <p className="mt-4 border-t border-pine-950/10 pt-6 text-xs leading-6 text-pine-500">
              Текущий сценарий завершается подписанием документов, без этапа передачи ключей.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Добавить `ScreenshotsSection`**

```tsx
function ScreenshotsSection() {
  return (
    <section className="section-shell bg-mist-100">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow bg-pine-950 text-limestone-50">Интерфейс</span>
          <h2 className="section-title mt-7">Как это выглядит в приложении</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal><ScreenshotSlot label="Кабинет застройщика: объекты и обращения" /></Reveal>
          <Reveal delay={0.08}><ScreenshotSlot label="Карточка объекта с характеристиками и 3D" /></Reveal>
          <Reveal delay={0.16}><ScreenshotSlot label="Акции компании на объекте" /></Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Добавить `DeveloperFaqSection` и `DeveloperCtaSection`**

```tsx
function DeveloperFaqSection() {
  const faqItems = [
    ['Что нужно для подключения?', 'Напишите нам — обсудим объём объектов и порядок публикации.'],
    ['Чем подряд отличается от готового объекта?', 'У подряда вы показываете материалы, планировки и 3D проекта; у готового дома — характеристики и фото построенного объекта.'],
    ['Что даёт программа BAST?', 'Доступ к свободным сделкам: ваши предложения берут в работу риэлторы, а координатор «БАСТ» помогает довести сделку.'],
    ['В каких регионах работает платформа?', 'Сейчас объекты представлены в Удмуртии, платформа расширяется по регионам.'],
  ] as const

  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Перед подключением</span>
          <h2 className="section-title mt-7">Что важно знать застройщику</h2>
        </Reveal>

        <Reveal delay={0.1} className="bezel-dark">
          <div className="bezel-core-dark divide-y divide-white/10 px-6 md:px-9">
            {faqItems.map(([question, answer], index) => (
              <details key={question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-2xl leading-none md:text-3xl">{question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180 group-open:bg-clay-500">
                    <ChevronDown className="h-4 w-4" strokeWidth={1.1} />
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 text-sm leading-7 text-limestone-300">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DeveloperCtaSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-pine-950 text-limestone-50">
      <Image src="/images/cta-house.png" alt="Загородный объект для подключения к БАСТ" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.5),rgba(11,23,18,.82)_52%,rgba(11,23,18,.95))]" />
      <div className="section-shell page-container relative flex min-h-[720px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Партнёрство</span>
            <h2 className="section-title mt-7 max-w-5xl">Подключите объекты к «БАСТ»</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-limestone-200">
              Расскажем, как опубликовать объекты и подключиться к программе BAST.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <HomeButton href={developerHref} variant="light" external>
                Обсудить подключение
              </HomeButton>
              <HomeButton href={siteLinks.contact} variant="text" className="text-limestone-100">
                Контакты
              </HomeButton>
            </div>
          </div>

          <div className="bezel-dark max-w-sm">
            <div className="bezel-core-dark p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что приложить к заявке</p>
              <div className="mt-6 space-y-4">
                {['Типы объектов', 'Количество объектов', 'Регион', 'Кто ведёт подключение'].map((item) => (
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

- [ ] **Step 6: Обновить `DevelopersPage` export**

Заменить блок `export function DevelopersPage()` на полный состав:

```tsx
export function DevelopersPage() {
  return (
    <>
      <Header />
      <main>
        <DeveloperHero />
        <CatalogSection />
        <RequestsSection />
        <SharesSection />
        <BastProgramSection />
        <FunnelSection />
        <ScreenshotsSection />
        <DeveloperFaqSection />
        <DeveloperCtaSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 7: Сборка и линт**

Run: `cd /Users/romanmensikov/basteestate/project && npm run build && npm run lint`
Expected: build SUCCESS, lint без ошибок (все импортированные иконки теперь используются: `ArrowUpRight` — проверить; если не используется, убрать из импорта). `UsersRound`, `Building2` используются в hero.

Примечание: если `ArrowUpRight` не задействован — удалить его из импорта, чтобы линт был чист.

- [ ] **Step 8: Визуальная проверка (Playwright)**

- `http://localhost:3000/developers/` — полная страница из 9 блоков (hero → каталог → обращения → акции → программа BAST → воронка → скриншоты → FAQ → CTA).
- Плейсхолдеры скриншотов видны и подписаны.
- Консоль без ошибок; на 390px нет overflow; проверить контраст clay-текста на тёмном (номера `01/02` — если < 4.5:1 при мелком кегле, это известный системный момент, фиксируется отдельной задачей контраста, не в этом плане).

- [ ] **Step 9: Commit**

```bash
cd /Users/romanmensikov/basteestate && git add project/src/components/developers/DevelopersPage.tsx && git commit -m "feat(developers): программа BAST, воронка, скриншоты, FAQ и CTA"
```

---

## Self-Review

**Spec coverage:**
- Home: новый подзаголовок hero — по факту существующий текст (строки 168-170) уже соответствует смыслу карты («покупатели ищут… риэлторы ведут… застройщики управляют»), отдельная правка не нужна; секция «Закрепление клиента» — Task 1. ✔
- /agencies: секция «Закрепление клиента и авторство» — Task 2 (страница уже содержала CRM, сделку-workflow, команды в Benefits/Cabinet, FAQ, CTA — не дублируем). ✔
- /developers: все 8 секций карты (Hero, Объекты и подряды, Обращения и ответственные, Акции компании, Программа BAST, Воронка сделки, Скриншоты, FAQ+CTA) — Tasks 3-4. ✔
- Расхождение с картой (зафиксировано осознанно): на `/agencies` не строим секции «CRM-кабинет», «Сделка с ролями», «Команды» отдельно — они уже покрыты существующими `CabinetSection`, `WorkflowSection`, `BenefitsSection`. Карта предполагала пустую страницу; страница оказалась готовой. Добавляем только недостающий дифференциатор.

**Placeholder scan:** `[СКРИНШОТ: …]` реализованы как компонент `ScreenshotSlot` с реальной разметкой — это осознанный визуальный плейсхолдер, не «TODO». Кода-заглушек «implement later» нет.

**Type consistency:** `ScreenshotSlot({ label, className })`, `developerHref` — константа, определены в Task 3 и используются в Task 4 в том же файле. Имена секций уникальны и совпадают между определением и `DevelopersPage`. Иконки сверены со списком используемых.

**Открытый риск:** правило линта на неиспользуемые импорты между Task 3 (часть иконок ещё не задействована) — явно отмечено в шагах с инструкцией действовать по факту вывода `npm run lint`.
