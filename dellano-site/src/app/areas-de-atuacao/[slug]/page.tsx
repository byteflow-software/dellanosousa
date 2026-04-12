import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { services } from '@/data/services'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { JsonLd } from '@/components/layout/JsonLd'

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.metaDescription ?? service.description,
    openGraph: {
      title: `${service.title} — Dellano Sousa Advocacia`,
      description: service.metaDescription ?? service.description,
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== slug)

  const faqJsonLd = service.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `${service.title} — Dellano Sousa Advocacia`,
    description: service.metaDescription ?? service.description,
    provider: {
      '@type': 'Attorney',
      name: 'Dellano Sousa',
      address: { '@type': 'PostalAddress', addressLocality: 'Fortaleza', addressRegion: 'CE', addressCountry: 'BR' },
    },
    areaServed: 'BR',
  }

  return (
    <div className="bg-background">
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/areas-de-atuacao"
            className="text-white/60 text-sm font-sans hover:text-gold transition-colors mb-6 inline-block"
          >
            ← Todas as áreas de atuação
          </Link>
          <Badge variant="light" className="mb-4">Núcleo de Atuação</Badge>
          <h1 className="font-serif font-semibold text-white text-3xl md:text-5xl leading-tight mb-4">
            {service.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
            {service.longDescription}
          </p>
        </div>
      </section>

      {service.expandedContent && service.expandedContent.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-6">
                Contexto e abordagem
              </h2>
              <div className="space-y-4 text-muted text-base leading-relaxed">
                {service.expandedContent.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {service.legalBasis && service.legalBasis.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                Base legal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.legalBasis.map((lb) => (
                  <div
                    key={lb.title}
                    className="p-5 rounded-lg border border-primary/10 bg-white"
                  >
                    <p className="font-sans font-semibold text-primary text-sm mb-3">{lb.title}</p>
                    <ul className="space-y-1.5">
                      {lb.articles.map((a) => (
                        <li key={a} className="text-muted text-xs leading-relaxed flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {service.faq && service.faq.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-8">
                Perguntas frequentes
              </h2>
              <div className="space-y-4">
                {service.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group p-5 rounded-lg border border-primary/10 bg-background"
                  >
                    <summary className="font-sans font-semibold text-primary text-sm cursor-pointer list-none flex items-start justify-between gap-4">
                      <span>{f.question}</span>
                      <span className="text-gold text-lg leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                    </summary>
                    <p className="text-muted text-sm leading-relaxed mt-3">{f.answer}</p>
                  </details>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-semibold text-white text-2xl md:text-3xl mb-4">
            Precisa de análise técnica neste tipo de caso?
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Envie os elementos do seu caso e receba uma avaliação técnico-jurídica estruturada.
          </p>
          <Button href="/contato" variant="gold" size="lg">
            Entrar em contato
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-semibold text-primary text-xl md:text-2xl mb-6">
            Outras áreas de atuação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((s) => (
              <Link
                key={s.id}
                href={`/areas-de-atuacao/${s.slug}`}
                className="group p-5 rounded-lg border border-primary/10 bg-white hover:border-gold/40 hover:-translate-y-0.5 transition-all"
              >
                <p className="font-serif font-semibold text-primary text-sm mb-2 group-hover:text-accent transition-colors">
                  {s.title}
                </p>
                <p className="text-muted text-xs leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
