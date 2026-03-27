'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import IntroScreen, { type UserData } from '@/components/score/IntroScreen'
import QuizScreen, { type Answer, type Question, type Category } from '@/components/score/QuizScreen'
import ResultScreen from '@/components/score/ResultScreen'

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { key: 'web', es: '01 Presencia web', en: '01 Web presence', color: '#7B61FF', maxScore: 25 },
  { key: 'local', es: '02 Presencia local', en: '02 Local presence', color: '#1D9E75', maxScore: 30 },
  { key: 'social', es: '03 Redes sociales', en: '03 Social media', color: '#378ADD', maxScore: 25 },
  { key: 'automation', es: '04 Automatización', en: '04 Automation', color: '#EF9F27', maxScore: 20 },
]

const QUESTIONS: Question[] = [
  // ── Cat 01: Web presence (max 25 pts) ────────────────────────────────────
  {
    category: 0,
    es: '¿Tu negocio tiene sitio web propio?',
    en: 'Does your business have its own website?',
    options: [
      { es: 'No tengo sitio web', en: "I don't have a website", points: 0 },
      { es: 'Solo tengo redes sociales o un link de bio', en: 'Only social media or a bio link', points: 4 },
      { es: 'Sí, tengo sitio web propio', en: 'Yes, I have my own website', points: 8 },
    ],
  },
  {
    category: 0,
    es: '¿Tu sitio web carga rápido y se ve bien en celular?',
    en: 'Does your website load fast and look good on mobile?',
    options: [
      { es: 'No sé / nunca lo he revisado', en: "I don't know / never checked", points: 0 },
      { es: 'Carga lento o se ve mal en celular', en: 'Loads slow or looks bad on mobile', points: 4 },
      { es: 'Carga rápido y se ve bien en cualquier dispositivo', en: 'Fast and looks great on any device', points: 8 },
    ],
  },
  {
    category: 0,
    es: '¿Los visitantes pueden contactarte fácilmente desde tu web?',
    en: 'Can visitors easily contact you from your website?',
    options: [
      { es: 'No hay forma de contacto visible', en: 'No visible contact option', points: 0 },
      { es: 'Solo hay un email o teléfono', en: 'Only an email or phone number', points: 4 },
      { es: 'Tengo WhatsApp, formulario o botón de reserva visible', en: 'I have WhatsApp, form or booking button', points: 9 },
    ],
  },
  // ── Cat 02: Local presence (max 30 pts) ──────────────────────────────────
  {
    category: 1,
    es: '¿Tu negocio aparece en Google cuando alguien lo busca por nombre?',
    en: 'Does your business appear on Google when searched by name?',
    options: [
      { es: 'No aparece o no lo he buscado nunca', en: "Doesn't appear or I've never searched", points: 0 },
      { es: 'Aparece solo el nombre, sin info completa', en: 'Only the name, no complete info', points: 5 },
      { es: 'Tengo Google Business con foto, horario y dirección', en: 'I have Google Business with photo, hours and address', points: 10 },
    ],
  },
  {
    category: 1,
    es: '¿Cuántas reseñas tienes en Google y cuál es tu rating?',
    en: "How many Google reviews do you have and what's your rating?",
    options: [
      { es: 'Menos de 5 reseñas o no tengo', en: 'Less than 5 reviews or none', points: 0 },
      { es: 'Entre 5 y 20 reseñas, rating entre 3.5 y 4.2', en: '5-20 reviews, rating between 3.5 and 4.2', points: 5 },
      { es: 'Más de 20 reseñas con rating 4.3 o más', en: '20+ reviews with 4.3+ rating', points: 10 },
    ],
  },
  {
    category: 1,
    es: '¿Tu negocio aparece en directorios como Yelp, Apple Maps o Bing?',
    en: 'Is your business listed on Yelp, Apple Maps or Bing?',
    options: [
      { es: 'No estoy en ninguno', en: 'Not listed anywhere', points: 0 },
      { es: 'Estoy en uno o dos pero sin info actualizada', en: 'Listed in one or two, info not updated', points: 5 },
      { es: 'Estoy en varios con info consistente y actualizada', en: 'Listed in several with consistent, updated info', points: 10 },
    ],
  },
  // ── Cat 03: Social media (max 25 pts) ────────────────────────────────────
  {
    category: 2,
    es: '¿En qué plataformas tiene presencia activa tu negocio?',
    en: 'On which platforms does your business have an active presence?',
    options: [
      { es: 'No tengo redes o están abandonadas', en: 'No social media or abandoned accounts', points: 0 },
      { es: 'Solo tengo Facebook o una red sin actividad', en: 'Only Facebook or one inactive network', points: 4 },
      { es: 'Tengo Instagram, Facebook o TikTok activos', en: 'Active on Instagram, Facebook or TikTok', points: 8 },
    ],
  },
  {
    category: 2,
    es: '¿Con qué frecuencia publicas contenido?',
    en: 'How often do you post content?',
    options: [
      { es: 'Publico cuando me acuerdo o casi nunca', en: 'I post when I remember or almost never', points: 0 },
      { es: 'Publico 1-2 veces por semana sin plan fijo', en: '1-2 times a week, no fixed plan', points: 4 },
      { es: 'Publico con calendario y estrategia definida', en: 'I post with a calendar and defined strategy', points: 8 },
    ],
  },
  {
    category: 2,
    es: '¿Tu contenido genera interacción?',
    en: 'Does your content generate engagement?',
    options: [
      { es: 'Casi nadie interactúa con mis publicaciones', en: 'Almost no one interacts with my posts', points: 0 },
      { es: 'Hay algo de interacción pero pocos mensajes de clientes', en: 'Some interaction but few client messages', points: 4 },
      { es: 'Recibo mensajes y clientes directamente desde redes', en: 'I get messages and clients directly from social media', points: 9 },
    ],
  },
  // ── Cat 04: Automation (max 20 pts) ──────────────────────────────────────
  {
    category: 3,
    es: '¿Qué pasa cuando alguien te escribe por WhatsApp fuera de horario?',
    en: 'What happens when someone messages you on WhatsApp outside business hours?',
    options: [
      { es: 'No respondo hasta el día siguiente', en: "I don't respond until the next day", points: 0 },
      { es: 'Tengo un mensaje de ausencia básico', en: 'I have a basic away message', points: 3 },
      { es: 'Tengo un bot o sistema automático que responde', en: 'I have a bot or automatic response system', points: 7 },
    ],
  },
  {
    category: 3,
    es: '¿Cómo llevas el seguimiento de tus clientes potenciales?',
    en: 'How do you track your potential clients?',
    options: [
      { es: 'No llevo seguimiento, confío en mi memoria', en: 'No tracking, I rely on my memory', points: 0 },
      { es: 'Uso notas, WhatsApp o una hoja de Excel', en: 'I use notes, WhatsApp or Excel', points: 3 },
      { es: 'Tengo un CRM o sistema organizado de leads', en: 'I have a CRM or organized lead system', points: 6 },
    ],
  },
  {
    category: 3,
    es: '¿Usas alguna herramienta de inteligencia artificial en tu negocio?',
    en: 'Do you use any AI tools in your business?',
    options: [
      { es: 'No uso ninguna IA actualmente', en: "I don't use any AI currently", points: 0 },
      { es: 'Uso ChatGPT u otra IA ocasionalmente', en: 'I use ChatGPT or other AI occasionally', points: 3 },
      { es: 'Tengo IA integrada en procesos de mi negocio', en: 'I have AI integrated into my business processes', points: 7 },
    ],
  },
]

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = 'intro' | 'quiz' | 'result'

