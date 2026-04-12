import { z } from 'zod'

export const newsletterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  lgpdConsent: z
    .boolean()
    .refine((v) => v === true, { message: 'É necessário autorizar o envio dos conteúdos' }),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>
