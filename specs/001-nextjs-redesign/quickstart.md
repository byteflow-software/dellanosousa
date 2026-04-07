# Quickstart: Redesign dellanosousa.com.br — Next.js

**Branch**: `001-nextjs-redesign`

---

## Pré-requisitos

- Node.js 20 LTS
- npm 10+
- Git
- Conta Vercel (deploy)
- Conta Resend (envio de e-mail — gratuita)

---

## Setup inicial

```bash
# 1. Criar o projeto Next.js
npx create-next-app@latest dellano-site \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd dellano-site

# 2. Instalar dependências
npm install framer-motion lucide-react react-hook-form @hookform/resolvers zod
npm install next-mdx-remote gray-matter
npm install resend
npm install -D next-sitemap @tailwindcss/typography

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com as chaves reais
```

---

## Variáveis de Ambiente

Criar `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/message/PWFG7DRODCD6I1
NEXT_PUBLIC_SITE_URL=https://dellanosousa.com.br
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=contato@dellanosousa.com.br
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Atenção**: Nunca commitar `.env.local`. O arquivo já está no `.gitignore` padrão do Next.js.

---

## Configuração do Tailwind

Em `tailwind.config.ts`, adicionar ao `theme.extend`:

```typescript
colors: {
  primary: '#0D1B2A',
  secondary: '#1B263B',
  accent: '#415A77',
  background: '#F8FAFC',
  muted: '#6B7280',
  gold: '#C6B38E',
},
fontFamily: {
  serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
},
```

E adicionar `@tailwindcss/typography` em `plugins`.

---

## Scripts npm

Em `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## Rodar localmente

```bash
npm run dev
# Acesse http://localhost:3000
```

---

## Deploy (Vercel)

```bash
# Via CLI
npx vercel

# Ou conectar repositório no painel vercel.com
# Adicionar as variáveis de ambiente no painel da Vercel
```

---

## Ordem de implementação recomendada

1. Setup (tailwind, fontes, tipos, dados estáticos)
2. Componentes UI base (Button, Card, SectionTitle, AnimatedSection)
3. Layout global (Header, Footer, WhatsAppFloat, layout.tsx)
4. Home (10 seções em ordem)
5. Páginas internas (Sobre, Áreas, Provas Digitais, Equipe, Contato)
6. Blog (MDX, hub, artigo individual)
7. Páginas complementares (Publicações, Políticas, 404, Obrigado)
8. SEO e otimização (generateMetadata, sitemap, Lighthouse)
