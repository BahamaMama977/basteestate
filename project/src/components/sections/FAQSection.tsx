'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { ChevronDown, Building2, Home, TrendingUp, Users } from 'lucide-react'

const faqCategories = [
  {
    id: 'buyers',
    icon: Home,
    label: 'Покупателям',
    questions: [
      {
        q: 'Можно ли использовать БАСТ просто для поиска дома?',
        a: 'Да. Клиент может смотреть объекты на карте, сохранять избранное, получать рекомендации и общаться с риэлтором в приложении.',
      },
      {
        q: 'Что видно по сделке?',
        a: 'В приложении можно видеть участников, текущий этап, задачи, напоминания и следующее действие. Это снижает зависимость от разрозненных звонков и переписок.',
      },
    ],
  },
  {
    id: 'realtors',
    icon: Users,
    label: 'Риэлторам',
    questions: [
      {
        q: 'Чем БАСТ отличается от обычной CRM?',
        a: 'CRM часто живет отдельно от клиента и объекта. В БАСТ клиент, объект, чат, рекомендации, задачи и сделка связаны в одном мобильном сценарии.',
      },
      {
        q: 'Как не потерять клиента после показа?',
        a: 'Клиент остается в цифровом контексте: объект, чат, рекомендации и следующий шаг доступны в приложении. QR помогает закрепить офлайн-показ за объектом и риэлтором.',
      },
      {
        q: 'Можно ли вести задачи и напоминания?',
        a: 'Да. Риэлтор может создавать напоминания по клиентам и сделкам, чтобы возвращаться к следующему действию вовремя.',
      },
    ],
  },
  {
    id: 'developers',
    icon: Building2,
    label: 'Застройщикам',
    questions: [
      {
        q: 'Что получает застройщик?',
        a: 'Застройщик управляет объявлениями, видит интерес к объектам, связанные чаты и сделки, назначает сотрудников и запускает акции.',
      },
      {
        q: 'Зачем нужны QR-коды?',
        a: 'QR связывает офлайн-показ с цифровой сделкой: клиент, объект и риэлтор фиксируются в системе, а команда видит источник интереса.',
      },
      {
        q: 'Можно ли подключить сотрудников?',
        a: 'Да. В продуктовой модели предусмотрены команды, роли и назначение ответственных по объектам и сделкам.',
      },
    ],
  },
  {
    id: 'investors',
    icon: TrendingUp,
    label: 'Инвесторам',
    questions: [
      {
        q: 'Почему это не просто еще один каталог недвижимости?',
        a: 'Каталог обычно заканчивается на контакте. БАСТ ведет процесс дальше: коммуникация, задачи, этапы сделки, бонусы и данные по результату остаются внутри платформы.',
      },
      {
        q: 'Где появляется сетевой эффект?',
        a: 'Больше объектов повышает ценность для риэлторов и покупателей. Больше сделок и пользователей делает платформу полезнее для застройщиков, банков и партнерских сервисов.',
      },
      {
        q: 'Какие метрики важны для оценки роста?',
        a: 'Количество объектов, активные сделки, retention профессиональных пользователей, конверсия обращения в сделку, CAC, LTV и география запуска.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div initial={false} className="border-b border-ink-900/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-heading font-medium text-ink-800 transition-colors group-hover:text-accent-700">
          {question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className="h-5 w-5 text-accent-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-ink-600">{answer}</p>
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
    <section id="faq" className="relative overflow-hidden bg-gradient-to-b from-surface-200 via-surface-100 to-surface-200 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <Container size="narrow" className="relative z-10">
        <SectionHeading
          badge="FAQ"
          title="Вопросы по продукту, партнерам и инвестициям"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-heading font-medium uppercase tracking-[0.12em]
                transition-all duration-300
                ${activeCategory === category.id
                  ? 'border-accent-700 bg-accent-800 text-surface-50'
                  : 'border-ink-900/10 bg-white/80 text-ink-500 hover:border-accent-400/50 hover:text-ink-700'
                }
              `}
            >
              <category.icon className="h-4 w-4" strokeWidth={1.5} />
              {category.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-ink-900/10 bg-white/90 px-6 shadow-soft md:px-8"
          >
            {currentCategory.questions.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
