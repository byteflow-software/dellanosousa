'use client'

import { useMemo, useState } from 'react'
import { ArticleCard } from './ArticleCard'
import { Badge } from '@/components/ui/Badge'
import type { Article, ArticleCategory } from '@/types'

type ArticleSearchProps = {
  articles: Article[]
}

export function ArticleSearch({ articles }: ArticleSearchProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ArticleCategory | 'todos'>('todos')

  const categories = useMemo(() => {
    const set = new Set<ArticleCategory>()
    articles.forEach((a) => set.add(a.category))
    return Array.from(set)
  }, [articles])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      const matchesCategory = category === 'todos' || a.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      )
    })
  }, [articles, query, category])

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center">
        <label className="flex-1 relative">
          <span className="sr-only">Buscar artigo</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, autor ou palavra-chave"
            className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-muted/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('todos')}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${
              category === 'todos'
                ? 'bg-primary text-white'
                : 'bg-white border border-primary/15 text-muted hover:border-gold/40 hover:text-primary'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${
                category === cat
                  ? 'bg-primary text-white'
                  : 'bg-white border border-primary/15 text-muted hover:border-gold/40 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Badge variant="accent" className="mb-3">Sem resultados</Badge>
          <p className="text-muted text-sm">
            Nenhum artigo corresponde à busca atual. Ajuste os filtros ou tente outra palavra-chave.
          </p>
        </div>
      )}
    </div>
  )
}
