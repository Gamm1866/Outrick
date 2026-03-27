'use client'

import { motion } from 'framer-motion'

interface CategoryBarProps {
  label: string
  score: number
  maxScore: number
  color: string
  index: number
}

export default function CategoryBar({
  label,
  score,
  maxScore,
  color,
  index,
}: CategoryBarProps) {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: '#7A7F8E' }}>
          {label}
        </span>
        <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color }}>
          {score}
          <span style={{ color: '#4A4F62' }}>/{maxScore}</span>
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: '#1C1C2E' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
