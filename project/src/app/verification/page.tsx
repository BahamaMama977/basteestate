import { InternalPage } from '@/components/site/InternalPage'
import { DealScreen } from '@/components/app-screens'
import { acts, verification } from '@/lib/demo-deal'

export default function VerificationPage() {
  return (
    <InternalPage
      eyebrow="Проверка объектов"
      title="Что команда сверяет перед публикацией объявления"
      intro="До публикации команда сверяет продавца, документы, цену, характеристики и актуальность предложения. Статус проверки остаётся рядом с объектом в приложении."
      visual={<DealScreen act={acts[3]} />}
      visualCaption="Статус проверки в сделке"
      items={verification.map((item) => ({ title: item.label, text: item.caption.charAt(0).toUpperCase() + item.caption.slice(1) }))}
      note="Проверка объявления не гарантирует юридическую чистоту сделки и не заменяет юридическую проверку объекта перед покупкой."
    />
  )
}
