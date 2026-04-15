# Feature 005 — Categorias e Tags dinâmicas para artigos

**Status:** in progress
**Data:** 2026-04-15
**Branch alvo:** main

## Problema

Atualmente as categorias de artigo são um `enum` Prisma fixo (`PROVAS_DIGITAIS`, `PROCESSO_PENAL`, `INVESTIGACAO_DEFENSIVA`, `CIBERCRIMES`, `ANALISES`). Adicionar uma nova categoria exige editar schema, rodar migração e fazer deploy. Não existe sistema de tags.

## Objetivo

Permitir que o admin crie/edite/exclua **categorias** e **tags** de artigos pelo painel, sem mudar código. Manter compatibilidade total com os 14 artigos existentes.

## Escopo

### Inclui
- Modelo `Categoria` (id, name, slug, order, createdAt, updatedAt) com seed das 5 categorias atuais
- Modelo `Tag` (id, name, slug, createdAt) com relação M2M implícita com `Artigo`
- `Artigo.category` enum substituído por `Artigo.categoryId` FK + relação `Artigo.categoria`
- Migração de dados preservando vínculo dos 14 artigos existentes
- Páginas CRUD no admin: `/admin/categorias` e `/admin/tags` (list + create/edit/delete)
- `ArtigoForm` com `<select>` de categoria e multi-select de tags
- Site lê via `lib/db.ts` com `include: { categoria, tags }` e usa `categoria.name`/`categoria.slug`

### Fora de escopo
- `FaqCategory` permanece enum (será tratado em feature futura se necessário)
- Filtro/listagem por tag no site público (apenas categoria mantém comportamento atual)
- Cores/ícones por categoria

## Critérios de aceitação

1. Admin consegue criar uma nova categoria pelo painel e ela aparece imediatamente no `<select>` do `ArtigoForm`
2. Admin consegue criar tags ao criar/editar artigo (ou em página dedicada)
3. Categoria não pode ser excluída se houver artigo vinculado (UI bloqueia + BD restringe)
4. Os 14 artigos existentes mantêm sua categoria após a migração
5. Site público continua exibindo a categoria nos cards e na página do artigo
6. Build `pnpm build` no admin e no site passa sem erro

## Riscos

- **Migração destrutiva**: dropar enum sem migrar dados quebra os 14 artigos. Mitigação: migração em duas fases (adicionar categoryId, popular, dropar enum)
- **Sincronização de schema admin↔site**: precisa replicar `prisma/schema.prisma` em ambos e rodar `prisma generate`
