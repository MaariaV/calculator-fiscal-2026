// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <meta name="google-site-verification" content="abc123..." />
        <title>Calculator Fiscal România 2026</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
