import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies do escritório Dellano Sousa Advocacia.',
}

export default function PoliticaDeCookiesPage() {
  return (
    <div className="bg-background py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif font-semibold text-primary text-3xl md:text-4xl mb-4">
          Política de Cookies
        </h1>
        <p className="text-muted text-sm mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-muted prose-p:leading-relaxed">
          <h2>1. O que são cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você
            visita um site. Eles servem para lembrar preferências, analisar o comportamento de
            navegação e melhorar a experiência do usuário.
          </p>

          <h2>2. Tipos de cookies que utilizamos</h2>

          <h3>Cookies essenciais</h3>
          <p>
            Necessários para o funcionamento básico do site (segurança, sessão). Não podem ser
            desativados.
          </p>

          <h3>Cookies analíticos</h3>
          <p>
            Utilizamos Google Analytics e Vercel Analytics para entender como os visitantes
            interagem com o site. Os dados são coletados de forma anonimizada e agregada.
          </p>

          <h2>3. Como gerenciar cookies</h2>
          <p>
            Você pode desativar cookies nas configurações do seu navegador. Note que isso pode
            afetar funcionalidades do site. Também pode optar por não participar do Google
            Analytics instalando o{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              add-on de desativação
            </a>
            .
          </p>

          <h2>4. Cookies de terceiros</h2>
          <p>
            Não utilizamos cookies de publicidade ou rastreamento de terceiros para fins
            comerciais.
          </p>

          <h2>5. Consentimento</h2>
          <p>
            Ao continuar navegando neste site, você consente com o uso de cookies conforme
            descrito nesta política. Você pode revogar o consentimento a qualquer momento
            limpando os cookies do navegador.
          </p>

          <h2>6. Contato</h2>
          <p>Dúvidas: contato@dellanosousa.com.br</p>
        </div>
      </div>
    </div>
  )
}
