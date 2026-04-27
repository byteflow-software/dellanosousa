import type { Metadata } from 'next'
import Image from 'next/image'
import { getSobrePage } from '@/lib/db'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { meta, pages } from '@/content'

const { sobre } = pages

export const metadata: Metadata = {
  title: meta.sobre.title,
  description: meta.sobre.description,
}

export const revalidate = 60

export default async function SobrePage() {
  const sobreData = await getSobrePage()

  const bioText = sobreData?.bioText ?? sobre.fallbackBio
  const credentials = sobreData?.credentials ?? sobre.fallbackCredentials
  const lectures = sobreData?.lectures ?? sobre.fallbackLectures

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection direction="left">
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-primary/10 shadow-xl bg-gradient-to-br from-secondary to-primary sticky top-28">
                <Image
                  src={sobre.image.src}
                  alt={sobre.image.alt}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
                {sobre.eyebrow}
              </p>
              <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-6">
                {sobre.title}
              </h1>
              <p className="font-sans font-medium text-accent text-base mb-8">
                {sobre.subtitle}
              </p>

              <div className="space-y-4 text-muted text-base leading-relaxed mb-8">
                {bioText.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {credentials.map((c) => (
                  <Badge key={c} variant="default">{c}</Badge>
                ))}
              </div>

              <Button href="/contato" variant="primary">
                {sobre.ctaPrimaryLabel}
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-12">
              {sobre.lecturesTitle}
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
            {sobre.finalCta.title}
          </h2>
          <Button href="/contato" variant="gold" size="lg">
            {sobre.finalCta.ctaLabel}
          </Button>
        </div>
      </section>
    </div>
  )
}
