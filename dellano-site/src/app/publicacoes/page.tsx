import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Publicações, Mídia e Palestras',
  description:
    'Palestras, entrevistas, artigos publicados e participações em mídia do advogado Dellano Sousa.',
}

const palestras = [
  {
    title: 'Provas Digitais e Cadeia de Custódia no Processo Penal',
    event: 'OAB/CE — Ciclo de Palestras em Direito Penal',
    date: '2025',
  },
  {
    title: 'Investigação Defensiva na Era Digital',
    event: 'ABRACRIM Nacional — Mesa-redonda',
    date: '2025',
  },
  {
    title: 'Computação Forense para Advogados',
    event: 'ESA/CE — Curso de Extensão (instrutor)',
    date: '2024',
  },
  {
    title: 'Cibercrimes e Defesa Criminal',
    event: 'OAB/PI — Semana Jurídica',
    date: '2024',
  },
]

const midia = [
  {
    title: 'Especialista explica como provas digitais podem ser contestadas na Justiça',
    vehicle: 'O Povo',
    date: '2025',
    url: '#',
  },
  {
    title: 'Investigação defensiva: o advogado como investigador',
    vehicle: 'Conjur',
    date: '2025',
    url: '#',
  },
  {
    title: 'A importância da cadeia de custódia digital no processo penal moderno',
    vehicle: 'JOTA',
    date: '2024',
    url: '#',
  },
]

const publicacoes = [
  {
    title: 'A Cadeia de Custódia das Provas Digitais no CPP pós-Pacote Anticrime',
    venue: 'Revista Brasileira de Ciências Criminais',
    date: '2024',
    url: '#',
  },
  {
    title: 'Investigação Defensiva Digital: perspectivas após a Resolução OAB 564/2023',
    venue: 'Boletim IBCCRIM',
    date: '2025',
    url: '#',
  },
]

export default function PublicacoesPage() {
  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Produção Técnica
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Publicações, Mídia e Palestras
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Produção intelectual e participações públicas do escritório na área de provas digitais
            e defesa criminal.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                Palestras e Eventos
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {palestras.map((p, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
                  <div className="flex items-start justify-between gap-4 p-5 rounded-lg bg-white border border-primary/10">
                    <div>
                      <h3 className="font-sans font-medium text-primary text-sm mb-1">{p.title}</h3>
                      <p className="text-muted text-xs">{p.event}</p>
                    </div>
                    <span className="text-gold text-sm font-medium flex-shrink-0">{p.date}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <section>
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                Mídia e Entrevistas
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {midia.map((m, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
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
                      <p className="text-muted text-xs">{m.vehicle}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-gold text-sm font-medium">{m.date}</span>
                      <ExternalLink size={14} className="text-muted" aria-hidden="true" />
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <section>
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                Publicações Externas
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {publicacoes.map((p, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
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
                </AnimatedSection>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
