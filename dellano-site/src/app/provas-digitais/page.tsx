import type { Metadata } from 'next'
import { risks } from '@/data/risks'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Provas Digitais',
  description:
    'Especialização em evidências digitais, cadeia de custódia, análise forense e contestação de provas tecnológicas em processos penais.',
}

const evidenceTypes = [
  { title: 'Dispositivos Móveis', desc: 'Extração e análise de smartphones, tablets e wearables' },
  { title: 'Interceptações', desc: 'Telefônicas, telemáticas e análise de registros de comunicação' },
  { title: 'Mensagens e Apps', desc: 'WhatsApp, Telegram, Signal, e-mails e redes sociais' },
  { title: 'Armazenamento em Nuvem', desc: 'Google Drive, iCloud, OneDrive e serviços similares' },
  { title: 'Documentos Digitais', desc: 'PDFs, planilhas, contratos e registros eletrônicos' },
  { title: 'Metadados e Logs', desc: 'Registros de acesso, geolocalização e trilhas digitais' },
]

const deliverables = [
  'Parecer técnico-jurídico sobre validade das provas',
  'Análise crítica de laudos periciais oficiais',
  'Elaboração de quesitos periciais especializados',
  'Relatório de investigação defensiva digital',
  'Documentação de cadeia de custódia',
  'Apoio técnico em audiências e sustentações',
]

export default function ProvasDigitaisPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="gold" className="mb-6">Especialidade Principal</Badge>
            <h1 className="font-serif font-semibold text-white text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Provas Digitais
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Análise técnica e jurídica especializada em evidências digitais para defesa criminal.
              Identificamos irregularidades, contestamos laudos e produzimos pareceres que fazem a
              diferença no resultado do processo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mb-16">
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
                O que são provas digitais?
              </h2>
              <p className="text-muted text-base leading-relaxed">
                Provas digitais são evidências em formato eletrônico — mensagens, arquivos, registros
                de acesso, metadados, extrações de dispositivos — usadas para sustentar teses no
                processo penal. Sua validade jurídica depende diretamente dos procedimentos técnicos
                adotados na coleta, preservação e apresentação.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif font-semibold text-primary text-2xl mb-8">
              Tipos de evidência digital
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidenceTypes.map((e) => (
                <div key={e.title} className="p-5 rounded-lg border border-primary/10 bg-background">
                  <h3 className="font-sans font-semibold text-primary text-sm mb-1">{e.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-serif font-semibold text-white text-2xl md:text-4xl mb-8">
              Riscos que comprometem a prova digital
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {risks.map((risk) => (
                <div key={risk.id} className="p-5 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-sans font-semibold text-gold text-sm mb-1">{risk.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{risk.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-6">
                Como atuamos
              </h2>
              <div className="space-y-4 text-muted text-sm leading-relaxed">
                <p>
                  O escritório realiza análise técnica independente de todas as evidências digitais
                  do processo, identificando irregularidades na cadeia de custódia, erros metodológicos
                  nos laudos periciais e dados descontextualizados pela acusação.
                </p>
                <p>
                  Trabalhamos com ferramentas forenses profissionais e metodologia reconhecida
                  internacionalmente para produzir pareceres com solidez técnica e força jurídica.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-6">
                O que entregamos
              </h2>
              <ul className="space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-primary text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} className="mt-12 text-center">
            <Button href="/contato" variant="primary" size="lg">
              Solicitar análise técnica
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
