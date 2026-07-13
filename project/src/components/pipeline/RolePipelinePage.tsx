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
      <main id="main-content">
        <section className="paper-grid relative overflow-hidden bg-app-inset pb-20 pt-36 text-graphite md:pt-40">
          <div className="page-container relative px-5 sm:px-8 lg:px-12">
            <Reveal immediate>
              <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">{eyebrow}</span>
              <h1 className="display-title mt-7 max-w-4xl text-balance">{title}</h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-graphite/70 md:text-lg">{subtitle}</p>
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
