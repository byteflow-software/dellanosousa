export const home = {
  hero: {
    eyebrow: 'Escritório de Advocacia Criminal',
    titlePrefix: 'Defesa criminal estratégica com atuação especializada em',
    titleEmphasis: 'provas digitais',
    description:
      'Atuação jurídica especializada em evidências digitais, investigação defensiva e construção de teses técnicas para proteção da liberdade, da reputação e do patrimônio.',
    ctaPrimaryLabel: 'Atendimento urgente',
    ctaSecondaryLabel: 'Agendar consulta',
    image: {
      src: '/images/dellano/dellano-hero.jpeg',
      alt: 'Dellano Sousa — Advogado Criminal e Especialista em Provas Digitais',
    },
  },
  authorityBar: [
    { iconKey: 'Globe', label: 'Atuação Nacional' },
    { iconKey: 'Monitor', label: 'Provas Digitais' },
    { iconKey: 'Search', label: 'Investigação Defensiva' },
    { iconKey: 'FileSearch', label: 'Assistente Técnico' },
    { iconKey: 'Handshake', label: 'Escritórios Parceiros' },
  ],
  about: {
    eyebrow: 'Quem é Dellano Sousa',
    title: 'Técnica, estratégia e comprometimento na defesa que você merece',
    paragraphs: [
      'Dellano Sousa é advogado criminalista com atuação nacional, dedicado à análise técnica e contestação de provas digitais em processos penais. Coordenador Nacional das Prerrogativas Digitais — ABRACRIM e Vice-Presidente da Comissão de Direito Digital — ABRACRIM.',
      'Combina o rigor jurídico do processo penal com o conhecimento técnico em computação forense para construir defesas sólidas, identificar irregularidades probatórias e proteger os direitos fundamentais dos clientes.',
    ],
    credentials: [
      'OAB/CE 53.322 | OAB/PI 25.100',
      'Membro da ABRACRIM',
      'Coordenador Nacional das Prerrogativas Digitais — ABRACRIM',
      'Vice-Presidente da Comissão de Direito Digital — ABRACRIM',
      'Autor — ConJur e Migalhas',
      'Atuação especializada em Computação Forense',
      'Atuação Nacional',
    ],
    ctaLabel: 'Ver perfil completo',
    image: {
      src: '/images/dellano/dellano-about-preview.jpeg',
      alt: 'Dellano Sousa',
    },
  },
  services: {
    title: 'Atuação Especializada',
    subtitle: 'Núcleos de atuação com profundidade técnica e estratégia jurídica para cada perfil de caso.',
    cardCtaLabel: 'Saiba mais →',
  },
  method: {
    title: 'Método de Atuação',
    subtitle: 'Uma abordagem estruturada e transparente para cada caso, da análise inicial ao acompanhamento final.',
  },
  risks: {
    eyebrow: 'Atenção',
    title: 'Sua prova pode ser decisiva. Ou pode ser descartada.',
    description:
      'Irregularidades na obtenção e apresentação de evidências digitais comprometem todo o processo. Conheça os principais riscos.',
  },
  geographicPresence: {
    label: 'Presença nacional',
  },
  featuredArticles: {
    title: 'Conteúdo Técnico',
    subtitle: 'Artigos e análises sobre provas digitais, processo penal e investigação defensiva.',
    seeAllLabel: 'Ver todos os artigos →',
  },
  institutionalRecognition: {
    title: 'Produção Institucional',
    subtitle:
      'Construção de autoridade técnica a partir de publicações, palestras e participação em debates jurídicos.',
    pillars: [
      {
        iconKey: 'BookOpen',
        title: 'Publicações Técnicas',
        description:
          'Artigos e análises sobre provas digitais, cadeia de custódia e investigação defensiva em portais jurídicos.',
        href: '/publicacoes',
        linkLabel: 'Ver publicações',
      },
      {
        iconKey: 'Presentation',
        title: 'Palestras e Cursos',
        description:
          'Participações em eventos da OAB, ABRACRIM e instituições de ensino sobre direito penal e tecnologia.',
        href: '/eventos',
        linkLabel: 'Ver agenda',
      },
      {
        iconKey: 'Newspaper',
        title: 'Imprensa',
        description:
          'Kit de imprensa e temas para comentário em matérias sobre crimes cibernéticos e evidências digitais.',
        href: '/imprensa',
        linkLabel: 'Sala de imprensa',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Entre em Contato',
    title: 'Casos sensíveis exigem estratégia e rigor técnico',
    description: 'Entre em contato para orientação jurídica estruturada e análise técnica do seu caso.',
    ctaPrimaryLabel: 'Falar via WhatsApp',
    ctaSecondaryLabel: 'Agendar reunião',
  },
} as const

export type HomeContent = typeof home
