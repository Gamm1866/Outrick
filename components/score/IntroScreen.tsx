'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export interface UserData {
  name: string
  email: string
  whatsapp: string
}

interface IntroScreenProps {
  lang: 'es' | 'en'
  onSubmit: (userData: UserData) => void
}

const copy = {
  es: {
    headline: 'Descubre qué tan visible está tu negocio online',
    sub: 'Responde 12 preguntas y obtén tu Score Digital de 0 a 100 con recomendaciones específicas para tu negocio.',
    namePH: 'Nombre completo',
    emailPH: 'Email',
    waPH: '+1 (904) 000-0000',
    cta: 'Agenda una cita con nosotros →',
    meta: '3 minutos · 12 preguntas · 100% gratuito',
  },
  en: {
    headline: 'Find out how visible your business is online',
    sub: 'Answer 12 questions and get your Digital Score from 0 to 100 with specific recommendations for your business.',
    namePH: 'Full name',
    emailPH: 'Email',
    waPH: '+1 (904) 000-0000',
    cta: 'Schedule a meeting with us →',
    meta: '3 minutes · 12 questions · 100% free',
  },
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function IntroScreen({ lang, onSubmit }: IntroScreenProps) {
  const [form, setForm] = useState<UserData>({ name: '', email: '', whatsapp: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, boolean>>>({})
  const tx = copy[lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<Record<keyof UserData, boolean>> = {}
    if (!form.name.trim()) errs.name = true
    if (!form.email.trim() || !form.email.includes('@')) errs.email = true
    if (!form.whatsapp.trim()) errs.whatsapp = true
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  const baseInputStyle = (hasError: boolean) => ({
    background: '#0F0F1A',
    border: `1px solid ${hasError ? '#E24B4A' : '#2a2a4a'}`,
    color: '#F0F0F5',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    width: '100%',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  })

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-16 overflow-hidden">
      {/* BG orb */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full animate-pulse pointer-events-none"
        style={{ background: 'rgba(123, 97, 255, 0.18)', filter: 'blur(100px)' }}
      />

      {/* mt-10 pushes content down 40px from the vertically centered position */}
      <motion.div
        className="w-full max-w-sm relative z-10 mt-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-center mb-3"
          style={{
            fontFamily: 'var(--font-inter-tight)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 6vw, 2rem)',
            lineHeight: 1.2,
            color: '#F0F0F5',
            letterSpacing: '-0.02em',
          }}
        >
          {tx.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="text-center mb-8 text-sm leading-relaxed"
          style={{ color: '#7A7F8E' }}
        >
          {tx.sub}
        </motion.p>

        {/* Form */}
        <motion.form variants={item} onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder={tx.namePH}
            value={form.name}
            autoComplete="name"
            onChange={(e) => {
              setForm((p) => ({ ...p, name: e.target.value }))
              setErrors((p) => ({ ...p, name: false }))
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#7B61FF' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? '#E24B4A' : '#2a2a4a' }}
            style={baseInputStyle(!!errors.name)}
          />
          <input
            type="email"
            placeholder={tx.emailPH}
            value={form.email}
            autoComplete="email"
            onChange={(e) => {
              setForm((p) => ({ ...p, email: e.target.value }))
              setErrors((p) => ({ ...p, email: false }))
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#7B61FF' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? '#E24B4A' : '#2a2a4a' }}
            style={baseInputStyle(!!errors.email)}
          />
          <input
            type="tel"
            placeholder={tx.waPH}
            value={form.whatsapp}
            autoComplete="tel"
            onChange={(e) => {
              setForm((p) => ({ ...p, whatsapp: e.target.value }))
              setErrors((p) => ({ ...p, whatsapp: false }))
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#7B61FF' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = errors.whatsapp ? '#E24B4A' : '#2a2a4a' }}
            style={baseInputStyle(!!errors.whatsapp)}
          />

          <div className="pt-1">
            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-xl py-4 px-8 font-semibold group transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: '#7B61FF',
                color: 'white',
                boxShadow: '0 4px 20px rgba(123, 97, 255, 0.35)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <span className="relative">{tx.cta}</span>
            </button>
          </div>
        </motion.form>

        <motion.p
          variants={item}
          className="text-center mt-4 text-xs"
          style={{ color: '#4A4F62' }}
        >
          {tx.meta}
        </motion.p>
      </motion.div>
    </div>
  )
}
