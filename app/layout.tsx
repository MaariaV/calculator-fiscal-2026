export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        {/* Google site verification */}
        <meta
          name="google-site-verification"
          content="Qdw-Q-15s8y0fkQKwn-BSmTCRgEyJMh8a1xm6LKA2GU"
        />
        <title>Calculator Fiscal România 2026</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
