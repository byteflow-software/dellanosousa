# Feature Specification: Conformidade Ética OAB + Melhorias SEO/Estruturais

**Feature Branch**: `002-oab-compliance-seo`  
**Created**: 2026-04-11  
**Status**: Draft  
**Input**: Análise de conformidade com Provimento CFOAB 205/2021 e auditoria SEO/UX do site dellanosousa.com.br

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remoção de conteúdo que viola publicidade da OAB (Priority: P1)

O dono do escritório precisa que o site esteja em conformidade com as regras de publicidade da advocacia (Provimento CFOAB 205/2021) antes de qualquer divulgação ampla. Depoimentos publicitários, autoelogios ("reconhecido", "impecável"), termo "especialista" sem título acadêmico, e linguagem comercial agressiva ("Plantão 24h", "imediato", "agora") devem ser removidos ou ajustados.

**Why this priority**: Risco ético real — representação na OAB pode resultar em censura ou suspensão. Bloqueia qualquer ação de marketing.

**Independent Test**: Navegar por todas as páginas do site e verificar que nenhum depoimento, autoelogio ou linguagem comercial vedada aparece.

**Acceptance Scenarios**:

1. **Given** a home page carregada, **When** o visitante rola até onde ficava a seção de depoimentos, **Then** a seção não existe mais; em seu lugar aparece uma seção de "Publicações e Reconhecimento Institucional"
2. **Given** qualquer página do site, **When** o visitante busca por "Plantão 24h", **Then** não encontra — o texto foi substituído por "Atendimento em casos urgentes"
3. **Given** a página /sobre, **When** o visitante lê a bio, **Then** não encontra "Reconhecido nacionalmente" nem "Especialista em Computação Forense" — encontra "Com atuação nacional" e "Atuação especializada em Computação Forense"
4. **Given** qualquer página, **When** o visitante olha o header, **Then** vê "OAB/CE 53.322" ao lado do logo

---

### User Story 2 - URLs individuais por área de atuação (Priority: P2)

Um potencial cliente pesquisa no Google "investigação defensiva advogado" e encontra a landing page dedicada /areas-de-atuacao/investigacao-defensiva com conteúdo expandido, FAQ e base legal. Cada uma das 6 áreas tem sua própria URL indexável.

**Why this priority**: Sem URLs individuais, o site não pode ranquear para buscas específicas. É a alavanca de SEO com maior impacto.

**Independent Test**: Acessar cada uma das 6 URLs e verificar conteúdo expandido, FAQ e schema.

**Acceptance Scenarios**:

1. **Given** a URL /areas-de-atuacao/investigacao-defensiva, **When** o visitante acessa, **Then** vê conteúdo expandido com definição técnica, base legal, FAQ com 5 perguntas, e CTA
2. **Given** a página índice /areas-de-atuacao, **When** o visitante clica em uma área, **Then** é levado à subpágina dedicada
3. **Given** qualquer subpágina de área, **When** o Google indexa, **Then** encontra JSON-LD de FAQPage e LegalService

---

### User Story 3 - Schema.org em todas as páginas (Priority: P2)

Os motores de busca rastreiam o site e encontram dados estruturados (JSON-LD) que identificam o escritório como Attorney/LegalService, os artigos como Article, e as FAQs como FAQPage.

**Why this priority**: Schema.org gera rich snippets no Google, aumenta CTR orgânico e sinaliza autoridade temática.

**Independent Test**: Validar cada página no Google Rich Results Test e confirmar que os schemas são reconhecidos sem erros.

**Acceptance Scenarios**:

1. **Given** o layout global, **When** qualquer página é carregada, **Then** contém JSON-LD com schema Attorney e Organization
2. **Given** um artigo individual, **When** carregado, **Then** contém JSON-LD de Article com autor, data, imagem
3. **Given** uma subpágina de área com FAQ, **When** carregada, **Then** contém JSON-LD de FAQPage

---

### User Story 4 - Melhorias na página de artigos (Priority: P3)

O visitante acessa /artigos e consegue buscar por palavra-chave, filtrar por categoria, ver tempo de leitura estimado e compartilhar artigos.

**Why this priority**: Melhora engajamento e tempo no site, sinais positivos para SEO.

**Independent Test**: Acessar /artigos, digitar uma busca, filtrar por categoria, verificar tempo de leitura, clicar em compartilhar.

**Acceptance Scenarios**:

1. **Given** a página /artigos, **When** o visitante digita "cadeia de custódia" no campo de busca, **Then** apenas artigos com esse termo no título ou excerpt aparecem
2. **Given** a página /artigos, **When** o visitante clica em um filtro de categoria, **Then** apenas artigos daquela categoria aparecem
3. **Given** qualquer card de artigo, **When** exibido, **Then** mostra tempo de leitura estimado e autor

