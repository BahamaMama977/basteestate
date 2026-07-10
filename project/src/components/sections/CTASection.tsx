'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { ArrowRight, Building2, Download, FileSpreadsheet, Play, Smartphone, Users, WalletCards } from 'lucide-react'

const ctaCards = [
  {
    icon: Smartphone,
    title: 'Посмотреть приложение',
    description: 'Оцените путь клиента: карта, объект, чат, этапы сделки и бонусы.',
    actions: [
      { label: 'Запросить демо', primary: true, icon: Play },
    ],
  },
  {
    icon: Users,
    title: 'Подключить риэлторов',
    description: 'Соберите клиентов, подборки, напоминания и активные сделки в одном мобильном инструменте.',
    actions: [
      { label: 'Подключить команду', primary: true, icon: ArrowRight },
    ],
  },
  {
    icon: Building2,
    title: 'Добавить объекты',
    description: 'Публикуйте объекты, назначайте ответственных, запускайте акции и отслеживайте интерес.',
    actions: [
      { label: 'Стать партнером', primary: true, icon: ArrowRight },
    ],
  },
  {
    icon: WalletCards,
    title: 'Инвесторам',
    description: 'Изучите платформенную модель, метрики, roadmap и сценарии монетизации.',
    actions: [
      { label: 'Pitch deck', primary: true, icon: Download },
      { label: 'Финмодель', primary: false, icon: FileSpreadsheet },
    ],
  },
]

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-surface-100 py-24 md:py-32">
      <div className="absolute inset-0 geo-pattern opacity-20" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mx-auto mb-6 max-w-4xl font-display text-display-sm text-ink-900 md:text-display-md lg:text-display-lg">
            Выберите следующий шаг
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-600">
            Покажем продукт, обсудим подключение партнеров или отправим материалы для инвестиционной оценки.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-ink-900/10 bg-white/90 p-6 shadow-soft transition-all duration-300 hover:border-accent-400/50 hover:shadow-medium"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                <card.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-display text-xl text-ink-900">{card.title}</h3>
              <p className="mb-8 text-sm leading-relaxed text-ink-600">{card.description}</p>
              <div className="flex flex-wrap gap-3">
                {card.actions.map((action) => (
                  <Button
                    key={action.label}
                    href="#"
                    variant={action.primary ? 'primary' : 'secondary'}
                    size="sm"
                    icon={<action.icon size={16} />}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
