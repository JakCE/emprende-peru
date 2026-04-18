import { useCallback } from 'react'

type SoundType = 'correct' | 'wrong' | 'complete' | 'click' | 'transition' | 'coin'

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  volume = 0.25,
  type: OscillatorType = 'sine',
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.start(start)
  osc.stop(start + duration)
}

function playCorrect() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 523, t, 0.12, 0.2)       // C5
  tone(ctx, 659, t + 0.1, 0.12, 0.2) // E5
  tone(ctx, 784, t + 0.2, 0.2, 0.2)  // G5
}

function playWrong() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 330, t, 0.15, 0.25, 'sawtooth')
  tone(ctx, 220, t + 0.15, 0.2, 0.2, 'sawtooth')
}

function playComplete() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 523, t, 0.1, 0.25)
  tone(ctx, 659, t + 0.1, 0.1, 0.25)
  tone(ctx, 784, t + 0.2, 0.1, 0.25)
  tone(ctx, 1047, t + 0.3, 0.35, 0.3)
}

function playCoin() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 988, t, 0.06, 0.2)
  tone(ctx, 1319, t + 0.06, 0.12, 0.2)
}

function playClick() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 800, t, 0.05, 0.1, 'square')
}

function playTransition() {
  const ctx = new AudioContext()
  const t = ctx.currentTime
  tone(ctx, 440, t, 0.08, 0.15)
  tone(ctx, 554, t + 0.08, 0.08, 0.15)
  tone(ctx, 659, t + 0.16, 0.12, 0.15)
}

const SOUNDS: Record<SoundType, () => void> = {
  correct: playCorrect,
  wrong: playWrong,
  complete: playComplete,
  coin: playCoin,
  click: playClick,
  transition: playTransition,
}

export function useSound() {
  const play = useCallback((type: SoundType) => {
    try { SOUNDS[type]() } catch { /* AudioContext bloqueado hasta interacción */ }
  }, [])
  return { play }
}
