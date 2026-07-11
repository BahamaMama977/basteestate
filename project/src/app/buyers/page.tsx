// Путь покупателя живёт на корне (конвейер покупателя, спека ролевых конвейеров).
// Статический экспорт: серверный redirect() недоступен — meta refresh + фолбэк.
export const metadata = {
  title: 'Покупателям — БАСТ',
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/" />
      <main className="flex min-h-screen items-center justify-center bg-paper text-graphite">
        <p className="text-sm">
          Раздел переехал:{' '}
          <a className="underline underline-offset-4" href="/">
            путь покупателя на главной
          </a>
        </p>
      </main>
    </>
  )
}
