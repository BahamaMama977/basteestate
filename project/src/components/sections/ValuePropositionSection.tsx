'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { ArrowRight, Building2, Check, Headphones, Home, Users } from 'lucide-react'

const audiences = [
  {
    id: 'buyers',
    icon: Home,
    label: 'Покупателям',
    title: 'Искать дом и видеть, что происходит со сделкой',
    description: 'Покупатель сохраняет объекты, общается с риэлтором, получает рекомендации и понимает, какой этап идет сейчас.',
    stat: { value: '1', label: 'приложение вместо чатов, звонков и заметок' },
    benefits: [
      'Поиск объектов на карте и в списке',
      'Избранное и история просмотров',
      'Единый чат по объекту',
      'Этапы сделки, напоминания и бонусы',
    ],
    cta: 'Посмотреть приложение',
  },
  {
    id: 'realtors',
    icon: Users,
    label: 'Риэлторам',
    title: 'Вести клиентов, подборки, задачи и сделки с телефона',
    description: 'Риэлтор видит клиентов, объекты, чаты, напоминания и активные сделки без ручного переноса данных между инструментами.',
    stat: { value: '150+', label: 'риэлторов уже в контуре платформы' },
    benefits: [
      'Клиентская база и история взаимодействий',
      'Рекомендации объектов клиентам',
      'Напоминания по каждому следующему шагу',
      'Контроль активных сделок и статусов',
    ],
    cta: 'Подключить команду',
  },
  {
    id: 'developers',
    icon: Building2,
    label: 'Застройщикам',
    title: 'Управлять объектами, интересом клиентов и командой продаж',
    description: 'Застройщик публикует объекты, видит интерес, назначает ответственных, запускает акции и контролирует сделки по объектам.',
    stat: { value: '40', label: 'застройщиков в партнерском контуре' },
    benefits: [
      'Создание и управление объявлениями',
      'Статистика просмотров, чатов и сделок',
      'Сотрудники, роли и ответственные',
      'Акции, сертификаты и партнерские предложения',
    ],
    cta: 'Подключить объекты',
  },
  {
    id: 'teams',
    icon: Headphones,
    label: 'Командам БАСТ',
    title: 'Брать свободные сделки в работу и вести сопровождение',
    description: 'Команда видит сделки без ответственного, подключается к клиенту и помогает довести процесс до результата.',
    stat: { value: '24/7', label: 'контекст сделки доступен команде' },
    benefits: [
      'Очередь свободных сделок',
      'Назначение ответственных',
      'Контроль этапов и задач',
      'Помощь клиенту и партнерам внутри сделки',
    ],
    cta: 'Обсудить процесс',
  },
]

export function ValuePropositionSection() {
  const [activeTab, setActiveTab] = useState(audiences[0].id)
  const activeContent = audiences.find((tab) => tab.id === activeTab)!

  return (
    <section id="audiences" className="relative overflow-hidden bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Для кого"
          title="Один продукт, разные рабочие маршруты"
          subtitle="Каждая роль видит свой набор действий, но сделка остается общей и прозрачной для участников."
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {audiences.map((audience) => (
            <motion.button
              key={audience.id}
              onClick={() => setActiveTab(audience.id)}
              className={`
                relative flex items-center gap-3 rounded-md border px-5 py-3 text-sm font-heading font-medium uppercase tracking-[0.12em]
                transition-all duration-300
                ${activeTab === audience.id
                  ? 'border-accent-700 bg-accent-800 text-surface-50'
                  : 'border-ink-900/10 bg-white/80 text-ink-500 hover:border-accent-400/50 hover:text-ink-800'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <audience.icon className="h-5 w-5" strokeWidth={1.5} />
              {audience.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch"
          >
            <div className="rounded-2xl border border-ink-900/10 bg-white/90 p-8 shadow-soft md:p-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                <activeContent.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 font-display text-3xl text-ink-900 md:text-4xl">
                {activeContent.title}
              </h3>
              <p className="mb-8 leading-relaxed text-ink-600">{activeContent.description}</p>
              <Button href="#cta" variant="primary" icon={<ArrowRight size={18} />}>
                {activeContent.cta}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-2xl border border-accent-300/30 bg-accent-50 p-8">
                <div className="font-display text-4xl text-accent-800 md:text-5xl">{activeContent.stat.value}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{activeContent.stat.label}</p>
              </div>

              <div className="rounded-2xl border border-ink-900/10 bg-white/90 p-8 shadow-soft">
                <h4 className="mb-6 font-display text-xl text-ink-900">Что получает роль</h4>
                <ul className="space-y-4">
                  {activeContent.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" strokeWidth={2.2} />
                      <span className="text-sm leading-relaxed text-ink-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
