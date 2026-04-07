# Tasks: Redesign dellanosousa.com.br — Next.js

**Input**: Design documents from `/specs/001-nextjs-redesign/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Organization**: Tasks organizadas por user story para entrega incremental e testável independentemente.

## Format: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: User story correspondente (US1=Home/Conversão, US2=Contato Urgente, US3=Credenciais, US4=Blog)

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criar projeto e configurar fundação técnica

- [x] T001 Criar projeto Next.js 15 via `npx create-next-app@latest dellano-site --typescript --tailwind --app --src-dir --import-alias "@/*"`
- [x] T002 Instalar dependências: `framer-motion lucide-react react-hook-form @hookform/resolvers zod next-mdx-remote gray-matter resend`
- [x] T003 Instalar devDependencies: `next-sitemap @tailwindcss/typography`
- [x] T004 [P] Configurar design tokens em `dellano-site/tailwind.config.ts` (cores primary/secondary/accent/background/muted/gold, fontFamily serif/sans)
- [x] T005 [P] Configurar `next/font/google` em `dellano-site/src/app/layout.tsx` (Cormorant_Garamond + Inter, subsets latin, display swap)
- [x] T006 [P] Criar `dellano-site/src/types/index.ts` com todos os tipos TypeScript (Service, Testimonial, TeamMember, ArticleFrontmatter, Article, Risk, MethodStep, City, NavigationItem)
- [x] T007 [P] Criar `dellano-site/.env.local` com variáveis de ambiente (WHATSAPP_URL, SITE_URL, RESEND_API_KEY, CONTACT_EMAIL, GA_ID)
- [x] T008 Configurar `dellano-site/next.config.ts` (imagens: domínios externos se necessário, MDX se usando loader nativo)
- [x] T009 [P] Configurar `dellano-site/next-sitemap.config.js` e adicionar script `"postbuild": "next-sitemap"` em package.json

---

## Phase 2: Foundational (Pré-requisitos Bloqueantes)

**Purpose**: Dados, utilitários e componentes UI base que TODAS as user stories dependem

**⚠️ CRÍTICO**: Nenhuma user story pode começar até esta fase estar completa

- [x] T010 Criar `dellano-site/src/lib/utils.ts` com funções auxiliares (`cn` via clsx/tailwind-merge, `formatDate`, `estimateReadingTime`)
- [x] T011 [P] Criar `dellano-site/src/data/services.ts` com os 6 serviços tipados (id, title, description, longDescription, icon, slug)
- [x] T012 [P] Criar `dellano-site/src/data/testimonials.ts` com os 4 depoimentos (Talvane Moura, Smailly Carvalho, Carlos Eduardo Costa, Emilio Assumpção)
- [x] T013 [P] Criar `dellano-site/src/data/team.ts` com Dellano (hierarchy: principal) e equipe de apoio
- [x] T014 [P] Criar `dellano-site/src/data/risks.ts` com os 5 riscos de prova digital mal obtida
- [x] T015 [P] Criar `dellano-site/src/data/method.ts` com as 5 etapas do método de atuação
- [x] T016 [P] Criar `dellano-site/src/data/cities.ts` com as 4 cidades (Fortaleza, Teresina, Brasília, Ribeirão Preto)
- [x] T017 [P] Criar `dellano-site/src/data/navigation.ts` com os 7 links de navegação
- [x] T018 Criar `dellano-site/src/lib/mdx.ts` com funções: `getArticles()`, `getArticleBySlug(slug)`, `getFeaturedArticles()`, `getArticlesByCategory(category)` usando next-mdx-remote e gray-matter
- [x] T019 Criar `dellano-site/src/components/ui/Button.tsx` (variantes: primary, outline, gold; tamanhos: sm, md, lg; suporte a `as="a"` e `href`)
- [x] T020 [P] Criar `dellano-site/src/components/ui/SectionTitle.tsx` (title + subtitle opcionais, alinhamento configurável)
- [x] T021 [P] Criar `dellano-site/src/components/ui/Card.tsx` (genérico com hover sutil, border, padding configuráveis)
- [x] T022 [P] Criar `dellano-site/src/components/ui/Badge.tsx` (variantes: default, gold, accent)
- [x] T023 [P] Criar `dellano-site/src/components/ui/AnimatedSection.tsx` (wrapper Framer Motion com `whileInView` fade-up, `viewport: { once: true }`)
- [x] T024 [P] Criar `dellano-site/src/components/ui/Separator.tsx` (divisor visual sutil)
- [x] T025 Criar `dellano-site/src/components/layout/Header.tsx` (sticky, blur backdrop on scroll, logo, nav 7 itens, CTA "Plantão 24h")
- [x] T026 Criar `dellano-site/src/components/layout/MobileMenu.tsx` (slide panel, animado, fecha ao clicar em link)
- [x] T027 Criar `dellano-site/src/components/layout/Footer.tsx` (4 colunas, logo, tagline, cidades, redes sociais, links legais, copyright dinâmico)
- [x] T028 Criar `dellano-site/src/components/layout/WhatsAppFloat.tsx` (botão fixo bottom-right, pulse animation, link WhatsApp)
- [x] T029 Atualizar `dellano-site/src/app/layout.tsx` com Header, Footer, WhatsAppFloat, fontes, metadata global e `viewport` config

**Checkpoint**: Fundação pronta — user stories podem começar

---

## Phase 3: User Story 1 — Home / Conversão (Priority: P1) 🎯 MVP

**Goal**: Visitante acessa `/` e em segundos entende a proposta, encontra credenciais e toma uma ação (WhatsApp ou formulário).

**Independent Test**: Acessar `http://localhost:3000` e verificar as 10 seções presentes, responsivas e CTAs funcionais.

