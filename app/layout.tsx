import type { Metadata } from 'next';
import { Inter_Tight, DM_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SkipToContent from '@/components/SkipToContent';
import JsonLd from '@/components/JsonLd';
import { Providers } from './providers';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-tight',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800'],
  variable: '--font-mono',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-drama',
});

export const metadata: Metadata = {
  title: 'Outrick | Real Growth Backed by Data',
  description: 'Data-driven growth consulting for SMBs. Performance metrics, UX optimization, AI automation. Hollywood, FL.',
  alternates: {
    canonical: 'https://outrick.com',
  },
  openGraph: {
    title: 'Outrick | Real Growth Backed by Data',
    description: 'Data-driven growth consulting for SMBs.',
    url: 'https://outrick.com',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outrick | Real Growth Backed by Data',
    description: 'Data-driven growth consulting for SMBs. Performance metrics, UX optimization, AI automation. Hollywood, FL.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${interTight.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased font-body bg-deep-void text-ghost-white relative">
        <svg
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <Providers>
          <SkipToContent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
