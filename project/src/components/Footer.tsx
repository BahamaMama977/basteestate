import { siteLinks } from '@/lib/site'

const groups = [
  {
    title: 'Пользователям',
    links: [
      ['Покупателям', siteLinks.buyersPipeline],
      ['Как проходит сделка', siteLinks.howItWorks],
      ['Проверка объектов', siteLinks.verification],
      ['Безопасность', siteLinks.security],
    ],
  },
  {
    title: 'Партнёрам',
    links: [
      ['Риэлторам и агентствам', siteLinks.realtors],
      ['Застройщикам', siteLinks.developers],
      ['Инвесторам', siteLinks.investors],
      ['О БАСТ', siteLinks.about],
      ['Контакты', siteLinks.contact],
    ],
  },
  {
    title: 'Документы',
    links: [
      ['Политика конфиденциальности', '/privacy'],
      ['Пользовательское соглашение', '/terms'],
      ['Реквизиты', siteLinks.contact],
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-pine-950 px-4 pb-8 pt-20 text-limestone-100 sm:px-6 lg:px-8">
      <div className="page-container">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <a href="/" className="font-display text-6xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              БАСТ<span className="text-clay-400">.</span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-limestone-300">
              Мобильное приложение и веб-CRM для покупателей, риэлторов и застройщиков загородной недвижимости.
            </p>
            <p className="mt-8 text-sm text-limestone-300">partners@bast-estate.ru</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-300">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-limestone-300 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-limestone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ООО «БАСТ Технологии»</p>
          <p>Сейчас объекты представлены в Удмуртии</p>
        </div>
      </div>
    </footer>
  )
}
