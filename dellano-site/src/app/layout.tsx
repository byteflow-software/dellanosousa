import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { CookieBanner } from '@/components/layout/CookieBanner'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dellano Sousa Advocacia',
    default: 'Dellano Sousa Advocacia — Defesa Criminal e Provas Digitais',
  },
  description:
    'Escritório jurídico especializado em defesa criminal estratégica, provas digitais e investigação defensiva. Atuação nacional com plantão 24h.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dellanosousa.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Dellano Sousa Advocacia',
    images: [{ url: '/images/brand/topo-insta.jpg', width: 1080, height: 1080 }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  )
}
