'use client'

import { ArrowUpRight } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HomeButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'light' | 'outline' | 'text'
  className?: string
  external?: boolean
}

export function HomeButton({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: HomeButtonProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={cn(
        'group inline-flex min-h-12 items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold',
        'transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-[var(--ease-out)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand focus-visible:ring-offset-2',
        'active:scale-[0.97]',
        variant === 'primary' && 'bg-app-brand text-white shadow-green-glow hover:bg-clay-600',
        variant === 'light' && 'bg-limestone-50 text-pine-950 hover:bg-white',
        variant === 'outline' && 'border border-app-brand-border text-app-brand hover:bg-app-brand-soft',
        variant === 'text' && 'min-h-0 rounded-none px-0 py-1 underline decoration-current underline-offset-8',
        className
      )}
    >
      <span>{children}</span>
      {variant !== 'text' && (
        <span className={cn(
          'button-arrow flex h-8 w-8 items-center justify-center rounded-full',
          variant === 'primary' ? 'bg-white/15' : 'bg-app-brand-soft'
        )}>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.35} />
        </span>
      )}
    </a>
  )
}
