import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { minigames } from '../data/minigames'
import MultipleChoice from '../components/minigames/MultipleChoice/MultipleChoice'
import TrueFalse from '../components/minigames/TrueFalse/TrueFalse'
import DragDrop from '../components/minigames/DragDrop/DragDrop'
import InteractiveTable from '../components/minigames/InteractiveTable/InteractiveTable'
import MatchColumns from '../components/minigames/MatchColumns/MatchColumns'
import Sequence from '../components/minigames/Sequence/Sequence'
import GlobalProgress from '../components/hud/GlobalProgress'
import type {
  MultipleChoiceQuestion, TrueFalseQuestion,
  DragDropActivity, InteractiveTableActivity,
  MatchColumnsActivity, SequenceActivity,
} from '../types/game'

type Phase = 'intro' | 'playing' | 'sublevel-result'

const NEXT_CHAPTER: Record<string, string> = {
  'idea-negocio': 'cap2',
  'ruc': 'cap3',
  'inventario': 'cap4',
  'ingresos-gastos': 'cap5',
  'comprobantes': 'cap6',
  'tributos': 'cap7',
  'crecimiento': 'final',
}

const ACTIVITY_LABEL: Record<string, string> = {
  'multiple-choice': '🎯 Preguntas de opción múltiple',
  'true-false': '✅ Verdadero o Falso',
  'drag-drop': '🖱️ Arrastra y clasifica',
  'interactive-table': '📊 Completa la tabla',
  'match-columns': '🔗 Relaciona columnas',
  'sequence': '🔢 Ordena los pasos',
}

