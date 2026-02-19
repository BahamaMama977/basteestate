'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { PlaceholderImage } from '../ui/PlaceholderImage'
import { QrCode, MessageSquare, Play, FileCheck, Gift, ChevronLeft, ChevronRight } from 'lucide-react'

const stages = [
  {
    id: 1,
    icon: QrCode,
    title: 'Офлайн-показ',
    subtitle: 'Клиент сканирует QR на объекте',
    description: 'Риэлтор проводит показ. Клиент достает телефон и сканирует QR-код на объекте. Мгновенно получает уведомление о привязке к риэлтору.',
    mockupLabel: 'QR Сканирование',
    notification: 'Вы привязаны к риэлтору Иван Петров',
  },
  {
    id: 2,
    icon: MessageSquare,
    title: 'Коммуникация',
    subtitle: 'Общение в едином чате',
    description: 'Вся переписка в одном месте. Риэлтор отправляет планировки, клиент задает вопросы, застройщик видит историю общения.',
    mockupLabel: 'Чат приложения',
    notification: 'Новое сообщение от риэлтора',
  },
  {
    id: 3,
    icon: Play,
    title: 'Начало сделки',
    subtitle: 'Один тап — и сделка запущена',
    description: 'Клиент нажимает кнопку "Начать сделку". Все участники получают уведомления. Запускается прогресс-бар с 4 этапами.',
    mockupLabel: 'Начало сделки',
    notification: 'Сделка #2847 запущена!',
  },
  {
    id: 4,
    icon: FileCheck,
    title: 'Документы',
    subtitle: 'Чек-лист и проверка',
    description: 'Загрузка документов по списку. Автоматическая проверка. Все участники видят статус готовности.',
    mockupLabel: 'Документы',
    notification: 'Паспорт загружен и проверен',
  },
  {
    id: 5,
    icon: Gift,
    title: 'Завершение',
    subtitle: 'Поздравления и бонусы',
    description: 'Сделка закрыта! Покупатель получает сертификаты от партнеров. Риэлтор видит комиссию на счете.',
    mockupLabel: 'Завершение сделки',
    notification: 'Комиссия 425,000 ₽ зачислена',
  },
]

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
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-100" />
      <div className="absolute inset-0 geo-pattern opacity-20" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-200/30 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Демонстрация"
          title="Весь цикл сделки — наглядно"
          subtitle="Интерактивная демонстрация работы платформы от первого контакта до получения ключей"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Phone mockup */}
          <div className="relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative mx-auto w-[280px] md:w-[300px]"
              >
                {/* Phone frame */}
                <div className="relative bg-ink-800 rounded-[3rem] p-3 shadow-elevated border border-ink-700">
                  {/* Screen */}
                  <div className="relative bg-ink-900 rounded-[2.5rem] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-ink-800 rounded-b-2xl z-10" />

                    {/* Screen content placeholder */}
                    <PlaceholderImage
                      variant="phone"
                      label={currentStage.mockupLabel}
                      className="w-full"
                    />
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-surface-50/20 rounded-full" />
                </div>

                {/* Notification popup */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -right-4 top-24 w-48 bg-surface-50 backdrop-blur-sm border border-surface-400 rounded-xl p-4 shadow-medium"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center">
                      <currentStage.icon className="w-3 h-3 text-accent-600" />
                    </div>
                    <span className="text-xs text-ink-800 font-medium">БАСТ</span>
                  </div>
                  <p className="text-xs text-ink-600">{currentStage.notification}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Stage indicator dots */}
            <div className="flex justify-center gap-2 mt-8">
              {stages.map((stage, index) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeStage
                      ? 'w-8 bg-accent-500'
                      : 'bg-accent-400/30 hover:bg-accent-400/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            {/* Stage navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={goToPrev}
                className="p-2 border border-surface-400 hover:border-accent-400 hover:bg-accent-50 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-accent-600" />
              </button>

              <div className="flex items-center gap-4">
                <span className="text-sm font-accent text-accent-700">
                  Этап {activeStage + 1} из {stages.length}
                </span>
              </div>

              <button
                onClick={goToNext}
                className="p-2 border border-surface-400 hover:border-accent-400 hover:bg-accent-50 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-accent-600" />
              </button>
            </div>

            {/* Stage content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-accent-50 border border-accent-300/30 flex items-center justify-center">
                  <currentStage.icon className="w-8 h-8 text-accent-600" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl text-ink-900 mb-2">
                  {currentStage.title}
                </h3>
                <p className="text-lg text-accent-600 mb-6">
                  {currentStage.subtitle}
                </p>

                {/* Description */}
                <p className="text-ink-600 leading-relaxed mb-8">
                  {currentStage.description}
                </p>

                {/* Progress bar */}
                <div className="h-1 bg-surface-300 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-accent-500 to-accent-400"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
