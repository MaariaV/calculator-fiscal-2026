export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculator Fiscal România 2026</title>

        {/* META GOOGLE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="Qdw-Q-15s8y0fkQKwn-BSmTCRgEyJMh8a1xm6LKA2GU"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
