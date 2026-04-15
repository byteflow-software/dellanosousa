import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { getPublishedPublicacoes } from '@/lib/db'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Publicações e Mídia',
  description:
    'Artigos publicados, entrevistas e participações em mídia do advogado Dellano Sousa.',
}

export const revalidate = 60

export default async function PublicacoesPage() {
  const publicacoes = await getPublishedPublicacoes()
  const midia = publicacoes.filter((p) => p.tipo === 'MIDIA')
  const academicas = publicacoes.filter((p) => p.tipo === 'PUBLICACAO_ACADEMICA')

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Produção Técnica
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Publicações e Mídia
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Produção intelectual e participações públicas do escritório na área de provas digitais
            e defesa criminal.
          </p>
        </div>

        <div className="space-y-16">
          {midia.length > 0 && (
            <section>
              <AnimatedSection>
                <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                  Mídia e Entrevistas
                </h2>
              </AnimatedSection>
              <div className="space-y-4">
                {midia.map((m, i) => (
                  <AnimatedSection key={m.id} delay={i * 0.07}>
                    {m.url ? (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-4 p-5 rounded-lg bg-white border border-primary/10 hover:border-gold/40 transition-colors group"
                      >
                        <div>
                          <h3 className="font-sans font-medium text-primary text-sm mb-1 group-hover:text-accent transition-colors">
                            {m.title}
                          </h3>
                          <p className="text-muted text-xs">{m.venue}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-gold text-sm font-medium">{m.date}</span>
                          <ExternalLink size={14} className="text-muted" aria-hidden="true" />
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start justify-between gap-4 p-5 rounded-lg bg-white border border-primary/10">
                        <div>
                          <h3 className="font-sans font-medium text-primary text-sm mb-1">{m.title}</h3>
                          <p className="text-muted text-xs">{m.venue}</p>
                        </div>
                        <span className="text-gold text-sm font-medium flex-shrink-0">{m.date}</span>
                      </div>
                    )}
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}

          {academicas.length > 0 && (
            <section>
              <AnimatedSection>
                <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                  Publicações Acadêmicas
                </h2>
              </AnimatedSection>
              <div className="space-y-4">
                {academicas.map((p, i) => (
                  <AnimatedSection key={p.id} delay={i * 0.07}>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-4 p-5 rounded-lg bg-white border border-primary/10 hover:border-gold/40 transition-colors group"
                      >
                        <div>
                          <h3 className="font-sans font-medium text-primary text-sm mb-1 group-hover:text-accent transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-muted text-xs">{p.venue}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-gold text-sm font-medium">{p.date}</span>
                          <ExternalLink size={14} className="text-muted" aria-hidden="true" />
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start justify-between gap-4 p-5 rounded-lg bg-white border border-primary/10">
                        <div>
                          <h3 className="font-sans font-medium text-primary text-sm mb-1">{p.title}</h3>
                          <p className="text-muted text-xs">{p.venue}</p>
                        </div>
                        <span className="text-gold text-sm font-medium flex-shrink-0">{p.date}</span>
                      </div>
                    )}
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}

          {publicacoes.length === 0 && (
            <p className="text-muted text-center py-20">Nenhuma publicação cadastrada ainda.</p>
          )}
        </div>
      </div>
    </div>
  )
}
