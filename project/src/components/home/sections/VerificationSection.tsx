import Image from 'next/image'
import { Check, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/home/Reveal'
import { HomeButton } from '@/components/home/HomeButton'
import { verification } from '@/lib/demo-deal'
import { siteLinks } from '@/lib/site'

/** Проверка объявления до публикации: чек-лист из канона + фото-карточка со статусом. */
export function VerificationSection() {
  return (
    <section className="section-shell bg-paper">
      <div className="page-container">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <Reveal>
            <span className="eyebrow bg-app-brand text-white">Проверка объектов</span>
            <h2 className="section-heading mt-6 max-w-3xl">Объявление проходит проверку до публикации</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-xl text-base leading-7 text-graphite/70">
            Команда сверяет сведения о продавце, документах, цене, характеристиках и наличии объекта до публикации объявления.
            </p>
            <div className="mt-5"><HomeButton href={siteLinks.verification} variant="text">Как проходит проверка</HomeButton></div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-[2.5rem] border border-graphite/10 bg-app-inset shadow-[0_36px_100px_-64px_rgba(15,18,23,.42)] lg:relative lg:min-h-[720px]">
            <div className="relative h-[360px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
              <Image
                src="/images/generated/bast-verification-real-v1.webp"
                alt="Проверяемый загородный дом"
                fill
                className="object-cover object-[35%_center] lg:object-center"
                sizes="(min-width: 1024px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite/5 via-transparent to-graphite/35 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-graphite/45" />
            </div>

            <div className="relative -mt-16 p-4 sm:p-6 lg:absolute lg:inset-y-8 lg:right-8 lg:mt-0 lg:flex lg:w-[min(520px,42%)] lg:items-end lg:p-0">
              <div className="w-full rounded-[2rem] border border-white/55 bg-paper/95 p-6 shadow-elevated backdrop-blur-xl md:p-8">
                <div className="flex items-center justify-between gap-5 border-b border-graphite/10 pb-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite/50">Статус объявления</p>
                    <p className="mt-2 text-base font-semibold">Проверено командой «БАСТ»</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-brand text-white shadow-green-glow">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                </div>

                <ul className="divide-y divide-graphite/10">
                  {verification.map((v) => (
                    <li key={v.key} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="text-base font-medium">{v.label}</p>
                        <p className="text-sm text-graphite/70">{v.caption}</p>
                      </div>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mx-5 mb-6 rounded-2xl border border-graphite/10 bg-paper px-5 py-4 lg:absolute lg:bottom-8 lg:left-8 lg:mx-0 lg:mb-0 lg:max-w-md lg:border-white/10 lg:bg-graphite/[0.82] lg:text-white lg:backdrop-blur-md">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-graphite/45 lg:text-white/55">Граница проверки</p>
              <p className="mt-2 text-xs leading-5 text-graphite/65 lg:text-sm lg:leading-6 lg:text-white/80">Эта проверка не гарантирует юридическую чистоту сделки и не заменяет юридическую проверку перед покупкой.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
