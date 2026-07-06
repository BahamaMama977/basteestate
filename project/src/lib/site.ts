export const siteLinks = {
  appStore: 'https://apps.apple.com/ru/app/%D0%B1%D0%B0%D1%81%D1%82-%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/id6746195081',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.bastithouses.app',
  buyers: '/buyers',
  agencies: '/agencies',
  developers: '/developers',
  investors: '/investors',
  product: '/product',
  howItWorks: '/how-it-works',
  verification: '/verification',
  security: '/security',
  about: '/about',
  contact: '/contact',
} as const

export const navItems = [
  { label: 'Покупателям', href: siteLinks.buyers },
  { label: 'Агентствам', href: siteLinks.agencies },
  { label: 'Застройщикам', href: siteLinks.developers },
  { label: 'Инвесторам', href: siteLinks.investors },
  { label: 'Как работает', href: siteLinks.howItWorks },
  { label: 'О БАСТ', href: siteLinks.about },
] as const
