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
import { NewsletterSignup } from '@/components/layout/NewsletterSignup'
import { FinalCTA } from '@/components/home/FinalCTA'
import { meta } from '@/content'

export const metadata: Metadata = {
  title: meta.home.title,
  description: meta.home.description,
  openGraph: {
    title: meta.home.ogTitle,
    description: meta.home.ogDescription,
    images: [{ url: meta.home.ogImage, width: 1080, height: 1080 }],
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
      <FinalCTA />
    </>
  )
}
