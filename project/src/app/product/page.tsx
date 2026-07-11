// «Возможности платформы» ведут на конвейер покупателя (корень) — продукт
// показывает себя сам, отдельной страницы возможностей нет.
// Статический экспорт: серверный redirect() недоступен — meta refresh + фолбэк.
export const metadata = {
  title: 'Возможности платформы — БАСТ',
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/" />
      <main className="flex min-h-screen items-center justify-center bg-paper text-graphite">
        <p className="text-sm">
          Раздел переехал:{' '}
          <a className="underline underline-offset-4" href="/">
            как работает «БАСТ»
          </a>
        </p>
      </main>
    </>
  )
}
