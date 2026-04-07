import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do escritório Dellano Sousa Advocacia, em conformidade com a LGPD.',
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif font-semibold text-primary text-3xl md:text-4xl mb-4">
          Política de Privacidade
        </h1>
        <p className="text-muted text-sm mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted prose-p:leading-relaxed">
          <h2>1. Quem somos</h2>
          <p>
            Dellano Sousa Advocacia, inscrito na OAB/CE, com sede em Fortaleza/CE, é responsável
            pelo site dellanosousa.com.br. Esta Política de Privacidade descreve como coletamos,
            usamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção
            de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>2. Dados coletados</h2>
          <p>Coletamos apenas os dados que você nos fornece voluntariamente pelo formulário de contato:</p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Assunto e mensagem</li>
          </ul>
          <p>Também coletamos dados técnicos de acesso (endereço IP, tipo de navegador, páginas visitadas) por meio de ferramentas de analytics, de forma anonimizada.</p>

          <h2>3. Finalidade do tratamento</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul>
            <li>Responder ao seu contato e prestar o serviço solicitado</li>
            <li>Manter comunicação sobre o caso ou consulta</li>
            <li>Cumprir obrigações legais aplicáveis</li>
          </ul>

          <h2>4. Base legal</h2>
          <p>
            O tratamento é fundamentado no consentimento do titular (art. 7º, I, LGPD) e na
            execução de contrato ou procedimentos preliminares (art. 7º, V, LGPD).
          </p>

          <h2>5. Compartilhamento</h2>
          <p>
            Não compartilhamos seus dados com terceiros, exceto quando necessário para prestação
            do serviço (ex: provedor de e-mail para envio de mensagens) ou quando exigido por
            lei ou ordem judicial.
          </p>

          <h2>6. Retenção</h2>
          <p>
            Dados de contato são mantidos pelo período necessário ao atendimento da solicitação
            e, quando aplicável, pelo prazo legal de guarda de documentos advocatícios.
          </p>

          <h2>7. Seus direitos</h2>
          <p>Você tem direito a: acesso, correção, exclusão, portabilidade e revogação de consentimento dos seus dados. Para exercê-los, entre em contato pelo e-mail contato@dellanosousa.com.br.</p>

          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra
            acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <h2>9. Contato do DPO</h2>
          <p>
            Para questões relacionadas à privacidade: contato@dellanosousa.com.br
          </p>
        </div>
      </div>
    </div>
  )
}
