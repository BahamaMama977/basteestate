'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AppStoreButtons } from './home/AppStoreButtons'
import { navItems } from '@/lib/site'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-5">
        <motion.nav
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative mx-auto flex h-16 max-w-[1180px] items-center justify-between rounded-full border border-white/[0.15] bg-pine-950/[0.88] px-5 text-limestone-50 shadow-[0_18px_48px_rgba(15,18,23,0.18)] backdrop-blur-2xl md:px-7"
        >
          <a href="/" className="flex items-center gap-2.5 font-display text-3xl font-medium tracking-[-0.04em]" aria-label="БАСТ — главная">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-limestone-50" fill="currentColor" aria-hidden="true">
              <path d="M12 3.2C11.6 3.2 11.2 3.34 10.9 3.6L4.7 9.1C4.26 9.48 4 10.03 4 10.61V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V10.61C20 10.03 19.74 9.48 19.3 9.1L13.1 3.6C12.8 3.34 12.4 3.2 12 3.2Z" />
            </svg>
            <span>БАСТ<span className="text-clay-400">.</span></span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-[0.04em] text-limestone-200 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setDownloadOpen((value) => !value)}
              className="rounded-full bg-limestone-50 px-5 py-3 text-xs font-semibold text-pine-950 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              aria-expanded={downloadOpen}
            >
              Скачать приложение
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] lg:hidden"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
          >
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>

          <AnimatePresence>
            {downloadOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="absolute right-0 top-[calc(100%+0.75rem)] rounded-[1.75rem] bg-limestone-100 p-3 text-pine-950 shadow-[0_24px_80px_rgba(15,18,23,0.22)]"
              >
                <AppStoreButtons />
                <p className="px-2 pb-1 pt-3 text-[11px] text-pine-600">Бесплатно для покупателей</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-pine-950/[0.96] px-6 pb-10 pt-28 text-limestone-50 backdrop-blur-3xl lg:hidden"
          >
            <nav className="mx-auto flex h-full max-w-xl flex-col justify-between">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-5xl leading-none"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <AppStoreButtons light />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
