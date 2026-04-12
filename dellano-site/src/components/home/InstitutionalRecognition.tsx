import { BookOpen, Presentation, Newspaper } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const pillars = [
  {
    icon: BookOpen,
    title: 'Publicações Técnicas',
    description:
      'Artigos e análises sobre provas digitais, cadeia de custódia e investigação defensiva em portais jurídicos.',
    href: '/publicacoes',
    linkLabel: 'Ver publicações',
  },
  {
    icon: Presentation,
    title: 'Palestras e Cursos',
    description:
      'Participações em eventos da OAB, ABRACRIM e instituições de ensino sobre direito penal e tecnologia.',
    href: '/eventos',
    linkLabel: 'Ver agenda',
  },
  {
    icon: Newspaper,
    title: 'Imprensa',
    description:
      'Kit de imprensa e temas para comentário em matérias sobre crimes cibernéticos e evidências digitais.',
    href: '/imprensa',
    linkLabel: 'Sala de imprensa',
  },
]

export function InstitutionalRecognition() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            title="Produção Institucional"
            subtitle="Construção de autoridade técnica a partir de publicações, palestras e participação em debates jurídicos."
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {pillars.map(({ icon: Icon, title, description, href, linkLabel }, i) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
