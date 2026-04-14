import Link from 'next/link'
import { Plus, Users } from 'lucide-react'
import { listMembros } from '@/lib/actions/equipe'

export const metadata = { title: 'Equipe' }

export default async function EquipePage() {
  const membros = await listMembros()

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Equipe</h1>
          <p className="admin-page-subtitle">{membros.length} membro(s)</p>
        </div>
        <Link href="/equipe/novo" className="admin-btn admin-btn-primary"><Plus size={14} /> Novo Membro</Link>
      </div>

      <div className="admin-card">
        {membros.length === 0 ? (
          <div className="admin-empty"><Users className="admin-empty-icon" /><div className="admin-empty-title">Nenhum membro cadastrado</div></div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr><th>Nome</th><th>Cargo</th><th>Hierarquia</th><th>OAB</th><th>Ativo</th><th></th></tr>
              </thead>
              <tbody>
                {membros.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 500 }}>{m.name}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{m.role}</td>
                    <td>
                      <span className={`admin-badge ${m.hierarchy === 'principal' ? 'admin-badge-gold' : 'admin-badge-secondary'}`}>
                        {m.hierarchy === 'principal' ? 'Principal' : 'Apoio'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{m.oab ?? '—'}</td>
                    <td>
                      <span className={`admin-badge ${m.active ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                        {m.active ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td><Link href={`/equipe/${m.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">Editar</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
