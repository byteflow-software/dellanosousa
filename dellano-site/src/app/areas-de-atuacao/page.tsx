import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Áreas de Atuação',
  description:
    'Núcleos de atuação do escritório Dellano Sousa: provas digitais, defesa criminal, investigação defensiva, assistência técnica, cadeia de custódia e casos urgentes.',
}

export default function AreasDeAtuacaoPage() {
  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Núcleos de Atuação
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Áreas de Atuação
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            O escritório atua em frentes específicas do direito penal e da prova digital.
            Cada núcleo possui página dedicada com contexto técnico, base legal e perguntas frequentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.05}>
              <Link
                href={`/areas-de-atuacao/${service.slug}`}
                className="group flex flex-col h-full p-6 bg-white border border-primary/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h2 className="font-serif font-semibold text-primary text-lg md:text-xl mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>
                <span className="text-sm font-sans font-medium text-gold">
                  Ver detalhes →
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
