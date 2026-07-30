import type { ReactNode } from 'react'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { SearchScreen } from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'
import { contactMailto } from '@/lib/site'

const meetingHref = contactMailto('Встреча по проекту БАСТ')

/** Карточка-доказательство: панели инвест-конвейера — не экраны, а тезисы. */
function ProofCard({ index, title, text }: { index: number; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-app-line bg-app-bg p-3 md:rounded-[1.5rem] md:p-6">
      <span className="font-mono text-[11px] tracking-[0.18em] text-app-gold">{`0${index}`}</span>
      <p className="mt-2 font-heading text-base font-semibold leading-tight text-graphite md:mt-5 md:text-xl">{title}</p>
      <p className="mt-1.5 text-[11px] leading-4 text-graphite/70 md:mt-3 md:text-sm md:leading-6">{text}</p>
    </div>
  )
}

function ProofStack({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:block md:space-y-4">
      {items.map((item, i) => (
        <ProofCard key={item.title} index={i + 1} title={item.title} text={item.text} />
      ))}
    </div>
  )
}

const stages: PipelineStage[] = [
  {
    id: 'market',
    kicker: 'Шаг 01 · Рынок',
    title: 'Объект, клиент и договор разнесены по разным каналам',
    text: 'Застройщик публикует объект, риэлтор ведёт клиента в переписке, а документы собираются отдельно. Из-за разрыва теряются контекст, источник обращения и следующий шаг сделки.',
    panel: (
      <ProofStack
        items={[
          {
            title: 'Разрозненные каналы промо',
            text: 'Акция застройщика не всегда доходит до риэлтора и покупателя в момент выбора объекта.',
          },
          {
            title: 'Споры об авторстве',
            text: 'Без зафиксированного источника обращения участникам приходится отдельно подтверждать, кто привёл клиента.',
          },
          {
            title: 'Сделка теряется по пути',
            text: 'Когда объект, диалог и документы не связаны, команде сложнее контролировать следующий шаг.',
          },
        ]}
      />
    ),
  },
  {
    id: 'product',
    kicker: 'Шаг 02 · Продукт',
    title: 'Платформа объединяет три стороны сделки',
    text: '«БАСТ» соединяет каталог объектов, рабочее пространство риэлтора и застройщика, привязку клиента по ссылке или QR и маршрут сделки до подписания документов. Мобильное приложение опубликовано, веб-CRM доступна риэлторам, агентствам и застройщикам.',
    panel: <SearchScreen />,
  },
  {
    id: 'revenue',
    kicker: 'Шаг 03 · Монетизация',
    title: 'Планируемая модель монетизации',
    text: 'Проект планирует развивать подписки для профессиональных участников, комиссии с завершённых сделок и партнёрские программы. Подтверждённой выручки по этим направлениям пока нет.',
    panel: (
      <ProofStack
        items={[
          { title: 'Подписки', text: 'Планируемый платный доступ агентств и застройщиков к профессиональным рабочим сценариям.' },
          { title: 'Комиссии со сделок', text: 'Планируемая комиссионная модель для сделок, завершённых в платформе.' },
          { title: 'Партнёрские программы', text: 'Планируемые предложения компаний из сфер строительства, ремонта и благоустройства.' },
        ]}
      />
    ),
  },
  {
    id: 'why-now',
    kicker: 'Шаг 04 · Момент',
    title: 'Рабочий процесс уже переместился в телефон',
    text: 'Покупатель выбирает дом и общается с продавцом с телефона. Риэлтору и застройщику нужен тот же контекст — с объектом, источником клиента и этапом сделки.',
    panel: (
      <ProofStack
        items={[
          { title: 'Загородная недвижимость', text: 'Платформа сфокусирована на домах, подрядах и связанных с ними услугах.' },
          { title: 'Мобильный сценарий', text: 'Поиск, чат и контроль этапов сделки доступны с телефона.' },
          { title: 'Единый контекст', text: 'Объект, источник клиента, участники и этап сделки связаны между собой.' },
        ]}
      />
    ),
  },
  {
    id: 'growth',
    kicker: 'Шаг 05 · Рост',
    title: 'Следующий шаг — расширение рынка и сервисов',
    text: 'Платформа может расти за счёт новых регионов, банковских продуктов и выхода в сегмент квартир в новостройках.',
    panel: (
      <ProofStack
        items={[
          { title: 'Банковские продукты', text: 'Ипотечные предложения для покупателей и финансирование застройщиков могут стать частью маршрута сделки.' },
          { title: 'Новые регионы', text: 'Платформа расширяется вместе с продавцами, объектами и агентствами за пределами Удмуртии.' },
          { title: 'Выход на рынок квартир', text: 'Платформа может охватить квартиры в новостройках и подключить застройщиков многоэтажных жилых домов.' },
        ]}
      />
    ),
  },
  {
    id: 'meeting',
    kicker: 'Шаг 06 · Встреча',
    title: 'Покажем продукт и обсудим проект',
    text: 'На встрече покажем мобильное приложение и веб-CRM, расскажем о текущем этапе проекта и обсудим планируемую модель монетизации.',
    panel: (
      <ProofStack
        items={[
          { title: 'Мобильное приложение', text: 'Опубликованный продукт и сценарии трёх участников сделки.' },
          { title: 'Веб-CRM', text: 'Реализованные рабочие сценарии для профессиональных команд.' },
          { title: 'Разговор о проекте', text: 'Текущий статус, планируемая монетизация и направления развития.' },
        ]}
      />
    ),
  },
]

function MaterialsFinale(): ReactNode {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">Разговор с инвестором</span>
          <h2 className="editorial-title mt-6">Посмотрите, как работает «БАСТ»</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Проект открыт к разговору с инвесторами. На встрече покажем опубликованное
            приложение, рабочие сценарии веб-CRM и текущий этап развития.
          </p>
          <div className="mt-8">
            <HomeButton href={meetingHref} variant="light" external>
              Запросить встречу
            </HomeButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Конвейер инвестора: рынок → продукт → монетизация → момент → рост → встреча. */
export function InvestorsPage() {
  return (
    <RolePipelinePage
      eyebrow="Инвесторам"
      title={<>Одна платформа для{' '}<span className="block text-graphite/65">покупателя, риэлтора и застройщика</span></>}
      subtitle="На данный момент объекты, обращения, переписка и документы разнесены по разным каналам. «БАСТ» объединяет их в одном процессе сделки."
      intro="Проблема рынка, решение, планируемая монетизация и направления развития — с опорой на опубликованное приложение и реализованную веб-CRM."
      stages={stages}
      finale={<MaterialsFinale />}
      heroVisual={<SearchScreen />}
      caption={null}
      mobileCaption={null}
    />
  )
}
