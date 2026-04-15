@AGENTS.md

# dellano-site — dados dinâmicos

A partir da feature 004-admin-site-integration, o site lê conteúdo do banco PostgreSQL gerenciado pelo `dellano-admin` via Prisma 5.22 (mesma versão do admin).

## Camadas

- `src/lib/prisma.ts` — singleton Prisma client
- `src/lib/db.ts` — funções de query (artigos, equipe, eventos, faq, imprensa, publicações, sobre, SEO) + mapeamento de enums Prisma → labels PT-BR
- `prisma/schema.prisma` — cópia do schema do admin (manter sincronizado)

## Páginas dinâmicas (ISR 60s)

`/artigos`, `/artigos/[slug]`, `/equipe`, `/eventos`, `/faq`, `/imprensa`, `/publicacoes`, `/sobre` — todas com `export const revalidate = 60`.

## Dados que permanecem estáticos em `src/data/`

`services.ts`, `method.ts`, `risks.ts`, `forensic-tools.ts`, `navigation.ts`, `brazilian-states.ts`, `cities.ts`.

## Env

Além do que já existe, `.env.local` precisa de `DATABASE_URL` (mesma do admin).

## Artigos

Conteúdo vem como HTML (TipTap) do campo `Artigo.content` — renderizado com `dangerouslySetInnerHTML`, não mais MDX.
