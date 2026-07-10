import { describe, expect, it } from 'vitest'
import { acts, chat, demo, demoObject, participants, stages } from '@/lib/demo-deal'

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

describe('канон демо-сделки', () => {
  it('объект — «Дом у леса» за 12 800 000 ₽ (канон спеки)', () => {
    expect(demoObject.title).toBe('Дом у леса')
    expect(demoObject.price).toBe('12 800 000 ₽')
    expect(demoObject.area).toBe('184 м²')
  })

  it('обратная совместимость: demo.object и demo.realtor', () => {
    expect(demo.object).toBe(demoObject)
    expect(demo.realtor).toBe(participants.realtor)
  })

  it('три участника с ролями', () => {
    expect(participants.buyer.role).toBe('Покупатель')
    expect(participants.realtor.role).toBe('Риэлтор')
    expect(participants.seller.role).toBe('Продавец')
    for (const p of Object.values(participants)) {
      expect(p.initials).toMatch(/^[А-ЯЁ]{2}$/)
    }
  })

  it('время в чате движется вперёд', () => {
    const times = chat.map((m) => toMinutes(m.time))
    const sorted = [...times].sort((a, b) => a - b)
    expect(times).toEqual(sorted)
    expect(chat.length).toBeGreaterThanOrEqual(4)
  })

  it('ровно 4 этапа сделки', () => {
    expect(stages).toHaveLength(4)
    expect(stages.map((s) => s.label)).toEqual([
      'Сделка начата',
      'Объект выбран',
      'Договор готовится',
      'Документы подписаны',
    ])
  })

  it('ровно 5 актов, id по возрастанию, состояния согласованы', () => {
    expect(acts).toHaveLength(5)
    expect(acts.map((a) => a.id)).toEqual([1, 2, 3, 4, 5])
    for (const act of acts) {
      expect(['search', 'listing', 'chat', 'deal']).toContain(act.screen)
      expect(act.chatCount).toBeGreaterThanOrEqual(0)
      expect(act.chatCount).toBeLessThanOrEqual(chat.length)
      expect(act.completedStages).toBeGreaterThanOrEqual(0)
      expect(act.completedStages).toBeLessThanOrEqual(stages.length)
    }
    // прогресс не откатывается назад по ходу актов
    const progress = acts.map((a) => a.completedStages)
    expect([...progress].sort((a, b) => a - b)).toEqual(progress)
    // финал: все этапы завершены
    expect(acts[4].completedStages).toBe(4)
  })
})
