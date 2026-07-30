import { SearchScreen } from './SearchScreen'

/** Раскрытое состояние того же каталога, который риэлтор видит на предыдущем шаге. */
export function RealtorRewardsCatalogScreen() {
  return <SearchScreen audience="realtor" view="expanded" />
}
