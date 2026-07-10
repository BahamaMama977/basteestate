/**
 * Канон демо-сделки «Живая сделка» — единственный источник демо-данных
 * для всех HTML-копий экранов приложения на сайте.
 * Спека: docs/superpowers/specs/2026-07-10-bast-visual-concept-live-deal-design.md
 */

export type DemoObject = typeof demoObject
export type Participant = { initials: string; name: string; shortName?: string; role: string; phone?: string }
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
  verifiedCount: number
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
  houseType: 'Кирпич',
  heating: 'Газ',
  bathrooms: '2',
  photo: '/images/verification-house.png',
} as const

export const participants: Record<'buyer' | 'realtor' | 'seller', Participant> = {
  buyer: { initials: 'МС', name: 'Мария Соколова', role: 'Покупатель', phone: '+7 902 118 44 30' },
  realtor: { initials: 'АК', name: 'Анна Ковалёва', role: 'Риэлтор', phone: '+7 912 445 20 71' },
  seller: { initials: 'ОП', name: 'Отдел продаж «Сосновый бор»', shortName: 'Сосновый бор', role: 'Продавец' },
}

export const chat: ChatMessage[] = [
  { from: 'buyer', text: 'Здравствуйте! Дом ещё в продаже?', time: '13:42' },
  { from: 'seller', text: 'Да, актуально. Готовы показать в эти выходные.', time: '13:44' },
  { from: 'buyer', text: 'Отлично. А документы можно посмотреть заранее?', time: '13:45' },
  { from: 'seller', text: 'Конечно — прикреплю в чат к объекту.', time: '13:46' },
]

export type OtherObject = { title: string; district: string; price: string; priceShort: string; photo: string }

/** Другие объекты каталога — для карты, списков и блока «Просмотрел». */
export const otherObjects: OtherObject[] = [
  { title: 'Коттедж у пруда, 210 м²', district: 'Октябрьский район', price: '15 200 000 ₽', priceShort: '15,2 млн ₽', photo: '/images/hero-house.png' },
  { title: 'Дом с террасой, 156 м²', district: 'Октябрьский район', price: '9 400 000 ₽', priceShort: '9,4 млн ₽', photo: '/images/hero-house.png' },
  { title: 'Дом в посёлке, 128 м²', district: 'Игринский район', price: '7 900 000 ₽', priceShort: '7,9 млн ₽', photo: '/images/cta-house.png' },
]

export type VerificationItem = { key: string; label: string; caption: string }

/** Чек-лист проверки объявления до публикации (спека, акт 4 и секция «Проверка»). */
export const verification: VerificationItem[] = [
  { key: 'seller', label: 'Продавец', caption: 'кто продаёт и на каком основании' },
  { key: 'docs', label: 'Документы', caption: 'сведения по объекту' },
  { key: 'price', label: 'Цена', caption: 'данные в объявлении' },
  { key: 'specs', label: 'Характеристики', caption: 'параметры дома и участка' },
  { key: 'availability', label: 'Наличие объекта', caption: 'актуальность предложения' },
]

/** Данные CRM-экранов: обращение застройщику и напоминание риэлтора. */
export const crm = {
  inquiry: { text: chat[0].text, time: chat[0].time, status: 'Новое обращение', assignee: 'Отдел продаж' },
  reminder: { text: 'Согласовать показ дома у леса', when: 'завтра 09:00' },
  otherClient: { initials: 'ДП', name: 'Дмитрий Панов', role: 'Покупатель' },
} as const

export const stages: DealStage[] = [
  { key: 'started', label: 'Сделка начата', caption: 'Зафиксирован объект и участники' },
  { key: 'object', label: 'Объект выбран', caption: 'Дом связан с текущей сделкой' },
  { key: 'contract', label: 'Договор готовится', caption: 'Команда собирает данные и документы' },
  { key: 'signed', label: 'Документы подписаны', caption: 'Текущий сценарий сделки завершён' },
]

/** Пять актов главной страницы: какой экран и в каком состоянии показан. */
export const acts: DealAct[] = [
  { id: 1, key: 'search', title: 'Найти объект', screen: 'search', chatCount: 0, completedStages: 0, showParticipants: false, verifiedCount: 0 },
  { id: 2, key: 'dialog', title: 'Написать продавцу', screen: 'chat', chatCount: 4, completedStages: 0, showParticipants: false, verifiedCount: 0 },
  { id: 3, key: 'start', title: 'Начать сделку', screen: 'deal', chatCount: 4, completedStages: 2, showParticipants: true, verifiedCount: 0 },
  { id: 4, key: 'progress', title: 'Договор готовится', screen: 'deal', chatCount: 4, completedStages: 3, showParticipants: true, verifiedCount: 5 },
  { id: 5, key: 'signed', title: 'Документы подписаны', screen: 'deal', chatCount: 4, completedStages: 4, showParticipants: true, verifiedCount: 5 },
]

/** Обратная совместимость с экранами, писавшимися до канона. */
export const demo = {
  object: demoObject,
  realtor: participants.realtor,
} as const

/** Реферальная ссылка риэлтора для шаринга объекта и QR. */
export const referral = {
  url: 'bast.app/s/АК-2F',
  code: 'АК-2F',
} as const

/** Публичная статистика риэлтора (профиль). */
export const realtorStats = {
  rating: '4.8',
  reviews: 12,
  deals: 34,
  objects: 18,
  since: 'март 2024',
} as const

export type Bonus = {
  key: string
  kind: 'Сертификат' | 'Акция'
  title: string
  value: string
  until: string
  provider: string
}

/** Бонусы по закрытой сделке: партнёрские сертификаты и акции застройщика. */
export const bonuses: Bonus[] = [
  { key: 'finish', kind: 'Сертификат', title: 'Чистовая отделка', value: '−15%', until: 'до 31 декабря', provider: 'Партнёр «Отделка+»' },
  { key: 'insurance', kind: 'Сертификат', title: 'Страхование дома', value: 'первый год', until: 'после подписания', provider: 'СК «Щит»' },
  { key: 'furnish', kind: 'Акция', title: 'Обустройство участка', value: '50 000 ₽', until: 'до конца сделки', provider: 'Застройщик' },
]

/** Демо-акция застройщика для пакетного применения к объявлениям. */
export const promo = {
  title: 'Чистовая отделка в подарок',
  description: 'Скидка на отделку при покупке до конца квартала',
  count: 3,
} as const

export type TeamMember = { initials: string; name: string; role: string; deals: number }

/** Команда застройщика: отдел продаж. */
export const team: TeamMember[] = [
  { initials: 'ОП', name: 'Ольга Петрова', role: 'Руководитель продаж', deals: 21 },
  { initials: 'ИС', name: 'Игорь Соловьёв', role: 'Менеджер', deals: 14 },
  { initials: 'ЕК', name: 'Елена Кузьмина', role: 'Менеджер', deals: 9 },
]

/** Статистика объявления (аудитория). */
export const listingStats = {
  views: 1284,
  pins: 37,
  favorites: 92,
  shares: 18,
} as const
