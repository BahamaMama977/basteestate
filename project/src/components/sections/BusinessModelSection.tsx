'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { CreditCard, Percent, Handshake, Crown, Download, Calendar, TrendingUp, ArrowRight } from 'lucide-react'

const revenueStreams = [
  {
    icon: CreditCard,
    title: 'Подписка от агентств',
    description: 'Ежемесячная плата за использование платформы',
    tiers: [
      { name: 'Starter', price: 'Бесплатно', detail: 'до 3 риэлторов' },
      { name: 'Professional', price: '15,000 ₽/мес', detail: 'до 20 риэлторов' },
      { name: 'Enterprise', price: 'от 50,000 ₽/мес', detail: 'белый лейбл' },
    ],
    highlight: 'LTV: 360,000 ₽',
  },
  {
    icon: Percent,
    title: 'Комиссия с застройщиков',
    description: 'Процент от закрытых сделок',
    tiers: [
      { name: 'Размещение', price: 'Бесплатно', detail: '' },
      { name: 'Комиссия', price: '0.5-1%', detail: 'от суммы сделки' },
      { name: 'Фиксированная', price: '50,000 ₽', detail: 'за объект' },
    ],
    highlight: 'Средняя комиссия: 63,750 ₽',
  },
  {
    icon: Handshake,
    title: 'Партнерские программы',
    description: 'Доход от партнеров экосистемы',
    tiers: [
      { name: 'Банки', price: '15,000 ₽', detail: 'за одобренную ипотеку' },
      { name: 'Сертификаты', price: '5-10%', detail: 'комиссия с партнеров' },
      { name: 'Страхование', price: 'Rev share', detail: 'со страховых' },
    ],
    highlight: 'Потенциал: 100+ партнеров',
  },
  {
    icon: Crown,
    title: 'Премиум-функции',
    description: 'Дополнительные возможности',
    tiers: [
      { name: 'Реклама', price: 'от 10,000 ₽', detail: 'баннеры, топ выдачи' },
      { name: 'Аналитика', price: '25,000 ₽/мес', detail: 'для застройщиков' },
      { name: 'White Label', price: 'от 500,000 ₽', detail: 'setup' },
    ],
    highlight: 'Высокая маржинальность',
  },
]

const unitEconomics = {
  title: 'Юнит-экономика на примере одной сделки',
  items: [
    { label: 'Средняя сделка', value: '₽8,500,000' },
    { label: 'Комиссия застройщика (0.75%)', value: '₽63,750' },
    { label: 'Подписка агентства', value: '₽5,000' },
    { label: 'Банковская комиссия', value: '₽15,000' },
  ],
  total: '₽83,750',
  cost: '₽8,200',
  margin: '90%',
}

export function BusinessModelSection() {
  return (
    <section id="business" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-100" />
      <div className="absolute inset-0 geo-pattern opacity-30" />

      {/* Decorative glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-200/30 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Для инвесторов"
          title="Прозрачная модель монетизации"
          subtitle="Несколько источников дохода с высокой маржинальностью"
        />

        {/* Revenue streams grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {revenueStreams.map((stream, index) => (
            <motion.div
              key={stream.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 bg-surface-50 border border-surface-400 hover:border-accent-400/50 transition-all duration-500 shadow-soft">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent-50 border border-accent-300/30 flex items-center justify-center flex-shrink-0">
                    <stream.icon className="w-6 h-6 text-accent-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink-900 mb-1">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-ink-500">
                      {stream.description}
                    </p>
                  </div>
                </div>

                {/* Tiers */}
                <div className="space-y-3 mb-6">
                  {stream.tiers.map((tier, tierIndex) => (
                    <div
                      key={tier.name}
                      className="flex items-center justify-between py-2 border-b border-surface-400 last:border-0"
                    >
                      <div>
                        <span className="text-sm text-ink-800">{tier.name}</span>
                        {tier.detail && (
                          <span className="text-xs text-ink-400 ml-2">
                            {tier.detail}
                          </span>
                        )}
                      </div>
                      <span className="font-accent text-sm text-accent-600">
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlight */}
                <div className="px-4 py-2 bg-accent-50 border border-accent-300/30 text-center">
                  <span className="text-sm font-medium text-accent-700">
                    {stream.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unit economics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-surface-50 border border-accent-300/30 p-8 md:p-12 shadow-soft">
            <h3 className="font-display text-2xl md:text-3xl text-ink-900 mb-8 text-center">
              {unitEconomics.title}
            </h3>

            <div className="max-w-2xl mx-auto">
              {/* Line items */}
              {unitEconomics.items.map((item, index) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-3 border-b border-surface-400"
                >
                  <span className="text-ink-600">{item.label}</span>
                  <span className="font-accent text-ink-800">{item.value}</span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-b-2 border-accent-400/40">
                <span className="font-heading font-semibold text-ink-800">
                  ИТОГО выручка с сделки
                </span>
                <span className="font-display text-2xl text-accent-600">
                  {unitEconomics.total}
                </span>
              </div>

              {/* Cost and margin */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-sm text-ink-500 mb-1">Себестоимость</div>
                  <div className="font-display text-xl text-ink-800">{unitEconomics.cost}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-ink-500 mb-1">Маржа</div>
                  <div className="font-display text-xl text-accent-600">{unitEconomics.margin}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-ink-500 mb-1">Прогноз самоокупаемости</div>
                  <div className="font-display text-xl text-ink-800">Q3 2026</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investment goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-xl text-ink-900 mb-6">
            Направления инвестиций
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Масштабирование в 10 регионов', value: '50%' },
              { label: 'Разработка веб-платформы', value: '20%' },
              { label: 'Маркетинг и партнеры', value: '20%' },
              { label: 'Команда', value: '10%' },
            ].map((goal) => (
              <div
                key={goal.label}
                className="px-6 py-4 bg-surface-50 border border-surface-400 shadow-soft"
              >
                <div className="font-display text-lg text-accent-600 mb-1">{goal.value}</div>
                <div className="text-xs text-ink-500">{goal.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" icon={<Download size={18} />}>
            Скачать Pitch Deck
          </Button>
          <Button variant="secondary" icon={<TrendingUp size={18} />}>
            Запросить финмодель
          </Button>
          <Button variant="secondary" icon={<Calendar size={18} />}>
            Назначить встречу
          </Button>
        </div>
      </Container>
    </section>
  )
}
