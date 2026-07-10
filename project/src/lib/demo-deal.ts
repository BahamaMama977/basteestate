/**
 * Канон демо-сделки «Живая сделка» — единственный источник демо-данных
 * для всех HTML-копий экранов приложения на сайте.
 * Спека: docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md
 */

export type DemoObject = typeof demoObject
export type Participant = { initials: string; name: string; role: string; phone?: string }
export type ChatMessage = { from: 'buyer' | 'seller'; text: string; time: string }
export type DealStage = { key: string; label: string; caption: string }
export type DealAct = {
  id: 1 | 2 | 3 | 4 | 5
  key: string
  title: string
  screen: 'search' | 'listing' | 'chat' | 'deal'
  chatCount: number
  completedStages: number
  showParticipants: boolean
}

export const demoObject = {
  title: 'Дом у леса',
  district: 'Завьяловский район',
  address: 'Завьяловский район, кп «Сосновый бор»',
  price: '12 800 000 ₽',
  priceShort: '12,8 млн ₽',
  perMeter: '69 600 ₽/м²',
  area: '184 м²',
  beds: '4 спал',
  floors: '2 эт',
  land: '9 сот',
  year: '2025',
  photo: '/images/verification-house.png',
} as const

export const participants: Record<'buyer' | 'realtor' | 'seller', Participant> = {
  buyer: { initials: 'МС', name: 'Мария Соколова', role: 'Покупатель' },
  realtor: { initials: 'АК', name: 'Анна Ковалёва', role: 'Риэлтор', phone: '+7 912 445 20 71' },
  seller: { initials: 'ОП', name: 'Отдел продаж «Сосновый бор»', role: 'Продавец' },
}

export const chat: ChatMessage[] = [
  { from: 'buyer', text: 'Здравствуйте! Дом ещё в продаже?', time: '13:42' },
  { from: 'seller', text: 'Да, актуально. Готова показать в эти выходные.', time: '13:44' },
  { from: 'buyer', text: 'Отлично. А документы можно посмотреть заранее?', time: '13:45' },
  { from: 'seller', text: 'Конечно — прикреплю в чат к объекту.', time: '13:46' },
]

export const stages: DealStage[] = [
  { key: 'started', label: 'Сделка начата', caption: 'Зафиксирован объект и участники' },
  { key: 'object', label: 'Объект выбран', caption: 'Дом связан с текущей сделкой' },
  { key: 'contract', label: 'Договор готовится', caption: 'Команда собирает данные и документы' },
  { key: 'signed', label: 'Документы подписаны', caption: 'Текущий сценарий сделки завершён' },
]

/** Пять актов главной страницы: какой экран и в каком состоянии показан. */
export const acts: DealAct[] = [
  { id: 1, key: 'search', title: 'Найти объект', screen: 'search', chatCount: 0, completedStages: 0, showParticipants: false },
  { id: 2, key: 'dialog', title: 'Написать продавцу', screen: 'chat', chatCount: 4, completedStages: 0, showParticipants: false },
  { id: 3, key: 'start', title: 'Начать сделку', screen: 'deal', chatCount: 4, completedStages: 2, showParticipants: true },
  { id: 4, key: 'progress', title: 'Договор готовится', screen: 'deal', chatCount: 4, completedStages: 3, showParticipants: true },
  { id: 5, key: 'signed', title: 'Документы подписаны', screen: 'deal', chatCount: 4, completedStages: 4, showParticipants: true },
]

/** Обратная совместимость с экранами, писавшимися до канона. */
export const demo = {
  object: demoObject,
  realtor: participants.realtor,
} as const
