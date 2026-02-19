'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Building2, Users, Briefcase, Landmark, ArrowRight, Download, Play, FileText } from 'lucide-react'

const ctaCards = [
  {
    icon: Building2,
    title: 'Я застройщик',
    description: 'Подключите объекты и увеличьте конверсию показов',
    actions: [
      { label: 'Подключить объекты', primary: true, icon: ArrowRight },
      { label: 'Скачать презентацию', primary: false, icon: Download },
    ],
    color: 'from-blue-500/10 to-blue-500/5',
    borderColor: 'hover:border-blue-400/50',
  },
  {
    icon: Users,
    title: 'Я агентство',
    description: 'Не теряйте клиентов после показа',
    actions: [
      { label: 'Начать бесплатно', primary: true, icon: ArrowRight },
      { label: 'Посмотреть демо', primary: false, icon: Play },
    ],
    color: 'from-emerald-500/10 to-emerald-500/5',
    borderColor: 'hover:border-emerald-400/50',
  },
  {
    icon: Briefcase,
    title: 'Я инвестор',
    description: 'Изучите возможности инвестирования',
    actions: [
      { label: 'Скачать Pitch Deck', primary: true, icon: Download },
      { label: 'Запросить встречу', primary: false, icon: ArrowRight },
    ],
    color: 'from-accent-400/10 to-accent-300/5',
    borderColor: 'hover:border-accent-400/50',
  },
  {
    icon: Landmark,
    title: 'Я банк',
    description: 'Встройте ипотечные продукты в воронку сделок',
    actions: [
      { label: 'Обсудить интеграцию', primary: true, icon: ArrowRight },
      { label: 'Партнерское предложение', primary: false, icon: FileText },
    ],
    color: 'from-purple-500/10 to-purple-500/5',
    borderColor: 'hover:border-purple-400/50',
  },
]

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-100" />

      {/* Decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-200/30 rounded-full blur-3xl"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-ink-900 mb-6">
            Готовы изменить рынок{' '}
            <span className="text-accent-gradient">загородной недвижимости</span>?
          </h2>
          <p className="text-lg text-ink-600 max-w-2xl mx-auto">
            Выберите вашу роль и начните работу с платформой уже сегодня
          </p>
        </motion.div>

        {/* CTA cards grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative h-full p-8 md:p-10 bg-surface-50 border border-surface-400 ${card.borderColor} transition-all duration-500 overflow-hidden shadow-soft hover:shadow-medium`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent-400/30 group-hover:border-accent-500/50 transition-colors" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent-400/30 group-hover:border-accent-500/50 transition-colors" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent-50 border border-accent-300/30 flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-accent-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-2xl text-ink-900">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-ink-600 mb-8">
                    {card.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {card.actions.map((action) => (
                      <Button
                        key={action.label}
                        variant={action.primary ? 'primary' : 'secondary'}
                        size="sm"
                        icon={<action.icon size={16} />}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
