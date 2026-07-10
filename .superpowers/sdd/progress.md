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