interface CategoryScores {
  web: number
  local: number
  social: number
  automation: number
}

// ─── Animation variants ──────────────────────────────────────────────────────

const screenVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const screenTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ScorePage() {
  const [screen, setScreen] = useState<Screen>('intro')
  const { language } = useLanguage()
  const lang = language as 'es' | 'en'
  const [userData, setUserData] = useState<UserData | null>(null)
  const [categoryScores, setCategoryScores] = useState<CategoryScores>({
    web: 0,
    local: 0,
    social: 0,
    automation: 0,
  })
  const [totalScore, setTotalScore] = useState(0)

  const handleIntroSubmit = (data: UserData) => {
    setUserData(data)
    setScreen('quiz')
  }

  const handleQuizComplete = (answers: Answer[]) => {
    const scores: CategoryScores = {
      web: answers.filter((a) => a.questionIndex < 3).reduce((s, a) => s + a.points, 0),
      local: answers.filter((a) => a.questionIndex >= 3 && a.questionIndex < 6).reduce((s, a) => s + a.points, 0),
      social: answers.filter((a) => a.questionIndex >= 6 && a.questionIndex < 9).reduce((s, a) => s + a.points, 0),
      automation: answers.filter((a) => a.questionIndex >= 9).reduce((s, a) => s + a.points, 0),
    }
    const total = scores.web + scores.local + scores.social + scores.automation

    setCategoryScores(scores)
    setTotalScore(total)
    setScreen('result')

    // Submit to n8n webhook — configure N8N_URL in your environment
    if (userData) {
      fetch('https://outrick1866.app.n8n.cloud/webhook/score-outrick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          whatsapp: userData.whatsapp,
          totalScore: total,
          scores,
          language: lang,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // fail silently — results still shown to user
      })
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090F',
        color: '#F0F0F5',
        fontFamily: 'var(--font-body)',
      }}
    >
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="intro"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={screenTransition}
          >
            <IntroScreen lang={lang} onSubmit={handleIntroSubmit} />
          </motion.div>
        )}

        {screen === 'quiz' && (
          <motion.div
            key="quiz"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={screenTransition}
          >
            <QuizScreen
              lang={lang}
              questions={QUESTIONS}
              categories={CATEGORIES}
              onComplete={handleQuizComplete}
            />
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={screenTransition}
          >
            <ResultScreen
              lang={lang}
              totalScore={totalScore}
              categoryScores={categoryScores}
              userName={userData?.name ?? ''}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
