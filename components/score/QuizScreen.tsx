'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from './ProgressBar'
import OptionCard from './OptionCard'

export interface Question {
  category: number
  es: string
  en: string
  options: {
    es: string
    en: string
    points: number
  }[]
}

export interface Answer {
  questionIndex: number
  points: number
}

export interface Category {
  key: string
  es: string
  en: string
  color: string
  maxScore: number
}

interface QuizScreenProps {
  lang: 'es' | 'en'
  onLangToggle: () => void
  questions: Question[]
  categories: Category[]
  onComplete: (answers: Answer[]) => void
}

const slideVariants = {
  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
}

export default function QuizScreen({
  lang,
  onLangToggle,
  questions,
  categories,
  onComplete,
}: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const direction = useRef(1)
  const isAnimating = useRef(false)

  const question = questions[currentIndex]
  const category = categories[question.category]

  const handleOptionSelect = (optionIndex: number, points: number) => {
    if (isAnimating.current || selectedOption !== null) return

    setSelectedOption(optionIndex)
    isAnimating.current = true

    setTimeout(() => {
      const newAnswers = [
        ...answers.filter((a) => a.questionIndex !== currentIndex),
        { questionIndex: currentIndex, points },
      ]
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentIndex === questions.length - 1) {
        onComplete(newAnswers)
      } else {
        direction.current = 1
        setCurrentIndex((i) => i + 1)
      }
      isAnimating.current = false
    }, 350)
  }

  const handleBack = () => {
    if (currentIndex > 0 && !isAnimating.current) {
      direction.current = -1
      setSelectedOption(null)
      setCurrentIndex((i) => i - 1)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col px-5 py-6 overflow-hidden">
      {/* Subtle category-colored orb */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `${category.color}18`,
          filter: 'blur(80px)',
        }}
      />

      {/* Lang toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onLangToggle}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300"
          style={{
            background: 'rgba(123, 97, 255, 0.1)',
            border: '1px solid rgba(123, 97, 255, 0.3)',
          }}
        >
          <span style={{ color: lang === 'es' ? '#7B61FF' : '#4A4F62' }}>ES</span>
          <span style={{ color: '#2a2a4a' }}>|</span>
          <span style={{ color: lang === 'en' ? '#7B61FF' : '#4A4F62' }}>EN</span>
        </button>
      </div>

      {/* Progress */}
      <div className="pt-2 pb-6 pr-20">
        <ProgressBar current={currentIndex} total={questions.length} lang={lang} />
      </div>

      {/* Question + Options area */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction.current}>
          <motion.div
            key={currentIndex}
            custom={direction.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Category pill */}
            <div className="mb-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: `${category.color}20`,
                  border: `1px solid ${category.color}40`,
                  color: category.color,
                }}
              >
                {category[lang as 'es' | 'en']}
              </span>
            </div>

            {/* Question text */}
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-inter-tight)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 4.5vw, 1.35rem)',
                lineHeight: 1.3,
                color: '#F0F0F5',
                letterSpacing: '-0.02em',
              }}
            >
              {question[lang as 'es' | 'en']}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <OptionCard
                  key={i}
                  option={option}
                  selected={selectedOption === i}
                  onSelect={() => handleOptionSelect(i, option.points)}
                  lang={lang}
                  index={i}
                  disabled={selectedOption !== null}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back button */}
      <div className="pt-4 pb-2 max-w-sm mx-auto w-full min-h-[44px]">
        {currentIndex > 0 && (
          <motion.button
            onClick={handleBack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              color: '#7A7F8E',
              background: 'transparent',
              border: '1px solid #2a2a4a',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#7B61FF'
              e.currentTarget.style.color = '#7B61FF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a4a'
              e.currentTarget.style.color = '#7A7F8E'
            }}
          >
            ← {lang === 'es' ? 'Anterior' : 'Back'}
          </motion.button>
        )}
      </div>
    </div>
  )
}
