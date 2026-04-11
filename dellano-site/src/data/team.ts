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
    bio: 'Advogado com atuação majoritária na área Penal, com experiência em processos de conhecimento, flagrantes, audiências de custódia, acordos de não persecução penal e execução penal. Pós-graduado em Assessoria de Juiz e pós-graduando em Direito Penal Econômico, Direito Público e Advocacia Criminal.',
    photo: '/images/team/daniel-araujo.jpeg',
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
    name: 'Maria Eduarda Leite Silva',
    role: 'Advogada Criminal',
    bio: 'Advogada criminalista com atuação técnica em Direito Penal e Processual Penal, com ênfase em crimes de alta complexidade, incluindo organizações criminosas, tráfico de entorpecentes, crimes contra a vida e delitos patrimoniais. Vice-Presidente do CEJA/OAB-PI e Coordenadora da Residência Jurídica da ESA/OAB-PI.',
    photo: '/images/team/maria-eduarda.jpeg',
    hierarchy: 'apoio',
  },
  {
    id: '4',
    name: 'Joel Filho',
    role: 'Estagiário Jurídico',
    bio: 'Estagiário jurídico, 19 anos, estudante do 3º período de Direito e do 2º período de Engenharia de Inteligência. Foco em advocacia criminal e soluções tecnológicas para o setor jurídico.',
    photo: '/images/team/joel-filho.jpg',
    linkedin: 'https://www.linkedin.com/in/1JoelFilho',
    hierarchy: 'apoio',
    expertise: ['Advocacia Criminal', 'Tecnologia Jurídica', 'Comissão OAB na Universidade'],
  },
]
