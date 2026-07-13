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
  children?: ReactNode
}

export function InternalPage({ eyebrow, title, intro, items, primary, children }: InternalPageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-paper">
        <section className="paper-grid section-shell pt-36 md:pt-40">
          <div className="page-container">
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
        </section>

        {children}
      </main>
      <Footer />
    </>
  )
}
