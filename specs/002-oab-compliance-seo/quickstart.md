# Quickstart: 002-oab-compliance-seo

## Prerequisites

- Node.js 20 LTS
- npm ou pnpm

## Setup

```bash
cd dellano-site
npm install
npm run dev
```

## Verificação

```bash
npm run build   # deve passar sem erros
npm run lint    # sem warnings
```

## Estrutura de trabalho

Todas as mudanças ocorrem dentro de `dellano-site/src/`. Não há dependências novas a instalar — a feature usa apenas o stack existente (Next.js 15, Tailwind, Framer Motion, React Hook Form, Zod, Resend).

## Ordem de implementação

1. Phase 1: Conformidade ética (edições em arquivos existentes)
2. Phase 2: SEO estrutural (novos arquivos de dados + rotas)
3. Phase 3: UX e novas páginas
4. Phase 4: Newsletter
5. Phase 5: Build + validação
