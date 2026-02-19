'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ChevronDown, Building2, Users, TrendingUp } from 'lucide-react'

const faqCategories = [
  {
    id: 'developers',
    icon: Building2,
    label: 'Застройщикам',
    questions: [
      {
        q: 'Сколько стоит разместить объекты?',
        a: 'Размещение бесплатное. Мы берем комиссию 0.5-1% только с закрытых сделок. Если сделок нет — платить не нужно.',
      },
      {
        q: 'Как работают QR-коды?',
        a: 'Мы генерируем уникальный QR-код для каждого объекта. Вы распечатываете его и размещаете на объекте (табличка, стенд). Когда клиент сканирует — он привязывается к этому объекту и риэлтору навсегда.',
      },
      {
        q: 'Можно ли интегрировать с нашей CRM?',
        a: 'Да, у нас есть API для выгрузки данных о сделках. Также можем настроить кастомную интеграцию (в тарифе Enterprise).',
      },
    ],
  },
  {
    id: 'agencies',
    icon: Users,
    label: 'Агентствам',
    questions: [
      {
        q: 'Как мы получим клиентов, если платформа новая?',
        a: 'У нас уже 40 застройщиков-партнеров с 2,500 объектами. Клиенты приходят через них. Плюс ваши риэлторы сами приводят клиентов через QR-коды.',
      },
      {
        q: 'Можно ли начать бесплатно?',
        a: 'Да, тариф Starter бесплатный для до 3 риэлторов. Можете протестировать платформу без рисков.',
      },
      {
        q: 'Как происходит выплата комиссий?',
        a: 'Комиссии выплачиваются автоматически после закрытия сделки. Деньги поступают на счет агентства в течение 3 рабочих дней.',
      },
    ],
  },
  {
    id: 'investors',
    icon: TrendingUp,
    label: 'Инвесторам',
    questions: [
      {
        q: 'Почему вы, а не ЦИАН или Avito?',
        a: 'ЦИАН и Avito — это доски объявлений. Они заканчиваются на моменте контакта. Мы ведем сделку до конца и зарабатываем на самой сделке, а не на рекламе.',
      },
      {
        q: 'В чем барьер для конкурентов?',
        a: '(1) Сетевой эффект: чем больше риэлторов, тем больше застройщиков хотят подключиться, и наоборот. (2) QR-технология создает lock-in для клиента. (3) Интеграции с банками и партнерами требуют времени.',
      },
      {
        q: 'Какие риски?',
        a: 'Основной риск — медленное привлечение застройщиков. Мы снижаем его через freemium-модель и сильную команду продаж.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={false}
      className="border-b border-surface-400 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <span className="font-heading font-medium text-ink-800 group-hover:text-accent-600 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-accent-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-ink-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
  const currentCategory = faqCategories.find((cat) => cat.id === activeCategory)!

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container size="narrow" className="relative z-10">
        <SectionHeading
          badge="FAQ"
          title="Часто задаваемые вопросы"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-5 py-3 font-heading font-medium text-sm uppercase tracking-wider
                transition-all duration-300 border
                ${activeCategory === category.id
                  ? 'bg-accent-50 border-accent-400 text-accent-700'
                  : 'bg-surface-50 border-surface-400 text-ink-500 hover:border-accent-400/50 hover:text-ink-700'
                }
              `}
            >
              <category.icon className="w-4 h-4" strokeWidth={1.5} />
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-50 border border-surface-400 px-6 md:px-8 shadow-soft"
          >
            {currentCategory.questions.map((item, index) => (
              <FAQItem key={index} question={item.q} answer={item.a} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
