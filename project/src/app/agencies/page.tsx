// Путь риэлтора и агентства живёт в конвейере риэлтора (финал — «Руководите агентством?»).
// Статический экспорт: серверный redirect() недоступен — meta refresh + фолбэк.
export const metadata = {
  title: 'Агентствам — БАСТ',
}

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/realtors/" />
      <main id="main-content" className="flex min-h-screen items-center justify-center bg-paper text-graphite">
        <p className="text-sm">
          Раздел переехал:{' '}
          <a className="underline underline-offset-4" href="/realtors/">
            путь риэлтора и агентства
          </a>
        </p>
      </main>
    </>
  )
}
