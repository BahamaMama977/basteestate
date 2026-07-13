'use client'

import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

interface PlaceholderImageProps {
  width?: number | string
  height?: number | string
  label?: string
  className?: string
  variant?: 'default' | 'phone' | 'avatar' | 'landscape' | 'document'
}

export function PlaceholderImage({
  width,
  height,
  label,
  className,
  variant = 'default',
}: PlaceholderImageProps) {
  const aspectRatios = {
    default: 'aspect-video',
    phone: 'aspect-[9/19]',
    avatar: 'aspect-square',
    landscape: 'aspect-[16/9]',
    document: 'aspect-[3/4]',
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-surface-300 to-surface-400',
        'border border-ink-900/10',
        aspectRatios[variant],
        className
      )}
      style={{ width, height }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 geo-pattern opacity-30" />

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent-500/30" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent-500/30" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent-500/30" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent-500/30" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-ink-400">
        <ImageIcon className="w-8 h-8" strokeWidth={1} />
        {label && (
          <span className="text-xs font-accent uppercase tracking-wider">{label}</span>
        )}
      </div>

      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-300/10 via-transparent to-transparent" />
    </div>
  )
}
