import Link from 'next/link'
import { Plus, HelpCircle } from 'lucide-react'
import { listFaq } from '@/lib/actions/faq'
import { FAQ_CATEGORY_LABELS } from '@/types'

export const metadata = { title: 'FAQ' }

export default async function FaqPage() {
  const items = await listFaq()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">FAQ</h1>
          <p className="admin-page-subtitle">{items.length} pergunta(s)</p>
        </div>
        <Link href="/faq/nova" className="admin-btn admin-btn-primary"><Plus size={14} /> Nova Pergunta</Link>
      </div>

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-empty"><HelpCircle className="admin-empty-icon" /><div className="admin-empty-title">Nenhuma pergunta ainda</div></div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Pergunta</th><th>Categoria</th><th>Ordem</th><th>Ativo</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{f.question}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{f.answer.slice(0, 80)}{f.answer.length > 80 ? '…' : ''}</div>
                    </td>
                    <td><span className="admin-badge admin-badge-blue">{FAQ_CATEGORY_LABELS[f.category]}</span></td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{f.order}</td>
                    <td><span className={`admin-badge ${f.active ? 'admin-badge-success' : 'admin-badge-danger'}`}>{f.active ? 'Sim' : 'Não'}</span></td>
                    <td><Link href={`/faq/${f.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link></td>
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
