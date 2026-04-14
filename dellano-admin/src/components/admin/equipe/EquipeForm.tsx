'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import type { MembroEquipe } from '@prisma/client'
import { createMembro, updateMembro, deleteMembro } from '@/lib/actions/equipe'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  role: z.string().min(2, 'Cargo obrigatório'),
  bio: z.string().min(10, 'Bio obrigatória'),
  oab: z.string().optional(),
  linkedin: z.string().optional(),
  hierarchy: z.enum(['principal', 'apoio']),
  expertise: z.string(),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
})

type FormData = z.infer<typeof schema>

interface Props {
  membro?: MembroEquipe
  id?: string
  isEdit?: boolean
}

export function EquipeForm({ membro, id, isEdit }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: membro?.name ?? '',
      role: membro?.role ?? '',
      bio: membro?.bio ?? '',
      oab: membro?.oab ?? '',
      linkedin: membro?.linkedin ?? '',
      hierarchy: (membro?.hierarchy as 'principal' | 'apoio') ?? 'apoio',
      expertise: membro?.expertise?.join(', ') ?? '',
      order: membro?.order ?? 0,
      active: membro?.active ?? true,
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updateMembro(id, data)
      : await createMembro(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    router.push('/equipe')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir este membro?')) return
    await deleteMembro(id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Nome *</label>
          <input {...register('name')} className="admin-form-input" placeholder="Nome completo" />
          {errors.name && <span className="admin-form-error">{errors.name.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Cargo / Função *</label>
          <input {...register('role')} className="admin-form-input" placeholder="Advogado Criminal | Especialista…" />
          {errors.role && <span className="admin-form-error">{errors.role.message}</span>}
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Biografia *</label>
          <textarea {...register('bio')} className="admin-form-textarea" rows={4} placeholder="Breve biografia profissional…" />
          {errors.bio && <span className="admin-form-error">{errors.bio.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">OAB</label>
          <input {...register('oab')} className="admin-form-input" placeholder="OAB/CE 04.969 | OAB/PI 25.100" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">LinkedIn (URL)</label>
          <input {...register('linkedin')} className="admin-form-input" placeholder="https://linkedin.com/in/..." />
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Áreas de Expertise</label>
          <input {...register('expertise')} className="admin-form-input" placeholder="Provas Digitais, Defesa Criminal, Investigação Defensiva (separadas por vírgula)" />
          <span className="admin-form-hint">Separe as áreas por vírgula</span>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Hierarquia</label>
          <select {...register('hierarchy')} className="admin-form-select">
            <option value="principal">Principal (Sócio)</option>
            <option value="apoio">Apoio</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Ordem</label>
          <input {...register('order')} type="number" className="admin-form-input" min={0} />
        </div>
      </div>

      <label className="admin-form-checkbox-group">
        <input {...register('active')} type="checkbox" className="admin-form-checkbox" />
        <span className="admin-form-checkbox-label">Membro ativo (visível no site)</span>
      </label>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary"><Save size={14} />{saving ? 'Salvando…' : 'Salvar'}</button>
        <button type="button" onClick={() => router.push('/equipe')} className="admin-btn admin-btn-secondary">Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="admin-btn admin-btn-danger" style={{ marginLeft: 'auto' }}>
            <Trash2 size={14} />Excluir
          </button>
        )}
      </div>
    </form>
  )
}
