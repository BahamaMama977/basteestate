import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/home/Reveal'
import { StickyPipeline, type PipelineStage } from '@/components/pipeline/StickyPipeline'

/** Оболочка страницы ролевого конвейера: hero + StickyPipeline стадий + финал. */
export function RolePipelinePage({
  eyebrow,
  title,
  subtitle,
  intro,
  stages,
  finale,
  caption,
  mobileCaption,
}: {
  eyebrow: string
  title: ReactNode
  subtitle: string
  intro?: string
  stages: PipelineStage[]
  finale: ReactNode
  /** Подписи панели; `null` — панели не экраны приложения (дефолты живут в StickyPipeline). */
  caption?: string | null
  mobileCaption?: string | null
}) {
  return (
    <>
      <Header />
      <main>
        {/* Графитовый hero */}
        <section className="relative overflow-hidden bg-graphite-deep pb-20 pt-40 text-app-dark-text">
          <div className="page-container px-5 sm:px-8 lg:px-12">
            <Reveal>
              <span className="eyebrow border border-white/[0.15] bg-white/[0.08] text-app-dark-caption">{eyebrow}</span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">{title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-app-dark-caption md:text-lg">{subtitle}</p>
            </Reveal>
          </div>
        </section>

        {/* Стадии на «бумаге» */}
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
