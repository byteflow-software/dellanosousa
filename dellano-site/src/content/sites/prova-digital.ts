import * as principal from './principal'

const provaDigitalContent = {
  ...principal,
  layout: {
    ...principal.layout,
    brand: {
      ...principal.layout.brand,
      name: 'Dellano Sousa — Advogado em Prova Digital',
    },
  },
  home: {
    ...principal.home,
    hero: {
      ...principal.home.hero,
      eyebrow: 'Advogado especialista em Prova Digital',
      titlePrefix: 'Defesa criminal com foco em',
      titleEmphasis: 'prova digital',
      description:
        'Atuação especializada em prova digital: contestação de prints, mensagens, geolocalização, áudios e perícias computacionais. Validação técnica da cadeia de custódia para preservar a integridade probatória da defesa.',
    },
  },
  meta: {
    ...principal.meta,
    home: {
      ...principal.meta.home,
      title: 'Advogado Especialista em Prova Digital — Dellano Sousa',
      description:
        'Advogado especialista em prova digital. Contestação de prints, mensagens, áudios, geolocalização e cadeia de custódia em processos criminais. Atuação nacional.',
      ogTitle: 'Advogado em Prova Digital — Dellano Sousa',
      ogDescription:
        'Defesa criminal especializada em prova digital: contestação técnica de evidências eletrônicas e cadeia de custódia.',
    },
    sobre: {
      title: 'Sobre — Advogado em Prova Digital',
      description:
        'Dellano Sousa, advogado especializado em prova digital. Coordenador Nacional das Prerrogativas Digitais — ABRACRIM. OAB/CE 53.322 | OAB/PI 25.100.',
    },
    areas: {
      title: 'Áreas de Atuação — Prova Digital',
      description:
        'Atuação em prova digital: contestação de prints e mensagens, análise de cadeia de custódia, perícia em dispositivos e validação de evidências eletrônicas.',
    },
    provasDigitais: {
      title: 'Prova Digital — Cadeia de Custódia e Perícia',
      description:
        'Tudo sobre prova digital: o que é, como é coletada, requisitos legais de cadeia de custódia, principais riscos de invalidação e atuação técnica do advogado.',
    },
    faq: {
      title: 'Perguntas Frequentes — Prova Digital',
      description:
        'Dúvidas sobre prova digital em processos criminais: validade de prints, mensagens, áudios, geolocalização e cadeia de custódia.',
    },
    contato: {
      title: 'Contato — Advogado em Prova Digital',
      description:
        'Fale com advogado especializado em prova digital. Análise técnica do caso e estratégia de contestação de evidências eletrônicas.',
    },
  },
}

export default provaDigitalContent
