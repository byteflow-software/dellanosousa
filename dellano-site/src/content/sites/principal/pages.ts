export const pages = {
  sobre: {
    eyebrow: 'Perfil Profissional',
    title: 'Dellano Sousa',
    subtitle:
      'Advogado Criminal — OAB/CE 53.322 | OAB/PI 25.100 · Atuação especializada em provas digitais, investigação defensiva e grandes operações',
    image: {
      src: '/images/dellano/dellano-sobre.jpeg',
      alt: 'Dellano Sousa — Advogado Criminal e Especialista em Provas Digitais',
    },
    ctaPrimaryLabel: 'Agendar consulta',
    lecturesTitle: 'Palestras e Participações',
    finalCta: {
      title: 'Precisa de uma defesa técnica e estratégica?',
      ctaLabel: 'Entre em contato',
    },
    fallbackBio: `Dellano Sousa é advogado criminalista, com atuação nacional e dedicação ao estudo de provas digitais e da investigação defensiva. Atua em casos de alta complexidade que envolvem evidências tecnológicas, interceptações, extrações forenses e análise de dados digitais.

Coordenador Nacional das Prerrogativas Digitais da ABRACRIM, Vice-Presidente da Comissão de Direito Digital da ABRACRIM e membro da ABRACRIM, Dellano une o rigor do processo penal brasileiro ao conhecimento técnico em computação forense. Essa combinação permite a construção de teses defensivas sólidas, a identificação de fragilidades probatórias que poderiam passar despercebidas e a elaboração de pareceres técnicos de relevância nos tribunais.

Autor de artigos jurídicos publicados no ConJur e no Migalhas, Dellano também se destaca pela produção de conteúdo técnico voltado à advocacia criminal, com enfoque em cadeia de custódia, admissibilidade da prova digital, contraditório técnico e garantias processuais.

Com escritório-sede em Fortaleza e atuação em todo o Brasil, o escritório atende casos em todo o território nacional, com atendimento reservado para situações urgentes.`,
    fallbackCredentials: [
      'OAB/CE 53.322 | OAB/PI 25.100',
      'Membro da ABRACRIM',
      'Coordenador Nacional das Prerrogativas Digitais — ABRACRIM',
      'Vice-Presidente da Comissão de Direito Digital — ABRACRIM',
      'Autor — ConJur e Migalhas',
      'Atuação especializada em Computação Forense',
      'Atuação Nacional',
      'Membro do IAB',
    ],
    fallbackLectures: [
      'Palestra — Provas Digitais e Cadeia de Custódia — OAB/CE, 2025',
      'Mesa-redonda — Investigação Defensiva na Era Digital — ABRACRIM Nacional, 2025',
      'Curso de extensão — Computação Forense para Advogados — ESA/CE, 2024',
      'Palestra — Cibercrimes e Defesa Criminal — OAB/PI, 2024',
    ],
  },
  areas: {
    eyebrow: 'Núcleos de Atuação',
    title: 'Áreas de Atuação',
    description:
      'O escritório atua em frentes específicas do direito penal e da prova digital. Cada núcleo possui página dedicada com contexto técnico, base legal e perguntas frequentes.',
    cardCtaLabel: 'Ver detalhes →',
  },
  faq: {
    eyebrow: 'Dúvidas Recorrentes',
    title: 'Perguntas Frequentes',
    description:
      'Respostas técnicas às perguntas mais comuns sobre nossa atuação. Para análise do seu caso específico, entre em contato.',
    finalCta: {
      title: 'Sua dúvida não está aqui?',
      description: 'Envie os elementos do seu caso e receba avaliação técnico-jurídica estruturada.',
      ctaLabel: 'Entrar em contato',
    },
  },
  contato: {
    eyebrow: 'Fale com o escritório',
    title: 'Contato',
    description:
      'Em situações urgentes, utilize o WhatsApp abaixo. Para consultas e agendamentos, preencha o formulário — retornaremos em até 24 horas úteis.',
    formTitle: 'Enviar mensagem',
    urgent: {
      title: 'Atendimento em casos urgentes',
      description:
        'Para situações como prisão em flagrante, busca e apreensão ou condução coercitiva, entre em contato pelo WhatsApp.',
      ctaLabel: 'Falar via WhatsApp',
    },
    cities: {
      title: 'Cidades Atendidas',
      footnote: 'Atendimento presencial nas cidades acima e consultoria remota para todo o Brasil.',
    },
    expectation: {
      title: 'Expectativa de retorno',
      description:
        'Mensagens via formulário têm retorno em até 24 horas úteis. Para casos urgentes, o WhatsApp recebe prioridade.',
    },
  },
  provasDigitais: {
    hero: {
      badge: 'Especialidade Principal',
      title: 'Provas Digitais',
      description:
        'Análise técnica e jurídica especializada em evidências digitais para defesa criminal. Identificamos irregularidades, contestamos laudos e produzimos pareceres que fazem a diferença no resultado do processo.',
    },
    intro: {
      title: 'O que são provas digitais?',
      description:
        'Provas digitais são evidências em formato eletrônico — mensagens, arquivos, registros de acesso, metadados, extrações de dispositivos — usadas para sustentar teses no processo penal. Sua validade jurídica depende diretamente dos procedimentos técnicos adotados na coleta, preservação e apresentação.',
    },
    evidenceTypesTitle: 'Tipos de evidência digital',
    evidenceTypes: [
      { title: 'Dispositivos Móveis', desc: 'Extração e análise de smartphones, tablets e wearables' },
      { title: 'Interceptações', desc: 'Telefônicas, telemáticas e análise de registros de comunicação' },
      { title: 'Mensagens e Apps', desc: 'WhatsApp, Telegram, Signal, e-mails e redes sociais' },
      { title: 'Armazenamento em Nuvem', desc: 'Google Drive, iCloud, OneDrive e serviços similares' },
      { title: 'Documentos Digitais', desc: 'PDFs, planilhas, contratos e registros eletrônicos' },
      { title: 'Metadados e Logs', desc: 'Registros de acesso, geolocalização e trilhas digitais' },
    ],
    comparison: {
      badge: 'Comparativo',
      title: 'Tipos de evidência digital e sua força probatória',
      description:
        'Nem toda evidência digital tem o mesmo peso jurídico. A validade de cada tipo depende diretamente dos procedimentos de coleta, preservação e apresentação.',
    },
    risksTitle: 'Riscos que comprometem a prova digital',
    custody: {
      badge: 'Arts. 158-A a 158-F do CPP',
      title: 'Cadeia de custódia da prova digital',
      description:
        'A Lei nº 13.964/2019 (Pacote Anticrime) instituiu no Código de Processo Penal as dez etapas obrigatórias da cadeia de custódia. Qualquer ruptura documental pode comprometer a confiabilidade da prova e ser objeto de impugnação técnica pela defesa.',
      steps: [
        { step: '1', title: 'Reconhecimento', article: 'Art. 158-B, I, CPP', description: 'Identificação e classificação da evidência digital com descrição precisa do dispositivo ou dado.' },
        { step: '2', title: 'Isolamento', article: 'Art. 158-B, II, CPP', description: 'Preservação do estado original por meio de técnicas antiescrita e bloqueio de conexões externas.' },
        { step: '3', title: 'Fixação', article: 'Art. 158-B, III, CPP', description: 'Registro fotográfico, descritivo e por hash criptográfico (MD5, SHA-256) do material apreendido.' },
        { step: '4', title: 'Coleta', article: 'Art. 158-B, IV, CPP', description: 'Aquisição forense bit a bit por profissional habilitado, com documentação de ferramenta e metodologia.' },
        { step: '5', title: 'Acondicionamento e transporte', article: 'Art. 158-B, V e VI, CPP', description: 'Embalagem adequada com lacre numerado e cadeia documental de transferência entre custodiantes.' },
        { step: '6', title: 'Recebimento e processamento', article: 'Art. 158-B, VII e VIII, CPP', description: 'Conferência de lacres, nova verificação de hash e início do processamento pericial com registro em livro próprio.' },
        { step: '7', title: 'Armazenamento e descarte', article: 'Arts. 158-B, IX, X e 158-F, CPP', description: 'Guarda em ambiente controlado até decisão judicial definitiva sobre descarte, devolução ou destruição.' },
      ],
    },
    tools: {
      title: 'Ferramentas forenses de referência',
      description:
        'Trabalhamos com ferramentas padrão de mercado e analisamos laudos produzidos com estas soluções, identificando limitações conhecidas e eventuais desvios metodológicos.',
    },
    norms: {
      title: 'Base normativa aplicável',
      description:
        'A análise técnica observa tanto a legislação processual brasileira quanto as normas técnicas internacionais reconhecidas para perícia forense digital.',
      groups: [
        {
          title: 'Código de Processo Penal',
          refs: [
            'Art. 158-A — definição de cadeia de custódia',
            'Art. 158-B — 10 etapas da cadeia de custódia',
            'Art. 158-C — responsável pela coleta',
            'Arts. 158-D a 158-F — acondicionamento, custódia e descarte',
          ],
        },
        {
          title: 'Normas técnicas internacionais',
          refs: [
            'ISO/IEC 27037:2012 — identificação, coleta e preservação',
            'ISO/IEC 27041:2015 — garantia de adequação do método investigativo',
            'ISO/IEC 27042:2015 — análise e interpretação de evidências digitais',
            'ISO/IEC 27043:2015 — princípios e processos de investigação',
            'NIST SP 800-86 — Guia de Integração de Forense em Resposta a Incidentes',
          ],
        },
      ],
    },
    howWeWork: {
      title: 'Como atuamos',
      paragraphs: [
        'O escritório realiza análise técnica independente de todas as evidências digitais do processo, identificando irregularidades na cadeia de custódia, erros metodológicos nos laudos periciais e dados descontextualizados pela acusação.',
        'Trabalhamos com ferramentas forenses profissionais e metodologia reconhecida internacionalmente para produzir pareceres com solidez técnica e força jurídica.',
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        'Parecer técnico-jurídico sobre validade das provas',
        'Análise crítica de laudos periciais oficiais',
        'Elaboração de quesitos periciais especializados',
        'Relatório de investigação defensiva digital',
        'Documentação de cadeia de custódia',
        'Apoio técnico em audiências e sustentações',
      ],
    },
    finalCtaLabel: 'Solicitar análise técnica',
  },
} as const

export type PagesContent = typeof pages
