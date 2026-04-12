import { z } from 'zod'
import { brazilianStates } from '@/data/brazilian-states'

export const contactSubjects = [
  { value: 'defesa-criminal', label: 'Defesa Criminal' },
  { value: 'provas-digitais', label: 'Provas Digitais' },
  { value: 'investigacao', label: 'Investigação Defensiva' },
  { value: 'assistencia-tecnica', label: 'Assistência Técnica' },
  { value: 'urgente', label: 'Caso Urgente' },
  { value: 'outro', label: 'Outro assunto' },
] as const

const subjectValues = contactSubjects.map((s) => s.value) as [string, ...string[]]
const stateValues = brazilianStates.map((s) => s.value) as [string, ...string[]]

export const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  state: z.enum(stateValues, { error: 'Selecione seu estado' }),
  subject: z.enum(subjectValues, { error: 'Selecione um assunto' }),
  message: z.string().min(20, 'Mensagem deve ter pelo menos 20 caracteres'),
  lgpdConsent: z
    .boolean()
    .refine((v) => v === true, { message: 'É necessário autorizar o tratamento dos dados' }),
})

export type ContactFormData = z.infer<typeof contactSchema>
