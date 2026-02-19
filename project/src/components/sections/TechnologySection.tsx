'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Shield, Server, Smartphone, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Безопасность данных',
    items: [
      'Соответствие 152-ФЗ',
      'Шифрование TLS 1.3',
      'Регулярные аудиты',
      'Резервное копирование каждые 6 часов',
    ],
  },
  {
    icon: Server,
    title: 'Технологический стек',
    items: [
      'React Native (iOS + Android)',
      'Облачная инфраструктура',
      'API для интеграций',
      'WebSocket real-time',
    ],
  },
  {
    icon: Smartphone,
    title: 'Кроссплатформенность',
    items: [
      'Мобильные приложения',
      'Веб-версия (в разработке)',
      'Telegram-бот',
      'Push-уведомления',
    ],
  },
  {
    icon: Zap,
    title: 'Производительность',
    items: [
      'Загрузка < 2 секунд',
      'Офлайн-режим',
      '99.9% uptime',
      'Глобальный CDN',
    ],
  },
]

const techStack = [
  'React Native',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'AWS',
  'WebSocket',
  'REST API',
]

export function TechnologySection() {
  return (
    <section id="technology" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Технологии"
          title="Надежная платформа на современном стеке"
          subtitle="Безопасность, производительность и масштабируемость — наши приоритеты"
        />

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 bg-surface-50 border border-surface-400 hover:border-accent-400/50 transition-all duration-500 relative overflow-hidden shadow-soft hover:shadow-medium">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 bg-accent-50 border border-accent-300/30 flex items-center justify-center group-hover:bg-accent-100 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-accent-600" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display text-xl text-ink-900 mb-4">
                    {feature.title}
                  </h3>

                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm text-ink-600 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-accent-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-ink-500 uppercase tracking-wider mb-6">
            Технологии которые мы используем
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-surface-50 border border-surface-400 text-sm text-ink-600 font-accent hover:border-accent-400/50 hover:text-ink-800 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
