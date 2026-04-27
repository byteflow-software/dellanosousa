'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { navigation } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'
import { layout } from '@/content'

const { brand, header } = layout

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300 bg-white',
          scrolled
            ? 'border-b border-primary/10 shadow-sm'
            : 'border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={brand.logoHeader.src}
                alt={brand.logoHeader.alt}
                width={220}
                height={64}
                className="h-9 md:h-11 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-sans font-medium rounded-md transition-colors duration-200',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted hover:text-primary'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                href={WHATSAPP_URL}
                external
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                {header.ctaLabel}
              </Button>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
                aria-label={header.mobileMenuAriaLabel}
              >
                <Menu size={22} className="text-primary" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