### Implementação — User Story 1

- [x] T030 [US1] Criar `dellano-site/src/components/home/Hero.tsx` (headline, subtítulo, 2 CTAs, foto placeholder Dellano, animação fade-up escalonada com Framer Motion)
- [x] T031 [P] [US1] Criar `dellano-site/src/components/home/AuthorityBar.tsx` (faixa horizontal 5 itens com ícones Lucide, bg-primary, responsiva)
- [x] T032 [P] [US1] Criar `dellano-site/src/components/home/AboutPreview.tsx` (grid 2 colunas: foto + texto + credenciais em Badge + CTA "/sobre")
- [x] T033 [US1] Criar `dellano-site/src/components/home/ServicesGrid.tsx` (grid 3x2 de cards com ícone + título + descrição + hover gold, dados de services.ts)
- [x] T034 [P] [US1] Criar `dellano-site/src/components/home/RisksSection.tsx` (bg-primary, 5 risks com ícone de alerta, dados de risks.ts)
- [x] T035 [P] [US1] Criar `dellano-site/src/components/home/MethodSection.tsx` (5 steps em sequência com círculos numerados gold, animação sequencial on scroll)
- [x] T036 [P] [US1] Criar `dellano-site/src/components/home/TestimonialsSection.tsx` (grid 2x2 ou carrossel, 4 depoimentos de testimonials.ts)
- [x] T037 [P] [US1] Criar `dellano-site/src/components/home/GeographicPresence.tsx` (4 cidades em linha com ícone MapPin, dados de cities.ts)
- [x] T038 [P] [US1] Criar `dellano-site/src/components/home/FinalCTA.tsx` (gradiente primary→secondary, headline, 2 botões)
- [x] T039 [US1] Criar `dellano-site/src/components/home/FeaturedArticles.tsx` (3 cards de artigos em destaque, usa getArticles() — pode usar placeholders se blog ainda não implementado)
- [x] T040 [US1] Criar `dellano-site/src/app/page.tsx` compondo as 10 seções na ordem correta
- [x] T041 [US1] Adicionar placeholders de imagem em `dellano-site/public/images/dellano/` e `public/images/brand/` (logo SVG placeholder, og-image)

