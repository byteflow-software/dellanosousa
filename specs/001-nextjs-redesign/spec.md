# Feature Specification: Redesign dellanosousa.com.br — Next.js

**Feature Branch**: `001-nextjs-redesign`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: Redesign completo do site dellanosousa.com.br de WordPress para Next.js

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitante acessa o site e entende a proposta do escritório (Priority: P1)

Um potencial cliente chega ao site por busca orgânica ou indicação. Em segundos precisa entender quem é Dellano Sousa, o que o escritório faz e por que é diferente — e então tomar uma ação (WhatsApp ou formulário).

**Why this priority**: É o fluxo de conversão principal. Sem clareza imediata, o visitante abandona o site. Toda a receita do escritório depende desse momento.

**Independent Test**: Pode ser testado acessando apenas a Home (`/`) e verificando se todas as 10 seções estão presentes, responsivas e com CTAs funcionais para WhatsApp e formulário.

**Acceptance Scenarios**:

1. **Given** um visitante acessa `/`, **When** a página carrega, **Then** o hero exibe headline, subtítulo, foto do Dellano e 2 botões de CTA (WhatsApp e consulta) em até 2 segundos.
2. **Given** um visitante lê a seção de serviços, **When** passa o mouse sobre um card, **Then** o card exibe elevação sutil e borda gold com transição de 300ms.
3. **Given** um visitante está em qualquer seção da home, **When** clica em "Plantão 24h" (header ou CTA), **Then** é redirecionado ao WhatsApp `https://wa.me/message/PWFG7DRODCD6I1` em nova aba.
4. **Given** um visitante acessa pelo celular (375px), **When** visualiza a home, **Then** todas as seções são legíveis e os CTAs estão acessíveis sem zoom ou scroll horizontal.

---

### User Story 2 — Cliente em situação urgente busca atendimento imediato (Priority: P1)

Um réu, familiar ou empresário em situação de crise (prisão, busca e apreensão, investigação sigilosa) precisa falar com o escritório imediatamente, a qualquer hora.

**Why this priority**: O diferencial "Plantão 24h" é central para o posicionamento. Casos urgentes representam alto valor e alta urgência — qualquer fricção de contato é conversão perdida.

**Independent Test**: Pode ser testado verificando o botão flutuante de WhatsApp em todas as páginas, a página `/contato` e o formulário de contato com envio funcional.

**Acceptance Scenarios**:

1. **Given** um visitante está em qualquer página, **When** visualiza o canto inferior direito, **Then** vê o botão flutuante do WhatsApp com animação pulse e ao clicar é redirecionado ao WhatsApp.
2. **Given** um visitante acessa `/contato`, **When** preenche o formulário (nome, e-mail, telefone, assunto, mensagem) e clica em enviar, **Then** recebe confirmação de envio e é redirecionado para `/obrigado`.
3. **Given** um visitante envia o formulário com campos inválidos, **When** clica em enviar, **Then** vê mensagens de erro inline em cada campo inválido sem recarregar a página.

---

### User Story 3 — Advogado ou colega busca credenciais técnicas do Dellano (Priority: P2)

Um advogado parceiro ou jornalista quer verificar a expertise em provas digitais, publicações e participações do Dellano antes de indicar ou entrevistar.

**Why this priority**: Credibilidade técnica é o diferencial posicionador do escritório. Esse fluxo justifica o investimento em páginas dedicadas de Sobre, Publicações e Provas Digitais.

**Independent Test**: Pode ser testado acessando `/sobre`, `/provas-digitais` e `/publicacoes` e verificando se as informações de credenciais estão completas e bem estruturadas.

**Acceptance Scenarios**:

1. **Given** um visitante acessa `/sobre`, **When** a página carrega, **Then** exibe biografia, linha do tempo profissional, badges de credenciais (ABRACRIM, Comissão Investigação Defensiva, Computação Forense) e palestras.
2. **Given** um visitante acessa `/provas-digitais`, **When** lê a página, **Then** encontra conceito, tipos de evidência, riscos e entregáveis do escritório de forma técnica e clara.
3. **Given** um visitante acessa `/publicacoes`, **When** a página carrega, **Then** encontra seções de palestras/eventos, mídia/entrevistas e publicações externas com datas e links.

---

### User Story 4 — Jurista busca conteúdo técnico sobre provas digitais (Priority: P3)

