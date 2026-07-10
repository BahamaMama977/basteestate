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
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal>
          <span className="eyebrow bg-app-brand text-white">Проверка объектов</span>
          <h2 className="section-heading mt-6">Объект проверяется до публикации</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
            Команда проверяет сведения в объявлении до того, как объект увидит покупатель.
          </p>
          <ul className="mt-8 max-w-xl divide-y divide-graphite/10">
            {verification.map((v) => (
              <li key={v.key} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-base font-medium">{v.label}</p>
                  <p className="text-sm text-graphite/55">{v.caption}</p>
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-app-brand-soft text-app-brand">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-graphite/55">Проверка не заменяет юридическую проверку перед покупкой.</p>
          <div className="mt-7">
            <HomeButton href={siteLinks.verification} variant="text">Как проходит проверка</HomeButton>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/verification-house.png"
              alt="Проверяемый загородный дом"
              width={960}
              height={720}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-graphite/85 px-5 py-4 text-white backdrop-blur-sm">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">Статус объявления</p>
                <p className="mt-1 text-sm font-semibold">Проверено командой «БАСТ»</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app-brand text-white">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
