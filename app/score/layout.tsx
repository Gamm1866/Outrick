import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Score Digital Gratuito | Outrick',
  description:
    'Descubre qué tan visible está tu negocio online. Score de 0 a 100 con recomendaciones accionables. 100% gratuito, 3 minutos.',
  openGraph: {
    title: 'Score Digital Gratuito | Outrick',
    description: '¿Tu negocio crece o adivina? Descubre tu Score Digital en 3 minutos.',
    url: 'https://outrick.net/score',
    siteName: 'Outrick',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Score Digital Gratuito | Outrick',
    description: '¿Tu negocio crece o adivina? Descubre tu Score Digital en 3 minutos.',
  },
  alternates: {
    canonical: 'https://outrick.net/score',
  },
}

export default function ScoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
