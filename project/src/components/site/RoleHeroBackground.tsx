import Image from 'next/image'

/** Общий фотографический фон светлых hero: продукт остаётся главным слоем. */
export function RoleHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src="/images/generated/bast-role-hero-landscape-day-v2.webp"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,248,245,.93)_0%,rgba(247,248,245,.84)_44%,rgba(237,243,240,.58)_72%,rgba(237,243,240,.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,245,.34)_0%,rgba(247,248,245,.08)_55%,rgba(247,248,245,.5)_100%)]" />
    </div>
  )
}
