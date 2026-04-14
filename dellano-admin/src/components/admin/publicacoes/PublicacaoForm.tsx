'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import type { Publicacao } from '@prisma/client'
import { createPublicacao, updatePublicacao, deletePublicacao } from '@/lib/actions/publicacoes'

const schema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  venue: z.string().min(1, 'Veículo obrigatório'),
  tipo: z.enum(['MIDIA', 'PUBLICACAO_ACADEMICA']),
  url: z.string().optional(),
  date: z.string().min(4, 'Data obrigatória'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  order: z.coerce.number().int().default(0),
})

type FormData = z.infer<typeof schema>

interface Props {
  publicacao?: Publicacao
  id?: string
  isEdit?: boolean
}

export function PublicacaoForm({ publicacao, id, isEdit }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: publicacao?.title ?? '',
      venue: publicacao?.venue ?? '',
      tipo: publicacao?.tipo ?? 'MIDIA',
      url: publicacao?.url ?? '',
      date: publicacao?.date ?? '',
      status: publicacao?.status ?? 'PUBLISHED',
      order: publicacao?.order ?? 0,
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updatePublicacao(id, data)
      : await createPublicacao(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    router.push('/publicacoes')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir esta publicação?')) return
    await deletePublicacao(id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Título *</label>
          <input {...register('title')} className="admin-form-input" placeholder="Título da publicação" />
          {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Veículo / Revista *</label>
          <input {...register('venue')} className="admin-form-input" placeholder="Conjur, Migalhas, RBCC…" />
          {errors.venue && <span className="admin-form-error">{errors.venue.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Tipo *</label>
          <select {...register('tipo')} className="admin-form-select">
            <option value="MIDIA">Mídia / Entrevista</option>
            <option value="PUBLICACAO_ACADEMICA">Publicação Acadêmica</option>
          </select>
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">URL (link externo)</label>
          <input {...register('url')} className="admin-form-input" placeholder="https://www.conjur.com.br/artigo/..." />
          <span className="admin-form-hint">O site exibirá um link de redirecionamento para esta URL</span>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Data *</label>
          <input {...register('date')} className="admin-form-input" placeholder="2025 ou 2025-06-15" />
          {errors.date && <span className="admin-form-error">{errors.date.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <select {...register('status')} className="admin-form-select">
            <option value="PUBLISHED">Publicado</option>
            <option value="DRAFT">Rascunho</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Ordem</label>
          <input {...register('order')} type="number" className="admin-form-input" min={0} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={14} />{saving ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" onClick={() => router.push('/publicacoes')} className="admin-btn admin-btn-secondary">Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="admin-btn admin-btn-danger" style={{ marginLeft: 'auto' }}>
            <Trash2 size={14} />Excluir
          </button>
        )}
      </div>
    </form>
  )
}
