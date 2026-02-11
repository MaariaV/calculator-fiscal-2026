// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";

export const metadata = {
  title: "Calculator Fiscal România 2026",
  description: "Calculator fiscal pentru PFA și SRL în România 2026",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* PROFITSHARE META TAG */}
        <meta name="profitshareid" content="5f3a30c63c371c6c5a1fb9314269f0df" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