**Checkpoint**: Home funcional e responsiva — User Story 1 entregável ✅

---

## Phase 4: User Story 2 — Contato Urgente / Plantão 24h (Priority: P1)

**Goal**: Visitante em qualquer página acessa o botão WhatsApp; visitante em `/contato` preenche formulário e recebe confirmação.

**Independent Test**: Abrir qualquer página e verificar botão WhatsApp (já implementado em T028). Acessar `/contato`, preencher e enviar formulário; verificar redirecionamento para `/obrigado`.

### Implementação — User Story 2

- [x] T042 [US2] Criar `dellano-site/src/lib/schemas/contact.ts` com schema Zod compartilhado (name, email, phone, subject enum, message — com mensagens de erro em PT-BR)
- [x] T043 [US2] Criar `dellano-site/src/app/api/contato/route.ts` (POST handler: valida com Zod, envia via Resend para CONTACT_EMAIL, retorna 200/400/500 conforme contrato em contracts/contact-api.md)
- [x] T044 [US2] Criar `dellano-site/src/components/contato/ContactForm.tsx` (React Hook Form + Zod resolver, campos: nome/e-mail/telefone/assunto/mensagem, feedback inline, loading state, redirect /obrigado em sucesso, erro com sugestão WhatsApp)
- [x] T045 [US2] Criar `dellano-site/src/app/contato/page.tsx` (grid 2 colunas: ContactForm | info de contato, destaque WhatsApp, bloco plantão 24h, cidades atendidas)
- [x] T046 [P] [US2] Criar `dellano-site/src/app/obrigado/page.tsx` (confirmação de envio, links úteis, CTA voltar home)

**Checkpoint**: Formulário envia e-mail real + WhatsApp funcional em todas as páginas ✅

---

## Phase 5: User Story 3 — Credenciais e Páginas de Expertise (Priority: P2)

**Goal**: Advogado ou parceiro acessa `/sobre`, `/provas-digitais`, `/equipe` e `/publicacoes` e encontra credenciais detalhadas.

**Independent Test**: Acessar cada uma das 4 rotas e verificar conteúdo completo, imagens, timeline e CTAs funcionais.

### Implementação — User Story 3

- [x] T047 [P] [US3] Criar `dellano-site/src/components/sobre/BiographyBlock.tsx` (texto biográfico + foto grande premium)
- [x] T048 [P] [US3] Criar `dellano-site/src/components/sobre/Timeline.tsx` (linha do tempo profissional vertical com datas)
- [x] T049 [P] [US3] Criar `dellano-site/src/components/sobre/ExpertiseAreas.tsx` (frentes de expertise em cards)
- [x] T050 [US3] Criar `dellano-site/src/app/sobre/page.tsx` (hero com retrato, BiographyBlock, Timeline, ExpertiseAreas, credenciais em Badge, palestras, CTA)
- [x] T051 [US3] Criar `dellano-site/src/app/provas-digitais/page.tsx` (hero técnico, conceito, tipos de evidência em grid, riscos, como atua, entregáveis, blocos temáticos, CTA)
- [x] T052 [US3] Criar `dellano-site/src/app/equipe/page.tsx` (Dellano em destaque principal card grande, equipe de apoio em grid 2-3 colunas, hierarquia visual clara, dados de team.ts)
- [x] T053 [US3] Criar `dellano-site/src/app/areas-de-atuacao/page.tsx` (6 blocos expandíveis ou seções com explicação, quando precisa, como atua, o que entrega, CTA em cada)
- [x] T054 [US3] Criar `dellano-site/src/app/publicacoes/page.tsx` (seções: Palestras/Eventos | Mídia/Entrevistas | Publicações Externas com data e link)

**Checkpoint**: Todas as páginas de credenciais acessíveis com conteúdo representativo ✅

---

