'use client'

import { Container } from './ui/Container'
import { MapPin, Phone, Mail, Send, Linkedin, Youtube, FileText } from 'lucide-react'

const socialLinks = [
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: FileText, label: 'VC.ru', href: '#' },
]

const footerLinks = [
  {
    title: 'Партнерам',
    links: [
      { label: 'Застройщикам', href: '#value' },
      { label: 'Агентствам', href: '#value' },
      { label: 'Банкам', href: '#value' },
      { label: 'API документация', href: '#' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас', href: '#team' },
      { label: 'Команда', href: '#team' },
      { label: 'Карьера', href: '#' },
      { label: 'Блог', href: '#' },
    ],
  },
  {
    title: 'Инвесторам',
    links: [
      { label: 'Pitch Deck', href: '#' },
      { label: 'Финансовая модель', href: '#' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: 'Контакты', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative bg-ink-900 border-t border-ink-700">
      {/* Main footer content */}
      <Container className="py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <a href="#" className="inline-block mb-6">
              <span className="font-display text-3xl text-surface-50">БАСТ</span>
              <span className="font-display text-3xl text-accent-500">.</span>
            </a>

            <p className="text-ink-300 mb-8 max-w-xs">
              Цифровая экосистема сделок с загородной недвижимостью. Объединяем застройщиков, риэлторов и покупателей.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-ink-300">
                <MapPin className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <span>Москва, ул. Примерная, д. 1</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink-300">
                <Phone className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <a href="tel:+74951234567" className="hover:text-surface-50 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink-300">
                <Mail className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <a href="mailto:partners@bast-estate.ru" className="hover:text-surface-50 transition-colors">
                  partners@bast-estate.ru
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-ink-800 border border-ink-700 flex items-center justify-center hover:border-accent-500/50 hover:bg-ink-700 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-ink-400 hover:text-accent-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-heading font-semibold text-surface-50 uppercase tracking-wider text-sm mb-6">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-300 hover:text-accent-500 transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-ink-500">
              2026 БАСТ Недвижимость. Все права защищены.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#"
                className="text-xs text-ink-500 hover:text-ink-300 transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-xs text-ink-500 hover:text-ink-300 transition-colors"
              >
                Пользовательское соглашение
              </a>
              <a
                href="#"
                className="text-xs text-ink-500 hover:text-ink-300 transition-colors"
              >
                Реквизиты
              </a>
            </div>

            {/* Company name */}
            <p className="text-xs text-ink-500">
              ООО «БАСТ Технологии»
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
