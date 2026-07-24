import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CallButton from '@/components/score/CallButton'

export const metadata: Metadata = {
  title: 'Free Digital Score | Outrick',
  description:
    'Get a 0–100 score of your digital presence. Actionable recommendations in 15 minutes. 100% free, no commitment.',
  openGraph: {
    title: 'Free Digital Score | Outrick',
    description: 'Get a 0–100 score of your digital presence in 15 minutes. Free, no commitment.',
    url: 'https://www.outrick.net/score',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Score | Outrick',
    description: 'Get a 0–100 score of your digital presence in 15 minutes. Free, no commitment.',
  },
  alternates: {
    canonical: 'https://www.outrick.net/score',
  },
}

export default function ScoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <CallButton />
    </>
  )
}
