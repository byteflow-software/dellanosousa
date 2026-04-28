import * as principal from './principal'

const marcaContent = {
  ...principal,
  layout: {
    ...principal.layout,
    brand: {
      ...principal.layout.brand,
      name: 'Dellano Sousa Advocacia',
    },
  },
  home: {
    ...principal.home,
    hero: {
      ...principal.home.hero,
      eyebrow: 'Dellano Sousa Advocacia',
      titlePrefix: 'Escritório de',
      titleEmphasis: 'advocacia criminal',
      description:
        'Banca jurídica autoral com atuação nacional em defesa criminal estratégica, provas digitais e investigação defensiva. Construção de teses técnicas para preservar liberdade, reputação e patrimônio.',
    },
  },
  meta: {
    ...principal.meta,
    home: {
      ...principal.meta.home,
      title: 'Dellano Sousa Advocacia — Escritório de Defesa Criminal',
      description:
        'Dellano Sousa Advocacia: escritório de advocacia criminal com atuação nacional em provas digitais, investigação defensiva e grandes operações. Atendimento estratégico e personalizado.',
      ogTitle: 'Dellano Sousa Advocacia — Escritório de Defesa Criminal',
      ogDescription:
        'Banca de advocacia criminal com atuação nacional em provas digitais, investigação defensiva e construção de teses técnicas.',
    },
    sobre: {
      title: 'Sobre o Escritório — Dellano Sousa Advocacia',
      description:
        'Conheça a Dellano Sousa Advocacia: escritório dedicado à defesa criminal estratégica, provas digitais e investigação defensiva. Liderança de Dellano Sousa, OAB/CE 53.322 | OAB/PI 25.100.',
    },
    areas: {
      title: 'Áreas de Atuação — Dellano Sousa Advocacia',
      description:
        'Núcleos de atuação da Dellano Sousa Advocacia: defesa criminal, provas digitais, investigação defensiva, assistência técnica, cadeia de custódia e casos urgentes.',
    },
    provasDigitais: {
      title: 'Provas Digitais — Dellano Sousa Advocacia',
      description:
        'Atuação especializada em provas digitais: cadeia de custódia, perícia computacional, análise forense e contestação de evidências em processos criminais.',
    },
    faq: {
      title: 'Perguntas Frequentes — Dellano Sousa Advocacia',
      description:
        'Dúvidas recorrentes sobre defesa criminal, provas digitais, honorários e atendimento na Dellano Sousa Advocacia.',
    },
    contato: {
      title: 'Contato — Dellano Sousa Advocacia',
      description:
        'Fale com a Dellano Sousa Advocacia. Atendimento em casos urgentes via WhatsApp e agendamento de reuniões estratégicas.',
    },
  },
}

export default marcaContent
