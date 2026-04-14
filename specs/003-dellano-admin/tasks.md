# Tasks: dellano-admin

**Date**: 2026-04-14

---

## Phase 1 — Fundação

- [x] T001 Criar estrutura de diretórios do dellano-admin
- [x] T002 Criar specs/003-dellano-admin/ (spec.md, data-model.md, plan.md, tasks.md, quickstart.md)
- [ ] T003 Criar package.json, tsconfig.json, next.config.ts, postcss.config.mjs, .env.example
- [ ] T004 Criar prisma/schema.prisma com todos os modelos
- [ ] T005 Criar prisma/seed.ts com admin user padrão + dados de exemplo
- [ ] T006 Criar src/types/index.ts
- [ ] T007 Criar src/lib/prisma.ts, src/lib/auth.ts, src/lib/utils.ts
- [ ] T008 Criar src/middleware.ts (proteção JWT)

## Phase 2 — App Shell

- [ ] T009 Criar src/app/globals.css com admin-* CSS classes
- [ ] T010 Criar src/app/layout.tsx (root)
- [ ] T011 Criar src/app/(auth)/login/page.tsx
- [ ] T012 Criar src/app/api/auth/login/route.ts e logout/route.ts
- [ ] T013 Criar AdminSidebar, AdminHeader, AdminLayoutClient
- [ ] T014 Criar src/app/(admin)/layout.tsx
- [ ] T015 Criar src/app/(admin)/page.tsx (dashboard com stats)

## Phase 3 — Módulos CRUD

- [ ] T016 Artigos (actions + form + list + novo + [id])
- [ ] T017 Publicações externas (actions + form + list + nova + [id])
- [ ] T018 Imprensa (actions + form + list + nova + [id])
- [ ] T019 Eventos (actions + form + list + novo + [id])
- [ ] T020 Equipe (actions + form + list + novo + [id])
- [ ] T021 FAQ (actions + form + list + nova + [id])
- [ ] T022 Sobre (actions + form + page única)
- [ ] T023 SEO (actions + form + page única)
