import { notFound } from 'next/navigation'
import { CategoriaForm } from '@/components/admin/categorias/CategoriaForm'
import { getCategoria } from '@/lib/actions/categorias'

export const metadata = { title: 'Editar Categoria' }

export default async function EditCategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = await getCategoria(id)
  if (!cat) notFound()
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Editar Categoria</h1>
        </div>
      </div>
      <div className="admin-card">
        <CategoriaForm id={id} initial={{ name: cat.name, slug: cat.slug, order: cat.order }} />
      </div>
    </div>
  )
}