## Phase 6: User Story 4 — Blog / Conteúdo Técnico (Priority: P3)

**Goal**: Jurista acessa `/artigos`, filtra por categoria, lê artigo com tipografia premium e encontra conteúdo relacionado.

**Independent Test**: Acessar `/artigos`, clicar em um artigo, verificar corpo MDX com tipografia `prose`, sidebar, artigos relacionados e CTA.

### Implementação — User Story 4

- [x] T055 [US4] Criar 3 arquivos MDX em `dellano-site/src/content/artigos/` com frontmatter completo: `prova-digital-cadeia-custodia.mdx` (featured:true), `investigacao-defensiva-estrategia.mdx`, `cibercrimes-evidencias-digitais.mdx`
- [x] T056 [P] [US4] Criar `dellano-site/src/components/artigos/ArticleCard.tsx` (imagem + badge categoria + título + excerpt + data + link)
- [x] T057 [P] [US4] Criar `dellano-site/src/components/artigos/ArticleFilters.tsx` (filtros por categoria, estado controlado)
- [x] T058 [P] [US4] Criar `dellano-site/src/components/artigos/ArticleSearch.tsx` (busca textual por título/excerpt)
- [x] T059 [P] [US4] Criar `dellano-site/src/components/artigos/AuthorBox.tsx` (foto + nome + bio do autor)
- [x] T060 [US4] Criar `dellano-site/src/app/artigos/page.tsx` (artigo destaque card grande, ArticleSearch + ArticleFilters, grid de cards 3 colunas, usa getArticles())
- [x] T061 [US4] Criar `dellano-site/src/app/artigos/[slug]/page.tsx` (generateStaticParams via getArticles(), título Cormorant, data+autor+badge, imagem 16:9, corpo MDX com @tailwindcss/typography `prose`, sidebar desktop, AuthorBox, 3 artigos relacionados, CTA)

**Checkpoint**: Blog funcional com 3 artigos reais, filtros e tipografia premium ✅

---

## Phase 7: Páginas Complementares

**Purpose**: Completar todas as rotas previstas na arquitetura

- [x] T062 [P] Criar `dellano-site/src/app/politica-de-privacidade/page.tsx` (texto LGPD compliant)
- [x] T063 [P] Criar `dellano-site/src/app/politica-de-cookies/page.tsx` (texto + banner de cookies como client component)
- [x] T064 [P] Criar `dellano-site/src/app/not-found.tsx` (branded, logo, mensagem amigável, links de navegação principais, CTA)
- [x] T065 Verificar e ajustar `dellano-site/src/app/obrigado/page.tsx` (já criado em T046)

---

## Phase 8: SEO e Polish

**Purpose**: Metadados, performance e acessibilidade

- [x] T066 Implementar `generateMetadata` em `dellano-site/src/app/page.tsx` (home)
- [x] T067 [P] Implementar `generateMetadata` em todas as páginas estáticas: sobre, areas-de-atuacao, provas-digitais, equipe, artigos, publicacoes, contato
- [x] T068 [P] Implementar `generateMetadata` dinâmico em `dellano-site/src/app/artigos/[slug]/page.tsx` (title, description, og:image do frontmatter)
- [x] T069 [P] Adicionar JSON-LD schemas: Organization em layout.tsx, Person (Dellano) em /sobre, Article em /artigos/[slug]
- [x] T070 Executar `npm run build` e verificar geração de sitemap.xml e robots.txt via next-sitemap
- [x] T071 [P] Auditar responsividade em 375px, 768px, 1024px e 1440px — corrigir overflows e quebras de layout
- [x] T072 [P] Verificar todos os elementos interativos com navegação por teclado (Tab/Enter/Space) — adicionar `focus-visible` onde faltante
- [x] T073 [P] Verificar contraste de cores (mínimo 4.5:1 WCAG AA) nas combinações críticas (texto claro em bg-primary, texto escuro em bg-background)
- [x] T074 Adicionar `alt` texts descritivos em todas as imagens com `next/image`
- [x] T075 [P] Adicionar `priority={true}` na imagem hero (LCP otimizado)
- [x] T076 Executar Lighthouse audit em modo incógnito e ajustar até atingir 90+ em todas as métricas

