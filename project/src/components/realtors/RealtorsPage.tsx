import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  DealScreen,
  RealtorProfileScreen,
  RewardsScreen,
  SearchScreen,
  ShareInviteScreen,
  TeamScreen,
  WorkspaceScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'

const stages: PipelineStage[] = [
  {
    id: 'start',
    kicker: 'Шаг 01 · Старт',
    title: 'Станьте риэлтором в приложении',
    text: 'Заявка «Стать риэлтором» из профиля. После одобрения — доступ к клиентам, сделкам, акциям и команде.',
    panel: <RealtorProfileScreen />,
  },
  {
    id: 'catalog',
    kicker: 'Шаг 02 · Каталог',
    title: 'Объекты застройщиков и ваши объявления',
    text: 'Берите в работу объекты застройщиков и ведите свои — карта, каталог, фильтры и счётчики просмотров.',
    panel: <SearchScreen />,
  },
  {
    id: 'attach',
    kicker: 'Шаг 03 · Клиент закреплён',
    title: 'Клиент закрепляется по вашей ссылке',
    text: 'Поделитесь объектом персональной ссылкой или QR на показе. Клиент открывает — и закрепляется за вами. Авторство сохраняется в сделке.',
    panel: <ShareInviteScreen />,
  },
  {
    id: 'workspace',
    kicker: 'Шаг 04 · Работа',
    title: 'Ведите клиента в совместном пространстве',
    text: 'Закреплённые объекты, переписка, напоминания и этапы сделки — в одном рабочем пространстве по каждому клиенту.',
    panel: <WorkspaceScreen />,
  },
  {
    id: 'deal',
    kicker: 'Шаг 05 · Сделка',
    title: 'Сделка с сохранённым авторством',
    text: 'Ведите сделку по этапам. Авторство закреплено — спор «чей клиент» закрыт до его начала.',
    panel: <DealScreen />,
  },
  {
    id: 'bonus',
    kicker: 'Шаг 06 · Бонусы',
    title: 'Прозрачные бонусы за приведённого клиента',
    text: 'Бонус привязан к сделке и считается прозрачно. Партнёрские сертификаты и акции видны по каждому объекту.',
    panel: <RewardsScreen />,
  },
]

function AgencyFinale() {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_minmax(340px,0.8fr)] lg:items-center">
        <Reveal>
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">Агентствам</span>
          <h2 className="section-title mt-6 max-w-2xl">Руководите агентством?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Соберите команду в приложении: сотрудники и роли, ответственные за объекты, статистика по объявлениям и сделкам. Подключим агентство и его объекты к «БАСТ».
          </p>
          <div className="mt-8">
            <HomeButton href="mailto:partners@bast-estate.ru" variant="light">
              Подключить агентство
            </HomeButton>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="justify-self-center">
          <TeamScreen />
        </Reveal>
      </div>
    </section>
  )
}

/** Конвейер риэлтора: путь от заявки до бонусов + финал для агентств. */
export function RealtorsPage() {
  return (
    <RolePipelinePage
      eyebrow="Риэлторам"
      title={<>Ведите клиентов и сделки<span className="block text-app-dark-caption">с телефона</span></>}
      subtitle="Клиент закреплён за вами, авторство сохраняется в сделке, бонусы считаются прозрачно — весь путь риэлтора в приложении."
      intro="Скрольте — путь риэлтора: от заявки стать риэлтором до прозрачных бонусов за приведённого клиента."
      stages={stages}
      finale={<AgencyFinale />}
    />
  )
}
