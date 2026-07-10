import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // tsconfig задаёт jsx: "preserve" (нужно Next), поэтому для тестов
  // явно включаем компиляцию JSX через automatic-runtime React.
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.tsx'],
  },
})
