import { MapPin } from 'lucide-react'
import { cities } from '@/data/cities'

export function GeographicPresence() {
  return (
    <section className="py-12 bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <p className="font-sans text-sm font-semibold text-muted uppercase tracking-widest mr-4">
            Presença nacional
          </p>
          {cities.map((city, i) => (
            <span key={city.name} className="flex items-center gap-1 text-sm text-muted font-sans">
              {i > 0 && <span className="text-primary/20 mr-2">·</span>}
              <MapPin size={13} className="text-gold" aria-hidden="true" />
              {city.name}
              <span className="text-primary/30 text-xs">/{city.state}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
