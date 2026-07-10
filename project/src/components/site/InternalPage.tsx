import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HomeButton } from '@/components/home/HomeButton'

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
      <main className="min-h-screen bg-limestone-100 pt-28">
        <section className="section-shell pt-20 md:pt-24">
          <div className="page-container">
            <span className="eyebrow bg-pine-950 text-limestone-50">{eyebrow}</span>
            <h1 className="section-title mt-8 max-w-5xl text-balance">{title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-pine-600">{intro}</p>
            {primary && (
              <HomeButton href={primary.href} className="mt-9">
                {primary.label}
              </HomeButton>
            )}
          </div>
        </section>

        <section className="section-shell bg-mist-100">
          <div className="page-container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <article key={item.title} className="bezel">
                <div className="bezel-core min-h-64 p-7">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-clay-500">0{index + 1}</p>
                  <h2 className="mt-10 font-display text-4xl leading-none">{item.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-pine-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  )
}
