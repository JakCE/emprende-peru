import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

const TOPICS = [
  '💡 Idea de negocio',
  '📋 RUC',
  '📦 Inventario',
  '💰 Ingresos y gastos',
  '🧾 Comprobantes',
  '📊 Tributos',
  '📈 Crecimiento',
]

// Estrellas/partículas decorativas fijas
const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${Math.floor((i * 37 + 11) % 100)}%`,
  left: `${Math.floor((i * 53 + 7) % 100)}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.15 + (i % 5) * 0.07,
}))

export default function HomeScreen() {
  const { goTo, money, score, resetGame } = useGameStore()
  const hasSave = score > 0

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-12 overflow-hidden">

      {/* ── Fondo con gradiente + grid pattern ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, #0d0a1e 0%, #1a1060 40%, #0a1f3e 100%)',
        }}
      />
      {/* Grid tipo pixel-art sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow central */}
      <div
        className="absolute -z-10 rounded-full blur-3xl opacity-30"
        style={{
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)',
        }}
      />
      {/* Glow superior derecho */}
      <div
        className="absolute -z-10 rounded-full blur-2xl opacity-20"
        style={{
          width: 300,
          height: 300,
          top: '-60px',
          right: '-60px',
          background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
        }}
      />
      {/* Partículas */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* ── Logo / título ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        {/* Icono con halo */}
        <div className="relative inline-block mb-4">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
          />
          <div
            className="relative text-7xl select-none"
            style={{ filter: 'drop-shadow(0 0 18px #f59e0b88)' }}
          >
            🏪
          </div>
        </div>

        <h1
          className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight"
          style={{ textShadow: '0 0 40px rgba(139,92,246,0.6)' }}
        >
          Emprende{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Perú
          </span>
        </h1>

        <p className="text-violet-300 text-sm mt-2 font-semibold tracking-wide uppercase">
          ✦ De idea a empresa ✦
        </p>
        <p className="text-slate-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
          Aprende a crear, formalizar y gestionar tu propio negocio
          a través de una aventura interactiva.
        </p>
      </motion.div>

      {/* ── Stats partida guardada ── */}
      {hasSave && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 rounded-2xl px-8 py-4 text-center z-10"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(139,92,246,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Dinero</p>
            <p className="text-yellow-400 font-bold text-2xl">S/ {money.toLocaleString()}</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Puntaje</p>
            <p className="text-emerald-400 font-bold text-2xl">{score.toLocaleString()}</p>
          </div>
        </motion.div>
      )}

      {/* ── Botones ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col gap-3 w-full max-w-sm z-10"
      >
        <button
          onClick={() => goTo('story-intro')}
          className="w-full py-4 rounded-2xl font-black text-lg text-white cursor-pointer transition-all active:scale-95 hover:brightness-110"
          style={{
            background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
            boxShadow: '0 0 24px rgba(124,58,237,0.5), 0 4px 12px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px',
          }}
        >
          {hasSave ? '▶  Continuar' : '🚀  Comenzar aventura'}
        </button>

        {hasSave && (
          <button
            onClick={() => goTo('final')}
            className="w-full py-3 rounded-2xl font-semibold text-sm text-violet-300 cursor-pointer hover:bg-violet-500/10 transition-colors"
            style={{ border: '1px solid rgba(139,92,246,0.4)' }}
          >
            Ver mi progreso
          </button>
        )}

        {hasSave && (
          <button
            onClick={() => { if (confirm('¿Reiniciar partida? Perderás todo el progreso.')) resetGame() }}
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors cursor-pointer text-center pt-1"
          >
            Reiniciar desde cero
          </button>
        )}
      </motion.div>

      {/* ── Pills de temas ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="flex flex-wrap justify-center gap-3 max-w-xl z-10"
      >
        {TOPICS.map((tag) => (
          <span
            key={tag}
            className="text-slate-300 text-sm font-medium px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
