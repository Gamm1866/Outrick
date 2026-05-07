import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CallButton from '@/components/score/CallButton'

export const metadata: Metadata = {
  title: 'Free Digital Score | Outrick',
  description:
    'Get a 0-100 score of your digital presence. Actionable recommendations in 15 minutes. 100% free, no commitment.',
  openGraph: {
    title: 'Score Digital Gratuito | Outrick',
    description: '¿Tu negocio crece o adivina? Descubre tu Score Digital en 3 minutos.',
    url: 'https://outrick.com/score',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Score Digital Gratuito | Outrick',
    description: '¿Tu negocio crece o adivina? Descubre tu Score Digital en 3 minutos.',
  },
  alternates: {
    canonical: 'https://outrick.com/score',
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
