'use client'

import { usePathname } from 'next/navigation'
import { roleItems } from '@/lib/site'

/** Активная роль: корень — только точное совпадение, остальные — по префиксу пути. */
function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname === ''
  return pathname.startsWith(href)
}

/**
 * Ролевой свитчер: сегмент-контрол четырёх конвейеров. Переключение — обычная
 * навигация (прямые ссылки и SEO сохраняются), высота вписана в шапку h-16:
 * от неё зависит `sticky top-24` панелей конвейеров.
 */
export function RoleSwitcher() {
  const pathname = usePathname() ?? '/'

  return (
    <div className="flex items-center rounded-full border border-white/[0.1] bg-white/[0.06] p-1">
      {roleItems.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-full px-3.5 py-2 text-xs font-medium tracking-[0.02em] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              active
                ? 'bg-limestone-50 text-pine-950'
                : 'text-limestone-200 hover:text-white'
            }`}
          >
            {item.label}
          </a>
        )
      })}
    </div>
  )
}
