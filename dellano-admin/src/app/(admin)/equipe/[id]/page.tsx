import { notFound } from 'next/navigation'
import { EquipeForm } from '@/components/admin/equipe/EquipeForm'
import { getMembro, updateMembro, deleteMembro } from '@/lib/actions/equipe'

export const metadata = { title: 'Editar Membro' }

export default async function EditMembroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const membro = await getMembro(id)
  if (!membro) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Editar Membro</h1></div>
      </div>
      <div className="admin-card">
        <EquipeForm
          membro={membro}
          onSave={(data) => updateMembro(id, data)}
          onDelete={async () => { 'use server'; await deleteMembro(id) }}
        />
      </div>
    </div>
  )
}
