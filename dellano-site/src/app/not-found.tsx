import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center bg-background">
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <p className="font-serif font-semibold text-gold text-8xl mb-4">404</p>
        <h1 className="font-serif font-semibold text-primary text-2xl md:text-4xl mb-4">
          Página não encontrada
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          A página que você procura não existe ou foi removida. Use os links abaixo para
          navegar pelo site.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Button href="/" variant="primary">Voltar ao início</Button>
          <Button href="/contato" variant="outline">Falar com o escritório</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {[
            { href: '/sobre', label: 'Sobre' },
            { href: '/areas-de-atuacao', label: 'Áreas de Atuação' },
            { href: '/provas-digitais', label: 'Provas Digitais' },
            { href: '/artigos', label: 'Artigos' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
