import { InternalPage } from '@/components/site/InternalPage'
import { TeamScreen } from '@/components/app-screens'
import { publicContacts } from '@/lib/site'

export default function ContactPage() {
  return (
    <InternalPage
      eyebrow="Контакты"
      title="Обсудите подключение к «БАСТ»"
      intro="Свяжитесь по почте, телефону или в MAX, если представляете агентство, застройщика или хотите подключить объекты в новом регионе."
      primary={{ label: `Написать на ${publicContacts.email}`, href: publicContacts.emailHref }}
      secondary={{ label: `Позвонить: ${publicContacts.phone}`, href: publicContacts.phoneHref }}
      visual={<TeamScreen />}
      visualCaption="Команда в приложении"
      note={`Телефон и мессенджер ${publicContacts.messenger}: ${publicContacts.phone}`}
      items={[
        { title: 'Агентству', text: 'Укажите регион, размер команды и задачи, которые хотите перенести в «БАСТ».' },
        { title: 'Застройщику', text: 'Добавьте регион, типы объектов и примерное количество объявлений для подключения.' },
        { title: 'Региональному партнёру', text: 'Расскажите, какие продавцы, агентства и объекты готовы начать работу на платформе.' },
      ]}
    />
  )
}
