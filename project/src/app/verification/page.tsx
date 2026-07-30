import { InternalPage } from '@/components/site/InternalPage'
import { DealScreen } from '@/components/app-screens'
import { acts, verification } from '@/lib/demo-deal'

export default function VerificationPage() {
  return (
    <InternalPage
      eyebrow="Проверка объектов"
      title="Что проверяет юрист перед публикацией объекта"
      intro="Каждый объект проверяет юрист в штате или по договору. После проверки покупатель видит результат в карточке объекта."
      visual={<DealScreen act={acts[3]} />}
      visualCaption="Статус проверки в сделке"
      items={verification.map((item) => ({ title: item.label, text: item.caption.charAt(0).toUpperCase() + item.caption.slice(1) }))}
      note="Команда отдельно сверяет цену, наличие и актуальность объекта. Если юрист выявляет риск, положительный статус не ставится, а конкретный результат проверки показывается в карточке."
    />
  )
}
