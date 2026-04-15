import type { Metadata } from 'next'
import { getPublishedImprensa } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Imprensa',
  description:
    'Menções, entrevistas e participações em veículos de imprensa e instituições sobre direito penal, provas digitais e investigação defensiva.',
}

export const revalidate = 60

export default async function ImprensaPage() {
  const pressItems = await getPublishedImprensa()

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Presença Institucional
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Imprensa
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Participações, entrevistas e menções em veículos jornalísticos e institucionais.
          </p>
        </div>

        {pressItems.length > 0 ? (
          <div className="space-y-4">
            {pressItems.map((item) => {
              const card = (
                <div className="p-6 rounded-xl bg-white border border-primary/10 hover:border-gold/40 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="accent">{item.outlet}</Badge>
                    <time className="text-xs text-muted font-sans">{formatDate(item.date)}</time>
                  </div>
                  <h2 className="font-serif font-semibold text-primary text-lg md:text-xl leading-snug mb-2">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              )
              return item.url ? (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={item.id}>{card}</div>
              )
            })}
          </div>
        ) : (
          <p className="text-muted text-center py-20">Nenhuma menção publicada ainda.</p>
        )}
      </div>
    </div>
  )
}
