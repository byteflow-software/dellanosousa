'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, AlertCircle } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { createCategoria, updateCategoria } from '@/lib/actions/categorias'

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(80),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras, números e hífens'),
  order: z.number().int().min(0),
})

interface FormValues {
  name: string
  slug: string
  order: number
}

interface Props {
  id?: string
  initial?: { name: string; slug: string; order: number }
}

export function CategoriaForm({ id, initial }: Props) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? '',
      slug: initial?.slug ?? '',
      order: initial?.order ?? 0,
    },
  })

  function onName(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setValue('name', v)
    if (!id) setValue('slug', slugify(v))
  }

  async function onSubmit(values: FormValues) {
    setSaving(true)
    setError('')
    const res = id ? await updateCategoria(id, values) : await createCategoria(values)
    setSaving(false)
    if (!res.success) { setError(res.error ?? 'Erro'); return }
    router.push('/categorias')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {error && (
        <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{error}</div>
      )}
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Nome *</label>
          <input {...register('name')} onChange={onName} className="admin-form-input" />
          {errors.name && <span className="admin-form-error">{errors.name.message}</span>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Slug *</label>
          <input {...register('slug')} className="admin-form-input" />
          <span className="admin-form-hint">/artigos?categoria={watch('slug') || 'slug'}</span>
          {errors.slug && <span className="admin-form-error">{errors.slug.message}</span>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Ordem</label>
          <input {...register('order', { valueAsNumber: true })} type="number" min={0} className="admin-form-input" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={14} /> {saving ? 'Salvando…' : 'Salvar'}
        </button>
        <button type="button" onClick={() => router.push('/categorias')} className="admin-btn admin-btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}
