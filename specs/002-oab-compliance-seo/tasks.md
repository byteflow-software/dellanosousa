# Tasks: Conformidade Ética OAB + Melhorias SEO

**Input**: Design documents from `/specs/002-oab-compliance-seo/`
**Branch**: `002-oab-compliance-seo`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes)
- **[Story]**: US1-US8 conforme spec.md

---

## Phase 1: Foundational (Shared)

- [ ] T001 [P] Criar `dellano-site/src/data/brazilian-states.ts` com lista das 27 UFs
- [ ] T002 [P] Criar `dellano-site/src/components/layout/JsonLd.tsx` — componente wrapper para JSON-LD schemas

---

## Phase 2: US1 — Conformidade Ética (P1) 🎯 MVP

**Goal**: Zerar riscos éticos antes de qualquer divulgação.

- [ ] T010 [US1] Remover import e uso de `TestimonialsSection` em `dellano-site/src/app/page.tsx`
- [ ] T011 [US1] Deletar `dellano-site/src/components/home/TestimonialsSection.tsx` e `dellano-site/src/data/testimonials.ts`
- [ ] T012 [US1] Deletar imagens em `dellano-site/public/images/testimonials/` (talvane, smaylle, carlos, emilio)
- [ ] T013 [US1] Criar `dellano-site/src/components/home/InstitutionalRecognition.tsx` (publicações/palestras/mídia) e adicionar em `page.tsx`
- [ ] T014 [US1] Editar `dellano-site/src/components/layout/Header.tsx`: trocar "Plantão 24h" por "Atendimento urgente"; adicionar "OAB/CE 53.322"
- [ ] T015 [US1] Editar `dellano-site/src/components/layout/Footer.tsx`: trocar "Plantão 24h (WhatsApp)" por "Atendimento urgente (WhatsApp)"; adicionar "OAB/CE 53.322"
- [ ] T016 [US1] Editar `dellano-site/src/components/home/Hero.tsx`: "Plantão 24h" → "Atendimento urgente"; "Escritório Especializado" → "Escritório de Advocacia Criminal"
- [ ] T017 [US1] Editar `dellano-site/src/app/contato/page.tsx`: títulos/textos sem "Plantão 24h", "agora", "imediato"
- [ ] T018 [US1] Editar `dellano-site/src/app/sobre/page.tsx`: "Especialista em Computação Forense" → "Atuação especializada"; "Reconhecido nacionalmente" → "Com atuação nacional"
- [ ] T019 [US1] Editar `dellano-site/src/data/services.ts` item #6 ("Consultoria em Casos Urgentes"): remover "Atendimento imediato", "Plantão 24 horas", "desde o primeiro momento"
- [ ] T020 [US1] Atualizar metadata da home (`page.tsx`) e layout.tsx: remover "Plantão 24h" de descriptions

**Checkpoint**: Site eticamente conforme.

---

## Phase 3: US2 — URLs individuais por área (P2)

- [ ] T030 [US2] Expandir `dellano-site/src/types/index.ts`: adicionar campos `expandedContent`, `legalBasis`, `faq`, `metaDescription` ao tipo `Service`
- [ ] T031 [US2] Expandir `dellano-site/src/data/services.ts` com conteúdo expandido, base legal e FAQ (5 por área) para as 6 áreas
- [ ] T032 [US2] Criar `dellano-site/src/app/areas-de-atuacao/[slug]/page.tsx` com `generateStaticParams` e metadata dinâmica
- [ ] T033 [US2] Atualizar `dellano-site/src/app/areas-de-atuacao/page.tsx` (índice) para linkar subpáginas via `<Link href={`/areas-de-atuacao/${slug}`}>`

---

## Phase 4: US3 — Schema.org JSON-LD (P2)

- [ ] T040 [US3] Adicionar JSON-LD Attorney + Organization em `dellano-site/src/app/layout.tsx` (via `JsonLd` component)
- [ ] T041 [US3] Adicionar JSON-LD Article em `dellano-site/src/app/artigos/[slug]/page.tsx`
- [ ] T042 [US3] Adicionar JSON-LD FAQPage nas subpáginas de área (em `[slug]/page.tsx`)

---

## Phase 5: US4 — Busca/filtros em artigos (P3)

