type CustodyStep = {
  step: string
  title: string
  article: string
  description: string
}

type Props = {
  steps: readonly CustodyStep[]
}

export function CustodyFlowchart({ steps }: Props) {
  return (
    <div className="relative">
      {steps.map((s, i) => (
        <div key={s.step} className="flex gap-5 group">
          {/* Connector column */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className="w-10 h-10 rounded-full bg-gold flex items-center justify-center z-10 flex-shrink-0"
              aria-hidden="true"
            >
              <span className="font-sans font-bold text-primary text-sm">{s.step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-gold/30 my-1 min-h-[1.5rem]" aria-hidden="true" />
            )}
          </div>

          {/* Card */}
          <div className={`flex-1 bg-white rounded-xl border border-primary/10 shadow-sm p-5 ${i < steps.length - 1 ? 'mb-3' : ''}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="font-serif font-semibold text-primary text-lg leading-snug">
                {s.title}
              </h3>
              <span className="text-xs font-sans text-gold font-medium">{s.article}</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
