'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AppStoreButtons } from './home/AppStoreButtons'
import { RoleSwitcher } from './RoleSwitcher'
import { contactMailto, roleItems, secondaryItems, siteLinks } from '@/lib/site'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() ?? '/'
  const isBuyerPage = pathname.startsWith(siteLinks.buyersPipeline)
  const contextualCta = pathname.startsWith(siteLinks.realtors)
    ? { label: 'Запросить демонстрацию', href: contactMailto('Демонстрация БАСТ для риэлтора или агентства') }
    : pathname.startsWith(siteLinks.developers)
      ? { label: 'Обсудить размещение объектов', href: contactMailto('Размещение объектов в БАСТ') }
      : pathname.startsWith(siteLinks.investors)
        ? { label: 'Запросить встречу', href: contactMailto('Встреча по проекту БАСТ') }
        : { label: 'Подключить объекты', href: siteLinks.developers }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    focusable?.[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }

      if (event.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-5">
        <nav
          className="relative mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between rounded-full border border-graphite/10 bg-paper/[0.88] px-5 text-graphite shadow-[0_16px_42px_rgba(15,18,23,0.10)] backdrop-blur-2xl md:max-w-md md:px-6 xl:max-w-[1180px] xl:px-7"
        >
          <a href="/" className="-mx-2 flex min-h-11 items-center gap-2.5 px-2 font-display text-3xl font-medium tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand" aria-label="БАСТ — главная">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-graphite" fill="currentColor" aria-hidden="true">
              <path d="M12 3.2C11.6 3.2 11.2 3.34 10.9 3.6L4.7 9.1C4.26 9.48 4 10.03 4 10.61V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V10.61C20 10.03 19.74 9.48 19.3 9.1L13.1 3.6C12.8 3.34 12.4 3.2 12 3.2Z" />
            </svg>
            <span>БАСТ<span className="text-clay-400">.</span></span>
          </a>

          <div className="hidden xl:block">
            <RoleSwitcher />
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            {isBuyerPage ? (
              <button
                type="button"
                onClick={() => setDownloadOpen((value) => !value)}
                className="min-h-11 rounded-full bg-app-brand px-5 py-3 text-xs font-semibold text-white shadow-green-glow transition-[background-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] hover:bg-clay-600 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-expanded={downloadOpen}
                aria-controls="download-apps-popover"
              >
                Скачать приложение
              </button>
            ) : (
              <a href={contextualCta.href} className="inline-flex min-h-11 items-center rounded-full bg-app-brand px-5 py-3 text-xs font-semibold text-white shadow-green-glow transition-[background-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] hover:bg-clay-600 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper">
                {contextualCta.label}
              </a>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-graphite/[0.06] transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper xl:hidden"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-150 ease-[var(--ease-out)] ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-150 ease-[var(--ease-out)] ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>

          <AnimatePresence>
            {downloadOpen && isBuyerPage && (
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-6px) scale(0.98)' }}
                animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-4px) scale(0.98)', transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] } }}
                transition={{ duration: reducedMotion ? 0.15 : 0.18, ease: [0.23, 1, 0.32, 1] }}
                id="download-apps-popover"
                className="absolute right-0 top-[calc(100%+0.75rem)] origin-top-right rounded-2xl border border-graphite/10 bg-paper p-3 text-graphite shadow-[0_20px_60px_rgba(15,18,23,0.16)]"
              >
                <AppStoreButtons />
                <p className="px-2 pb-1 pt-3 text-[11px] text-pine-600">Бесплатно для покупателей</p>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.18, ease: [0.23, 1, 0.32, 1] }}
            id="mobile-navigation"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Навигация по сайту"
            className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-paper/[0.97] px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 text-graphite backdrop-blur-3xl xl:hidden"
          >
            <nav className="mx-auto flex h-full max-w-xl flex-col justify-between">
              <div className="space-y-2">
                {roleItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={reducedMotion ? { opacity: 0.85 } : { opacity: 0, transform: 'translateY(12px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    transition={{ delay: reducedMotion ? 0 : 0.02 + index * 0.035, duration: reducedMotion ? 0.15 : 0.2, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-graphite/10 py-4 font-display text-5xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6">
                  {secondaryItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-11 items-center text-sm text-graphite/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-brand"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <AppStoreButtons />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
