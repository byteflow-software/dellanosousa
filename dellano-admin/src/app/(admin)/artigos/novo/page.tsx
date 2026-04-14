import { ArtigoForm } from '@/components/admin/artigos/ArtigoForm'
import { createArtigo } from '@/lib/actions/artigos'

export const metadata = { title: 'Novo Artigo' }

export default function NovoArtigoPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Novo Artigo</h1>
          <p className="admin-page-subtitle">Crie um novo post para o blog</p>
        </div>
      </div>
      <div className="admin-card">
        <ArtigoForm onSave={(data) => createArtigo(data)} />
      </div>
    </div>
  )
}
