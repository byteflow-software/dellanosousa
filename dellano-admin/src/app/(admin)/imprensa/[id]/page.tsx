import { notFound } from 'next/navigation'
import { ImprensaForm } from '@/components/admin/imprensa/ImprensaForm'
import { getImprensa } from '@/lib/actions/imprensa'

export const metadata = { title: 'Editar Imprensa' }

export default async function EditImprensaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getImprensa(id)
  if (!item) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Editar Imprensa</h1></div>
      </div>
      <div className="admin-card">
        <ImprensaForm
          item={item}
          id={id}
          isEdit
        />
      </div>
    </div>
  )
}
