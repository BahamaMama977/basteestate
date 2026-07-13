import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { DeveloperCrmScreen, RealtorCrmScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** «Переворот камеры»: та же сделка глазами риэлтора и застройщика. */
export function CrmIntermezzoSection() {
  return (
    <section className="section-shell bg-app-inset text-graphite">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">
            Та же сделка — с другой стороны
          </span>
          <h2 className="section-heading mt-6">
            Пока покупатель выбирает дом, у профессионалов идёт работа
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/70">
            Клиент закреплён за риэлтором, который его привёл, — авторство сохраняется при переходе от объявления к сделке.
            Застройщик видит обращение прямо из карточки объекта и назначает ответственного.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          <Reveal>
            <RealtorCrmScreen />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/65">
              Риэлтор · клиент закреплён
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.realtors} variant="text" className="text-graphite">
                Путь риэлтора
              </HomeButton>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DeveloperCrmScreen />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-graphite/65">
              Застройщик · новое обращение
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.developers} variant="text" className="text-graphite">
                Возможности для застройщиков
              </HomeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
