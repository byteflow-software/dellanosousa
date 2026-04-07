# Implementation Plan: Redesign dellanosousa.com.br — Next.js

**Branch**: `001-nextjs-redesign` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nextjs-redesign/spec.md`

---

## Summary

Redesign completo do site dellanosousa.com.br (WordPress → Next.js 15) para reposicionar o escritório como boutique jurídico especializado em provas digitais e defesa criminal estratégica. O site terá 11 rotas públicas, sistema de blog em MDX, formulário de contato com envio por e-mail, animações Framer Motion e identidade visual premium com paleta azul-marinho + gold.

---

## Technical Context

**Language/Version**: TypeScript 5+ / Node.js 20 LTS
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS 3.4+, Framer Motion 11, Lucide React, React Hook Form + Zod, next-mdx-remote, Resend (e-mail), next-sitemap
**Storage**: Arquivos MDX locais (conteúdo dos artigos), dados estáticos TypeScript (serviços, depoimentos, equipe)
**Testing**: Lint (ESLint + TypeScript strict), build check (`next build`); testes E2E com Playwright são fase 2
**Target Platform**: Web — Vercel Edge Network; SSG para rotas estáticas, SSR mínimo para API Route
**Project Type**: Web application (site institucional + blog)
**Performance Goals**: LCP < 2s em 4G, CLS < 0.1, Lighthouse 90+
**Constraints**: Zero banco de dados nesta fase; sem autenticação; conteúdo MDX local; deploy Vercel
**Scale/Scope**: ~11 rotas, ~6 componentes de página, ~20 componentes UI, 3 artigos iniciais

---

## Constitution Check

*Constitution ainda não foi definida para este projeto (template vazio). Nenhum gate a verificar nesta fase.*

---

## Project Structure

### Documentation (this feature)

```text
specs/001-nextjs-redesign/
├── plan.md              ← este arquivo
├── research.md          ← decisões técnicas e alternativas avaliadas
├── data-model.md        ← entidades e contratos de dados
├── quickstart.md        ← guia de setup do ambiente de desenvolvimento
├── contracts/
│   └── contact-api.md  ← contrato da API Route de contato
└── tasks.md             ← gerado pelo /speckit-tasks
```

### Source Code (repository root)

```text
dellano-site/                        ← criado via create-next-app
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Layout raiz (fontes, header, footer, WhatsApp float)
│   │   ├── page.tsx                 # Home (10 seções)
│   │   ├── sobre/page.tsx
│   │   ├── areas-de-atuacao/page.tsx
│   │   ├── provas-digitais/page.tsx
│   │   ├── equipe/page.tsx
│   │   ├── artigos/
│   │   │   ├── page.tsx             # Hub de artigos
│   │   │   └── [slug]/page.tsx      # Artigo individual (SSG)
│   │   ├── publicacoes/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── politica-de-privacidade/page.tsx
│   │   ├── politica-de-cookies/page.tsx
│   │   ├── obrigado/page.tsx
│   │   ├── not-found.tsx
│   │   └── api/
│   │       └── contato/route.ts     # POST handler → Resend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── WhatsAppFloat.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── AnimatedSection.tsx
│   │   │   └── Separator.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── AuthorityBar.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── RisksSection.tsx
│   │   │   ├── MethodSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FeaturedArticles.tsx
│   │   │   ├── GeographicPresence.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── sobre/
│   │   │   ├── BiographyBlock.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── ExpertiseAreas.tsx
│   │   ├── artigos/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleFilters.tsx
│   │   │   ├── ArticleSearch.tsx
│   │   │   └── AuthorBox.tsx
│   │   └── contato/
│   │       └── ContactForm.tsx
│   ├── content/
│   │   └── artigos/
│   │       ├── prova-digital-cadeia-custodia.mdx
│   │       ├── investigacao-defensiva-estrategia.mdx
│   │       └── cibercrimes-evidencias-digitais.mdx
│   ├── data/
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   ├── team.ts
│   │   ├── risks.ts
│   │   ├── method.ts
│   │   ├── cities.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── mdx.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
│       ├── brand/                   # logo, favicon, og-image
│       ├── dellano/                 # foto hero, sobre (placeholder)
│       ├── team/                    # fotos equipe (placeholder)
│       └── testimonials/            # fotos depoentes (placeholder)
├── tailwind.config.ts
├── next.config.ts
├── next-sitemap.config.js
└── .env.local                       # variáveis de ambiente (não versionado)
```

**Structure Decision**: Single Next.js app com App Router. Sem separação frontend/backend — a API Route `/api/contato` vive dentro do mesmo projeto. Estrutura alinhada à convenção oficial do Next.js 15.

---

## Complexity Tracking

*Sem violações de constitution a justificar.*

---

## Phase 0: Research

*Ver [research.md](./research.md) para decisões técnicas detalhadas.*

Questões resolvidas:
- Provedor de e-mail: **Resend** (SDK oficial Next.js, free tier suficiente para formulário de contato)
- MDX: **next-mdx-remote** com `compileMDX` (suporte a frontmatter nativo, compatível com App Router)
- Animações: **Framer Motion** com `whileInView` (sem layout shift, suporte SSR via LazyMotion)
- Fontes: **next/font/google** com `subsets: ['latin']` e `display: 'swap'`
- Sitemap: **next-sitemap** pós-build via script npm

---

## Phase 1: Design & Contracts

*Ver [data-model.md](./data-model.md) e [contracts/contact-api.md](./contracts/contact-api.md).*
