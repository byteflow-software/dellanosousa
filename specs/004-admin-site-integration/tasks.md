# Tasks: Integração Admin ↔ Site

## Phase 1: Prisma no Site
- [ ] T1.1: Copiar schema.prisma para dellano-site/prisma/
- [ ] T1.2: Instalar prisma + @prisma/client no site
- [ ] T1.3: Criar src/lib/prisma.ts (singleton)
- [ ] T1.4: Adicionar DATABASE_URL ao .env.local do site
- [ ] T1.5: Rodar prisma generate no site

## Phase 2: Data Access Layer
- [ ] T2.1: Criar src/lib/db.ts com todas as funções de query
- [ ] T2.2: Mapear enums Prisma → labels PT-BR

## Phase 3: Atualizar Páginas
- [ ] T3.1: /artigos (lista + detalhe) → db.ts
- [ ] T3.2: /equipe → db.ts
- [ ] T3.3: /eventos → db.ts
- [ ] T3.4: /faq → db.ts
- [ ] T3.5: /imprensa → db.ts
- [ ] T3.6: /publicacoes → db.ts
- [ ] T3.7: /sobre → db.ts
- [ ] T3.8: SEO dinâmico (layout.tsx ou generateMetadata)

## Phase 4: Cleanup
- [ ] T4.1: Remover data files substituídos
- [ ] T4.2: Remover src/content/artigos/ e src/lib/mdx.ts
- [ ] T4.3: Remover deps não usadas (gray-matter, next-mdx-remote)
- [ ] T4.4: Atualizar types/index.ts
- [ ] T4.5: Build test
