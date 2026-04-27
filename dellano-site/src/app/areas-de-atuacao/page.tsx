import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { meta, pages } from '@/content'

const { areas } = pages

export const metadata: Metadata = {
  title: meta.areas.title,
  description: meta.areas.description,
}

export default function AreasDeAtuacaoPage() {
  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            {areas.eyebrow}
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            {areas.title}
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            {areas.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.05}>
              <Link
                href={`/areas-de-atuacao/${service.slug}`}
                className="group flex flex-col h-full p-6 bg-white border border-primary/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h2 className="font-serif font-semibold text-primary text-lg md:text-xl mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>
                <span className="text-sm font-sans font-medium text-gold">
                  {areas.cardCtaLabel}
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
