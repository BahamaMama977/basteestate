'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { X, Building2, Users, Home } from 'lucide-react'

const problems = [
  {
    icon: Building2,
    title: 'Для застройщиков',
    items: [
      'Низкая конверсия офлайн-показов',
      'Нет прямой связи с покупателем после показа',
      'Сложно мотивировать риэлторов продавать ваши объекты',
      'Долгий цикл сделки (3-6 месяцев)',
    ],
  },
  {
    icon: Users,
    title: 'Для агентств недвижимости',
    items: [
      'Риэлторы теряют клиентов после первого показа',
      'Нет инструментов для отслеживания воронки',
      'Долгие выплаты комиссий (ручная работа)',
      'Конкуренция с досками объявлений',
    ],
  },
  {
    icon: Home,
    title: 'Для покупателей',
    items: [
      'Непрозрачность процесса сделки',
      'Нет единой точки коммуникации',
      'Запутанная документация',
      'Отсутствие дополнительных бонусов',
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background - Light theme with subtle tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Проблема рынка"
          title="Рынок растет, но процессы остаются архаичными"
          subtitle="87% покупателей теряются между показом и сделкой. Мы решаем эту проблему."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              className="group relative"
            >
              <div className="card-elevated h-full p-8 md:p-10">
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent-400/30 transition-colors duration-500 group-hover:border-accent-500/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent-400/30 transition-colors duration-500 group-hover:border-accent-500/50" />

                {/* Icon */}
                <div className="w-14 h-14 mb-6 bg-accent-50 border border-accent-300/30 flex items-center justify-center transition-all duration-500 group-hover:bg-accent-100">
                  <problem.icon className="w-6 h-6 text-accent-600" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl text-ink-900 mb-6">
                  {problem.title}
                </h3>

                {/* Problem items */}
                <ul className="space-y-4">
                  {problem.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + itemIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 mt-1">
                        <X className="w-4 h-4 text-red-500/70" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm text-ink-600 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-100/50 to-transparent" />
                </div>
              </div>

              {/* Card number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-surface-50 border border-accent-400/30 flex items-center justify-center shadow-soft">
                <span className="text-xs font-accent text-accent-700">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-surface-50 border border-accent-300/30 shadow-soft">
            <span className="font-display text-3xl md:text-4xl text-accent-600">87%</span>
            <span className="text-sm text-ink-600 text-left max-w-[200px]">
              покупателей теряются между показом и сделкой
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
