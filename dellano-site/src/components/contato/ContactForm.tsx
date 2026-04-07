'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { contactSchema, contactSubjects, type ContactFormData } from '@/lib/schemas/contact'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

export function ContactForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setServerError(null)
    const res = await fetch('/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      router.push('/obrigado')
    } else {
      const json = await res.json()
      setServerError(json.error || 'Erro ao enviar. Tente novamente.')
    }
  }

  const fieldClass = (error?: string) =>
    cn(
      'w-full px-4 py-3 rounded-lg border font-sans text-sm text-primary bg-white transition-colors outline-none',
      'focus:ring-2 focus:ring-primary/20 focus:border-primary/50',
      error ? 'border-red-400' : 'border-primary/20'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-sans font-medium text-primary mb-1">
          Nome completo <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome completo"
          {...register('name')}
          className={fieldClass(errors.name?.message)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-sans font-medium text-primary mb-1">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={fieldClass(errors.email?.message)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-sans font-medium text-primary mb-1">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(85) 99999-9999"
            {...register('phone')}
            className={fieldClass(errors.phone?.message)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-sans font-medium text-primary mb-1">
          Assunto <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          {...register('subject')}
          className={fieldClass(errors.subject?.message)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        >
          <option value="">Selecione o assunto</option>
          {contactSubjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-sans font-medium text-primary mb-1">
          Mensagem <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Descreva brevemente seu caso ou dúvida..."
          {...register('message')}
          className={cn(fieldClass(errors.message?.message), 'resize-none')}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{serverError}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-red-700 underline mt-1 block"
          >
            Ou entre em contato via WhatsApp →
          </a>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full justify-center" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  )
}
