import type { Metadata } from 'next'
import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contato/ContactForm'
import { cities } from '@/data/cities'
import { Button } from '@/components/ui/Button'
import { meta, pages } from '@/content'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'
const { contato } = pages

export const metadata: Metadata = {
  title: meta.contato.title,
  description: meta.contato.description,
}

export default function ContatoPage() {
  return (
    <div className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            {contato.eyebrow}
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            {contato.title}
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            {contato.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-serif font-semibold text-primary text-xl mb-6">
              {contato.formTitle}
            </h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-lg bg-primary text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-gold" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-white">{contato.urgent.title}</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {contato.urgent.description}
              </p>
              <Button href={WHATSAPP_URL} external variant="gold" className="w-full justify-center">
                {contato.urgent.ctaLabel}
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} className="text-gold" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-primary">{contato.cities.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cities.map((city) => (
                  <div key={city.name} className="p-3 rounded-lg border border-primary/10 bg-white">
                    <p className="font-sans font-medium text-primary text-sm">{city.name}</p>
                    <p className="text-muted text-xs">{city.state}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted text-xs mt-3">
                {contato.cities.footnote}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle size={20} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-sans font-medium text-primary text-sm mb-1">
                  {contato.expectation.title}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {contato.expectation.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
