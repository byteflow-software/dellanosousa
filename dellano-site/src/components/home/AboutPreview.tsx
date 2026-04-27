import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { home } from '@/content'

const { about } = home

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="left" className="relative">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-primary/10 shadow-xl bg-gradient-to-br from-secondary to-primary">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gold/10 blur-3xl hidden lg:block" />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
              {about.eyebrow}
            </p>
            <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl leading-tight mb-6">
              {about.title}
            </h2>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === about.paragraphs.length - 1
                    ? 'text-muted text-base leading-relaxed mb-8'
                    : 'text-muted text-base leading-relaxed mb-4'
                }
              >
                {p}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 mb-8">
              {about.credentials.map((c) => (
                <Badge key={c} variant="default">
                  {c}
                </Badge>
              ))}
            </div>

            <Button href="/sobre" variant="outline">
              {about.ctaLabel}
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
