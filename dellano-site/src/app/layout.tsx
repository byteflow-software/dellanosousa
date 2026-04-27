import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/layout/JsonLd";
import { SITE_URL } from "@/lib/site";
import { layout as siteLayout, meta as siteMeta } from "@/content";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const attorneyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  name: "Dellano Sousa",
  alternateName: siteLayout.brand.name,
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
  name: siteLayout.brand.name,
  url: SITE_URL,
  logo: `${SITE_URL}${siteLayout.brand.logoHeader.src}`,
  description: siteMeta.home.description,
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
    template: `%s | ${siteLayout.brand.name}`,
    default: siteMeta.home.ogTitle,
  },
  description: siteMeta.home.description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteLayout.brand.name,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.home.ogTitle,
    description: siteMeta.home.description,
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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
