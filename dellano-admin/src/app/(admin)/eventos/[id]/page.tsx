import { notFound } from 'next/navigation'
import { EventoForm } from '@/components/admin/eventos/EventoForm'
import { getEvento, updateEvento, deleteEvento } from '@/lib/actions/eventos'

export const metadata = { title: 'Editar Evento' }

export default async function EditEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const evento = await getEvento(id)
  if (!evento) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Editar Evento</h1></div>
      </div>
      <div className="admin-card">
        <EventoForm
          evento={evento}
          onSave={(data) => updateEvento(id, data)}
          onDelete={async () => { 'use server'; await deleteEvento(id) }}
        />
      </div>
    </div>
  )
}