Um advogado, estudante ou pesquisador chega ao site pelo Google buscando conteúdo especializado em provas digitais, cadeia de custódia ou investigação defensiva.

**Why this priority**: Gera autoridade de SEO e atrai leads qualificados organicamente. Importante para crescimento de médio prazo, mas não é o fluxo de conversão imediata.

**Independent Test**: Pode ser testado acessando `/artigos`, filtrando por categoria e abrindo um artigo individual — verificando leitura, tipografia e artigos relacionados.

**Acceptance Scenarios**:

1. **Given** um visitante acessa `/artigos`, **When** a página carrega, **Then** vê artigo em destaque, barra de busca, filtros por categoria e grid de cards (3 colunas desktop, 1 mobile).
2. **Given** um visitante clica em um artigo, **When** a página `/artigos/[slug]` carrega, **Then** o corpo do artigo usa tipografia `prose` premium com Cormorant Garamond nos títulos e Inter no corpo.
3. **Given** um visitante termina de ler um artigo, **When** chega ao fim da página, **Then** vê seção "Sobre o autor", 3 artigos relacionados e um CTA para contato.

---

### Edge Cases

- O que acontece se o visitante acessa uma URL inexistente? → Página 404 personalizada com logo, mensagem amigável e links de navegação principais.
- O que acontece se o formulário de contato falha no envio? → Mensagem de erro clara com instrução para tentar via WhatsApp.
- O que acontece se o visitante acessa sem JavaScript? → Conteúdo principal permanece legível via SSR/SSG; animações são progressive enhancement.
- O que acontece em telas muito largas (>1440px)? → Container limitado a `max-w-7xl` (1280px) centralizado.
- O que acontece se uma imagem de artigo não existir? → Placeholder com gradiente da identidade visual.

---

## Requirements *(mandatory)*

### Functional Requirements

**Site e Navegação**
- **FR-001**: O site DEVE ter um header sticky com logo, navegação principal (7 itens) e CTA "Plantão 24h" vinculado ao WhatsApp.
- **FR-002**: O header DEVE aplicar backdrop-blur e fundo semi-transparente ao rolar a página.
- **FR-003**: O site DEVE ter menu mobile com painel deslizante em telas abaixo de 768px.
- **FR-004**: O site DEVE exibir botão flutuante do WhatsApp com animação de pulso em todas as páginas.
- **FR-005**: O footer DEVE ter 4 colunas (Institucional, Atuação, Conteúdo, Contato) com links funcionais, redes sociais e copyright com ano dinâmico.

**Home**
- **FR-006**: A home DEVE compor exatamente 10 seções na ordem: Hero, AuthorityBar, Quem é Dellano, ServicesGrid, RisksSection, MethodSection, Testimonials, FeaturedArticles, GeographicPresence, FinalCTA.
- **FR-007**: A seção Hero DEVE exibir headline, subtítulo, 2 CTAs e foto do Dellano com animação fade-up escalonada na entrada.
- **FR-008**: A seção ServicesGrid DEVE exibir 6 cards de serviços em grid 3 colunas (desktop) com hover interativo.
- **FR-009**: A seção MethodSection DEVE exibir 5 etapas em sequência com animação ativada pelo scroll.
- **FR-010**: A seção Testimonials DEVE exibir 4 depoimentos (Talvane Moura, Smailly Carvalho, Carlos Eduardo Costa, Emilio Assumpção).

**Páginas Internas**
- **FR-011**: A página `/sobre` DEVE conter biografia completa, linha do tempo profissional, credenciais em badges e CTA de contato.
- **FR-012**: A página `/areas-de-atuacao` DEVE listar 6 núcleos com explicação, público-alvo, como o escritório atua e o que é entregue.
- **FR-013**: A página `/provas-digitais` DEVE conter conceito, tipos de evidência digital, riscos de prova mal obtida e entregáveis do escritório.
- **FR-014**: A página `/equipe` DEVE destacar o Dellano como principal e exibir equipe de apoio com hierarquia visual clara.
- **FR-015**: A página `/contato` DEVE ter formulário e informações de contato em layout de 2 colunas, com destaque para WhatsApp e plantão 24h.

**Formulário de Contato**
- **FR-016**: O formulário DEVE validar todos os campos com feedback inline antes do envio.
- **FR-017**: O formulário DEVE enviar os dados via rota de API interna e redirecionar para `/obrigado` em caso de sucesso.
- **FR-018**: Em caso de falha de envio, o formulário DEVE exibir mensagem de erro com instrução alternativa via WhatsApp.

