'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import type { Imprensa } from '@prisma/client'
import { SiteKey } from '@prisma/client'
import { createImprensa, updateImprensa, deleteImprensa } from '@/lib/actions/imprensa'
import { SitePicker } from '@/components/admin/SitePicker'
import { ALL_SITES } from '@/lib/sites'

const schema = z.object({
  outlet: z.string().min(1, 'Veículo obrigatório'),
  title: z.string().min(3, 'Título obrigatório'),
  date: z.string().min(4, 'Data obrigatória'),
  url: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  sites: z.array(z.nativeEnum(SiteKey)).min(1, 'Selecione ao menos um site'),
})

type FormData = z.infer<typeof schema>

interface Props {
  item?: Imprensa
  id?: string
  isEdit?: boolean
}

export function ImprensaForm({ item, id, isEdit }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      outlet: item?.outlet ?? '',
      title: item?.title ?? '',
      date: item?.date ?? '',
      url: item?.url ?? '',
      description: item?.description ?? '',
      status: item?.status ?? 'PUBLISHED',
      sites: item?.sites ?? ALL_SITES,
    },
  })

  const sites = watch('sites') ?? ALL_SITES

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updateImprensa(id, data)
      : await createImprensa(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    router.push('/imprensa')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir este item de imprensa?')) return
    await deleteImprensa(id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Veículo *</label>
          <input {...register('outlet')} className="admin-form-input" placeholder="Diário do Nordeste, O Povo…" />
          {errors.outlet && <span className="admin-form-error">{errors.outlet.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Data *</label>
          <input {...register('date')} type="date" className="admin-form-input" />
          {errors.date && <span className="admin-form-error">{errors.date.message}</span>}
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Título da matéria *</label>
          <input {...register('title')} className="admin-form-input" placeholder="Título da matéria ou entrevista" />
          {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">URL (link para a matéria)</label>
          <input {...register('url')} className="admin-form-input" placeholder="https://..." />
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Descrição / Contexto</label>
          <textarea {...register('description')} className="admin-form-textarea" rows={3} placeholder="Breve descrição do contexto da matéria…" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <select {...register('status')} className="admin-form-select">
            <option value="PUBLISHED">Publicado</option>
            <option value="DRAFT">Rascunho</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>
      </div>

      <SitePicker
        value={sites}
        onChange={(next) => setValue('sites', next, { shouldValidate: true })}
        hint="O item aparecerá apenas nos sites selecionados"
      />

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary"><Save size={14} />{saving ? 'Salvando…' : 'Salvar'}</button>
        <button type="button" onClick={() => router.push('/imprensa')} className="admin-btn admin-btn-secondary">Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="admin-btn admin-btn-danger" style={{ marginLeft: 'auto' }}>
            <Trash2 size={14} />Excluir
          </button>
        )}
      </div>
    </form>
  )
}
