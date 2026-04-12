'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterFormData } from '@/lib/schemas/newsletter'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type Variant = 'dark' | 'light'

type NewsletterSignupProps = {
  variant?: Variant
  title?: string
  description?: string
}

export function NewsletterSignup({
  variant = 'dark',
  title = 'Receba análises técnicas por e-mail',
  description = 'Conteúdos sobre provas digitais, defesa criminal e atualizações de jurisprudência diretamente na sua caixa de entrada.',
}: NewsletterSignupProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  async function onSubmit(data: NewsletterFormData) {
    setStatus('idle')
    setErrorMsg(null)
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setStatus('success')
      reset()
    } else {
      const json = await res.json().catch(() => ({}))
      setStatus('error')
      setErrorMsg(json.error || 'Erro ao cadastrar. Tente novamente.')
    }
  }

  const isDark = variant === 'dark'
  const containerClass = isDark
    ? 'bg-primary text-white'
    : 'bg-white border border-primary/10 text-primary'
  const inputClass = cn(
    'w-full px-4 py-3 rounded-lg text-sm font-sans outline-none transition-colors',
    isDark
      ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15'
      : 'bg-background text-primary placeholder:text-muted/60 border border-primary/15 focus:border-gold'
  )
  const labelMuted = isDark ? 'text-white/70' : 'text-muted'

  return (
    <div className={cn('rounded-2xl p-8 md:p-10', containerClass)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className={cn('font-serif font-semibold text-2xl md:text-3xl mb-3', isDark ? 'text-white' : 'text-primary')}>
            {title}
          </h2>
          <p className={cn('text-sm md:text-base leading-relaxed', labelMuted)}>{description}</p>
        </div>

        {status === 'success' ? (
          <div className={cn('p-5 rounded-lg', isDark ? 'bg-white/10' : 'bg-background')}>
            <p className={cn('font-sans font-semibold text-sm mb-1', isDark ? 'text-white' : 'text-primary')}>
              Inscrição confirmada.
            </p>
            <p className={cn('text-sm', labelMuted)}>
              Você receberá nossas próximas publicações no e-mail cadastrado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
            <div>
              <label htmlFor="newsletter-name" className="sr-only">Nome</label>
              <input
                id="newsletter-name"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
                className={inputClass}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="newsletter-email" className="sr-only">E-mail</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                className={inputClass}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('lgpdConsent')}
                className="mt-0.5 h-4 w-4 rounded"
              />
              <span className={cn('text-xs leading-relaxed', labelMuted)}>
                Autorizo o envio de comunicações por e-mail nos termos da LGPD (Lei nº 13.709/2018).
              </span>
            </label>
            {errors.lgpdConsent && (
              <p className="text-xs text-red-400">{errors.lgpdConsent.message}</p>
            )}

            <Button type="submit" variant="gold" size="md" className="w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Inscrever-se'}
            </Button>

            {status === 'error' && errorMsg && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
