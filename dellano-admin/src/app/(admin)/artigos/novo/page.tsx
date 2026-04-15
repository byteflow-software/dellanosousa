import { ArtigoForm } from '@/components/admin/artigos/ArtigoForm'
import { listCategorias } from '@/lib/actions/categorias'
import { listTags } from '@/lib/actions/tags'

export const metadata = { title: 'Novo Artigo' }

export default async function NovoArtigoPage() {
  const [categorias, tags] = await Promise.all([listCategorias(), listTags()])
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Novo Artigo</h1>
          <p className="admin-page-subtitle">Crie um novo post para o blog</p>
        </div>
      </div>
      <div className="admin-card">
        <ArtigoForm
          categorias={categorias.map((c) => ({ id: c.id, name: c.name }))}
          tagsDisponiveis={tags.map((t) => ({ id: t.id, name: t.name }))}
        />
      </div>
    </div>
  )
}
