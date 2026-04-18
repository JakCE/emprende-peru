import { motion, AnimatePresence } from 'framer-motion'
import type { CharacterId } from '../../types/game'

interface CharacterConfig {
  emoji: string
  name: string
  color: string
  side: 'left' | 'right'
}

export const CHARACTER_CONFIG: Record<CharacterId, CharacterConfig> = {
  main:     { emoji: '🧑', name: 'Tú',         color: '#6366f1', side: 'left'  },
  mentor:   { emoji: '👨‍💼', name: 'Don Carlos',  color: '#f59e0b', side: 'right' },
  advisor:  { emoji: '👩‍💻', name: 'Asesora',    color: '#10b981', side: 'right' },
  client:   { emoji: '🧑‍🤝‍🧑', name: 'Cliente',   color: '#8b5cf6', side: 'right' },
  friend:   { emoji: '🧒', name: 'Amigo',       color: '#ec4899', side: 'left'  },
  narrator: { emoji: '📖', name: 'Narrador',    color: '#94a3b8', side: 'left'  },
}

interface Props {
  characterId: CharacterId
  active: boolean
  position: 'left' | 'right'
}

export default function CharacterSprite({ characterId, active, position }: Props) {
  const cfg = CHARACTER_CONFIG[characterId]

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={characterId}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-2"
          style={{ filter: active ? 'none' : 'grayscale(1) opacity(0.4)' }}
        >
          {/* Cuerpo del personaje — placeholder visual */}
          <div
            className="relative flex items-center justify-center rounded-2xl"
            style={{
              width: 120,
              height: 160,
              background: `linear-gradient(160deg, ${cfg.color}22, ${cfg.color}44)`,
              border: `2px solid ${cfg.color}66`,
              boxShadow: active ? `0 0 24px ${cfg.color}44` : 'none',
            }}
          >
            {/* Halo si es activo */}
            {active && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ background: `radial-gradient(circle, ${cfg.color}33, transparent)` }}
              />
            )}
            <span style={{ fontSize: 64, lineHeight: 1 }}>{cfg.emoji}</span>
          </div>

          {/* Nombre */}
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: `${cfg.color}22`,
              color: cfg.color,
              border: `1px solid ${cfg.color}44`,
            }}
          >
            {cfg.name}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
