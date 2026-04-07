import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Article, ArticleCategory, ArticleFrontmatter } from '@/types'
import { estimateReadingTime } from './utils'

const articlesDirectory = path.join(process.cwd(), 'src/content/artigos')

function getArticleFiles(): string[] {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs.readdirSync(articlesDirectory).filter((f) => f.endsWith('.mdx'))
}

function parseFrontmatter(fileContents: string, slug: string): Article {
  const { data, content } = matter(fileContents)
  const frontmatter = data as ArticleFrontmatter
  return {
    ...frontmatter,
    slug: frontmatter.slug || slug,
    content,
    readingTime: estimateReadingTime(content),
  }
}

export function getArticles(): Article[] {
  const files = getArticleFiles()
  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(articlesDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return parseFrontmatter(fileContents, slug)
  })
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return parseFrontmatter(fileContents, slug)
}

export function getFeaturedArticles(): Article[] {
  return getArticles().filter((a) => a.featured).slice(0, 3)
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getArticles().filter((a) => a.category === category)
}
