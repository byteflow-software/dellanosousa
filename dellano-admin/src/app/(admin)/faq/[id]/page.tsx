import { notFound } from 'next/navigation'
import { FaqForm } from '@/components/admin/faq/FaqForm'
import { getFaq, updateFaq, deleteFaq } from '@/lib/actions/faq'

export const metadata = { title: 'Editar FAQ' }

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getFaq(id)
  if (!item) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Editar Pergunta</h1></div>
      </div>
      <div className="admin-card">
        <FaqForm
          item={item}
          onSave={(data) => updateFaq(id, data)}
          onDelete={async () => { 'use server'; await deleteFaq(id) }}
        />
      </div>
    </div>
  )
}
