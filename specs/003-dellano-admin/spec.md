# Feature Specification: dellano-admin — Painel Administrativo

**Feature Branch**: `main`
**Created**: 2026-04-14
**Status**: Draft
**Input**: Painel CMS para gerenciar todo o conteúdo do site dellanosousa.com.br via interface web

---

## Contexto

O site dellanosousa.com.br (dellano-site) atualmente usa dados estáticos em arquivos TypeScript e MDX. O dellano-admin é uma aplicação Next.js separada, no mesmo monorepo, que armazena todo o conteúdo em PostgreSQL via Prisma. A integração com o dellano-site (migração dos dados estáticos para o banco) é fase 2.

---

## Módulos Gerenciáveis

| Módulo | Descrição |
|---|---|
| Artigos | Blog próprio do escritório (aparece em /artigos) |
| Publicações Externas | Artigos em Migalhas, Conjur, revistas — com URL de redirecionamento |
| Imprensa | Cobertura de imprensa, entrevistas, menções |
| Eventos | Palestras, cursos, congressos, mesas de debate |
| Equipe | Membros da equipe (sem upload de fotos) |
| FAQ | Perguntas frequentes por categoria |
| Sobre | Conteúdo da página Sobre (bio, credenciais, palestras listadas) |
| SEO | Título e descrição por página do site |

---

## User Scenarios

### US1 — Admin edita conteúdo publicado (P1)

**Acceptance Scenarios**:
1. **Given** admin logado, **When** acessa `/artigos` e clica em um artigo, **Then** abre formulário preenchido com título, conteúdo, status, SEO.
2. **Given** admin edita título e salva, **When** salva com sucesso, **Then** volta para lista com notificação de sucesso.
3. **Given** admin tenta salvar sem título, **When** submete, **Then** vê erro inline no campo obrigatório.

### US2 — Admin cria novo conteúdo (P1)

**Acceptance Scenarios**:
1. **Given** admin acessa `/artigos/novo`, **When** preenche título, o slug é gerado automaticamente a partir do título.
2. **Given** admin salva com status DRAFT, **Then** item aparece na lista marcado como Rascunho.
3. **Given** admin salva com status PUBLISHED, **Then** item aparece marcado como Publicado.

### US3 — Admin exclui conteúdo (P2)

**Acceptance Scenarios**:
1. **Given** admin clica em Excluir na lista, **When** confirma o diálogo, **Then** item é removido da lista.
2. **Given** admin cancela o diálogo, **Then** nada é excluído.

### US4 — Auth segura (P1)

**Acceptance Scenarios**:
1. **Given** usuário não autenticado acessa qualquer rota do admin, **Then** é redirecionado para `/login`.
2. **Given** credenciais inválidas no login, **Then** vê mensagem de erro sem redirecionar.
3. **Given** admin faz logout, **Then** cookie JWT é removido e é redirecionado para `/login`.
