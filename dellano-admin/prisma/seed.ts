import { PrismaClient, ArtigoCategory, PublicacaoTipo, EventoTipo, FaqCategory, ContentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL || 'admin@dellanosousa.com.br'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Admin' },
  })
  console.log(`Admin user: ${email}`)

  // Equipe
  await prisma.membroEquipe.deleteMany()
  await prisma.membroEquipe.createMany({
    data: [
      {
        name: 'Dellano Sousa',
        role: 'Advogado Criminal | Especialista em Provas Digitais',
        bio: 'Advogado criminalista com atuação nacional, especializado em provas digitais, investigação defensiva e defesa criminal estratégica. Coordenador Nacional das Prerrogativas Digitais da ABRACRIM.',
        oab: 'OAB/CE 04.969 | OAB/PI 25.100',
        linkedin: 'https://linkedin.com/in/dellanosousa',
        hierarchy: 'principal',
        expertise: ['Provas Digitais', 'Defesa Criminal', 'Investigação Defensiva', 'Computação Forense', 'Cadeia de Custódia'],
        order: 0,
        active: true,
      },
      {
        name: 'Daniel Araujo do Nascimento',
        role: 'Advogado Criminal',
        bio: 'Advogado com atuação majoritária na área Penal. Pós-graduado em Assessoria de Juiz e Direito Penal Econômico.',
        hierarchy: 'apoio',
        expertise: ['Direito Penal', 'Audiências de Custódia', 'ANPP', 'Execução Penal'],
        order: 1,
        active: true,
      },
    ],
  })

  // FAQ
  await prisma.faqItem.deleteMany()
  await prisma.faqItem.createMany({
    data: [
      { category: FaqCategory.GERAL, question: 'O escritório atende em quais estados?', answer: 'A atuação é nacional, com sede em Fortaleza/CE. Para atos presenciais fora do Ceará, utilizamos rede credenciada de advogados correspondentes.', order: 0, active: true },
      { category: FaqCategory.PROVAS_DIGITAIS, question: 'O que é cadeia de custódia da prova digital?', answer: 'É o conjunto de procedimentos dos arts. 158-A a 158-F do CPP que documenta e preserva a integridade de um elemento probatório desde a coleta até o descarte.', order: 0, active: true },
      { category: FaqCategory.INVESTIGACAO, question: 'O que é investigação defensiva?', answer: 'É a atividade de coleta e análise de elementos de informação pela defesa, disciplinada pelo Provimento 188/2018 do CFOAB.', order: 0, active: true },
      { category: FaqCategory.HONORARIOS, question: 'Como funcionam os honorários?', answer: 'São ajustados caso a caso, observadas a Tabela da OAB/CE e a complexidade do trabalho. A primeira análise técnica é apresentada em reunião inicial.', order: 0, active: true },
    ],
  })

  // Eventos
  await prisma.evento.deleteMany()
  await prisma.evento.createMany({
    data: [
      { title: 'Provas digitais e cadeia de custódia no processo penal', tipo: EventoTipo.PALESTRA, organizer: 'OAB/CE', location: 'Fortaleza/CE', date: '2025-10-20', role: 'Palestrante', status: ContentStatus.PUBLISHED },
      { title: 'Investigação defensiva na era digital', tipo: EventoTipo.MESA, organizer: 'ABRACRIM Nacional', location: 'São Paulo/SP', date: '2025-08-15', role: 'Debatedor', status: ContentStatus.PUBLISHED },
    ],
  })

  // Publicações
  await prisma.publicacao.deleteMany()
  await prisma.publicacao.createMany({
    data: [
      { title: 'A Cadeia de Custódia das Provas Digitais no CPP pós-Pacote Anticrime', venue: 'Revista Brasileira de Ciências Criminais', tipo: PublicacaoTipo.PUBLICACAO_ACADEMICA, date: '2024', status: ContentStatus.PUBLISHED, order: 0 },
      { title: 'Investigação Defensiva Digital: perspectivas após a Resolução OAB 564/2023', venue: 'Boletim IBCCRIM', tipo: PublicacaoTipo.PUBLICACAO_ACADEMICA, date: '2025', status: ContentStatus.PUBLISHED, order: 1 },
      { title: 'Investigação defensiva: o advogado como investigador', venue: 'Conjur', tipo: PublicacaoTipo.MIDIA, url: 'https://www.conjur.com.br', date: '2025', status: ContentStatus.PUBLISHED, order: 0 },
    ],
  })

  // Imprensa
  await prisma.imprensa.deleteMany()
  await prisma.imprensa.createMany({
    data: [
      { outlet: 'Diário do Nordeste', title: 'Provas digitais e o novo desafio do processo penal', date: '2024-09-10', description: 'Entrevista sobre o impacto das provas digitais em processos criminais.', status: ContentStatus.PUBLISHED },
    ],
  })

  // Sobre
  await prisma.sobrePage.deleteMany()
  await prisma.sobrePage.create({
    data: {
      id: '1',
      bioText: 'Advogado criminalista com atuação nacional, especializado em provas digitais, investigação defensiva e defesa criminal estratégica. Coordenador Nacional das Prerrogativas Digitais da ABRACRIM e Vice-Presidente da Comissão de Direito Digital da ABRACRIM. Autor nos portais Conjur e Migalhas.',
      credentials: [
        'OAB/CE 04.969 | OAB/PI 25.100',
        'Membro da ABRACRIM',
        'Coordenador Nacional das Prerrogativas Digitais — ABRACRIM',
        'Vice-Presidente da Comissão de Direito Digital — ABRACRIM',
        'Autor — ConJur e Migalhas',
        'Atuação especializada em Computação Forense',
        'Atuação Nacional',
        'Membro do IAB',
      ],
      lectures: [
        'Palestra — Provas Digitais e Cadeia de Custódia — OAB/CE, 2025',
        'Mesa-redonda — Investigação Defensiva na Era Digital — ABRACRIM Nacional, 2025',
        'Curso de extensão — Computação Forense para Advogados — ESA/CE, 2024',
        'Palestra — Cibercrimes e Defesa Criminal — OAB/PI, 2024',
      ],
    },
  })

  // SEO padrão por página
  await prisma.pageSeo.deleteMany()
  const pages = [
    { pageKey: 'home', title: 'Dellano Sousa — Advogado Criminal e Especialista em Provas Digitais', description: 'Escritório especializado em provas digitais, investigação defensiva e defesa criminal. OAB/CE 04.969. Plantão 24h.' },
    { pageKey: 'sobre', title: 'Sobre Dellano Sousa', description: 'Advogado criminalista OAB/CE 04.969. Coordenador Nacional das Prerrogativas Digitais da ABRACRIM.' },
    { pageKey: 'artigos', title: 'Artigos e Análises', description: 'Conteúdo técnico sobre provas digitais, processo penal, investigação defensiva e cibercrimes.' },
    { pageKey: 'publicacoes', title: 'Publicações, Mídia e Palestras', description: 'Produção intelectual e participações públicas do escritório.' },
    { pageKey: 'eventos', title: 'Eventos e Palestras', description: 'Palestras, cursos e participações do Dr. Dellano Sousa.' },
    { pageKey: 'imprensa', title: 'Imprensa', description: 'Cobertura de imprensa e entrevistas do escritório Dellano Sousa Advocacia.' },
    { pageKey: 'equipe', title: 'Equipe', description: 'Conheça a equipe do escritório Dellano Sousa Advocacia.' },
    { pageKey: 'faq', title: 'Perguntas Frequentes', description: 'Dúvidas sobre provas digitais, investigação defensiva e atendimento.' },
    { pageKey: 'provas-digitais', title: 'Provas Digitais', description: 'Cadeia de custódia, computação forense e defesa criminal digital.' },
    { pageKey: 'contato', title: 'Contato', description: 'Entre em contato com o escritório Dellano Sousa Advocacia. Plantão 24h.' },
  ]
  await prisma.pageSeo.createMany({ data: pages })

  console.log('Seed concluído.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
