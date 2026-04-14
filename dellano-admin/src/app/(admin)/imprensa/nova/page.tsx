import { ImprensaForm } from '@/components/admin/imprensa/ImprensaForm'
import { createImprensa } from '@/lib/actions/imprensa'

export const metadata = { title: 'Nova Imprensa' }

export default function NovaImprensaPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Nova Imprensa</h1></div>
      </div>
      <div className="admin-card">
        <ImprensaForm onSave={(data) => createImprensa(data)} />
      </div>
    </div>
  )
}
