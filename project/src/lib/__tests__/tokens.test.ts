import { describe, expect, it } from 'vitest'
import config from '../../../tailwind.config'

// Точные значения из bast/shared/designSystem/theme — защита от дрейфа.
const colors = (config.theme?.extend?.colors ?? {}) as Record<string, any>

describe('токены «Живой сделки»', () => {
  it('бумага — канвас приложения', () => {
    expect(colors.paper).toBe('#F7F8F5')
  })

  it('графитовые якоря', () => {
    expect(colors.graphite.DEFAULT).toBe('#23262F')
    expect(colors.graphite.deep).toBe('#0F1217')
  })

  it('светлая палитра приложения не дрейфует', () => {
    expect(colors.app.canvas).toBe('#F7F8F5')
    expect(colors.app.brand).toBe('#2F6B5F')
    expect(colors.app.gold).toBe('#C8A96A')
    expect(colors.app.ink).toBe('#23262F')
  })

  it('тёмная CRM-палитра приложения', () => {
    expect(colors['app-dark']).toEqual({
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
    })
  })

  it('легаси-группы — алиасы палитры «Живой сделки»', () => {
    expect(colors.pine['950']).toBe('#0F1217')
    expect(colors.pine['600']).toBe('#4C5560')
    expect(colors.limestone['100']).toBe('#F7F8F5')
    expect(colors.limestone['50']).toBe('#FFFFFF')
    expect(colors.clay['500']).toBe('#2F6B5F')
    expect(colors.clay['400']).toBe('#C8A96A')
    expect(colors.accent['500']).toBe('#2F6B5F')
    expect(colors.mist['100']).toBe('#F2F3F0')
    expect(colors.sage['300']).toBe('#A3ABB8')
  })

  it('моношрифт — третий голос типографики', () => {
    const fonts = (config.theme?.extend?.fontFamily ?? {}) as Record<string, string[]>
    expect(fonts.mono[0]).toBe('var(--font-mono)')
  })
})
