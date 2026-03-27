'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScoreCounter from './ScoreCounter'
import CategoryBar from './CategoryBar'

interface CategoryScores {
  web: number
  local: number
  social: number
  automation: number
}

interface ResultScreenProps {
  lang: 'es' | 'en'
  totalScore: number
  categoryScores: CategoryScores
  userName: string
}

const CATEGORIES = [
  { key: 'web' as const, es: '01 Presencia web', en: '01 Web presence', color: '#7B61FF', maxScore: 25 },
  { key: 'local' as const, es: '02 Presencia local', en: '02 Local presence', color: '#1D9E75', maxScore: 30 },
  { key: 'social' as const, es: '03 Redes sociales', en: '03 Social media', color: '#378ADD', maxScore: 25 },
  { key: 'automation' as const, es: '04 Automatización', en: '04 Automation', color: '#EF9F27', maxScore: 20 },
]

type LevelKey = 'critical' | 'basic' | 'growing' | 'solid' | 'elite'

function getScoreLevel(score: number): { key: LevelKey; color: string } {
  if (score <= 24) return { key: 'critical', color: '#E24B4A' }
  if (score <= 49) return { key: 'basic', color: '#EF9F27' }
  if (score <= 69) return { key: 'growing', color: '#639922' }
  if (score <= 84) return { key: 'solid', color: '#1D9E75' }
  return { key: 'elite', color: '#7B61FF' }
}

const levelLabels: Record<'es' | 'en', Record<LevelKey, string>> = {
  es: {
    critical: 'Crítico',
    basic: 'Básico',
    growing: 'En crecimiento',
    solid: 'Sólido',
    elite: 'Élite Digital',
  },
  en: {
    critical: 'Critical',
    basic: 'Basic',
    growing: 'Growing',
    solid: 'Solid',
    elite: 'Digital Elite',
  },
}

const levelDescriptions: Record<'es' | 'en', Record<LevelKey, string>> = {
  es: {
    critical: 'Tu negocio es prácticamente invisible online',
    basic: 'Estás perdiendo clientes todos los días',
    growing: 'Vas bien pero hay gaps importantes que cerrar',
    solid: 'Bien posicionado, con espacio para crecer',
    elite: 'Estás en el top del mercado digital',
  },
  en: {
    critical: 'Your business is virtually invisible online',
    basic: "You're losing clients every day",
    growing: 'Good progress but there are important gaps',
    solid: 'Well positioned, with room to grow',
    elite: "You're at the top of the digital market",
  },
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function ResultScreen({
  lang,
  totalScore,
  categoryScores,
  userName,
}: ResultScreenProps) {
  const [copied, setCopied] = useState(false)
  const { key: levelKey, color: levelColor } = getScoreLevel(totalScore)

  const criticalCount = CATEGORIES.filter(
    (cat) => categoryScores[cat.key] < cat.maxScore * 0.5
  ).length

  const waLink = `https://wa.me/19045904962?text=Hola%20Alex%2C%20acabo%20de%20hacer%20el%20score%20digital%20de%20Outrick.%20Mi%20score%20es%20${totalScore}%2F100.%20Me%20gustar%C3%ADa%20agendar%20mi%20diagn%C3%B3stico%20gratuito`

  const handleShare = () => {
    const text =
      lang === 'es'
        ? `Hice el Score Digital de Outrick y saqué ${totalScore}/100. Descubre el tuyo: outrick.net/score`
        : `I took the Outrick Digital Score and got ${totalScore}/100. Discover yours: outrick.net/score`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const urgencyText =
    lang === 'es'
      ? `Identificamos ${criticalCount} área${criticalCount !== 1 ? 's' : ''} crítica${criticalCount !== 1 ? 's' : ''} que están haciendo que pierdas clientes. En tu diagnóstico gratuito te mostramos exactamente cómo resolverlas.`
      : `We identified ${criticalCount} critical area${criticalCount !== 1 ? 's' : ''} causing you to lose clients. In your free diagnosis we show you exactly how to fix them.`

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-5 py-10 overflow-hidden">
      {/* BG orb — more intense on result */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: `${levelColor}18`,
          filter: 'blur(130px)',
        }}
      />

      <motion.div
        className="w-full max-w-sm relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Top label */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#4A4F62',
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
            }}
          >
            OUTRICK · SCORE DIGITAL
          </span>
        </motion.div>

        {/* Score card */}
        <motion.div
          variants={item}
          className="rounded-2xl p-8 mb-5 text-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `0 0 60px ${levelColor}10`,
          }}
        >
          <ScoreCounter score={totalScore} color={levelColor} />

          <div
            className="text-sm mt-1 mb-4"
            style={{ color: '#4A4F62', fontFamily: 'var(--font-mono)' }}
          >
            / 100
          </div>

          {/* Level pill */}
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold mb-3"
            style={{
              background: `${levelColor}20`,
              border: `1px solid ${levelColor}50`,
              color: levelColor,
            }}
          >
            {levelLabels[lang][levelKey]}
          </span>

          <p className="text-sm leading-relaxed" style={{ color: '#7A7F8E' }}>
            {levelDescriptions[lang][levelKey]}
          </p>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          variants={item}
          className="rounded-2xl p-6 mb-4"
          style={{ background: '#0F0F1A', border: '1px solid #1a1a2e' }}
        >
          <p
            className="text-xs uppercase mb-4"
            style={{
              color: '#4A4F62',
              letterSpacing: '2px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {lang === 'es' ? 'Desglose por categoría' : 'Score breakdown'}
          </p>
          <div className="space-y-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryBar
                key={cat.key}
                label={cat[lang]}
                score={categoryScores[cat.key]}
                maxScore={cat.maxScore}
                color={cat.color}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Urgency message */}
        {criticalCount > 0 && (
          <motion.div
            variants={item}
            className="rounded-xl p-4 mb-5"
            style={{
              background: 'rgba(226, 75, 74, 0.07)',
              border: '1px solid rgba(226, 75, 74, 0.2)',
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#F0F0F5' }}>
              {urgencyText}
            </p>
          </motion.div>
        )}

        {/* Primary CTA */}
        <motion.div variants={item} className="mb-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-full overflow-hidden rounded-xl py-4 px-6 font-semibold group transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: '#7B61FF',
              color: 'white',
              boxShadow: '0 4px 24px rgba(123, 97, 255, 0.4)',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <span className="relative">
              {lang === 'es'
                ? 'Agendar diagnóstico gratuito con Alex →'
                : 'Schedule free diagnosis with Alex →'}
            </span>
          </a>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div variants={item} className="mb-8">
          <button
            onClick={handleShare}
            className="w-full rounded-xl py-3 px-6 text-sm font-medium transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#7A7F8E',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = '#F0F0F5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#7A7F8E'
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{ color: '#1D9E75' }}
                >
                  ✓ {lang === 'es' ? '¡Copiado!' : 'Copied!'}
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {lang === 'es' ? '↑ Compartir mi score' : '↑ Share my score'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={item}
          className="text-center text-xs"
          style={{ color: '#2a2a4a' }}
        >
          Think Beyond. Measure Everything. · outrick.net
        </motion.p>
      </motion.div>
    </div>
  )
}
