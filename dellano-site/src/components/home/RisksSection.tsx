import { ImageOff, SmartphoneNfc, CloudOff, FileWarning, AlertTriangle } from 'lucide-react'
import { risks } from '@/data/risks'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const iconMap: Record<string, React.ElementType> = {
  ImageOff,
  SmartphoneNfc,
  CloudOff,
  FileWarning,
  AlertTriangle,
}

export function RisksSection() {
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
              Atenção
            </p>
            <h2 className="font-serif font-semibold text-white text-2xl md:text-4xl leading-tight max-w-2xl mx-auto">
              Sua prova pode ser decisiva. Ou pode ser descartada.
            </h2>
            <p className="text-white/60 text-base mt-4 max-w-xl mx-auto">
              Irregularidades na obtenção e apresentação de evidências digitais comprometem todo o
              processo. Conheça os principais riscos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {risks.map((risk, i) => {
            const Icon = iconMap[risk.icon] || AlertTriangle
            return (
              <AnimatedSection key={risk.id} delay={i * 0.1}>
                <div className="flex gap-4 p-5 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Icon size={18} className="text-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-white text-sm mb-1">
                      {risk.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{risk.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
