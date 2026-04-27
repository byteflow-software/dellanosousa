import { BookOpen, Presentation, Newspaper } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { home } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Presentation,
  Newspaper,
}

const { institutionalRecognition } = home

export function InstitutionalRecognition() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            title={institutionalRecognition.title}
            subtitle={institutionalRecognition.subtitle}
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {institutionalRecognition.pillars.map(({ iconKey, title, description, href, linkLabel }, i) => {
            const Icon = iconMap[iconKey] || BookOpen
            return (
              <AnimatedSection key={title} delay={i * 0.1}>
                <a
                  href={href}
                  className="group flex flex-col h-full p-6 bg-white border border-primary/10 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={24} className="text-gold mb-4" aria-hidden="true" />
                  <h3 className="font-serif font-semibold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{description}</p>
                  <span className="text-sm font-sans font-medium text-gold">
                    {linkLabel} →
                  </span>
                </a>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
