import { Apple } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteLinks } from '@/lib/site'

interface AppStoreButtonsProps {
  light?: boolean
  className?: string
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path d="M3.7 2.7 13.9 12 3.7 21.3c-.45-.4-.7-1-.7-1.7V4.4c0-.7.25-1.3.7-1.7Z" fill="#34A853" />
      <path d="m13.9 12 3.15-2.87 3.75 2.12c1.1.62 1.1 1.88 0 2.5l-3.75 2.12L13.9 12Z" fill="#FBBC04" />
      <path d="M3.7 2.7c.5-.43 1.2-.47 1.85-.1l11.5 6.53L13.9 12 3.7 2.7Z" fill="#4285F4" />
      <path d="m13.9 12 3.15 3.87-11.5 6.53c-.65.37-1.35.33-1.85-.1L13.9 12Z" fill="#EA4335" />
    </svg>
  )
}

export function AppStoreButtons({ light = false, className }: AppStoreButtonsProps) {
  const base = cn(
    'group inline-flex min-h-14 items-center gap-2.5 rounded-2xl px-5 py-3',
    'transition-[color,background-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:ring-offset-2',
    light
      ? 'bg-limestone-50 text-pine-950 hover:bg-white'
      : 'bg-app-brand text-white shadow-green-glow hover:bg-clay-600'
  )

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <a href={siteLinks.appStore} className={base} aria-label="Скачать приложение в App Store">
        <Apple className="h-6 w-6 fill-current" strokeWidth={1.15} aria-hidden="true" />
        <span className="text-base font-semibold leading-none">App Store</span>
      </a>
      <a href={siteLinks.googlePlay} className={base} aria-label="Скачать приложение в Google Play">
        <GooglePlayIcon />
        <span className="text-base font-semibold leading-none">Google Play</span>
      </a>
    </div>
  )
}
