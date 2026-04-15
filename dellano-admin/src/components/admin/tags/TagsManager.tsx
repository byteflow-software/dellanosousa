'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { createTag, deleteTag } from '@/lib/actions/tags'

interface TagItem { id: string; name: string; slug: string; count: number }

export function TagsManager({ tags }: { tags: TagItem[] }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    setError('')
    const res = await createTag({ name: name.trim() })
    setBusy(false)
    if (!res.success) { setError(res.error ?? 'Erro'); return }
    setName('')
    router.refresh()
  }

  async function handleDelete(id: string, count: number) {
    if (count > 0 && !confirm(`Tag tem ${count} artigo(s). Excluir mesmo assim? (a relação será removida)`)) return
    if (count === 0 && !confirm('Excluir esta tag?')) return
    const res = await deleteTag(id)
    if (!res.success) alert(res.error)
    else router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nova tag"
          className="admin-form-input"
          style={{ maxWidth: 320 }}
        />
        <button type="submit" disabled={busy} className="admin-btn admin-btn-primary">
          <Plus size={14} /> Adicionar
        </button>
      </form>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map((t) => (
          <span
            key={t.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#f3f4f6',
              padding: '0.3rem 0.7rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
            }}
          >
            {t.name}
            <span style={{ color: '#6b7280', fontSize: '0.72rem' }}>({t.count})</span>
            <button
              type="button"
              onClick={() => handleDelete(t.id, t.count)}
              style={{ background: 'transparent', border: 0, cursor: 'pointer', display: 'flex', color: '#b91c1c' }}
              aria-label={`Excluir ${t.name}`}
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
