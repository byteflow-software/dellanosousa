import type { Metadata } from 'next'
import { eventItems, eventTypeLabels } from '@/data/eventos'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Eventos e Palestras',
  description:
    'Palestras, cursos e participações acadêmicas de Dellano Sousa em temas de direito penal, provas digitais e investigação defensiva.',
}

export default function EventosPage() {
  const sorted = [...eventItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Atuação Acadêmica
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Eventos e Palestras
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Participações acadêmicas e institucionais em eventos sobre direito penal, provas digitais e investigação defensiva.
          </p>
        </div>

        {sorted.length > 0 ? (
          <div className="space-y-4">
            {sorted.map((ev, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-primary/10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="accent">{eventTypeLabels[ev.type]}</Badge>
                  <span className="text-xs text-muted font-sans">{ev.organizer}</span>
                  <span className="text-xs text-muted/60">·</span>
                  <time className="text-xs text-muted font-sans">{formatDate(ev.date)}</time>
                </div>
                <h2 className="font-serif font-semibold text-primary text-lg md:text-xl leading-snug mb-2">
                  {ev.title}
                </h2>
                <p className="text-xs text-muted font-sans mb-3">
                  {ev.location}
                  {ev.role ? ` · ${ev.role}` : ''}
                </p>
                {ev.description && (
                  <p className="text-muted text-sm leading-relaxed">{ev.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-20">Nenhum evento publicado ainda.</p>
        )}
      </div>
    </div>
  )
}
