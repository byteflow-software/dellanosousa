'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import { slugify } from '@/lib/utils'
import type { Artigo } from '@prisma/client'

const schema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras, números e hífens'),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  category: z.enum(['PROVAS_DIGITAIS', 'PROCESSO_PENAL', 'INVESTIGACAO_DEFENSIVA', 'CIBERCRIMES', 'ANALISES']),
  coverImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  featured: z.boolean(),
  publishedAt: z.string().optional(),
  author: z.string().default('Dellano Sousa'),
  seoTitle: z.string().max(70).optional(),
  seoDesc: z.string().max(160).optional(),
})

type FormData = z.infer<typeof schema>

const CATEGORIES = [
  { value: 'PROVAS_DIGITAIS', label: 'Provas Digitais' },
  { value: 'PROCESSO_PENAL', label: 'Processo Penal' },
  { value: 'INVESTIGACAO_DEFENSIVA', label: 'Investigação Defensiva' },
  { value: 'CIBERCRIMES', label: 'Cibercrimes' },
  { value: 'ANALISES', label: 'Análises' },
]

interface Props {
  artigo?: Artigo
  onSave: (data: FormData) => Promise<{ success: boolean; error?: string }>
  onDelete?: () => Promise<void>
}

export function ArtigoForm({ artigo, onSave, onDelete }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: artigo?.title ?? '',
      slug: artigo?.slug ?? '',
      excerpt: artigo?.excerpt ?? '',
      content: artigo?.content ?? '',
      category: artigo?.category ?? 'PROVAS_DIGITAIS',
      coverImage: artigo?.coverImage ?? '',
      status: artigo?.status ?? 'DRAFT',
      featured: artigo?.featured ?? false,
      publishedAt: artigo?.publishedAt ? new Date(artigo.publishedAt).toISOString().slice(0, 10) : '',
      author: artigo?.author ?? 'Dellano Sousa',
      seoTitle: artigo?.seoTitle ?? '',
      seoDesc: artigo?.seoDesc ?? '',
    },
  })

  const title = watch('title')

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setValue('title', val)
    if (!artigo) setValue('slug', slugify(val))
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = await onSave(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro ao salvar'); return }
    router.push('/artigos')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Excluir este artigo? Esta ação não pode ser desfeita.')) return
    setDeleting(true)
    await onDelete?.()
  }

  const seoTitleVal = watch('seoTitle') ?? ''
  const seoDescVal = watch('seoDesc') ?? ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && (
        <div className="admin-alert admin-alert-error">
          <AlertCircle size={15} />
          {serverError}
        </div>
      )}

      {/* Título e Slug */}
      <div className="admin-form-grid">
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Título *</label>
          <input
            {...register('title')}
            onChange={handleTitleChange}
            className="admin-form-input"
            placeholder="Título do artigo"
          />
          {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Slug *</label>
          <input {...register('slug')} className="admin-form-input" placeholder="url-do-artigo" />
          <span className="admin-form-hint">/artigos/{watch('slug') || 'url-do-artigo'}</span>
          {errors.slug && <span className="admin-form-error">{errors.slug.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Categoria *</label>
          <select {...register('category')} className="admin-form-select">
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resumo */}
      <div className="admin-form-group">
        <label className="admin-form-label">Resumo *</label>
        <textarea
          {...register('excerpt')}
          className="admin-form-textarea"
          rows={2}
          placeholder="Resumo do artigo (max 500 caracteres)"
          style={{ minHeight: '64px' }}
        />
        {errors.excerpt && <span className="admin-form-error">{errors.excerpt.message}</span>}
      </div>

      {/* Conteúdo */}
      <div className="admin-form-group">
        <label className="admin-form-label">Conteúdo * <span className="admin-form-hint" style={{ fontWeight: 400, textTransform: 'none' }}>(Markdown)</span></label>
        <textarea
          {...register('content')}
          className="admin-form-textarea"
          rows={16}
          placeholder="# Título&#10;&#10;Escreva o conteúdo em Markdown..."
          style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
        />
        {errors.content && <span className="admin-form-error">{errors.content.message}</span>}
      </div>

      {/* Imagem e status */}
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Imagem de capa (URL)</label>
          <input {...register('coverImage')} className="admin-form-input" placeholder="https://..." />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status *</label>
          <select {...register('status')} className="admin-form-select">
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Data de publicação</label>
          <input {...register('publishedAt')} type="date" className="admin-form-input" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Autor</label>
          <input {...register('author')} className="admin-form-input" />
        </div>
      </div>

      <label className="admin-form-checkbox-group">
        <input {...register('featured')} type="checkbox" className="admin-form-checkbox" />
        <span className="admin-form-checkbox-label">Artigo em destaque</span>
      </label>

      {/* SEO */}
      <div className="admin-form-section-title">SEO</div>
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Título SEO</label>
          <input {...register('seoTitle')} className="admin-form-input" placeholder={title} maxLength={70} />
          <span className="admin-form-hint">{seoTitleVal.length}/70</span>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Descrição SEO</label>
          <input {...register('seoDesc')} className="admin-form-input" maxLength={160} />
          <span className="admin-form-hint">{seoDescVal.length}/160</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={14} />
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" onClick={() => router.push('/artigos')} className="admin-btn admin-btn-secondary">
          Cancelar
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="admin-btn admin-btn-danger"
            style={{ marginLeft: 'auto' }}
          >
            <Trash2 size={14} />
            {deleting ? 'Excluindo…' : 'Excluir'}
          </button>
        )}
      </div>
    </form>
  )
}
