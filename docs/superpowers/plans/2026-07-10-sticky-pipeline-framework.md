# Каркас StickyPipeline (моушен-корректный) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Извлечь sticky-хореографию DealActsSection в переиспользуемый компонент `StickyPipeline`, исправив её моушен по ревью review-animations (прерываемый крослейд вместо keyframe-remount; только transform/opacity), и перевести главную на каркас без визуальной регрессии панели. Плюс починить `Reveal`.

**Architecture:** `StickyPipeline` принимает массив стадий `{ id, kicker, title, text, panel, extras? }`, рендерит текстовую колонку + sticky-панель. Смена панели — крослейд стека абсолютных слоёв (все смонтированы, переключение ретаргетит CSS-`transition` от текущего состояния → прерываемо). Мобайл — панели инлайн. DealActsSection становится первым потребителем каркаса. Каркас — фундамент для будущих четырёх ролевых конвейеров.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, framer-motion (Reveal), vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (раздел «Ограничения каркаса по моушену»).
**Ревью-скилл:** `review-animations` (`~/.agents/skills/review-animations/`, STANDARDS.md) — гейт на моушен-задачах.

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- **Моушен: только `transform` и `opacity`.** Никаких `filter: blur`, layout-свойств, keyframe-remount по `key` на скролл-переключаемых элементах.
- Смена sticky-панели — прерываемым CSS-`transition` (крослейд), не keyframe.
- Кривая перехода — `cubic-bezier(0.32, 0.72, 0, 1)`; длительность крослейда 260ms.
- Анимации под `motion-safe:`; reduced-motion → мгновенная смена панели (opacity toggи без движения), деградация допустима.
- Демо-данные только из канона `src/lib/demo-deal.ts`.
- Существующие тесты DealActsSection — регресс-контроль: должны остаться зелёными.
- Русские тексты: «ёлочки», тире «—» (ru-text).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Починить Reveal (GPU + живой reveal + reduced-motion)

**Files:**
- Modify: `src/components/home/Reveal.tsx`

**Interfaces:**
- Consumes: framer-motion, `cn`.
- Produces: `Reveal({ children, className?, delay? })` — реальный fade-up-on-scroll (only transform/opacity, без blur), reduced-motion сохраняет opacity-фейд без движения.

Причина (ревью review-animations): текущий `initial={false}` без скрытого состояния → анимация мёртвая (ничего не reveal-ит); `filter: blur` — дорогое paint-свойство; `duration: 0.9` вяло. Правка делает reveal живым и GPU-чистым.

- [ ] **Step 1: Переписать Reveal**

Заменить содержимое `src/components/home/Reveal.tsx`:

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Fade-up при появлении в вьюпорте. Только transform/opacity; reduced-motion — только opacity. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.32, 0.72, 0, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Проверки**

Run: `npm test && npm run type-check && npm run lint`
Expected: всё зелёное (тесты проверяют присутствие в DOM, не видимость — opacity:0 в jsdom не прячет от Testing Library; IntersectionObserver застаблен).

- [ ] **Step 3: Визуальный смоук (контролируется оркестратором скриншотами после задачи)**

Note: правка делает Reveal живым по всему сайту (раньше был no-op) — контент теперь fade-up-ит на скролле. Это намеренное улучшение, проверяется скриншотами; при неприятии — тривиальный откат.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/Reveal.tsx
git commit -m "fix(motion): Reveal — живой fade-up, только transform/opacity, reduced-motion"
```

---

### Task 2: Компонент StickyPipeline (прерываемый крослейд)

**Files:**
- Create: `src/components/pipeline/StickyPipeline.tsx`
- Create: `src/components/pipeline/__tests__/StickyPipeline.test.tsx`

**Interfaces:**
- Consumes: React-хуки, IntersectionObserver (застаблен в тестах).
- Produces:
  - `type PipelineStage = { id: string; kicker: string; title: string; text: string; panel: ReactNode; extras?: ReactNode }`
  - `StickyPipeline({ stages: PipelineStage[] })` — текст-колонка + sticky-панель; десктоп крослейд, мобайл инлайн. На эти имена опираются планы конвейеров.

Ограничение высоты: все панели одной высоты (телефон-экраны). Невидимый сайзер = `stages[0].panel` задаёт высоту контейнера; крослейд-слои `absolute inset-0`. Панели переменной высоты (инвест-карточки) — задача будущего плана, здесь не требуется.

- [ ] **Step 1: Написать падающий тест**

```tsx
// src/components/pipeline/__tests__/StickyPipeline.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  { id: 'a', kicker: 'Шаг 01 · Один', title: 'Заголовок один', text: 'Текст один', panel: <div>ПАНЕЛЬ-A</div> },
  { id: 'b', kicker: 'Шаг 02 · Два', title: 'Заголовок два', text: 'Текст два', panel: <div>ПАНЕЛЬ-B</div>, extras: <div>ЭКСТРА-B</div> },
]

