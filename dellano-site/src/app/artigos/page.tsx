import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/mdx'
import { ArticleCover } from '@/components/artigos/ArticleCover'
import { ArticleSearch } from '@/components/artigos/ArticleSearch'
import { NewsletterSignup } from '@/components/layout/NewsletterSignup'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Artigos e Análises',
  description:
    'Conteúdo técnico sobre provas digitais, processo penal, investigação defensiva e cibercrimes.',
}

export default function ArtigosPage() {
  const articles = getArticles()
  const featured = articles.find((a) => a.featured)
  const others = articles.filter((a) => !a.featured)

  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Conteúdo Técnico
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Artigos e Análises
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Reflexões técnicas e jurídicas sobre provas digitais, processo penal, investigação
            defensiva e direito penal contemporâneo.
          </p>
        </div>

        {featured && (
          <Link
            href={`/artigos/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 mb-12 bg-white"
          >
            <div className="relative w-full aspect-video lg:aspect-auto min-h-[200px] bg-gradient-to-br from-secondary to-primary">
              <ArticleCover
                src={featured.coverImage}
                alt={featured.title}
                category={featured.category}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="gold">Destaque</Badge>
                <Badge variant="accent">{featured.category}</Badge>
              </div>
              <h2 className="font-serif font-semibold text-primary text-xl md:text-2xl leading-snug mb-3 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <time className="text-xs text-muted/70 font-sans">{formatDate(featured.date)}</time>
            </div>
          </Link>
        )}

        {others.length > 0 && <ArticleSearch articles={others} />}

        {articles.length === 0 && (
          <p className="text-muted text-center py-20">Nenhum artigo publicado ainda.</p>
        )}

        <div className="mt-20">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
