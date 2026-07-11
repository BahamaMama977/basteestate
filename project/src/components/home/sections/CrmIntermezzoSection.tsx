import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { DeveloperCrmScreen, RealtorCrmScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** «Переворот камеры»: та же сделка глазами риэлтора и застройщика. Тёмный регистр CRM. */
export function CrmIntermezzoSection() {
  return (
    <section className="section-shell bg-graphite-deep text-app-dark-text">
      <div className="page-container">
        <Reveal className="max-w-3xl">
          <span className="eyebrow border border-white/[0.14] bg-white/[0.07] text-app-dark-caption">
            Та же сделка — с другой стороны
          </span>
          <h2 className="section-heading mt-6">
            Пока покупатель выбирает дом, у профессионалов идёт работа
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-app-dark-caption">
            Клиент закреплён за риэлтором, который его привёл, — авторство и бонус сохраняются в сделке.
            Застройщик видит обращение прямо из карточки объекта и назначает ответственного.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          <Reveal>
            <RealtorCrmScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Риэлтор · клиент закреплён
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.realtors} variant="text" className="text-app-dark-text">
                Путь риэлтора
              </HomeButton>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DeveloperCrmScreen />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-app-dark-caption">
              Застройщик · новое обращение
            </p>
            <div className="mt-5 text-center">
              <HomeButton href={siteLinks.developers} variant="text" className="text-app-dark-text">
                Возможности для застройщиков
              </HomeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
