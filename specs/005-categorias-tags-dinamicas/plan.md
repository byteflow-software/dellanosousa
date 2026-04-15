# Plan — Feature 005

## Estratégia de migração (ordem importa)

1. **Schema (admin)**: adicionar `Categoria` e `Tag`, adicionar `categoryId String?` opcional em `Artigo` + relação `tags Tag[]`
2. `pnpm prisma db push` para criar tabelas no Postgres
3. **Script de migração** (`migrate-categorias.ts`): seed 5 categorias com slugs estáveis + popular `categoryId` dos artigos baseado no enum atual
4. **Schema (admin) — fase 2**: tornar `categoryId` obrigatório, dropar coluna enum `category` e o enum `ArtigoCategory`
5. `pnpm prisma db push` novamente
6. **Replicar schema em `dellano-site/prisma/schema.prisma`** e rodar `prisma generate`
7. **Atualizar admin**: actions, ArtigoForm, páginas CRUD `/categorias` e `/tags`
8. **Atualizar site**: `lib/db.ts`, tipos, páginas

## Slugs canônicos (seed)

| Enum antigo | Nome | Slug |
|---|---|---|
| PROVAS_DIGITAIS | Provas Digitais | provas-digitais |
| PROCESSO_PENAL | Processo Penal | processo-penal |
| INVESTIGACAO_DEFENSIVA | Investigação Defensiva | investigacao-defensiva |
| CIBERCRIMES | Cibercrimes | cibercrimes |
| ANALISES | Análises | analises |

## Decisões

- **Soft constraint na exclusão**: Prisma `onDelete: Restrict` em `Artigo.categoria` (BD recusa)
- **Tag M2M implícita**: Prisma cria a tabela join automaticamente
- **Slug auto-gerado** a partir do nome no admin (slugify pt-BR), editável manualmente
- **Não migrar `FaqCategory`** nesta feature (mantém enum)

## Arquivos novos

- `dellano-admin/src/app/(admin)/categorias/page.tsx` + `[id]/page.tsx` + `nova/page.tsx`
- `dellano-admin/src/app/(admin)/tags/page.tsx`
- `dellano-admin/src/lib/actions/categorias.ts`
- `dellano-admin/src/lib/actions/tags.ts`
- `dellano-admin/migrate-categorias.ts` (script one-shot)

## Arquivos modificados

- `dellano-admin/prisma/schema.prisma` (e cópia em `dellano-site/`)
- `dellano-admin/src/components/admin/ArtigoForm.tsx`
- `dellano-admin/src/lib/actions/artigos.ts`
- `dellano-site/src/lib/db.ts`
- `dellano-site/src/types/index.ts`
- `dellano-site/src/app/artigos/page.tsx` e `[slug]/page.tsx`
