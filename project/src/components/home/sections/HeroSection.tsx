import Image from 'next/image'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { siteLinks } from '@/lib/site'

/** Полноэкранная тезисная сцена: сначала мир загородного дома, затем продукт. */
export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-graphite text-white">
      <Image
        src="/images/generated/bast-hero-real-v1.webp"
        alt="Загородный дом среди леса"
        fill
        priority
        className="object-cover object-[62%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,23,.88)_0%,rgba(15,18,23,.66)_38%,rgba(15,18,23,.08)_75%,rgba(15,18,23,.22)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,23,.18)_0%,transparent_35%,rgba(15,18,23,.58)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />

      <div className="page-container relative z-10 flex min-h-[100dvh] items-end px-5 pb-6 pt-24 sm:px-8 sm:pb-12 sm:pt-32 md:pb-16 lg:px-12">
        <Reveal immediate className="max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow border border-white bg-white text-graphite">
              БАСТ Недвижимость
            </span>
            <span className="eyebrow border border-white/20 bg-white/10 text-white/80 backdrop-blur-md">
              Платформа загородной недвижимости
            </span>
          </div>
          <h1 className="mt-5 max-w-6xl text-balance font-display text-[clamp(3.25rem,8.4vw,8.4rem)] font-medium leading-[0.82] tracking-[-0.045em] sm:mt-7 sm:text-[clamp(4rem,8.4vw,8.4rem)]">
            БАСТ — от поиска дома{' '}
            <span className="block text-white/70">до подписания документов</span>
          </h1>
          <div className="mt-6 grid gap-7 border-t border-white/20 pt-5 sm:mt-8 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Одна платформа для всех участников рынка: покупателей, риэлторов и застройщиков.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <HomeButton href={siteLinks.developers}>Подключить объекты</HomeButton>
              <HomeButton href={siteLinks.buyersPipeline} variant="light">Найти дом</HomeButton>
            </div>
          </div>
          <div className="mt-5 sm:mt-7">
            <AppStoreButtons light />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
