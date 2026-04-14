'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import type { ActionResult } from '@/types'

const SobreSchema = z.object({
  bioText: z.string().min(20, 'Biografia obrigatória'),
  credentials: z.string(), // uma por linha
  lectures: z.string(),    // uma por linha
})

type Input = z.infer<typeof SobreSchema>

function parseLines(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
}

export async function saveSobre(data: Input): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Não autorizado' }

  const parsed = SobreSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message }

  const { bioText, credentials, lectures } = parsed.data

  await prisma.sobrePage.upsert({
    where: { id: '1' },
    update: { bioText, credentials: parseLines(credentials), lectures: parseLines(lectures) },
    create: { id: '1', bioText, credentials: parseLines(credentials), lectures: parseLines(lectures) },
  })

  revalidatePath('/sobre')
  return { success: true }
}

export async function getSobre() {
  return prisma.sobrePage.findUnique({ where: { id: '1' } })
}
