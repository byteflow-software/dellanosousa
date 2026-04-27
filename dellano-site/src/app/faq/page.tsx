import type { Metadata } from 'next'
import { getActiveFaqs, getFaqCategories } from '@/lib/db'
import { JsonLd } from '@/components/layout/JsonLd'
import { Button } from '@/components/ui/Button'
import { meta, pages } from '@/content'

const { faq } = pages

export const metadata: Metadata = {
  title: meta.faq.title,
  description: meta.faq.description,
}

export const revalidate = 60

export default async function FAQPage() {
  const faqs = await getActiveFaqs()
  const faqCategories = getFaqCategories()

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <div className="bg-background">
      <JsonLd data={faqJsonLd} />

      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            {faq.eyebrow}
          </p>
          <h1 className="font-serif font-semibold text-white text-3xl md:text-5xl leading-tight mb-4">
            {faq.title}
          </h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
            {faq.description}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {faqCategories.map((cat) => {
            const items = faqs.filter((f) => f.category === cat.value)
            if (items.length === 0) return null
            return (
              <div key={cat.value}>
                <h2 className="font-serif font-semibold text-primary text-2xl md:text-3xl mb-6">
                  {cat.label}
                </h2>
                <div className="space-y-4">
                  {items.map((f) => (
                    <details
                      key={f.id}
                      className="group p-5 rounded-lg border border-primary/10 bg-white"
                    >
                      <summary className="font-sans font-semibold text-primary text-sm cursor-pointer list-none flex items-start justify-between gap-4">
                        <span>{f.question}</span>
                        <span className="text-gold text-lg leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                      </summary>
                      <p className="text-muted text-sm leading-relaxed mt-3">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-semibold text-white text-2xl md:text-3xl mb-4">
            {faq.finalCta.title}
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-xl mx-auto">
            {faq.finalCta.description}
          </p>
          <Button href="/contato" variant="gold" size="lg">
            {faq.finalCta.ctaLabel}
          </Button>
        </div>
      </section>
    </div>
  )
}
