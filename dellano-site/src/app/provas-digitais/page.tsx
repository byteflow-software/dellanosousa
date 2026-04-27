import type { Metadata } from 'next'
import { risks } from '@/data/risks'
import { forensicTools } from '@/data/forensic-tools'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ComparisonTable } from '@/components/provas-digitais/ComparisonTable'
import { CustodyFlowchart } from '@/components/provas-digitais/CustodyFlowchart'
import { meta, pages } from '@/content'

const { provasDigitais: pd } = pages

export const metadata: Metadata = {
  title: meta.provasDigitais.title,
  description: meta.provasDigitais.description,
}

export default function ProvasDigitaisPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="light" className="mb-6">{pd.hero.badge}</Badge>
            <h1 className="font-serif font-semibold text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {pd.hero.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {pd.hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-16">
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                {pd.intro.title}
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {pd.intro.description}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif font-semibold text-primary text-2xl mb-8">
              {pd.evidenceTypesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pd.evidenceTypes.map((e) => (
                <div key={e.title} className="p-5 rounded-lg border border-primary/10 bg-background">
                  <h3 className="font-sans font-semibold text-primary text-sm mb-1">{e.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-primary/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-8">
              <Badge variant="accent" className="mb-4">{pd.comparison.badge}</Badge>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                {pd.comparison.title}
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {pd.comparison.description}
              </p>
            </div>
            <ComparisonTable />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif font-semibold text-white text-2xl md:text-4xl mb-8">
              {pd.risksTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {risks.map((risk) => (
                <div key={risk.id} className="p-5 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-sans font-semibold text-gold text-sm mb-1">{risk.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{risk.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-12">
              <Badge variant="accent" className="mb-4">{pd.custody.badge}</Badge>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                {pd.custody.title}
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {pd.custody.description}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CustodyFlowchart steps={pd.custody.steps} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-10">
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                {pd.tools.title}
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {pd.tools.description}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forensicTools.map((t) => (
                <div key={t.name} className="p-5 rounded-lg border border-primary/10 bg-white">
                  <Badge variant="accent" className="mb-3">{t.category}</Badge>
                  <h3 className="font-serif font-semibold text-primary text-base mb-2">{t.name}</h3>
                  <p className="text-muted text-xs leading-relaxed">{t.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-10">
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                {pd.norms.title}
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {pd.norms.description}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pd.norms.groups.map((n) => (
                <div key={n.title} className="p-6 rounded-lg border border-primary/10 bg-background">
                  <h3 className="font-sans font-semibold text-primary text-sm mb-3">{n.title}</h3>
                  <ul className="space-y-2">
                    {n.refs.map((r) => (
                      <li key={r} className="text-muted text-xs leading-relaxed flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-6">
                {pd.howWeWork.title}
              </h2>
              <div className="space-y-4 text-muted text-sm leading-relaxed">
                {pd.howWeWork.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-6">
                {pd.deliverables.title}
              </h2>
              <ul className="space-y-3">
                {pd.deliverables.items.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-primary text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} className="mt-12 text-center">
            <Button href="/contato" variant="primary" size="lg">
              {pd.finalCtaLabel}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
