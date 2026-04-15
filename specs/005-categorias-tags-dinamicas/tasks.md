# Tasks — Feature 005

- [ ] T1: Schema fase 1 — adicionar `Categoria`, `Tag`, `Artigo.categoryId?` e `Artigo.tags`
- [ ] T2: `prisma db push` no admin
- [ ] T3: Script `migrate-categorias.ts` — seed das 5 categorias + popular `categoryId` dos 14 artigos
- [ ] T4: Schema fase 2 — `categoryId` obrigatório + drop enum + drop coluna antiga
- [ ] T5: `prisma db push` no admin
- [ ] T6: Replicar schema em `dellano-site/prisma/schema.prisma` + `prisma generate`
- [ ] T7: Server actions admin — `categorias.ts` (list/create/update/delete) e `tags.ts`
- [ ] T8: Páginas admin — `/categorias`, `/categorias/nova`, `/categorias/[id]`, `/tags`
- [ ] T9: `ArtigoForm` — select de categoria + multi-select/free-text de tags
- [ ] T10: Atualizar `actions/artigos.ts` para aceitar categoryId + tagIds (connectOrCreate)
- [ ] T11: Atualizar `dellano-site/src/lib/db.ts` (`include: { categoria, tags }`) + remover enum map
- [ ] T12: Atualizar tipos e páginas do site para usar `categoria.name`/`categoria.slug`
- [ ] T13: Build admin + site, verificar
- [ ] T14: Commit + push
