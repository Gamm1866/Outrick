'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ScoreCounterProps {
  score: number
  color: string
}

export default function ScoreCounter({ score, color }: ScoreCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    const controls = animate(count, score, { duration: 1.5, ease: 'easeOut' })
    return controls.stop
  }, [score, count])

  return (
    <motion.span
      style={{
        color,
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(4rem, 20vw, 6rem)',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        display: 'block',
      }}
    >
      {rounded}
    </motion.span>
  )
}
