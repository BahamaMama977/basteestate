import { InternalPage } from '@/components/site/InternalPage'

export default function ContactPage() {
  return (
    <InternalPage
      eyebrow="Контакты"
      title="Обсудите подключение к «БАСТ»"
      intro="Напишите, если представляете агентство, застройщика или хотите подключить объекты в новом регионе."
      primary={{ label: 'Написать на partners@bast-estate.ru', href: 'mailto:partners@bast-estate.ru' }}
      items={[
        { title: 'Агентствам', text: 'Укажите регион и количество риэлторов в команде.' },
        { title: 'Застройщикам', text: 'Укажите регион и примерное количество объектов.' },
        { title: 'Новый регион', text: 'Расскажите, какие продавцы и объекты готовы к подключению.' },
      ]}
    />
  )
}
