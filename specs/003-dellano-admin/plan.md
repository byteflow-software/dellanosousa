# Implementation Plan: dellano-admin

**Date**: 2026-04-14 | **Spec**: spec.md

---

## Stack

- Next.js 16.x (App Router, `src/` dir) — porta 3001
- TypeScript 5+ / Node 20 LTS
- Prisma 5 + PostgreSQL
- Auth: JWT com `jose` + `bcryptjs`, cookie httpOnly
- UI: Tailwind CSS v4 com admin CSS classes (padrão profamr_blog)
- Forms: React Hook Form + Zod
- Icons: Lucide React
- Sem Clerk — auth própria simplificada (single admin user)

## Estrutura

```
dellano-admin/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── middleware.ts          ← proteção JWT de todas as rotas
│   ├── types/index.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── actions/          ← server actions por módulo
│   ├── app/
│   │   ├── globals.css        ← admin-* CSS classes
│   │   ├── layout.tsx
│   │   ├── (auth)/login/
│   │   ├── (admin)/           ← layout com sidebar
│   │   │   ├── page.tsx       ← dashboard
│   │   │   ├── artigos/
│   │   │   ├── publicacoes/
│   │   │   ├── imprensa/
│   │   │   ├── eventos/
│   │   │   ├── equipe/
│   │   │   ├── faq/
│   │   │   ├── sobre/
│   │   │   └── seo/
│   │   └── api/auth/
│   └── components/admin/      ← AdminSidebar, AdminHeader, forms
└── .env.example
```

## Auth Flow

1. Middleware verifica cookie `admin-token` (JWT) em todas as rotas exceto `/login` e `/api`
2. Login via POST `/api/auth/login` → bcrypt compare → assina JWT → set-cookie
3. Logout via POST `/api/auth/logout` → clear cookie
4. `src/lib/auth.ts` expõe `getCurrentUser()` para server components/actions

## Integração com dellano-site (fase 2)

O dellano-site atualmente lê de arquivos TypeScript estáticos. A integração via shared Prisma client ou API REST será feita em uma spec separada (004-site-db-integration).
