import { PublicacaoForm } from '@/components/admin/publicacoes/PublicacaoForm'

export const metadata = { title: 'Nova Publicação' }

export default function NovaPublicacaoPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Nova Publicação Externa</h1>
          <p className="admin-page-subtitle">Conjur, Migalhas, RBCC, IBCCRIM…</p>
        </div>
      </div>
      <div className="admin-card">
        <PublicacaoForm />
      </div>
    </div>
  )
}
