import { SiteKey } from '@prisma/client'

export const SITE_KEYS: SiteKey[] = [
  'PRINCIPAL',
  'MARCA',
  'PERITO',
  'PROVA_DIGITAL',
  'CRIMINAL',
  'CRIMINAL_CE',
]

export const SITE_LABELS: Record<SiteKey, string> = {
  PRINCIPAL: 'dellanosousa.com.br',
  MARCA: 'dellanosousaadv.com.br',
  PERITO: 'advogadoperito.com.br',
  PROVA_DIGITAL: 'advogadoprovadigital.com.br',
  CRIMINAL: 'criminaladvogado.com.br',
  CRIMINAL_CE: 'criminalistaceara.com.br',
}

export const ALL_SITES: SiteKey[] = [...SITE_KEYS]
