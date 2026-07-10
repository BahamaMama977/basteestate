import React from 'react'
import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Без vitest-глобалей RTL не находит afterEach и не чистит DOM сам.
afterEach(cleanup)

// next/image в jsdom не работает без окружения Next — рендерим обычный img.
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, sizes: _sizes, priority: _priority, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />
  },
}))

// jsdom не реализует IntersectionObserver — framer-motion whileInView (Reveal) без него падает.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
