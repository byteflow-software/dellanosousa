import type { Risk } from '@/types'

export const risks: Risk[] = [
  {
    id: '1',
    title: 'Prints sem cadeia de custódia',
    description:
      'Capturas de tela apresentadas sem registro de origem, autenticação ou protocolo de preservação são facilmente contestáveis e podem ser excluídas do processo.',
    icon: 'ImageOff',
  },
  {
    id: '2',
    title: 'Celular acessado de forma inadequada',
    description:
      'Extração de dados de dispositivos móveis sem autorização judicial ou sem observância dos procedimentos técnicos legais contamina toda a prova obtida.',
    icon: 'SmartphoneNfc',
  },
  {
    id: '3',
    title: 'Arquivos em nuvem sem preservação',
    description:
      'Dados armazenados em serviços de nuvem acessados ou copiados sem os procedimentos corretos de preservação perdem valor probatório e podem ser questionados.',
    icon: 'CloudOff',
  },
  {
    id: '4',
    title: 'Extrações mal interpretadas',
    description:
      'Laudos periciais com erros de interpretação técnica ou metodológica podem ser contestados com um parecer técnico especializado da defesa.',
    icon: 'FileWarning',
  },
  {
    id: '5',
    title: 'Dados descontextualizados',
    description:
      'Mensagens, registros e logs apresentados fora do seu contexto original distorcem a realidade dos fatos e devem ser objeto de análise crítica pela defesa.',
    icon: 'AlertTriangle',
  },
]