---

### User Story 5 - Formulário de contato com LGPD (Priority: P3)

O visitante preenche o formulário de contato e deve marcar um checkbox de consentimento LGPD antes de enviar, além de informar seu estado/UF.

**Why this priority**: Conformidade com a LGPD e coleta de dado relevante (localização) para triagem de leads.

**Independent Test**: Tentar enviar formulário sem checkbox marcado — deve ser bloqueado. Enviar com checkbox marcado e UF selecionado — deve funcionar.

**Acceptance Scenarios**:

1. **Given** o formulário de contato, **When** o visitante tenta enviar sem marcar o checkbox LGPD, **Then** uma mensagem de erro aparece e o envio é bloqueado
2. **Given** o formulário de contato, **When** o visitante seleciona seu estado no dropdown de UF, **Then** o valor é enviado junto com os demais dados

---

### User Story 6 - Novas páginas institucionais: FAQ, Imprensa, Eventos (Priority: P3)

O site ganha três novas páginas que ampliam a percepção de autoridade: /faq (perguntas frequentes com schema), /imprensa (kit de imprensa), /eventos (palestras e participações).

**Why this priority**: Ampliam footprint SEO e credibilidade institucional.

**Independent Test**: Acessar /faq, /imprensa, /eventos — todas devem carregar com conteúdo e navegação funcional.

**Acceptance Scenarios**:

1. **Given** /faq, **When** carregada, **Then** exibe 15-20 perguntas organizadas por categoria com JSON-LD FAQPage
2. **Given** /imprensa, **When** carregada, **Then** exibe bio resumida, foto, temas para comentário e contato de imprensa
3. **Given** /eventos, **When** carregada, **Then** exibe lista de eventos com data, local e descrição

---

### User Story 7 - Enriquecimento da página Provas Digitais (Priority: P3)

A página /provas-digitais ganha conteúdo técnico que diferencia o escritório: ferramentas forenses, tabela comparativa de tipos de prova, normas internacionais e fluxograma de cadeia de custódia.

**Why this priority**: É a página de maior diferenciação competitiva — precisa demonstrar profundidade técnica.

**Independent Test**: Acessar /provas-digitais e verificar que as novas seções estão visíveis e bem formatadas.

**Acceptance Scenarios**:

1. **Given** /provas-digitais, **When** o visitante rola, **Then** encontra seção de ferramentas forenses com nomes e descrições
2. **Given** /provas-digitais, **When** o visitante rola, **Then** encontra tabela comparativa "print unilateral × ata notarial × extração forense"
3. **Given** /provas-digitais, **When** o visitante rola, **Then** encontra lista de normas internacionais (ISO/IEC 27037, NIST SP 800-86, RFC 3227)
4. **Given** /provas-digitais, **When** o visitante rola, **Then** encontra fluxograma visual de cadeia de custódia

---

### User Story 8 - Newsletter / Lead Magnet (Priority: P4)

O visitante pode se inscrever em uma newsletter com e-mail, disponível no rodapé da home e na página de artigos.

**Why this priority**: Captura leads de topo de funil para nutrição futura. Menor urgência que conformidade e SEO.

**Independent Test**: Inserir e-mail válido no formulário de newsletter e verificar que o lead é registrado via Resend.

**Acceptance Scenarios**:

1. **Given** o rodapé da home ou a página de artigos, **When** o visitante insere e-mail e clica "Inscrever", **Then** recebe confirmação visual e o e-mail é registrado
2. **Given** o formulário de newsletter, **When** o visitante insere e-mail inválido, **Then** vê mensagem de erro

---

### Edge Cases

- O que acontece se o visitante acessa /areas-de-atuacao/slug-inexistente? Deve exibir 404 customizado.
- Como a busca de artigos lida com termos sem resultado? Exibe mensagem "Nenhum artigo encontrado".
- O que acontece se o checkbox LGPD não for marcado e o JS estiver desabilitado? A validação server-side deve rejeitar.
- Como o formulário de newsletter lida com e-mails duplicados? Aceita silenciosamente (idempotente).

## Requirements *(mandatory)*

### Functional Requirements

**Conformidade Ética**
- **FR-001**: Sistema DEVE remover completamente o componente TestimonialsSection da home page e seus dados associados
- **FR-002**: Sistema DEVE substituir toda ocorrência de "Plantão 24h" por "Atendimento em casos urgentes" em todas as páginas
- **FR-003**: Sistema DEVE remover linguagem comercial vedada ("imediato", "agora", "cada hora conta") de todos os textos
- **FR-004**: Sistema DEVE substituir "Especialista em Computação Forense" por "Atuação especializada em Computação Forense"
- **FR-005**: Sistema DEVE substituir "Reconhecido nacionalmente" por "Com atuação nacional"
- **FR-006**: Sistema DEVE exibir "OAB/CE 53.322" no Header (ao lado do logo) e no Footer (abaixo do logo)
- **FR-007**: Sistema DEVE substituir "Escritório Especializado" por "Escritório de Advocacia Criminal" no Hero
- **FR-008**: Sistema DEVE adicionar seção "Publicações e Reconhecimento Institucional" na home no lugar dos depoimentos

