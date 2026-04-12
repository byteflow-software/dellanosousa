export type ForensicTool = {
  name: string
  category: string
  description: string
}

export const forensicTools: ForensicTool[] = [
  {
    name: 'Cellebrite UFED',
    category: 'Extração mobile',
    description:
      'Padrão de mercado para extração física e lógica de smartphones, usado por autoridades em todo o mundo.',
  },
  {
    name: 'Magnet AXIOM',
    category: 'Análise integrada',
    description:
      'Suíte forense para análise combinada de mídias, nuvem e dispositivos móveis com correlação de artefatos.',
  },
  {
    name: 'Oxygen Forensic Detective',
    category: 'Dispositivos móveis',
    description:
      'Ferramenta especializada em extração e decodificação de aplicativos, incluindo mensageiros criptografados.',
  },
  {
    name: 'X-Ways Forensics',
    category: 'Análise de disco',
    description:
      'Solução avançada de computação forense para análise profunda de sistemas de arquivos e recuperação de dados.',
  },
  {
    name: 'Autopsy / Sleuth Kit',
    category: 'Análise open source',
    description:
      'Plataforma forense de código aberto, reconhecida pela auditabilidade do processo investigativo.',
  },
  {
    name: 'Wireshark',
    category: 'Tráfego de rede',
    description:
      'Análise de captura de pacotes para investigação de comunicações em rede e interceptações telemáticas.',
  },
]
