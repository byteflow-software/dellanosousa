export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type PublicacaoTipo = 'MIDIA' | 'PUBLICACAO_ACADEMICA'
export type EventoTipo = 'PALESTRA' | 'CURSO' | 'CONGRESSO' | 'MESA'
export type FaqCategory = 'GERAL' | 'PROVAS_DIGITAIS' | 'INVESTIGACAO' | 'HONORARIOS'

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

export const PUBLICACAO_TIPO_LABELS: Record<PublicacaoTipo, string> = {
  MIDIA: 'Mídia / Entrevista',
  PUBLICACAO_ACADEMICA: 'Publicação Acadêmica',
}

export const EVENTO_TIPO_LABELS: Record<EventoTipo, string> = {
  PALESTRA: 'Palestra',
  CURSO: 'Curso',
  CONGRESSO: 'Congresso',
  MESA: 'Mesa de Debate',
}

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  GERAL: 'Dúvidas gerais',
  PROVAS_DIGITAIS: 'Provas digitais',
  INVESTIGACAO: 'Investigação defensiva',
  HONORARIOS: 'Honorários e atendimento',
}

export const STATUS_LABELS: Record<ContentStatus, string> = {
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  ARCHIVED: 'Arquivado',
}

export const SEO_PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  sobre: 'Sobre',
  artigos: 'Artigos',
  publicacoes: 'Publicações',
  eventos: 'Eventos',
  imprensa: 'Imprensa',
  equipe: 'Equipe',
  faq: 'FAQ',
  'provas-digitais': 'Provas Digitais',
  contato: 'Contato',
}
