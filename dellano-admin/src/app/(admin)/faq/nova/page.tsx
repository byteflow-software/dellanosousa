import { FaqForm } from '@/components/admin/faq/FaqForm'
import { createFaq } from '@/lib/actions/faq'

export const metadata = { title: 'Nova Pergunta' }

export default function NovaFaqPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div><h1 className="admin-page-title">Nova Pergunta FAQ</h1></div>
      </div>
      <div className="admin-card">
        <FaqForm onSave={(data) => createFaq(data)} />
      </div>
    </div>
  )
}
