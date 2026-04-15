import { notFound } from 'next/navigation'
import { ArtigoForm } from '@/components/admin/artigos/ArtigoForm'
import { getArtigo } from '@/lib/actions/artigos'
import { listCategorias } from '@/lib/actions/categorias'
import { listTags } from '@/lib/actions/tags'

export const metadata = { title: 'Editar Artigo' }

export default async function EditArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [artigo, categorias, tags] = await Promise.all([
    getArtigo(id),
    listCategorias(),
    listTags(),
  ])
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
          artigo={{
            id: artigo.id,
            title: artigo.title,
            slug: artigo.slug,
            excerpt: artigo.excerpt,
            content: artigo.content,
            categoryId: artigo.categoryId,
            coverImage: artigo.coverImage,
            status: artigo.status,
            featured: artigo.featured,
            publishedAt: artigo.publishedAt,
            author: artigo.author,
            seoTitle: artigo.seoTitle,
            seoDesc: artigo.seoDesc,
            tags: artigo.tags.map((t) => ({ id: t.id, name: t.name })),
          }}
          id={id}
          isEdit
          categorias={categorias.map((c) => ({ id: c.id, name: c.name }))}
          tagsDisponiveis={tags.map((t) => ({ id: t.id, name: t.name }))}
        />
      </div>
    </div>
  )
}
