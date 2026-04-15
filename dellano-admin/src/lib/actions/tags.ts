'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { slugify } from '@/lib/utils'
import type { ActionResult } from '@/types'

const Schema = z.object({
  name: z.string().min(1).max(50),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
})

export async function listTags() {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { artigos: true } } },
  })
}

export async function createTag(data: { name: string; slug?: string }): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Erro de validação' }

  const slug = parsed.data.slug || slugify(parsed.data.name)

  try {
    const tag = await prisma.tag.create({ data: { name: parsed.data.name, slug } })
    revalidatePath('/tags')
    return { success: true, data: { id: tag.id } }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') return { success: false, error: 'Tag já existe.' }
    return { success: false, error: 'Erro ao criar tag.' }
  }
}

export async function deleteTag(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }
  try {
    await prisma.tag.delete({ where: { id } })
    revalidatePath('/tags')
    return { success: true }
  } catch {
    return { success: false, error: 'Erro ao excluir tag.' }
  }
}

/** Resolve uma lista de nomes de tags para IDs, criando as que não existirem. */
export async function ensureTagsByNames(names: string[]): Promise<string[]> {
  const cleaned = Array.from(new Set(names.map((n) => n.trim()).filter(Boolean)))
  if (cleaned.length === 0) return []
  const ids: string[] = []
  for (const name of cleaned) {
    const slug = slugify(name)
    const tag = await prisma.tag.upsert({
      where: { slug },
      create: { name, slug },
      update: { name },
    })
    ids.push(tag.id)
  }
  return ids
}
