import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/db'
import { Badge } from '@/components/ui/Badge'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ArticleCover } from '@/components/artigos/ArticleCover'
import { formatDate } from '@/lib/utils'
import { home } from '@/content'

const { featuredArticles } = home

export async function FeaturedArticles() {
  const articles = await getFeaturedArticles()

  if (articles.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              title={featuredArticles.title}
              subtitle={featuredArticles.subtitle}
              className="mb-0"
            />
            <Link
              href="/artigos"
              className="hidden md:block text-sm font-sans font-medium text-gold hover:underline whitespace-nowrap ml-8"
            >
              {featuredArticles.seeAllLabel}
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article, i) => (
            <AnimatedSection key={article.slug} delay={i * 0.1}>
              <Link
                href={`/artigos/${article.slug}`}
                className="group flex flex-col h-full bg-white border border-primary/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative w-full aspect-video bg-gradient-to-br from-secondary to-primary">
                  <ArticleCover
                    src={article.coverImage}
                    alt={article.title}
                    category={article.category}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Badge variant="accent" className="mb-3 self-start">
                    {article.category}
                  </Badge>
                  <h3 className="font-serif font-semibold text-primary text-base leading-snug mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>
                  <time className="text-xs text-muted/70 font-sans">
                    {formatDate(article.date)}
                  </time>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/artigos" className="text-sm font-sans font-medium text-gold hover:underline">
            {featuredArticles.seeAllLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
