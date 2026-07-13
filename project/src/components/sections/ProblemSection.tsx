'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { AlertTriangle, Building2, Home, LineChart, MessageCircleOff, Users } from 'lucide-react'

const losses = [
  {
    icon: Home,
    role: 'Покупатель',
    title: 'Не видит, что происходит дальше',
    text: 'Объект найден на карте или в объявлении, вопросы уходят в мессенджеры, документы и этапы сделки остаются непрозрачными.',
  },
  {
    icon: Users,
    role: 'Риэлтор',
    title: 'Теряет контекст клиента',
    text: 'Заметки, звонки, подборки и напоминания живут отдельно, поэтому следующего действия часто нет в моменте.',
  },
  {
    icon: Building2,
    role: 'Застройщик',
    title: 'Не управляет интересом к объектам',
    text: 'Просмотры, чаты, ответственные, акции и сделки разнесены по разным системам, а эффективность показов трудно связать с продажей.',
  },
  {
    icon: LineChart,
    role: 'Инвестор',
    title: 'Не видит платформенной экономики',
    text: 'Одиночный каталог заканчивается на контакте. Ценность появляется там, где платформа ведет коммуникацию и фиксирует путь до сделки.',
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="relative overflow-hidden bg-surface-100 py-24 md:py-32">
      <div className="absolute inset-0 geo-pattern opacity-25" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Проблема"
          title="Сделка с недвижимостью распадается между инструментами"
          subtitle="Клиент ищет объект в одном месте, общается в другом, риэлтор ведет задачи в третьем, а застройщик получает неполную картину спроса."
        />

        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-ink-900/10 bg-ink-900 p-8 text-surface-50 shadow-medium md:p-10"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-accent-300/30 bg-accent-300/10 text-accent-200">
              <MessageCircleOff className="h-7 w-7" />
            </div>
            <h3 className="mb-4 font-display text-2xl md:text-3xl">
              Главная потеря — не лид, а единый контекст сделки
            </h3>
            <p className="leading-relaxed text-surface-300">
              Когда объект, клиент, переписка, задачи, ответственные, акции и документы не связаны между собой,
              каждый участник принимает решения по обрывкам информации.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {losses.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-ink-900/10 bg-white/90 p-6 shadow-soft"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-accent uppercase tracking-[0.16em] text-ink-500">{item.role}</span>
                </div>
                <h3 className="mb-3 font-display text-xl text-ink-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 rounded-xl border border-accent-400/25 bg-accent-50 p-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-accent-700" />
            <p className="max-w-3xl text-sm leading-relaxed text-ink-700">
              БАСТ закрывает этот разрыв: весь путь от интереса к объекту до этапов сделки остается в одном рабочем пространстве.
            </p>
          </div>
          <a href="#product" className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-800 hover:text-accent-600">
            Смотреть продукт
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
