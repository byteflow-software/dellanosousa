import { FaqForm } from '@/components/admin/faq/FaqForm'

export const metadata = { title: 'Nova Pergunta' }

export default function NovaFaqPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Nova Pergunta FAQ</h1></div>
      </div>
      <div className="admin-card">
        <FaqForm />
      </div>
    </div>
  )
}
