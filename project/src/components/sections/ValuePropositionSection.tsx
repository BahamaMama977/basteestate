'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Building2, Users, Landmark, Check, ArrowRight } from 'lucide-react'

const tabs = [
  {
    id: 'developers',
    icon: Building2,
    label: 'Застройщикам',
    title: 'Продавайте быстрее и отслеживайте эффективность каждого показа',
    benefits: [
      {
        title: 'Аналитика офлайн-показов',
        items: [
          'Сколько раз сканировали QR на каждом объекте',
          'Какие риэлторы приводят больше клиентов',
          'Конверсия "показ → сделка" в реальном времени',
        ],
      },
      {
        title: 'Прямая связь с покупателем',
        items: [
          'Клиент остается в вашей экосистеме',
          'Уведомления о новых акциях',
          'Групповой чат сделки',
        ],
      },
      {
        title: 'Мотивация риэлторов',
        items: [
          'Повышенные комиссии на нужные объекты',
          'Бонусы за быстрые сделки',
          'Рейтинг риэлторов по эффективности',
        ],
      },
      {
        title: 'Сокращение цикла сделки',
        items: [
          '45 дней (vs 90 без платформы)',
          'Все документы в одном месте',
          'Автоматические напоминания',
        ],
      },
    ],
    stat: { value: '45', label: 'дней средний срок сделки' },
    cta: 'Подключить объекты',
  },
  {
    id: 'agencies',
    icon: Users,
    label: 'Агентствам',
    title: 'Не теряйте клиентов после показа. Контролируйте всю воронку продаж',
    benefits: [
      {
        title: 'Закрепление клиента навсегда',
        items: [
          'QR-код привязывает клиента к риэлтору',
          'Сделка ваша даже при повторном контакте',
          'Защита от прямых продаж застройщиком',
        ],
      },
      {
        title: 'CRM для риэлторов',
        items: [
          'Все клиенты в одном приложении',
          'Автоматические напоминания',
          'История всех коммуникаций',
        ],
      },
      {
        title: 'Прозрачная воронка',
        items: [
          'Статус каждой сделки',
          'Статистика по риэлторам',
          'Подключение топ-менеджеров',
        ],
      },
      {
        title: 'Автоматизация выплат',
        items: [
          'Комиссии зачисляются автоматически',
          'Прозрачный расчет',
          'История всех транзакций',
        ],
      },
    ],
    stat: { value: '0 ₽', label: 'тариф Starter бесплатно' },
    cta: 'Подключить команду',
  },
  {
    id: 'banks',
    icon: Landmark,
    label: 'Банкам',
    title: 'Встраивайте ипотечные продукты в момент принятия решения',
    benefits: [
      {
        title: 'Интеграция в воронку сделки',
        items: [
          'Банк появляется на этапе "Начало сделки"',
          'Калькулятор ипотеки в карточке объекта',
          'Заявка за 2 минуты',
        ],
      },
      {
        title: 'Квалифицированные лиды',
        items: [
          'Клиент уже выбрал объект',
          'Данные о цене и первоначальном взносе',
          'Конверсия заявок: 68%',
        ],
      },
      {
        title: 'Партнерские программы',
        items: [
          'Субсидирование ставки от застройщика',
          'Ко-маркетинг с застройщиками',
          'Совместные акции',
        ],
      },
      {
        title: 'Аналитика и скоринг',
        items: [
          'Поведение клиента в приложении',
          'Предскоринг на основе активности',
          'API для интеграции',
        ],
      },
    ],
    stat: { value: '68%', label: 'конверсия заявок в одобрение' },
    cta: 'Обсудить интеграцию',
  },
]

export function ValuePropositionSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeContent = tabs.find((tab) => tab.id === activeTab)!

  return (
    <section id="value" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Выгода"
          title="Для кого это выгодно"
        />

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-3 px-6 py-4 font-heading font-medium text-sm uppercase tracking-wider
                transition-all duration-300 border
                ${activeTab === tab.id
                  ? 'bg-accent-50 border-accent-400 text-accent-700'
                  : 'bg-surface-50 border-surface-400 text-ink-500 hover:border-accent-400/50 hover:text-ink-700'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-5 h-5" strokeWidth={1.5} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title */}
            <h3 className="text-center font-display text-2xl md:text-3xl text-ink-900 mb-12 max-w-3xl mx-auto">
              {activeContent.title}
            </h3>

            {/* Benefits grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {activeContent.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full p-6 bg-surface-50 border border-surface-400 hover:border-accent-400/50 transition-all duration-500 shadow-soft">
                    <h4 className="font-heading font-semibold text-ink-900 mb-4 flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-500" strokeWidth={2.5} />
                      {benefit.title}
                    </h4>
                    <ul className="space-y-2">
                      {benefit.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-ink-500 pl-6 relative">
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-accent-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA area */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Stat highlight */}
              <div className="flex items-center gap-4 px-8 py-4 bg-surface-50 border border-accent-300/30 shadow-soft">
                <span className="font-display text-3xl md:text-4xl text-accent-600">
                  {activeContent.stat.value}
                </span>
                <span className="text-sm text-ink-500 max-w-[120px]">
                  {activeContent.stat.label}
                </span>
              </div>

              {/* CTA Button */}
              <Button variant="primary" icon={<ArrowRight size={18} />}>
                {activeContent.cta}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
