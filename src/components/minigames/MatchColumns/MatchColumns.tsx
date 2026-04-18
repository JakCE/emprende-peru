import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MatchColumnsActivity } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'
import { useSound } from '../../../hooks/useSound'

interface Props {
  activity: MatchColumnsActivity
  onComplete: (correct: number, total: number) => void
}

export default function MatchColumns({ activity, onComplete }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const { awardCorrect } = useGameStore()
  const { play } = useSound()

  const matchedRight = Object.values(matches)
  const matchedLeft = Object.keys(matches)

  const handleLeft = (id: string) => {
    if (submitted) return
    play('click')
    setSelectedLeft((prev) => (prev === id ? null : id))
  }

  const handleRight = (rightId: string) => {
    if (submitted || !selectedLeft) return
    setMatches((prev) => {
      const cleaned = Object.fromEntries(Object.entries(prev).filter(([, v]) => v !== rightId))
      return { ...cleaned, [selectedLeft]: rightId }
    })
    play('click')
    setSelectedLeft(null)
  }

  const removeMatch = (leftId: string) => {
    if (submitted) return
    setMatches((prev) => { const n = { ...prev }; delete n[leftId]; return n })
  }

  const submit = () => {
    const res: Record<string, boolean> = {}
    let correct = 0
    for (const pair of activity.pairs) {
      const ok = matches[pair.id] === pair.id + '-right'
      res[pair.id] = ok
      if (ok) { correct++; awardCorrect() }
    }
    setResults(res)
    setSubmitted(true)
    play(correct === activity.pairs.length ? 'complete' : 'coin')
    setTimeout(() => onComplete(correct, activity.pairs.length), 2000)
  }

  const allMatched = matchedLeft.length === activity.pairs.length
  const shuffledRight = [...activity.pairs].sort((a, b) => a.right.localeCompare(b.right))

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white font-semibold">{activity.instruction}</p>
        <p className="text-slate-400 text-xs mt-1">Selecciona un elemento izquierdo y luego su par derecho</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Izquierda */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-500 text-xs uppercase tracking-wider text-center mb-1">Concepto</p>
          {activity.pairs.map((pair) => {
            const isSelected = selectedLeft === pair.id
            const isMatched = pair.id in matches
            const ok = results[pair.id]
            let bg = 'rgba(255,255,255,0.06)', border = 'rgba(255,255,255,0.15)', color = '#cbd5e1'
            if (isSelected) { bg = 'rgba(99,102,241,0.3)'; border = '#6366f1'; color = '#fff' }
            else if (isMatched && !submitted) { bg = 'rgba(245,158,11,0.15)'; border = '#f59e0b55'; color = '#fcd34d' }
            if (submitted) { bg = ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'; border = ok ? '#10b981' : '#ef4444'; color = ok ? '#6ee7b7' : '#fca5a5' }
            return (
              <motion.button key={pair.id}
                onClick={() => isMatched && !submitted ? removeMatch(pair.id) : handleLeft(pair.id)}
                whileHover={!submitted ? { scale: 1.02 } : {}} whileTap={!submitted ? { scale: 0.98 } : {}}
                className="px-3 py-3 rounded-xl text-sm font-medium text-left cursor-pointer transition-all"
                style={{ background: bg, border: `1.5px solid ${border}`, color }}>
                {submitted && <span className="mr-1">{ok ? '✓' : '✗'}</span>}
                {pair.left}
                {isMatched && !submitted && <span className="block text-xs opacity-60 mt-0.5">toca para quitar</span>}
              </motion.button>
            )
          })}
        </div>

        {/* Derecha */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-500 text-xs uppercase tracking-wider text-center mb-1">Definición</p>
          {shuffledRight.map((pair) => {
            const rightId = pair.id + '-right'
            const isUsed = matchedRight.includes(rightId)
            const isTarget = selectedLeft !== null && !isUsed
            let bg = 'rgba(255,255,255,0.06)', border = 'rgba(255,255,255,0.15)', color = '#cbd5e1'
            if (isTarget) { bg = 'rgba(16,185,129,0.1)'; border = '#10b98166'; color = '#6ee7b7' }
            if (isUsed && !submitted) { bg = 'rgba(245,158,11,0.1)'; border = '#f59e0b44'; color = '#fcd34d88' }
            if (submitted) {
              const leftId = Object.entries(matches).find(([, v]) => v === rightId)?.[0]
              if (leftId) {
                const ok = results[leftId]
                bg = ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'
                border = ok ? '#10b981' : '#ef4444'
                color = ok ? '#6ee7b7' : '#fca5a5'
              }
            }
            return (
              <motion.button key={rightId}
                onClick={() => handleRight(rightId)}
                disabled={isUsed || submitted}
                whileHover={isTarget ? { scale: 1.02 } : {}} whileTap={isTarget ? { scale: 0.98 } : {}}
                className="px-3 py-3 rounded-xl text-sm font-medium text-left transition-all"
                style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: isTarget ? 'pointer' : 'default' }}>
                {pair.right}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Conexiones activas */}
      {!submitted && Object.keys(matches).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(matches).map(([leftId, rightId]) => {
            const left = activity.pairs.find((p) => p.id === leftId)
            const right = activity.pairs.find((p) => p.id + '-right' === rightId)
            if (!left || !right) return null
            return (
              <AnimatePresence key={leftId}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b44', color: '#fcd34d' }}>
                  <span className="truncate max-w-20">{left.left}</span>
                  <span className="opacity-50">↔</span>
                  <span className="truncate max-w-20">{right.right}</span>
                </motion.div>
              </AnimatePresence>
            )
          })}
        </div>
      )}

      {!submitted && (
        <button onClick={submit} disabled={!allMatched}
          className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#6366f1)', boxShadow: allMatched ? '0 0 20px rgba(99,102,241,0.4)' : 'none' }}>
          {allMatched ? '✓ Verificar pares' : `Faltan ${activity.pairs.length - matchedLeft.length} por emparejar`}
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b98155' }}>
          <p className="text-emerald-300 font-bold">
            {Object.values(results).filter(Boolean).length} de {activity.pairs.length} pares correctos 🎉
          </p>
        </motion.div>
      )}
    </div>
  )
}
