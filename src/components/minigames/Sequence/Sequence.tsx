import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SequenceActivity } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'
import { useSound } from '../../../hooks/useSound'

interface Props {
  activity: SequenceActivity
  onComplete: (correct: number, total: number) => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  // garantizar que al menos un elemento esté fuera de posición
  if (a.every((v, i) => v === arr[i]) && a.length > 1) {
    [a[0], a[1]] = [a[1], a[0]]
  }
  return a
}

export default function Sequence({ activity, onComplete }: Props) {
  const correctOrder = useMemo(() => activity.steps.map((s) => s.id), [activity])
  const [order, setOrder] = useState(() => shuffle(activity.steps).map((s) => s.id))
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(0)
  const { awardCorrect } = useGameStore()
  const { play } = useSound()

  const moveUp = (index: number) => {
    if (index === 0 || submitted) return
    play('click')
    setOrder((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  const moveDown = (index: number) => {
    if (index === order.length - 1 || submitted) return
    play('click')
    setOrder((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const submit = () => {
    let c = 0
    for (let i = 0; i < order.length; i++) {
      if (order[i] === correctOrder[i]) { c++; awardCorrect() }
    }
    setCorrect(c)
    setSubmitted(true)
    play(c === order.length ? 'complete' : 'coin')
    setTimeout(() => onComplete(c, order.length), 2200)
  }

  const getStep = (id: string) => activity.steps.find((s) => s.id === id)!

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white font-semibold">{activity.instruction}</p>
        <p className="text-slate-400 text-xs mt-1">Usa ▲ ▼ para ordenar los pasos de primero a último</p>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {order.map((id, index) => {
            const step = getStep(id)
            const isCorrect = submitted && order[index] === correctOrder[index]
            const isWrong = submitted && order[index] !== correctOrder[index]
            const correctPos = submitted ? correctOrder.indexOf(id) + 1 : null

            return (
              <motion.div key={id} layout
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: isCorrect ? 'rgba(16,185,129,0.15)' : isWrong ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.06)',
                  border: `1.5px solid ${isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
                }}>
                {/* Número de posición */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'rgba(99,102,241,0.3)', color: '#fff' }}>
                  {index + 1}
                </div>

                <p className="text-slate-200 text-sm flex-1 leading-snug">{step.label}</p>

                {isWrong && correctPos && (
                  <span className="text-slate-500 text-xs shrink-0">→ pos. {correctPos}</span>
                )}

                {!submitted && (
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => moveUp(index)} disabled={index === 0}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs cursor-pointer disabled:opacity-20 hover:bg-white/10 transition-colors">▲</button>
                    <button onClick={() => moveDown(index)} disabled={index === order.length - 1}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs cursor-pointer disabled:opacity-20 hover:bg-white/10 transition-colors">▼</button>
                  </div>
                )}

                {submitted && <span className="text-xl shrink-0">{isCorrect ? '✓' : '✗'}</span>}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {!submitted && (
        <button onClick={submit}
          className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#6366f1)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
          ✓ Verificar orden
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b98155' }}>
          <p className="text-emerald-300 font-bold text-lg">
            {correct} de {order.length} pasos en posición correcta 🎉
          </p>
        </motion.div>
      )}
    </div>
  )
}
