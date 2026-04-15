import Link from 'next/link'
import { Plus, FolderTree } from 'lucide-react'
import { listCategorias } from '@/lib/actions/categorias'
import { CategoriaRowActions } from '@/components/admin/categorias/CategoriaRowActions'

export const metadata = { title: 'Categorias' }

export default async function CategoriasPage() {
  const categorias = await listCategorias()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categorias</h1>
          <p className="admin-page-subtitle">{categorias.length} categoria(s) cadastrada(s)</p>
        </div>
        <Link href="/categorias/nova" className="admin-btn admin-btn-primary">
          <Plus size={14} /> Nova Categoria
        </Link>
      </div>

      <div className="admin-card">
        {categorias.length === 0 ? (
          <div className="admin-empty">
            <FolderTree className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhuma categoria</div>
            <div className="admin-empty-text">Crie a primeira categoria para classificar artigos.</div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Slug</th>
                  <th>Ordem</th>
                  <th>Artigos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{c.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--color-muted)' }}>{c.slug}</td>
                    <td>{c.order}</td>
                    <td>
                      <span className="admin-badge admin-badge-blue">{c._count.artigos}</span>
                    </td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <Link href={`/categorias/${c.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link>
                      <CategoriaRowActions id={c.id} count={c._count.artigos} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
