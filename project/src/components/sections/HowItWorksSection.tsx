'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  MapPinned,
  MessageSquare,
  QrCode,
  Send,
} from 'lucide-react'

const stages = [
  {
    icon: MapPinned,
    title: 'Клиент находит объект',
    subtitle: 'Карта, список, фильтры и карточка дома',
    description: 'Поиск начинается в приложении: клиент смотрит объекты на карте, сохраняет интересные варианты и возвращается к истории просмотров.',
    screenTitle: 'Карта объектов',
    screenItems: ['Дом 184 м²', 'Участок 9 соток', 'Ипотека доступна'],
  },
  {
    icon: Send,
    title: 'Риэлтор дает рекомендацию',
    subtitle: 'Подборка привязана к клиенту',
    description: 'Риэлтор отправляет объект или подборку в приложении, а клиент видит ее в одном месте вместе с вопросами и дальнейшими действиями.',
    screenTitle: 'Рекомендация',
    screenItems: ['3 объекта', 'Подходит под бюджет', 'Можно записаться на показ'],
  },
  {
    icon: MessageSquare,
    title: 'Обсуждение идет в чате',
    subtitle: 'Контекст не теряется между каналами',
    description: 'В чате остаются вопросы, планировки, условия акции, участники и объект, вокруг которого идет разговор.',
    screenTitle: 'Чат по объекту',
    screenItems: ['Планировки отправлены', 'Акция до 31 марта', 'Застройщик подключен'],
  },
  {
    icon: QrCode,
    title: 'QR закрепляет интерес',
    subtitle: 'Офлайн-показ попадает в цифровой контекст',
    description: 'После сканирования QR клиент связывается с объектом, риэлтором и командой. Все участники видят источник интереса.',
    screenTitle: 'QR-привязка',
    screenItems: ['Клиент закреплен', 'Объект определен', 'Риэлтор уведомлен'],
  },
  {
    icon: Bell,
    title: 'Сделка получает следующий шаг',
    subtitle: 'Этапы, участники и задачи собраны вместе',
    description: 'После старта сделки приложение показывает этап, ответственного, документы, напоминания и действие, которое нужно выполнить дальше.',
    screenTitle: 'Pipeline сделки',
    screenItems: ['Этап: документы', 'Ответственный назначен', 'Напоминание создано'],
  },
  {
    icon: Gift,
    title: 'Сделка завершается бонусами',
    subtitle: 'Результат виден всем участникам',
    description: 'Клиент получает сертификаты и предложения партнеров, риэлтор видит комиссию, застройщик — итоговую статистику по объекту.',
    screenTitle: 'Завершение',
    screenItems: ['Сертификат активен', 'Комиссия рассчитана', 'Статистика обновлена'],
  },
]

function StageScreen({ stage }: { stage: (typeof stages)[number] }) {
  return (
    <div className="mx-auto max-w-sm rounded-[2rem] border border-ink-900/10 bg-ink-900 p-3 shadow-elevated">
      <div className="overflow-hidden rounded-[1.5rem] bg-surface-50">
        <div className="border-b border-ink-900/10 px-5 py-4">
          <div className="text-xs font-accent uppercase tracking-[0.16em] text-accent-700">БАСТ</div>
          <div className="mt-1 font-display text-xl text-ink-900">{stage.screenTitle}</div>
        </div>
        <div className="p-5">
          <div className="mb-5 flex h-28 items-center justify-center rounded-xl border border-accent-300/30 bg-accent-50 text-accent-700">
            <stage.icon className="h-12 w-12" strokeWidth={1.4} />
          </div>

          <div className="space-y-3">
            {stage.screenItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3 py-3">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  index < 2 ? 'bg-accent-700 text-white' : 'bg-accent-50 text-accent-700'
                }`}>
                  {index < 2 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                </span>
                <span className="text-sm text-ink-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const [activeStage, setActiveStage] = useState(0)
  const currentStage = stages[activeStage]

  const goToNext = () => {
    setActiveStage((prev) => (prev + 1) % stages.length)
  }

  const goToPrev = () => {
    setActiveStage((prev) => (prev - 1 + stages.length) % stages.length)
  }

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-surface-100 py-24 md:py-32">
      <div className="absolute inset-0 geo-pattern opacity-20" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Сценарий"
          title="Путь сделки виден от первого интереса до результата"
          subtitle="Каждый шаг сохраняет связь между объектом, клиентом, участниками и следующим действием."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3 }}
              >
                <StageScreen stage={currentStage} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-2">
              {stages.map((stage, index) => (
                <button
                  key={stage.title}
                  onClick={() => setActiveStage(index)}
                  aria-label={`Показать этап ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeStage === index ? 'w-8 bg-accent-700' : 'w-2 bg-accent-300 hover:bg-accent-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={goToPrev}
                aria-label="Предыдущий этап"
                className="rounded-md border border-ink-900/10 bg-white/80 p-2 text-accent-700 transition-all hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <span className="text-sm font-accent uppercase tracking-[0.16em] text-accent-700">
                Этап {activeStage + 1} из {stages.length}
              </span>

              <button
                onClick={goToNext}
                aria-label="Следующий этап"
                className="rounded-md border border-ink-900/10 bg-white/80 p-2 text-accent-700 transition-all hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-accent-300/35 bg-accent-50 text-accent-700">
                  <currentStage.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-display text-3xl text-ink-900 md:text-4xl">
                  {currentStage.title}
                </h3>
                <p className="mb-6 text-lg text-accent-700">{currentStage.subtitle}</p>
                <p className="mb-8 max-w-2xl leading-relaxed text-ink-600">{currentStage.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="h-1 overflow-hidden rounded-full bg-surface-300">
              <motion.div
                animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
                transition={{ duration: 0.35 }}
                className="h-full bg-accent-700"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
