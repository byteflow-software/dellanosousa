'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { slugify } from '@/lib/utils'
import type { ActionResult } from '@/types'

const Schema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(80),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras, números e hífens').optional(),
  order: z.number().int().min(0).default(0),
})

type Input = z.infer<typeof Schema>

export async function listCategorias() {
  return prisma.categoria.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { artigos: true } } },
  })
}

export async function getCategoria(id: string) {
  return prisma.categoria.findUnique({ where: { id } })
}

export async function createCategoria(data: Input): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Erro de validação' }

  const slug = parsed.data.slug || slugify(parsed.data.name)

  try {
    const cat = await prisma.categoria.create({
      data: { name: parsed.data.name, slug, order: parsed.data.order ?? 0 },
    })
    revalidatePath('/categorias')
    revalidatePath('/artigos')
    return { success: true, data: { id: cat.id } }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') return { success: false, error: 'Nome ou slug já em uso.' }
    return { success: false, error: 'Erro ao criar categoria.' }
  }
}

export async function updateCategoria(id: string, data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = Schema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Erro de validação' }

  const slug = parsed.data.slug || slugify(parsed.data.name)

  try {
    await prisma.categoria.update({
      where: { id },
      data: { name: parsed.data.name, slug, order: parsed.data.order ?? 0 },
    })
    revalidatePath('/categorias')
    revalidatePath('/artigos')
    return { success: true }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') return { success: false, error: 'Nome ou slug já em uso.' }
    return { success: false, error: 'Erro ao atualizar categoria.' }
  }
}

export async function deleteCategoria(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const count = await prisma.artigo.count({ where: { categoryId: id } })
  if (count > 0) return { success: false, error: `Categoria possui ${count} artigo(s) vinculado(s).` }

  try {
    await prisma.categoria.delete({ where: { id } })
    revalidatePath('/categorias')
    return { success: true }
  } catch {
    return { success: false, error: 'Erro ao excluir categoria.' }
  }
}
