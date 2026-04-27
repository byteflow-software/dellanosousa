import type { SiteKey } from '@/lib/site'
import * as principal from './principal'

export type SiteContent = typeof principal

const REGISTRY: Record<SiteKey, SiteContent> = {
  principal,
  marca: principal,
  perito: principal,
  'prova-digital': principal,
  criminal: principal,
  'criminal-ce': principal,
}

export function getSiteContent(key: SiteKey): SiteContent {
  return REGISTRY[key] ?? REGISTRY.principal
}
