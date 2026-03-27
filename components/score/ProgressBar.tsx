'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number // 0-based index
  total: number
  lang: 'es' | 'en'
}

export default function ProgressBar({ current, total, lang }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: '#1C1C2E' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: '#7B61FF' }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <span
        className="text-xs shrink-0"
        style={{ color: '#7A7F8E', fontFamily: 'var(--font-mono)' }}
      >
        {current + 1} {lang === 'es' ? 'de' : 'of'} {total}
      </span>
    </div>
  )
}
