import { listSobre } from '@/lib/actions/sobre'
import { SobreForm } from '@/components/admin/sobre/SobreForm'
import { SITE_KEYS, SITE_LABELS } from '@/lib/sites'

export const metadata = { title: 'Sobre' }

export default async function SobrePage() {
  const sobreList = await listSobre()
  const bySite = new Map(sobreList.map((s) => [s.siteKey, s]))

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Página Sobre</h1>
          <p className="admin-page-subtitle">Biografia, credenciais e palestras exibidas em /sobre (por site)</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {SITE_KEYS.map((siteKey) => {
          const sobre = bySite.get(siteKey)
          return (
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
              <div className="admin-card">
                <SobreForm
                  siteKey={siteKey}
                  initial={sobre ? { bioText: sobre.bioText, credentials: sobre.credentials, lectures: sobre.lectures } : undefined}
                />
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
