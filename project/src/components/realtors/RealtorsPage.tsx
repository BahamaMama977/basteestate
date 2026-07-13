import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  DealScreen,
  CommissionScreen,
  RealtorProfileScreen,
  SearchScreen,
  ShareInviteScreen,
  TeamScreen,
  WorkspaceScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { WebCrmPreview } from '@/components/home/sections/WebCrmPreview'

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
    title: 'Объекты и акции застройщиков',
    text: 'Берите в работу объекты застройщиков и ведите свои. Акции для покупателя видны рядом с объявлением, поэтому их не нужно искать в отдельных чатах и рассылках.',
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
    id: 'commission',
    kicker: 'Шаг 06 · Авторство',
    title: 'Авторство не теряется при передаче клиента',
    text: 'Персональная ссылка или QR связывает клиента с риэлтором. Эта связь сохраняется при переходе от объявления к совместному пространству и сделке.',
    panel: <CommissionScreen />,
  },
]

function AgencyFinale() {
  return (
    <section className="section-shell bg-app-inset text-graphite">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_minmax(340px,0.8fr)] lg:items-center">
        <Reveal>
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Агентствам</span>
          <h2 className="editorial-title mt-6 max-w-2xl">Руководите агентством?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
            Соберите команду в приложении: сотрудники и роли, ответственные за объекты, статистика по объявлениям и сделкам. Подключим агентство и его объекты к «БАСТ».
          </p>
          <div className="mt-8">
            <HomeButton href="mailto:partners@bast-estate.ru">
              Подключить агентство
            </HomeButton>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="justify-self-center">
          <TeamScreen />
        </Reveal>
      </div>
      <div className="page-container mt-16 border-t border-graphite/10 pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <Reveal>
            <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Веб-CRM</span>
            <h3 className="section-heading mt-6">Продолжайте работу с командой за рабочим столом</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
              Рабочая версия переносит клиентов, сделки и задачи команды на большой экран. Публичный доступ к веб-CRM готовится.
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

/** Конвейер риэлтора: путь от заявки до сохранённого авторства + финал для агентств. */
export function RealtorsPage() {
  return (
    <RolePipelinePage
      eyebrow="Риэлторам"
      title={<>Ведите клиентов и сделки{' '}<span className="block text-graphite/65">с телефона</span></>}
      subtitle="Клиент закрепляется по вашей ссылке или QR, а авторство сохраняется при переходе от объявления к сделке. Объекты, акции, переписка и задачи остаются в одной платформе."
      intro="Скрольте — путь риэлтора: от заявки и каталога до клиента, закреплённого в сделке."
      stages={stages}
      finale={<AgencyFinale />}
    />
  )
}
