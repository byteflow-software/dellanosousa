import {
  Monitor,
  Shield,
  Search,
  Users,
  Lock,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { services } from '@/data/services'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import { home } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Shield,
  Search,
  Users,
  Lock,
  AlertCircle,
}

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            title={home.services.title}
            subtitle={home.services.subtitle}
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Monitor
            return (
              <AnimatedSection key={service.id} delay={i * 0.08}>
                <Link
                  href={`/areas-de-atuacao#${service.slug}`}
                  className={cn(
                    'group flex flex-col h-full bg-white border border-primary/10 rounded-lg p-6 shadow-sm',
                    'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-gold/40'
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                    <Icon size={20} className="text-primary group-hover:text-gold transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-semibold text-primary text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <span className="mt-4 text-xs font-sans font-medium text-gold group-hover:underline">
                    {home.services.cardCtaLabel}
                  </span>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
