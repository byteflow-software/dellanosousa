import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTagBySlug, getArticlesByTag, getTags } from '@/lib/db'
import { ArticleCard } from '@/components/artigos/ArticleCard'
import { Badge } from '@/components/ui/Badge'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) return {}
  return {
    title: `Artigos sobre "${tag.name}"`,
    description: `Artigos e análises com a tag "${tag.name}" — conteúdo técnico sobre direito penal e provas digitais.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) notFound()

  const articles = await getArticlesByTag(slug)

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <Badge variant="accent" className="mb-4">Tag</Badge>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            #{tag.name}
          </h1>
          <p className="text-muted text-base leading-relaxed">
            {articles.length === 1
              ? '1 artigo publicado com esta tag.'
              : `${articles.length} artigos publicados com esta tag.`}
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-20">Nenhum artigo publicado com esta tag.</p>
        )}
      </div>
    </div>
  )
}
