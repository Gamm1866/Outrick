import type { Metadata } from 'next';
import { Inter_Tight, DM_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SkipToContent from '@/components/SkipToContent';
import JsonLd from '@/components/JsonLd';
import MetaPixel from '@/components/MetaPixel';
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
  metadataBase: new URL('https://www.outrick.net'),
  title: 'Outrick | Data-Driven Growth for SMBs — Hollywood, FL',
  description: 'Outrick helps SMBs grow with data: performance metrics, UX & conversion optimization, and AI automation. Get your free Performance Score. Based in Hollywood, FL.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Outrick | Data-Driven Growth for SMBs — Hollywood, FL',
    description: 'Grow with data: performance metrics, UX & conversion optimization, AI automation. Free Performance Score. Hollywood, FL.',
    url: 'https://www.outrick.net',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outrick | Data-Driven Growth for SMBs — Hollywood, FL',
    description: 'Grow with data: performance metrics, UX & conversion optimization, AI automation. Free Performance Score. Hollywood, FL.',
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
        <MetaPixel />
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
