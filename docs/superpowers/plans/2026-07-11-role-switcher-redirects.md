# Ролевой свитчер и редиректы — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Связать четыре готовых конвейера (`/`, `/realtors`, `/developers`, `/investors`) постоянным ролевым свитчером в шапке и убрать дубли: `/buyers` → `/`, `/agencies` → `/realtors`, `/product` → `/`.

**Architecture:** `RoleSwitcher` — сегмент-контрол в шапке (клиентский компонент, активная роль по `usePathname()`); главное меню = четыре роли, вторичная навигация («Как проходит сделка», «О БАСТ») уходит из главного меню в футер. Редиректы — тем же паттерном, что уже применён на `/product`: static export не даёт серверный `redirect()`, поэтому `<meta http-equiv="refresh">` + видимая фолбэк-ссылка. Компоненты `BuyersPage` и `AgenciesPage` удаляются вместе с тестами: их контент теперь живёт в конвейерах покупателя и риэлтора.

**Решение владельца (этой сессии):** `/how-it-works` **остаётся страницей** (покадровая демонстрация сделки) и не редиректится, пока на главную не придёт стадия входа покупателя. Из главного меню он уходит, но остаётся в футере. Это отступление от спеки зафиксировано намеренно — чтобы не терять контент.

**Tech Stack:** Next.js 14 (static export, `trailingSlash: true`), React 18, TypeScript, Tailwind, vitest + RTL.

**Спека:** `docs/superpowers/specs/2026-07-10-bast-role-pipelines-design.md` (раздел «Структура и навигация»).

## Global Constraints

- Рабочая директория: `/Users/romanmensikov/basteestate/project`.
- Свитчер **не меняет высоту шапки** (`h-16`): `sticky top-24` панелей конвейеров завязан на неё — иначе панели подрежутся.
- Прямые ссылки и SEO сохраняются: переключение роли — обычная навигация `<a href>`, не клиентский стейт.
- Редиректы ведут на trailing-slash URL (`/realtors/`), как требует `trailingSlash: true`.
- Ни одной ссылки на страницу-редирект внутри сайта не остаётся (иначе клик ведёт в «переезд»).
- В коммитах не добавлять Co-Authored-By (правило этой ветки).

---

### Task 1: Роли в навигации (site.ts) и RoleSwitcher в шапке

**Files:**
- Modify: `src/lib/site.ts` (`roleItems`, `secondaryItems` вместо `navItems`)
- Create: `src/components/RoleSwitcher.tsx`
- Create: `src/components/__tests__/RoleSwitcher.test.tsx`
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Produces: `roleItems` — [Покупателям `/`, Риэлторам `/realtors`, Застройщикам `/developers`, Инвесторам `/investors`]; `secondaryItems` — [Как проходит сделка, О БАСТ].
- Produces: `RoleSwitcher()` — сегмент-контрол; активная роль по `usePathname()`, помечена `aria-current="page"`.

- [ ] **Step 1: Падающий тест**

```tsx
// src/components/__tests__/RoleSwitcher.test.tsx — активная роль подсвечена и помечена aria-current
```
Мокать `next/navigation`: `vi.mock('next/navigation', () => ({ usePathname: () => '/realtors/' }))`.
Проверить: четыре ссылки ролей; у «Риэлторам» `aria-current="page"`, у остальных — нет; «Покупателям» ведёт на `/`.

- [ ] **Step 2: Убедиться, что тест падает** (`npm test -- RoleSwitcher`).

- [ ] **Step 3: Реализовать `RoleSwitcher`** — `'use client'`, `usePathname()`, активная роль: точное совпадение для `/`, `startsWith` для остальных. Высота — вписывается в `h-16` шапки.

- [ ] **Step 4: Встроить в Header** — свитчер вместо `navItems` на десктопе; в мобильном меню — роли крупно + вторичные ссылки мелко.

- [ ] **Step 5: Проверки** — `npm test && npm run type-check && npm run lint`.

- [ ] **Step 6: Commit** — `feat(nav): ролевой свитчер в шапке`.

---

### Task 2: Редиректы /buyers, /agencies, /product и уборка ссылок

**Files:**
- Rewrite: `src/app/buyers/page.tsx` (редирект на `/`)
- Rewrite: `src/app/agencies/page.tsx` (редирект на `/realtors/`)
- Modify: `src/app/product/page.tsx` (цель редиректа — `/`, а не `/how-it-works/`)
- Delete: `src/components/buyers/`, `src/components/agencies/` (вместе с тестами)
- Modify: `src/components/Footer.tsx` (ссылки на живые URL)
- Modify: `src/components/home/HomePage.tsx` («Открыть объекты» → App Store), `src/components/home/sections/CrmIntermezzoSection.tsx` (`agencies` → `realtors`)
- Modify: `src/lib/site.ts` (легаси-URL помечены как редиректы)

- [ ] **Step 1: Тест-контроль** — после уборки в `src` не остаётся ссылок на `/buyers`, `/agencies`, `/product`:

```bash
grep -rn "siteLinks.buyers\|siteLinks.agencies\|siteLinks.product\|href=\"/buyers\|href=\"/agencies" src --include=*.tsx | grep -v "app/buyers\|app/agencies\|app/product"
```
Expected после Task 2: пусто.

- [ ] **Step 2: Страницы-редиректы** — паттерн `/product`: `<meta httpEquiv="refresh" content="0;url=/realtors/" />` + фолбэк-ссылка на случай отключённого refresh.

- [ ] **Step 3: Удалить `BuyersPage`/`AgenciesPage` и их тесты** — контент поглощён конвейерами.

- [ ] **Step 4: Починить ссылки** — футер: «Покупателям» → `/`, «Риэлторам» → `/realtors`, «Возможности платформы» убрать; главная: «Открыть объекты» → App Store; CRM-интермедия → `/realtors`.

- [ ] **Step 5: Проверки** — `npm test && npm run type-check && npm run lint && npm run build`; в списке сборки остаются `/buyers`, `/agencies`, `/product` как страницы-редиректы.

- [ ] **Step 6: Commit** — `feat(nav): редиректы /buyers, /agencies, /product на живые конвейеры`.

---

### Task 3: Верификация

- [ ] **Step 1:** Полный прогон: `npm test && npm run type-check && npm run lint && npm run build`.
- [ ] **Step 2:** Смоук: с каждой из четырёх страниц свитчер виден, активная роль подсвечена, переход в один клик; высота шапки не изменилась (панели конвейеров не подрезаны); `/buyers/`, `/agencies/`, `/product/` уводят на живые страницы.
- [ ] **Step 3:** Мобильное меню: четыре роли + вторичные ссылки.

---

## Что дальше (отдельные планы)

1. **Стадия входа покупателя на `/`** (`ReferralAcceptScreen`) — после неё `/how-it-works` → `/`, как требует спека.
2. **Правки покупателя из `pravki.md`** — сертификаты и акции застройщика, бесплатное сопровождение сделки, проверка объектов.
