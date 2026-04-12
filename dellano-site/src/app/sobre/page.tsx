import type { Metadata } from 'next'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Sobre Dellano Sousa',
  description:
    'Advogado criminalista OAB/CE 53.322 | OAB/PI 25.100. Coordenador Nacional das Prerrogativas Digitais da ABRACRIM. Especializado em provas digitais, investigação defensiva e grandes operações. Autor no ConJur e Migalhas.',
}

const credentials = [
  'OAB/CE 53.322 | OAB/PI 25.100',
  'Membro da ABRACRIM',
  'Coordenador Nacional das Prerrogativas Digitais — ABRACRIM',
  'Vice-Presidente da Comissão de Direito Digital — ABRACRIM',
  'Presidente da Comissão de Investigação Defensiva — ABRACRIM',
  'Autor — ConJur e Migalhas',
  'Atuação especializada em Computação Forense',
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
                Advogado Criminal — OAB/CE 53.322 | OAB/PI 25.100 · Atuação especializada em provas digitais, investigação defensiva e grandes operações
              </p>

              <div className="space-y-4 text-muted text-base leading-relaxed mb-8">
                <p>
                  Dellano Sousa é advogado criminalista, com atuação nacional e dedicação ao estudo de provas digitais e da investigação defensiva. Atua em casos de alta complexidade que envolvem evidências tecnológicas, interceptações, extrações forenses e análise de dados digitais.
                </p>
                <p>
                  Coordenador Nacional das Prerrogativas Digitais da ABRACRIM, Vice-Presidente da Comissão de Direito Digital da ABRACRIM, Presidente da Comissão de Investigação Defensiva — ABRACRIM e membro da ABRACRIM, Dellano une o rigor do processo penal brasileiro ao conhecimento técnico em computação forense. Essa combinação permite a construção de teses defensivas sólidas, a identificação de fragilidades probatórias que poderiam passar despercebidas e a elaboração de pareceres técnicos de relevância nos tribunais.
                </p>
                <p>
                  Autor de artigos jurídicos publicados no ConJur e no Migalhas, Dellano também se destaca pela produção de conteúdo técnico voltado à advocacia criminal, com enfoque em cadeia de custódia, admissibilidade da prova digital, contraditório técnico e garantias processuais.
                </p>
                <p>
                  Com escritório-sede em Fortaleza e atuação em todo o Brasil, o escritório atende casos em todo o território nacional, com atendimento reservado para situações urgentes.
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
