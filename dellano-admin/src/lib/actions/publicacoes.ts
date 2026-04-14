'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const PublicacaoSchema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  venue: z.string().min(1, 'Veículo obrigatório'),
  tipo: z.enum(['MIDIA', 'PUBLICACAO_ACADEMICA']),
  url: z.string().url('URL inválida').optional().or(z.literal('')),
  date: z.string().min(4, 'Data obrigatória'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  order: z.number().int().default(0),
})

type Input = z.infer<typeof PublicacaoSchema>

export async function createPublicacao(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = PublicacaoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const { url, ...rest } = parsed.data
  const pub = await prisma.publicacao.create({ data: { ...rest, url: url || null } })
  revalidatePath('/publicacoes')
  return { success: true, data: { id: pub.id } }
}

export async function updatePublicacao(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = PublicacaoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const { url, ...rest } = parsed.data
  await prisma.publicacao.update({ where: { id }, data: { ...rest, url: url || null } })
  revalidatePath('/publicacoes')
  return { success: true }
}

export async function deletePublicacao(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  await prisma.publicacao.delete({ where: { id } })
  revalidatePath('/publicacoes')
  redirect('/publicacoes')
}

export async function getPublicacao(id: string) {
  return prisma.publicacao.findUnique({ where: { id } })
}

export async function listPublicacoes() {
  return prisma.publicacao.findMany({ orderBy: [{ tipo: 'asc' }, { order: 'asc' }, { date: 'desc' }] })
}
