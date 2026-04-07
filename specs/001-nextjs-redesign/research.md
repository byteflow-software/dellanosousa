# Research: Redesign dellanosousa.com.br — Next.js

**Branch**: `001-nextjs-redesign` | **Date**: 2026-04-06

---

## Decisão 1: Framework e roteamento

**Decision**: Next.js 15 com App Router
**Rationale**: App Router oferece SSG nativo por padrão, streaming, `generateMetadata`, `generateStaticParams` e Server Components — tudo necessário para o projeto. RSC reduz JS enviado ao cliente, melhorando Lighthouse scores.
**Alternatives considered**:
- Next.js Pages Router: mais maduro, mas sem Server Components e com overhead de `getStaticProps`.
- Remix: ótimo para formulários, mas ecossistema menor e menos familiaridade com Vercel.
- Astro: ideal para sites estáticos puros, mas limitado para partes interativas (formulário, filtros de artigos).

---

## Decisão 2: Envio de e-mail no formulário de contato

**Decision**: Resend via SDK oficial
**Rationale**: SDK typescript-first, zero configuração de SMTP, free tier de 3.000 e-mails/mês (suficiente para escritório jurídico), integração nativa com Next.js API Routes, e-mails com React Email templates opcionais.
**Alternatives considered**:
- Nodemailer + SMTP: requer configuração de servidor de e-mail, mais frágil para deploy Vercel (cold starts, credenciais SMTP).
- SendGrid: mais robusto para volume alto, mas overkill para um formulário de contato de escritório jurídico.
- EmailJS (client-side): expõe credenciais no cliente, inseguro.

---

## Decisão 3: Sistema de MDX para blog

**Decision**: `next-mdx-remote` com `compileMDX`
**Rationale**: Compatível com App Router (sem uso de `require` no runtime), suporte nativo a frontmatter tipado, permite componentes customizados dentro do MDX. Alternativa `@next/mdx` exige configuração de webpack e não suporta frontmatter da mesma forma.
**Alternatives considered**:
- `@next/mdx` nativo: mais simples mas sem frontmatter nativo e menos flexível para slug routing.
- Contentlayer: excelente DX mas projeto está com manutenção reduzida (community fork).
- Headless CMS (Sanity, Contentful): fase 2 — desnecessário agora sem equipe editorial.

---

## Decisão 4: Animações

**Decision**: Framer Motion com `whileInView` + `LazyMotion`
**Rationale**: API declarativa, suporte a SSR, animações de scroll sem IntersectionObserver manual, `LazyMotion` com `domAnimation` reduz bundle size. `whileInView` é idiomático para o padrão fade-in on scroll descrito no design.
**Alternatives considered**:
- CSS Animations + Intersection Observer: mais leve mas mais código manual, menos expressivo.
- GSAP: poderoso mas licença comercial para alguns recursos, bundle maior.
- React Spring: alternativa válida mas API menos intuitiva para animações de scroll.

---

## Decisão 5: Fontes

**Decision**: `next/font/google` com `Cormorant_Garamond` + `Inter`, `subsets: ['latin']`, `display: 'swap'`
**Rationale**: Zero layout shift por font swap otimizado, sem requests externos em runtime (fontes inline via CSS), subsets reduzidos diminuem payload. `display: 'swap'` garante texto visível durante o carregamento.
**Alternatives considered**:
- Fontes auto-hospedadas em `/public/fonts/`: válido como fallback, mas `next/font` já faz isso automaticamente.
- `@import` CSS no Tailwind: não integra com a otimização do Next.js.

---

## Decisão 6: Sitemap

**Decision**: `next-sitemap` via script pós-build
**Rationale**: Gera `sitemap.xml` e `robots.txt` automaticamente com base nas rotas do build. Configuração simples via `next-sitemap.config.js`. Integra com `npm run build` via `postbuild` script.
**Alternatives considered**:
- `app/sitemap.ts` nativo do Next.js 15: válido, mas requer código manual para listar todas as rotas e artigos.
- Sem sitemap: inaceitável dado requisito SEO.

---

## Decisão 7: Validação do formulário

**Decision**: React Hook Form + Zod
**Rationale**: React Hook Form é performático (sem re-renders por campo), Zod provê schema de validação tipado e compartilhável entre client e server (API Route). Combinação padrão da comunidade Next.js.
**Alternatives considered**:
- Formik + Yup: mais verboso, performance inferior ao React Hook Form.
- Validação nativa HTML5: insuficiente para feedback inline customizado e lógica de validação complexa.

---

## Decisão 8: Ícones

**Decision**: Lucide React
**Rationale**: Tree-shakeable, estilo minimalista compatível com o design, mantido ativamente, TypeScript nativo, tamanhos configuráveis via props.
**Alternatives considered**:
- Heroicons: limitado em variedade.
- Font Awesome: pesado, não tree-shakeable sem configuração extra.
- SVGs inline: válido para ícones únicos (logo), mas inviável para biblioteca de ícones.
