import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MultipleChoiceQuestion } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'
import { useSound } from '../../../hooks/useSound'

interface Props {
  question: MultipleChoiceQuestion
  onNext: (wasCorrect: boolean) => void
}

type State = 'idle' | 'correct' | 'wrong'

export default function MultipleChoice({ question, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [state, setState] = useState<State>('idle')
  const { awardCorrect } = useGameStore()
  const { play } = useSound()

  const choose = (i: number) => {
    if (state !== 'idle') return
    setSelected(i)
    if (i === question.correctIndex) {
      setState('correct')
      awardCorrect()
      play('correct')
    } else {
      setState('wrong')
      play('wrong')
    }
  }

  const handleNext = () => {
    onNext(state === 'correct')
    setSelected(null)
    setState('idle')
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Pregunta */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="text-white font-semibold text-lg leading-snug">{question.question}</p>
      </motion.div>

      {/* Opciones */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex
          const isSelected = selected === i

          let bg = 'rgba(255,255,255,0.05)'
          let border = 'rgba(255,255,255,0.12)'
          let textColor = '#e2e8f0'
          let icon = ''

          if (state !== 'idle') {
            if (isCorrect) { bg = 'rgba(16,185,129,0.2)'; border = '#10b981'; textColor = '#6ee7b7'; icon = '✓' }
            else if (isSelected) { bg = 'rgba(239,68,68,0.2)'; border = '#ef4444'; textColor = '#fca5a5'; icon = '✗' }
          }

          return (
            <motion.button
              key={i}
              onClick={() => choose(i)}
              disabled={state !== 'idle'}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={state === 'idle' ? { scale: 1.02, x: 4 } : {}}
              whileTap={state === 'idle' ? { scale: 0.98 } : {}}
              className="w-full text-left px-5 py-4 rounded-xl font-medium transition-all cursor-pointer disabled:cursor-default flex items-center gap-3"
              style={{ background: bg, border: `1.5px solid ${border}`, color: textColor }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: 'rgba(255,255,255,0.1)', color: textColor }}
              >
                {icon || String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback + botón continuar */}
      <AnimatePresence>
        {state !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: state === 'correct' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${state === 'correct' ? '#10b98155' : '#ef444455'}`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{state === 'correct' ? '🎉' : '💡'}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: state === 'correct' ? '#6ee7b7' : '#fca5a5' }}>
                  {state === 'correct' ? '¡Correcto! +S/ 100' : 'Incorrecto'}
                </p>
                <p className="text-slate-300 text-sm mt-0.5">{question.explanation}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95"
              style={{ background: state === 'correct' ? 'linear-gradient(90deg,#059669,#10b981)' : 'linear-gradient(90deg,#7c3aed,#6366f1)' }}
            >
              Continuar →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