**SEO Estrutural**
- **FR-009**: Sistema DEVE criar rota dinâmica /areas-de-atuacao/[slug] com páginas individuais para cada área
- **FR-010**: Sistema DEVE gerar 6 páginas estáticas usando generateStaticParams com slugs de services.ts
- **FR-011**: Cada subpágina de área DEVE conter: definição técnica expandida, base legal, FAQ (5 perguntas), CTA
- **FR-012**: Sistema DEVE implementar JSON-LD schema Attorney e Organization no layout global
- **FR-013**: Sistema DEVE implementar JSON-LD schema Article em cada página de artigo
- **FR-014**: Sistema DEVE implementar JSON-LD schema FAQPage em páginas com FAQ

**Artigos**
- **FR-015**: Página /artigos DEVE ter campo de busca client-side que filtra por título e excerpt
- **FR-016**: Página /artigos DEVE ter filtros por categoria
- **FR-017**: Cards de artigo DEVEM exibir tempo de leitura estimado e nome do autor
- **FR-018**: Artigos DEVEM ter botões de compartilhamento (copiar link, WhatsApp, LinkedIn)

**Contato**
- **FR-019**: Formulário de contato DEVE ter checkbox obrigatório de consentimento LGPD com link para /politica-de-privacidade
- **FR-020**: Formulário de contato DEVE ter dropdown de estado/UF

**Novas Páginas**
- **FR-021**: Sistema DEVE criar página /faq com 15-20 perguntas organizadas por categoria
- **FR-022**: Sistema DEVE criar página /imprensa com bio, foto, temas e contato
- **FR-023**: Sistema DEVE criar página /eventos com lista de eventos/palestras
- **FR-024**: Navegação principal DEVE ser atualizada para incluir novas páginas relevantes

**Provas Digitais**
- **FR-025**: Página /provas-digitais DEVE incluir seção de ferramentas forenses
- **FR-026**: Página /provas-digitais DEVE incluir tabela comparativa de tipos de prova
- **FR-027**: Página /provas-digitais DEVE incluir lista de normas internacionais
- **FR-028**: Página /provas-digitais DEVE incluir fluxograma visual de cadeia de custódia

**Newsletter**
- **FR-029**: Sistema DEVE exibir formulário de captura de e-mail na home e em /artigos
- **FR-030**: Sistema DEVE registrar inscrições via API usando Resend

### Key Entities

- **Service (expandido)**: Área de atuação com slug, conteúdo expandido, base legal, FAQ
- **FAQ Item**: Pergunta + resposta, associada a uma categoria
- **Event**: Palestra/evento com título, data, local, descrição, link opcional
- **Press Kit**: Bio curta, foto URL, temas, contato de imprensa
- **Newsletter Subscriber**: E-mail, data de inscrição

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero violações das regras de publicidade da OAB identificáveis no site (depoimentos, autoelogios, linguagem comercial agressiva)
- **SC-002**: 6 URLs individuais de áreas de atuação indexáveis e com conteúdo expandido
- **SC-003**: Schemas JSON-LD validados sem erros em todas as páginas
- **SC-004**: Visitantes conseguem filtrar e buscar artigos na página /artigos com resultados instantâneos
- **SC-005**: 100% dos envios do formulário de contato incluem consentimento LGPD explícito
- **SC-006**: 3 novas páginas institucionais (/faq, /imprensa, /eventos) acessíveis e indexáveis
- **SC-007**: Lighthouse Performance score mantido acima de 90 após todas as mudanças

## Assumptions

- O domínio permanece em Vercel (dellanosousa.vercel.app) nesta fase — migração para .adv.br é ação externa separada
- Os textos expandidos das áreas de atuação serão redigidos com base no conteúdo existente em services.ts, expandidos com informações jurídicas públicas (artigos do CPP, Marco Civil)
- As ferramentas forenses listadas em /provas-digitais usarão nomes genéricos das principais ferramentas do mercado, preparadas para customização posterior pelo Dellano
- O conteúdo do FAQ será baseado em perguntas comuns sobre provas digitais e defesa criminal
- A newsletter usará Resend (já configurado no projeto) para receber inscrições
- Fotos da equipe e links LinkedIn dependem de dados do Dellano — fora do escopo desta feature
- Validação jurídica do Provimento CFOAB 205/2021 e Resolução CNJ 564/2023 é responsabilidade do escritório
