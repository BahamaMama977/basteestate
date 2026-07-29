import Image from 'next/image'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'

const roles = [
  ['Покупатель', 'ищет дом'],
  ['Риэлтор', 'ведёт клиента'],
  ['Застройщик', 'управляет объектами'],
] as const

/** Светлая продуктовая сцена: приложение, три роли и один маршрут сделки. */
export function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden border-b border-graphite/10 bg-paper text-graphite"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(47,107,95,.09),transparent_30%),linear-gradient(90deg,transparent_0%,transparent_49.9%,rgba(35,38,47,.06)_50%,transparent_50.1%)]"
        aria-hidden="true"
      />

      <div className="page-container relative grid min-h-[100svh] gap-10 px-5 pb-8 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-12 lg:pb-10 lg:pt-28 xl:grid-cols-[minmax(0,0.92fr)_minmax(32rem,1.08fr)] xl:items-center xl:gap-14">
        <Reveal immediate className="max-w-3xl py-2 xl:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow border border-app-brand/20 bg-app-brand-soft text-app-brand">
              БАСТ Недвижимость
            </span>
            <span className="eyebrow border border-graphite/10 bg-white text-graphite/65">
              Приложение для трёх ролей
            </span>
          </div>

          <h1
            id="home-hero-title"
            className="mt-7 max-w-[13ch] text-balance font-display text-[clamp(3.25rem,5.1vw,5.25rem)] font-medium leading-[0.96] tracking-[-0.03em] lg:text-[clamp(4.5rem,5.1vw,5.25rem)]"
          >
            Одно приложение для всей{' '}
            <span className="text-app-brand">загородной сделки</span>
          </h1>

          <p className="mt-7 max-w-2xl font-heading text-lg leading-8 text-graphite/72 sm:text-xl sm:leading-9">
            Покупатель ищет дом. Риэлтор ведёт клиента. Застройщик управляет объектами.
            «БАСТ» связывает объявление, диалог и этапы сделки.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <HomeButton href="#product" className="justify-between sm:justify-start">
              Посмотреть, как работает
            </HomeButton>
            <HomeButton
              href="#roles"
              variant="outline"
              className="justify-between bg-paper sm:justify-start"
            >
              Выбрать свою роль
            </HomeButton>
          </div>

          <div className="mt-10 grid border-y border-graphite/10 sm:grid-cols-3">
            {roles.map(([role, action], index) => (
              <div
                key={role}
                className="grid grid-cols-[2rem_1fr] gap-2 border-b border-graphite/10 py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-app-brand">
                  0{index + 1}
                </span>
                <p className="text-sm leading-5 text-graphite/64">
                  <strong className="block font-semibold text-graphite">{role}</strong>
                  {action}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal immediate className="relative xl:pl-2">
          <div className="relative aspect-[4/5] min-h-[30rem] overflow-hidden rounded-[2rem] border border-graphite/10 bg-app-inset shadow-soft sm:aspect-[16/11] xl:aspect-auto xl:h-[calc(100svh-10rem)] xl:max-h-[50rem] xl:min-h-[38rem] xl:w-full">
            <Image
              src="/images/generated/bast-hero-collaboration-real-v2.webp"
              alt="Покупатель и риэлтор обсуждают загородный дом"
              fill
              priority
              className="object-cover object-[61%_center]"
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-graphite/25 via-transparent to-white/5"
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/35 bg-paper/[0.92] p-5 shadow-soft backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-app-brand">
                Один объект · один маршрут
              </p>
              <p className="mt-3 font-heading text-lg font-semibold leading-6 tracking-[-0.02em] text-graphite sm:text-xl">
                Всё по объекту — от первого вопроса до документов
              </p>
            </div>
          </div>
          <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/68">
            Объект · диалог · сделка
          </p>
        </Reveal>
      </div>
    </section>
  )
}
