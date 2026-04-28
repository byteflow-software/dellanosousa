import * as principal from './principal'

const criminalCeContent = {
  ...principal,
  layout: {
    ...principal.layout,
    brand: {
      ...principal.layout.brand,
      name: 'Dellano Sousa — Criminalista Ceará',
    },
    footer: {
      ...principal.layout.footer,
      tagline:
        'Defesa criminal estratégica em Fortaleza e em todo o Ceará, com atuação especializada em provas digitais e investigação defensiva.',
      citiesLine: 'Fortaleza · Sobral · Juazeiro do Norte · Caucaia · Maracanaú',
    },
  },
  home: {
    ...principal.home,
    hero: {
      ...principal.home.hero,
      eyebrow: 'Criminalista no Ceará — Fortaleza e interior',
      titlePrefix: 'Defesa criminal com',
      titleEmphasis: 'criminalista no Ceará',
      description:
        'Advogado criminalista com escritório em Fortaleza e atuação em todo o Ceará. Defesa em flagrantes, operações, tribunal do júri e provas digitais. Plantão para casos urgentes na capital e interior.',
    },
  },
  meta: {
    ...principal.meta,
    home: {
      ...principal.meta.home,
      title: 'Criminalista Ceará — Advogado Criminal em Fortaleza',
      description:
        'Criminalista no Ceará com atuação em Fortaleza e interior. Defesa em flagrantes, operações, tribunal do júri e provas digitais. Atendimento urgente 24h.',
      ogTitle: 'Criminalista Ceará — Dellano Sousa',
      ogDescription:
        'Advogado criminalista no Ceará. Defesa criminal estratégica em Fortaleza e interior. Provas digitais e investigação defensiva.',
    },
    sobre: {
      title: 'Sobre o Criminalista — Dellano Sousa',
      description:
        'Dellano Sousa, criminalista com escritório em Fortaleza/CE. OAB/CE 53.322. Coordenador Nacional das Prerrogativas Digitais — ABRACRIM. Atuação em todo o Ceará.',
    },
    areas: {
      title: 'Áreas de Atuação — Criminalista no Ceará',
      description:
        'Atuação criminalista no Ceará: flagrantes, prisões cautelares, operações policiais, tribunal do júri, crimes patrimoniais e provas digitais.',
    },
    provasDigitais: {
      title: 'Provas Digitais — Criminalista Ceará',
      description:
        'Atuação em provas digitais no Ceará: contestação de evidências eletrônicas, cadeia de custódia e perícia técnica em processos criminais em Fortaleza e interior.',
    },
    faq: {
      title: 'Perguntas Frequentes — Criminalista Ceará',
      description:
        'Dúvidas sobre defesa criminal no Ceará: atendimento em Fortaleza e interior, flagrantes, operações, honorários e plantão de urgência.',
    },
    contato: {
      title: 'Contato — Criminalista no Ceará',
      description:
        'Fale com criminalista no Ceará. Atendimento em Fortaleza e interior. Plantão para flagrantes e operações urgentes via WhatsApp.',
    },
  },
}

export default criminalCeContent
