import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

export const metadata: Metadata = {
  title: 'Mensagem enviada',
  description: 'Sua mensagem foi recebida. Em breve entraremos em contato.',
  robots: { index: false },
}

export default function ObrigadoPage() {
  return (
    <div className="min-h-[60vh] flex items-center py-20 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-primary" aria-hidden="true" />
        </div>
        <h1 className="font-serif font-semibold text-primary text-3xl md:text-4xl mb-4">
          Mensagem recebida
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Obrigado pelo contato. Nossa equipe retornará em até 24 horas úteis.
          Para casos urgentes, entre em contato diretamente via WhatsApp.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href={WHATSAPP_URL} external variant="primary">
            Falar via WhatsApp
          </Button>
          <Button href="/" variant="outline">
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  )
}
