# Contract: API Route de Contato

**Endpoint**: `POST /api/contato`
**Implementação**: `src/app/api/contato/route.ts`

---

## Request

**Content-Type**: `application/json`

```typescript
type ContactRequest = {
  name: string        // mínimo 2 caracteres
  email: string       // e-mail válido
  phone: string       // mínimo 10 dígitos (aceita formatação)
  subject: string     // um dos valores: 'defesa-criminal' | 'provas-digitais' | 'investigacao' | 'assistencia-tecnica' | 'urgente' | 'outro'
  message: string     // mínimo 20 caracteres
}
```

**Validação**: Schema Zod compartilhado entre client (React Hook Form) e server (API Route) em `src/lib/schemas/contact.ts`.

---

## Response

### Sucesso (200)

```json
{ "success": true }
```

O client redireciona para `/obrigado` após receber esta resposta.

### Erro de validação (400)

```json
{
  "error": "Dados inválidos",
  "fields": {
    "email": "E-mail inválido",
    "message": "Mensagem deve ter pelo menos 20 caracteres"
  }
}
```

### Erro do servidor (500)

```json
{
  "error": "Falha ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp."
}
```

---

## Comportamento

1. Server valida os dados com Zod — retorna 400 se inválido.
2. Server envia e-mail via Resend para `CONTACT_EMAIL` (variável de ambiente).
3. E-mail enviado ao escritório contém: nome, e-mail, telefone, assunto e mensagem do visitante.
4. Server retorna 200 `{ success: true }`.
5. Client redireciona para `/obrigado`.

---

## Variáveis de Ambiente Necessárias

```env
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=contato@dellanosousa.com.br
NEXT_PUBLIC_SITE_URL=https://dellanosousa.com.br
```

---

## Segurança

- Rate limiting: não implementado nesta fase (Vercel limita por IP nativamente no free tier).
- CORS: não necessário (same-origin — client e API no mesmo domínio Vercel).
- Sanitização: Zod valida tipos e tamanhos; Resend escapa HTML no envio.
- Honeypot field (opcional): campo oculto `website` — se preenchido, rejeitar silenciosamente.
