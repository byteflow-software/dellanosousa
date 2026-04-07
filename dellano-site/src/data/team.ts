import type { TeamMember } from '@/types'

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Dellano Sousa',
    role: 'Advogado Criminal | Especialista em Provas Digitais',
    bio: 'Advogado criminalista com atuação nacional, especializado em provas digitais, investigação defensiva e defesa criminal estratégica. Presidente da Comissão de Investigação Defensiva da OAB/CE e membro da ABRACRIM.',
    photo: '/images/dellano/dellano-principal.png',
    oab: 'OAB/CE 53322',
    linkedin: 'https://linkedin.com/in/dellanosousa',
    hierarchy: 'principal',
    expertise: [
      'Provas Digitais',
      'Defesa Criminal Estratégica',
      'Investigação Defensiva',
      'Computação Forense',
      'Cadeia de Custódia',
      'Assistência Técnica Pericial',
    ],
  },
  {
    id: '2',
    name: 'Daniel Araujo do Nascimento',
    role: 'Advogado Criminal',
    bio: 'Advogado com atuação majoritária na área Penal, com experiência em processos de conhecimento, flagrantes, audiências de custódia e acordos de não persecução penal. Pós-graduando em Direito Penal Econômico e Advocacia Criminal.',
    photo: '/images/team/daniel-araujo.jpeg',
    oab: 'OAB/PI 22.498',
    hierarchy: 'apoio',
    expertise: [
      'Direito Penal',
      'Audiências de Custódia',
      'Acordos de Não Persecução Penal',
      'Execução Penal',
    ],
  },
  {
    id: '3',
    name: 'Maria Eduarda',
    role: 'Assessora Jurídica',
    bio: 'Integrante da equipe de assessoria jurídica do escritório, com atuação no acompanhamento processual e suporte técnico-jurídico nos casos conduzidos por Dellano Sousa.',
    photo: '/images/team/maria-eduarda.jpeg',
    hierarchy: 'apoio',
  },
]
