import type { Metadata } from 'next'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Sobre Dellano Sousa',
  description:
    'Conheça Dellano Sousa, advogado criminalista especializado em provas digitais e investigação defensiva, com atuação nacional.',
}

const credentials = [
  'Membro da ABRACRIM',
  'Presidente — Comissão de Investigação Defensiva OAB/CE',
  'Especialista em Computação Forense',
  'Atuação Nacional',
  'Membro do IAB',
]

const lectures = [
  'Palestra — Provas Digitais e Cadeia de Custódia — OAB/CE, 2024',
  'Mesa-redonda — Investigação Defensiva na Era Digital — ABRACRIM Nacional, 2023',
  'Curso de extensão — Computação Forense para Advogados — ESA/CE, 2023',
  'Palestra — Cibercrimes e Defesa Criminal — OAB/PI, 2022',
]

export default function SobrePage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection direction="left">
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-primary/10 shadow-xl bg-gradient-to-br from-secondary to-primary sticky top-28">
                <Image
                  src="/images/dellano/dellano-sobre.jpeg"
                  alt="Dellano Sousa — Advogado Criminal e Especialista em Provas Digitais"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
                Perfil Profissional
              </p>
              <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-6">
                Dellano Sousa
              </h1>
              <p className="font-sans font-medium text-accent text-base mb-8">
                Advogado Criminal · Especialista em Provas Digitais · Investigação Defensiva
              </p>

              <div className="space-y-4 text-muted text-base leading-relaxed mb-8">
                <p>
                  Dellano Sousa é advogado criminalista com mais de uma década de atuação na defesa
                  penal. Reconhecido nacionalmente pela especialização em provas digitais e
                  investigação defensiva, atua em casos de alta complexidade que envolvem evidências
                  tecnológicas, interceptações, extrações forenses e análise de dados digitais.
                </p>
                <p>
                  Presidente da Comissão de Investigação Defensiva da OAB/CE e membro da ABRACRIM,
                  Dellano combina o rigor jurídico do processo penal brasileiro com profundo
                  conhecimento técnico em computação forense. Essa combinação rara permite construir
                  defesas sólidas, identificar irregularidades probatórias que passariam despercebidas
                  e produzir pareceres técnicos de alto impacto nos tribunais.
                </p>
                <p>
                  Com escritório-sede em Fortaleza e atuação em Teresina, Brasília e Ribeirão Preto,
                  o escritório atende casos em todo o território nacional, com plantão 24 horas para
                  situações de urgência.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {credentials.map((c) => (
                  <Badge key={c} variant="default">{c}</Badge>
                ))}
              </div>

              <Button href="/contato" variant="primary">
                Agendar consulta
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-12">
              Palestras e Participações
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {lectures.map((lecture, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="p-4 rounded-lg border border-primary/10 bg-white">
                  <p className="text-primary text-sm leading-relaxed">{lecture}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-semibold text-white text-2xl md:text-3xl mb-6">
            Precisa de uma defesa técnica e estratégica?
          </h2>
          <Button href="/contato" variant="gold" size="lg">
            Entre em contato
          </Button>
        </div>
      </section>
    </div>
  )
}
