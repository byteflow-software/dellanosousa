export type Service = {
  id: string
  title: string
  description: string
  longDescription: string
  icon: string
  slug: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  text: string
  photo: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  linkedin?: string
  hierarchy: 'principal' | 'apoio'
  expertise?: string[]
}

export type ArticleCategory =
  | 'Provas Digitais'
  | 'Processo Penal'
  | 'Investigação Defensiva'
  | 'Cibercrimes'
  | 'Análises'

export type ArticleFrontmatter = {
  title: string
  slug: string
  date: string
  author: string
  category: ArticleCategory
  excerpt: string
  coverImage: string
  featured: boolean
}

export type Article = ArticleFrontmatter & {
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
