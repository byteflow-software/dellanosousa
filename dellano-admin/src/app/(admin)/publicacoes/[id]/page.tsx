import { notFound } from 'next/navigation'
import { PublicacaoForm } from '@/components/admin/publicacoes/PublicacaoForm'
import { getPublicacao } from '@/lib/actions/publicacoes'

export const metadata = { title: 'Editar Publicação' }

export default async function EditPublicacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pub = await getPublicacao(id)
  if (!pub) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Editar Publicação</h1></div>
      </div>
      <div className="admin-card">
        <PublicacaoForm
          publicacao={pub}
          id={id}
          isEdit
        />
      </div>
    </div>
  )
}
