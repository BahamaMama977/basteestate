'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-8 lg:px-12',
        size === 'default' && 'max-w-7xl',
        size === 'wide' && 'max-w-[1600px]',
        size === 'narrow' && 'max-w-4xl',
        className
      )}
    >
      {children}
    </div>
  )
}
