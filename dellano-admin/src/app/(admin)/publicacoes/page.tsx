import Link from 'next/link'
import { Plus, ExternalLink } from 'lucide-react'
import { listPublicacoes } from '@/lib/actions/publicacoes'
import { PUBLICACAO_TIPO_LABELS, STATUS_LABELS } from '@/types'

export const metadata = { title: 'Publicações Externas' }

export default async function PublicacoesPage() {
  const items = await listPublicacoes()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Publicações Externas</h1>
          <p className="admin-page-subtitle">Artigos em Conjur, Migalhas, revistas acadêmicas</p>
        </div>
        <Link href="/publicacoes/nova" className="admin-btn admin-btn-primary">
          <Plus size={14} /> Nova Publicação
        </Link>
      </div>

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-empty">
            <ExternalLink className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhuma publicação ainda</div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Veículo</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{p.title}</div>
                      {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'var(--color-accent)' }}>Ver link externo</a>}
                    </td>
                    <td>{p.venue}</td>
                    <td><span className="admin-badge admin-badge-blue">{PUBLICACAO_TIPO_LABELS[p.tipo]}</span></td>
                    <td style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>{p.date}</td>
                    <td><span className={`admin-badge ${p.status === 'PUBLISHED' ? 'admin-badge-success' : p.status === 'DRAFT' ? 'admin-badge-warning' : 'admin-badge-secondary'}`}>{STATUS_LABELS[p.status]}</span></td>
                    <td><Link href={`/publicacoes/${p.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link></td>
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
