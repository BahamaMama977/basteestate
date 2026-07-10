import { describe, expect, it } from 'vitest'
import { acts, chat, crm, demo, demoObject, otherObjects, participants, stages, verification } from '@/lib/demo-deal'

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

  it('материалы объекта — из спеки (кирпич, газ, 2 санузла)', () => {
    expect(demoObject.houseType).toBe('Кирпич')
    expect(demoObject.heating).toBe('Газ')
    expect(demoObject.bathrooms).toBe('2')
  })

  it('ровно 3 других объекта — без дублей с каноном', () => {
    expect(otherObjects).toHaveLength(3)
    for (const o of otherObjects) {
      expect(o.title).not.toBe(demoObject.title)
      expect(o.photo).toBeTruthy()
      expect(o.priceShort).toMatch(/млн ₽$/)
    }
  })

  it('чек-лист проверки — ровно 5 пунктов из спеки', () => {
    expect(verification.map((v) => v.label)).toEqual([
      'Продавец',
      'Документы',
      'Цена',
      'Характеристики',
      'Наличие объекта',
    ])
    for (const v of verification) expect(v.caption).toBeTruthy()
  })

  it('CRM-данные согласованы с чатом', () => {
    expect(crm.inquiry.text).toBe(chat[0].text)
    expect(crm.inquiry.time).toBe(chat[0].time)
    expect(crm.reminder.when).toBeTruthy()
  })

  it('реплики продавца — от множественного лица (отдел продаж)', () => {
    const sellerTexts = chat.filter((m) => m.from === 'seller').map((m) => m.text)
    expect(sellerTexts.join(' ')).not.toMatch(/Готова /)
  })

  it('короткое имя продавца — для узких шапок', () => {
    expect(participants.seller.shortName).toBe('Сосновый бор')
  })

  it('второй клиент риэлтора', () => {
    expect(crm.otherClient.name).toBe('Дмитрий Панов')
    expect(crm.otherClient.initials).toMatch(/^[А-ЯЁ]{2}$/)
  })

  it('прогресс чек-листа по актам: 0 до проверки, 5 после', () => {
    expect(acts.map((a) => a.verifiedCount)).toEqual([0, 0, 0, 5, 5])
    for (const act of acts) {
      expect(act.verifiedCount).toBeLessThanOrEqual(verification.length)
    }
  })
})
