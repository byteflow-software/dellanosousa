# Data Model: dellano-admin

**Branch**: `main` | **Date**: 2026-04-14

Banco de dados: PostgreSQL via Prisma ORM.

---

## Enums

```
ContentStatus: DRAFT | PUBLISHED | ARCHIVED
ArtigoCategory: PROVAS_DIGITAIS | PROCESSO_PENAL | INVESTIGACAO_DEFENSIVA | CIBERCRIMES | ANALISES
PublicacaoTipo: MIDIA | PUBLICACAO_ACADEMICA
EventoTipo: PALESTRA | CURSO | CONGRESSO | MESA
FaqCategory: GERAL | PROVAS_DIGITAIS | INVESTIGACAO | HONORARIOS
```

---

## Models

### AdminUser
Usuário com acesso ao painel.
- id (cuid), email (unique), passwordHash, name, createdAt, updatedAt

### Artigo
Posts do blog interno (/artigos no site).
- id, title, slug (unique), content (Markdown), excerpt, category (ArtigoCategory)
- coverImage?, status (ContentStatus), featured (bool), publishedAt?, author
- seoTitle?, seoDesc?, createdAt, updatedAt

### Publicacao
Publicações externas (Migalhas, Conjur, RBCC, IBCCRIM) — redireciona para URL.
- id, title, venue, tipo (PublicacaoTipo), url?, date (string), status, order, createdAt, updatedAt

### Imprensa
Cobertura de imprensa (matérias, entrevistas, menções).
- id, outlet, title, date (string YYYY-MM-DD), url?, description?, status, createdAt, updatedAt

### Evento
Palestras, cursos, congressos, mesas de debate.
- id, title, tipo (EventoTipo), organizer, location, date (string YYYY-MM-DD)
- role?, description?, status, createdAt, updatedAt

### MembroEquipe
Membros da equipe (sem fotos — URLs externas).
- id, name, role, bio, oab?, linkedin?, hierarchy (principal|apoio)
- expertise (String[]), order (int), active (bool), createdAt, updatedAt

### FaqItem
Perguntas frequentes.
- id, category (FaqCategory), question, answer, order (int), active (bool), createdAt, updatedAt

### SobrePage
Registro único da página Sobre.
- id (always "1"), bioText, credentials (String[]), lectures (String[]), updatedAt

### PageSeo
SEO por rota do site.
- id, pageKey (unique: home|sobre|artigos|eventos|imprensa|faq|equipe|publicacoes|provas-digitais|contato)
- title, description, ogTitle?, ogDesc?, noIndex (bool), updatedAt
