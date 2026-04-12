export type EventType = 'palestra' | 'curso' | 'congresso' | 'mesa'

export type EventItem = {
  title: string
  type: EventType
  organizer: string
  location: string
  date: string
  description?: string
  role?: string
}

export const eventTypeLabels: Record<EventType, string> = {
  palestra: 'Palestra',
  curso: 'Curso',
  congresso: 'Congresso',
  mesa: 'Mesa de debate',
}

export const eventItems: EventItem[] = [
  {
    title: 'Provas digitais e cadeia de custódia no processo penal',
    type: 'palestra',
    organizer: 'OAB/CE',
    location: 'Fortaleza/CE',
    date: '2024-10-20',
    role: 'Palestrante',
    description:
      'Exposição sobre o regime dos arts. 158-A a 158-F do CPP e seu impacto em provas obtidas por meios digitais.',
  },
  {
    title: 'Investigação defensiva — aspectos práticos e limites éticos',
    type: 'curso',
    organizer: 'Escola Superior de Advocacia',
    location: 'Fortaleza/CE',
    date: '2024-11-05',
    role: 'Professor convidado',
    description:
      'Módulo prático sobre coleta e documentação de elementos de informação pela defesa nos termos do Provimento 188/2018 do CFOAB.',
  },
]
