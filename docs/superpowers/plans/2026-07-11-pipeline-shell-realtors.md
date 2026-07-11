# Каркас страницы конвейера + конвейер риэлтора — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать переиспользуемый каркас страницы ролевого конвейера `RolePipelinePage` (графитовый hero + `StickyPipeline` стадий + финал + шапка/футер) и построить на нём первый новый конвейер — `/realtors` (шесть стадий пути риэлтора, финал «Руководите агентством?»).

**Architecture:** `RolePipelinePage` — тонкая оболочка: Header → графитовый hero (антиква H1) → секция «бумаги» с `StickyPipeline` → финал (ReactNode) → Footer. Страница роли — конфиг: массив `PipelineStage` (текст + панель-экран) + финал. Панели — существующие HTML-копии экранов. `/realtors` доступен по прямому URL; ролевой свитчер в шапке и редиректы `/agencies`→`/realtors` придут отдельным финальным планом (когда все четыре конвейера существуют — без битых ссылок в static export).

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (конвейер риэлтора).
**Фундамент:** `StickyPipeline` (`src/components/pipeline/StickyPipeline.tsx`, прерываемый крослейд) — используется как есть; экраны из `@/components/app-screens`.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Демо-данные только из канона; панели — существующие экраны `@/components/app-screens`.
- Антиква (`display-title`) — только H1 hero и (в финале) H2 CTA; заголовки стадий — `section-heading` (гротеск, рендерит `StickyPipeline`).
- Палитра: hero/финал — `bg-graphite-deep` + `app-dark.*`; секция стадий — `bg-paper`. Легаси (`clay/pine/limestone/sage/mist`) запрещены.
- `StickyPipeline` в этом плане НЕ меняется (панели риэлтора — телефон-экраны равной высоты; подписи «экран приложения» корректны). Grid-стек и caption-проп — в плане инвестора.
- Русские тексты: «ёлочки», тире «—» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: RolePipelinePage — оболочка страницы конвейера

**Files:**
- Create: `src/components/pipeline/RolePipelinePage.tsx`
- Create: `src/components/pipeline/__tests__/RolePipelinePage.test.tsx`

**Interfaces:**
- Consumes: `Header`, `Footer`, `Reveal`, `StickyPipeline`/`PipelineStage`.
- Produces: `RolePipelinePage({ eyebrow, title, subtitle, intro?, stages, finale })` — на неё опираются планы всех ролевых страниц.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/pipeline/__tests__/RolePipelinePage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import type { PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  { id: 'a', kicker: 'Шаг 01', title: 'Стадия А', text: 'Текст А', panel: <div>ПАНЕЛЬ-A</div> },
  { id: 'b', kicker: 'Шаг 02', title: 'Стадия Б', text: 'Текст Б', panel: <div>ПАНЕЛЬ-B</div> },
]

