'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Heart,
  Home,
  MapPinned,
  MessageSquare,
  Search,
  Users,
} from 'lucide-react'

const metrics = [
  { value: '2 500', label: 'объектов в базе' },
  { value: '150+', label: 'риэлторов' },
  { value: '40', label: 'застройщиков' },
  { value: '1,2 млрд ₽', label: 'GMV' },
]

const productScreens = [
  {
    title: 'Карта',
    subtitle: 'Объекты рядом с клиентом',
    icon: MapPinned,
  },
  {
    title: 'Чат',
    subtitle: 'Риэлтор, клиент и объект',
    icon: MessageSquare,
  },
  {
    title: 'Сделка',
    subtitle: 'Этапы, задачи, участники',
    icon: ClipboardCheck,
  },
]

function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-[560px]">
      <div className="absolute -inset-4 rounded-[2rem] border border-surface-50/10" />
      <div className="relative rounded-[2rem] border border-surface-50/15 bg-surface-50/8 p-4 shadow-elevated backdrop-blur-md">
        <div className="rounded-[1.4rem] border border-surface-50/10 bg-surface-50 text-ink-900 shadow-medium">
          <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
            <div>
              <div className="text-xs font-accent uppercase text-accent-700">БАСТ</div>
              <div className="text-sm font-semibold">Рабочее пространство сделки</div>
            </div>
            <div className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800">
              Активна
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-xl border border-ink-900/10 bg-surface-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-ink-500">Подборка клиента</div>
                  <div className="font-display text-xl">Дом у леса, 184 м²</div>
                </div>
                <Heart className="h-5 w-5 text-accent-600" />
              </div>

              <div className="relative mb-4 h-40 overflow-hidden rounded-lg border border-ink-900/10 bg-[#dce8ef]">
                <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(7,18,14,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,18,14,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="absolute left-8 top-7 h-16 w-24 rounded-lg border border-white/80 bg-white/70 shadow-soft" />
                <div className="absolute right-10 top-10 h-20 w-28 rounded-lg border border-white/80 bg-white/70 shadow-soft" />
                <div className="absolute bottom-8 left-28 h-12 w-20 rounded-lg border border-white/80 bg-white/70 shadow-soft" />
                <div className="absolute left-[48%] top-[42%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-700 text-white shadow-medium">
                  <MapPinned className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {productScreens.map((screen) => (
                  <div key={screen.title} className="rounded-lg border border-ink-900/10 bg-white p-3">
                    <screen.icon className="mb-3 h-4 w-4 text-accent-600" />
                    <div className="text-sm font-semibold">{screen.title}</div>
                    <div className="mt-1 text-[11px] leading-snug text-ink-500">{screen.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-ink-900/10 bg-white p-4 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Анна Смирнова</div>
                    <div className="text-xs text-ink-500">Клиент закреплен</div>
                  </div>
                </div>
                <div className="rounded-lg bg-surface-100 p-3 text-xs leading-relaxed text-ink-600">
                  «Нужны планировки и условия акции по отделке».
                </div>
              </div>

              <div className="rounded-xl border border-ink-900/10 bg-ink-900 p-4 text-surface-50 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-surface-400">Сделка #2847</div>
                    <div className="font-semibold">Документы</div>
                  </div>
                  <ClipboardCheck className="h-5 w-5 text-accent-400" />
                </div>
                <div className="space-y-3">
                  {['Показ', 'Обсуждение', 'Документы', 'Договор'].map((stage, index) => (
                    <div key={stage} className="flex items-center gap-3">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        index < 3 ? 'border-accent-400 bg-accent-500 text-white' : 'border-surface-50/20'
                      }`}>
                        {index < 3 && <CheckCircle2 className="h-3 w-3" />}
                      </span>
                      <span className="text-xs text-surface-200">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-ink-900/10 bg-white p-4">
                  <Bell className="mb-2 h-4 w-4 text-accent-600" />
                  <div className="text-xs text-ink-500">Следующее действие</div>
                  <div className="text-sm font-semibold">Позвонить сегодня</div>
                </div>
                <div className="rounded-xl border border-ink-900/10 bg-white p-4">
                  <Building2 className="mb-2 h-4 w-4 text-accent-600" />
                  <div className="text-xs text-ink-500">Ответственный</div>
                  <div className="text-sm font-semibold">Застройщик</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink-950 pt-28 text-surface-50">
      <div className="absolute inset-0 finance-grid opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-100 to-transparent" />

      <Container className="relative z-10 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-surface-50/15 bg-surface-50/8 px-4 py-2 text-xs font-accent font-medium uppercase tracking-[0.18em] text-accent-100"
            >
              <Search className="h-4 w-4" />
              PropTech-приложение для сделки
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl font-display text-4xl leading-tight md:text-6xl lg:text-display-lg xl:text-display-xl"
            >
              БАСТ Недвижимость
              <span className="mt-3 block text-accent-300">поиск дома сразу превращается в сделку</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-surface-300 md:text-xl"
            >
              Каталог, карта, избранное, чаты, клиенты, задачи, этапы сделки, акции и бонусы собраны
              в одном приложении для покупателей, риэлторов и застройщиков.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="#cta" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                Запросить демо
              </Button>
              <Button href="#investors" variant="secondary" size="lg" className="border-surface-50/25 bg-surface-50/10 text-surface-50 hover:bg-surface-50 hover:text-ink-900">
                Для инвесторов
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="border-l border-accent-300/50 pl-4">
                  <div className="font-display text-2xl text-surface-50 md:text-3xl">{metric.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-surface-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <ProductPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
