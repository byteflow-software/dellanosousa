import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

export function FinalCTA() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Entre em Contato
          </p>
          <h2 className="font-serif font-semibold text-white text-2xl md:text-4xl lg:text-5xl leading-tight mb-6 max-w-2xl mx-auto">
            Casos sensíveis exigem estratégia, técnica e rapidez
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto mb-10">
            Cada hora conta. Entre em contato agora e receba orientação imediata de um especialista.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={WHATSAPP_URL} external variant="gold" size="lg">
              Plantão 24h
            </Button>
            <Button href="/contato" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary">
              Agendar reunião
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
