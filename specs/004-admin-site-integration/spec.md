# Feature Specification: Integração Admin ↔ Site

**Feature Branch**: `main`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Integrar dellano-admin (Prisma/PostgreSQL) com dellano-site (dados estáticos)

---

## Contexto

O dellano-site usa dados hardcoded em arquivos `.ts` e artigos em `.mdx`. O dellano-admin gerencia o mesmo conteúdo via Prisma/PostgreSQL. A integração substitui as fontes estáticas por queries ao banco do admin.

### Mapeamento de Dados

| Fonte Estática (site) | Model Prisma (admin) | Página |
|---|---|---|
| `src/data/team.ts` | `MembroEquipe` | `/equipe` |
| `src/data/eventos.ts` | `Evento` | `/eventos` |
| `src/data/faq.ts` | `FaqItem` | `/faq` |
| `src/data/imprensa.ts` | `Imprensa` | `/imprensa` |
| `src/content/artigos/*.mdx` | `Artigo` | `/artigos`, `/artigos/[slug]` |
| Hardcoded em `publicacoes/page.tsx` | `Publicacao` | `/publicacoes` |
| Hardcoded em `sobre/page.tsx` | `SobrePage` | `/sobre` |
| N/A | `PageSeo` | Todas as páginas |

### Dados que permanecem estáticos (NÃO gerenciados pelo admin)

- `services.ts` — áreas de atuação (conteúdo jurídico fixo)
- `method.ts` — metodologia
- `risks.ts` — riscos comuns
- `forensic-tools.ts` — ferramentas forenses
- `navigation.ts` — links de navegação
- `brazilian-states.ts`, `cities.ts` — dados de formulário

---

## User Scenarios

### US1 — Site exibe conteúdo do banco (P1)

O site público renderiza artigos, equipe, eventos, FAQ, imprensa, publicações e sobre a partir do PostgreSQL gerenciado pelo admin.

**Acceptance Scenarios**:
1. **Given** admin publica artigo com status PUBLISHED, **When** visitante acessa `/artigos`, **Then** artigo aparece na lista.
2. **Given** admin edita membro da equipe, **When** visitante acessa `/equipe`, **Then** dados atualizados são exibidos.
3. **Given** admin cria FAQ com active=true, **When** visitante acessa `/faq`, **Then** pergunta aparece na categoria correta.

### US2 — SEO dinâmico por página (P2)

Cada página do site carrega título e descrição do modelo PageSeo, com fallback para valores estáticos.

**Acceptance Scenarios**:
1. **Given** admin define SEO para pageKey "home", **When** visitante acessa `/`, **Then** metadata reflete os valores do admin.
2. **Given** pageKey não existe no banco, **When** visitante acessa página, **Then** usa metadata padrão hardcoded.

### US3 — Conteúdo estático permanece funcional (P1)

Dados de áreas de atuação, metodologia, riscos e ferramentas continuam funcionando via arquivos estáticos.

**Acceptance Scenarios**:
1. **Given** site integrado, **When** visitante acessa `/areas-de-atuacao`, **Then** página funciona normalmente com dados estáticos.

---

## Requirements

### Functional Requirements

- **FR-001**: Site MUST usar Prisma client compartilhado para acessar o mesmo banco do admin
- **FR-002**: Site MUST filtrar apenas conteúdo com status=PUBLISHED (ou active=true para FAQ/equipe)
- **FR-003**: Site MUST manter ISR (Incremental Static Regeneration) ou revalidação por tempo para performance
- **FR-004**: Site MUST ter fallback gracioso se banco estiver indisponível
- **FR-005**: Artigos MUST renderizar HTML do campo content (rich text do TipTap)
- **FR-006**: SEO MUST ter fallback para valores estáticos se pageKey não existir

### Key Entities

- **Prisma Schema**: Compartilhado do dellano-admin (não duplicar)
- **Data Access Layer**: Nova camada `src/lib/db.ts` no site com funções de query

---

## Success Criteria

- **SC-001**: Todas as 7 páginas dinâmicas carregam dados do banco
- **SC-002**: Build do site completa sem erros
- **SC-003**: Páginas estáticas continuam funcionando
- **SC-004**: Tempo de resposta < 500ms com revalidação
