# SDD Progress: content-b2b

Plan: docs/superpowers/plans/2026-07-06-bast-content-b2b.md
Branch: feature/content-b2b

Task 1: complete (commit c2f1378, review clean, visual OK)
Task 2: complete (commit 9bc5c74, review clean, visual OK)
Task 3: complete (commit d3d0897, review clean, visual OK)
  Minor (final-review): icon tuple double-cast (label as string / Icon as typeof) — inherited from plan code, tsc clean
Task 4: complete (commit ba7ce7d, review clean, visual OK)
Polish: complete (commit addaaac) — final-review Minors applied (инвайт-код, BAST subject); icon-cast Minor left per review
Final review: ready to merge, no blockers

## Mini-project: /investors (plan 2026-07-07)
Base: addaaac
inv-Task 1: complete (commit 6eda5ac, review clean, visual OK, zero metrics verified)
inv-Task 2: complete (commit 7ebcba4, review clean, visual OK, zero metrics verified)
inv-Task 3: complete (commit fdccd89, review clean, nav 6 items fit, footer link OK)
inv-Polish: complete (commit 4eed1d6) — final-review Minor applied (бренд в ёлочках)
Final review /investors: ready to merge, no blockers

## Проект: фундамент «Живой сделки» (план 2026-07-10)
Plan: docs/superpowers/plans/2026-07-10-live-deal-foundation.md
Base: 19b1288
Task 1: complete (commits 19b1288..75c3219, review clean)
  Minor (informational): lockfile in-range bumps попутно; __dirname в vitest.config хрупок при переходе на ESM
Task 2: complete (commits 75c3219..6b4f4ba, review clean)
  Minor (plan-mandated, для финального ревью): канон-массивы без as const/readonly; participants.realtor.phone стал optional
Task 3: complete (commits 6b4f4ba..fb105c1, review clean)
  Minor (plan-mandated, для финального ревью): as Record<string, any> в tokens.test; TypeError вместо assert-diff при отсутствии graphite
Task 4: complete (commits fb105c1..907f307, review clean)
  Minor (для финального ревью): TypeError вместо assert при отсутствии mono (из брифа); коммиты задач без Co-Authored-By (инструкция контроллера)
Task 5: complete (commits 907f307..aa275b7, review clean, visual OK скриншотами контроллера)
  Находка: lint никогда не работал — добавлены eslint@8 + eslint-config-next + .eslintrc.json, исходники чисты
  Для плана №2: DealScreen показывает «Этап 3 из 5», канон — 4 этапа; чат-экран приписывает реплики продавца риэлтору — экраны ещё не читают stages/acts из канона
