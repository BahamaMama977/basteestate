import type { Metadata } from 'next'
import { InternalPage } from '@/components/site/InternalPage'
import { DealScreen } from '@/components/app-screens'

export const metadata: Metadata = {
  title: 'Контроль сделки — участники и этапы в «БАСТ»',
  description:
    'Следите за участниками и этапами сделки с загородной недвижимостью — от выбора объекта до подписанных документов.',
}

export default function DealControlPage() {
  return (
    <InternalPage
      eyebrow="Контроль сделки"
      title="Контролируйте сделку от первого обращения до подписания документов"
      intro="Следите за участниками и этапами сделки в «БАСТ» — от выбора объекта до подписанных документов."
      visual={<DealScreen />}
      visualCaption="Участники и этап сделки"
      items={[
        {
          title: 'Источник обращения',
          text: 'Персональная ссылка или QR сохраняют связь клиента с риэлтором-партнёром.',
        },
        {
          title: 'Ответственный',
          text: 'В сделке видно, кто ведёт клиента: специалист команды «БАСТ» или пригласивший его риэлтор-партнёр.',
        },
        {
          title: 'Текущий этап',
          text: 'Участники видят, на каком этапе находится сделка и какое действие следует дальше.',
        },
      ]}
    />
  )
}
