import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const credentials = [
  'Membro da ABRACRIM',
  'Presidente — Comissão de Investigação Defensiva OAB/CE',
  'Especialista em Computação Forense',
  'Atuação Nacional',
]

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left" className="relative">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-primary/10 shadow-xl bg-gradient-to-br from-secondary to-primary">
              <Image
                src="/images/dellano/dellano-principal.png"
                alt="Dellano Sousa"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gold/10 blur-3xl hidden lg:block" />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
              Quem é Dellano Sousa
            </p>
            <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl leading-tight mb-6">
              Técnica, estratégia e comprometimento na defesa que você merece
            </h2>
            <p className="text-muted text-base leading-relaxed mb-4">
              Dellano Sousa é advogado criminalista com atuação nacional, reconhecido pela
              capacidade técnica na análise e contestação de provas digitais em processos penais.
              Presidente da Comissão de Investigação Defensiva da OAB/CE e membro da ABRACRIM.
            </p>
            <p className="text-muted text-base leading-relaxed mb-8">
              Combina o rigor jurídico do processo penal com o conhecimento técnico em computação
              forense para construir defesas sólidas, identificar irregularidades probatórias e
              proteger os direitos fundamentais dos clientes.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((c) => (
                <Badge key={c} variant="default">
                  {c}
                </Badge>
              ))}
            </div>

            <Button href="/sobre" variant="outline">
              Ver perfil completo
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
