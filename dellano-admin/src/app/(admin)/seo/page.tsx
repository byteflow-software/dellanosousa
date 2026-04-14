import { listSeo } from '@/lib/actions/seo'
import { SeoForm } from '@/components/admin/seo/SeoForm'
import { SEO_PAGE_LABELS } from '@/types'

export const metadata = { title: 'SEO' }

export default async function SeoPage() {
  const pages = await listSeo()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO por Página</h1>
          <p className="admin-page-subtitle">Título e descrição de cada rota do site público</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pages.map((page) => (
          <div key={page.pageKey} className="admin-card">
            <h2
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
            </h2>
            <SeoForm
              page={page}
              pageLabel={SEO_PAGE_LABELS[page.pageKey] ?? page.pageKey}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
