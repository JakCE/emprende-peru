import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TrueFalseQuestion } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'
import { useSound } from '../../../hooks/useSound'

interface Props {
  questions: TrueFalseQuestion[]
  onComplete: (correct: number, total: number) => void
}

export default function TrueFalse({ questions, onComplete }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<boolean | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const { awardCorrect } = useGameStore()
  const { play } = useSound()

  const q = questions[current]
  const isLast = current === questions.length - 1

  const choose = (val: boolean) => {
    if (answered) return
    setSelected(val)
    setAnswered(true)
    if (val === q.isTrue) {
      awardCorrect()
      setCorrectCount((c) => c + 1)
      play('correct')
    } else {
      play('wrong')
    }
  }

  const next = () => {
    if (isLast) {
      onComplete(correctCount + (selected === q.isTrue ? 1 : 0), questions.length)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const isCorrect = selected === q.isTrue

  return (
    <div className="flex flex-col gap-5">
      {/* Progreso */}
      <div className="flex gap-1.5">
        {questions.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < current ? '#10b981' : i === current ? '#6366f1' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>

      {/* Enunciado */}
      <motion.div
        key={q.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
          {current + 1} / {questions.length}
        </p>
        <p className="text-white font-semibold text-lg leading-snug">{q.statement}</p>
      </motion.div>

      {/* Botones V/F */}
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((val) => {
          let bg = 'rgba(255,255,255,0.05)'
          let border = 'rgba(255,255,255,0.12)'
          let textCol = '#e2e8f0'
          if (answered) {
            if (val === q.isTrue) { bg = 'rgba(16,185,129,0.2)'; border = '#10b981'; textCol = '#6ee7b7' }
            else if (selected === val) { bg = 'rgba(239,68,68,0.2)'; border = '#ef4444'; textCol = '#fca5a5' }
          }
          return (
            <motion.button
              key={String(val)}
              onClick={() => choose(val)}
              disabled={answered}
              whileHover={!answered ? { scale: 1.04 } : {}}
              whileTap={!answered ? { scale: 0.96 } : {}}
              className="py-6 rounded-2xl font-black text-2xl cursor-pointer disabled:cursor-default transition-all"
              style={{ background: bg, border: `2px solid ${border}`, color: textCol }}
            >
              {val ? '✓ Verdadero' : '✗ Falso'}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${isCorrect ? '#10b98155' : '#ef444455'}`,
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{isCorrect ? '🎉' : '💡'}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: isCorrect ? '#6ee7b7' : '#fca5a5' }}>
                  {isCorrect ? '¡Correcto! +S/ 100' : 'Incorrecto'}
                </p>
                <p className="text-slate-300 text-sm mt-0.5">{q.explanation}</p>
              </div>
            </div>
            <button
              onClick={next}
              className="w-full py-3 rounded-xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95"
              style={{ background: isCorrect ? 'linear-gradient(90deg,#059669,#10b981)' : 'linear-gradient(90deg,#7c3aed,#6366f1)' }}
            >
              {isLast ? 'Ver resultados 🏆' : 'Siguiente →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
