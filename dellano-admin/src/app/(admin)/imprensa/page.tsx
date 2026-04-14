import Link from 'next/link'
import { Plus, Newspaper } from 'lucide-react'
import { listImprensa } from '@/lib/actions/imprensa'
import { STATUS_LABELS } from '@/types'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Imprensa' }

export default async function ImprensaPage() {
  const items = await listImprensa()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Imprensa</h1>
          <p className="admin-page-subtitle">Cobertura de imprensa, entrevistas e menções</p>
        </div>
        <Link href="/imprensa/nova" className="admin-btn admin-btn-primary"><Plus size={14} /> Nova</Link>
      </div>

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-empty">
            <Newspaper className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhum item de imprensa ainda</div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Veículo</th><th>Título</th><th>Data</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{item.outlet}</td>
                    <td>
                      <div>{item.title}</div>
                      {item.description && <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{item.description.slice(0, 80)}{item.description.length > 80 ? '…' : ''}</div>}
                    </td>
                    <td style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{formatDate(item.date)}</td>
                    <td><span className={`admin-badge ${item.status === 'PUBLISHED' ? 'admin-badge-success' : 'admin-badge-warning'}`}>{STATUS_LABELS[item.status]}</span></td>
                    <td><Link href={`/imprensa/${item.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link></td>
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
