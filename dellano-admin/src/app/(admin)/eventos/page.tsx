import Link from 'next/link'
import { Plus, CalendarDays } from 'lucide-react'
import { listEventos } from '@/lib/actions/eventos'
import { EVENTO_TIPO_LABELS, STATUS_LABELS } from '@/types'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Eventos' }

export default async function EventosPage() {
  const items = await listEventos()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Eventos</h1>
          <p className="admin-page-subtitle">Palestras, cursos, congressos e mesas de debate</p>
        </div>
        <Link href="/eventos/novo" className="admin-btn admin-btn-primary"><Plus size={14} /> Novo Evento</Link>
      </div>

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-empty">
            <CalendarDays className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhum evento ainda</div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Título</th><th>Tipo</th><th>Organizador</th><th>Local</th><th>Data</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{e.title}</div>
                      {e.role && <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{e.role}</div>}
                    </td>
                    <td><span className="admin-badge admin-badge-blue">{EVENTO_TIPO_LABELS[e.tipo]}</span></td>
                    <td style={{ fontSize: '0.8125rem' }}>{e.organizer}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{e.location}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>{formatDate(e.date)}</td>
                    <td><span className={`admin-badge ${e.status === 'PUBLISHED' ? 'admin-badge-success' : 'admin-badge-warning'}`}>{STATUS_LABELS[e.status]}</span></td>
                    <td><Link href={`/eventos/${e.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link></td>
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
