import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    title: 'Provas Digitais',
    description: 'Análise técnica e jurídica de evidências digitais para uso estratégico no processo.',
    longDescription:
      'Atuação especializada na análise, preservação e contestação de evidências digitais. Avaliação de extrações forenses, metadados, logs e registros eletrônicos com parecer técnico-jurídico fundamentado para uso estratégico no processo penal.',
    icon: 'Monitor',
    slug: 'provas-digitais',
    metaDescription:
      'Análise técnica e jurídica de provas digitais em processos penais: extrações forenses, cadeia de custódia, metadados e contestação de laudos.',
    expandedContent: [
      'Provas digitais são evidências em formato eletrônico — mensagens, arquivos, extrações de smartphones, registros de acesso, metadados, interceptações telemáticas — que passaram a ocupar espaço crescente na instrução criminal. Sua validade jurídica, entretanto, depende de uma sequência rigorosa de procedimentos técnicos na coleta, preservação e apresentação.',
      'A atuação do escritório consiste em submeter cada evidência digital presente nos autos a uma análise técnica independente: verificação da cadeia de custódia, identificação de possíveis rupturas, exame de hashes e lacres, avaliação metodológica dos laudos oficiais e produção de pareceres técnico-jurídicos fundamentados.',
      'Os cenários mais recorrentes envolvem extrações de dispositivos móveis realizadas sem o devido registro, prints unilaterais apresentados como prova sem ata notarial, quebras de sigilo telemático com fundamentação frágil e laudos periciais com conclusões que extrapolam os dados observados. Em cada hipótese, a defesa técnica pode demonstrar fragilidade probatória apta a comprometer a licitude da prova.',
      'O escritório trabalha com ferramentas forenses de mercado e metodologia orientada por normas internacionais (ISO/IEC 27037, NIST SP 800-86) para produzir análises críticas reconhecíveis por peritos oficiais, magistrados e membros do Ministério Público.',
    ],
    legalBasis: [
      {
        title: 'Cadeia de Custódia',
        articles: ['CPP, arts. 158-A a 158-F — preservação, rastreabilidade e integridade probatória'],
      },
      {
        title: 'Marco Civil da Internet',
        articles: [
          'Lei 12.965/2014, art. 10 — proteção de registros',
          'Art. 13 — guarda de conexão',
          'Art. 15 — guarda de acesso a aplicações',
          'Art. 22 — obtenção de registros junto a provedores',
        ],
      },
      {
        title: 'Sigilo das Comunicações',
        articles: ['Lei 9.296/1996 — interceptação telefônica e telemática'],
      },
    ],
    faq: [
      {
        question: 'Um print de WhatsApp vale como prova em ação penal?',
        answer:
          'Sim, mas sua força probatória é frágil. Como é produzido unilateralmente, sem lacre, hash ou cadeia de custódia, pode ser impugnado. O meio mais seguro de apresentar conversas é a extração forense do dispositivo ou a ata notarial, acompanhadas de preservação dos metadados.',
      },
      {
        question: 'O que é cadeia de custódia digital?',
        answer:
          'É o conjunto de procedimentos que garante a rastreabilidade da evidência desde a coleta até a apresentação em juízo. Envolve registro fotográfico, termo de coleta, cálculo de hash (SHA-256), lacre, log de manuseio e preservação do material original. Sua ruptura pode implicar nulidade da prova.',
      },
      {
        question: 'Qual a diferença entre ata notarial e extração forense?',
        answer:
          'A ata notarial é lavrada por tabelião que atesta o conteúdo visualizado em determinado dispositivo ou sistema — tem fé pública mas não preserva metadados técnicos. A extração forense, feita com ferramentas como Cellebrite ou Magnet, gera imagem bit a bit do dispositivo, preservando hashes, registros de deleção e dados estruturais.',
      },
      {
        question: 'Posso solicitar perícia digital própria mesmo quando já houve laudo oficial?',
        answer:
          'Sim. A defesa tem direito a produzir análise crítica do laudo oficial, elaborar quesitos complementares e indicar assistente técnico (CPP, arts. 159 e 160). É nessa fase que muitas falhas metodológicas dos peritos oficiais são identificadas e contestadas.',
      },
      {
        question: 'Dados obtidos via ofício ao provedor (Marco Civil, art. 22) exigem autorização judicial?',
        answer:
          'Depende do dado solicitado. Registros de conexão e de acesso a aplicações podem ser solicitados em ação judicial com indícios mínimos. Conteúdo de comunicações privadas, porém, exige ordem judicial específica e fundamentada, sob pena de nulidade da prova.',
      },
    ],
  },
  {
    id: '2',
    title: 'Defesa Criminal Estratégica',
    description: 'Construção de teses defensivas sólidas com profundidade técnica e visão processual.',
    longDescription:
      'Defesa penal estruturada a partir de uma análise minuciosa dos autos, identificação de ilegalidades, nulidades e fragilidades probatórias. Atuação desde a fase investigativa até os recursos nos tribunais superiores.',
    icon: 'Shield',
    slug: 'defesa-criminal',
    metaDescription:
      'Defesa criminal estratégica: análise dos autos, identificação de nulidades, teses defensivas e atuação em todas as instâncias do processo penal.',
    expandedContent: [
      'A defesa criminal estratégica parte da premissa de que cada caso exige diagnóstico próprio, com identificação das fragilidades do conjunto probatório acusatório e construção de narrativa defensiva consistente, apoiada em fundamentação jurídica e, quando cabível, em análise técnica complementar.',
      'A atuação inicia pela leitura integral dos autos — inquérito, ação penal, incidentes processuais — com mapeamento de nulidades (provas ilícitas, quebra de cadeia de custódia, violações de sigilo, descumprimento de prazos legais) e identificação de pontos em que a tese acusatória apresenta inconsistências internas ou lacunas probatórias.',
      'A partir desse diagnóstico, estrutura-se a estratégia: alegações preliminares, rol de testemunhas, quesitos periciais, requerimentos de diligências, pedidos de revogação de prisão preventiva, impugnações a decisões interlocutórias e, ao fim, memoriais, razões recursais e sustentações orais nos tribunais.',
      'O escritório atua em todas as fases do processo penal — inquérito, primeira instância, recursos (apelação, embargos, recurso especial, recurso extraordinário) e habeas corpus nos tribunais superiores (STJ e STF).',
    ],
    legalBasis: [
      {
        title: 'Direitos Fundamentais do Acusado',
        articles: [
          'CF/88, art. 5º, LIV a LXVII — devido processo legal, ampla defesa, contraditório, presunção de inocência',
        ],
      },
      {
        title: 'Processo Penal',
        articles: [
          'CPP — procedimentos comuns e especiais',
          'Lei 8.038/1990 — ações originárias no STJ e STF',
        ],
      },
      {
        title: 'Habeas Corpus',
        articles: ['CF/88, art. 5º, LXVIII; CPP, arts. 647 a 667'],
      },
    ],
    faq: [
      {
        question: 'Quando devo procurar um advogado criminal?',
        answer:
          'Assim que houver qualquer indício de investigação em curso — convocação para depoimento, busca e apreensão, instauração de inquérito, oferecimento de denúncia ou prisão. Quanto antes a defesa atua, maior o espaço estratégico para conter o avanço da acusação.',
      },
      {
        question: 'O que é uma nulidade processual?',
        answer:
          'É um vício processual que invalida atos do processo por violação de normas legais ou constitucionais. Provas ilícitas, cerceamento de defesa, decisões sem fundamentação e quebras de cadeia de custódia são exemplos que podem ser arguidos como nulidades — absolutas ou relativas, conforme o caso.',
      },
      {
        question: 'Posso ser absolvido por fragilidade da prova mesmo sem negar os fatos?',
        answer:
          'Sim. O ônus da prova é da acusação. A defesa não precisa comprovar inocência — basta demonstrar que o conjunto probatório não alcança o padrão de certeza exigido para a condenação (CPP, art. 386, VII: "não existir prova suficiente para a condenação").',
      },
      {
        question: 'Qual a diferença entre defesa técnica e autodefesa?',
        answer:
          'A defesa técnica é exercida pelo advogado ou defensor — é obrigatória e indispensável em todo o processo. A autodefesa é exercida pelo próprio acusado, principalmente no interrogatório e em manifestações pessoais. Ambas são componentes da ampla defesa constitucional.',
      },
      {
        question: 'Posso trocar de advogado no meio do processo?',
        answer:
          'Sim. O acusado tem direito de escolher e substituir seu defensor a qualquer tempo. A substituição segue formalidades processuais mínimas (juntada de procuração e petição de substabelecimento) e não compromete atos já praticados.',
      },
    ],
  },
  {
    id: '3',
    title: 'Investigação Defensiva',
    description: 'Investigação privada autorizada para construção de provas favoráveis à defesa.',
    longDescription:
      'Condução de investigação defensiva conforme o Provimento 188/2018 do CFOAB, com coleta de elementos probatórios, entrevista de testemunhas, levantamento de dados e produção de relatório técnico-investigativo para subsidiar a tese defensiva.',
    icon: 'Search',
    slug: 'investigacao-defensiva',
    metaDescription:
      'Investigação defensiva conduzida por advogado: coleta de provas favoráveis, entrevistas, relatório técnico e base para teses de defesa criminal.',
    expandedContent: [
      'A investigação defensiva é a atividade autônoma do advogado voltada à produção de elementos probatórios em favor do cliente. Regulamentada pelo Provimento 188/2018 do CFOAB, permite à defesa coletar documentos, entrevistar testemunhas, requisitar informações a órgãos públicos e privados e construir material fático próprio, sem depender exclusivamente do que foi produzido pela acusação.',
      'Em um sistema processual estruturalmente acusatório, a investigação defensiva equilibra a relação entre acusação e defesa: enquanto o Ministério Público dispõe da estrutura do aparato investigativo estatal, o advogado passa a ter um instrumento formal para diligenciar em nome do cliente, produzir contraprovas e ampliar o conjunto probatório levado ao juízo.',
      'As diligências incluem: entrevistas com testemunhas (registradas em termo firmado e, quando conveniente, em audiovisual), coleta de documentos junto a empresas, condomínios, órgãos públicos, provedores de serviço; consultas a bancos de dados públicos; reconstituição técnica de fatos; e requisição de informações via ofícios fundamentados.',
      'O resultado é um relatório técnico-investigativo apto a instruir petições, fundamentar alegações defensivas e, eventualmente, ser apresentado como prova em juízo — sempre observando o caráter sigiloso da atividade e a vedação de condutas que possam caracterizar coação, fraude ou violação de direitos de terceiros.',
    ],
    legalBasis: [
      {
        title: 'Investigação Defensiva',
        articles: ['Provimento 188/2018 do CFOAB — regulamenta o exercício da investigação defensiva pelo advogado'],
      },
      {
        title: 'Prerrogativas do Advogado',
        articles: [
          'Lei 8.906/1994 (EOAB), arts. 6º e 7º — direito de requisitar informações e acessar autos',
        ],
      },
      {
        title: 'Ampla Defesa',
        articles: ['CF/88, art. 5º, LV — contraditório e ampla defesa com os meios e recursos inerentes'],
      },
    ],
    faq: [
      {
        question: 'A investigação defensiva é legal no Brasil?',
        answer:
          'Sim. O Provimento 188/2018 do CFOAB regulamenta a atividade, reconhecendo-a como prerrogativa do advogado no exercício da ampla defesa. Os elementos produzidos podem ser anexados aos autos e utilizados como contraponto ao material da acusação.',
      },
      {
        question: 'Qual a diferença entre investigação defensiva e investigação policial?',
        answer:
          'A investigação policial é presidida pelo Estado, em regra de natureza inquisitorial. A investigação defensiva é conduzida pelo advogado em favor do cliente, tem caráter sigiloso e visa produzir elementos probatórios para a defesa. Ambas podem coexistir e dialogar no processo.',
      },
      {
        question: 'Posso entrevistar testemunhas antes da audiência?',
        answer:
          'Sim, desde que a entrevista seja voluntária e registrada em termo assinado, sem qualquer forma de coação, promessa ou manipulação. A prática é amplamente admitida e constitui etapa essencial da preparação defensiva.',
      },
      {
        question: 'Posso obter informações de bancos, operadoras e provedores?',
        answer:
          'Sim, via requisições fundamentadas. Dados não sigilosos podem ser obtidos diretamente; dados protegidos por sigilo (bancário, fiscal, telemático) exigem autorização judicial. O advogado pode pleitear essas ordens em juízo, demonstrando a necessidade probatória.',
      },
      {
        question: 'O relatório de investigação defensiva vale em juízo?',
        answer:
          'Sim, como elemento probatório documental. Seu peso depende da qualidade metodológica, da idoneidade das fontes, do rigor do registro e da eventual corroboração por outros meios de prova (testemunhais, periciais, documentais).',
      },
    ],
  },
  {
    id: '4',
    title: 'Assistência Técnica para Escritórios',
    description: 'Apoio técnico especializado em provas digitais para advogados e escritórios.',
    longDescription:
      'Atuação como assistente técnico da defesa em perícias envolvendo evidências digitais. Elaboração de pareceres técnicos, quesitos periciais e análise crítica de laudos do perito oficial para subsidiar a defesa de outros escritórios.',
    icon: 'Users',
    slug: 'assistencia-tecnica',
    metaDescription:
      'Assistência técnica em provas digitais para advogados: pareceres, quesitos periciais, análise crítica de laudos e acompanhamento de perícias.',
    expandedContent: [
      'Atuamos como assistentes técnicos em causas conduzidas por outros escritórios sempre que a matéria envolve evidências digitais. O objetivo é oferecer suporte técnico à banca responsável pela causa, traduzindo o vocabulário pericial para a tese defensiva e garantindo que nenhum detalhe técnico favorável ao cliente seja negligenciado.',
      'As modalidades de atuação incluem: análise crítica de laudos oficiais, elaboração de quesitos complementares, acompanhamento de audiências periciais, parecer técnico-jurídico sobre a validade das provas digitais produzidas, presença em perícias presenciais e sustentação técnica em memoriais e sustentações orais.',
      'Esse tipo de colaboração é especialmente útil para escritórios generalistas que ocasionalmente enfrentam casos com componente digital — cibercrimes, crimes financeiros com rastros eletrônicos, investigações com quebra de sigilo telemático, ações que dependem de extrações de smartphone, entre outros.',
      'A relação com a banca contratante é pautada por discrição, sigilo profissional e respeito absoluto à estratégia definida pelo advogado titular. Nossa atuação é sempre em apoio, nunca em substituição.',
    ],
    legalBasis: [
      {
        title: 'Assistente Técnico',
        articles: ['CPP, arts. 159 e 160 — indicação de assistente técnico pela defesa'],
      },
      {
        title: 'Quesitos Periciais',
        articles: ['CPP, art. 176 — formulação de quesitos pelas partes'],
      },
    ],
    faq: [
      {
        question: 'Em que momento posso indicar assistente técnico?',
        answer:
          'Durante a instrução processual, antes ou durante a realização da perícia oficial. O CPP permite a indicação pelas partes, com direito a formular quesitos, acompanhar o trabalho pericial e apresentar parecer próprio ao final.',
      },
      {
        question: 'O assistente técnico tem as mesmas prerrogativas do perito oficial?',
        answer:
          'Não. O assistente técnico atua a serviço da parte que o indicou, enquanto o perito oficial é vinculado ao juízo. O parecer do assistente técnico tem valor como elemento técnico da defesa e é sopesado pelo juiz junto ao laudo oficial.',
      },
      {
        question: 'Posso contratar assistente técnico mesmo após o laudo oficial?',
        answer:
          'Sim. É possível apresentar parecer crítico ao laudo oficial antes das alegações finais ou como complemento à defesa. Também é possível requerer nova perícia quando o laudo apresentar vícios técnicos ou metodológicos relevantes.',
      },
      {
        question: 'Quais casos mais se beneficiam de assistente técnico em prova digital?',
        answer:
          'Casos com extrações de dispositivos móveis, interceptações telemáticas, rastreamento de IP, cibercrimes, crimes financeiros com componente eletrônico, processos envolvendo nuvem e mensageria cifrada. Em todos, a análise técnica pode revelar fragilidades probatórias decisivas.',
      },
      {
        question: 'Como é a relação com o escritório que me contratou?',
        answer:
          'De colaboração estrita. Entregamos análise, pareceres e acompanhamento técnico, mas a estratégia e a condução do caso permanecem com o advogado titular. O sigilo profissional é integral.',
      },
    ],
  },
  {
    id: '5',
    title: 'Cadeia de Custódia e Validação',
    description: 'Análise da integridade probatória e conformidade com requisitos legais de custódia.',
    longDescription:
      'Verificação da cadeia de custódia de provas digitais conforme os artigos 158-A a 158-F do CPP. Identificação de rupturas, irregularidades na coleta, armazenamento e apresentação das evidências que possam comprometer sua validade jurídica.',
    icon: 'Lock',
    slug: 'cadeia-custodia',
    metaDescription:
      'Análise da cadeia de custódia de provas digitais conforme o CPP: identificação de rupturas, contestação e consequências processuais para a defesa.',
    expandedContent: [
      'A cadeia de custódia é o conjunto de procedimentos que asseguram a rastreabilidade de uma evidência — desde sua coleta até a apresentação em juízo. Introduzida formalmente no Código de Processo Penal pela Lei 13.964/2019 (Pacote Anticrime), nos artigos 158-A a 158-F, ela passou a ser critério objetivo de validade da prova.',
      'Para provas digitais, a exigência é ainda mais sensível: pequenas variações em um arquivo, ausência de hash criptográfico, lacres rompidos, registros fotográficos incompletos ou logs de manuseio omissos podem comprometer a integridade do material e, consequentemente, sua aptidão para embasar condenação.',
      'O trabalho do escritório consiste em dissecar a cadeia de custódia de cada prova digital do processo: analisar o termo de coleta, conferir hashes de integridade, examinar relatórios de extração, verificar lacres e selos, validar a autoria do ato de coleta, identificar inconsistências entre registros. O produto final é um parecer técnico que aponta rupturas específicas e sua repercussão jurídica.',
      'Em muitos casos, a demonstração da quebra de cadeia de custódia conduz ao reconhecimento da ilicitude ou ilegitimidade da prova, com consequências processuais relevantes: desentranhamento, desconsideração no convencimento judicial ou nulidade — conforme a gravidade do vício e sua relação com a produção da evidência.',
    ],
    legalBasis: [
      {
        title: 'Cadeia de Custódia',
        articles: [
          'CPP, art. 158-A — definição e início',
          'Art. 158-B — etapas da cadeia',
          'Art. 158-C — coleta e identificação',
          'Art. 158-D — acondicionamento',
          'Art. 158-E — central de custódia',
          'Art. 158-F — controle e descarte',
        ],
      },
      {
        title: 'Normas Técnicas',
        articles: [
          'ISO/IEC 27037 — preservação de evidência digital',
          'ISO/IEC 27041 — adequação de processos investigativos',
          'NIST SP 800-86 — forense em resposta a incidentes',
        ],
      },
    ],
    faq: [
      {
        question: 'O que é uma ruptura de cadeia de custódia?',
        answer:
          'É qualquer falha nos registros ou procedimentos que comprometa a rastreabilidade e integridade da evidência — ausência de hash, lacre ausente ou rompido, documentação incompleta, pessoa não identificada no manuseio, intervalo de tempo não justificado, entre outras.',
      },
      {
        question: 'Toda ruptura anula a prova?',
        answer:
          'Não automaticamente. A jurisprudência analisa caso a caso. Em regra, rupturas significativas comprometem a confiabilidade da evidência, levando ao seu desentranhamento ou à atribuição de menor peso probatório. Em situações graves, pode haver reconhecimento de nulidade.',
      },
      {
        question: 'O hash é obrigatório na prova digital?',
        answer:
          'Não é literalmente obrigatório pelo CPP, mas é a principal técnica reconhecida internacionalmente para garantir integridade. Sua ausência ou divergência entre o valor original e o apresentado em juízo é forte indício de adulteração ou falha de preservação.',
      },
      {
        question: 'Quem deve preservar a cadeia de custódia?',
        answer:
          'Todos os agentes que manuseiam a evidência — desde o policial que realiza a coleta, passando pelo perito oficial, até os operadores do juízo. Cada etapa deve estar registrada. A omissão de qualquer elo rompe a cadeia.',
      },
      {
        question: 'Como o advogado pode impugnar a cadeia de custódia?',
        answer:
          'Através de petições específicas nos autos, requerimento de diligências para suprir ou examinar lacunas, apresentação de parecer técnico, formulação de quesitos periciais e, se necessário, alegação de nulidade em memoriais e recursos.',
      },
    ],
  },
  {
    id: '6',
    title: 'Atuação em Casos Urgentes',
    description: 'Atendimento reservado a situações críticas: prisões, buscas e apreensões, investigações em curso.',
    longDescription:
      'Atuação dedicada em situações sensíveis: prisões em flagrante, conduções coercitivas, buscas e apreensões, bloqueios de ativos e instauração de investigações. Orientação jurídica e estratégia processual desde a primeira fase do caso.',
    icon: 'AlertCircle',
    slug: 'consultoria-urgente',
    metaDescription:
      'Atuação criminal em situações urgentes: prisão em flagrante, busca e apreensão, condução coercitiva, bloqueio de ativos e habeas corpus.',
    expandedContent: [
      'Determinadas situações criminais exigem resposta jurídica pronta: prisão em flagrante, cumprimento de mandado de busca e apreensão, condução coercitiva, bloqueio de ativos, notificação para depoimento ou deflagração de operação policial. Nesses momentos, a atuação defensiva bem estruturada nas primeiras horas pode definir o rumo do processo.',
      'O escritório atua prontamente no acompanhamento da lavratura do auto de prisão em flagrante, na análise imediata dos mandados executados, na representação em audiência de custódia, na requisição de revogação de prisão preventiva e, quando cabível, na impetração de habeas corpus.',
      'Em buscas e apreensões, o trabalho inclui o exame formal do mandado (especificidade, competência, fundamentação), o acompanhamento — quando possível — da diligência, e a análise posterior dos itens apreendidos para identificação de extrapolações, apreensões indevidas e violações de prerrogativa profissional.',
      'A atuação é integrada com as demais áreas do escritório: quando há prova digital envolvida na medida cautelar, a análise técnica começa em paralelo à resposta processual, garantindo que nenhuma fragilidade seja negligenciada na defesa inicial.',
    ],
    legalBasis: [
      {
        title: 'Prisão e Medidas Cautelares',
        articles: [
          'CPP, arts. 282 a 310 — medidas cautelares',
          'Art. 306 — comunicação imediata da prisão',
          'Resolução 213/2015 do CNJ — audiência de custódia',
        ],
      },
      {
        title: 'Busca e Apreensão',
        articles: ['CPP, arts. 240 a 250 — requisitos e execução'],
      },
      {
        title: 'Habeas Corpus',
        articles: ['CF/88, art. 5º, LXVIII; CPP, arts. 647 e seguintes'],
      },
    ],
    faq: [
      {
        question: 'O que fazer em caso de prisão em flagrante?',
        answer:
          'Contatar imediatamente um advogado criminal. A defesa técnica pode acompanhar a lavratura do auto, atuar na audiência de custódia (realizada em até 24h) e, quando cabível, requerer relaxamento da prisão ou liberdade provisória já nesse momento.',
      },
      {
        question: 'Posso ser obrigado a entregar a senha do meu celular em operação policial?',
        answer:
          'A jurisprudência não consolidou posição única, mas o direito à não autoincriminação (CF/88, art. 5º, LXIII) protege o acusado de ser compelido a produzir prova contra si mesmo. O exame do dispositivo, quando autorizado, é realizado pela perícia por vias técnicas.',
      },
      {
        question: 'Como impugnar uma busca e apreensão?',
        answer:
          'Verificando se o mandado atende aos requisitos legais (especificidade, competência, fundamentação), se houve extrapolação na execução, se houve respeito às prerrogativas do advogado (Lei 8.906/94, art. 7º) e se os itens apreendidos guardam relação com o fato investigado. Impugnações podem ser feitas via petição nos autos ou habeas corpus.',
      },
      {
        question: 'Habeas corpus cabe em qualquer prisão?',
        answer:
          'O habeas corpus é cabível sempre que houver coação ilegal ou ameaça à liberdade de locomoção — prisão ilegal, ausência de fundamentação, excesso de prazo, nulidade processual com reflexo na custódia. A medida pode ser impetrada contra qualquer autoridade coatora.',
      },
      {
        question: 'Quando um bloqueio de ativos pode ser questionado?',
        answer:
          'Sempre que a medida for desproporcional, carente de fundamentação, atingir bens de terceiros de boa-fé ou recaia sobre valores essenciais à subsistência do acusado e de sua família. O questionamento é feito por petição incidental ou habeas corpus patrimonial.',
      },
    ],
  },
]
