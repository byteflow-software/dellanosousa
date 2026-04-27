import { SITE_KEY } from '@/lib/site'
import { getSiteContent } from './sites'

export const siteContent = getSiteContent(SITE_KEY)
export const { home, layout, meta, pages } = siteContent
