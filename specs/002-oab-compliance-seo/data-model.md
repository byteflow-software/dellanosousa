# Data Model: Conformidade Ética OAB + Melhorias SEO

## Entities

### Service (expandido)

Entidade existente em `src/data/services.ts`. Será expandida com novos campos.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Identificador único |
| title | string | Nome da área de atuação |
| description | string | Descrição curta (card) |
| longDescription | string | Descrição média (índice) |
| expandedContent | string[] | Parágrafos do conteúdo expandido (subpágina) |
| legalBasis | { title: string, articles: string[] }[] | Base legal relevante |
| faq | { question: string, answer: string }[] | 5 perguntas frequentes |
| icon | string | Nome do ícone Lucide |
| slug | string | Slug para URL |
| metaDescription | string | Meta description para SEO |

### FAQ Item

Nova entidade em `src/data/faq.ts`.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Identificador único |
| category | string | Categoria (ex: "Provas Digitais", "Defesa Criminal") |
| question | string | Pergunta |
| answer | string | Resposta |

### Event

Nova entidade em `src/data/events.ts`.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Identificador único |
| title | string | Nome do evento/palestra |
| date | string | Data (YYYY-MM-DD) |
| location | string | Local |
| description | string | Descrição breve |
| type | 'palestra' \| 'mesa-redonda' \| 'curso' \| 'congresso' | Tipo |
| link | string? | Link externo opcional |

### Press Kit

Nova entidade em `src/data/press.ts`.

| Field | Type | Description |
|-------|------|-------------|
| bio | string | Bio curta para imprensa |
| photo | string | URL da foto em alta resolução |
| topics | string[] | Temas disponíveis para comentário |
| contact | { email: string, phone?: string } | Contato de imprensa |
| appearances | { title: string, outlet: string, date: string, link?: string }[] | Aparições em mídia |

### Forensic Tool

Nova entidade em `src/data/forensic-tools.ts`.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Nome da ferramenta |
| description | string | Descrição breve |
| category | 'extração' \| 'análise' \| 'preservação' | Categoria |

### Newsletter Subscriber (API only)

Não persiste localmente — enviado diretamente ao Resend via API.

| Field | Type | Description |
|-------|------|-------------|
| email | string | E-mail do inscrito |

## Relationships

- Service 1:N FAQ (cada área tem suas FAQs na subpágina)
- FAQ Item standalone (página /faq agrupa por categoria)
- Event standalone (página /eventos lista cronologicamente)
- Press Kit singleton (página /imprensa)
