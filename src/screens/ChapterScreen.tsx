import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { chapters } from '../data/chapters'
import CharacterSprite, { CHARACTER_CONFIG } from '../components/story/CharacterSprite'
import DialogBox from '../components/story/DialogBox'
import MediaControls from '../components/story/MediaControls'
import GlobalProgress from '../components/hud/GlobalProgress'
import type { CharacterId } from '../types/game'

export default function ChapterScreen() {
  const { currentChapterId, startMinigame, startChapter, goTo } = useGameStore()
  const chapter = currentChapterId ? chapters[currentChapterId] : null
  const [index, setIndex] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Capítulo no encontrado.
      </div>
    )
  }

  const line = chapter.dialogs[index]
  const isLast = index === chapter.dialogs.length - 1
  const cfg = CHARACTER_CONFIG[line.character]

  // Personajes a mostrar: activo + el del lado opuesto si existe en el capítulo
  const activeChar = line.character
  const activeSide = cfg.side

  // Detecta el último personaje del lado opuesto que apareció antes
  const oppositeChar = chapter.dialogs
    .slice(0, index + 1)
    .reverse()
    .find((d) => CHARACTER_CONFIG[d.character].side !== activeSide)?.character as CharacterId | undefined

  const handleNext = () => {
    if (isLast) {
      if (chapter.nextChapterId) startChapter(chapter.nextChapterId)
      else startMinigame(chapter.minigameId)
    } else {
      setIndex((i) => i + 1)
    }
  }

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1))

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0a1e 0%, #1a1060 60%, #0a1f3e 100%)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow del personaje activo */}
      <motion.div
        key={activeChar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${activeSide === 'left' ? '25%' : '75%'} 60%, ${cfg.color}18, transparent)`,
        }}
      />

      {/* Header: título del capítulo + botón salir */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2 z-10">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest">Capítulo</p>
          <h2 className="text-white font-bold text-lg">{chapter.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceEnabled((v) => !v)}
            className="text-slate-400 hover:text-slate-200 text-lg transition-colors cursor-pointer"
            title={voiceEnabled ? 'Silenciar' : 'Activar voz'}
          >
            {voiceEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={() => goTo('home')}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer"
          >
            ✕ Salir
          </button>
        </div>
      </div>

      {/* Escena: personajes */}
      <div className="flex-1 flex items-end justify-between px-8 pb-4 z-10">
        {/* Lado izquierdo */}
        <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
          {activeSide === 'left' ? (
            <CharacterSprite characterId={activeChar} active={true} position="left" />
          ) : oppositeChar && CHARACTER_CONFIG[oppositeChar].side === 'left' ? (
            <CharacterSprite characterId={oppositeChar} active={false} position="left" />
          ) : (
            <div style={{ width: 120, height: 192 }} />
          )}
        </div>

        {/* Centro: dinero acumulado */}
        <MoneyBadge />

        {/* Lado derecho */}
        <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
          {activeSide === 'right' ? (
            <CharacterSprite characterId={activeChar} active={true} position="right" />
          ) : oppositeChar && CHARACTER_CONFIG[oppositeChar].side === 'right' ? (
            <CharacterSprite characterId={oppositeChar} active={false} position="right" />
          ) : (
            <div style={{ width: 120, height: 192 }} />
          )}
        </div>
      </div>

      {/* Progreso global */}
      <GlobalProgress />

      {/* Panel inferior: diálogo + controles */}
      <div
        className="z-10 px-4 pb-6 pt-2 flex flex-col gap-4"
        style={{
          background: 'linear-gradient(0deg, rgba(10,5,30,0.95) 80%, transparent)',
        }}
      >
        <DialogBox line={line} onNext={handleNext} isLast={isLast} voiceEnabled={voiceEnabled} />

        <div className="flex items-center justify-center">
          <MediaControls
            onPrev={handlePrev}
            onNext={handleNext}
            canPrev={index > 0}
            canNext={true}
            current={index}
            total={chapter.dialogs.length}
          />
        </div>
      </div>
    </div>
  )
}

function MoneyBadge() {
  const money = useGameStore((s) => s.money)
  return (
    <motion.div
      key={money}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
      style={{
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid rgba(245,158,11,0.3)',
        color: '#f59e0b',
      }}
    >
      💰 S/ {money.toLocaleString()}
    </motion.div>
  )
}
