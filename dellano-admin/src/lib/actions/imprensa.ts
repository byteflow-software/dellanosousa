'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const ImprensaSchema = z.object({
  outlet: z.string().min(1, 'Veículo obrigatório'),
  title: z.string().min(3, 'Título obrigatório'),
  date: z.string().min(4, 'Data obrigatória'),
  url: z.string().url('URL inválida').optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
})

type Input = z.infer<typeof ImprensaSchema>

export async function createImprensa(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = ImprensaSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { url, description, ...rest } = parsed.data
  const item = await prisma.imprensa.create({ data: { ...rest, url: url || null, description: description || null } })
  revalidatePath('/imprensa')
  return { success: true, data: { id: item.id } }
}

export async function updateImprensa(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = ImprensaSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { url, description, ...rest } = parsed.data
  await prisma.imprensa.update({ where: { id }, data: { ...rest, url: url || null, description: description || null } })
  revalidatePath('/imprensa')
  return { success: true }
}

export async function deleteImprensa(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  await prisma.imprensa.delete({ where: { id } })
  revalidatePath('/imprensa')
  redirect('/imprensa')
}

export async function getImprensa(id: string) {
  return prisma.imprensa.findUnique({ where: { id } })
}

export async function listImprensa() {
  return prisma.imprensa.findMany({ orderBy: { date: 'desc' } })
}
