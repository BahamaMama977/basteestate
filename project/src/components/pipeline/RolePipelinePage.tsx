import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/home/Reveal'
import { RoleHeroBackground } from '@/components/site/RoleHeroBackground'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

/** Оболочка страницы ролевого конвейера: hero + StickyPipeline стадий + финал. */
export function RolePipelinePage({
  eyebrow,
  title,
  subtitle,
  intro,
  stages,
  finale,
  heroVisual,
  caption,
  mobileCaption,
}: {
  eyebrow: string
  title: ReactNode
  subtitle: string
  intro?: string
  stages: PipelineStage[]
  finale: ReactNode
  heroVisual?: ReactNode
  /** Подписи панели; `null` — панели не экраны приложения (дефолты живут в StickyPipeline). */
  caption?: string | null
  mobileCaption?: string | null
}) {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative min-h-[88dvh] overflow-hidden bg-app-inset pb-16 pt-32 text-graphite md:pt-36">
          <RoleHeroBackground />
          <div className={`page-container relative grid min-h-[calc(88dvh-8rem)] items-center gap-12 px-5 sm:px-8 lg:px-12 ${heroVisual ? 'lg:grid-cols-[1.05fr_.95fr]' : ''}`}>
            <Reveal immediate>
              <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">{eyebrow}</span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">{title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">{subtitle}</p>
            </Reveal>
            {heroVisual && (
              <Reveal immediate delay={0.08} className="relative hidden min-h-[660px] place-items-center overflow-hidden rounded-[2rem] border border-graphite/10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.96),transparent_30%),linear-gradient(180deg,#edf3f0,#e4e9e5)] p-8 shadow-soft lg:grid">
                <div className="w-full max-w-[340px]">{heroVisual}</div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="section-shell bg-paper">
          <div className="page-container">
            {intro && (
              <Reveal>
                <p className="max-w-2xl text-base leading-7 text-graphite/70">{intro}</p>
              </Reveal>
            )}
            <div className={intro ? 'mt-14' : ''}>
              <StickyPipeline stages={stages} caption={caption} mobileCaption={mobileCaption} />
            </div>
          </div>
        </section>

        {finale}
      </main>
      <Footer />
    </>
  )
}
