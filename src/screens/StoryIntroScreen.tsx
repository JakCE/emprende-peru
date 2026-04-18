import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useSound } from '../hooks/useSound'
import { useVoice } from '../hooks/useVoice'
import { CHARACTER_CONFIG } from '../components/story/CharacterSprite'

type Phase = 'narrator' | 'characters' | 'objectives'

const NARRATOR_LINES = [
  'Bienvenido a Emprende Perú...',
  'Esta es la historia de alguien como tú: un joven con ganas de crear algo propio.',
  'Pero emprender no es solo tener una idea. Es formalizarse, organizarse, vender bien y crecer con inteligencia.',
  'A lo largo de este viaje aprenderás exactamente cómo hacerlo, paso a paso.',
  'Tendrás un mentor, una asesora y un amigo que te acompañarán en cada etapa.',
  'Y tú tomarás las decisiones. ¿Estás listo para emprender?',
]

const CHARACTERS = [
  {
    id: 'main' as const,
    role: 'El emprendedor',
    description: 'Eres tú. Tienes la idea y las ganas. Aprenderás a convertirlas en una empresa real.',
  },
  {
    id: 'mentor' as const,
    role: 'Don Carlos — Mentor',
    description: 'Empresario con experiencia. Te guía en cada decisión importante del negocio.',
  },
  {
    id: 'advisor' as const,
    role: 'Ana — Asesora formal',
    description: 'Especialista en trámites y formalización. Te orienta con el RUC, tributos y comprobantes.',
  },
  {
    id: 'friend' as const,
    role: 'Tu amigo',
    description: 'Hace las preguntas que todos pensamos pero nadie dice. Aprende contigo.',
  },
  {
    id: 'client' as const,
    role: 'El cliente',
    description: 'Representa el mercado. Aparece cuando necesitas aprender a atender y vender correctamente.',
  },
]

const OBJECTIVES = [
  { emoji: '💡', text: 'Identificar tu idea de negocio y validarla en el mercado' },
  { emoji: '📋', text: 'Obtener tu RUC y formalizarte ante el Estado' },
  { emoji: '📦', text: 'Controlar tu inventario y evitar pérdidas' },
  { emoji: '💰', text: 'Registrar ingresos y gastos para calcular tu ganancia real' },
  { emoji: '🧾', text: 'Emitir el comprobante correcto en cada venta' },
  { emoji: '📊', text: 'Cumplir con tus tributos y operar sin riesgos' },
  { emoji: '📈', text: 'Reinvertir tus ganancias y hacer crecer tu empresa' },
]

