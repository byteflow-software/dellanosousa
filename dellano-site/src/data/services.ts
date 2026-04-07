import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    title: 'Provas Digitais',
    description: 'Análise técnica e jurídica de evidências digitais para uso estratégico no processo.',
    longDescription:
      'Atuação especializada na análise, preservação e contestação de evidências digitais. Avaliação de extrações forenses, metadados, logs e registros eletrônicos com parecer técnico-jurídico fundamentado para uso estratégico no processo penal.',
    icon: 'Monitor',
    slug: 'provas-digitais',
  },
  {
    id: '2',
    title: 'Defesa Criminal Estratégica',
    description: 'Construção de teses defensivas sólidas com profundidade técnica e visão processual.',
    longDescription:
      'Defesa penal estruturada a partir de uma análise minuciosa dos autos, identificação de ilegalidades, nulidades e fragilidades probatórias. Atuação desde a fase investigativa até os recursos nos tribunais superiores.',
    icon: 'Shield',
    slug: 'defesa-criminal',
  },
  {
    id: '3',
    title: 'Investigação Defensiva',
    description: 'Investigação privada autorizada para construção de provas favoráveis à defesa.',
    longDescription:
      'Condução de investigação defensiva conforme a Resolução 564/2023 do CNJ, com coleta de elementos probatórios, entrevista de testemunhas, levantamento de dados e produção de relatório técnico-investigativo para subsidiar a tese defensiva.',
    icon: 'Search',
    slug: 'investigacao-defensiva',
  },
  {
    id: '4',
    title: 'Assistência Técnica para Escritórios',
    description: 'Apoio técnico especializado em provas digitais para advogados e escritórios.',
    longDescription:
      'Atuação como assistente técnico da defesa em perícias envolvendo evidências digitais. Elaboração de pareceres técnicos, quesitos periciais e análise crítica de laudos do perito oficial para subsidiar a defesa de outros escritórios.',
    icon: 'Users',
    slug: 'assistencia-tecnica',
  },
  {
    id: '5',
    title: 'Cadeia de Custódia e Validação',
    description: 'Análise da integridade probatória e conformidade com requisitos legais de custódia.',
    longDescription:
      'Verificação da cadeia de custódia de provas digitais conforme os artigos 158-A a 158-F do CPP. Identificação de rupturas, irregularidades na coleta, armazenamento e apresentação das evidências que possam comprometer sua validade jurídica.',
    icon: 'Lock',
    slug: 'cadeia-custodia',
  },
  {
    id: '6',
    title: 'Consultoria em Casos Urgentes',
    description: 'Atendimento imediato em situações de crise: prisões, buscas e apreensões, investigações.',
    longDescription:
      'Plantão 24 horas para atendimento em situações de urgência: prisões em flagrante, conduções coercitivas, buscas e apreensões, bloqueios de ativos e instauração de investigações sigilosas. Orientação imediata e atuação estratégica desde o primeiro momento.',
    icon: 'AlertCircle',
    slug: 'consultoria-urgente',
  },
]
