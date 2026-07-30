import Image from 'next/image'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import {
  DealScreen,
  CommissionScreen,
  RealtorProfileScreen,
  RealtorRewardsCatalogScreen,
  SearchScreen,
  ShareInviteScreen,
  TeamScreen,
  WorkspaceScreen,
} from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { WebCrmPreview } from '@/components/home/sections/WebCrmPreview'
import { contactMailto } from '@/lib/site'

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
    panel: <SearchScreen audience="realtor" />,
  },
  {
    id: 'remuneration',
    kicker: 'Шаг 03 · Вознаграждение',
    title: 'Заранее знайте своё вознаграждение',
    text: 'Сумма указана рядом с каждым объектом, поэтому риэлтор видит её ещё до предложения клиенту.',
    panel: <RealtorRewardsCatalogScreen />,
  },
  {
    id: 'attach',
    kicker: 'Шаг 04 · Клиент закреплён',
    title: 'Клиент закрепляется по вашей ссылке',
    text: 'Поделитесь объектом персональной ссылкой или QR на показе. Клиент открывает — и закрепляется за вами. Авторство сохраняется в сделке.',
    panel: <ShareInviteScreen />,
  },
  {
    id: 'workspace',
    kicker: 'Шаг 05 · Работа',
    title: 'Ведите клиента в совместном пространстве',
    text: 'Закреплённые объекты, переписка, напоминания и этапы сделки — в одном рабочем пространстве по каждому клиенту.',
    panel: <WorkspaceScreen />,
  },
  {
    id: 'deal',
    kicker: 'Шаг 06 · Сделка',
    title: 'Сделка с сохранённым авторством',
    text: 'Ведите сделку по этапам. Платформа сохраняет связь между вами и клиентом от выбранного объекта до подписания документов.',
    panel: <DealScreen />,
  },
  {
    id: 'commission',
    kicker: 'Шаг 07 · Авторство',
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
            Соберите команду в приложении: сотрудники и роли, ответственные за объекты,
            статистика по объявлениям и сделкам. На демонстрации обсудим сценарий вашего агентства.
          </p>
          <div className="mt-8">
            <HomeButton href={contactMailto('Демонстрация БАСТ для риэлтора или агентства')}>
              Запросить демонстрацию
            </HomeButton>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="relative grid min-h-[640px] w-full place-items-center overflow-hidden rounded-[2rem] border border-graphite/10">
          <Image src="/images/generated/bast-role-realtor-day-real-v2.webp" alt="Риэлтор обсуждает загородный дом с покупателями" fill className="object-cover object-center" sizes="(min-width:1024px) 40vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/35 via-transparent to-white/10" aria-hidden="true" />
          <div className="relative w-full max-w-[300px] p-6"><TeamScreen /></div>
        </Reveal>
      </div>
      <div className="page-container mt-16 border-t border-graphite/10 pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <Reveal>
            <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Веб-CRM</span>
            <h3 className="card-title mt-6">Продолжайте работу с командой за рабочим столом</h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
              В веб-CRM доступны клиенты, сделки и задачи команды. Фото и планировки
              объявления можно скачать одним архивом в приложении или веб-CRM, чтобы
              разместить объект на досках объявлений, собственном сайте, в соцсетях и
              других каналах.
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
      title={<>Закрепляйте клиента по своей ссылке{' '}<span className="block text-graphite/65">и ведите сделку до подписания документов</span></>}
      subtitle="Клиент перейдёт по вашей ссылке или QR и останется закреплён за вами на всех этапах — от выбора объекта до подписания документов."
      intro="От регистрации до договора: каждый этап показан тем экраном, на котором риэлтор выполняет работу."
      stages={stages}
      finale={<AgencyFinale />}
      heroVisual={<RealtorProfileScreen />}
      caption="Рабочее пространство риэлтора"
      mobileCaption="Рабочее пространство риэлтора"
    />
  )
}
