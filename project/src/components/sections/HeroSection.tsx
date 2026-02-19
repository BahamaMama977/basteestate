'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { PlaceholderImage } from '../ui/PlaceholderImage'
import { ArrowRight, Download, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient background - Light theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-100 via-surface-200 to-surface-100" />

        {/* Animated glow orbs - softer for light theme */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="glow-orb w-[600px] h-[600px] -top-1/4 -right-1/4"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="glow-orb w-[400px] h-[400px] bottom-1/4 -left-1/4"
        />

        {/* Geometric pattern */}
        <div className="absolute inset-0 geo-pattern opacity-40" />

        {/* Grid lines - subtle for light theme */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(37, 99, 235, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(37, 99, 235, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-accent-50 border border-accent-300/50 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-xs font-accent font-medium text-accent-700 uppercase tracking-wider">
                PropTech Платформа
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-display-lg xl:text-display-xl text-ink-900 mb-6"
            >
              Цифровая экосистема{' '}
              <span className="text-accent-gradient">сделок</span>{' '}
              с загородной недвижимостью
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-500 mb-10 max-w-xl leading-relaxed"
            >
              Полный цикл сделки от первого показа до получения ключей.{' '}
              <span className="text-ink-700 font-medium">Прозрачность, автоматизация, выгода</span>{' '}
              для каждого участника.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button variant="primary" size="lg" icon={<Download size={18} />}>
                Презентация проекта
              </Button>
              <Button variant="secondary" size="lg" icon={<Users size={18} />}>
                Стать партнером
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-accent-500" />
                <div>
                  <div className="text-2xl font-display text-ink-900">2,500+</div>
                  <div className="text-xs text-ink-500 uppercase tracking-wider">объектов</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-accent-500" />
                <div>
                  <div className="text-2xl font-display text-ink-900">150+</div>
                  <div className="text-xs text-ink-500 uppercase tracking-wider">риэлторов</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-accent-500" />
                <div>
                  <div className="text-2xl font-display text-ink-900">₽1.2 млрд</div>
                  <div className="text-xs text-ink-500 uppercase tracking-wider">GMV</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right content - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[120%] h-[120%] border border-accent-400/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[140%] h-[140%] border border-accent-400/10 rounded-full"
              />
            </div>

            {/* Phone mockup container */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto w-[280px] md:w-[320px]"
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
                    label="App Screenshot"
                    className="w-full"
                  />
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-surface-50/20 rounded-full" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -left-16 top-1/4 w-40 bg-surface-50 backdrop-blur-sm border border-surface-400 rounded-xl p-4 shadow-medium"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-accent-700 text-sm">QR</span>
                  </div>
                  <span className="text-xs text-ink-800 font-medium">Новое сканирование</span>
                </div>
                <p className="text-xs text-ink-500">Клиент привязан к объекту #2847</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -right-12 bottom-1/3 w-36 bg-surface-50 backdrop-blur-sm border border-surface-400 rounded-xl p-4 shadow-medium"
              >
                <div className="text-lg font-display text-accent-600 mb-1">+425,000 ₽</div>
                <p className="text-xs text-ink-500">Комиссия зачислена</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-accent-500/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
