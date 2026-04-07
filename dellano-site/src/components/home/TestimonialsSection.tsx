import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            title="O que dizem sobre o escritório"
            subtitle="Relatos de clientes e parceiros que confiaram sua defesa à nossa equipe."
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="flex flex-col h-full bg-background border border-primary/10 rounded-lg p-6 shadow-sm">
                <blockquote className="text-muted text-sm leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary flex-shrink-0">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-primary text-sm">{t.name}</p>
                    <p className="text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
