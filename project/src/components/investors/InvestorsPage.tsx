import type { ReactNode } from 'react'
import { RolePipelinePage } from '@/components/pipeline/RolePipelinePage'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { SearchScreen } from '@/components/app-screens'
import { type PipelineStage } from '@/components/pipeline/StickyPipeline'

const pitchHref = 'mailto:partners@bast-estate.ru?subject=Запрос Pitch Deck БАСТ'
const financeHref = 'mailto:partners@bast-estate.ru?subject=Запрос финансовой модели БАСТ'

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
    title: 'Приложение объединяет три стороны сделки',
    text: '«БАСТ» соединяет каталог объектов, рабочее пространство риэлтора и застройщика, привязку клиента по ссылке или QR и маршрут сделки до подписания документов. Мобильное приложение доступно в App Store и Google Play.',
    panel: <SearchScreen />,
  },
  {
    id: 'revenue',
    kicker: 'Шаг 03 · Выручка',
    title: 'Выручка формируется вокруг профессиональных участников и сделки',
    text: 'Модель включает подписки для агентств и застройщиков, комиссии с завершённых сделок и партнёрские программы. Для покупателя приложение и сопровождение риэлтора команды «БАСТ» бесплатны.',
    panel: (
      <ProofStack
        items={[
          { title: 'SaaS-подписки', text: 'Агентства и застройщики платят за рабочее пространство: CRM, объявления, команда, статистика.' },
          { title: 'Комиссии со сделок', text: 'Платформа участвует в сделках, доведённых до договора.' },
          { title: 'Партнёрские программы', text: 'Сертификаты и предложения партнёров вокруг сделки: ремонт, обустройство, товары для дома.' },
          { title: 'Партнёрские размещения', text: 'Дополнительное направление — предложения компаний из сфер строительства, ремонта и благоустройства.' },
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
    title: 'Следующий масштаб — новые регионы и сервисы вокруг сделки',
    text: 'Платформа может расти вместе с каталогом, партнёрской сетью и дополнительными сервисами для загородного дома.',
    panel: (
      <ProofStack
        items={[
          { title: 'Банковские продукты', text: 'Ипотечные предложения для покупателей и финансирование застройщиков могут стать частью маршрута сделки.' },
          { title: 'Новые регионы', text: 'Платформа расширяется вместе с продавцами, объектами и агентствами за пределами Удмуртии.' },
          { title: 'Веб-каталог', text: 'Каталог для покупателей может дополнить мобильное приложение новым каналом входа.' },
          { title: 'Персональные подборки', text: 'Подбор объектов под запрос покупателя сокращает путь от поиска до диалога.' },
        ]}
      />
    ),
  },
  {
    id: 'materials',
    kicker: 'Шаг 06 · Материалы',
    title: 'Разберём экономику и сценарии роста на встрече',
    text: 'Запросите Pitch Deck и финансовую модель: в них собраны продукт, рынок, модель выручки, юнит-экономика и сценарии развития.',
    panel: (
      <ProofStack
        items={[
          { title: 'Pitch Deck', text: 'Продукт, рынок, модель, команда, планы развития.' },
          { title: 'Financial Model', text: 'Выручка, юнит-экономика, сценарии роста.' },
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
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">Обсудить участие</span>
          <h2 className="editorial-title mt-6">Инфраструктура загородной сделки</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Мобильное приложение опубликовано, основные сценарии покупателей и профессиональных участников реализованы. На встрече покажем продукт и передадим материалы.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={pitchHref} variant="light" external>
              Запросить Pitch Deck
            </HomeButton>
            <HomeButton href={financeHref} variant="text" external className="text-app-dark-text">
              Запросить финмодель
            </HomeButton>
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-app-dark-caption">
            Тракшн, юнит-экономику и допущения финансовой модели обсудим вместе с материалами.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/** Конвейер инвестора: рынок → продукт → выручка → момент → рост → материалы. */
export function InvestorsPage() {
  return (
    <RolePipelinePage
      eyebrow="Инвесторам"
      title={<>Продукт вокруг{' '}<span className="block text-graphite/65">загородной сделки</span></>}
      subtitle="«БАСТ» связывает покупателя, риэлтора и застройщика от первого просмотра объекта до подписания документов. В основе — опубликованное приложение и рабочие сценарии профессиональных команд."
      intro="Рынок, продукт, модель выручки и направления роста — через факты, которые можно проверить в приложении и материалах для инвестора."
      stages={stages}
      finale={<MaterialsFinale />}
      heroVisual={<SearchScreen />}
      caption={null}
      mobileCaption={null}
    />
  )
}
