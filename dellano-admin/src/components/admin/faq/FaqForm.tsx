'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle } from 'lucide-react'
import type { FaqItem } from '@prisma/client'
import { createFaq, updateFaq, deleteFaq } from '@/lib/actions/faq'

const schema = z.object({
  category: z.enum(['GERAL', 'PROVAS_DIGITAIS', 'INVESTIGACAO', 'HONORARIOS']),
  question: z.string().min(5, 'Pergunta obrigatória'),
  answer: z.string().min(10, 'Resposta obrigatória'),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
})

type FormData = z.infer<typeof schema>

interface Props {
  item?: FaqItem
  id?: string
  isEdit?: boolean
}

export function FaqForm({ item, id, isEdit }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: item?.category ?? 'GERAL',
      question: item?.question ?? '',
      answer: item?.answer ?? '',
      order: item?.order ?? 0,
      active: item?.active ?? true,
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updateFaq(id, data)
      : await createFaq(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    router.push('/faq')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir esta pergunta?')) return
    await deleteFaq(id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Categoria *</label>
          <select {...register('category')} className="admin-form-select">
            <option value="GERAL">Dúvidas gerais</option>
            <option value="PROVAS_DIGITAIS">Provas digitais</option>
            <option value="INVESTIGACAO">Investigação defensiva</option>
            <option value="HONORARIOS">Honorários e atendimento</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Ordem</label>
          <input {...register('order')} type="number" className="admin-form-input" min={0} />
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Pergunta *</label>
          <input {...register('question')} className="admin-form-input" placeholder="Como funciona…?" />
          {errors.question && <span className="admin-form-error">{errors.question.message}</span>}
        </div>

        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Resposta *</label>
          <textarea {...register('answer')} className="admin-form-textarea" rows={5} placeholder="Resposta completa…" />
          {errors.answer && <span className="admin-form-error">{errors.answer.message}</span>}
        </div>
      </div>

      <label className="admin-form-checkbox-group">
        <input {...register('active')} type="checkbox" className="admin-form-checkbox" />
        <span className="admin-form-checkbox-label">Pergunta ativa (visível no site)</span>
      </label>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary"><Save size={14} />{saving ? 'Salvando…' : 'Salvar'}</button>
        <button type="button" onClick={() => router.push('/faq')} className="admin-btn admin-btn-secondary">Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="admin-btn admin-btn-danger" style={{ marginLeft: 'auto' }}>
            <Trash2 size={14} />Excluir
          </button>
        )}
      </div>
    </form>
  )
}
