import { Apple, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteLinks } from '@/lib/site'

interface AppStoreButtonsProps {
  light?: boolean
  className?: string
}

export function AppStoreButtons({ light = false, className }: AppStoreButtonsProps) {
  const base = cn(
    'group inline-flex min-h-14 items-center gap-3 rounded-2xl px-5 py-3',
    'transition-[color,background-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:ring-offset-2',
    light
      ? 'bg-limestone-50 text-pine-950 hover:bg-white'
      : 'bg-app-brand text-white shadow-green-glow hover:bg-clay-600'
  )

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a href={siteLinks.appStore} className={base} aria-label="Скачать приложение в App Store">
        <Apple className="h-6 w-6" strokeWidth={1.35} aria-hidden="true" />
        <span className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-[0.16em] opacity-60">Скачать в</span>
          <span className="mt-1 block text-base font-semibold">App Store</span>
        </span>
      </a>
      <a href={siteLinks.googlePlay} className={base} aria-label="Скачать приложение в Google Play">
        <Play className="h-5 w-5" strokeWidth={1.35} aria-hidden="true" />
        <span className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-[0.16em] opacity-60">Доступно в</span>
          <span className="mt-1 block text-base font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  )
}
