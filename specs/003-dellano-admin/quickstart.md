# Quickstart: dellano-admin

## Pré-requisitos

- Node.js 20+
- PostgreSQL rodando localmente (ou Neon/Supabase)
- pnpm instalado

## Setup

```bash
cd dellano-admin
pnpm install
cp .env.example .env.local
# Edite .env.local com sua DATABASE_URL e JWT_SECRET
pnpm db:push
pnpm db:seed
pnpm dev
```

Admin roda em `http://localhost:3001`.

## Credenciais padrão (seed)

- Email: `admin@dellanosousa.com.br`
- Senha: `admin123`

**Troque a senha após o primeiro login** via `.env.local` e re-seed.

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Dev server na porta 3001 |
| `pnpm build` | Build de produção |
| `pnpm db:push` | Aplica schema no banco |
| `pnpm db:migrate` | Migração com histórico |
| `pnpm db:studio` | Prisma Studio na porta 5555 |
| `pnpm db:seed` | Seed com admin user + dados de exemplo |

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/dellano_admin"
JWT_SECRET="troque-por-um-segredo-forte-de-pelo-menos-32-chars"
ADMIN_EMAIL="admin@dellanosousa.com.br"
ADMIN_PASSWORD="admin123"
```
