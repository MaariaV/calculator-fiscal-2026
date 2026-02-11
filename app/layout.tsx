// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Calculator Fiscal România 2026',
  description: 'Calculator fiscal pentru PFA și SRL în România 2026',
  // ProfitShare meta tag aici
  meta: [
    {
      name: 'profitshareid',
      content: '5f3a30c63c371c6c5a1fb9314269f0df',
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="profitshareid" content="5f3a30c