export default function StoryIntroScreen() {
  const { startChapter } = useGameStore()
  const { play } = useSound()
  const { speak, stop } = useVoice()
  const [phase, setPhase] = useState<Phase>('narrator')
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [lineDone, setLineDone] = useState(false)

  // Typewriter + voz para el narrador
  useEffect(() => {
    if (phase !== 'narrator') return
    const text = NARRATOR_LINES[lineIndex]
    setDisplayed('')
    setLineDone(false)
    speak(text)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); setLineDone(true) }
    }, 30)
    return () => { clearInterval(interval); stop() }
  }, [lineIndex, phase])

  const handleNarratorClick = () => {
    if (!lineDone) { setDisplayed(NARRATOR_LINES[lineIndex]); setLineDone(true); return }
    play('click')
    if (lineIndex < NARRATOR_LINES.length - 1) {
      setLineIndex((i) => i + 1)
    } else {
      play('transition')
      setPhase('characters')
    }
  }

  const goToObjectives = () => { play('transition'); setPhase('objectives') }
  const goToGame = () => { play('transition'); startChapter('intro') }

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d0a1e 0%, #1a1060 50%, #0a1f3e 100%)' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow central */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(109,40,217,0.15), transparent)' }}
      />

      {/* Indicador de fase */}
      <div className="flex justify-center gap-2 pt-6 z-10">
        {(['narrator', 'characters', 'objectives'] as Phase[]).map((p, i) => (
          <div key={p} className="h-1.5 w-16 rounded-full transition-all duration-500"
            style={{ background: p === phase ? '#6366f1' : phase === 'objectives' || (phase === 'characters' && i === 0) ? '#10b981' : 'rgba(255,255,255,0.15)' }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Fase 1: Narrador ── */}
        {phase === 'narrator' && (
          <motion.div
            key="narrator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-8 z-10"
            onClick={handleNarratorClick}
          >
            {/* Personaje narrador */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-40"
                  style={{ background: 'radial-gradient(circle, #94a3b8, transparent)' }} />
                <div className="relative w-32 h-32 rounded-3xl flex items-center justify-center"
                  style={{ background: 'rgba(148,163,184,0.1)', border: '2px solid rgba(148,163,184,0.3)' }}>
                  <span style={{ fontSize: 72 }}>📖</span>
                </div>
              </div>
              <span className="text-slate-400 text-sm font-bold px-4 py-1 rounded-full"
                style={{ background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)' }}>
                Narrador
              </span>
            </motion.div>

            {/* Texto */}
            <div className="w-full max-w-md rounded-2xl p-6 cursor-pointer select-none"
              style={{ background: 'rgba(15,10,40,0.85)', border: '1.5px solid rgba(148,163,184,0.3)', backdropFilter: 'blur(12px)' }}>
              <p className="text-white text-lg leading-relaxed min-h-16">
                {displayed}
                {!lineDone && <span className="animate-pulse text-slate-400 ml-0.5">▌</span>}
              </p>
              {lineDone && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex justify-end items-center gap-1 mt-4">
                  <span className="text-slate-500 text-xs">
                    {lineIndex < NARRATOR_LINES.length - 1 ? 'Toca para continuar' : 'Ver personajes →'}
                  </span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 0.9 }}
                    className="text-slate-500 text-xs">▶</motion.span>
                </motion.div>
              )}
            </div>

            {/* Progreso de líneas */}
            <div className="flex gap-1.5">
              {NARRATOR_LINES.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i <= lineIndex ? '#6366f1' : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Fase 2: Personajes ── */}
        {phase === 'characters' && (
          <motion.div
            key="characters"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col px-4 py-6 gap-5 z-10 overflow-y-auto"
          >
            <div className="text-center">
              <h2 className="text-white text-2xl font-black">Los personajes</h2>
              <p className="text-slate-400 text-sm mt-1">Conoce a quienes te acompañarán en esta aventura</p>
            </div>

            <div className="flex flex-col gap-3">
              {CHARACTERS.map((char, i) => {
                const cfg = CHARACTER_CONFIG[char.id]
                return (
                  <motion.div
                    key={char.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ background: `${cfg.color}11`, border: `1.5px solid ${cfg.color}33` }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${cfg.color}22`, border: `1px solid ${cfg.color}44` }}>
                      <span style={{ fontSize: 32 }}>{cfg.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ color: cfg.color }}>{char.role}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{char.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <button
              onClick={goToObjectives}
              className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95 shrink-0"
              style={{ background: 'linear-gradient(90deg,#7c3aed,#6366f1)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
            >
              Ver tu misión →
            </button>
          </motion.div>
        )}

        {/* ── Fase 3: Objetivos ── */}
        {phase === 'objectives' && (
          <motion.div
            key="objectives"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col px-4 py-6 gap-5 z-10 overflow-y-auto"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">🎯</div>
              <h2 className="text-white text-2xl font-black">Tu misión</h2>
              <p className="text-slate-400 text-sm mt-1">Esto es lo que debes lograr para completar la aventura</p>
            </div>

            <div className="flex flex-col gap-2.5">
              {OBJECTIVES.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span className="text-2xl shrink-0">{obj.emoji}</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{obj.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}
              >
                <p className="text-yellow-400 text-sm font-semibold">
                  💰 Cada respuesta correcta: +S/ 100
                </p>
                <p className="text-slate-400 text-xs mt-1">Completa niveles perfectos para ganar bonos extra</p>
              </motion.div>

              <button
                onClick={goToGame}
                className="w-full py-4 rounded-2xl font-black text-white text-lg cursor-pointer transition-all hover:brightness-110 active:scale-95"
                style={{ background: 'linear-gradient(90deg,#f59e0b,#ef4444)', boxShadow: '0 0 28px rgba(245,158,11,0.4)' }}
              >
                🚀 ¡Comenzar la aventura!
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
