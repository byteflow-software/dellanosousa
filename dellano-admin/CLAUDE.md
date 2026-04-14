# dellano-admin

Painel administrativo do site dellanosousa.com.br.

## Stack

- Next.js 16 App Router, porta 3001
- Prisma 5 + PostgreSQL
- Tailwind CSS v4
- Auth própria: JWT (jose) + bcryptjs, cookie httpOnly

## Commands

```bash
pnpm dev          # dev na porta 3001
pnpm db:push      # aplica schema
pnpm db:seed      # seed inicial
pnpm db:studio    # Prisma Studio
```

## Auth

- Middleware em `src/middleware.ts` protege todas as rotas exceto `/login` e `/api`
- Credenciais do admin em `.env.local` (ADMIN_EMAIL, ADMIN_PASSWORD)

## Notas

- `(auth)/` — route group sem layout do admin (só página de login)
- `(admin)/` — route group com AdminLayoutClient (sidebar + header)
- Server Actions em `src/lib/actions/` — sempre validar com Zod + checar auth antes de gravar
