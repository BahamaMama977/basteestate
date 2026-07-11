# Конвейер застройщика /developers — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать `/developers` из классических секций (легаси-палитра pine/limestone/clay) в ролевой конвейер на `RolePipelinePage`: шесть стадий пути застройщика от создания объявления до широкого канала сбыта + финал «Подключите объекты к „БАСТ“» с честной строкой про Удмуртию.

**Architecture:** `DevelopersPage` — конфиг для `RolePipelinePage` (как `RealtorsPage`): массив из шести `PipelineStage` (текст + панель-экран) + финал. Все шесть панелей — существующие экраны `@/components/app-screens`: `CreateListingScreen`, `SharesApplyScreen`, `TeamScreen`, `DeveloperCrmScreen`, `DealScreen`, `ListingStatsScreen`. Старые секции (`DeveloperHero`, `CatalogSection`, `RequestsSection`, `SharesSection`, `BastProgramSection`, `FunnelSection`, `ScreenshotsSection`, `DeveloperFaqSection`, `DeveloperCtaSection`) удаляются — их смысл переносится в стадии и финал.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (раздел «Конвейер застройщика»).
**Образец:** `src/components/realtors/RealtorsPage.tsx` (конвейер риэлтора, план 2026-07-11-pipeline-shell-realtors).
**Правки заказчика:** `pravki.md` — «широкий канал сбыта» (застройщик заперт в базе одного-двух риэлторов; на платформе все риэлторы видят объявления, условия партнёрства заданы заранее), «отображение всех акций», «авторство сделки — риэлтора не выкинут».

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Демо-данные только из канона (`src/lib/demo-deal.ts`); панели — существующие экраны, новых экранов не создаём.
- Антиква (`display-title`) — только H1 hero (рендерит `RolePipelinePage`) и H2 финала (`section-title`); заголовки стадий — гротеск (рендерит `StickyPipeline`).
- Палитра: hero/финал — `bg-graphite-deep` + `app-dark.*`; секция стадий — `bg-paper`. Легаси (`clay/pine/limestone/sage/mist`) запрещены — после пересборки в файле не должно быть ни одного вхождения.
- `StickyPipeline` и `RolePipelinePage` в этом плане НЕ меняются (панели застройщика — телефон-экраны равной высоты). Grid-стек и `caption`-проп — в плане инвестора.
- Русские тексты: «ёлочки», тире «—» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Конвейер застройщика /developers

**Files:**
- Rewrite: `src/components/developers/DevelopersPage.tsx`
- Create: `src/components/developers/__tests__/DevelopersPage.test.tsx`
- Modify: `src/app/developers/page.tsx` (метаданные под конвейер)

**Interfaces:**
- Consumes: `RolePipelinePage`, экраны `CreateListingScreen`/`SharesApplyScreen`/`TeamScreen`/`DeveloperCrmScreen`/`DealScreen`/`ListingStatsScreen`, `HomeButton`, `Reveal`.
- Produces: `DevelopersPage()` — шесть стадий пути застройщика + финал подключения объектов.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/developers/__tests__/DevelopersPage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DevelopersPage } from '@/components/developers/DevelopersPage'

