# Implementation Plan: Conformidade Ética OAB + Melhorias SEO/Estruturais

**Branch**: `002-oab-compliance-seo` | **Date**: 2026-04-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-oab-compliance-seo/spec.md`

---

## Summary

Adequar o site dellanosousa.com.br às regras de publicidade da advocacia (Provimento CFOAB 205/2021), removendo depoimentos, autoelogios e linguagem comercial vedada. Em paralelo, implementar melhorias de SEO (URLs individuais por área, Schema.org JSON-LD, busca/filtros em artigos) e novas páginas institucionais (FAQ, Imprensa, Eventos) para escalar autoridade nacional.

---

## Technical Context

**Language/Version**: TypeScript 5+ / Node.js 20 LTS  
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS 3.4+, Framer Motion 11, Lucide React, React Hook Form + Zod, next-mdx-remote, Resend (e-mail), next-sitemap  
**Storage**: Arquivos MDX locais (artigos), dados estáticos TypeScript (serviços, equipe, FAQ, eventos)  
**Testing**: Lint (ESLint + TypeScript strict), build check (`next build`)  
**Target Platform**: Web — Vercel Edge Network; SSG para rotas estáticas  
**Project Type**: Web application (site institucional + blog)  
**Performance Goals**: LCP < 2s em 4G, CLS < 0.1, Lighthouse 90+  
**Constraints**: Zero banco de dados; sem autenticação; conteúdo local; deploy Vercel  
**Scale/Scope**: ~17 rotas (11 existentes + 6 novas subpáginas de área), ~30 componentes, 3 novas páginas

---

## Constitution Check

*Constitution ainda não foi definida para este projeto (template vazio). Nenhum gate a verificar.*

---

## Project Structure

### Documentation (this feature)

```text
specs/002-oab-compliance-seo/
├── plan.md              # Este arquivo
├── research.md          # Decisões técnicas
├── data-model.md        # Entidades de dados
├── quickstart.md        # Guia de setup
└── tasks.md             # Gerado pelo /speckit-tasks
```

### Source Code (repository root)

```text
dellano-site/src/
├── app/
│   ├── areas-de-atuacao/
│   │   ├── page.tsx                    # Índice (existente, atualizar links)
│   │   └── [slug]/
│   │       └── page.tsx                # NOVO: Subpágina individual de área
│   ├── artigos/
│   │   ├── page.tsx                    # Atualizar: busca, filtros, tempo leitura
│   │   └── [slug]/page.tsx             # Atualizar: schema Article, compartilhamento
│   ├── contato/page.tsx                # Atualizar: checkbox LGPD, campo UF
│   ├── eventos/page.tsx                # NOVO
│   ├── faq/page.tsx                    # NOVO
│   ├── imprensa/page.tsx               # NOVO
│   ├── provas-digitais/page.tsx        # Atualizar: ferramentas, tabela, normas, fluxograma
│   ├── sobre/page.tsx                  # Atualizar: linguagem ética
│   ├── layout.tsx                      # Atualizar: schema Attorney global
│   └── page.tsx                        # Atualizar: remover TestimonialsSection
├── components/
│   ├── artigos/
│   │   ├── ArticleSearch.tsx           # NOVO: Busca + filtros client-side
│   │   └── ShareButtons.tsx            # NOVO: Compartilhamento
│   ├── home/
│   │   ├── InstitutionalRecognition.tsx # NOVO: Substitui TestimonialsSection
│   │   └── NewsletterCTA.tsx           # NOVO: Captura e-mail
│   ├── layout/
│   │   ├── Header.tsx                  # Atualizar: OAB, linguagem
│   │   ├── Footer.tsx                  # Atualizar: OAB, linguagem
│   │   └── JsonLd.tsx                  # NOVO: Schema.org componentes
│   └── provas-digitais/
│       ├── CustodyFlowchart.tsx        # NOVO: Fluxograma visual
│       └── ComparisonTable.tsx         # NOVO: Tabela comparativa
├── data/
│   ├── services.ts                     # Atualizar: expandir conteúdo, FAQ, base legal
│   ├── faq.ts                          # NOVO
│   ├── events.ts                       # NOVO
│   ├── press.ts                        # NOVO
│   ├── forensic-tools.ts              # NOVO
│   ├── navigation.ts                   # Atualizar: novas rotas
│   └── brazilian-states.ts             # NOVO: Lista de UFs
└── lib/
    └── schemas/
        └── contact.ts                  # Atualizar: campos LGPD e UF
```

**Structure Decision**: Mantém a estrutura existente do Next.js App Router, adicionando novos arquivos de dados estáticos em `src/data/` e componentes em `src/components/`. Rota dinâmica `[slug]` para áreas de atuação.

---

## Phases

### Phase 1: Conformidade Ética (P1 — urgente)

Objetivo: Zerar riscos de representação na OAB.

**1.1** Remover `TestimonialsSection` da home e criar `InstitutionalRecognition` no lugar  
**1.2** Substituir "Plantão 24h" → "Atendimento em casos urgentes" globalmente  
**1.3** Ajustar linguagem vedada em todas as páginas  
**1.4** Inserir OAB/CE 53.322 no Header e Footer  
**1.5** Remover dados de depoimentos (`testimonials.ts`)

### Phase 2: SEO Estrutural (P2)

Objetivo: URLs individuais e dados estruturados para ranqueamento.

**2.1** Expandir `services.ts` com conteúdo, FAQ e base legal por área  
**2.2** Criar rota dinâmica `/areas-de-atuacao/[slug]/page.tsx` com `generateStaticParams`  
**2.3** Atualizar índice `/areas-de-atuacao` para linkar subpáginas  
**2.4** Criar componente `JsonLd.tsx` reutilizável  
**2.5** Adicionar JSON-LD Attorney/Organization no layout global  
**2.6** Adicionar JSON-LD FAQPage nas subpáginas de área  
**2.7** Adicionar JSON-LD Article nas páginas de artigo  

### Phase 3: Melhorias de UX (P3)

Objetivo: Artigos, contato, novas páginas e provas digitais.

**3.1** Criar `ArticleSearch.tsx` (busca + filtros por categoria)  
**3.2** Adicionar tempo de leitura e autor nos cards de artigo  
**3.3** Criar `ShareButtons.tsx` para artigos  
**3.4** Adicionar checkbox LGPD + campo UF no formulário de contato  
**3.5** Criar dados estáticos: `faq.ts`, `events.ts`, `press.ts`, `forensic-tools.ts`, `brazilian-states.ts`  
**3.6** Criar página `/faq` com schema FAQPage  
**3.7** Criar página `/imprensa`  
**3.8** Criar página `/eventos`  
**3.9** Enriquecer `/provas-digitais` (ferramentas, tabela, normas, fluxograma)  
**3.10** Atualizar navegação (`navigation.ts`)  

### Phase 4: Newsletter (P4)

Objetivo: Captura de leads.

**4.1** Criar `NewsletterCTA.tsx`  
**4.2** Criar API route `/api/newsletter/route.ts`  
**4.3** Integrar na home e em /artigos  

### Phase 5: Validação

**5.1** `next build` deve passar sem erros  
**5.2** Atualizar sitemap (`next-sitemap`) para novas rotas  
**5.3** Verificar todas as páginas no browser  