---

## Dependencies & Execution Order

### Dependências entre fases

- **Phase 1 (Setup)**: Sem dependências — começar imediatamente
- **Phase 2 (Foundational)**: Depende de Phase 1 — bloqueia todas as user stories
- **Phase 3 (US1 — Home)**: Depende de Phase 2 — **MVP entregável após esta fase**
- **Phase 4 (US2 — Contato)**: Depende de Phase 2 — pode rodar em paralelo com Phase 3
- **Phase 5 (US3 — Credenciais)**: Depende de Phase 2 — pode rodar após Phase 3 concluída
- **Phase 6 (US4 — Blog)**: Depende de Phase 2 + lib/mdx.ts (T018)
- **Phase 7 (Complementares)**: Pode começar após Phase 3 estar concluída
- **Phase 8 (SEO/Polish)**: Depende de todas as páginas estarem implementadas

### Dependências internas críticas

- T025 (Header) e T026 (MobileMenu) devem ser concluídos antes de T029 (layout.tsx)
- T018 (lib/mdx.ts) deve ser concluído antes de T039 (FeaturedArticles) e toda a Phase 6
- T042 (schema Zod) deve ser concluído antes de T043 (API Route) e T044 (ContactForm)

### Oportunidades de paralelo

- Todas as tasks marcadas [P] dentro de uma fase podem rodar simultaneamente
- Phases 3 e 4 (US1 e US2) podem ser desenvolvidas em paralelo por desenvolvedores diferentes
- Phases 5 e 6 podem rodar em paralelo após Phase 3 concluída

---

## Parallel Example: Phase 2 (Foundational)

```
Em paralelo (arquivos diferentes):
  T011 — services.ts
  T012 — testimonials.ts
  T013 — team.ts
  T014 — risks.ts
  T015 — method.ts
  T016 — cities.ts
  T017 — navigation.ts
  T019 — Button.tsx
  T020 — SectionTitle.tsx
  T021 — Card.tsx
  T022 — Badge.tsx
  T023 — AnimatedSection.tsx
  T024 — Separator.tsx

Sequencial (depende do anterior):
  T010 → T018 → T025 → T026 → T027 → T028 → T029
```

---

## Implementation Strategy

### MVP (Phase 1 + 2 + 3)

1. Setup completo (T001–T009)
2. Fundação completa (T010–T029)
3. Home completa (T030–T041)
4. **VALIDAR**: Home responsiva, CTAs funcionais, animações, Lighthouse básico
5. Deploy preview na Vercel para aprovação do cliente

### Entrega Incremental

1. MVP (acima) → deploy preview
2. + Contato/WhatsApp (Phase 4) → formulário funcional
3. + Credenciais (Phase 5) → páginas de expertise
4. + Blog (Phase 6) → conteúdo editorial
5. + Complementares (Phase 7) → 100% das rotas
6. + SEO/Polish (Phase 8) → Lighthouse 90+, deploy produção

---

## Resumo

| Fase | Tasks | US | Paralelas |
|------|-------|----|-----------|
| Phase 1: Setup | T001–T009 | — | 5 |
| Phase 2: Foundational | T010–T029 | — | 14 |
| Phase 3: Home (US1) | T030–T041 | US1 | 8 |
| Phase 4: Contato (US2) | T042–T046 | US2 | 1 |
| Phase 5: Credenciais (US3) | T047–T054 | US3 | 3 |
| Phase 6: Blog (US4) | T055–T061 | US4 | 4 |
| Phase 7: Complementares | T062–T065 | — | 3 |
| Phase 8: SEO/Polish | T066–T076 | — | 8 |
| **Total** | **76 tasks** | **4 stories** | **46** |
