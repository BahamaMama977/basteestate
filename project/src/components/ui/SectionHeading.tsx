'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'center',
  children,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'mb-16 md:mb-20',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block mb-6 rounded-full border border-accent-500/25 bg-accent-50 px-4 py-1.5 text-xs font-accent font-medium uppercase tracking-[0.18em]
                     text-accent-800"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-ink-900 mb-6 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-ink-500 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  )
}
