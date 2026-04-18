import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'

const MINIGAME_ORDER = [
  { id: 'idea-negocio', label: 'Idea',        emoji: '💡' },
  { id: 'ruc',          label: 'RUC',          emoji: '📋' },
  { id: 'inventario',   label: 'Inventario',   emoji: '📦' },
  { id: 'ingresos-gastos', label: 'Ingresos',  emoji: '💰' },
  { id: 'comprobantes', label: 'Comprobantes', emoji: '🧾' },
  { id: 'tributos',     label: 'Tributos',     emoji: '📊' },
  { id: 'crecimiento',  label: 'Crecimiento',  emoji: '📈' },
]

export default function GlobalProgress() {
  const { minigames, currentMinigameId } = useGameStore()

  const completed = MINIGAME_ORDER.filter((m) => minigames[m.id]?.completed).length
  const pct = Math.round((completed / MINIGAME_ORDER.length) * 100)

  return (
    <div className="px-4 pb-3 z-10 shrink-0">
      {/* Barra principal */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-slate-500 text-xs whitespace-nowrap">Progreso</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <span className="text-slate-400 text-xs font-bold whitespace-nowrap">{completed}/7</span>
      </div>

      {/* Hitos */}
      <div className="flex justify-between">
        {MINIGAME_ORDER.map((m) => {
          const done = !!minigames[m.id]?.completed
          const active = currentMinigameId === m.id
          return (
            <div key={m.id} className="flex flex-col items-center gap-0.5" style={{ flex: 1 }}>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300"
                style={{
                  background: done ? '#10b981' : active ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)',
                  border: active ? '2px solid #6366f1' : done ? '2px solid #10b981' : '2px solid transparent',
                  fontSize: 12,
                }}
              >
                {done ? '✓' : m.emoji}
              </div>
              <span className="text-slate-600 text-center leading-tight" style={{ fontSize: 8 }}>
                {m.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
