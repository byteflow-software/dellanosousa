'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, ExternalLink, Newspaper,
  CalendarDays, Users, HelpCircle, User, Search, LogOut,
} from 'lucide-react'

const nav = [
  {
    section: 'Conteúdo',
    links: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/artigos', label: 'Artigos', icon: FileText },
      { href: '/publicacoes', label: 'Publicações Externas', icon: ExternalLink },
      { href: '/imprensa', label: 'Imprensa', icon: Newspaper },
      { href: '/eventos', label: 'Eventos', icon: CalendarDays },
    ],
  },
  {
    section: 'Site',
    links: [
      { href: '/equipe', label: 'Equipe', icon: Users },
      { href: '/faq', label: 'FAQ', icon: HelpCircle },
      { href: '/sobre', label: 'Sobre', icon: User },
      { href: '/seo', label: 'SEO', icon: Search },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-title">Dellano Admin</div>
        <div className="admin-sidebar-logo-sub">Gestão de Conteúdo</div>
      </div>

      <nav className="admin-sidebar-nav">
        {nav.map((group) => (
          <div key={group.section}>
            <div className="admin-sidebar-section">{group.section}</div>
            {group.links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`admin-sidebar-link${isActive(href) ? ' active' : ''}`}
              >
                <Icon />
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button
          onClick={handleLogout}
          className="admin-sidebar-link"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <LogOut />
          Sair
        </button>
      </div>
    </aside>
  )
}
