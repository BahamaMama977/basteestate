import Image from 'next/image'
import { Check } from 'lucide-react'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  CreateListingScreen,
  DealScreen,
  DeveloperCrmScreen,
  ListingStatsScreen,
  SharesApplyScreen,
  TeamScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { WebCrmPreview } from '@/components/home/sections/WebCrmPreview'

const developerHref = 'mailto:partners@bast-estate.ru?subject=Подключение объектов к БАСТ'

const stages: PipelineStage[] = [
  {
    id: 'listing',
    kicker: 'Шаг 01 · Каталог',
    title: 'Опубликуйте готовый дом или подряд',
    text: 'Мастер ведёт по шагам: характеристики, фото, планировки и 3D, материалы стен для подряда. Черновик сохраняется сам.',
    panel: <CreateListingScreen />,
  },
  {
    id: 'promo',
    kicker: 'Шаг 02 · Акции',
    title: 'Одна акция — сразу на несколько объявлений',
    text: 'Создайте акцию — скидку или подарок — и примените её сразу к нескольким объектам. Покупатель и риэлтор видят её в карточке ещё до сделки.',
    panel: <SharesApplyScreen />,
  },
  {
    id: 'team',
    kicker: 'Шаг 03 · Команда',
    title: 'Соберите отдел продаж в приложении',
    text: 'Пригласите сотрудников, назначьте владельца объявления и контактное лицо — обращение приходит тому, кто за объект отвечает.',
    panel: <TeamScreen />,
  },
  {
    id: 'requests',
    kicker: 'Шаг 04 · Обращения',
    title: 'Вопрос приходит прямо из карточки объекта',
    text: 'Сразу видно, о каком доме речь и кто смотрел объект. Ответственный ведёт диалог в чате с полной историей.',
    panel: <DeveloperCrmScreen />,
  },
  {
    id: 'deal',
    kicker: 'Шаг 05 · Сделка',
    title: 'Доведите сделку до договора',
    text: 'Этапы, участники и документы — в одной сделке. Авторство риэлтора закреплено: спор «чей клиент» закрыт до его начала.',
    panel: <DealScreen />,
  },
  {
    id: 'channel',
    kicker: 'Шаг 06 · Канал сбыта',
    title: 'Откройте объекты риэлторам платформы',
    text: 'Риэлторы «БАСТ» видят опубликованное объявление и могут предложить объект своим клиентам без отдельного запроса к застройщику. Просмотры, закрепления и репосты видны по каждому объекту.',
    panel: <ListingStatsScreen />,
  },
]

const requestItems = ['Типы объектов: готовые дома, подряды, посёлки', 'Количество объектов', 'Регион', 'Кто ведёт подключение со стороны компании'] as const

function ConnectFinale() {
  return (
    <section className="section-shell bg-app-inset text-graphite">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_minmax(320px,0.75fr)] lg:items-start">
        <Reveal>
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Партнёрство</span>
          <h2 className="editorial-title mt-6">Подключите объекты к «БАСТ»</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
            Расскажем, как опубликовать готовые дома и подряды, настроить акции и открыть объекты риэлторам платформы.
          </p>
          <div className="mt-8">
            <HomeButton href={developerHref} external>
              Обсудить подключение
            </HomeButton>
          </div>
          <p className="mt-8 border-t border-graphite/10 pt-6 text-sm leading-7 text-graphite/65">
            Сейчас каталог и партнёрская сеть работают в Удмуртии. Для подключения объектов в другом регионе оставьте заявку — оценим запуск вместе.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-graphite/10 bg-paper shadow-soft">
            <Image src="/images/generated/bast-role-developer-day-real-v2.webp" alt="Команда застройщика управляет объектами посёлка" fill className="object-cover object-center" sizes="(min-width:1024px) 38vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/35 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                Что приложить к заявке
              </p>
              <ul className="mt-6 space-y-4">
                {requestItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/90">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                      <Check className="h-3 w-3" strokeWidth={2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="page-container mt-16 border-t border-graphite/10 pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <Reveal>
            <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Веб-CRM</span>
            <h3 className="card-title mt-6">Каталог, клиенты и сделки — в одном рабочем окне</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
              Каталог, обращения и сделки команды доступны на большом экране. Запросите демонстрацию — покажем веб-CRM на ваших рабочих сценариях.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WebCrmPreview />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Конвейер застройщика: путь от публикации объявления до сделки и статистики. */
export function DevelopersPage() {
  return (
    <RolePipelinePage
      eyebrow="Застройщикам"
      title={<>Покажите объекты{' '}<span className="block text-graphite/65">риэлторам и покупателям</span></>}
      subtitle="Опубликуйте готовые дома и подряды, назначьте ответственных и добавьте акции. Обращения, переписка и сделки останутся привязаны к каждому объявлению."
      intro="От публикации до договора: каждый этап показан тем экраном, на котором команда управляет объектом и обращениями."
      stages={stages}
      finale={<ConnectFinale />}
      heroVisual={<CreateListingScreen />}
      caption="Работа с объектами"
      mobileCaption="Работа с объектами"
    />
  )
}
