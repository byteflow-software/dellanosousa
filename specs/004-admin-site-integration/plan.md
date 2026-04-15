# Implementation Plan: Integração Admin ↔ Site

**Branch**: `main` | **Date**: 2026-04-15 | **Spec**: `specs/004-admin-site-integration/spec.md`

## Summary

Substituir dados estáticos do dellano-site por queries Prisma ao banco PostgreSQL do dellano-admin. Compartilhar o schema Prisma entre as duas apps e criar uma camada de acesso a dados no site.

## Technical Context

**Language/Version**: TypeScript 5+ / Node.js 20 LTS
**Primary Dependencies**: Next.js 15 (App Router), Prisma 5, @prisma/client
**Storage**: PostgreSQL (mesmo banco do dellano-admin)
**Target Platform**: Vercel (ambas as apps)
**Project Type**: Monorepo com 2 apps Next.js

## Project Structure

```text
dellanosousa/                    # monorepo root
├── prisma/                      # NOVO: schema compartilhado (movido do admin)
│   └── schema.prisma
├── dellano-admin/               # admin app
│   ├── src/lib/prisma.ts        # importa de @prisma/client
│   └── ...
├── dellano-site/                # site público
│   ├── src/lib/
│   │   ├── prisma.ts            # NOVO: singleton Prisma client
│   │   ├── db.ts                # NOVO: funções de query (getPublishedArtigos, etc.)
│   │   └── mdx.ts               # REMOVER: substituído por db.ts
│   ├── src/data/
│   │   ├── team.ts              # REMOVER: substituído por db.ts
│   │   ├── eventos.ts           # REMOVER: substituído por db.ts
│   │   ├── faq.ts               # REMOVER: substituído por db.ts
│   │   ├── imprensa.ts          # REMOVER: substituído por db.ts
│   │   ├── services.ts          # MANTER: dados estáticos
│   │   ├── method.ts            # MANTER
│   │   ├── risks.ts             # MANTER
│   │   ├── forensic-tools.ts    # MANTER
│   │   ├── navigation.ts        # MANTER
│   │   ├── brazilian-states.ts  # MANTER
│   │   └── cities.ts            # MANTER
│   └── src/app/
│       ├── artigos/             # ATUALIZAR: usar db.ts
│       ├── equipe/              # ATUALIZAR
│       ├── eventos/             # ATUALIZAR
│       ├── faq/                 # ATUALIZAR
│       ├── imprensa/            # ATUALIZAR
│       ├── publicacoes/         # ATUALIZAR
│       └── sobre/               # ATUALIZAR
```

## Phases

### Phase 1: Compartilhar Prisma Schema
1. Copiar `prisma/` do admin para o site (ou configurar path compartilhado)
2. Adicionar `@prisma/client` e `prisma` ao site
3. Criar `src/lib/prisma.ts` no site (singleton)
4. Configurar `DATABASE_URL` no `.env.local` do site

### Phase 2: Criar Data Access Layer
1. Criar `src/lib/db.ts` com funções:
   - `getPublishedArtigos()`, `getArtigoBySlug(slug)`
   - `getTeamMembers()`
   - `getPublishedEventos()`
   - `getActiveFaqs()`
   - `getPublishedImprensa()`
   - `getPublishedPublicacoes()`
   - `getSobrePage()`
   - `getPageSeo(pageKey)`

### Phase 3: Atualizar páginas
1. Substituir imports estáticos por chamadas a `db.ts`
2. Adaptar tipos/interfaces para Prisma types
3. Remover MDX loader e arquivos `.mdx`
4. Atualizar artigo detail para renderizar HTML do TipTap

### Phase 4: Cleanup
1. Remover arquivos de dados não mais usados
2. Remover dependências não mais usadas (gray-matter, next-mdx-remote)
3. Atualizar types/index.ts
