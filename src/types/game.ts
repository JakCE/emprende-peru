export type Screen =
  | 'home'
  | 'story-intro'
  | 'intro'
  | 'chapter'
  | 'minigame'
  | 'result'
  | 'final'

export type MinigameType =
  | 'multiple-choice'
  | 'true-false'
  | 'drag-drop'
  | 'interactive-table'
  | 'match-columns'
  | 'sequence'

// --- Story / Dialog ---

export interface DialogLine {
  character: CharacterId
  text: string
  audioFile?: string
}

export type CharacterId =
  | 'main'
  | 'mentor'
  | 'advisor'
  | 'client'
  | 'friend'
  | 'narrator'

// --- Minigame activities ---

export interface MultipleChoiceQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface TrueFalseQuestion {
  id: string
  statement: string
  isTrue: boolean
  explanation: string
}

export interface DragDropItem {
  id: string
  label: string
  correctCategory: string
}

export interface DragDropActivity {
  id: string
  instruction: string
  categories: string[]
  items: DragDropItem[]
}

export interface TableRow {
  id: string
  cells: (string | number | null)[]
  answerIndex: number
  answer: number | string
}

export interface InteractiveTableActivity {
  id: string
  instruction: string
  headers: string[]
  rows: TableRow[]
}

export interface MatchItem {
  id: string
  left: string
  right: string
}

export interface MatchColumnsActivity {
  id: string
  instruction: string
  pairs: MatchItem[]
}

export interface SequenceActivity {
  id: string
  instruction: string
  steps: { id: string; label: string }[]
}

export type MinigameActivity =
  | { type: 'multiple-choice'; data: MultipleChoiceQuestion[] }
  | { type: 'true-false'; data: TrueFalseQuestion[] }
  | { type: 'drag-drop'; data: DragDropActivity }
  | { type: 'interactive-table'; data: InteractiveTableActivity }
  | { type: 'match-columns'; data: MatchColumnsActivity }
  | { type: 'sequence'; data: SequenceActivity }

// --- Sublevel / Minigame / Chapter ---

export interface Sublevel {
  id: string
  title: string
  activity: MinigameActivity
  rewardBonus: number
}

export interface Minigame {
  id: string
  title: string
  chapterId: string
  sublevels: Sublevel[]
}

export interface Chapter {
  id: string
  title: string
  order: number
  dialogs: DialogLine[]
  minigameId: string
  nextChapterId?: string  // si existe, va al capítulo siguiente en vez de al minijuego
  learnings: string[]
}

// --- Progress / Score ---

export interface SubLevelProgress {
  sublevelId: string
  completed: boolean
  perfect: boolean
}

export interface MinigameProgress {
  minigameId: string
  sublevels: SubLevelProgress[]
  completed: boolean
}

export interface GameProgress {
  currentScreen: Screen
  currentChapterId: string | null
  currentMinigameId: string | null
  currentSublevelIndex: number
  money: number
  score: number
  minigames: Record<string, MinigameProgress>
}

export const REWARD_CORRECT = 100
export const REWARD_SUBLEVEL_BONUS = 200
export const REWARD_PERFECT_BONUS = 500
