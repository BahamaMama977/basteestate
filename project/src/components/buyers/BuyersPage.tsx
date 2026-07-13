import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/home/Reveal'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { DealActsSection } from '@/components/home/sections/DealActsSection'
import { DealBenefitsSection } from '@/components/home/sections/PlatformOverviewSections'
import { VerificationSection } from '@/components/home/sections/VerificationSection'

function BuyerHero() {
  return (
    <section className="paper-grid bg-app-inset pb-20 pt-36 text-graphite md:pt-40">
      <div className="page-container px-5 sm:px-8 lg:px-12">
        <Reveal immediate>
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">Покупателям</span>
          <h1 className="display-title mt-7 max-w-4xl text-balance">Найдите дом<span className="block text-graphite/65"> и пройдите сделку с поддержкой</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">Смотрите объявления, прошедшие проверку команды «БАСТ», общайтесь с продавцом или риэлтором и следите за оформлением до подписания документов. Приложение бесплатно. Если у вас нет своего риэлтора, специалист команды «БАСТ» сопроводит сделку без оплаты с вашей стороны.</p>
          <AppStoreButtons className="mt-9" />
        </Reveal>
      </div>
    </section>
  )
}

const buyerFaq = [
  ['Нужно ли платить риэлтору команды «БАСТ»?', 'Нет. Если вы пришли без своего риэлтора, за сопровождение специалиста команды «БАСТ» покупатель не платит. Внешние расходы по сделке — например, банковские, нотариальные или государственные платежи — не относятся к этой услуге.'],
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
      <div className="page-container rounded-2xl border border-graphite/10 bg-app-inset p-7 text-center md:p-12">
        <Reveal><span className="eyebrow bg-graphite text-paper">Бесплатно для покупателей</span><h2 className="editorial-title mx-auto mt-6 max-w-3xl">Начните поиск дома в «БАСТ»</h2><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-graphite/70">Посмотрите объекты в Удмуртии и напишите продавцу или риэлтору прямо из объявления.</p><AppStoreButtons className="mt-8 justify-center" /></Reveal>
      </div>
    </section>
  )
}

export function BuyersPage() {
  return <><Header /><main id="main-content"><BuyerHero /><DealActsSection /><VerificationSection /><DealBenefitsSection /><BuyerFAQ /><BuyerFinalCTA /></main><Footer /></>
}
