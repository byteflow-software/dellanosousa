import { Tag as TagIcon } from 'lucide-react'
import { listTags } from '@/lib/actions/tags'
import { TagsManager } from '@/components/admin/tags/TagsManager'

export const metadata = { title: 'Tags' }

export default async function TagsPage() {
  const tags = await listTags()
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Tags</h1>
          <p className="admin-page-subtitle">{tags.length} tag(s)</p>
        </div>
      </div>
      <div className="admin-card">
        {tags.length === 0 ? (
          <div className="admin-empty">
            <TagIcon className="admin-empty-icon" />
            <div className="admin-empty-title">Nenhuma tag</div>
            <div className="admin-empty-text">Tags são criadas automaticamente ao editar artigos, ou aqui abaixo.</div>
          </div>
        ) : null}
        <TagsManager
          tags={tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug, count: t._count.artigos }))}
        />
      </div>
    </div>
  )
}
