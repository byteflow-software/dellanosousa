# Data Model: Redesign dellanosousa.com.br — Next.js

**Branch**: `001-nextjs-redesign` | **Date**: 2026-04-06

Todos os dados são estáticos nesta fase (arquivos TypeScript + MDX). Sem banco de dados.

---

## Entidades

### Service (Serviço)

**Arquivo**: `src/data/services.ts`

```typescript
type Service = {
  id: string
  title: string
  description: string      // 1 linha — para o card da home
  longDescription: string  // parágrafo — para página de áreas de atuação
  icon: string             // nome do ícone Lucide
  slug: string             // para links internos
}
```

**Valores** (6 registros):
- `provas-digitais` — Provas Digitais
- `defesa-criminal` — Defesa Criminal Estratégica
- `investigacao-defensiva` — Investigação Defensiva
- `assistencia-tecnica` — Assistência Técnica para Escritórios
- `cadeia-custodia` — Cadeia de Custódia e Validação
- `consultoria-urgente` — Consultoria em Casos Urgentes

---

### Testimonial (Depoimento)

**Arquivo**: `src/data/testimonials.ts`

```typescript
type Testimonial = {
  id: string
  name: string
  role: string             // cargo ou contexto (ex: "Advogado Criminal")
  text: string             // texto do depoimento (2-4 frases)
  photo: string            // caminho da imagem em /public/images/testimonials/
}
```

**Valores** (4 registros): Talvane Moura, Smailly Carvalho, Carlos Eduardo Costa, Emilio Assumpção

---

### TeamMember (Membro da Equipe)

**Arquivo**: `src/data/team.ts`

```typescript
type TeamMember = {
  id: string
  name: string
  role: string
  bio: string              // mini bio (2-3 frases)
  photo: string            // caminho da imagem
  linkedin?: string        // URL do perfil LinkedIn (opcional)
  hierarchy: 'principal' | 'apoio'
  expertise?: string[]     // competências (opcional, para Dellano)
}
```

**Hierarquia**: `principal` = Dellano (card grande, hero-style); `apoio` = demais membros

---

### Article (Artigo)

**Fonte**: Frontmatter dos arquivos `.mdx` em `src/content/artigos/`

```typescript
type ArticleFrontmatter = {
  title: string
  slug: string
  date: string             // ISO 8601: "2025-01-15"
  author: string           // padrão: "Dellano Sousa"
  category: ArticleCategory
  excerpt: string          // resumo de 1-2 frases para cards
  coverImage: string       // caminho da imagem de capa
  featured: boolean        // se aparece na seção de artigos em destaque da home
}

type ArticleCategory =
  | 'Provas Digitais'
  | 'Processo Penal'
  | 'Investigação Defensiva'
  | 'Cibercrimes'
  | 'Análises'

type Article = ArticleFrontmatter & {
  content: string          // conteúdo MDX compilado
  readingTime: number      // estimativa em minutos
}
```

**Artigos iniciais** (3 arquivos):
- `prova-digital-cadeia-custodia.mdx` — category: Provas Digitais, featured: true
- `investigacao-defensiva-estrategia.mdx` — category: Investigação Defensiva, featured: false
- `cibercrimes-evidencias-digitais.mdx` — category: Cibercrimes, featured: false

---

### Risk (Risco)

**Arquivo**: `src/data/risks.ts`

```typescript
type Risk = {
  id: string
  title: string
  description: string      // 1-2 frases explicando o risco
  icon: string             // nome do ícone Lucide (AlertTriangle, etc.)
}
```

**Valores** (5 registros):
- Prints sem cadeia de custódia
- Celular acessado de forma inadequada
- Arquivos em nuvem sem preservação
- Extrações mal interpretadas
- Dados descontextualizados

---

### MethodStep (Etapa do Método)

**Arquivo**: `src/data/method.ts`

```typescript
type MethodStep = {
  step: number             // 1 a 5
  title: string
  description: string      // 2-3 frases
}
```

**Valores** (5 registros): Análise preliminar → Delimitação técnica → Estratégia jurídico-probatória → Parecer/atuação técnica → Acompanhamento processual

---

### City (Cidade de Presença)

**Arquivo**: `src/data/cities.ts`

```typescript
type City = {
  name: string
  state: string
}
```

**Valores**: Fortaleza/CE, Teresina/PI, Brasília/DF, Ribeirão Preto/SP

---

### NavigationItem (Item de Navegação)

**Arquivo**: `src/data/navigation.ts`

```typescript
type NavigationItem = {
  label: string
  href: string
  external?: boolean
}
```

**Valores**: Início (`/`), Sobre (`/sobre`), Áreas de Atuação (`/areas-de-atuacao`), Provas Digitais (`/provas-digitais`), Equipe (`/equipe`), Artigos (`/artigos`), Contato (`/contato`)

---

## Tipos Globais

**Arquivo**: `src/types/index.ts`

Exporta todos os tipos acima + tipos de props dos componentes principais.

---

## Fluxo de Dados

```
MDX files (src/content/artigos/)
  → lib/mdx.ts (compileMDX, getArticles, getArticleBySlug)
  → app/artigos/page.tsx (listagem)
  → app/artigos/[slug]/page.tsx (individual, generateStaticParams)

data/*.ts (estáticos)
  → importados diretamente pelos componentes de página/seção
  → sem fetch, sem API, sem cache layer necessário

app/api/contato/route.ts (POST)
  → valida com Zod
  → envia via Resend SDK
  → retorna { success: true } ou { error: string }
  → client redireciona para /obrigado em sucesso
```
