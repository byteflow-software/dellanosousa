import { EquipeForm } from '@/components/admin/equipe/EquipeForm'

export const metadata = { title: 'Novo Membro' }

export default function NovoMembroPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Novo Membro da Equipe</h1></div>
      </div>
      <div className="admin-card">
        <EquipeForm />
      </div>
    </div>
  )
}
