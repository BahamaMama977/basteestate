'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'lg' | 'sm'
  className?: string
  onClick?: () => void
  href?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  className,
  onClick,
  href,
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center gap-3 font-heading font-semibold uppercase tracking-wider',
    'overflow-hidden transition-all duration-300 cursor-pointer',
    // Size variants
    size === 'default' && 'px-8 py-4 text-sm',
    size === 'lg' && 'px-10 py-5 text-base',
    size === 'sm' && 'px-6 py-3 text-xs',
    // Style variants - Light theme
    variant === 'primary' && [
      'bg-ink-900 text-surface-50',
      'hover:bg-ink-800 hover:shadow-elevated',
      'active:scale-[0.98]',
    ],
    variant === 'secondary' && [
      'border border-ink-200 text-ink-800 bg-transparent',
      'hover:border-accent-500 hover:text-accent-700 hover:bg-accent-50',
      'active:scale-[0.98]',
    ],
    variant === 'ghost' && [
      'text-ink-700 bg-transparent',
      'hover:text-accent-600',
    ],
    className
  )

  const content = (
    <>
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-accent-shimmer bg-[length:200%_100%] animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && (
        <span className="relative z-10">{icon}</span>
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && (
        <span className="relative z-10">{icon}</span>
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
