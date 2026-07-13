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
    title: 'Сегодня рынок загородной недвижимости живёт разрозненно',
    text: 'Так сложилось: объект, переписка, документы и промо застройщика существуют в разных каналах. Про акции нередко не знают ни риэлтор, ни покупатель, авторство сделки теряется, часть сделок не доходит до договора. Это описание ситуации — и место, где появляется платформа.',
    panel: (
      <ProofStack
        items={[
          {
            title: 'Разрозненные каналы промо',
            text: 'Застройщик запускает акцию, но риэлтор о ней не знает и не может ускорить продажу. Мелкие застройщики каналами продвижения почти не пользуются.',
          },
          {
            title: 'Споры об авторстве',
            text: 'Непонятно, кто привёл клиента: риэлтор рискует, что его исключат из сделки, застройщик — что партнёр уйдёт.',
          },
          {
            title: 'Сделка теряется по пути',
            text: 'Без единого контура «объект → диалог → сделка → договор» часть сделок не доходит до подписания.',
          },
        ]}
      />
    ),
  },
  {
    id: 'product',
    kicker: 'Шаг 02 · Продукт',
    title: 'Приложение уже работает, а не проектируется',
    text: '«БАСТ» — маркетплейс объектов на карте, встроенная CRM для риэлторов и застройщиков, привязка клиента ссылкой или QR с сохранением авторства и сквозная сделка до подписания документов. Приложение доступно в App Store и Google Play.',
    panel: <SearchScreen />,
  },
  {
    id: 'revenue',
    kicker: 'Шаг 03 · Выручка',
    title: 'Модель монетизации строится вокруг сделки',
    text: 'В модели — подписки профессиональных участников, комиссии с доведённых до договора сделок и партнёрские программы. Для покупателя приложение бесплатно; если он пришёл без своего риэлтора, сопровождение специалиста «БАСТ» также не требует оплаты. Юнит-экономику передаём в финансовой модели.',
    panel: (
      <ProofStack
        items={[
          { title: 'SaaS-подписки', text: 'Агентства и застройщики платят за рабочее пространство: CRM, объявления, команда, статистика.' },
          { title: 'Комиссии со сделок', text: 'Платформа участвует в сделках, доведённых до договора.' },
          { title: 'Партнёрские программы', text: 'Сертификаты и предложения партнёров вокруг сделки: ремонт, обустройство, товары для дома.' },
          { title: 'Реклама — направление роста', text: 'В планах — размещения компаний из сфер строительства, ремонта и благоустройства для загородной аудитории.' },
        ]}
      />
    ),
  },
  {
    id: 'why-now',
    kicker: 'Шаг 04 · Момент',
    title: 'На какой сдвиг отвечает продукт',
    text: 'Покупатели и профессиональные участники уже общаются с телефона, но объект, промо, переписка и сделка часто остаются в разных каналах. «БАСТ» соединяет этот путь в одном продукте.',
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
    title: 'Куда растёт платформа',
    text: 'Развитие идёт от работающего ядра — направления без привязки к датам.',
    panel: (
      <ProofStack
        items={[
          { title: 'Партнёрство с банками', text: 'В планах: льготная ипотека покупателям и финансирование застройщиков-партнёров — польза пользователям и новый источник комиссий.' },
          { title: 'Новые регионы', text: 'Архитектура позволяет подключать продавцов и агентства за пределами Удмуртии.' },
          { title: 'Веб-каталог', text: 'Сейчас каталог живёт в приложении, следующий шаг — веб.' },
          { title: 'Персональные подборки', text: 'Автоматический подбор объектов под запрос покупателя.' },
        ]}
      />
    ),
  },
  {
    id: 'materials',
    kicker: 'Шаг 06 · Материалы',
    title: 'Цифры и модель — в материалах по запросу',
    text: 'Тракшн, юнит-экономику и финансовую модель мы не публикуем на сайте: передаём инвесторам в материалах. Напишите — направим Pitch Deck и финансовую модель.',
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
            Мобильное приложение опубликовано, основные сценарии трёх ролей реализованы, веб-CRM готовится к публичному запуску. Расскажем детали и передадим материалы.
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
            Метрик и прогнозов на сайте нет намеренно: тракшн и юнит-экономику показываем в материалах, а не в рекламных цифрах.
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
      title={<>Инфраструктура{' '}<span className="block text-graphite/65">загородной сделки</span></>}
      subtitle="Одна платформа связывает покупателей, риэлторов и застройщиков — от поиска объекта до подписания договора. Приложение работает и развивается на рынке, где единой системы пока не сложилось."
      intro="Скрольте — инвест-история: как устроен рынок, что уже работает, на чём платформа зарабатывает и куда растёт."
      stages={stages}
      finale={<MaterialsFinale />}
      caption={null}
      mobileCaption={null}
    />
  )
}
