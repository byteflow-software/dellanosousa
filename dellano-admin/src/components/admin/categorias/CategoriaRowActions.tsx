'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCategoria } from '@/lib/actions/categorias'

export function CategoriaRowActions({ id, count }: { id: string; count: number }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    if (count > 0) {
      alert('Não é possível excluir: existem artigos vinculados.')
      return
    }
    if (!confirm('Excluir esta categoria?')) return
    setBusy(true)
    const res = await deleteCategoria(id)
    setBusy(false)
    if (!res.success) alert(res.error)
    else router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="admin-btn admin-btn-ghost admin-btn-sm"
      style={{ color: '#b91c1c' }}
    >
      Excluir
    </button>
  )
}