describe('RolePipelinePage', () => {
  it('hero, стадии и финал на месте', () => {
    render(
      <RolePipelinePage
        eyebrow="Риэлторам"
        title="Заголовок конвейера"
        subtitle="Подзаголовок конвейера"
        stages={stages}
        finale={<section>ФИНАЛ-БЛОК</section>}
      />,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Заголовок конвейера')
    expect(screen.getByText('Стадия А')).toBeInTheDocument()
    expect(screen.getByText('Стадия Б')).toBeInTheDocument()
    expect(screen.getByText('ФИНАЛ-БЛОК')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль `RolePipelinePage` не существует.

- [ ] **Step 3: Создать оболочку**

```tsx
// src/components/pipeline/RolePipelinePage.tsx
import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/home/Reveal'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

/** Оболочка страницы ролевого конвейера: hero + StickyPipeline стадий + финал. */
export function RolePipelinePage({
  eyebrow,
  title,
  subtitle,
  intro,
  stages,
  finale,
}: {
  eyebrow: string
  title: ReactNode
  subtitle: string
  intro?: string
  stages: PipelineStage[]
  finale: ReactNode
}) {
  return (
    <>
      <Header />
      <main>
        {/* Графитовый hero */}
        <section className="relative overflow-hidden bg-graphite-deep pb-20 pt-40 text-app-dark-text">
          <div className="page-container px-5 sm:px-8 lg:px-12">
            <Reveal>
              <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">{eyebrow}</span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">{title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">{subtitle}</p>
            </Reveal>
          </div>
        </section>

        {/* Стадии на «бумаге» */}
        <section className="section-shell bg-paper">
          <div className="page-container">
            {intro && (
              <Reveal>
                <p className="max-w-2xl text-base leading-7 text-graphite/70">{intro}</p>
              </Reveal>
            )}
            <div className={intro ? 'mt-14' : ''}>
              <StickyPipeline stages={stages} />
            </div>
          </div>
        </section>

        {finale}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check`
Expected: все PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/pipeline/RolePipelinePage.tsx src/components/pipeline/__tests__/RolePipelinePage.test.tsx
git commit -m "feat(pipeline): RolePipelinePage — оболочка страницы ролевого конвейера"
```

---

### Task 2: Конвейер риэлтора /realtors

**Files:**
- Create: `src/components/realtors/RealtorsPage.tsx`
- Create: `src/components/realtors/__tests__/RealtorsPage.test.tsx`
- Create: `src/app/realtors/page.tsx`
- Modify: `src/lib/site.ts` (добавить `realtors`)

**Interfaces:**
- Consumes: `RolePipelinePage`, экраны `RealtorProfileScreen`/`SearchScreen`/`ShareInviteScreen`/`WorkspaceScreen`/`DealScreen`/`RewardsScreen`/`TeamScreen`, `HomeButton`, `siteLinks`.
- Produces: `RealtorsPage()` и маршрут `/realtors` — шесть стадий пути риэлтора + финал «Руководите агентством?».

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/realtors/__tests__/RealtorsPage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RealtorsPage } from '@/components/realtors/RealtorsPage'

describe('RealtorsPage', () => {
  it('hero и шесть стадий пути риэлтора', () => {
    render(<RealtorsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('стадия-дифференциатор: клиент закреплён по ссылке', () => {
    render(<RealtorsPage />)
    expect(screen.getByText('Клиент закрепляется по вашей ссылке')).toBeInTheDocument()
  })

  it('финал «Руководите агентством?» с CTA', () => {
    render(<RealtorsPage />)
    expect(screen.getByText(/Руководите агентством/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Подключить агентство/ })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль `RealtorsPage` не существует.

- [ ] **Step 3: Создать страницу**

```tsx
// src/components/realtors/RealtorsPage.tsx
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  DealScreen,
  RealtorProfileScreen,
  RewardsScreen,
  SearchScreen,
  ShareInviteScreen,
  TeamScreen,
  WorkspaceScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { siteLinks } from '@/lib/site'

const stages: PipelineStage[] = [
  {
    id: 'start',
    kicker: 'Шаг 01 · Старт',
    title: 'Станьте риэлтором в приложении',
    text: 'Заявка «Стать риэлтором» из профиля. После одобрения — доступ к клиентам, сделкам, акциям и команде.',
    panel: <RealtorProfileScreen />,
  },
  {
    id: 'catalog',
    kicker: 'Шаг 02 · Каталог',
    title: 'Объекты застройщиков и ваши объявления',
    text: 'Берите в работу объекты застройщиков и ведите свои — карта, каталог, фильтры и счётчики просмотров.',
    panel: <SearchScreen />,
  },
  {
    id: 'attach',
    kicker: 'Шаг 03 · Клиент закреплён',
    title: 'Клиент закрепляется по вашей ссылке',
    text: 'Поделитесь объектом персональной ссылкой или QR на показе. Клиент открывает — и закрепляется за вами. Авторство сохраняется в сделке.',
    panel: <ShareInviteScreen />,
  },
  {
    id: 'workspace',
    kicker: 'Шаг 04 · Работа',
    title: 'Ведите клиента в совместном пространстве',
    text: 'Закреплённые объекты, переписка, напоминания и этапы сделки — в одном рабочем пространстве по каждому клиенту.',
    panel: <WorkspaceScreen />,
  },
  {
    id: 'deal',
    kicker: 'Шаг 05 · Сделка',
    title: 'Сделка с сохранённым авторством',
    text: 'Ведите сделку по этапам. Авторство закреплено — спор «чей клиент» закрыт до его начала.',
    panel: <DealScreen />,
  },
  {
    id: 'bonus',
    kicker: 'Шаг 06 · Бонусы',
    title: 'Прозрачные бонусы за приведённого клиента',
    text: 'Бонус привязан к сделке и считается прозрачно. Партнёрские сертификаты и акции видны по каждому объекту.',
    panel: <RewardsScreen />,
  },
]

function AgencyFinale() {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_minmax(340px,0.8fr)] lg:items-center">
        <Reveal>
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">Агентствам</span>
          <h2 className="section-title mt-6 max-w-2xl">Руководите агентством?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Соберите команду в приложении: сотрудники и роли, ответственные за объекты, статистика по объявлениям и сделкам. Подключим агентство и его объекты к «БАСТ».
          </p>
          <div className="mt-8">
            <HomeButton href="mailto:partners@bast-estate.ru" variant="light">
              Подключить агентство
            </HomeButton>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="justify-self-center">
          <TeamScreen />
        </Reveal>
      </div>
    </section>
  )
}

/** Конвейер риэлтора: путь от заявки до бонусов + финал для агентств. */
export function RealtorsPage() {
  return (
    <RolePipelinePage
      eyebrow="Риэлторам"
      title={<>Ведите клиентов и сделки<span className="block text-app-dark-caption">с телефона</span></>}
      subtitle="Клиент закреплён за вами, авторство сохраняется в сделке, бонусы считаются прозрачно — весь путь риэлтора в приложении."
      intro="Скрольте — путь риэлтора: от заявки стать риэлтором до прозрачных бонусов за приведённого клиента."
      stages={stages}
      finale={<AgencyFinale />}
    />
  )
}
```

Примечание: `HomeButton` рендерит `<a href>` (роль link); `variant="light"` даёт белую кнопку с графитовым текстом — видима на `bg-graphite-deep` (как App Store-кнопки в hero покупателя). `mailto:` в `href` работает без `external`.

- [ ] **Step 4: Добавить маршрут и ссылку**

Создать `src/app/realtors/page.tsx`:

```tsx
import { RealtorsPage } from '@/components/realtors/RealtorsPage'

export const metadata = {
  title: 'Риэлторам — вести клиентов и сделки в приложении БАСТ',
  description:
    'Путь риэлтора в «БАСТ»: заявка, каталог застройщиков, закрепление клиента по ссылке, совместное пространство, сделка с сохранённым авторством и прозрачные бонусы.',
}

export default function Page() {
  return <RealtorsPage />
}
```

В `src/lib/site.ts` в объект `siteLinks` добавить строку (рядом с `agencies`):

```ts
realtors: '/realtors',
```

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное; маршрут `/realtors` в списке сборки.

- [ ] **Step 6: Commit**

```bash
git add src/components/realtors/ src/app/realtors/page.tsx src/lib/site.ts
git commit -m "feat(realtors): конвейер риэлтора /realtors на RolePipelinePage"
```

---

### Task 3: Верификация конвейера

**Files:**
- Test: без правок кода, если проверки чисты.

**Interfaces:**
- Consumes: результаты Task 1–2.
- Produces: подтверждённый конвейер риэлтора; база для планов остальных конвейеров и свитчера.

- [ ] **Step 1: Полный прогон + палитра**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

Run: `grep -rnE "clay-|pine-|limestone-|sage-|mist-" src/components/realtors/ src/components/pipeline/RolePipelinePage.tsx`
Expected: пусто.

- [ ] **Step 2: Смоук /realtors (оркестратор — скриншот)**

`npm run dev` (в фоне), открыть `/realtors`: графитовый hero «Ведите клиентов и сделки», шесть стадий со sticky-панелями (профиль → каталог → шаринг → workspace → сделка → бонусы), крослейд панели при скролле, финал «Руководите агентством?» с TeamScreen и CTA. Мобайл: панели инлайн. Остановить сервер.

- [ ] **Step 3: Финальный коммит (если были правки)**

```bash
git status
# если чисто — конвейер риэлтора готов
```

---

## Что дальше (отдельные планы)

1. **Конвейер застройщика** `/developers` — пересборка на RolePipelinePage (создание объявления, пакетная акция, команда, обращения, сделка, статистика).
2. **Конвейер инвестора** `/investors` — пересборка; здесь `StickyPipeline` эволюционирует на grid-стек + `caption`-проп (панели-карточки переменной высоты).
3. **Ролевой свитчер + редиректы + вход покупателя** — свитчер в шапке (Покупателям/Риэлторам/Застройщикам/Инвесторам), редиректы `/buyers`→`/`, `/agencies`→`/realtors`, `/how-it-works`→`/`, `/product`→`/`, новая стадия входа покупателя на `/`. Атомарно, когда все четыре конвейера существуют.
