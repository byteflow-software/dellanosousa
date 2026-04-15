import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'
import { listArtigos } from '@/lib/actions/artigos'
import { STATUS_LABELS } from '@/types'
import { formatRelativeDate } from '@/lib/utils'

export const metadata = { title: 'Artigos' }

export default async function ArtigosPage() {
  const artigos = await listArtigos()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Artigos</h1>
          <p className="admin-page-subtitle">{artigos.length} artigo(s) no blog</p>
        </div>
        <Link href="/artigos/novo" className="admin-btn admin-btn-primary">
          <Plus size={14} /> Novo Artigo
        </Link>
      </div>

      <div className="admin-card">
        {artigos.length === 0 ? (
          <div className="admin-empty">
            <FileText className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhum artigo ainda</div>
            <div className="admin-empty-text">Crie o primeiro artigo do blog.</div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Destaque</th>
                  <th>Atualizado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {artigos.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{a.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{a.slug}</div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-blue">
                        {a.categoria?.name ?? '—'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${a.status === 'PUBLISHED' ? 'admin-badge-success' : a.status === 'DRAFT' ? 'admin-badge-warning' : 'admin-badge-secondary'}`}>
                        {STATUS_LABELS[a.status]}
                      </span>
                    </td>
                    <td>{a.featured ? <span className="admin-badge admin-badge-gold">Sim</span> : <span style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>—</span>}</td>
                    <td style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{formatRelativeDate(a.updatedAt)}</td>
                    <td>
                      <Link href={`/artigos/${a.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
