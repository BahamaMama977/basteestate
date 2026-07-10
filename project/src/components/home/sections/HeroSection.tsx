import Image from 'next/image'
import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { SearchScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** Акт 1 «Поиск»: графитовый hero, антиква-заголовок, телефон с картой. */
export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-graphite-deep text-app-dark-text">
      <Image
        src="/images/hero-house.png"
        alt="Загородный дом рядом с лесом"
        fill
        priority
        className="object-cover object-center opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,23,.95)_0%,rgba(15,18,23,.78)_42%,rgba(15,18,23,.28)_78%,rgba(15,18,23,.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite-deep to-transparent" />

      <div className="page-container relative z-10 flex min-h-[100dvh] items-end px-5 pb-16 pt-32 sm:px-8 md:pb-20 lg:px-12">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">
              Мобильная платформа для загородной недвижимости
            </span>
            <h1 className="display-title mt-7 max-w-5xl text-balance">
              Найдите дом.
              <span className="block text-app-dark-caption">Доведите сделку до договора</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">
              Покупатели ищут объекты и общаются с продавцами. Риэлторы ведут клиентов. Застройщики управляют обращениями — всё в одной платформе.
            </p>
            <div className="mt-9">
              <AppStoreButtons light />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-app-dark-caption">
              <span>Бесплатно для покупателей</span>
              <span className="h-1 w-1 rounded-full bg-app-dark-trust" />
              <span>Объекты в Удмуртии</span>
              <HomeButton href={siteLinks.developers} variant="text" className="text-app-dark-text">
                Размещаете объекты?
              </HomeButton>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="hidden lg:block">
            <SearchScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Акт 01 · Поиск дома
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
