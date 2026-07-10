'use client'

import Image from 'next/image'
import {
  Check,
  ChevronDown,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { DealScreen } from '@/components/app-screens'
import { verification } from '@/lib/demo-deal'
import { siteLinks } from '@/lib/site'

const partnerHref = 'mailto:partners@bast-estate.ru?subject=Стать партнёром БАСТ'

const agencyBenefits = [
  {
    title: 'Объекты всех застройщиков',
    text: 'Команда видит объявления разных застройщиков и работает с ними без предварительных договорённостей — условия партнёрства заданы в каждой карточке.',
  },
  {
    title: 'Диалоги с контекстом',
    text: 'Покупатель пишет из карточки дома, поэтому риэлтор сразу понимает, какой объект обсуждается.',
  },
  {
    title: 'Команда и роли',
    text: 'Руководитель может держать в поле зрения сотрудников, объекты и текущие обращения.',
  },
  {
    title: 'Сопровождение сделки',
    text: 'После выбора объекта участники переходят к оформлению договора и видят понятные этапы.',
  },
] as const

const cabinetItems = [
  ['Объекты', 'Карточки, статусы, ответственные'],
  ['Команда', 'Сотрудники и распределение работы'],
  ['Диалоги', 'Переписка покупателей по объектам'],
  ['Сделки', 'Этапы до подписания документов'],
] as const

const workflow = [
  ['Покупатель выбирает дом', 'Объект найден в приложении или через рекомендацию агентства.'],
  ['Открывает чат', 'В диалоге остаётся объект, вопрос и участник со стороны продавца.'],
  ['Команда ведёт показ', 'Риэлтор согласует детали, документы и следующий шаг.'],
  ['Оформляется договор', 'Сделка проходит этапы до подписания документов.'],
] as const

const verificationItems = verification.map((v) => v.label)

const faqItems = [
  ['Какое главное действие для агентства?', 'Оставить заявку «Стать партнёром». После этого команда «БАСТ» обсудит подключение агентства и объектов.'],
  ['Нужно ли сразу описывать формат работы?', 'Нет. Детали подключения команда «БАСТ» обсуждает напрямую с партнёром.'],
  ['Как клиент закрепляется за риэлтором?', 'По вашей ссылке, инвайт-коду или QR-коду на показе. После первого открытия клиент привязан к вам, а авторство сохраняется в сделке.'],
  ['Есть ли личный кабинет?', 'Да. У агентства есть кабинет с командой и всеми объектами.'],
  ['Кто общается с покупателем?', 'Покупатель может написать продавцу или ответственному риэлтору из карточки объявления.'],
  ['Кто помогает оформить сделку?', 'К оформлению подключается команда приложения либо сотрудники продавца. В команде «БАСТ» есть свои риэлторы.'],
  ['Где сейчас работает платформа?', 'Сейчас фокус — Удмуртия. При подключении партнёров модель можно масштабировать на другие регионы России.'],
] as const

function AgencyHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородный дом в каталоге агентства"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.84)_46%,rgba(11,23,18,.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Агентствам недвижимости</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Партнёрский канал для объектов,{' '}
            <span className="block text-mist-200">команды и сделок</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Подключайте агентство к «БАСТ»: ведите объекты, команду, обращения покупателей и этапы оформления в одном рабочем пространстве.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <HomeButton href={partnerHref} variant="light" external>
              Стать партнёром
            </HomeButton>
            <HomeButton href={siteLinks.buyers} variant="text" className="text-limestone-100">
              Как это видит покупатель
            </HomeButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Личный кабинет агентства</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Команда и все объекты</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>Подключение обсуждается напрямую</span>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="hidden lg:block">
          <DealScreen />
        </Reveal>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Зачем подключаться</span>
            <h2 className="section-heading mt-7">Агентство получает не сайт-визитку, а рабочий контур</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Страница агентства на сайте должна вести к партнёрству, а не раскрывать внутренние детали подключения. Поэтому акцент — на управлении объектами, коммуникации и оформлении.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {agencyBenefits.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className={index === 1 || index === 2 ? 'xl:col-span-7' : 'xl:col-span-5'}
            >
              <article className="bezel h-full">
                <div className="bezel-core flex min-h-72 h-full flex-col p-7 md:p-9">
                  <div className="flex items-center justify-end">
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-pine-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-auto pt-16 font-display text-4xl leading-none md:text-5xl">{item.title}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-pine-600">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CabinetSection() {
  return (
    <section className="section-shell overflow-hidden bg-mist-100">
      <div className="page-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <div className="bezel">
            <div className="bezel-core p-5 md:p-7">
              <div className="rounded-[1.6rem] bg-pine-950 p-5 text-limestone-50 md:p-7">
                <div className="border-b border-white/10 pb-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Панель агентства</p>
                  <p className="mt-2 font-display text-3xl leading-none">Все объекты и команда</p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {cabinetItems.map(([title, text]) => (
                    <div key={title} className="rounded-[1.25rem] bg-white/[0.055] p-5 ring-1 ring-inset ring-white/[0.07]">
                      <p className="font-display text-3xl leading-none">{title}</p>
                      <p className="mt-4 text-xs leading-5 text-limestone-300">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.25rem] bg-limestone-50 p-4 text-pine-950">
                  <p className="text-sm font-semibold">Объект готов к следующему действию</p>
                  <p className="mt-1 text-[10px] text-pine-500">Показ согласован, договор готовится</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow bg-clay-500 text-limestone-50">Личный кабинет</span>
          <h2 className="section-heading mt-7">Руководителю видно, кто и что ведёт</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Кабинет собирает команду и объекты в одном месте. Это снижает риск потерять диалог, забыть ответственного или разорвать связь между объектом и сделкой.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Сотрудники работают с общей базой объектов',
              'Обращения покупателей остаются привязаны к карточкам домов',
              'Акции застройщиков видны риэлтору — весомый аргумент для клиента',
              'Этапы сделки видны без ручной сверки в нескольких инструментах',
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 border-b border-pine-950/[0.09] pb-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pine-950 text-limestone-50">
                  <Check className="h-3.5 w-3.5" strokeWidth={1.3} />
                </span>
                <p className="text-sm text-pine-700">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClientAttributionSection() {
  const points = [
    ['Личная ссылка и QR', 'На объект или на вас. Ссылка стабильна, её можно разместить на баннере.'],
    ['Привязка в один шаг', 'Клиент сканирует QR или открывает ссылку и закрепляется автоматически.'],
    ['Защита от ошибок', 'Нельзя привязаться к себе или к уже закреплённому клиенту.'],
    ['Вознаграждение заранее', 'Продавец указывает размер вознаграждения в объявлении — вы видите его по каждому дому ещё до начала работы.'],
  ] as const

  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-pine-950 text-limestone-50">Клиент и авторство</span>
          <h2 className="section-heading mt-7">Клиент закреплён за вами — спор об авторстве закрыт</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Поделитесь объектом или профилем ссылкой, инвайт-кодом или QR-кодом на показе. Клиент открывает — и привязывается к вам. Даже если оформление ведёт застройщик или команда «БАСТ», риэлтора не исключат из сделки: авторство фиксируется и сохраняется на всех этапах.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map(([title, text]) => (
              <div key={title} className="border-t border-pine-950/10 pt-4">
                <p className="font-display text-2xl leading-none">{title}</p>
                <p className="mt-3 text-sm leading-6 text-pine-600">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bezel-dark">
            <div className="bezel-core-dark p-6 text-limestone-50 md:p-8">
              <div className="border-b border-white/10 pb-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Привязка клиента</p>
                <p className="mt-2 font-display text-3xl leading-none">Клиент закреплён</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Ссылка', 'Инвайт', 'QR на показе'].map((label) => (
                  <div key={label} className="rounded-[1.25rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                    <p className="text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.25rem] bg-limestone-50 p-4 text-pine-950">
                <p className="text-sm font-semibold">Автор сделки — вы</p>
                <p className="mt-1 text-[10px] text-pine-500">Бонус за клиента сохранён</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WorkflowSection() {
  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container">
        <Reveal className="max-w-5xl">
          <span className="eyebrow bg-white/[0.07] text-sage-300">Путь покупателя</span>
          <h2 className="section-heading mt-7">От интереса к объекту до подписания документов</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-limestone-300">
            Агентству важно не просто получить контакт, а сохранить контекст: какой дом интересен покупателю, кто отвечает и что уже согласовано.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.62fr_1.38fr]">
          <Reveal className="bezel-dark">
            <div className="bezel-core-dark flex min-h-[540px] flex-col p-7 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Контекст обращения</p>
              <h3 className="mt-5 font-display text-5xl leading-[0.94]">Диалог начинается из объекта</h3>
              <p className="mt-6 text-sm leading-7 text-limestone-300">
                В карточке уже есть дом, характеристики, продавец или ответственный риэлтор. Команда не начинает разговор с нуля.
              </p>
              <div className="mt-auto rounded-[1.3rem] bg-white/[0.055] p-5 ring-1 ring-inset ring-white/[0.07]">
                <p className="text-xs leading-6 text-limestone-200">
                  «Здравствуйте. Можно посмотреть дом в субботу и заранее увидеть документы?»
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bezel">
            <div className="bezel-core min-h-[540px] p-7 md:p-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-clay-500">Сценарий работы</p>
                <p className="mt-3 font-display text-4xl">Показ → договор → документы</p>
              </div>

              <div className="mt-12">
                {workflow.map(([title, text], index) => (
                  <div key={title} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-9 last:pb-0">
                    {index < workflow.length - 1 && (
                      <span className="absolute bottom-0 left-[1.31rem] top-10 w-px bg-pine-950/10" />
                    )}
                    <span className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
                      index < 3 ? 'bg-pine-950 text-limestone-50' : 'bg-mist-100 text-sage-600'
                    }`}>
                      {index < 3 ? <Check className="h-4 w-4" strokeWidth={1.3} /> : <FileCheck2 className="h-4 w-4" strokeWidth={1.1} />}
                    </span>
                    <div className="pt-1">
                      <p className="font-display text-3xl leading-none">{title}</p>
                      <p className="mt-3 text-xs leading-5 text-pine-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 border-t border-pine-950/10 pt-6 text-xs leading-6 text-pine-500">
                Текущий сценарий завершается подписанием документов, без этапа передачи ключей.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function VerificationSection() {
  return (
    <section className="relative overflow-hidden bg-limestone-100">
      <div className="page-container grid lg:min-h-[760px] lg:grid-cols-[0.96fr_1.04fr]">
        <Reveal className="relative min-h-[520px] lg:min-h-full">
          <Image
            src="/images/cta-house.png"
            alt="Загородный дом перед публикацией в каталоге"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/75 via-pine-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-limestone-100" />
          <div className="absolute bottom-6 left-6 right-6 rounded-[1.6rem] bg-pine-950/90 p-5 text-limestone-50 ring-1 ring-inset ring-white/10 md:max-w-md">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-500">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.1} />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-sage-300">Перед публикацией</p>
                <p className="mt-1 font-display text-2xl">Объявление проходит проверку</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="w-full">
            <span className="eyebrow bg-pine-950 text-limestone-50">Доверие к каталогу</span>
            <h2 className="section-heading mt-7">Проверка помогает агентству не вести покупателя в пустоту</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-pine-600">
              Команда «БАСТ» проверяет сведения перед публикацией. Это не заменяет юридическую проверку перед покупкой, но помогает держать каталог чище.
            </p>
            <div className="mt-10 divide-y divide-pine-950/10 border-y border-pine-950/10">
              {verificationItems.map((item) => (
                <div key={item} className="grid grid-cols-[1fr_auto] items-center gap-5 py-4">
                  <p className="font-display text-2xl">{item}</p>
                  <Check className="h-5 w-5 text-clay-500" strokeWidth={1.2} />
                </div>
              ))}
            </div>
            <HomeButton href={siteLinks.verification} variant="text" className="mt-8">
              Как проходит проверка
            </HomeButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function GeographySection() {
  return (
    <section className="section-shell overflow-hidden bg-mist-100">
      <div className="page-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-clay-500 text-limestone-50">География</span>
          <h2 className="section-heading mt-7">Стартуем с Удмуртии, но модель не привязана к одному региону</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Сейчас фокус — объекты и партнёры в Удмуртии. При подключении местных агентств и продавцов приложение может работать в других регионах России.
          </p>
          <HomeButton href={partnerHref} external className="mt-9">
            Стать партнёром
          </HomeButton>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bezel">
            <div className="bezel-core relative min-h-[500px] overflow-hidden p-7 md:p-10">
              <span className="absolute -right-4 -top-10 font-display text-[15rem] leading-none text-pine-950/[0.035] md:text-[21rem]">18</span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_46%,rgba(200,169,106,.10),transparent_22%)]" />
              <div className="relative flex h-full min-h-[440px] items-center justify-center">
                <div className="relative h-80 w-80 rounded-full border border-pine-950/10 sm:h-96 sm:w-96">
                  <div className="absolute inset-[12%] rounded-full border border-pine-950/[0.08]" />
                  <div className="absolute inset-[28%] rounded-full border border-pine-950/[0.08]" />
                  <span className="absolute left-[52%] top-[44%] h-4 w-4 rounded-full bg-clay-500 ring-8 ring-clay-500/10" />
                  <span className="absolute left-[55%] top-[49%] h-px w-[28%] origin-left rotate-[18deg] bg-pine-950/20" />
                  <span className="absolute right-0 top-[57%] rounded-full bg-pine-950 px-4 py-2 text-xs font-semibold text-limestone-50">
                    Удмуртия
                  </span>
                  <span className="absolute left-[17%] top-[22%] rounded-full bg-limestone-50 px-3 py-1.5 text-[10px] font-semibold text-pine-700 ring-1 ring-pine-950/10">
                    Агентства
                  </span>
                  <span className="absolute bottom-[18%] left-[30%] rounded-full bg-limestone-50 px-3 py-1.5 text-[10px] font-semibold text-pine-700 ring-1 ring-pine-950/10">
                    Объекты
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="section-shell bg-pine-950 text-limestone-50">
      <div className="page-container grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
        <Reveal>
          <span className="eyebrow bg-white/[0.07] text-sage-300">Перед подключением</span>
          <h2 className="section-heading mt-7">Что важно знать агентству</h2>
        </Reveal>

        <Reveal delay={0.1} className="bezel-dark">
          <div className="bezel-core-dark divide-y divide-white/10 px-6 md:px-9">
            {faqItems.map(([question, answer], index) => (
              <details key={question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-2xl leading-none md:text-3xl">{question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180 group-open:bg-clay-500">
                    <ChevronDown className="h-4 w-4" strokeWidth={1.1} />
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 text-sm leading-7 text-limestone-300">{answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-pine-950 text-limestone-50">
      <Image src="/images/cta-house.png" alt="Загородный дом для партнёрского подключения" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.50),rgba(11,23,18,.82)_52%,rgba(11,23,18,.95))]" />
      <div className="section-shell page-container relative flex min-h-[720px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Партнёрство</span>
            <h2 className="section-title mt-7 max-w-5xl">Подключите агентство к «БАСТ»</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-limestone-200">
              Напишите команде приложения. Обсудим регион, объекты, кабинет агентства и формат работы напрямую с командой «БАСТ».
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <HomeButton href={partnerHref} variant="light" external>
                Стать партнёром
              </HomeButton>
              <HomeButton href={siteLinks.contact} variant="text" className="text-limestone-100">
                Контакты
              </HomeButton>
            </div>
          </div>

          <div className="bezel-dark max-w-sm">
            <div className="bezel-core-dark p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Что приложить к заявке</p>
              <div className="mt-6 space-y-4">
                {['Регион работы', 'Типы объектов', 'Количество сотрудников', 'Кто будет вести подключение'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={1.3} />
                    </span>
                    <p className="text-sm text-limestone-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function AgenciesPage() {
  return (
    <>
      <Header />
      <main>
        <AgencyHero />
        <BenefitsSection />
        <CabinetSection />
        <ClientAttributionSection />
        <WorkflowSection />
        <VerificationSection />
        <GeographySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
