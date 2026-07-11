export const siteLinks = {
  appStore: 'https://apps.apple.com/ru/app/%D0%B1%D0%B0%D1%81%D1%82-%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/id6746195081',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.bastithouses.app',
  // Четыре ролевых конвейера
  buyersPipeline: '/',
  realtors: '/realtors',
  developers: '/developers',
  investors: '/investors',
  // Вторичные страницы
  howItWorks: '/how-it-works',
  verification: '/verification',
  security: '/security',
  about: '/about',
  contact: '/contact',
  // Легаси-URL: живут только как страницы-редиректы на конвейеры.
  // Внутри сайта на них не ссылаемся — иначе клик уводит в «переезд».
  buyers: '/buyers',
  agencies: '/agencies',
  product: '/product',
} as const

/** Главное меню — ролевой свитчер: одна роль = один конвейер. */
export const roleItems = [
  { label: 'Покупателям', href: siteLinks.buyersPipeline },
  { label: 'Риэлторам', href: siteLinks.realtors },
  { label: 'Застройщикам', href: siteLinks.developers },
  { label: 'Инвесторам', href: siteLinks.investors },
] as const

/** Вторичная навигация: из главного меню ушла, живёт в футере и мобильном меню. */
export const secondaryItems = [
  { label: 'Как проходит сделка', href: siteLinks.howItWorks },
  { label: 'О БАСТ', href: siteLinks.about },
] as const
