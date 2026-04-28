import { listSeo } from '@/lib/actions/seo'
import { SeoForm } from '@/components/admin/seo/SeoForm'
import { SEO_PAGE_LABELS } from '@/types'
import { SITE_KEYS, SITE_LABELS } from '@/lib/sites'
import type { SiteKey } from '@prisma/client'

export const metadata = { title: 'SEO' }

export default async function SeoPage() {
  const pages = await listSeo()

  const grouped = SITE_KEYS.map((siteKey) => ({
    siteKey,
    pages: pages.filter((p) => p.siteKey === siteKey),
  })).filter((g) => g.pages.length > 0)

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO por Página</h1>
          <p className="admin-page-subtitle">Título e descrição de cada rota do site público (por site)</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {grouped.map(({ siteKey, pages: sitePages }: { siteKey: SiteKey; pages: typeof pages }) => (
          <section key={siteKey}>
            <h2
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
              }}
            >
              {SITE_LABELS[siteKey]}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sitePages.map((page) => (
                <div key={`${page.siteKey}-${page.pageKey}`} className="admin-card">
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      marginBottom: '1.25rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {SEO_PAGE_LABELS[page.pageKey] ?? page.pageKey}
                  </h3>
                  <SeoForm
                    page={page}
                    pageLabel={SEO_PAGE_LABELS[page.pageKey] ?? page.pageKey}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
