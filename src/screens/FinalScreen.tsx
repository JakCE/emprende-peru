import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

const RANKS = [
  { min: 0,     max: 1999,  label: 'Emprendedor inicial',        emoji: '🌱', color: '#94a3b8' },
  { min: 2000,  max: 3999,  label: 'Negocio en marcha',          emoji: '🚀', color: '#6366f1' },
  { min: 4000,  max: 5999,  label: 'Empresa formal consolidada', emoji: '🏢', color: '#f59e0b' },
  { min: 6000,  max: Infinity, label: 'Empresario destacado',    emoji: '🏆', color: '#10b981' },
]

export default function FinalScreen() {
  const { money, score, minigames, resetGame } = useGameStore()

  const rank = RANKS.findLast((r) => score >= r.min) ?? RANKS[0]
  const completed = Object.values(minigames).filter((m) => m.completed).length
  const total = 7

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-12 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d0a1e 0%, #1a1060 50%, #0a2a1f 100%)' }}
    >
      {/* Confetti estático decorativo */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 0.7, 0], y: ['0%', '100%'] }}
          transition={{ duration: 3 + (i % 3), delay: i * 0.2, repeat: Infinity }}
          style={{
            width: 8 + (i % 4) * 4,
            height: 8 + (i % 4) * 4,
            left: `${(i * 5) % 100}%`,
            top: 0,
            background: ['#6366f1', '#f59e0b', '#10b981', '#ec4899'][i % 4],
          }}
        />
      ))}

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          {rank.emoji}
        </motion.div>
        <h1 className="text-4xl font-black text-white">¡Felicitaciones!</h1>
        <p className="text-slate-400 mt-2">Completaste la aventura de emprendimiento</p>
      </motion.div>

      {/* Rango */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="z-10 text-center px-8 py-5 rounded-2xl"
        style={{ background: `${rank.color}22`, border: `2px solid ${rank.color}55` }}
      >
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Tu rango</p>
        <p className="font-black text-2xl" style={{ color: rank.color }}>{rank.label}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4 z-10 w-full max-w-sm"
      >
        {[
          { label: 'Dinero ganado', value: `S/ ${money.toLocaleString()}`, color: '#f59e0b' },
          { label: 'Puntaje total', value: score.toLocaleString(), color: '#6366f1' },
          { label: 'Minijuegos', value: `${completed}/${total}`, color: '#10b981' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
            <p className="font-black text-lg" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Aprendizajes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="z-10 w-full max-w-sm rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">Lo que aprendiste</p>
        <div className="flex flex-col gap-2">
          {['💡 Idea de negocio', '📋 RUC y formalización', '📦 Control de inventario',
            '💰 Ingresos y gastos', '🧾 Comprobantes de pago', '📊 Tributos', '📈 Crecimiento y reinversión']
            .map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span> {item}
              </div>
            ))}
        </div>
      </motion.div>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col gap-3 w-full max-w-xs z-10"
      >
        <button
          onClick={() => resetGame()}
          className="w-full py-4 rounded-2xl font-bold text-white cursor-pointer transition-all hover:brightness-110 active:scale-95"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #6366f1)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
        >
          🔄 Jugar de nuevo
        </button>
      </motion.div>
    </div>
  )
}
