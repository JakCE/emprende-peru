interface Props {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  current: number
  total: number
}

export default function MediaControls({ onPrev, onNext, canPrev, canNext, current, total }: Props) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:scale-110 active:scale-95"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        title="Anterior"
      >
        ◀
      </button>

      {/* Progreso de diálogos */}
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i <= current ? '#6366f1' : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!canNext}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:scale-110 active:scale-95"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        title="Siguiente"
      >
        ▶
      </button>
    </div>
  )
}
