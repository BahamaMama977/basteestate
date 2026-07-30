export const siteLinks = {
  appStore: 'https://apps.apple.com/ru/app/%D0%B1%D0%B0%D1%81%D1%82-%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/id6746195081',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.bastithouses.app',
  // Публичный URL веб-CRM подключим при деплое без правок компонентов.
  webApp: process.env.NEXT_PUBLIC_BAST_WEB_URL ?? null,
  // Обзор платформы и четыре ролевых маршрута
  platform: '/',
  buyersPipeline: '/buyers',
  realtors: '/realtors',
  developers: '/developers',
  investors: '/investors',
  // Вторичные страницы
  howItWorks: '/how-it-works',
  verification: '/verification',
  dealControl: '/deal-control',
  about: '/about',
  contact: '/contact',
  // Легаси-URL: живут только как страницы-редиректы на конвейеры.
  // Внутри сайта на них не ссылаемся — иначе клик уводит в «переезд».
  buyers: '/buyers',
  agencies: '/agencies',
  product: '/product',
} as const

export const publicContacts = {
  email: 'bast-it@yandex.ru',
  emailHref: 'mailto:bast-it@yandex.ru',
  phone: '+7 919 913-99-94',
  phoneHref: 'tel:+79199139994',
  messenger: 'MAX',
} as const

export function contactMailto(subject: string) {
  return `${publicContacts.emailHref}?subject=${encodeURIComponent(subject)}`
}

/** Главное меню — ролевой свитчер: одна роль = один конвейер. */
export const roleItems = [
  { label: 'Платформа', href: siteLinks.platform },
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
