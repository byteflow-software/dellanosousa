import type { Metadata } from 'next'
import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contato/ContactForm'
import { cities } from '@/data/cities'
import { Button } from '@/components/ui/Button'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

export const metadata: Metadata = {
  title: 'Contato — Plantão 24h',
  description:
    'Entre em contato com o escritório Dellano Sousa Advocacia. Plantão 24h para casos urgentes via WhatsApp.',
}

export default function ContatoPage() {
  return (
    <div className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">
            Fale com o escritório
          </p>
          <h1 className="font-serif font-semibold text-primary text-3xl md:text-5xl leading-tight mb-4">
            Contato e Plantão 24h
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Para casos urgentes, use o botão de WhatsApp abaixo. Para consultas e
            agendamentos, preencha o formulário e retornaremos em até 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-serif font-semibold text-primary text-xl mb-6">
              Enviar mensagem
            </h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-lg bg-primary text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-gold" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-white">Casos Urgentes — Plantão 24h</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Prisão em flagrante, busca e apreensão, condução coercitiva ou qualquer
                emergência jurídica? Entre em contato imediatamente via WhatsApp.
              </p>
              <Button href={WHATSAPP_URL} external variant="gold" className="w-full justify-center">
                Falar no WhatsApp agora
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} className="text-gold" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-primary">Cidades Atendidas</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cities.map((city) => (
                  <div key={city.name} className="p-3 rounded-lg border border-primary/10 bg-white">
                    <p className="font-sans font-medium text-primary text-sm">{city.name}</p>
                    <p className="text-muted text-xs">{city.state}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted text-xs mt-3">
                Atendimento presencial nas cidades acima e consultoria remota para todo o Brasil.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle size={20} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-sans font-medium text-primary text-sm mb-1">
                  Expectativa de retorno
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  Mensagens de WhatsApp são respondidas em minutos para casos urgentes.
                  Formulários são respondidos em até 24 horas úteis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
