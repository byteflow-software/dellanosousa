'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'
import { SiteKey } from '@prisma/client'
import { saveSobre } from '@/lib/actions/sobre'

const schema = z.object({
  siteKey: z.nativeEnum(SiteKey),
  bioText: z.string().min(20, 'Biografia obrigatória'),
  credentials: z.string().min(1, 'Credenciais obrigatórias'),
  lectures: z.string(),
})

type FormData = z.infer<typeof schema>

interface Props {
  siteKey: SiteKey
  initial?: { bioText: string; credentials: string[]; lectures: string[] }
}

export function SobreForm({ siteKey, initial }: Props) {
  const [serverError, setServerError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteKey,
      bioText: initial?.bioText ?? '',
      credentials: initial?.credentials?.join('\n') ?? '',
      lectures: initial?.lectures?.join('\n') ?? '',
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    setSaved(false)
    const res = await saveSobre(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro'); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && <div className="admin-alert admin-alert-error"><AlertCircle size={15} />{serverError}</div>}
      {saved && <div className="admin-alert admin-alert-success"><CheckCircle size={15} />Salvo com sucesso!</div>}

      <input type="hidden" {...register('siteKey')} />

      <div className="admin-form-group">
        <label className="admin-form-label">Biografia / Texto principal *</label>
        <textarea {...register('bioText')} className="admin-form-textarea" rows={6} placeholder="Advogado criminalista com atuação nacional…" />
        {errors.bioText && <span className="admin-form-error">{errors.bioText.message}</span>}
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Credenciais</label>
        <textarea
          {...register('credentials')}
          className="admin-form-textarea"
          rows={8}
          placeholder={'OAB/CE 04.969 | OAB/PI 25.100\nMembro da ABRACRIM\nCoordenador Nacional das Prerrogativas Digitais — ABRACRIM\n…'}
          style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
        />
        <span className="admin-form-hint">Uma credencial por linha</span>
        {errors.credentials && <span className="admin-form-error">{errors.credentials.message}</span>}
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Palestras / Eventos listados na página Sobre</label>
        <textarea
          {...register('lectures')}
          className="admin-form-textarea"
          rows={5}
          placeholder={'Palestra — Provas Digitais — OAB/CE, 2025\nMesa-redonda — Investigação Defensiva — ABRACRIM, 2025\n…'}
          style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
        />
        <span className="admin-form-hint">Uma entrada por linha</span>
      </div>

      <div>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <Save size={14} />{saving ? 'Salvando…' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  )
}
