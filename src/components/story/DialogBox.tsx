import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import type { DialogLine } from '../../types/game'
import { CHARACTER_CONFIG } from './CharacterSprite'
import { useVoice } from '../../hooks/useVoice'

interface Props {
  line: DialogLine
  onNext: () => void
  isLast: boolean
  voiceEnabled: boolean
}

export default function DialogBox({ line, onNext, isLast, voiceEnabled }: Props) {
  const cfg = CHARACTER_CONFIG[line.character]
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const { speak, stop } = useVoice()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    if (voiceEnabled) speak(line.text)

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(line.text.slice(0, i))
      if (i >= line.text.length) {
        clearInterval(intervalRef.current!)
        setDone(true)
      }
    }, 28)

    return () => {
      clearInterval(intervalRef.current!)
      stop()
    }
  }, [line])

  const skipOrNext = () => {
    if (!done) {
      clearInterval(intervalRef.current!)
      setDisplayed(line.text)
      setDone(true)
      stop()
    } else {
      onNext()
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={line.text}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        onClick={skipOrNext}
        className="relative cursor-pointer select-none rounded-2xl p-5 w-full"
        style={{
          background: 'rgba(15,10,40,0.85)',
          border: `1.5px solid ${cfg.color}55`,
          backdropFilter: 'blur(12px)',
          boxShadow: `0 0 24px ${cfg.color}22`,
        }}
      >
        {/* Nombre */}
        <div
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
          style={{ background: `${cfg.color}33`, color: cfg.color }}
        >
          {cfg.emoji} {cfg.name}
        </div>

        {/* Texto typewriter */}
        <p className="text-white text-base leading-relaxed min-h-14">
          {displayed}
          {!done && <span className="animate-pulse ml-0.5 text-slate-400">▌</span>}
        </p>

        {/* Indicador continuar */}
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-end gap-1 mt-3"
          >
            <span className="text-slate-400 text-xs">
              {isLast ? 'Ir al minijuego' : 'Toca para continuar'}
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-slate-400 text-xs"
            >
              {isLast ? '🎮' : '▶'}
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
