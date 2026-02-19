'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Globe, CreditCard, FileCheck, Home, Check } from 'lucide-react'

const roadmapItems = [
  {
    period: 'Q1-Q2 2026',
    title: 'Углубление продукта',
    status: 'current',
    items: [
      { text: 'Веб-версия для застройщиков и агентств', icon: Globe },
      { text: 'Интеграция с топ-5 банками', icon: CreditCard },
      { text: 'Запуск в 10 новых регионах России', icon: Globe },
      { text: 'Marketplace сертификатов (100+ партнеров)', icon: Check },
    ],
  },
  {
    period: 'Q3-Q4 2026',
    title: 'Расширение функционала',
    status: 'upcoming',
    items: [
      { text: 'Встроенная ипотека (одобрение за 10 минут)', icon: CreditCard },
      { text: 'Электронная регистрация (интеграция с Росреестром)', icon: FileCheck },
      { text: 'Страхование недвижимости в 1 клик', icon: Check },
      { text: 'Коммунальные платежи в приложении', icon: Home },
    ],
  },
  {
    period: '2027',
    title: 'Полная экосистема',
    status: 'future',
    items: [
      { text: 'Вторичный рынок загородной недвижимости', icon: Home },
      { text: 'Аренда и субаренда загородных домов', icon: Home },
      { text: 'Маркетплейс услуг для дома', icon: Globe },
      { text: 'Выход на международные рынки', icon: Globe },
    ],
  },
]

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-100" />
      <div className="absolute inset-0 geo-pattern opacity-20" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Roadmap"
          title="Мы только начали"
          subtitle="Впереди — экосистема для всей жизни с недвижимостью"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/60 via-accent-400/40 to-accent-300/20" />

          <div className="space-y-12 lg:space-y-0">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.2 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Timeline dot - desktop */}
                <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 items-center justify-center">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    item.status === 'current'
                      ? 'bg-accent-500 border-accent-500 shadow-accent-glow'
                      : 'bg-surface-50 border-accent-400/50'
                  }`}>
                    {item.status === 'current' && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-accent-400/30"
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:pb-16 ${
                    index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:text-left lg:pl-16'
                  }`}
                >
                  <div className={`inline-block ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                    {/* Period badge */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className={`px-4 py-1.5 text-sm font-accent font-medium uppercase tracking-wider ${
                        item.status === 'current'
                          ? 'bg-accent-100 text-accent-700 border border-accent-400/40'
                          : 'bg-surface-200 text-ink-500 border border-surface-400'
                      }`}>
                        {item.period}
                      </span>
                      {item.status === 'current' && (
                        <span className="px-2 py-1 text-xs bg-accent-500 text-surface-50 font-bold uppercase">
                          Сейчас
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-ink-900 mb-6">
                      {item.title}
                    </h3>

                    {/* Items */}
                    <ul className={`space-y-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {item.items.map((listItem, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + itemIndex * 0.1 }}
                          className={`flex items-center gap-3 ${
                            index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <div className="w-8 h-8 bg-accent-50 border border-accent-300/30 flex items-center justify-center flex-shrink-0">
                            <listItem.icon className="w-4 h-4 text-accent-600" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm text-ink-600">{listItem.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for grid alignment */}
                {index % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-6 bg-surface-50 border border-accent-300/30 shadow-soft">
            <p className="font-display text-xl md:text-2xl text-ink-900 mb-2">
              Runway: <span className="text-accent-600">18 месяцев</span>
            </p>
            <p className="text-sm text-ink-500">
              до следующего раунда инвестиций
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
