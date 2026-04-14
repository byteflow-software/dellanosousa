import { EventoForm } from '@/components/admin/eventos/EventoForm'

export const metadata = { title: 'Novo Evento' }

export default function NovoEventoPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Novo Evento</h1></div>
      </div>
      <div className="admin-card">
        <EventoForm />
      </div>
    </div>
  )
}
