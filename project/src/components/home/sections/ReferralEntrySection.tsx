import { AppStoreButtons } from '@/components/home/AppStoreButtons'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'
import { ReferralAcceptScreen } from '@/components/app-screens'
import { siteLinks } from '@/lib/site'

/** Первый контакт покупателя: приглашение сохраняет связь с риэлтором и объектом. */
export function ReferralEntrySection() {
  return (
    <section className="section-shell overflow-hidden bg-paper">
      <div className="page-container grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-app-brand text-white">Вход в сделку</span>
          <h2 className="section-heading mt-6 max-w-xl">Приглашение связывает вас с объектом и риэлтором</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
            Откройте персональную ссылку или QR-код на показе. Объект сохранится, а риэлтор, который вас пригласил, останется участником сделки.
          </p>
          <div className="mt-8">
            <AppStoreButtons />
          </div>
          <div className="mt-6">
            <HomeButton href={siteLinks.howItWorks} variant="text">Посмотреть этапы сделки</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="justify-self-center lg:justify-self-end">
          <ReferralAcceptScreen />
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-graphite/65">
            Приглашение в приложении
          </p>
        </Reveal>
      </div>
    </section>
  )
}
