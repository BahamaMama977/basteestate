'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { QrCode, Link2, MessageSquare, Play, CheckCircle2, Gift, BarChart3, ArrowDown } from 'lucide-react'

const workflowSteps = [
  {
    icon: QrCode,
    title: 'QR-код на объекте',
    description: 'Клиент сканирует уникальный код',
    color: 'from-accent-500 to-accent-400',
  },
  {
    icon: Link2,
    title: 'Автопривязка',
    description: 'К риэлтору и объекту навсегда',
    color: 'from-accent-500 to-accent-300',
  },
  {
    icon: MessageSquare,
    title: 'Единый чат',
    description: 'Вся коммуникация в одном месте',
    color: 'from-accent-400 to-accent-300',
  },
  {
    icon: Play,
    title: 'Начало сделки',
    description: '4 этапа до завершения',
    color: 'from-accent-500 to-accent-400',
  },
  {
    icon: CheckCircle2,
    title: 'Завершение',
    description: 'Сертификаты и комиссии',
    color: 'from-accent-600 to-accent-500',
  },
]

const features = [
  {
    icon: Link2,
    title: 'Привязка через QR-код',
    items: [
      'Клиент закрепляется за риэлтором навсегда',
      'Невозможно "увести" клиента после показа',
      'Уведомление о каждом сканировании',
    ],
  },
  {
    icon: BarChart3,
    title: 'Прозрачная воронка',
    items: [
      'Каждый этап в реальном времени',
      'Эффективность каждого риэлтора',
      'Покупатель видит свой прогресс',
    ],
  },
  {
    icon: Gift,
    title: 'Система лояльности',
    items: [
      'Сертификаты на благоустройство',
      'Акции прямо в приложении',
      'Бонусы от партнеров',
    ],
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-100" />
      <div className="absolute inset-0 geo-pattern opacity-30" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Решение"
          title="Первая end-to-end платформа для сделок"
          subtitle="От сканирования QR-кода на показе до получения ключей и бонусов — весь цикл сделки в одном приложении"
        />

        {/* Workflow visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-24"
        >
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-accent-400/30 via-accent-500/50 to-accent-400/30 -translate-y-1/2" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex flex-col items-center"
              >
                {/* Step circle */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface-50 border border-accent-400/40 flex items-center justify-center z-10 shadow-soft"
                  >
                    <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-accent-600" strokeWidth={1.5} />
                  </motion.div>

                  {/* Pulse effect */}
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute inset-0 rounded-full border border-accent-500/30"
                  />
                </div>

                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center z-20">
                  <span className="text-xs font-bold text-surface-50">{index + 1}</span>
                </div>

                {/* Step content */}
                <div className="mt-6 text-center max-w-[160px]">
                  <h4 className="font-heading font-semibold text-ink-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-ink-500">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - mobile only */}
                {index < workflowSteps.length - 1 && (
                  <div className="lg:hidden mt-4">
                    <ArrowDown className="w-5 h-5 text-accent-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full p-8 bg-surface-50 border border-surface-400 hover:border-accent-400/50 transition-all duration-500 shadow-soft hover:shadow-medium">
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent-50 border border-accent-300/30 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg text-ink-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Feature items */}
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-sm text-ink-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
