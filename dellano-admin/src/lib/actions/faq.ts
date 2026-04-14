'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const FaqSchema = z.object({
  category: z.enum(['GERAL', 'PROVAS_DIGITAIS', 'INVESTIGACAO', 'HONORARIOS']),
  question: z.string().min(5, 'Pergunta obrigatória'),
  answer: z.string().min(10, 'Resposta obrigatória'),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
})

type Input = z.infer<typeof FaqSchema>

export async function createFaq(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = FaqSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const item = await prisma.faqItem.create({ data: parsed.data })
  revalidatePath('/faq')
  return { success: true, data: { id: item.id } }
}

export async function updateFaq(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = FaqSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  await prisma.faqItem.update({ where: { id }, data: parsed.data })
  revalidatePath('/faq')
  return { success: true }
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  await prisma.faqItem.delete({ where: { id } })
  revalidatePath('/faq')
  redirect('/faq')
}

export async function getFaq(id: string) {
  return prisma.faqItem.findUnique({ where: { id } })
}

export async function listFaq() {
  return prisma.faqItem.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
}