**Blog / Artigos**
- **FR-019**: O hub `/artigos` DEVE suportar filtro por categoria e busca textual nos títulos e excerpts.
- **FR-020**: Artigos individuais DEVEM ser gerados estaticamente a partir de arquivos de conteúdo locais.
- **FR-021**: O sistema DEVE incluir pelo menos 3 artigos de exemplo com conteúdo representativo da área jurídica.

**SEO e Performance**
- **FR-022**: Cada página DEVE ter metadados únicos (title, description, og:image) gerados dinamicamente.
- **FR-023**: O site DEVE gerar sitemap.xml e robots.txt automaticamente no build.
- **FR-024**: Todas as imagens DEVEM usar lazy loading com formato otimizado (WebP/AVIF).
- **FR-025**: Fontes DEVEM ser carregadas com estratégia que evita layout shift (font-display: swap com subsets reduzidos).

**Acessibilidade**
- **FR-026**: Todos os elementos interativos DEVEM ter foco visível e atributos de acessibilidade adequados.
- **FR-027**: Contraste de texto/fundo DEVE atender WCAG 2.1 nível AA (mínimo 4.5:1 para texto normal).

**Páginas Complementares**
- **FR-028**: O site DEVE ter página 404 personalizada com logo, mensagem amigável e links de navegação.
- **FR-029**: O site DEVE ter páginas de Política de Privacidade e Política de Cookies com banner de aceite.
- **FR-030**: O site DEVE ter página `/publicacoes` com seções de palestras, mídia e publicações externas.

### Key Entities

- **Serviço**: id, título, descrição curta, ícone, slug — 6 serviços jurídicos do escritório.
- **Depoimento**: nome, cargo, texto, foto — 4 clientes/parceiros.
- **Membro da Equipe**: nome, cargo, bio, foto, linkedin, hierarquia (principal/apoio).
- **Artigo**: slug, título, data, autor, categoria, excerpt, coverImage, conteúdo, destaque (boolean).
- **Risco**: título, descrição, ícone — 5 riscos sobre provas digitais mal obtidas.
- **Etapa do Método**: número, título, descrição — 5 etapas do método de atuação.
- **Cidade**: nome — 4 cidades de presença (Fortaleza, Teresina, Brasília, Ribeirão Preto).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A home carrega e exibe conteúdo visível em menos de 2 segundos em conexão 4G simulada.
- **SC-002**: O Lighthouse score atinge 90+ em Performance, Accessibility, SEO e Best Practices.
- **SC-003**: O site é funcional e sem overflow horizontal nas larguras 375px, 768px, 1024px e 1440px.
- **SC-004**: Um visitante consegue iniciar contato via WhatsApp em no máximo 2 cliques a partir de qualquer página.
- **SC-005**: O formulário de contato completa envio e redireciona para `/obrigado` em menos de 5 segundos.
- **SC-006**: Todas as 11 rotas principais estão acessíveis e retornam conteúdo válido.
- **SC-007**: Animações rodam sem layout shift perceptível (CLS < 0.1 medido pelo Lighthouse).
- **SC-008**: O sitemap.xml gerado contém todas as rotas públicas do site.
- **SC-009**: Nenhum elemento interativo falha na navegação por teclado (Tab + Enter/Space).

---

## Assumptions

- Fotos profissionais do Dellano e da equipe serão fornecidas posteriormente; placeholders com gradiente da identidade visual são usados durante o desenvolvimento.
- O envio do formulário usará Resend como provedor de e-mail; alternativa é Nodemailer com SMTP caso necessário.
- CMS é MDX local nesta fase; migração para headless CMS é fase 2 fora do escopo atual.
- Deploy ocorrerá na Vercel com as variáveis de ambiente definidas no planejamento.
- Os 4 depoimentos (Talvane Moura, Smailly Carvalho, Carlos Eduardo Costa, Emilio Assumpção) são dados estáticos aprovados pelo escritório.
- O conteúdo textual definitivo (bio, áreas de atuação, publicações) será fornecido pelo escritório antes da publicação; conteúdo representativo é usado durante o desenvolvimento.
- Google Analytics 4 e Vercel Analytics serão integrados mas não fazem parte dos critérios de aceitação desta fase.
- Conformidade LGPD completa é responsabilidade editorial do escritório; o site fornece a infraestrutura técnica (banner de cookies, política de privacidade).
