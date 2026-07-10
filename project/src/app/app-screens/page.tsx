import { ChatScreen, DealScreen, ListingScreen, SearchScreen } from '@/components/app-screens'

export const metadata = {
  title: 'Экраны приложения — макеты · БАСТ',
}

const screens = [
  ['search', 'Поиск на карте', <SearchScreen key="s" />],
  ['listing', 'Карточка объекта', <ListingScreen key="l" />],
  ['chat', 'Чат по объекту', <ChatScreen key="c" />],
  ['deal', 'Сделка / CRM', <DealScreen key="d" />],
] as const

export default function Page() {
  return (
    <main className="min-h-screen bg-pine-950 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-300">Витрина макетов</p>
        <h1 className="mt-3 font-display text-4xl text-limestone-50">Экраны приложения «БАСТ»</h1>
        <p className="mt-3 max-w-2xl text-sm text-limestone-300">
          Live-макеты на реальной палитре приложения с демо-данными. Служебная страница для ревью — в навигацию не входит.
        </p>
        <div className="mt-14 grid justify-items-center gap-x-8 gap-y-16 sm:grid-cols-2">
          {screens.map(([id, label, node]) => (
            <div key={id} id={id}>
              {node}
              <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-limestone-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
