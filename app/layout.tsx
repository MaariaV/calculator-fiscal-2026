// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <Head>
        <title>Calculator Fiscal România 2026</title>
        <meta name="description" content="Calculator fiscal pentru PFA și SRL în România 2026" />
        {/* PROFITSHARE META TAG */}
        <meta name="profitshareid" content="5f3a30c63c371c6c5a1fb9314269f0df" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
