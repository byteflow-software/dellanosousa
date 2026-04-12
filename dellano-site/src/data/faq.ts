export type FAQCategory = 'geral' | 'provas-digitais' | 'investigacao' | 'honorarios'

export type FAQItem = {
  category: FAQCategory
  question: string
  answer: string
}

export const faqCategories: { value: FAQCategory; label: string }[] = [
  { value: 'geral', label: 'Dúvidas gerais' },
  { value: 'provas-digitais', label: 'Provas digitais' },
  { value: 'investigacao', label: 'Investigação defensiva' },
  { value: 'honorarios', label: 'Honorários e atendimento' },
]

export const faqs: FAQItem[] = [
  {
    category: 'geral',
    question: 'O escritório atende em quais estados?',
    answer:
      'A atuação do escritório é nacional, com sede em Fortaleza/CE. Para atos presenciais fora do Ceará, utilizamos rede credenciada de advogados correspondentes sob supervisão técnica.',
  },
  {
    category: 'geral',
    question: 'Atendem apenas casos criminais?',
    answer:
      'A atuação principal é em direito penal e processual penal, com ênfase em provas digitais, investigação defensiva, cibercrimes e assistência técnica.',
  },
  {
    category: 'provas-digitais',
    question: 'O que é cadeia de custódia da prova digital?',
    answer:
      'É o conjunto de procedimentos previstos nos arts. 158-A a 158-F do Código de Processo Penal que documenta e preserva a integridade de um elemento probatório desde sua coleta até o descarte, garantindo autenticidade e rastreabilidade.',
  },
  {
    category: 'provas-digitais',
    question: 'Posso usar uma conversa de WhatsApp como prova?',
    answer:
      'Conversas podem ser utilizadas, mas sua força probatória depende da forma de coleta, da preservação da cadeia de custódia e, em muitos casos, da análise pericial de autenticidade. Uma captura de tela isolada pode ser frágil como prova.',
  },
  {
    category: 'investigacao',
    question: 'O que é investigação defensiva?',
    answer:
      'É a atividade de coleta e análise de elementos de informação pela defesa, disciplinada pelo Provimento 188/2018 do Conselho Federal da OAB. Serve para reconstruir fatos, localizar testemunhas e produzir elementos técnicos em favor do cliente.',
  },
  {
    category: 'investigacao',
    question: 'A investigação defensiva é legal?',
    answer:
      'Sim. É reconhecida pela OAB (Provimento 188/2018) e encontra respaldo no direito de defesa constitucionalmente assegurado, desde que observados os limites legais e éticos.',
  },
  {
    category: 'honorarios',
    question: 'Como funcionam os honorários?',
    answer:
      'Os honorários são ajustados caso a caso, observadas a Tabela da OAB/CE e a complexidade do trabalho. A primeira análise técnica do caso é apresentada em reunião inicial, com contrato escrito.',
  },
  {
    category: 'honorarios',
    question: 'Como faço para agendar uma reunião?',
    answer:
      'O contato inicial pode ser feito pelo formulário da página de contato ou pelo WhatsApp. Em seguida, agendamos reunião técnica presencial ou por videoconferência para avaliação do caso.',
  },
]
