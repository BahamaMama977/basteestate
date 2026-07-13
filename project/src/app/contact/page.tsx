import { InternalPage } from '@/components/site/InternalPage'
import { TeamScreen } from '@/components/app-screens'

export default function ContactPage() {
  return (
    <InternalPage
      eyebrow="Контакты"
      title="Обсудите подключение к «БАСТ»"
      intro="Напишите, если представляете агентство, застройщика или хотите подключить объекты в новом регионе."
      primary={{ label: 'Написать на partners@bast-estate.ru', href: 'mailto:partners@bast-estate.ru' }}
      visual={<TeamScreen />}
      visualCaption="Команда в приложении"
      items={[
        { title: 'Агентству', text: 'Укажите регион, размер команды и задачи, которые хотите перенести в «БАСТ».' },
        { title: 'Застройщику', text: 'Добавьте регион, типы объектов и примерное количество объявлений для подключения.' },
        { title: 'Региональному партнёру', text: 'Расскажите, какие продавцы, агентства и объекты готовы начать работу на платформе.' },
      ]}
    />
  )
}
