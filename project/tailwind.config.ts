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
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        pine: {
          50: '#F1F2F4',
          100: '#E4E6EA',
          200: '#C6CBD3',
          300: '#A3ABB8',
          400: '#737B88',
          500: '#5C6470',
          600: '#4C5560',
          700: '#2A2D35',
          800: '#1A1D24',
          900: '#171B23',
          950: '#0F1217',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        limestone: {
          50: '#FFFFFF',
          100: '#F7F8F5',
          200: '#ECEBE5',
          300: '#D6D8D2',
          400: '#B9BCB6',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        sage: {
          300: '#A3ABB8',
          400: '#8A93A0',
          500: '#6E7683',
          600: '#555D6A',
          700: '#3E454F',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        mist: {
          100: '#F2F3F0',
          200: '#E2E5E0',
          300: '#CBD2CC',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        clay: {
          300: '#D4BC82',
          400: '#C8A96A',
          500: '#2F6B5F',
          600: '#285D52',
          700: '#225047',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        surface: {
          50: '#FFFFFF',
          100: '#F7F8F5',
          200: '#F0F1ED',
          300: '#E3E6E0',
          400: '#CDD2CB',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        ink: {
          50: '#F1F2F4',
          100: '#E4E6EA',
          200: '#C6CBD3',
          300: '#A3ABB8',
          400: '#737B88',
          500: '#5C6470',
          600: '#3E454F',
          700: '#2A2D35',
          800: '#1A1D24',
          900: '#10141B',
          950: '#0B0D11',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
        accent: {
          50: '#EFF5F3',
          100: '#E4EDEA',
          200: '#CBDCD6',
          300: '#9FC2B8',
          400: '#5E978A',
          500: '#2F6B5F',
          600: '#285D52',
          700: '#225047',
          800: '#1B4038',
          900: '#14312B',
        },
        // Алиас палитры «Живой сделки» (ремап план №4); имена легаси — для ~630 использований в подстраницах
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
        'act-in': 'act-in 0.36s cubic-bezier(0.32, 0.72, 0, 1) both',
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
        'accent-shimmer': 'linear-gradient(90deg, transparent, rgba(47, 107, 95, 0.16), transparent)',
        'green-mesh': 'radial-gradient(at 40% 20%, rgba(47, 107, 95, 0.08) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(200, 169, 106, 0.06) 0px, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(11, 13, 17, 0.07), 0 10px 20px -2px rgba(11, 13, 17, 0.04)',
        'medium': '0 4px 25px -5px rgba(11, 13, 17, 0.10), 0 10px 30px -5px rgba(11, 13, 17, 0.06)',
        'elevated': '0 10px 40px -10px rgba(11, 13, 17, 0.16), 0 20px 50px -15px rgba(11, 13, 17, 0.10)',
        'accent-glow': '0 0 30px rgba(47, 107, 95, 0.18)',
        'green-glow': '0 4px 20px rgba(47, 107, 95, 0.22)',
        'inner-accent': 'inset 0 1px 0 0 rgba(47, 107, 95, 0.10)',
      },
    },
  },
  plugins: [],
}
export default config
