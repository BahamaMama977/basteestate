// «Возможности платформы» до собственного контента ведут на покадровую
// демонстрацию сделки (решение спеки «Живой сделки», план №4).
// Статический экспорт: серверный redirect() недоступен — meta refresh + фолбэк.
export const metadata = {
  title: 'Возможности платформы — БАСТ',
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/how-it-works/" />
      <main className="flex min-h-screen items-center justify-center bg-paper text-graphite">
        <p className="text-sm">
          Раздел переехал:{' '}
          <a className="underline underline-offset-4" href="/how-it-works/">
            как проходит сделка
          </a>
        </p>
      </main>
    </>
  )
}
