import { useCallback, useEffect, useRef } from 'react'

export function useVoice() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'es-PE'
    utter.rate = 0.92
    utter.pitch = 1.05
    utter.volume = 1

    // Preferir voz en español si está disponible
    const voices = window.speechSynthesis.getVoices()
    const spanish = voices.find((v) => v.lang.startsWith('es')) ?? null
    if (spanish) utter.voice = spanish

    utteranceRef.current = utter
    window.speechSynthesis.speak(utter)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
  }, [])

  // Limpiar al desmontar
  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  return { speak, stop }
}
