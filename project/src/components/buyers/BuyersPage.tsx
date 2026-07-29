import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/home/Reveal'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { SearchScreen } from '@/components/app-screens'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { DealBenefitsSection } from '@/components/home/sections/PlatformOverviewSections'
import { VerificationSection } from '@/components/home/sections/VerificationSection'
import { RoleHeroBackground } from '@/components/site/RoleHeroBackground'
import { BuyerEntryForkSection } from './BuyerEntryForkSection'

function BuyerHero() {
  return (
    <section className="relative min-h-[88dvh] overflow-hidden bg-app-inset pb-16 pt-32 text-graphite md:pt-36">
      <RoleHeroBackground />
      <div className="page-container relative grid min-h-[calc(88dvh-8rem)] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
        <Reveal immediate>
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Покупателям</span>
          <h1 className="display-title mt-7 max-w-4xl text-balance">Найдите дом<span className="block text-graphite/65">и доведите сделку до документов</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">
            Напишите застройщику самостоятельно — тогда к сделке подключится риэлтор команды «БАСТ». Или откройте приглашение риэлтора-партнёра, который будет вести вас до подписания документов.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-graphite/60">Приложение и сопровождение риэлтора команды «БАСТ» бесплатны для покупателя.</p>
          <AppStoreButtons className="mt-8" />
        </Reveal>
        <Reveal immediate delay={0.08} className="relative hidden min-h-[660px] place-items-center overflow-hidden rounded-[2rem] border border-graphite/10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.96),transparent_30%),linear-gradient(180deg,#edf3f0,#e4e9e5)] shadow-soft lg:grid">
          <div className="w-full max-w-[320px]"><SearchScreen /></div>
          <p className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/55">Каталог загородных домов</p>
        </Reveal>
      </div>
    </section>
  )
}

const buyerFaq = [
  ['Кто будет вести мою сделку?', 'Если вы написали застройщику самостоятельно, к сделке подключится риэлтор команды «БАСТ». Если вас пригласил риэлтор-партнёр, сделку проведёт он.'],
  ['Нужно ли платить риэлтору команды «БАСТ»?', 'Нет. Покупатель не платит за сопровождение риэлтора команды «БАСТ». Банковские, нотариальные и государственные расходы оплачиваются отдельно.'],
  ['Что проверяется до публикации?', 'Команда сверяет сведения о продавце, документах, цене, характеристиках и наличии объекта. Такая проверка не гарантирует юридическую чистоту сделки и не заменяет юридическую проверку перед покупкой.'],
  ['Когда видны акции и сертификаты?', 'Акции застройщика видны в объявлении до покупки. После подписания документов покупатель видит доступные ему сертификаты партнёров на ремонт, обустройство, товары и услуги.'],
  ['Где доступны объекты?', 'Сейчас актуальные объекты представлены в Удмуртии.'],
] as const

function BuyerFAQ() {
  return (
    <section className="section-shell bg-app-inset">
      <div className="page-container grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
        <Reveal><span className="eyebrow bg-paper text-graphite/70">FAQ</span><h2 className="section-heading mt-6">Перед поиском дома</h2></Reveal>
        <Reveal className="space-y-3">
          {buyerFaq.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-graphite/10 bg-paper p-5"><summary className="cursor-pointer list-none font-heading text-lg font-semibold marker:hidden">{question}</summary><p className="mt-4 text-sm leading-7 text-graphite/70">{answer}</p></details>)}
        </Reveal>
      </div>
    </section>
  )
}

function BuyerFinalCTA() {
  return (
    <section className="section-shell bg-paper">
      <div className="page-container grid overflow-hidden rounded-[2rem] border border-graphite/10 bg-app-inset lg:grid-cols-[.85fr_1.15fr]">
        <Reveal className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
          <span className="eyebrow w-fit bg-app-brand text-white">Бесплатно для покупателей</span>
          <h2 className="editorial-title mt-6 max-w-3xl">Начните с дома, который вам подходит</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">Откройте каталог объектов в Удмуртии и выберите, как войти в сделку.</p>
          <AppStoreButtons className="mt-8" />
        </Reveal>
        <div className="relative min-h-[380px] lg:min-h-[560px]">
          <Image src="/images/generated/bast-role-buyer-day-real-v2.webp" alt="Покупатели изучают загородный дом в приложении" fill className="object-cover object-center" sizes="(min-width:1024px) 58vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-app-inset/35 to-transparent lg:from-app-inset/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export function BuyersPage() {
  return <><Header /><main id="main-content"><BuyerHero /><BuyerEntryForkSection /><DealActsSection /><VerificationSection /><DealBenefitsSection /><BuyerFAQ /><BuyerFinalCTA /></main><Footer /></>
}
