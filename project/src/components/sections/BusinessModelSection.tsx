'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { ArrowRight, BarChart3, Download, FileSpreadsheet, Handshake, Layers3, Network, Repeat2, WalletCards } from 'lucide-react'

const thesis = [
  {
    icon: Layers3,
    title: 'Не доска объявлений',
    text: 'Каталог заканчивается на контакте. БАСТ идет дальше: связывает объект, клиента, чат, этапы сделки и результат.',
  },
  {
    icon: Repeat2,
    title: 'Ежедневная B2B-польза',
    text: 'Риэлтор и застройщик возвращаются в продукт из-за клиентов, задач, напоминаний, чатов, сделок и статистики.',
  },
  {
    icon: Network,
    title: 'Сетевой эффект',
    text: 'Больше объектов привлекает риэлторов и покупателей. Больше активных сделок делает платформу ценнее для застройщиков и партнеров.',
  },
  {
    icon: BarChart3,
    title: 'Данные по сделкам',
    text: 'Каждый сценарий накапливает сигналы: интерес к объектам, источники рекомендаций, статусы, участников и конверсию.',
  },
]

const revenue = [
  'Подписки для риэлторов, агентств и команд',
  'CRM-тарифы и аналитика для застройщиков',
  'Продвижение объектов, акций и партнерских предложений',
  'Комиссии за ипотеку, страхование, юридическое сопровождение и сервисы сделки',
  'Сопровождение свободных сделок командой БАСТ',
]

const investorMetrics = [
  { value: '2 500', label: 'объектов в базе' },
  { value: '150+', label: 'риэлторов' },
  { value: '40', label: 'застройщиков' },
  { value: '1,2 млрд ₽', label: 'GMV' },
]

const metricsToShow = [
  'Активные сделки и конверсия из обращения в сделку',
  'Retention профессиональных пользователей',
  'Среднее число клиентов на одного риэлтора',
  'CAC, LTV и окупаемость привлечения',
  'География запуска и план масштабирования',
]

export function BusinessModelSection() {
  return (
    <section id="investors" className="relative overflow-hidden bg-ink-950 py-24 text-surface-50 md:py-32">
      <div className="absolute inset-0 finance-grid opacity-50" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Инвесторам"
          title="Платформа сделок, а не одиночный каталог"
          subtitle="БАСТ соединяет спрос, профессиональные рабочие процессы и данные по сделкам. На этом строится B2B-монетизация и масштабирование."
          className="[&_h2]:text-surface-50 [&_p]:text-surface-300"
        />

        <div className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {thesis.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-surface-50/10 bg-surface-50/8 p-6 backdrop-blur-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-accent-300/30 bg-accent-300/10 text-accent-200">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-display text-xl text-surface-50">{item.title}</h3>
              <p className="text-sm leading-relaxed text-surface-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-surface-50/10 bg-surface-50/8 p-8 backdrop-blur-sm md:p-10"
          >
            <div className="mb-6 flex items-center gap-3">
              <WalletCards className="h-6 w-6 text-accent-300" />
              <h3 className="font-display text-2xl text-surface-50">Монетизация</h3>
            </div>
            <ul className="space-y-4">
              {revenue.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                  <span className="text-sm leading-relaxed text-surface-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-surface-50/10 bg-surface-50 p-8 text-ink-900 shadow-elevated md:p-10"
          >
            <div className="mb-8 grid grid-cols-2 gap-4">
              {investorMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-ink-900/10 bg-surface-100 p-5">
                  <div className="font-display text-3xl text-accent-800">{metric.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-500">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-6 flex items-center gap-3">
              <Handshake className="h-6 w-6 text-accent-700" />
              <h3 className="font-display text-2xl text-ink-900">Что важно раскрывать инвестору</h3>
            </div>
            <ul className="space-y-3">
              {metricsToShow.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-ink-600">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="#cta" variant="primary" icon={<Download size={18} />}>
            Скачать pitch deck
          </Button>
          <Button href="#cta" variant="secondary" className="border-surface-50/25 bg-surface-50/10 text-surface-50 hover:bg-surface-50 hover:text-ink-900" icon={<FileSpreadsheet size={18} />}>
            Запросить финмодель
          </Button>
        </div>
      </Container>
    </section>
  )
}
