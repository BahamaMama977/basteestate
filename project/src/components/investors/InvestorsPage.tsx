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
    <div className="rounded-[1.5rem] border border-app-line bg-app-bg p-6">
      <span className="font-mono text-[11px] tracking-[0.18em] text-app-gold">{`0${index}`}</span>
      <p className="mt-5 font-heading text-xl font-semibold leading-tight text-graphite">{title}</p>
      <p className="mt-3 text-sm leading-6 text-graphite/70">{text}</p>
    </div>
  )
}

function ProofStack({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <div className="space-y-4">
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
    title: 'Четыре источника выручки на одной платформе',
    text: 'Платформа зарабатывает на профессиональных участниках рынка — для покупателя приложение бесплатно, сделку сопровождают без комиссии с него. Юнит-экономику и разбивку выручки передаём в финансовой модели.',
    panel: (
      <ProofStack
        items={[
          { title: 'SaaS-подписки', text: 'Агентства и застройщики платят за рабочее пространство: CRM, объявления, команда, статистика.' },
          { title: 'Комиссии со сделок', text: 'Платформа участвует в сделках, доведённых до договора.' },
          { title: 'Партнёрские программы', text: 'Сертификаты и предложения партнёров вокруг сделки: ремонт, обустройство, товары для дома.' },
          { title: 'Реклама', text: 'Размещения, смежные со строительством, ремонтом и благоустройством, с таргетом на загородную аудиторию.' },
        ]}
      />
    ),
  },
  {
    id: 'why-now',
    kicker: 'Шаг 04 · Момент',
    title: 'Почему это работает именно сейчас',
    text: 'Спрос на загородную жизнь высок, сделка и общение уходят в телефон, а единого инфраструктурного слоя для загорода не сложилось — ниша открыта.',
    panel: (
      <ProofStack
        items={[
          { title: 'Спрос на загород', text: 'Интерес к загородной жизни устойчиво высок.' },
          { title: 'Мобильное поведение', text: 'Общение и оформление уходят в телефон; QR и приложения привычны.' },
          { title: 'Нет инфраструктурного слоя', text: 'Единой системы «объект → сделка → договор» для загорода не сложилось.' },
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
          <h2 className="section-title mt-6">Инфраструктура загородной сделки</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-app-dark-caption">
            Приложение работает, конвейеры трёх ролей замкнуты, модель монетизации собрана. Расскажем детали и передадим материалы.
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
      title={<>Инфраструктура<span className="block text-app-dark-caption">загородной сделки</span></>}
      subtitle="Одна платформа связывает покупателей, риэлторов и застройщиков — от поиска объекта до подписания договора. Приложение работает и развивается на рынке, где единой системы пока не сложилось."
      intro="Скрольте — инвест-история: как устроен рынок, что уже работает, на чём платформа зарабатывает и куда растёт."
      stages={stages}
      finale={<MaterialsFinale />}
      caption={null}
      mobileCaption={null}
    />
  )
}
