export type PressItem = {
  outlet: string
  title: string
  date: string
  url?: string
  description?: string
}

export const pressItems: PressItem[] = [
  {
    outlet: 'OAB/CE',
    title: 'Posse da Comissão de Investigação Defensiva da OAB/CE',
    date: '2024-05-15',
    description:
      'Designação de Dellano Sousa como presidente da Comissão de Investigação Defensiva da Ordem dos Advogados do Brasil, Seccional Ceará.',
  },
  {
    outlet: 'Diário do Nordeste',
    title: 'Provas digitais e o novo desafio do processo penal',
    date: '2024-09-10',
    description:
      'Entrevista sobre o impacto das provas digitais em processos criminais e a importância da cadeia de custódia técnica.',
  },
]
