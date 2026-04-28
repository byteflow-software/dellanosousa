import type { SiteKey } from '@/lib/site'
import * as principal from './principal'
import marca from './marca'
import perito from './perito'
import provaDigital from './prova-digital'
import criminal from './criminal'
import criminalCe from './criminal-ce'

export type SiteContent = typeof principal

const REGISTRY: Record<SiteKey, SiteContent> = {
  principal,
  marca: marca as unknown as SiteContent,
  perito: perito as unknown as SiteContent,
  'prova-digital': provaDigital as unknown as SiteContent,
  criminal: criminal as unknown as SiteContent,
  'criminal-ce': criminalCe as unknown as SiteContent,
}

export function getSiteContent(key: SiteKey): SiteContent {
  return REGISTRY[key] ?? REGISTRY.principal
}
