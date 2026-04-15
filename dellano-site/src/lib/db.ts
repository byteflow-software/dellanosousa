import { prisma } from './prisma'
import { estimateReadingTime } from './utils'
import type { Article } from '@/types'

const eventTypeLabels: Record<string, string> = {
  PALESTRA: 'Palestra',
  CURSO: 'Curso',
  CONGRESSO: 'Congresso',
  MESA: 'Mesa',
}

const faqCategoryLabels: Record<string, string> = {
  GERAL: 'Dúvidas gerais',
  PROVAS_DIGITAIS: 'Provas digitais',
  INVESTIGACAO: 'Investigação defensiva',
  HONORARIOS: 'Honorários e atendimento',
}

export { eventTypeLabels, faqCategoryLabels }

// ─── Artigos ─────────────────────────────────────────────────────────────────

type ArtigoRow = {
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  featured: boolean
  publishedAt: Date | null
  author: string
  categoria: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
}

function toArticle(row: ArtigoRow): Article {
  return {
    title: row.title,
    slug: row.slug,
    content: row.content,
    excerpt: row.excerpt,
    category: row.categoria?.name ?? 'Sem categoria',
    categorySlug: row.categoria?.slug ?? '',
    coverImage: row.coverImage ?? undefined,
    featured: row.featured,
    date: row.publishedAt?.toISOString().split('T')[0] ?? '',
    author: row.author,
    readingTime: estimateReadingTime(row.content),
    tags: row.tags.map((t) => ({ name: t.name, slug: t.slug })),
  }
}

const artigoInclude = {
  categoria: { select: { name: true, slug: true } },
  tags: { select: { name: true, slug: true } },
} as const

export async function getArticles(): Promise<Article[]> {
  const rows = await prisma.artigo.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    include: artigoInclude,
  })
  return rows.map(toArticle)
}

export async function getArtigoBySlug(slug: string): Promise<Article | null> {
  const row = await prisma.artigo.findUnique({
    where: { slug },
    include: artigoInclude,
  })
  if (!row || row.status !== 'PUBLISHED') return null
  return toArticle(row)
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const rows = await prisma.artigo.findMany({
    where: { status: 'PUBLISHED', featured: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    include: artigoInclude,
  })
  return rows.map(toArticle)
}

export async function getCategorias() {
  return prisma.categoria.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
    select: { name: true, slug: true },
  })
}

// ─── Equipe ──────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  return prisma.membroEquipe.findMany({
    where: { active: true },
    orderBy: [{ hierarchy: 'asc' }, { order: 'asc' }],
  })
}

// ─── Eventos ─────────────────────────────────────────────────────────────────

export async function getPublishedEventos() {
  const rows = await prisma.evento.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { date: 'desc' },
  })
  return rows.map((ev) => ({
    ...ev,
    tipoLabel: eventTypeLabels[ev.tipo] ?? ev.tipo,
  }))
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function getActiveFaqs() {
  return prisma.faqItem.findMany({
    where: { active: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  })
}

export function getFaqCategories() {
  return [
    { value: 'GERAL', label: 'Dúvidas gerais' },
    { value: 'PROVAS_DIGITAIS', label: 'Provas digitais' },
    { value: 'INVESTIGACAO', label: 'Investigação defensiva' },
    { value: 'HONORARIOS', label: 'Honorários e atendimento' },
  ]
}

// ─── Imprensa ────────────────────────────────────────────────────────────────

export async function getPublishedImprensa() {
  return prisma.imprensa.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { date: 'desc' },
  })
}

// ─── Publicações ─────────────────────────────────────────────────────────────

export async function getPublishedPublicacoes() {
  return prisma.publicacao.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ tipo: 'asc' }, { order: 'asc' }, { date: 'desc' }],
  })
}

// ─── Sobre ───────────────────────────────────────────────────────────────────

export async function getSobrePage() {
  return prisma.sobrePage.findFirst()
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function getPageSeo(pageKey: string) {
  return prisma.pageSeo.findUnique({ where: { pageKey } })
}