- [ ] T050 [US4] Criar `dellano-site/src/components/artigos/ArticleSearch.tsx` (client-side, useState filter)
- [ ] T051 [US4] Criar `dellano-site/src/components/artigos/ShareButtons.tsx` (copy link, WhatsApp, LinkedIn)
- [ ] T052 [US4] Atualizar `dellano-site/src/app/artigos/page.tsx` para usar `ArticleSearch`
- [ ] T053 [US4] Atualizar `dellano-site/src/components/artigos/ArticleCard.tsx` para exibir `readTime` e `author`
- [ ] T054 [US4] Atualizar `dellano-site/src/app/artigos/[slug]/page.tsx` para renderizar `ShareButtons`
- [ ] T055 [US4] Garantir campos `readTime`/`author` em `dellano-site/src/lib/mdx.ts` (computar tempo de leitura a partir do conteúdo)

---

## Phase 6: US5 — LGPD + UF no formulário (P3)

- [ ] T060 [US5] Editar `dellano-site/src/lib/schemas/contact.ts` — adicionar `lgpdConsent: z.literal(true)` e `state: z.string().length(2)`
- [ ] T061 [US5] Editar `dellano-site/src/components/contato/ContactForm.tsx` — renderizar checkbox LGPD (link /politica-de-privacidade) e dropdown de UF
- [ ] T062 [US5] Editar `dellano-site/src/app/api/contato/route.ts` — persistir novos campos no e-mail enviado via Resend

---

## Phase 7: US6 — Novas páginas institucionais (P3)

- [ ] T070 [P] [US6] Criar `dellano-site/src/data/faq.ts` com 15-20 perguntas agrupadas por categoria
- [ ] T071 [P] [US6] Criar `dellano-site/src/data/events.ts` com estrutura inicial (pode ter 1-2 eventos existentes como seed)
- [ ] T072 [P] [US6] Criar `dellano-site/src/data/press.ts` com bio, temas, contato
- [ ] T073 [US6] Criar `dellano-site/src/app/faq/page.tsx` com schema FAQPage
- [ ] T074 [US6] Criar `dellano-site/src/app/imprensa/page.tsx`
- [ ] T075 [US6] Criar `dellano-site/src/app/eventos/page.tsx`
- [ ] T076 [US6] Atualizar `dellano-site/src/data/navigation.ts` para incluir /faq (pode deixar /imprensa e /eventos apenas no footer para não poluir)
- [ ] T077 [US6] Atualizar `dellano-site/src/components/layout/Footer.tsx` para linkar novas páginas

---

## Phase 8: US7 — Enriquecer Provas Digitais (P3)

- [ ] T080 [P] [US7] Criar `dellano-site/src/data/forensic-tools.ts`
- [ ] T081 [P] [US7] Criar `dellano-site/src/components/provas-digitais/ComparisonTable.tsx`
- [ ] T082 [P] [US7] Criar `dellano-site/src/components/provas-digitais/CustodyFlowchart.tsx`
- [ ] T083 [US7] Editar `dellano-site/src/app/provas-digitais/page.tsx` — adicionar seções: ferramentas, tabela comparativa, normas internacionais, fluxograma

---

## Phase 9: US8 — Newsletter (P4)

- [ ] T090 [US8] Criar `dellano-site/src/components/home/NewsletterCTA.tsx`
- [ ] T091 [US8] Criar `dellano-site/src/app/api/newsletter/route.ts` com integração Resend
- [ ] T092 [US8] Adicionar `NewsletterCTA` em `dellano-site/src/app/page.tsx` (antes do FinalCTA) e em `dellano-site/src/app/artigos/page.tsx`

---

## Phase 10: Validação

- [ ] T100 Atualizar `dellano-site/next-sitemap.config.js` (ou `next-sitemap.config.mjs`) para incluir novas rotas dinâmicas
- [ ] T101 Rodar `npm run build` em `dellano-site/` e garantir zero erros TypeScript/lint
- [ ] T102 Rodar `npm run dev` e percorrer visualmente todas as rotas novas/alteradas

---

## Ordem recomendada

1. **Phase 1** (foundation, paralelo)
2. **Phase 2 (US1)** — crítica, resolve risco ético
3. **Phase 3 (US2)** + **Phase 4 (US3)** — SEO
4. **Phase 5-9** — melhorias incrementais
5. **Phase 10** — validação final
