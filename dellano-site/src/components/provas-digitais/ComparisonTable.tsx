import { cn } from '@/lib/utils'

type ConfiabilidadeLevel = 'baixa' | 'media' | 'alta'

type EvidenceRow = {
  tipo: string
  baseLegal: string
  custodia: string
  confiabilidade: ConfiabilidadeLevel
  admissibilidade: string
}

const evidenceRows: EvidenceRow[] = [
  {
    tipo: 'Print unilateral',
    baseLegal: '—',
    custodia: 'Sem controle — produzido unilateralmente, sem lacre ou hash',
    confiabilidade: 'baixa',
    admissibilidade: 'Facilmente impugnável — ausência de cadeia de custódia e metadados',
  },
  {
    tipo: 'Ata Notarial',
    baseLegal: 'Lei 8.935/1994',
    custodia: 'Fé pública do tabelião — não preserva metadados técnicos do dispositivo',
    confiabilidade: 'media',
    admissibilidade: 'Boa presunção de veracidade, mas passível de contestação técnica',
  },
  {
    tipo: 'Extração Forense',
    baseLegal: 'CPP, arts. 158-A a 158-F',
    custodia: 'Completa — hash SHA-256, lacre, termo de coleta, log de manuseio',
    confiabilidade: 'alta',
    admissibilidade: 'Tecnicamente mais robusta — preserva estrutura, metadados e dados deletados',
  },
  {
    tipo: 'Dados de Provedor',
    baseLegal: 'Marco Civil, arts. 22–23',
    custodia: 'Documentada — obtida por ordem judicial com rastreabilidade de origem',
    confiabilidade: 'alta',
    admissibilidade: 'Sólida — dados originários autenticados diretamente pelo provedor',
  },
]

const confiabilidadeConfig: Record<ConfiabilidadeLevel, { label: string; className: string }> = {
  baixa: {
    label: 'Baixa',
    className: 'bg-red-50 text-red-700 border border-red-200',
  },
  media: {
    label: 'Média',
    className: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  alta: {
    label: 'Alta',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary/10 shadow-sm">
      <table className="w-full text-sm font-sans">
        <thead>
          <tr className="bg-primary text-white">
            <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Tipo de Evidência</th>
            <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Base Legal</th>
            <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Cadeia de Custódia</th>
            <th className="text-left px-5 py-4 font-semibold whitespace-nowrap">Confiabilidade</th>
            <th className="text-left px-5 py-4 font-semibold">Admissibilidade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/8">
          {evidenceRows.map((row, i) => {
            const conf = confiabilidadeConfig[row.confiabilidade]
            return (
              <tr
                key={row.tipo}
                className={cn(
                  'transition-colors hover:bg-primary/3',
                  i % 2 === 0 ? 'bg-white' : 'bg-background'
                )}
              >
                <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap align-top">
                  {row.tipo}
                </td>
                <td className="px-5 py-4 text-muted align-top whitespace-nowrap">{row.baseLegal}</td>
                <td className="px-5 py-4 text-muted align-top min-w-[220px]">{row.custodia}</td>
                <td className="px-5 py-4 align-top">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                      conf.className
                    )}
                  >
                    {conf.label}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted align-top min-w-[240px]">{row.admissibilidade}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
