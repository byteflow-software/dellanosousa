'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import type { Evento } from '@prisma/client'
import { createEvento, updateEvento, deleteEvento } from '@/lib/actions/eventos'

const schema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  tipo: z.enum(['PALESTRA', 'CURSO', 'CONGRESSO', 'MESA']),
  organizer: z.string().min(1, 'Organizador obrigatório'),
  location: z.string().min(1, 'Local obrigatório'),
  date: z.string().min(4, 'Data obrigatória'),
  role: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
})

type FormData = z.infer<typeof schema>

interface Props {
  evento?: Evento
  id?: string
  isEdit?: boolean
}

export function EventoForm({ evento, id, isEdit }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: evento?.title ?? '',
      tipo: evento?.tipo ?? 'PALESTRA',
      organizer: evento?.organizer ?? '',
      location: evento?.location ?? '',
      date: evento?.date ?? '',
      role: evento?.role ?? '',
      description: evento?.description ?? '',
      status: evento?.status ?? 'PUBLISHED',
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updateEvento(id, data)
      : await createEvento(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    router.push('/eventos')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir este evento?')) return
    await deleteEvento(id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Título do evento *</label>
          <input {...register('title')} className="admin-form-input" placeholder="Título do evento ou palestra" />
          {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Tipo *</label>
          <select {...register('tipo')} className="admin-form-select">
            <option value="PALESTRA">Palestra</option>
            <option value="CURSO">Curso</option>
            <option value="CONGRESSO">Congresso</option>
            <option value="MESA">Mesa de Debate</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Organizador *</label>
          <input {...register('organizer')} className="admin-form-input" placeholder="OAB/CE, ABRACRIM, ESA…" />
          {errors.organizer && <span className="admin-form-error">{errors.organizer.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Local *</label>
          <input {...register('location')} className="admin-form-input" placeholder="Fortaleza/CE, São Paulo/SP…" />
          {errors.location && <span className="admin-form-error">{errors.location.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Data *</label>
          <input {...register('date')} type="date" className="admin-form-input" />
          {errors.date && <span className="admin-form-error">{errors.date.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Papel / Função</label>
          <input {...register('role')} className="admin-form-input" placeholder="Palestrante, Debatedor, Professor…" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <select {...register('status')} className="admin-form-select">
            <option value="PUBLISHED">Publicado</option>
            <option value="DRAFT">Rascunho</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Descrição</label>
          <textarea {...register('description')} className="admin-form-textarea" rows={3} placeholder="Breve descrição do evento…" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary"><Save size={14} />{saving ? 'Salvando…' : 'Salvar'}</button>
        <button type="button" onClick={() => router.push('/eventos')} className="admin-btn admin-btn-secondary">Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="admin-btn admin-btn-danger" style={{ marginLeft: 'auto' }}>
            <Trash2 size={14} />Excluir
          </button>
        )}
      </div>
    </form>
  )
}
