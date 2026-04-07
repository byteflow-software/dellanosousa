import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="group flex flex-col h-full bg-white border border-primary/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative w-full aspect-video bg-gradient-to-br from-secondary to-primary">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Badge variant="accent" className="mb-3 self-start">{article.category}</Badge>
        <h3 className="font-serif font-semibold text-primary text-base leading-snug mb-2 flex-1 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted/70 font-sans">
          <time>{formatDate(article.date)}</time>
          <span>{article.readingTime} min de leitura</span>
        </div>
      </div>
    </Link>
  )
}
