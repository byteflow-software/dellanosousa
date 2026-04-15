'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const EventoSchema = z.object({
  title: z.string().min(3, 'Título obrigatório'),
  tipo: z.enum(['PALESTRA', 'CURSO', 'CONGRESSO', 'MESA']),
  organizer: z.string().min(1, 'Organizador obrigatório'),
  location: z.string().min(1, 'Local obrigatório'),
  date: z.string().min(4, 'Data obrigatória'),
  role: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
})

type Input = z.infer<typeof EventoSchema>

export async function createEvento(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = EventoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { role, description, ...rest } = parsed.data
  const evento = await prisma.evento.create({ data: { ...rest, role: role || null, description: description || null } })
  revalidatePath('/eventos')
  return { success: true, data: { id: evento.id } }
}

export async function updateEvento(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = EventoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { role, description, ...rest } = parsed.data
  await prisma.evento.update({ where: { id }, data: { ...rest, role: role || null, description: description || null } })
  revalidatePath('/eventos')
  return { success: true }
}

export async function deleteEvento(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  await prisma.evento.delete({ where: { id } })
  revalidatePath('/eventos')
  redirect('/eventos')
}

export async function getEvento(id: string) {
  return prisma.evento.findUnique({ where: { id } })
}

export async function listEventos() {
  return prisma.evento.findMany({ orderBy: { date: 'desc' } })
}
