import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DragDropActivity } from '../../../types/game'
import { useGameStore } from '../../../store/gameStore'
import { useSound } from '../../../hooks/useSound'

interface Props {
  activity: DragDropActivity
  onComplete: (correct: number, total: number) => void
}

interface Placement { itemId: string; category: string }

export default function DragDrop({ activity, onComplete }: Props) {
  const [placements, setPlacements] = useState<Placement[]>([])
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const { awardCorrect } = useGameStore()
  const { play } = useSound()
  const touchTarget = useRef<string | null>(null)

  const placed = placements.map((p) => p.itemId)
  const unplaced = activity.items.filter((it) => !placed.includes(it.id))
  const getItemsInCategory = (cat: string) =>
    placements.filter((p) => p.category === cat).map((p) => activity.items.find((it) => it.id === p.itemId)!)

  const drop = (category: string, itemId?: string) => {
    const id = itemId ?? dragging
    if (!id) return
    setPlacements((prev) => [...prev.filter((p) => p.itemId !== id), { itemId: id, category }])
    play('click')
    setDragging(null)
    setDragOver(null)
  }

  const removeFromCategory = (itemId: string) => {
    if (submitted) return
    setPlacements((prev) => prev.filter((p) => p.itemId !== itemId))
  }

  // Touch support
  const handleTouchStart = (itemId: string) => { touchTarget.current = itemId }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchTarget.current) return
    const touch = e.changedTouches[0]
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    const zone = el?.closest('[data-category]') as HTMLElement | null
    if (zone?.dataset.category) drop(zone.dataset.category, touchTarget.current)
    touchTarget.current = null
  }

  const submit = () => {
    const res: Record<string, boolean> = {}
    let correct = 0
    for (const item of activity.items) {
      const ok = placements.find((p) => p.itemId === item.id)?.category === item.correctCategory
      res[item.id] = !!ok
      if (ok) { correct++; awardCorrect() }
    }
    setResults(res)
    setSubmitted(true)
    play(Object.values(res).every(Boolean) ? 'complete' : 'coin')
    setTimeout(() => onComplete(correct, activity.items.length), 2000)
  }

  const allPlaced = unplaced.length === 0

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-white font-semibold">{activity.instruction}</p>
        {!submitted && <p className="text-slate-400 text-xs mt-1">Arrastra o toca cada elemento y luego toca la categoría</p>}
      </div>

      {/* Banco de elementos */}
      {!submitted && unplaced.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unplaced.map((item) => (
            <motion.div
              key={item.id}
              layout
              draggable
              onDragStart={() => setDragging(item.id)}
              onDragEnd={() => setDragging(null)}
              onTouchStart={() => handleTouchStart(item.id)}
              onTouchEnd={handleTouchEnd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-grab active:cursor-grabbing select-none"
              style={{
                background: dragging === item.id ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)',
                border: `1.5px solid ${dragging === item.id ? '#6366f1' : 'rgba(255,255,255,0.2)'}`,
                color: '#e2e8f0',
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>
      )}

      {/* Drop zones */}
      <div className="grid grid-cols-2 gap-4">
        {activity.categories.map((cat) => {
          const items = getItemsInCategory(cat)
          const isOver = dragOver === cat
          return (
            <div
              key={cat}
              data-category={cat}
              onDragOver={(e) => { e.preventDefault(); setDragOver(cat) }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => drop(cat)}
              className="rounded-2xl p-3 min-h-32 flex flex-col gap-2 transition-all duration-200"
              style={{
                background: isOver ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                border: `2px dashed ${isOver ? '#6366f1' : 'rgba(255,255,255,0.15)'}`,
              }}
            >
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider text-center">{cat}</p>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {items.map((item) => {
                    const ok = results[item.id]
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => removeFromCategory(item.id)}
                        className="px-3 py-2 rounded-lg text-xs font-medium select-none"
                        style={{
                          background: submitted ? (ok ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)') : 'rgba(255,255,255,0.1)',
                          border: `1.5px solid ${submitted ? (ok ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.2)'}`,
                          color: submitted ? (ok ? '#6ee7b7' : '#fca5a5') : '#e2e8f0',
                          cursor: submitted ? 'default' : 'pointer',
                        }}
                      >
                        {submitted && <span className="mr-1">{ok ? '✓' : '✗'}</span>}
                        {item.label}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={submit}
          disabled={!allPlaced}
          className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#6366f1)', boxShadow: allPlaced ? '0 0 20px rgba(99,102,241,0.4)' : 'none' }}
        >
          {allPlaced ? '✓ Verificar respuestas' : `Faltan ${unplaced.length} por clasificar`}
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b98155' }}>
          <p className="text-emerald-300 font-bold text-lg">
            {Object.values(results).filter(Boolean).length} de {activity.items.length} correctos 🎉
          </p>
        </motion.div>
      )}
    </div>
  )
}
