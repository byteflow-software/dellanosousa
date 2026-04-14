import { getSobre } from '@/lib/actions/sobre'
import { SobreForm } from '@/components/admin/sobre/SobreForm'

export const metadata = { title: 'Sobre' }

export default async function SobrePage() {
  const sobre = await getSobre()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Página Sobre</h1>
          <p className="admin-page-subtitle">Biografia, credenciais e palestras exibidas em /sobre</p>
        </div>
      </div>
      <div className="admin-card">
        <SobreForm
          initial={sobre ? { bioText: sobre.bioText, credentials: sobre.credentials, lectures: sobre.lectures } : undefined}
        />
      </div>
    </div>
  )
}
