import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { InteractiveTableActivity } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'

interface Props {
  activity: InteractiveTableActivity
  onComplete: (correct: number, total: number) => void
}

export default function InteractiveTable({ activity, onComplete }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const { awardCorrect } = useGameStore()

  const handleChange = (rowId: string, val: string) => {
    if (submitted) return
    setInputs((prev) => ({ ...prev, [rowId]: val }))
  }

  const submit = () => {
    const res: Record<string, boolean> = {}
    let correct = 0
    for (const row of activity.rows) {
      const userVal = inputs[row.id]?.trim()
      const ok = userVal === String(row.answer)
      res[row.id] = ok
      if (ok) { correct++; awardCorrect() }
    }
    setResults(res)
    setSubmitted(true)
    setTimeout(() => onComplete(correct, activity.rows.length), 2000)
  }

  const allFilled = activity.rows.every((r) => inputs[r.id]?.trim())

  return (
    <div className="flex flex-col gap-5">
      {/* Instrucción */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white font-semibold">{activity.instruction}</p>
        <p className="text-slate-400 text-xs mt-1">Escribe el número correcto en cada celda marcada con ❓</p>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(99,102,241,0.2)' }}>
              {activity.headers.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-slate-300 font-bold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activity.rows.map((row, ri) => (
              <tr
                key={row.id}
                style={{ background: ri % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {row.cells.map((cell, ci) => {
                  if (cell === null) {
                    const correct = results[row.id]
                    return (
                      <td key={ci} className="px-3 py-2">
                        <AnimatePresence mode="wait">
                          {submitted ? (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold"
                              style={{
                                background: correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                color: correct ? '#6ee7b7' : '#fca5a5',
                                border: `1px solid ${correct ? '#10b981' : '#ef4444'}`,
                              }}
                            >
                              <span>{correct ? '✓' : '✗'}</span>
                              <span>{correct ? inputs[row.id] : `${inputs[row.id]} → ${row.answer}`}</span>
                            </motion.div>
                          ) : (
                            <input
                              type="number"
                              placeholder="❓"
                              value={inputs[row.id] ?? ''}
                              onChange={(e) => handleChange(row.id, e.target.value)}
                              className="w-20 px-3 py-1.5 rounded-lg text-center font-bold outline-none transition-all"
                              style={{
                                background: inputs[row.id] ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.08)',
                                border: `1.5px solid ${inputs[row.id] ? '#6366f1' : 'rgba(255,255,255,0.2)'}`,
                                color: '#e2e8f0',
                              }}
                            />
                          )}
                        </AnimatePresence>
                      </td>
                    )
                  }
                  return (
                    <td key={ci} className="px-4 py-2 text-slate-300 font-medium">{cell}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón verificar */}
      {!submitted && (
        <button
          onClick={submit}
          disabled={!allFilled}
          className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#6366f1)', boxShadow: allFilled ? '0 0 20px rgba(99,102,241,0.4)' : 'none' }}
        >
          {allFilled ? '✓ Verificar tabla' : 'Completa todos los campos'}
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b98155' }}
        >
          <p className="text-emerald-300 font-bold">
            {Object.values(results).filter(Boolean).length} de {activity.rows.length} filas correctas 🎉
          </p>
        </motion.div>
      )}
    </div>
  )
}
