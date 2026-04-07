import type { Metadata } from 'next'
import { services } from '@/data/services'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Áreas de Atuação',
  description:
    'Conheça os núcleos de atuação do escritório Dellano Sousa: defesa criminal, provas digitais, investigação defensiva e muito mais.',
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
            O escritório atua em frentes específicas do direito penal e da prova digital, com
            profundidade técnica e estratégia jurídica para cada tipo de caso.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, i) => (
            <div key={service.id} id={service.slug}>
            <AnimatedSection delay={i * 0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8 rounded-2xl bg-white border border-primary/10 shadow-sm">
                <div>
                  <h2 className="font-serif font-semibold text-primary text-xl md:text-2xl mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-primary text-sm leading-relaxed">{service.longDescription}</p>
                  <div className="pt-2">
                    <Button href="/contato" variant="outline" size="sm">
                      Solicitar informações
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
