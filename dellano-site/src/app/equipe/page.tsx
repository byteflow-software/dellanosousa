import type { Metadata } from 'next'
import Image from 'next/image'
import { team } from '@/data/team'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Equipe',
  description:
    'Conheça a equipe do escritório Dellano Sousa Advocacia — profissionais especializados em defesa criminal e provas digitais.',
}

export default function EquipePage() {
  const principal = team.find((m) => m.hierarchy === 'principal')
  const apoio = team.filter((m) => m.hierarchy === 'apoio')

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Profissionais
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight">
            Nossa Equipe
          </h1>
        </div>

        {principal && (
          <AnimatedSection className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 rounded-2xl bg-white border border-primary/10 shadow-sm">
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-primary">
                <Image
                  src={principal.photo}
                  alt={principal.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-3">
                  Sócio Fundador
                </p>
                <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-2">
                  {principal.name}
                </h2>
                <p className="font-sans font-medium text-accent text-sm mb-1">{principal.role}</p>
                {principal.oab && (
                  <p className="font-sans text-xs text-muted mb-6">{principal.oab}</p>
                )}
                <p className="text-muted text-sm leading-relaxed mb-6">{principal.bio}</p>
                {principal.expertise && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {principal.expertise.map((e) => (
                      <Badge key={e} variant="default">{e}</Badge>
                    ))}
                  </div>
                )}
                {principal.linkedin && (
                  <a
                    href={principal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-sans font-medium text-accent hover:text-primary transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}

        {apoio.length > 0 && (
          <>
            <h2 className="font-serif font-semibold text-primary text-xl md:text-2xl mb-8">
              Equipe de Apoio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apoio.map((member, i) => (
                <AnimatedSection key={member.id} delay={i * 0.1}>
                  <div className="flex flex-col bg-white border border-primary/10 rounded-lg p-6 shadow-sm">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary mb-4">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    </div>
                    <h3 className="font-serif font-semibold text-primary text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs font-medium text-accent mb-1">{member.role}</p>
                    {member.oab && (
                      <p className="font-sans text-xs text-muted mb-3">{member.oab}</p>
                    )}
                    <p className="text-muted text-sm leading-relaxed mb-3">{member.bio}</p>
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {member.expertise.map((e) => (
                          <Badge key={e} variant="default">{e}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        <AnimatedSection className="mt-16 text-center">
          <Button href="/contato" variant="primary" size="lg">
            Falar com o escritório
          </Button>
        </AnimatedSection>
      </div>
    </div>
  )
}
