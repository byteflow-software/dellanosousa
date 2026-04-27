'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { SiteKey } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const EquipeSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  role: z.string().min(2, 'Cargo obrigatório'),
  bio: z.string().min(10, 'Bio obrigatória'),
  photo: z.string().optional().or(z.literal('')),
  oab: z.string().optional().or(z.literal('')),
  linkedin: z.string().url('URL LinkedIn inválida').optional().or(z.literal('')),
  hierarchy: z.enum(['principal', 'apoio']),
  expertise: z.string(), // CSV string, será convertida para array
  order: z.number().int().default(0),
  active: z.boolean().default(true),
  sites: z.array(z.nativeEnum(SiteKey)).min(1, 'Selecione ao menos um site'),
})

type Input = z.infer<typeof EquipeSchema>

function parseExpertise(csv: string): string[] {
  return csv.split(',').map((s) => s.trim()).filter(Boolean)
}

export async function createMembro(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = EquipeSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { expertise, oab, linkedin, photo, ...rest } = parsed.data
  const membro = await prisma.membroEquipe.create({
    data: { ...rest, expertise: parseExpertise(expertise), oab: oab || null, linkedin: linkedin || null, photo: photo || null },
  })
  revalidatePath('/equipe')
  return { success: true, data: { id: membro.id } }
}

export async function updateMembro(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = EquipeSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { expertise, oab, linkedin, photo, ...rest } = parsed.data
  await prisma.membroEquipe.update({
    where: { id },
    data: { ...rest, expertise: parseExpertise(expertise), oab: oab || null, linkedin: linkedin || null, photo: photo || null },
  })
  revalidatePath('/equipe')
  return { success: true }
}

export async function deleteMembro(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  await prisma.membroEquipe.delete({ where: { id } })
  revalidatePath('/equipe')
  redirect('/equipe')
}

export async function getMembro(id: string) {
  return prisma.membroEquipe.findUnique({ where: { id } })
}

export async function listMembros() {
  return prisma.membroEquipe.findMany({ orderBy: [{ hierarchy: 'asc' }, { order: 'asc' }] })
}