describe('StickyPipeline', () => {
  it('рендерит все стадии: kicker, title, text', () => {
    render(<StickyPipeline stages={stages} />)
    expect(screen.getByText('Шаг 01 · Один')).toBeInTheDocument()
    expect(screen.getByText('Заголовок два')).toBeInTheDocument()
    expect(screen.getByText('Текст один')).toBeInTheDocument()
  })

  it('extras стадии рендерятся', () => {
    render(<StickyPipeline stages={stages} />)
    expect(screen.getByText('ЭКСТРА-B')).toBeInTheDocument()
  })

  it('панели присутствуют (мобильный инлайн + десктоп-крослейд + сайзер)', () => {
    render(<StickyPipeline stages={stages} />)
    // панель A: мобайл(1) + крослейд(1) + сайзер(stages[0]=A, 1) = 3
    expect(screen.getAllByText('ПАНЕЛЬ-A').length).toBeGreaterThanOrEqual(2)
    // панель B: мобайл(1) + крослейд(1) = 2
    expect(screen.getAllByText('ПАНЕЛЬ-B').length).toBeGreaterThanOrEqual(2)
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test`
Expected: FAIL — модуль `@/components/pipeline/StickyPipeline` не существует.

- [ ] **Step 3: Создать StickyPipeline**

```tsx
// src/components/pipeline/StickyPipeline.tsx
'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type PipelineStage = {
  id: string
  kicker: string
  title: string
  text: string
  panel: ReactNode
  extras?: ReactNode
}

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * Sticky-хореография ролевого конвейера. Текст стадий слева, sticky-панель справа.
 * Смена панели — прерываемый крослейд (все слои смонтированы, переключение
 * ретаргетит CSS-transition от текущего состояния; только opacity/transform).
 */
export function StickyPipeline({ stages }: { stages: PipelineStage[] }) {
  const [activeId, setActiveId] = useState(stages[0].id)
  const blockRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.stage
            if (id) setActiveId(id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blockRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_minmax(360px,0.9fr)]">
      {/* Текст стадий */}
      <div className="space-y-24 lg:space-y-[42vh]">
        {stages.map((stage) => (
          <article
            key={stage.id}
            data-stage={stage.id}
            ref={(el) => {
              if (el) blockRefs.current.set(stage.id, el)
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-app-brand">{stage.kicker}</p>
            <h3 className="section-heading mt-4">{stage.title}</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-graphite/70">{stage.text}</p>
            {stage.extras}

            {/* Мобильный кадр */}
            <div className="mt-8 lg:hidden">
              {stage.panel}
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/50">
                Экран приложения · демо-данные
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Sticky-панель: прерываемый крослейд, только opacity/transform */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative">
            {/* Сайзер задаёт высоту (все панели одной высоты) */}
            <div className="invisible" aria-hidden="true">
              {stages[0].panel}
            </div>
            {stages.map((stage) => {
              const active = stage.id === activeId
              return (
                <div
                  key={stage.id}
                  className="absolute inset-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[260ms]"
                  style={{
                    transitionTimingFunction: EASE,
                    opacity: active ? 1 : 0,
                    transform: active ? 'none' : 'translateY(8px) scale(0.99)',
                    pointerEvents: active ? 'auto' : 'none',
                  }}
                >
                  {stage.panel}
                </div>
              )
            })}
            <p className="absolute inset-x-0 top-full mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/50">
              Живой экран приложения
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Убедиться, что тесты проходят**

Run: `npm test && npm run type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/pipeline/StickyPipeline.tsx src/components/pipeline/__tests__/StickyPipeline.test.tsx
git commit -m "feat(pipeline): StickyPipeline — прерываемый крослейд, только opacity/transform"
```

---

### Task 3: Перевести DealActsSection на StickyPipeline

**Files:**
- Modify: `src/components/home/sections/DealActsSection.tsx`
- Modify: `tailwind.config.ts` (удалить неиспользуемую animation `act-in`)
- Modify: `src/app/globals.css` (удалить неиспользуемый `@keyframes act-in`)

**Interfaces:**
- Consumes: `StickyPipeline`, `PipelineStage`, канон `acts`/`verification`.
- Produces: DealActsSection на каркасе; визуально панель ведёт себя как крослейд (не keyframe). Существующие тесты DealActsSection — зелёные (регресс).

- [ ] **Step 1: Переписать DealActsSection**

Заменить содержимое `src/components/home/sections/DealActsSection.tsx`:

```tsx
import { Check } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'
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

function screenFor(act: DealAct) {
  return act.screen === 'chat' ? <ChatScreen act={act} /> : <DealScreen act={act} />
}

function VerificationChecklist({ act }: { act: DealAct }) {
  return (
    <ul className="mt-6 max-w-md divide-y divide-graphite/10 rounded-2xl border border-graphite/10 bg-white">
      {verification.map((v, i) => (
        <li key={v.key} className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium">{v.label}</p>
            <p className="text-xs text-graphite/55">{v.caption}</p>
          </div>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-app-brand-soft text-app-brand ${
              i < act.verifiedCount ? '' : 'opacity-25'
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Акты 2–5 на каркасе StickyPipeline. */
export function DealActsSection() {
  const stages: PipelineStage[] = acts.slice(1).map((act) => {
    const copy = actCopy[act.key]
    return {
      id: act.key,
      kicker: `Акт 0${act.id} · ${copy.kicker}`,
      title: copy.title,
      text: copy.text,
      panel: screenFor(act),
      extras: act.key === 'progress' ? <VerificationChecklist act={act} /> : undefined,
    }
  })

  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <Reveal>
          <span className="eyebrow bg-graphite text-paper">Одна сделка от начала до конца</span>
          <h2 className="section-heading mt-6 max-w-3xl">
            Скрольте — сделка идёт: от первого сообщения до подписанных документов
          </h2>
        </Reveal>

        <div className="mt-16">
          <StickyPipeline stages={stages} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Убедиться, что регресс-тесты зелёные**

Run: `npm test`
Expected: PASS — существующий `DealActsSection.test.tsx` проверяет `getAllByText(/Акт 0N/)`, чек-лист verification, `Этап 2 из 4`/`Этап 4 из 4` через `getAllByText(...).length >= 1`; каркас рендерит панели в мобайл-инлайн + крослейд-стек, копий стало больше — `>= 1` держится.

- [ ] **Step 3: Удалить неиспользуемый keyframe act-in**

Run: `grep -rn "animate-act-in\|act-in" src --include="*.tsx" --include="*.css"`
Expected: пусто (после Task 3 никто не использует). Если пусто:
- в `tailwind.config.ts` удалить строку `'act-in': 'act-in 0.36s …'` из `theme.extend.animation`;
- в `src/app/globals.css` удалить блок `@keyframes act-in { … }` (и комментарий над ним).

Если grep что-то находит — не удалять, зафиксировать в отчёте.

- [ ] **Step 4: Проверки**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/sections/DealActsSection.tsx tailwind.config.ts src/app/globals.css
git commit -m "refactor(home): DealActsSection на StickyPipeline; ретайр keyframe act-in"
```

---

### Task 4: Гейт review-animations и верификация

**Files:**
- Test: моушен-код каркаса (без правок кода, если гейт чист).

**Interfaces:**
- Consumes: результаты Task 1–3.
- Produces: подтверждённый моушен-корректный каркас; база для планов конвейеров.

- [ ] **Step 1: Прогон review-animations по новому моушену**

Применить скилл `~/.agents/skills/review-animations/SKILL.md` (+ STANDARDS.md) к диффу задач 1–3: `StickyPipeline.tsx`, `Reveal.tsx`, `DealActsSection.tsx`. Проверить по стандартам:
- смена панели — CSS-transition (крослейд), не keyframe-remount → **Standard 6 закрыт**;
- анимируются только `opacity`/`transform`, без `filter/blur/layout` → **Standard 7**;
- reduced-motion (panel snap; Reveal — opacity-фейд) → **Standard 8**;
- крослейд 260ms < 300ms, кривая сильная → **Standard 3–4**.

Записать вердикт (Block/Approve) в отчёт. При Block-находках — фикс-задача, затем повтор.

- [ ] **Step 2: Полный прогон**

Run: `npm test && npm run type-check && npm run lint && npm run build`
Expected: всё зелёное.

- [ ] **Step 3: Скриншот-смоук (оркестратор)**

`npm run dev` (в фоне), проверить главную на 1440: sticky-панель крослейдит между актами при скролле (не «моргает» с нуля), чек-лист акта 4 на месте; Reveal fade-up работает. Мобайл 390: панели инлайн. Остановить сервер.

- [ ] **Step 4: Финальный коммит (если были правки)**

```bash
git status
# если чисто — каркас готов
```

---

## Что дальше (отдельные планы)

1. **Новые экраны + канон** — 8 HTML-копий (приглашение, онбординг риэлтора, шаринг реф-ссылки, Workspace, бонусы, создание объявления, пакетная акция, команда/статистика) + расширение канона.
2. **Четыре конвейера + ролевой свитчер + редиректы** — страницы /realtors, пересборка /developers и /investors на StickyPipeline, новая стадия входа покупателя на `/`; свитчер в шапке и редиректы `/buyers`→`/`, `/agencies`→`/realtors`, `/how-it-works`→`/`, `/product`→`/` подключаются атомарно, когда целевые страницы существуют (никаких битых ссылок в static export).