Final review: ready to merge (19b1288..aa275b7); все 5 накопленных Minor — accepted с обоснованием
Деферал-лист для плана «Экраны-копии»:
  - расширить канон: кирпич/газ/2 санузла (спека) + данные чек-листа проверки
  - решить app.bg (#FFFFFF) vs canvas (#F7F8F5) для фона экранов
  - параметризация экранов актом: DealScreen «3 из 5»→канон, ChatScreen роли реплик, SearchScreen хардкоды
  - тайтл акта 4 «Договор готовится» совпадает с подписью этапа 3 — не спутать при вёрстке главной

## Проект: экраны-копии «Живой сделки» (план 2026-07-10-live-deal-screens)
Plan: docs/superpowers/plans/2026-07-10-live-deal-screens.md
Base: 0f06644
P2-Task 1: complete (commits 0f06644..9b61c53, review clean)
  Minor (для финального ревью): regexp /Готова / хрупок; otherObjects[0] и [1] делят одно фото hero-house.png (визуальный дубль)
P2-Task 2: complete (commits 9b61c53..3eeb8f9, review clean; отклонения oxc jsx runtime и afterEach(cleanup) обоснованы)
  Minor (для финального ревью): key={m.time} хрупок; мок next/image пропускает priority/placeholder на img
P2-Task 3: complete (commits 3eeb8f9..b458fbb, review clean)
  Minor (для финального ревью): #1042 захардкожен (бриф не предписывал); «Этап 0 из 4» латентен при completedStages=0 (акты 1–2 DealScreen не рендерят)
P2-Task 4: complete (commits b458fbb..98759e1, review clean; отклонение по типизации markerPositions обосновано)
  Minor (для финального ревью): позиции цен 9,4/15,2 на карте поменялись местами (из брифа); spread markerPositions[i] без защиты при росте otherObjects
P2-Task 5: complete (commits 98759e1..6e8b8ea, review clean)
  Minor (для финального ревью, тот же класс что и Task 3): «Этап 0 из 4» при completedStages=0; stages[stageIndex] = последний завершённый, не текущий
P2-Task 6: complete (commits 6e8b8ea..c8b190e, review clean)
  Minor (для финального ревью): сводка 3/1 захардкожена (допущено брифом); бейдж «Проверено» строкой при декларированном verification в Interfaces
P2-Task 7: complete (commits c8b190e..796e4fd, review clean; grep→очищенный текст обоснован)
  Minor (для финального ревью): якоря id на карточках витрины удалены; caniuse-lite устарел
Fix M1: complete (commit fd868e4 — инициалы риэлтора из канона; тесты 29/29) — ожидает подтверждения финального ревьюера
Final review P2: ready to merge (0f06644..fd868e4); M1 исправлена и подтверждена
Important-входы для плана «Главная» (не блокеры merge):
  - verification из канона не потребляется ни одним экраном; в DealAct нет поля прогресса чек-листа (акт 4 спеки без носителя)
  - проп act есть у 3 из 6 экранов (Chat, Deal, RealtorCrm); Search/Listing/DeveloperCrm статичны — контракт для «Главной»
  - showParticipants не используется — акт 3 «появляются участники» нечем включить
  - визуальные долги крупного плана: shortName продавца (трункация), нижняя треть RealtorCrm, третий фото-ассет

## Проект: главная «Живой сделки» (план 2026-07-10-live-deal-home)
Plan: docs/superpowers/plans/2026-07-10-live-deal-home.md
Base: 6f2d62e
P3-Task 1: complete (commits 6f2d62e..fd077ca, review clean, Minor нет)
P3-Task 2: complete (commits fd077ca..b8f5fe8, review clean; адаптация 2 тестов обоснована)
  Minor (для финального ревью): ChatScreen.test зеркалит shortName ?? name вместо литерала; дубль buyer на RealtorCrm (карточка + список)
P3-Task 3: complete (commits b8f5fe8..a8de63b, review clean; стаб IO в setup.tsx добавлен досрочно — обоснован)
P3-Task 4: complete (commits a8de63b..bf34e17, review clean)
  Minor (для финального ревью, из брифа): fill-mode both у чекмарков переопределит opacity-25 при verifiedCount<5; анимация чекмарков стартует при mount, не при входе во вьюпорт
P3-Task 5: complete (commits bf34e17..a84a10b, review clean)
  Minor (для финального ревью): HomeButton focus-visible ring-clay-500 — терракота проявляется на графите (pre-existing, side-quest на тёмный вариант фокуса)
P3-Task 6: complete (commits a84a10b..1664787, review clean)
P3-Task 7: complete (commits 1664787..eaa5f67 + fix def50da, review clean)
  Решение владельца плана: водяные знаки «18»/«?» — декоративные глифы, антиква допустима; «Удмуртия» переведена на гротеск (def50da)
  Minor (для финального ревью): тест композиции проверяет присутствие, не порядок; отсутствие проверено для 4 из 9 удалённых секций
P3-Task 8: complete (прогон зелёный: 46/46, lint/types/build, смоук 9/9; правок не потребовалось)
Final review P3: ready to merge (6f2d62e..def50da); визуальная приёмка контроллером пройдена (десктоп, живой скролл, мобайл)
Триаж Minor: 1,2,6 — accepted; 3 (чекмарки по вьюпорту), 4 (ring-clay в HomeButton), 5 (тест порядка) — в план «Страницы»
Обязательные входы плана «Страницы»:
  - водяные знаки font-display «18» (Geography) и «?» (FAQ) — принятое декоративное исключение: при зачистке антиквы НЕ трогать и НЕ тиражировать
  - ring-clay-500 в HomeButton → app-brand; .bezel/.bezel-core (limestone) — последние потребители легаси на главной
  - Header/Footer мигрируют на paper/graphite с проверкой на обоих регистрах
  - /how-it-works должен реально показывать акты покадрово до возврата CTA «Посмотреть этапы сделки» (критерий №5 спеки)
  - зафиксировать трактовку 80/20 как перечень тёмных секций (факт ≈55/45 по высоте с тёмным хвостом FAQ+CTA) — или осветлить FAQ
  - мобильный кадр акта 1 отсутствует (hero-экран hidden lg:block) — решить при полировке

## Проект: страницы «Живой сделки» (план 2026-07-10-live-deal-pages)
Plan: docs/superpowers/plans/2026-07-10-live-deal-pages.md
Base: aba5faf
P4-Task 1: complete (commits aba5faf..d09d7fd, review clean)
  Minor: misleading комментарий над secondary — группа удаляется в Task 8 вместе с ним
P4-Task 2: complete (commits d09d7fd..d610a51, review clean)
  Minor (для финального ревью): легаси-имена bg-clay-500/10 (HomeButton:41) и text-clay-400 (Header:36) — значения уже новые, имена добить follow-up'ом
P4-Task 3: complete (commits d610a51..9d173b4, review clean; /how-it-works — покадровая демонстрация)
P4-Task 4: complete (commits 9d173b4..2f52c6b, review clean)
  Minor: meta refresh в body (неконформный HTML, работает); HTTP-301 при желании на уровне хостинга
P4-Task 5: complete (commits 2f52c6b..4f1ab14, review clean)
  Minor (для финального ревью): FAQ-ответ /buyers рассинхронизирован с каноном по формулировке; хардкод index<3 в этапах рядом с dealStages.length-1
P4-Task 6: complete (commits 4f1ab14..5a90191, review clean, Minor нет)
P4-Task 7: complete (commits 5a90191..2907c70, review clean)
P4-Task 8: complete (commits 2907c70..3f3cc80+58516e9, review clean; смоук-гейт поймал и закрыл утечку старых hex в QR /buyers)
  Minor (follow-up): .paper-grid/.cadastral-grid — мёртвые утилиты со старой палитрой; hex в QR без комментария-привязки
Final review P4: ready to merge после фикса (aba5faf..4910301)
  Important исправлен: терракота в arbitrary-rgba glow карт /buyers и /agencies → золото (4910301)
  Главный триаж: ~35 raw font-display на карточках подстраниц + InternalPage + старые rgba в arbitrary-классах + мёртвый код src/components/sections и части ui — ОСОЗНАННЫЙ ДОЛГ, отдельный follow-up «типографический и токенный свип» с покадровой визуальной приёмкой (механический свип без глаз опасен)
  Критерии спеки: 1 выполнен (с оговоркой о рисованных иллюстрациях подстраниц), 2 выполнен, 3 выполнен, 4 частично (осознанно), 5 выполнен

## Проект: каркас StickyPipeline (план 2026-07-10-sticky-pipeline-framework)
Plan: docs/superpowers/plans/2026-07-10-sticky-pipeline-framework.md
Base: (HEAD после коммита плана)
Скиллы установлены: emilkowalski review-animations/apple-design/animation-vocabulary/emil-design-eng (~/.agents/skills, симлинки в ~/.claude/skills)
review-animations — гейт на моушен-задачах
SP-Task 1: complete (commits aa621fe..f6ef69a, review clean, motion gate ✓)
  Minor (follow-up): framer y-shorthand — main-thread под скроллом; spec-mandated, низкорисково (once/14px/0.5s)
SP-Task 2: complete (commits f6ef69a..5fc6ef6 + fix c6f608a, review clean, motion gate ✓)
  Important исправлен: inert на неактивных крослейд-слоях (a11y) + guard пустого stages
  Minor (для финального ревью): reduced-motion = мгновенная смена (спека допускает; идеал STANDARDS — короткий opacity-fade); blockRefs без cleanup (ок для статичных стадий); activeId переключение не покрыто юнит-тестом (IO застаблен)
SP-Task 3: complete (commits c6f608a..6710cfd, review clean; −49 строк, keyframe act-in ретайрен)
  Minor (для финального ревью): actCopy как Record<string,…> не ловит недостающий копирайт нового акта (унаследовано)
SP-Task 4: complete (гейт review-animations пройден; live-проверка: 4 слоя смонтированы, только opacity/transform, inert на неактивных; 57/57, build 18/18; скриншот — визуальный паритет)
Hardening (final review): commit f0b283c — IO-switch юнит-тест (58/58) + inert React-19 заметка
Final review каркаса: ready to merge (aa621fe..f0b283c); Critical/Important нет; motion gate Standard 6/7/8 Approve
Триаж Minor: 1(y-shorthand),4(IO-тест→сделан),5(actCopy Record) — follow-up; 2(reduced-motion snap),3(blockRefs cleanup) — accepted
Входы для планов конвейеров (в спеке): grid-стек под переменную высоту инвест-панелей; caption в пропы; sticky top-24 vs свитчер; пейсинг 42vh проп; React-19 inert; DOM-вес панелей ×2
Имя каркаса синхронизировано в спеке: StickyPipeline (не RolePipeline)

## Проект: новые экраны часть 1 (план 2026-07-10-new-screens-part1)
Plan: docs/superpowers/plans/2026-07-10-new-screens-part1.md
Base: d26806e
NS1-Task 1: complete (commit a01ce07, канон +referral/realtorStats/bonuses/buyer.phone, 61/61; доделано контроллером после обрыва субагента на лимите)
NS1-Task 2: complete (commit 73eaee7, ReferralAcceptScreen, 63/63; палитра app.* чисто, канон)
NS1-Task 3: complete (commit 0bd9879, ShareInviteScreen, 65/65; app-dark.* чисто)
NS1-Task 4: complete (commit 8aec5af, WorkspaceScreen, 67/67; app-dark.* чисто)
NS1-Task 5: complete (commit 6b8143b, RealtorProfileScreen, 69/69; app-dark.* чисто)
NS1-Task 6: complete (commit ee93e43, RewardsScreen, 71/71; app-dark.* чисто; #1042 захардкожен по брифу)
NS1-Task 7: complete (commit d3ccbb2, витрина «Спайн покупатель → риэлтор», 71/71, build 18/18)
Финал части 1: 5 экранов готовы (a01ce07..d3ccbb2), палитра чиста по всем, визуальный паритет 4/5 подтверждён скриншотами (ReferralAccept/ShareInvite/Workspace/RealtorProfile), RewardsScreen — тесты+палитра ✓
  Примечание: #1042 захардкожен в Workspace/Rewards (совпадает с DealScreen, принятый паттерн); имя заявителя «Отдел продаж» и т.п. — UI-подписи

## Проект: новые экраны часть 2 — застройщик (план 2026-07-10-new-screens-part2)
Plan: docs/superpowers/plans/2026-07-10-new-screens-part2.md
Base: 6fb5049
NS2-Task 1: complete (commit 8c587b3, канон +promo/team/listingStats, 74/74)
NS2-Task 2: complete (commit 2304a1e, CreateListingScreen, 76/76; app-dark.* чисто)
NS2-Task 3: complete (commit 6618bfd, SharesApplyScreen, 78/78; app-dark.* чисто)
NS2-Task 4: complete (commit 5c02eee, TeamScreen, 80/80; app-dark.* чисто; «Дмитрий Панов» захардкожен по брифу, совпадает с crm.otherClient)
NS2-Task 5: complete (commit 45e0ac9, ListingStatsScreen, 82/82; app-dark.* чисто)
NS2-Task 6: complete (commit 8bce619, витрина «Застройщик», 82/82, build 18/18)
Финал части 2: 4 экрана застройщика готовы (8c587b3..8bce619), палитра чиста по всем, визуальный паритет 4/4 подтверждён скриншотами (CreateListing/SharesApply/Team/ListingStats)
Итог новых экранов: 9 HTML-копий (5 спайна + 4 застройщика) + канон — все панели готовы для планов конвейеров
