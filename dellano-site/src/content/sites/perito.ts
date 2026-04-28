import * as principal from './principal'

const peritoContent = {
  ...principal,
  layout: {
    ...principal.layout,
    brand: {
      ...principal.layout.brand,
      name: 'Dellano Sousa — Advogado Perito',
    },
  },
  home: {
    ...principal.home,
    hero: {
      ...principal.home.hero,
      eyebrow: 'Advogado Perito em Provas Digitais',
      titlePrefix: 'Atuação técnica como',
      titleEmphasis: 'advogado perito',
      description:
        'Advogado perito com formação em computação forense para análise técnica, contestação e validação de evidências digitais em processos penais. Assistência técnica e parecer especializado em todo o Brasil.',
    },
  },
  meta: {
    ...principal.meta,
    home: {
      ...principal.meta.home,
      title: 'Advogado Perito em Provas Digitais — Dellano Sousa',
      description:
        'Advogado perito com atuação especializada em provas digitais, computação forense e cadeia de custódia. Assistência técnica e contestação de evidências em processos penais.',
      ogTitle: 'Advogado Perito Digital — Dellano Sousa',
      ogDescription:
        'Advogado perito com formação em computação forense para análise e contestação de provas digitais em processos criminais.',
    },
    sobre: {
      title: 'Sobre o Advogado Perito — Dellano Sousa',
      description:
        'Dellano Sousa, advogado perito em provas digitais. OAB/CE 53.322 | OAB/PI 25.100. Coordenador Nacional das Prerrogativas Digitais — ABRACRIM. Atuação técnica em computação forense.',
    },
    areas: {
      title: 'Áreas de Atuação — Advogado Perito',
      description:
        'Atuação como advogado perito: análise forense, assistência técnica, contestação de provas digitais, cadeia de custódia e parecer técnico em processos criminais.',
    },
    provasDigitais: {
      title: 'Perícia em Provas Digitais — Advogado Perito',
      description:
        'Perícia técnica em provas digitais: análise forense de dispositivos, exame de cadeia de custódia e contestação de evidências digitais em processos criminais.',
    },
    faq: {
      title: 'Perguntas Frequentes — Advogado Perito',
      description:
        'Dúvidas sobre atuação como advogado perito, assistência técnica, perícia em provas digitais e contestação de evidências em processos criminais.',
    },
    contato: {
      title: 'Contato — Advogado Perito Dellano Sousa',
      description:
        'Solicite atendimento como advogado perito ou assistente técnico em provas digitais. Análise técnica e parecer especializado para sua defesa.',
    },
  },
}

export default peritoContent
