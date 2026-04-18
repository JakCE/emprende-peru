import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameProgress, Screen, MinigameProgress } from '../types/game'
import { REWARD_CORRECT, REWARD_SUBLEVEL_BONUS, REWARD_PERFECT_BONUS } from '../types/game'

interface GameStore extends GameProgress {
  goTo: (screen: Screen) => void
  startChapter: (chapterId: string) => void
  startMinigame: (minigameId: string) => void
  nextSublevel: () => void
  awardCorrect: () => void
  completeSublevel: (perfect: boolean) => void
  completeMinigame: (minigameId: string) => void
  resetGame: () => void
}

const initialProgress: GameProgress = {
  currentScreen: 'home',
  currentChapterId: null,
  currentMinigameId: null,
  currentSublevelIndex: 0,
  money: 0,
  score: 0,
  minigames: {},
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialProgress,

      goTo: (screen) => set({ currentScreen: screen }),

      startChapter: (chapterId) =>
        set({ currentChapterId: chapterId, currentScreen: 'chapter', currentSublevelIndex: 0 }),

      startMinigame: (minigameId) =>
        set({
          currentMinigameId: minigameId,
          currentSublevelIndex: 0,
          currentScreen: 'minigame',
        }),

      nextSublevel: () =>
        set((s) => ({ currentSublevelIndex: s.currentSublevelIndex + 1 })),

      awardCorrect: () =>
        set((s) => ({
          money: s.money + REWARD_CORRECT,
          score: s.score + REWARD_CORRECT,
        })),

      completeSublevel: (perfect) => {
        const bonus = perfect
          ? REWARD_SUBLEVEL_BONUS + REWARD_PERFECT_BONUS
          : REWARD_SUBLEVEL_BONUS
        set((s) => ({ money: s.money + bonus, score: s.score + bonus }))
      },

      completeMinigame: (minigameId) => {
        const existing: MinigameProgress = get().minigames[minigameId] ?? {
          minigameId,
          sublevels: [],
          completed: false,
        }
        set((s) => ({
          minigames: {
            ...s.minigames,
            [minigameId]: { ...existing, completed: true },
          },
        }))
      },

      resetGame: () => set({ ...initialProgress }),
    }),
    { name: 'emprende-peru-save' }
  )
)
