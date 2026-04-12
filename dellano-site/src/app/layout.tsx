import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/layout/JsonLd";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dellanosousa.com.br";

const attorneyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: "Dellano Sousa",
  alternateName: "Dellano Sousa Advocacia",
  url: SITE_URL,
  image: `${SITE_URL}/images/dellano/dellano-hero.jpeg`,
  description:
    "Advogado criminalista com atuação especializada em provas digitais e investigação defensiva. OAB/CE 53.322.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "Country", name: "Brasil" },
    { "@type": "City", name: "Fortaleza" },
    { "@type": "City", name: "Teresina" },
    { "@type": "City", name: "Brasília" },
    { "@type": "City", name: "Ribeirão Preto" },
  ],
  knowsAbout: [
    "Direito Penal",
    "Provas Digitais",
    "Investigação Defensiva",
    "Cadeia de Custódia",
    "Computação Forense",
  ],
  memberOf: [
    { "@type": "Organization", name: "OAB/CE" },
    { "@type": "Organization", name: "ABRACRIM" },
    { "@type": "Organization", name: "IAB" },
    { "@type": "Organization", name: "Comissão de Direito Digital — ABRACRIM" },
  ],
  sameAs: [
    "https://instagram.com/dellanosousaadvocacia",
    "https://linkedin.com/in/dellanosousa",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Dellano Sousa Advocacia",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logo-header.png`,
  description:
    "Escritório de advocacia criminal com atuação especializada em provas digitais, investigação defensiva e cadeia de custódia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    addressCountry: "BR",
  },
  areaServed: "BR",
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dellano Sousa Advocacia",
    default: "Dellano Sousa Advocacia — Defesa Criminal e Provas Digitais",
  },
  description:
    "Escritório jurídico com atuação especializada em defesa criminal estratégica, provas digitais e investigação defensiva. Atuação nacional.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dellanosousa.com.br",
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dellano Sousa Advocacia",
    images: [
      { url: "/images/brand/topo-insta.jpg", width: 1080, height: 1080 },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <JsonLd data={[attorneyJsonLd, organizationJsonLd]} />
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
