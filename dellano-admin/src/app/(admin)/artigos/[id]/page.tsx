import { notFound } from 'next/navigation'
import { ArtigoForm } from '@/components/admin/artigos/ArtigoForm'
import { getArtigo } from '@/lib/actions/artigos'

export const metadata = { title: 'Editar Artigo' }

export default async function EditArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const artigo = await getArtigo(id)
  if (!artigo) notFound()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Editar Artigo</h1>
          <p className="admin-page-subtitle" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            {artigo.slug}
          </p>
        </div>
      </div>
      <div className="admin-card">
        <ArtigoForm
          artigo={artigo}
          id={id}
          isEdit
        />
      </div>
    </div>
  )
}
