import { EventoForm } from '@/components/admin/eventos/EventoForm'
import { createEvento } from '@/lib/actions/eventos'

export const metadata = { title: 'Novo Evento' }

export default function NovoEventoPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Novo Evento</h1></div>
      </div>
      <div className="admin-card">
        <EventoForm onSave={(data) => createEvento(data)} />
      </div>
    </div>
  )
}
