import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticles, getArticleBySlug } from '@/lib/mdx'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const allArticles = getArticles()
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="accent">{article.category}</Badge>
                <span className="text-muted text-xs font-sans">{article.readingTime} min de leitura</span>
              </div>
              <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted font-sans">
                <span>{article.author}</span>
                <span>·</span>
                <time>{formatDate(article.date)}</time>
              </div>
            </header>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-primary mb-10">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>

            <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted prose-p:leading-relaxed prose-a:text-accent prose-strong:text-primary">
              <MDXRemote source={article.content} />
            </div>

            <div className="mt-12 p-6 rounded-xl bg-white border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary flex-shrink-0">
                  <Image
                    src="/images/dellano/dellano-principal.jpg"
                    alt={article.author}
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-primary text-sm mb-0.5">{article.author}</p>
                  <p className="text-muted text-xs leading-relaxed">
                    Advogado criminal especializado em provas digitais e investigação defensiva.
                    Presidente da Comissão de Investigação Defensiva da OAB/CE.
                  </p>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif font-semibold text-primary text-xl mb-6">
                  Artigos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/artigos/${a.slug}`}
                      className="group p-4 rounded-lg border border-primary/10 bg-white hover:border-gold/40 transition-colors"
                    >
                      <Badge variant="accent" className="mb-2">{a.category}</Badge>
                      <p className="font-serif font-medium text-primary text-sm leading-snug group-hover:text-accent transition-colors">
                        {a.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="p-5 rounded-xl bg-primary text-white">
                <p className="font-sans font-semibold text-sm mb-2">Precisa de assessoria?</p>
                <p className="text-white/70 text-xs leading-relaxed mb-4">
                  Nosso escritório atua com especialização em provas digitais e defesa criminal.
                </p>
                <Button href={WHATSAPP_URL} external variant="gold" size="sm" className="w-full justify-center">
                  Plantão 24h
                </Button>
              </div>
              <div className="p-5 rounded-xl bg-white border border-primary/10">
                <p className="font-sans font-semibold text-primary text-sm mb-3">Mais artigos</p>
                {allArticles
                  .filter((a) => a.slug !== slug)
                  .slice(0, 3)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={`/artigos/${a.slug}`}
                      className="block py-2 border-b border-primary/5 last:border-0 font-sans text-xs text-muted hover:text-primary transition-colors leading-relaxed"
                    >
                      {a.title}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