describe('DevelopersPage', () => {
  it('hero и шесть стадий пути застройщика', () => {
    render(<DevelopersPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const label of [/Шаг 01/, /Шаг 02/, /Шаг 03/, /Шаг 04/, /Шаг 05/, /Шаг 06/]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('стадия-дифференциатор: акция применяется пакетно', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Одна акция — сразу на несколько объявлений')).toBeInTheDocument()
  })

  it('стадия канала сбыта: все риэлторы платформы', () => {
    render(<DevelopersPage />)
    expect(screen.getByText('Ваши объекты продают все риэлторы платформы')).toBeInTheDocument()
  })

  it('финал «Подключите объекты» с CTA и строкой про Удмуртию', () => {
    render(<DevelopersPage />)
    expect(screen.getByText(/Подключите объекты/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Обсудить подключение/ })).toBeInTheDocument()
    expect(screen.getByText(/Удмуртии/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test -- DevelopersPage`
Expected: FAIL — старая `DevelopersPage` не содержит стадий и новых текстов.

- [ ] **Step 3: Переписать страницу**

```tsx
// src/components/developers/DevelopersPage.tsx
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  CreateListingScreen,
  DealScreen,
  DeveloperCrmScreen,
  ListingStatsScreen,
  SharesApplyScreen,
  TeamScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'

const developerHref = 'mailto:partners@bast-estate.ru?subject=Подключение объектов к БАСТ'

const stages: PipelineStage[] = [
  {
    id: 'listing',
    kicker: 'Шаг 01 · Каталог',
    title: 'Опубликуйте готовый дом или подряд',
    text: 'Мастер ведёт по шагам: характеристики, фото, планировки и 3D, материалы стен для подряда. Черновик сохраняется сам.',
    panel: <CreateListingScreen />,
  },
  {
    id: 'promo',
    kicker: 'Шаг 02 · Акции',
    title: 'Одна акция — сразу на несколько объявлений',
    text: 'Создайте акцию — скидку или подарок — и примените её сразу к нескольким объектам. Покупатель и риэлтор видят её в карточке ещё до сделки.',
    panel: <SharesApplyScreen />,
  },
  {
    id: 'team',
    kicker: 'Шаг 03 · Команда',
    title: 'Соберите отдел продаж в приложении',
    text: 'Пригласите сотрудников, назначьте владельца объявления и контактное лицо — обращение приходит тому, кто за объект отвечает.',
    panel: <TeamScreen />,
  },
  {
    id: 'requests',
    kicker: 'Шаг 04 · Обращения',
    title: 'Вопрос приходит прямо из карточки объекта',
    text: 'Сразу видно, о каком доме речь и кто смотрел объект. Ответственный ведёт диалог в чате с полной историей.',
    panel: <DeveloperCrmScreen />,
  },
  {
    id: 'deal',
    kicker: 'Шаг 05 · Сделка',
    title: 'Доведите сделку до договора',
    text: 'Этапы, участники и документы — в одной сделке. Авторство риэлтора закреплено: спор «чей клиент» закрыт до его начала.',
    panel: <DealScreen />,
  },
  {
    id: 'channel',
    kicker: 'Шаг 06 · Канал сбыта',
    title: 'Ваши объекты продают все риэлторы платформы',
    text: 'Не один-два партнёра, а все риэлторы «БАСТ»: они видят объявление и берут его в работу без предварительной договорённости — условия партнёрства и вознаграждение заданы в объявлении заранее. Просмотры, закрепления и репосты видны по каждому объекту.',
    panel: <ListingStatsScreen />,
  },
]

function ConnectFinale() {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">Партнёрство</span>
          <h2 className="section-title mt-6">Подключите объекты к «БАСТ»</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Расскажем, как опубликовать готовые дома и подряды,設 настроить акции и открыть объекты риэлторам платформы.
          </p>
          <div className="mt-8">
            <HomeButton href={developerHref} variant="light" external>
              Обсудить подключение
            </HomeButton>
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-app-dark-caption">
            Сейчас объекты представлены в Удмуртии — платформа расширяется по регионам.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/** Конвейер застройщика: путь от публикации объявления до широкого канала сбыта. */
export function DevelopersPage() {
  return (
    <RolePipelinePage
      eyebrow="Застройщикам"
      title={<>Продавайте объекты<span className="block text-app-dark-caption">не одним риэлтором, а всеми</span></>}
      subtitle="Опубликуйте дома и подряды, задайте акции и вознаграждение — и объекты берут в работу все риэлторы платформы. Обращения, команда и сделки — в одном приложении."
      intro="Скрольте — путь застройщика: от публикации объявления до широкого канала сбыта."
      stages={stages}
      finale={<ConnectFinale />}
    />
  )
}
```

(Опечатку `設` в тексте финала не переносить — это артефакт черновика; строка звучит: «Расскажем, как опубликовать готовые дома и подряды, настроить акции и открыть объекты риэлторам платформы.»)

- [ ] **Step 4: Обновить метаданные маршрута**

`src/app/developers/page.tsx` — description под конвейер:

```tsx
export const metadata = {
  title: 'Застройщикам — публикация объектов и канал сбыта в приложении БАСТ',
  description:
    'Путь застройщика в «БАСТ»: публикация готовых домов и подрядов, акции пакетно, команда, обращения из карточки, сделка с сохранённым авторством и объекты, открытые всем риэлторам платформы.',
}
```

- [ ] **Step 5: Проверки**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

Run: `grep -rnE "clay-|pine-|limestone-|sage-|mist-" src/components/developers/`
Expected: пусто.

- [ ] **Step 6: Commit**

```bash
git add src/components/developers/ src/app/developers/page.tsx
git commit -m "feat(developers): конвейер застройщика /developers на RolePipelinePage"
```

---

### Task 2: Верификация конвейера

**Files:**
- Test: без правок кода, если проверки чисты.

**Interfaces:**
- Consumes: результат Task 1.
- Produces: подтверждённый конвейер застройщика; остаются план инвестора и план свитчера.

- [ ] **Step 1: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное; маршрут `/developers` в списке сборки.

- [ ] **Step 2: Смоук /developers (скриншот)**

`npm run dev` (в фоне), открыть `/developers`: графитовый hero, шесть стадий со sticky-панелями (мастер → акции пакетно → команда → обращения → сделка → статистика), крослейд панели при скролле, финал «Подключите объекты к „БАСТ“» с CTA и строкой про Удмуртию. Мобайл: панели инлайн. Остановить сервер.

- [ ] **Step 3: Финальный коммит (если были правки)**

---

## Что дальше (отдельные планы)

1. **Конвейер инвестора** `/investors` — пересборка; `StickyPipeline` эволюционирует на grid-стек + `caption`-проп (панели-карточки переменной высоты). Плюс правки из `pravki.md`: смягчить hero, добавить рекламу и партнёрство с банками.
2. **Ролевой свитчер + редиректы + вход покупателя** — свитчер в шапке, редиректы `/buyers`→`/`, `/agencies`→`/realtors`, `/how-it-works`→`/`, `/product`→`/`, новая стадия входа покупателя на `/`. Атомарно, когда все четыре конвейера существуют.
3. **Правки покупателя из `pravki.md`** — сертификаты и акции застройщика на главной, бесплатное сопровождение сделки, проверка объектов.
