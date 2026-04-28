import * as principal from './principal'

const criminalContent = {
  ...principal,
  layout: {
    ...principal.layout,
    brand: {
      ...principal.layout.brand,
      name: 'Dellano Sousa — Advogado Criminal',
    },
  },
  home: {
    ...principal.home,
    hero: {
      ...principal.home.hero,
      eyebrow: 'Advogado Criminalista — Atuação Nacional',
      titlePrefix: 'Defesa estratégica com',
      titleEmphasis: 'advogado criminal',
      description:
        'Advogado criminal com atuação nacional em flagrantes, prisões cautelares, operações policiais, tribunal do júri e crimes complexos. Defesa técnica imediata para proteger a liberdade e a reputação.',
    },
  },
  meta: {
    ...principal.meta,
    home: {
      ...principal.meta.home,
      title: 'Advogado Criminal — Defesa Criminalista | Dellano Sousa',
      description:
        'Advogado criminal com atuação nacional. Defesa em flagrantes, prisões cautelares, operações policiais, tribunal do júri e crimes complexos. Atendimento urgente.',
      ogTitle: 'Advogado Criminal — Dellano Sousa',
      ogDescription:
        'Atuação criminalista nacional em flagrantes, operações, tribunal do júri e provas digitais. Defesa estratégica e técnica.',
    },
    sobre: {
      title: 'Sobre o Advogado Criminal — Dellano Sousa',
      description:
        'Dellano Sousa, advogado criminal com atuação nacional. OAB/CE 53.322 | OAB/PI 25.100. Membro da ABRACRIM. Atuação em provas digitais, operações e tribunal do júri.',
    },
    areas: {
      title: 'Áreas de Atuação — Advogado Criminal',
      description:
        'Áreas criminais: flagrantes, prisões cautelares, operações policiais, tribunal do júri, crimes patrimoniais, lavagem de dinheiro e crimes cibernéticos.',
    },
    provasDigitais: {
      title: 'Provas Digitais — Advogado Criminal',
      description:
        'Como o advogado criminal atua em provas digitais: contestação de evidências eletrônicas, cadeia de custódia e perícia técnica em processos criminais.',
    },
    faq: {
      title: 'Perguntas Frequentes — Advogado Criminal',
      description:
        'Dúvidas sobre atuação do advogado criminal: flagrantes, prisões cautelares, defesa em operações, honorários e atendimento urgente.',
    },
    contato: {
      title: 'Contato — Advogado Criminal Dellano Sousa',
      description:
        'Atendimento criminal urgente. Defesa imediata em flagrantes, operações e prisões cautelares. WhatsApp 24h.',
    },
  },
}

export default criminalContent
