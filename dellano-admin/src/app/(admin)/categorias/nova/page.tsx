import { CategoriaForm } from '@/components/admin/categorias/CategoriaForm'

export const metadata = { title: 'Nova Categoria' }

export default function NovaCategoriaPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Nova Categoria</h1>
        </div>
      </div>
      <div className="admin-card">
        <CategoriaForm />
      </div>
    </div>
  )
}
