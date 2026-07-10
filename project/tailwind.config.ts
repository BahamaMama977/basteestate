import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#F1F5F2',
          100: '#DDE6E0',
          200: '#BACBC0',
          300: '#91AB9B',
          400: '#6F8B79',
          500: '#526F5F',
          600: '#3E594A',
          700: '#2C4035',
          800: '#1D2D25',
          900: '#17211C',
          950: '#0B1712',
        },
        limestone: {
          50: '#FAF8F2',
          100: '#F4F0E7',
          200: '#EAE4D8',
          300: '#D8D0C1',
          400: '#BDB4A5',
        },
        sage: {
          300: '#A9B8AD',
          400: '#899C8E',
          500: '#6F8575',
          600: '#566C5D',
          700: '#415347',
        },
        // DEPRECATED: уходит с редизайном «Живая сделка»
        // (спека 2026-07-10) — не использовать в новом коде.
        mist: {
          100: '#EDF1EE',
          200: '#D4DDD6',
          300: '#BBC9BE',
        },
        // DEPRECATED: уходит с редизайном «Живая сделка»
        // (спека 2026-07-10) — не использовать в новом коде.
        clay: {
          300: '#D99578',
          400: '#C77A59',
          500: '#B86746',
          600: '#985238',
          700: '#713D2E',
        },
        // Light surfaces with a cool green tint
        surface: {
          50: '#FFFFFF',
          100: '#F6FAF7',
          200: '#EEF5F0',
          300: '#DCEAE1',
          400: '#C1D3C8',
        },
        // Green-black ink for finance/tech contrast
        ink: {
          50: '#F6FAF7',
          100: '#E6EFEA',
          200: '#CDDCD3',
          300: '#9BB0A4',
          400: '#708276',
          500: '#52635A',
          600: '#394A41',
          700: '#203229',
          800: '#10231A',
          900: '#07120E',
          950: '#030806',
        },
        // DEPRECATED: уходит с редизайном «Живая сделка»
        // (спека 2026-07-10) — не использовать в новом коде.
        // Digital forest green accent palette
        accent: {
          50: '#ECFDF3',
          100: '#D8F7E5',
          200: '#B8F3D2',
          300: '#78E3AA',
          400: '#33CC7A',
          500: '#18B66A',
          600: '#0F8F52',
          700: '#0F6B46',
          800: '#0D4E35',
          900: '#0A3525',
        },
        // DEPRECATED: уходит с редизайном «Живая сделка»
        // (спека 2026-07-10) — не использовать в новом коде.
        // Secondary - lime data highlight
        secondary: {
          400: '#B9F06A',
          500: '#9BE15D',
          600: '#74BE37',
        },
        // Legacy compatibility
        navy: {
          50: '#F6FAF7',
          100: '#E6EFEA',
          200: '#CDDCD3',
          700: '#203229',
          800: '#10231A',
          900: '#07120E',
          950: '#030806',
        },
        // Premium accent (сертификаты/акции/награды) — совпадает с золотом приложения
        gold: {
          400: '#D4BC82',
          500: '#C8A96A',
        },
        cream: {
          50: '#FFFFFF',
          100: '#F6FAF7',
          200: '#EEF5F0',
        },
        // Палитра мобильного приложения «БАСТ» — для достоверных макетов экранов
        // (значения из bast/shared/designSystem/theme, light mode)
        app: {
          bg: '#FFFFFF',
          canvas: '#F7F8F5',
          muted: '#F2F1EC',
          inset: '#ECEBE5',
          ink: '#23262F',
          caption: '#6B7280',
          placeholder: '#9CA3AF',
          brand: '#2F6B5F',
          'brand-soft': '#E4EDEA',
          'brand-border': '#CBDCD6',
          gold: '#C8A96A',
          'gold-soft': '#F3EBD9',
          success: '#2E7D62',
          warn: '#A16207',
          'warn-soft': '#F6EBD5',
          error: '#C43D3D',
          line: '#ECEBE5',
        },
        // «Живая сделка»: база страницы = канвас приложения
        paper: '#F7F8F5',
        // Графитовые якоря (hero, CTA, текст) — из Graphite Gold приложения
        graphite: {
          DEFAULT: '#23262F',
          deep: '#0F1217',
        },
        // Тёмная CRM-тема приложения — для экранов риэлтора/застройщика
        // (значения из bast/shared/designSystem/theme, dark mode)
        'app-dark': {
          bg: '#0F1217',
          surface: '#1A1D24',
          raised: '#20242D',
          muted: '#171B23',
          inset: '#10141B',
          text: '#F4F5F7',
          caption: '#A3ABB8',
          'muted-text': '#737B88',
          border: '#2A2D35',
          trust: '#6FA89B',
          'trust-soft': 'rgba(111, 168, 155, 0.18)',
          gold: '#D4BC82',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.02', letterSpacing: '0' }],
        'display-lg': ['4rem', { lineHeight: '1.05', letterSpacing: '0' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '0' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'accent-shimmer': 'linear-gradient(90deg, transparent, rgba(24, 182, 106, 0.16), transparent)',
        'green-mesh': 'radial-gradient(at 40% 20%, rgba(24, 182, 106, 0.08) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(155, 225, 93, 0.08) 0px, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(7, 18, 14, 0.07), 0 10px 20px -2px rgba(7, 18, 14, 0.04)',
        'medium': '0 4px 25px -5px rgba(7, 18, 14, 0.10), 0 10px 30px -5px rgba(7, 18, 14, 0.06)',
        'elevated': '0 10px 40px -10px rgba(7, 18, 14, 0.16), 0 20px 50px -15px rgba(7, 18, 14, 0.10)',
        'accent-glow': '0 0 30px rgba(24, 182, 106, 0.18)',
        'green-glow': '0 4px 20px rgba(24, 182, 106, 0.22)',
        'inner-accent': 'inset 0 1px 0 0 rgba(24, 182, 106, 0.10)',
      },
    },
  },
  plugins: [],
}
export default config
