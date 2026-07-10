'use client'

import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import {
  Check,
  ChevronDown,
  FileCheck2,
  Gift,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Ticket,
} from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { ChatScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

const searchFeatures = [
  {
    title: 'Карта и каталог',
    text: 'Смотрите доступные дома и переходите к подробной карточке объекта.',
  },
  {
    title: 'Фильтры',
    text: 'Уточняйте параметры поиска, чтобы сократить список подходящих вариантов.',
  },
  {
    title: 'Избранное',
    text: 'Сохраняйте дома, к которым хотите вернуться перед выбором.',
  },
  {
    title: 'История просмотров',
    text: 'Повторно открывайте объекты, которые уже изучали.',
  },
] as const

const verificationItems = [
  ['Продавец', 'личность, полномочия и надёжность'],
  ['Обременения', 'аресты, залоги и ограничения по объекту'],
  ['Реальность объекта', 'дом существует и соответствует объявлению'],
  ['Документы', 'сведения по объекту'],
  ['Цена', 'данные в объявлении'],
  ['Характеристики', 'параметры дома и участка'],
  ['Наличие объекта', 'актуальность предложения'],
] as const

const dealStages = [
  ['Сделка начата', 'Зафиксирован объект и участники'],
  ['Объект выбран', 'Дом связан с текущей сделкой'],
  ['Договор готовится', 'Команда собирает данные и документы'],
  ['Документы подписаны', 'Текущий сценарий сделки завершён'],
] as const

const faqItems = [
  ['Приложение бесплатное?', 'Да. Для покупателей приложение бесплатно.'],
  ['Где сейчас доступны объекты?', 'Сейчас в приложении представлены объекты в Удмуртии.'],
  ['Можно ли написать продавцу напрямую?', 'Да. Чат открывается из карточки объекта. В зависимости от объявления ответит продавец или ответственный риэлтор.'],
  ['Как договориться о показе?', 'Согласуйте дату и время в чате по выбранному дому. Переписка останется связанной с объектом.'],
  ['Кто проверяет объявления?', 'Перед публикацией команда «БАСТ» проверяет продавца и его надёжность, обременения, реальность объекта, документы, цену, характеристики и наличие.'],
  ['Кто помогает оформить сделку?', 'К оформлению подключаются сотрудники продавца или команда «БАСТ» со своими риэлторами.'],
  ['Чем заканчивается сделка в приложении?', 'Текущий сценарий завершается после подписания документов, без этапа передачи ключей.'],
] as const

function ListingPreview() {
  return (
    <div className="bezel-dark mx-auto w-full max-w-[520px]">
      <div className="bezel-core-dark overflow-hidden text-limestone-50">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-sage-300">Поиск дома</p>
            <p className="mt-1 text-sm font-semibold">Удмуртия</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]">
            <Search className="h-4 w-4" strokeWidth={1.2} />
          </span>
        </div>

        <div className="px-3 pb-3">
          <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-pine-800">
            <Image
              src="/images/verification-house.png"
              alt="Карточка загородного дома в приложении"
              fill
              className="object-cover"
              sizes="520px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/5 to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
              <span className="rounded-full bg-limestone-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-pine-950">
                Проверено
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pine-950/70">
                <Heart className="h-4 w-4" strokeWidth={1.2} />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-limestone-300">Завьяловский район</p>
              <p className="mt-2 font-display text-4xl leading-none">Дом у леса</p>
              <p className="mt-3 text-sm text-limestone-200">184 м² · участок 9 соток</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-3xl">12,8 млн ₽</span>
                <span className="rounded-full bg-clay-500 px-4 py-2 text-xs font-semibold">Открыть</span>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ['Карта', MapPin],
              ['Фильтры', SlidersHorizontal],
              ['Избранное', Heart],
            ].map(([label, Icon]) => {
              const IconComponent = Icon as typeof MapPin

              return (
                <div key={label as string} className="rounded-[1.1rem] bg-white/[0.055] p-3 ring-1 ring-inset ring-white/[0.07]">
                  <IconComponent className="h-4 w-4 text-sage-300" strokeWidth={1.2} />
                  <p className="mt-4 text-[10px] font-semibold">{label as string}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function QrCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] bg-limestone-50 p-3 text-pine-950">
      <QRCodeSVG
        value={value}
        size={116}
        bgColor="#FAF8F2"
        fgColor="#0B1712"
        level="M"
        marginSize={1}
        title={`QR-код: ${label}`}
      />
      <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.14em]">{label}</p>
    </div>
  )
}

function BuyersHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-pine-950 text-limestone-50">
      <Image
        src="/images/hero-house.png"
        alt="Загородный дом у леса"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.96)_0%,rgba(11,23,18,.82)_48%,rgba(11,23,18,.34)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pine-950 to-transparent" />

      <div className="page-container relative z-10 grid min-h-[100dvh] items-end gap-12 px-5 pb-14 pt-32 sm:px-8 md:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
        <Reveal>
          <span className="eyebrow bg-white/[0.08] text-sage-300 ring-1 ring-inset ring-white/10">Покупателям</span>
          <h1 className="display-title mt-7 max-w-5xl text-balance">
            Дом, который хочется увидеть.
            <span className="block text-mist-200">Сделка, которую легко понять</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-limestone-200 md:text-lg">
            Смотрите объекты в Удмуртии, пишите продавцу или риэлтору и следите за оформлением договора в одном приложении.
          </p>
          <AppStoreButtons light className="mt-9" />
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-limestone-300">
            <span>Бесплатно для покупателей</span>
            <span className="h-1 w-1 rounded-full bg-clay-400" />
            <span>App Store и Google Play</span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="hidden lg:block">
          <ListingPreview />
        </Reveal>
      </div>
    </section>
  )
}

function SearchSection() {
  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <span className="eyebrow bg-pine-950 text-limestone-50">Выбор объекта</span>
            <h2 className="section-title mt-7">Сначала найдите дом, который подходит вам</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-pine-600 lg:justify-self-end">
            Изучайте фотографии и характеристики, сохраняйте интересные варианты и возвращайтесь к ним перед показом.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {searchFeatures.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className={index === 0 || index === 3 ? 'xl:col-span-7' : 'xl:col-span-5'}
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

function ChatSection() {
  return (
    <section className="section-shell overflow-hidden bg-mist-100">
      <div className="page-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="flex justify-center">
          <ChatScreen />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow bg-clay-500 text-limestone-50">Связь по объекту</span>
          <h2 className="section-title mt-7">Напишите продавцу и договоритесь о показе</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Чат открывается из карточки дома. Уточните детали, запросите документы и согласуйте время показа — переписка останется связанной с объектом.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'Не нужно искать контакт в другом сервисе',
              'Вся переписка относится к выбранному дому',
              'К диалогу может подключиться ответственный риэлтор',
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

function VerificationSection() {
  return (
    <section className="relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="page-container grid lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="relative min-h-[520px] lg:min-h-full">
          <Image
            src="/images/verification-house.png"
            alt="Загородный дом перед публикацией объявления"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-pine-950" />
          <div className="absolute bottom-6 left-6 right-6 rounded-[1.6rem] bg-pine-950/90 p-5 ring-1 ring-inset ring-white/10 md:max-w-md">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-500">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.2} />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-sage-300">Статус объявления</p>
                <p className="mt-1 font-display text-2xl">Проверено командой «БАСТ»</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="w-full">
            <span className="eyebrow bg-white/[0.07] text-sage-300">До публикации</span>
            <h2 className="section-title mt-7">Проверяем каждый объект до публикации</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-limestone-300">
              Каждый объект проходит проверку на обременения, реальность и надёжность продавца. «БАСТ» — безопасная среда, где нет места мошенникам.
            </p>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {verificationItems.map(([title, detail]) => (
                <div key={title} className="grid grid-cols-[1fr_auto] items-center gap-5 py-4">
                  <div>
                    <p className="font-display text-2xl">{title}</p>
                    <p className="mt-1 text-[10px] text-sage-300">{detail}</p>
                  </div>
                  <Check className="h-5 w-5 text-clay-400" strokeWidth={1.2} />
                </div>
              ))}
            </div>
            <p className="mt-7 text-xs leading-6 text-limestone-400">
              Проверка объявления не заменяет юридическую проверку перед покупкой.
            </p>
            <HomeButton href={siteLinks.verification} variant="text" className="mt-8 text-limestone-50">
              Как проходит проверка
            </HomeButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DealSection() {
  return (
    <section className="section-shell bg-limestone-100">
      <div className="page-container">
        <Reveal className="max-w-5xl">
          <span className="eyebrow bg-mist-200 text-pine-700">Оформление</span>
          <h2 className="section-title mt-7">Вы видите, что происходит после выбора дома</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-pine-600">
            Можно прийти без своего риэлтора — просто с запросом на покупку. Сделку проведут сотрудники продавца или команда «БАСТ» со своими риэлторами, а оформление для покупателя бесплатное. Текущий этап отображается в приложении.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="bezel-dark">
            <div className="bezel-core-dark flex min-h-[560px] flex-col p-7 text-limestone-50 md:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-300">Участники сделки</p>
              <h3 className="mt-5 font-display text-5xl leading-[0.94]">Помощь остаётся рядом</h3>
              <p className="mt-6 text-sm leading-7 text-limestone-300">
                В зависимости от объекта оформление ведут сотрудники продавца или риэлторы команды «БАСТ».
              </p>
              <div className="mt-auto space-y-3 pt-12">
                {[
                  'Покупатель',
                  'Продавец или риэлтор',
                  'Команда сопровождения',
                ].map((label) => (
                  <div key={label} className="flex items-center gap-4 rounded-[1.2rem] bg-white/[0.055] p-4 ring-1 ring-inset ring-white/[0.07]">
                    <p className="text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bezel">
            <div className="bezel-core min-h-[560px] p-7 md:p-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-clay-500">Статус сделки</p>
                <p className="mt-3 font-display text-4xl">Договор готовится</p>
              </div>

              <div className="mt-12">
                {dealStages.map(([title, text], index) => (
                  <div key={title} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-9 last:pb-0">
                    {index < dealStages.length - 1 && (
                      <span className="absolute bottom-0 left-[1.31rem] top-10 w-px bg-pine-950/10" />
                    )}
                    <span className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
                      index < 3 ? 'bg-pine-950 text-limestone-50' : 'bg-mist-100 text-sage-600'
                    }`}>
                      {index < 3 ? <Check className="h-4 w-4" strokeWidth={1.3} /> : <FileCheck2 className="h-4 w-4" strokeWidth={1.2} />}
                    </span>
                    <div className="pt-1">
                      <p className="font-display text-3xl leading-none">{title}</p>
                      <p className="mt-3 text-xs leading-5 text-pine-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 border-t border-pine-950/10 pt-6 text-xs leading-6 text-pine-500">
                Сценарий в приложении завершается подписанием документов, без этапа передачи ключей.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function RewardsSection() {
  const rewards = [
    {
      title: 'Сертификаты БАСТ',
      text: 'После сделки открываются скидки у компаний-партнёров на ремонт, мебель и обустройство дома.',
      Icon: Ticket,
    },
    {
      title: 'Бонусы застройщика',
      text: 'Застройщик добавляет к объекту собственные акции: скидку или подарок к покупке.',
      Icon: Gift,
    },
    {
      title: 'Всё видно заранее',
      text: 'Акции и бонусы показаны прямо в карточке дома — вы учитываете их ещё при выборе.',
      Icon: Sparkles,
    },
  ] as const

  return (
    <section className="section-shell relative overflow-hidden bg-pine-950 text-limestone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(198,161,90,.16),transparent_44%)]" />
      <div className="page-container relative">
        <Reveal className="max-w-4xl">
          <span className="eyebrow bg-gold-500 text-pine-950">После сделки</span>
          <h2 className="section-title mt-7">Покупка дома — начало выгод, а не конец</h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-limestone-300">
            После заключения сделки вы получаете сертификаты приложения на обустройство дома и бонусы застройщика. А все действующие акции видны в каталоге ещё до покупки.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {rewards.map(({ title, text, Icon }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="bezel-dark h-full">
                <div className="bezel-core-dark flex h-full min-h-[300px] flex-col p-7 md:p-9">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                    <Icon className="h-5 w-5" strokeWidth={1.2} />
                  </span>
                  <h3 className="mt-auto pt-14 font-display text-3xl leading-none md:text-4xl">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-limestone-300">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
          <h2 className="section-title mt-7">Сейчас объекты доступны в Удмуртии</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-pine-600">
            Приложение готово к работе в других регионах России, когда к платформе подключатся местные продавцы, агентства и застройщики.
          </p>
          <AppStoreButtons className="mt-9" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bezel">
            <div className="bezel-core relative min-h-[500px] overflow-hidden p-7 md:p-10">
              <span className="absolute -right-4 -top-10 font-display text-[15rem] leading-none text-pine-950/[0.035] md:text-[21rem]">18</span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_46%,rgba(184,103,70,.13),transparent_22%)]" />
              <div className="relative flex h-full min-h-[440px] items-center justify-center">
                <div className="relative h-80 w-80 rounded-full border border-pine-950/10 sm:h-96 sm:w-96">
                  <div className="absolute inset-[12%] rounded-full border border-pine-950/[0.08]" />
                  <div className="absolute inset-[28%] rounded-full border border-pine-950/[0.08]" />
                  <span className="absolute left-[52%] top-[44%] h-4 w-4 rounded-full bg-clay-500 ring-8 ring-clay-500/10" />
                  <span className="absolute left-[55%] top-[49%] h-px w-[28%] origin-left rotate-[18deg] bg-pine-950/20" />
                  <span className="absolute right-0 top-[57%] rounded-full bg-pine-950 px-4 py-2 text-xs font-semibold text-limestone-50">
                    Удмуртия
                  </span>
                  <span className="absolute left-[17%] top-[22%] h-2.5 w-2.5 rounded-full bg-sage-400" />
                  <span className="absolute bottom-[18%] left-[30%] h-2.5 w-2.5 rounded-full bg-sage-400" />
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
          <span className="eyebrow bg-white/[0.07] text-sage-300">Перед установкой</span>
          <h2 className="section-title mt-7">Коротко о главном</h2>
        </Reveal>

        <Reveal delay={0.1} className="bezel-dark">
          <div className="bezel-core-dark divide-y divide-white/10 px-6 md:px-9">
            {faqItems.map(([question, answer], index) => (
              <details key={question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-2xl leading-none md:text-3xl">{question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180 group-open:bg-clay-500">
                    <ChevronDown className="h-4 w-4" strokeWidth={1.2} />
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
      <Image src="/images/cta-house.png" alt="Загородный дом вечером" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,18,.46),rgba(11,23,18,.82)_55%,rgba(11,23,18,.94))]" />
      <div className="section-shell page-container relative flex min-h-[720px] items-end">
        <Reveal className="grid w-full gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow bg-white/[0.08] text-sage-300">Бесплатно для покупателей</span>
            <h2 className="section-title mt-7 max-w-5xl">Посмотрите дома в приложении «БАСТ»</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-limestone-200">
              Установите приложение, выберите объект в Удмуртии и напишите продавцу или риэлтору.
            </p>
            <AppStoreButtons light className="mt-8" />
          </div>

          <div className="bezel-dark hidden w-fit md:block">
            <div className="bezel-core-dark p-4">
              <div className="flex gap-3">
                <QrCard value={siteLinks.appStore} label="App Store" />
                <QrCard value={siteLinks.googlePlay} label="Google Play" />
              </div>
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-sage-300">
                Наведите камеру на нужный код
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function BuyersPage() {
  return (
    <>
      <Header />
      <main>
        <BuyersHero />
        <SearchSection />
        <ChatSection />
        <VerificationSection />
        <DealSection />
        <RewardsSection />
        <GeographySection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
