'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { SiteKey } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const SobreSchema = z.object({
  siteKey: z.nativeEnum(SiteKey),
  bioText: z.string().min(20, 'Biografia obrigatória'),
  credentials: z.string(),
  lectures: z.string(),
})

type Input = z.infer<typeof SobreSchema>

function parseLines(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
}

export async function saveSobre(data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = SobreSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || 'Erro de validação' }

  const { siteKey, bioText, credentials, lectures } = parsed.data

  await prisma.sobrePage.upsert({
    where: { siteKey },
    update: { bioText, credentials: parseLines(credentials), lectures: parseLines(lectures) },
    create: { siteKey, bioText, credentials: parseLines(credentials), lectures: parseLines(lectures) },
  })

  revalidatePath('/sobre')
  return { success: true }
}

export async function getSobre(siteKey: SiteKey = 'PRINCIPAL') {
  return prisma.sobrePage.findUnique({ where: { siteKey } })
}

export async function listSobre() {
  return prisma.sobrePage.findMany({ orderBy: { siteKey: 'asc' } })
}
