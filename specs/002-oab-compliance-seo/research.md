# Research: Conformidade Ética OAB + Melhorias SEO

## Schema.org para Advogados

**Decision**: Usar tipos `Attorney`, `LegalService`, `Organization`, `Article`, `FAQPage`, `Person`  
**Rationale**: São os tipos mais relevantes do schema.org para escritórios de advocacia. `Attorney` herda de `LegalService` e `LocalBusiness`, cobrindo endereço, área de atuação e telefone.  
**Alternatives**: `ProfessionalService` (genérico demais), `LawFirm` (não existe no schema.org oficial)

## JSON-LD vs Microdata vs RDFa

**Decision**: JSON-LD via `<script type="application/ld+json">`  
**Rationale**: Recomendado pelo Google, não polui o HTML, fácil de gerar em componentes React  
**Alternatives**: Microdata (intrusivo no JSX), RDFa (complexo, menor suporte)

## Rota dinâmica para áreas de atuação

**Decision**: `generateStaticParams` + dados estáticos em `services.ts` expandido  
**Rationale**: Next.js 15 App Router suporta SSG com `generateStaticParams`. Dados já existem em `services.ts`, só precisam ser expandidos. Sem necessidade de CMS ou MDX para conteúdo de áreas.  
**Alternatives**: MDX por área (overhead desnecessário para conteúdo que muda raramente), CMS (fora do escopo)

## Resend para Newsletter

**Decision**: Reutilizar Resend (já configurado para formulário de contato) com audiência/lista  
**Rationale**: Resend suporta contatos/audiences API. Não precisa de Mailchimp ou outro serviço.  
**Alternatives**: Mailchimp (dependência externa nova), ConvertKit (pago, complexo para o volume)

## Busca de artigos client-side

**Decision**: Filtro client-side com estado React (useState + filter)  
**Rationale**: Com ~5-20 artigos, busca client-side é instantânea e não requer API. Os dados já são carregados na página.  
**Alternatives**: Algolia/MeiliSearch (overkill para < 100 artigos), API route (latência desnecessária)

## Fluxograma de cadeia de custódia

**Decision**: Componente React com CSS/Tailwind (diagrama estático responsivo)  
**Rationale**: Um fluxograma com ~6-8 etapas lineares não precisa de biblioteca de diagramas. CSS flexbox/grid + setas SVG simples são suficientes.  
**Alternatives**: Mermaid.js (dependência pesada), imagem estática (não responsivo, difícil manter)
