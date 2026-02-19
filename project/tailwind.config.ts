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
        // Light theme - clean white with subtle blue tints
        surface: {
          50: '#FFFFFF',
          100: '#FAFBFD',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
        },
        // Slate-based ink colors for professional look
        ink: {
          50: '#F8FAFC',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#0A0F1A',
          950: '#050810',
        },
        // Professional blue accent palette
        accent: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Secondary - subtle cyan/teal
        secondary: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        // Legacy compatibility - mapped to blue palette
        navy: {
          50: '#F8FAFC',
          100: '#E2E8F0',
          200: '#CBD5E1',
          700: '#1E293B',
          800: '#0F172A',
          900: '#0A0F1A',
          950: '#050810',
        },
        gold: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAFBFD',
          200: '#F1F5F9',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
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
        'accent-shimmer': 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.12), transparent)',
        'blue-mesh': 'radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.08) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(37, 99, 235, 0.06) 0px, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(15, 23, 42, 0.06), 0 10px 20px -2px rgba(15, 23, 42, 0.03)',
        'medium': '0 4px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 30px -5px rgba(15, 23, 42, 0.05)',
        'elevated': '0 10px 40px -10px rgba(15, 23, 42, 0.12), 0 20px 50px -15px rgba(15, 23, 42, 0.08)',
        'accent-glow': '0 0 30px rgba(59, 130, 246, 0.15)',
        'blue-glow': '0 4px 20px rgba(59, 130, 246, 0.2)',
        'inner-accent': 'inset 0 1px 0 0 rgba(59, 130, 246, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
