import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'
import { Reveal } from '@/components/home/Reveal'

interface InternalPageProps {
  eyebrow: string
  title: string
  intro: string
  items: Array<{ title: string; text: string }>
  primary?: { label: string; href: string }
  visual?: ReactNode
  visualCaption?: string
  note?: string
  children?: ReactNode
}

export function InternalPage({ eyebrow, title, intro, items, primary, visual, visualCaption, note, children }: InternalPageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-paper">
        <section className="paper-grid min-h-[82dvh] overflow-hidden bg-app-inset pb-16 pt-32 md:pt-36">
          <div className={`page-container grid min-h-[calc(82dvh-8rem)] items-center gap-12 px-5 sm:px-8 lg:px-12 ${visual ? 'lg:grid-cols-[1.05fr_.95fr]' : ''}`}>
            <Reveal immediate>
              <span className="eyebrow border border-graphite/15 bg-paper text-graphite/70">{eyebrow}</span>
              <h1 className="display-title mt-7 max-w-5xl text-balance">{title}</h1>
              <p className="mt-7 max-w-3xl text-base leading-7 text-graphite/70 md:text-lg">{intro}</p>
              {primary && (
                <HomeButton href={primary.href} className="mt-9">
                  {primary.label}
                </HomeButton>
              )}
            </Reveal>
            {visual && (
              <Reveal immediate delay={0.08} className="relative hidden min-h-[620px] place-items-center overflow-hidden rounded-[2rem] border border-graphite/10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.96),transparent_30%),linear-gradient(180deg,#edf3f0,#e4e9e5)] p-8 shadow-soft lg:grid">
                <div className="w-full max-w-[330px]">{visual}</div>
                {visualCaption && <p className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/55">{visualCaption}</p>}
              </Reveal>
            )}
          </div>
        </section>

        <section className="section-shell bg-app-inset">
          <div className="page-container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-[1.5rem] border border-graphite/10 bg-paper p-7 shadow-soft md:min-h-64 md:p-8">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-graphite/70">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {note && (
            <Reveal className="page-container mt-8">
              <p className="max-w-3xl border-y border-graphite/10 py-6 text-sm leading-7 text-graphite/70">{note}</p>
            </Reveal>
          )}
        </section>

        {children}
      </main>
      <Footer />
    </>
  )
}
