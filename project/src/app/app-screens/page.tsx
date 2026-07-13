import {
  ChatScreen,
  CreateListingScreen,
  DealScreen,
  DeveloperCrmScreen,
  ListingScreen,
  ListingStatsScreen,
  RealtorCrmScreen,
  RealtorProfileScreen,
  ReferralAcceptScreen,
  RewardsScreen,
  SearchScreen,
  ShareInviteScreen,
  SharesApplyScreen,
  TeamScreen,
  WorkspaceScreen,
} from '@/components/app-screens'
import { acts } from '@/lib/demo-deal'

export const metadata = {
  title: 'Экраны приложения — макеты · БАСТ',
}

const showcase = [
  ['Витрина покупателя', [
    ['Поиск на карте', <SearchScreen key="s" />],
    ['Карточка объекта', <ListingScreen key="l" />],
    ['Чат по объекту', <ChatScreen key="c" />],
    ['Сделка — этап 3 из 4', <DealScreen key="d" />],
  ]],
  ['CRM для профи (тёмный регистр)', [
    ['Риэлтор: клиент закреплён', <RealtorCrmScreen key="r" />],
    ['Застройщик: обращение', <DeveloperCrmScreen key="dev" />],
  ]],
  ['Состояния по актам', [
    ['Акт 3 — сделка начата', <DealScreen key="a3" act={acts[2]} />],
    ['Акт 5 — документы подписаны', <DealScreen key="a5" act={acts[4]} />],
  ]],
  ['Спайн покупатель → риэлтор', [
    ['Покупатель: приглашение принято', <ReferralAcceptScreen key="ra" />],
    ['Риэлтор: шаринг реф-ссылки', <ShareInviteScreen key="si" />],
    ['Риэлтор: рабочее пространство', <WorkspaceScreen key="ws" />],
    ['Риэлтор: профиль', <RealtorProfileScreen key="rp" />],
    ['Покупатель: сертификаты и акции', <RewardsScreen key="rw" />],
  ]],
  ['Застройщик', [
    ['Создание объявления · Медиа', <CreateListingScreen key="cl" />],
    ['Пакетное применение акции', <SharesApplyScreen key="sa" />],
    ['Команда', <TeamScreen key="tm" />],
    ['Статистика объявления', <ListingStatsScreen key="ls" />],
  ]],
] as const

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-graphite-deep px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-app-dark-caption">Витрина макетов</p>
        <h1 className="mt-3 font-display text-4xl text-app-dark-text">Экраны приложения «БАСТ»</h1>
        <p className="mt-3 max-w-2xl text-sm text-app-dark-caption">
          Live-макеты на реальной палитре приложения с демо-данными из канона. Служебная страница для ревью — в навигацию не входит.
        </p>
        {showcase.map(([group, screens]) => (
          <section key={group}>
            <h2 className="mt-16 text-sm font-semibold uppercase tracking-[0.16em] text-app-dark-gold">{group}</h2>
            <div className="mt-8 grid justify-items-center gap-x-8 gap-y-16 sm:grid-cols-2">
              {screens.map(([label, node]) => (
                <div key={label}>
                  {node}
                  <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-app-dark-caption">{label}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
