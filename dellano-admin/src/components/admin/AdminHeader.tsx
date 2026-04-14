'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const LABELS: Record<string, string> = {
  '': 'Dashboard',
  artigos: 'Artigos',
  publicacoes: 'Publicações Externas',
  imprensa: 'Imprensa',
  eventos: 'Eventos',
  equipe: 'Equipe',
  faq: 'FAQ',
  sobre: 'Sobre',
  seo: 'SEO',
  novo: 'Novo',
  nova: 'Nova',
}

export function AdminHeader({ userName }: { userName: string }) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = LABELS[seg] ?? seg
    const isLast = i === segments.length - 1
    return { href, label, isLast }
  })

  return (
    <header className="admin-topbar">
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}>
        <Link href="/" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>
          Dashboard
        </Link>
        {crumbs.map(({ href, label, isLast }) => (
          <span key={href} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <ChevronRight size={12} color="var(--color-muted)" />
            {isLast ? (
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{label}</span>
            ) : (
              <Link href={href} style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>
                {label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 700,
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-primary)' }}>
          {userName}
        </span>
      </div>
    </header>
  )
}