export default function MinigameScreen() {
  const {
    currentMinigameId, currentSublevelIndex,
    nextSublevel, completeSublevel, completeMinigame,
    startChapter, goTo, money, score,
  } = useGameStore()

  const minigame = currentMinigameId ? minigames[currentMinigameId] : null
  const [phase, setPhase] = useState<Phase>('intro')
  const [mcIndex, setMcIndex] = useState(0)
  const [sublevelCorrect, setSublevelCorrect] = useState(0)
  const [sublevelTotal, setSublevelTotal] = useState(0)

  if (!minigame) return <div className="text-white p-8">Minijuego no encontrado.</div>

  const sublevel = minigame.sublevels[currentSublevelIndex]
  const isLastSublevel = currentSublevelIndex === minigame.sublevels.length - 1
  const activity = sublevel?.activity

  const finishSublevel = (correct: number, total: number) => {
    setSublevelCorrect(correct)
    setSublevelTotal(total)
    completeSublevel(correct === total)
    setPhase('sublevel-result')
    setMcIndex(0)
  }

  const handleMCNext = (wasCorrect: boolean) => {
    if (activity?.type !== 'multiple-choice') return
    const questions = activity.data as MultipleChoiceQuestion[]
    const newCorrect = sublevelCorrect + (wasCorrect ? 1 : 0)
    if (mcIndex + 1 >= questions.length) {
      finishSublevel(newCorrect, questions.length)
    } else {
      setSublevelCorrect(newCorrect)
      setMcIndex((i) => i + 1)
    }
  }

  const handleNextSublevel = () => {
    if (isLastSublevel) {
      completeMinigame(minigame.id)
      const next = NEXT_CHAPTER[minigame.id]
      if (next === 'final') goTo('final')
      else startChapter(next)
    } else {
      nextSublevel()
      setSublevelCorrect(0)
      setSublevelTotal(0)
      setMcIndex(0)
      setPhase('intro')
    }
  }

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0a1e 0%, #0f172a 50%, #0a1f3e 100%)' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 z-10 shrink-0">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest">Minijuego</p>
          <h2 className="text-white font-bold text-lg">{minigame.title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-yellow-400 font-bold text-sm">💰 S/ {money.toLocaleString()}</div>
          <button onClick={() => goTo('home')} className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">✕</button>
        </div>
      </div>

      {/* Progreso global */}
      <GlobalProgress />

      {/* Progreso de sublevels */}
      <div className="flex gap-2 px-6 pb-3 z-10 shrink-0">
        {minigame.sublevels.map((sl, i) => (
          <div key={sl.id} className="flex-1 flex flex-col gap-1 items-center">
            <div className="h-1.5 w-full rounded-full transition-all duration-500"
              style={{ background: i < currentSublevelIndex ? '#10b981' : i === currentSublevelIndex ? '#6366f1' : 'rgba(255,255,255,0.1)' }}
            />
            <span className="text-slate-500 text-xs truncate w-full text-center hidden sm:block">{sl.title}</span>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col px-4 pb-6 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── Intro del sublevel ── */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center flex-1 gap-6 py-8 text-center"
            >
              <div className="text-6xl">🎯</div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">
                  Nivel {currentSublevelIndex + 1} de {minigame.sublevels.length}
                </p>
                <h3 className="text-white text-2xl font-bold">{sublevel.title}</h3>
                {activity && (
                  <p className="text-slate-400 text-sm mt-3">
                    {ACTIVITY_LABEL[activity.type]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                🏆 Bono al completar: S/ {sublevel.rewardBonus}
              </div>
              <button
                onClick={() => { setSublevelCorrect(0); setPhase('playing') }}
                className="px-10 py-4 rounded-2xl font-bold text-white text-lg cursor-pointer transition-all hover:brightness-110 active:scale-95"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #6366f1)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
              >
                ¡Comenzar! 🚀
              </button>
            </motion.div>
          )}

          {/* ── Jugando ── */}
          {phase === 'playing' && activity && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4 py-2"
            >
              {activity.type === 'multiple-choice' && (
                <MultipleChoice
                  question={(activity.data as MultipleChoiceQuestion[])[mcIndex]}
                  onNext={handleMCNext}
                />
              )}
              {activity.type === 'true-false' && (
                <TrueFalse
                  questions={activity.data as TrueFalseQuestion[]}
                  onComplete={finishSublevel}
                />
              )}
              {activity.type === 'drag-drop' && (
                <DragDrop
                  activity={activity.data as DragDropActivity}
                  onComplete={finishSublevel}
                />
              )}
              {activity.type === 'interactive-table' && (
                <InteractiveTable
                  activity={activity.data as InteractiveTableActivity}
                  onComplete={finishSublevel}
                />
              )}
              {activity.type === 'match-columns' && (
                <MatchColumns
                  activity={activity.data as MatchColumnsActivity}
                  onComplete={finishSublevel}
                />
              )}
              {activity.type === 'sequence' && (
                <Sequence
                  activity={activity.data as SequenceActivity}
                  onComplete={finishSublevel}
                />
              )}
            </motion.div>
          )}

          {/* ── Resultado del sublevel ── */}
          {phase === 'sublevel-result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-1 gap-6 py-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-7xl"
              >
                {sublevelTotal === 0 || sublevelCorrect === sublevelTotal ? '🏆' : sublevelCorrect >= sublevelTotal / 2 ? '👍' : '💪'}
              </motion.div>
              <div>
                <h3 className="text-white text-2xl font-bold">
                  {sublevelTotal === 0 || sublevelCorrect === sublevelTotal ? '¡Perfecto!' : sublevelCorrect >= sublevelTotal / 2 ? '¡Bien hecho!' : '¡Sigue adelante!'}
                </h3>
                {sublevelTotal > 0 && (
                  <p className="text-slate-400 mt-2">{sublevelCorrect} de {sublevelTotal} correctas</p>
                )}
              </div>
              <div className="rounded-2xl px-8 py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-slate-400 text-xs mb-1">Puntaje total acumulado</p>
                <p className="text-yellow-400 font-black text-3xl">S/ {score.toLocaleString()}</p>
              </div>
              <button
                onClick={handleNextSublevel}
                className="px-10 py-4 rounded-2xl font-bold text-white text-lg cursor-pointer transition-all hover:brightness-110 active:scale-95"
                style={{ background: 'linear-gradient(90deg, #059669, #10b981)', boxShadow: '0 0 24px rgba(16,185,129,0.3)' }}
              >
                {isLastSublevel ? '¡Continuar la historia! 📖' : 'Siguiente nivel →'}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
