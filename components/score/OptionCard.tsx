'use client'

import { motion } from 'framer-motion'

export interface Option {
  es: string
  en: string
  points: number
}

interface OptionCardProps {
  option: Option
  selected: boolean
  onSelect: () => void
  lang: 'es' | 'en'
  index: number
  disabled?: boolean
}

export default function OptionCard({
  option,
  selected,
  onSelect,
  lang,
  index,
  disabled,
}: OptionCardProps) {
  return (
    <motion.button
      onClick={disabled ? undefined : onSelect}
      className="w-full text-left rounded-xl p-4 relative overflow-hidden"
      style={{
        background: selected ? 'rgba(123, 97, 255, 0.15)' : '#0F0F1A',
        border: `1px solid ${selected ? '#7B61FF' : '#2a2a4a'}`,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
      }}
      whileHover={
        disabled
          ? {}
          : { scale: 1.02, borderColor: '#7B61FF', backgroundColor: '#1C1C2E' }
      }
      whileTap={disabled ? {} : { scale: 0.99 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm leading-relaxed text-left" style={{ color: '#F0F0F5' }}>
          {option[lang]}
        </span>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#7B61FF', color: 'white', minWidth: '20px' }}
          >
            ✓
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}
