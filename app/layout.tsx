export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="profitshareid" content="5f3a30c63c371c6c5a1fb9314269f0df" />
        <title>Calculator Fiscal România 2026</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
