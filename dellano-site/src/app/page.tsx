import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { AuthorityBar } from '@/components/home/AuthorityBar'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { RisksSection } from '@/components/home/RisksSection'
import { MethodSection } from '@/components/home/MethodSection'
import { InstitutionalRecognition } from '@/components/home/InstitutionalRecognition'
import { FeaturedArticles } from '@/components/home/FeaturedArticles'
import { GeographicPresence } from '@/components/home/GeographicPresence'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Defesa Criminal Estratégica e Provas Digitais',
  description:
    'Dellano Sousa Advocacia — Escritório de advocacia criminal com atuação especializada em provas digitais e investigação defensiva. Atuação nacional.',
  openGraph: {
    title: 'Dellano Sousa Advocacia — Defesa Criminal e Provas Digitais',
    description:
      'Escritório jurídico com atuação especializada em evidências digitais, investigação defensiva e construção de teses técnicas.',
    images: [{ url: '/images/brand/topo-insta.jpg', width: 1080, height: 1080 }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AuthorityBar />
      <AboutPreview />
      <ServicesGrid />
      <RisksSection />
      <MethodSection />
      <InstitutionalRecognition />
      <FeaturedArticles />
      <GeographicPresence />
      <FinalCTA />
    </>
  )
}
