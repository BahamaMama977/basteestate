'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  Gift,
  Heart,
  MapPinned,
  MessageSquare,
  QrCode,
  UserRoundCheck,
} from 'lucide-react'

const modules = [
  {
    icon: MapPinned,
    title: 'Карта и каталог',
    text: 'Объекты можно искать на карте, сравнивать в списке и открывать карточки с деталями.',
  },
  {
    icon: Heart,
    title: 'Избранное и история',
    text: 'Клиент сохраняет варианты, а риэлтор видит интерес и может вернуться к нужному объекту.',
  },
  {
    icon: MessageSquare,
    title: 'Чаты по объектам',
    text: 'Обсуждение привязано к объекту, клиенту и участникам сделки, а не теряется в мессенджерах.',
  },
  {
    icon: UserRoundCheck,
    title: 'Клиенты и рекомендации',
    text: 'Риэлтор ведет клиентов, отправляет подборки и сохраняет историю взаимодействий.',
  },
  {
    icon: ClipboardList,
    title: 'Сделки и этапы',
    text: 'У сделки есть участники, статусы, следующее действие, задачи и контроль прогресса.',
  },
  {
    icon: Bell,
    title: 'Напоминания',
    text: 'Приложение подсказывает, когда позвонить, отправить документы или вернуться к клиенту.',
  },
  {
    icon: Building2,
    title: 'Объявления и команда',
    text: 'Застройщик управляет объектами, сотрудниками, ответственными и связанными сделками.',
  },
  {
    icon: BarChart3,
    title: 'Статистика объектов',
    text: 'Просмотры, интерес, чаты и сделки дают понятную картину спроса по каждому объекту.',
  },
  {
    icon: Gift,
    title: 'Акции и бонусы',
    text: 'Скидки, сертификаты, партнерские предложения и реферальные сценарии работают внутри сделки.',
  },
]

const workspaceColumns = [
  {
    title: 'Объект',
    items: ['Дом 184 м²', 'Карта', 'Акция: отделка'],
  },
  {
    title: 'Клиент',
    items: ['Анна Смирнова', 'Избранное: 6', 'Чат активен'],
  },
  {
    title: 'Сделка',
    items: ['Документы', 'Ответственный', 'Следующий шаг'],
  },
]

export function SolutionSection() {
  return (
    <section id="product" className="relative overflow-hidden bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Продукт"
          title="Единое рабочее пространство сделки"
          subtitle="БАСТ соединяет поиск, коммуникацию, CRM и pipeline сделки, чтобы каждый участник видел один и тот же контекст."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl border border-ink-900/10 bg-white/90 p-5 shadow-medium md:p-8"
        >
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="p-3 md:p-5">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-accent-50 px-3 py-1 text-xs font-accent uppercase tracking-[0.16em] text-accent-800">
                <QrCode className="h-4 w-4" />
                QR — один из механизмов закрепления
              </div>
              <h3 className="mb-4 font-display text-2xl text-ink-900 md:text-3xl">
                Не просто объявление, а связка «объект → клиент → чат → сделка»
              </h3>
              <p className="leading-relaxed text-ink-600">
                QR помогает связать офлайн-показ с цифровым контекстом. Но ценность БАСТ шире:
                приложение хранит путь клиента, действия команды и состояние сделки в одной системе.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workspaceColumns.map((column, index) => (
                <div key={column.title} className="rounded-xl border border-ink-900/10 bg-surface-100 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="font-display text-lg text-ink-900">{column.title}</h4>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-700 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {column.items.map((item) => (
                      <div key={item} className="rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-sm text-ink-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-xl border border-ink-900/10 bg-white/90 p-6 shadow-soft transition-all duration-300 hover:border-accent-400/45 hover:shadow-medium"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                <module.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-display text-xl text-ink-900">{module.title}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{module.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
