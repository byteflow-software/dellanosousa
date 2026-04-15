'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const ArtigoSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  slug: z.string().min(2, 'Slug inválido').regex(/^[a-z0-9-]+$/, 'Slug: apenas letras, números e hífens'),
  excerpt: z.string().min(10, 'Resumo muito curto').max(500, 'Resumo muito longo'),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  category: z.enum(['PROVAS_DIGITAIS', 'PROCESSO_PENAL', 'INVESTIGACAO_DEFENSIVA', 'CIBERCRIMES', 'ANALISES']),
  coverImage: z.string().url('URL inválida').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
  author: z.string().default('Dellano Sousa'),
  seoTitle: z.string().max(70).optional().or(z.literal('')),
  seoDesc: z.string().max(160).optional().or(z.literal('')),
})

type ArtigoInput = z.infer<typeof ArtigoSchema>

function toDate(val?: string) {
  if (!val) return null
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

export async function createArtigo(data: ArtigoInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = ArtigoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { coverImage, seoTitle, seoDesc, publishedAt, ...rest } = parsed.data

  try {
    const artigo = await prisma.artigo.create({
      data: {
        ...rest,
        coverImage: coverImage || null,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
        publishedAt: toDate(publishedAt),
      },
    })
    revalidatePath('/artigos')
    return { success: true, data: { id: artigo.id } }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') return { success: false, error: 'Este slug já está em uso.' }
    return { success: false, error: 'Erro ao criar artigo.' }
  }
}

export async function updateArtigo(id: string, data: ArtigoInput): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = ArtigoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { coverImage, seoTitle, seoDesc, publishedAt, ...rest } = parsed.data

  try {
    await prisma.artigo.update({
      where: { id },
      data: {
        ...rest,
        coverImage: coverImage || null,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
        publishedAt: toDate(publishedAt),
      },
    })
    revalidatePath('/artigos')
    revalidatePath(`/artigos/${id}`)
    return { success: true }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') return { success: false, error: 'Este slug já está em uso.' }
    return { success: false, error: 'Erro ao atualizar artigo.' }
  }
}

export async function deleteArtigo(id: string): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  try {
    await prisma.artigo.delete({ where: { id } })
    revalidatePath('/artigos')
    redirect('/artigos')
  } catch {
    return { success: false, error: 'Erro ao excluir artigo.' }
  }
}

export async function getArtigo(id: string) {
  return prisma.artigo.findUnique({ where: { id } })
}

export async function listArtigos() {
  return prisma.artigo.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, title: true, slug: true, category: true, status: true, featured: true, publishedAt: true, updatedAt: true },
  })
}
