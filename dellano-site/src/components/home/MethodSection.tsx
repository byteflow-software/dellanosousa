import { methodSteps } from '@/data/method'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function MethodSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            title="Método de Atuação"
            subtitle="Uma abordagem estruturada e transparente para cada caso, da análise inicial ao acompanhamento final."
            align="center"
          />
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-primary/10 hidden md:block" aria-hidden="true" />

          <div className="space-y-6">
            {methodSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.12}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold flex items-center justify-center z-10 shadow-sm">
                    <span className="font-sans font-bold text-primary text-sm">{step.step}</span>
                  </div>
                  <div className="pt-2 pb-6">
                    <h3 className="font-serif font-semibold text-primary text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
