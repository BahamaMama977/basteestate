import type { ReactNode } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'

/**
 * Достоверная «рамка телефона» под макеты экранов приложения «БАСТ».
 * Экран внутри — на реальной палитре приложения (белые поверхности, зелёный «доверия»).
 */
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[372px] ${className}`}>
      <div className="relative rounded-[3rem] bg-[#0B0E12] p-3 shadow-[0_50px_130px_-30px_rgba(11,23,18,0.65)] ring-1 ring-inset ring-white/10">
        <div className="relative flex aspect-[9/19.3] flex-col overflow-hidden rounded-[2.35rem] bg-app-bg">
          {/* Статус-бар iOS */}
          <div className="relative z-30 flex shrink-0 items-center justify-between px-7 pt-3.5 text-app-ink">
            <span className="text-[13px] font-semibold tracking-tight">9:41</span>
            <div className="absolute left-1/2 top-2.5 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center gap-1.5">
              <Signal className="h-3.5 w-3.5" strokeWidth={2.25} />
              <Wifi className="h-3.5 w-3.5" strokeWidth={2.25} />
              <BatteryFull className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Экран приложения */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>

          {/* Домашний индикатор */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center pb-2">
            <div className="h-1 w-32 rounded-full bg-app-ink/25" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { demo } from '@/lib/demo-deal'
