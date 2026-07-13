'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Above-the-fold content is visible immediately and does not wait for hydration. */
  immediate?: boolean
}

/** Fade-up при появлении в вьюпорте. Только transform/opacity; reduced-motion — без анимации. */
export function Reveal({ children, className, delay = 0, immediate = false }: RevealProps) {
  const reduced = useReducedMotion()
  const shouldAnimate = !reduced && !immediate

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0.72, transform: 'translateY(8px)' } : false}
      whileInView={shouldAnimate ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.22, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn('min-w-0', className)}
    >
      {children}
    </motion.div>
  )
}
