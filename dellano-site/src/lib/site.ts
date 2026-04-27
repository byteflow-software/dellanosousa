export type SiteKey =
  | 'principal'
  | 'marca'
  | 'perito'
  | 'prova-digital'
  | 'criminal'
  | 'criminal-ce'

export const SITE_KEYS: SiteKey[] = [
  'principal',
  'marca',
  'perito',
  'prova-digital',
  'criminal',
  'criminal-ce',
]

const SITE_BY_HOST: Record<string, SiteKey> = {
  'dellanosousa.com.br': 'principal',
  'www.dellanosousa.com.br': 'principal',
  'dellanosousaadv.com.br': 'marca',
  'www.dellanosousaadv.com.br': 'marca',
  'advogadoperito.com.br': 'perito',
  'www.advogadoperito.com.br': 'perito',
  'advogadoprovadigital.com.br': 'prova-digital',
  'www.advogadoprovadigital.com.br': 'prova-digital',
  'criminaladvogado.com.br': 'criminal',
  'www.criminaladvogado.com.br': 'criminal',
  'criminalistaceara.com.br': 'criminal-ce',
  'www.criminalistaceara.com.br': 'criminal-ce',
}

const DEFAULT_SITE_URL = 'https://dellanosousa.com.br'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL

function resolveSiteKey(url: string): SiteKey {
  try {
    const host = new URL(url).hostname.toLowerCase()
    return SITE_BY_HOST[host] ?? 'principal'
  } catch {
    return 'principal'
  }
}

export const SITE_KEY: SiteKey = resolveSiteKey(SITE_URL)
