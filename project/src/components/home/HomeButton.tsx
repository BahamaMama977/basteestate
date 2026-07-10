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
        'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:ring-offset-2',
        'active:scale-[0.98]',
        variant === 'primary' && 'bg-pine-950 text-limestone-50 hover:bg-pine-800',
        variant === 'light' && 'bg-limestone-50 text-pine-950 hover:bg-white',
        variant === 'outline' && 'border border-pine-950/20 hover:bg-pine-950/5',
        variant === 'text' && 'min-h-0 rounded-none px-0 py-1 underline decoration-current underline-offset-8',
        className
      )}
    >
      <span>{children}</span>
      {variant !== 'text' && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay-500/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.35} />
        </span>
      )}
    </a>
  )
}
