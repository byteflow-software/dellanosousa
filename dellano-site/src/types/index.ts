export type LegalBasis = {
  title: string
  articles: string[]
}

export type ServiceFAQ = {
  question: string
  answer: string
}

export type Service = {
  id: string
  title: string
  description: string
  longDescription: string
  icon: string
  slug: string
  metaDescription?: string
  expandedContent?: string[]
  legalBasis?: LegalBasis[]
  faq?: ServiceFAQ[]
}

export type ArticleCategory =
  | 'Provas Digitais'
  | 'Processo Penal'
  | 'Investigação Defensiva'
  | 'Cibercrimes'
  | 'Análises'

export type Article = {
  title: string
  slug: string
  date: string
  author: string
  category: ArticleCategory
  excerpt: string
  coverImage?: string
  featured: boolean
  content: string
  readingTime: number
}

export type Risk = {
  id: string
  title: string
  description: string
  icon: string
}

export type MethodStep = {
  step: number
  title: string
  description: string
}

export type City = {
  name: string
  state: string
}

export type NavigationItem = {
  label: string
  href: string
  external?: boolean
}
