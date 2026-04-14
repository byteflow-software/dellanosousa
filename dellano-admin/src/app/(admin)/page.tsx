import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, ExternalLink, Newspaper, CalendarDays, Users, HelpCircle, ArrowRight } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'

async function getStats() {
  const [artigos, publicacoes, imprensa, eventos, equipe, faq] = await Promise.all([
    prisma.artigo.count(),
    prisma.publicacao.count(),
    prisma.imprensa.count(),
    prisma.evento.count(),
    prisma.membroEquipe.count({ where: { active: true } }),
    prisma.faqItem.count({ where: { active: true } }),
  ])
  const publicados = await prisma.artigo.count({ where: { status: 'PUBLISHED' } })
  const rascunhos = await prisma.artigo.count({ where: { status: 'DRAFT' } })
  return { artigos, publicados, rascunhos, publicacoes, imprensa, eventos, equipe, faq }
}

async function getRecentArtigos() {
  return prisma.artigo.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, title: true, status: true, updatedAt: true },
  })
}

const modules = [
  { href: '/artigos', label: 'Artigos', icon: FileText, desc: 'Blog do escritório' },
  { href: '/publicacoes', label: 'Publicações', icon: ExternalLink, desc: 'Conjur, Migalhas, revistas' },
  { href: '/imprensa', label: 'Imprensa', icon: Newspaper, desc: 'Cobertura de imprensa' },
  { href: '/eventos', label: 'Eventos', icon: CalendarDays, desc: 'Palestras e cursos' },
  { href: '/equipe', label: 'Equipe', icon: Users, desc: 'Membros do escritório' },
  { href: '/faq', label: 'FAQ', icon: HelpCircle, desc: 'Perguntas frequentes' },
]

export default async function DashboardPage() {
  const [stats, recentArtigos] = await Promise.all([getStats(), getRecentArtigos()])

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Visão geral do site dellanosousa.com.br</p>
        </div>
        <Link href="/artigos/novo" className="admin-btn admin-btn-primary">
          <FileText size={14} />
          Novo Artigo
        </Link>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total de Artigos</div>
          <div className="admin-stat-value">{stats.artigos}</div>
          <div className="admin-stat-change">{stats.publicados} publicados · {stats.rascunhos} rascunhos</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Publicações Externas</div>
          <div className="admin-stat-value">{stats.publicacoes}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Imprensa</div>
          <div className="admin-stat-value">{stats.imprensa}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Eventos</div>
          <div className="admin-stat-value">{stats.eventos}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Equipe</div>
          <div className="admin-stat-value">{stats.equipe}</div>
          <div className="admin-stat-change">membros ativos</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">FAQ</div>
          <div className="admin-stat-value">{stats.faq}</div>
          <div className="admin-stat-change">perguntas ativas</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Atalhos */}
        <div className="admin-card">
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
            Módulos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
            {modules.map(({ href, label, icon: Icon, desc }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.background = '#F0F4FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.background = ''; }}
              >
                <Icon size={16} color="var(--color-accent)" />
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)' }}>{label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Artigos recentes */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Artigos Recentes
            </h2>
            <Link href="/artigos" className="admin-btn admin-btn-ghost admin-btn-sm">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>

          {recentArtigos.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-title">Nenhum artigo ainda</div>
              <div className="admin-empty-text">Crie o primeiro artigo do blog.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {recentArtigos.map((a) => (
                <Link
                  key={a.id}
                  href={`/artigos/${a.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.125rem' }}>
                      {formatRelativeDate(a.updatedAt)}
                    </div>
                  </div>
                  <span className={`admin-badge ${a.status === 'PUBLISHED' ? 'admin-badge-success' : a.status === 'DRAFT' ? 'admin-badge-warning' : 'admin-badge-secondary'}`}>
                    {a.status === 'PUBLISHED' ? 'Publicado' : a.status === 'DRAFT' ? 'Rascunho' : 'Arquivado'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
