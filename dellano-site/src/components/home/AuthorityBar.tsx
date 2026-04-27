import { Globe, Monitor, Search, FileSearch, Handshake } from 'lucide-react'
import { home } from '@/content'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Monitor,
  Search,
  FileSearch,
  Handshake,
}

export function AuthorityBar() {
  return (
    <section className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-16">
          {home.authorityBar.map(({ iconKey, label }) => {
            const Icon = iconMap[iconKey] || Globe
            return (
              <div key={label} className="flex items-center gap-2 text-white/80">
                <Icon size={18} className="text-gold flex-shrink-0" aria-hidden="true" />
                <span className="font-sans text-sm font-medium whitespace-nowrap">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
