'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'
import type { PageSeo } from '@prisma/client'

const schema = z.object({
  pageKey: z.string(),
  title: z.string().min(5).max(70),
  description: z.string().min(10).max(160),
  ogTitle: z.string().max(70).optional(),
  ogDesc: z.string().max(160).optional(),
  noIndex: z.boolean().default(false),
})

type FormData = z.infer<typeof schema>

interface Props {
  page: PageSeo
  pageLabel: string
  onSave: (data: FormData) => Promise<{ success: boolean; error?: string }>
}

export function SeoForm({ page, pageLabel, onSave }: Props) {
  const [serverError, setServerError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pageKey: page.pageKey,
      title: page.title,
      description: page.description,
      ogTitle: page.ogTitle ?? '',
      ogDesc: page.ogDesc ?? '',
      noIndex: page.noIndex,
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    setSaved(false)
    const res = await onSave(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const title = watch('title') ?? ''
  const desc = watch('description') ?? ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}
      {saved && <div className="admin-alert admin-alert-success"><CheckCircle size={15} />Salvo!</div>}

      <input type="hidden" {...register('pageKey')} />

      <div
        style={{
          padding: '0.75rem 1rem',
          background: '#F8FAFC',
          borderRadius: '0.375rem',
          border: '1px solid var(--color-border)',
          fontSize: '0.8125rem',
          color: 'var(--color-muted)',
          marginBottom: '0.5rem',
        }}
      >
        Rota: <strong style={{ color: 'var(--color-primary)' }}>/{page.pageKey === 'home' ? '' : page.pageKey}</strong>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Título SEO *</label>
        <input {...register('title')} className="admin-form-input" maxLength={70} />
        <span className={`admin-form-hint${title.length > 60 ? ' admin-form-error' : ''}`}>{title.length}/70 {title.length > 60 && '— próximo do limite'}</span>
        {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Descrição *</label>
        <textarea {...register('description')} className="admin-form-textarea" rows={3} maxLength={160} />
        <span className={`admin-form-hint${desc.length > 145 ? ' admin-form-error' : ''}`}>{desc.length}/160 {desc.length > 145 && '— próximo do limite'}</span>
        {errors.description && <span className="admin-form-error">{errors.description.message}</span>}
      </div>

      <div className="admin-form-section-title">Open Graph (Redes Sociais)</div>

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">OG Title</label>
          <input {...register('ogTitle')} className="admin-form-input" placeholder="Deixe em branco para usar o título SEO" maxLength={70} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">OG Description</label>
          <input {...register('ogDesc')} className="admin-form-input" placeholder="Deixe em branco para usar a descrição SEO" maxLength={160} />
        </div>
      </div>

      <label className="admin-form-checkbox-group">
        <input {...register('noIndex')} type="checkbox" className="admin-form-checkbox" />
        <span className="admin-form-checkbox-label">noIndex (impede indexação desta página)</span>
      </label>

      <div>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={14} />{saving ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
