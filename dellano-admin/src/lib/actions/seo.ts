'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const SeoSchema = z.object({
  pageKey: z.string().min(1),
  title: z.string().min(5, 'Título SEO obrigatório').max(70, 'Máximo 70 caracteres'),
  description: z.string().min(10, 'Descrição obrigatória').max(160, 'Máximo 160 caracteres'),
  ogTitle: z.string().max(70).optional().or(z.literal('')),
  ogDesc: z.string().max(160).optional().or(z.literal('')),
  noIndex: z.boolean().default(false),
})

type Input = z.infer<typeof SeoSchema>

export async function saveSeo(data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = SeoSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const { pageKey, ogTitle, ogDesc, ...rest } = parsed.data

  await prisma.pageSeo.upsert({
    where: { pageKey },
    update: { ...rest, ogTitle: ogTitle || null, ogDesc: ogDesc || null },
    create: { pageKey, ...rest, ogTitle: ogTitle || null, ogDesc: ogDesc || null },
  })

  revalidatePath('/seo')
  return { success: true }
}

export async function listSeo() {
  return prisma.pageSeo.findMany({ orderBy: { pageKey: 'asc' } })
}

export async function getSeoByKey(pageKey: string) {
  return prisma.pageSeo.findUnique({ where: { pageKey } })
}
