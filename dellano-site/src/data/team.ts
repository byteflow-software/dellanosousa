import type { TeamMember } from '@/types'

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Dellano Sousa',
    role: 'Advogado Criminal | Especialista em Provas Digitais',
    bio: 'Advogado criminalista com atuação nacional, especializado em provas digitais, investigação defensiva e defesa criminal estratégica. Presidente da Comissão de Investigação Defensiva da OAB/CE e membro da ABRACRIM.',
    photo: '/images/dellano/dellano-principal.jpg',
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
    name: 'Equipe de Assessoria Jurídica',
    role: 'Coordenação Processual',
    bio: 'Advogados e pesquisadores especializados no acompanhamento processual e suporte técnico-jurídico nos casos conduzidos pelo escritório.',
    photo: '/images/team/equipe-placeholder.jpg',
    hierarchy: 'apoio',
  },
]
