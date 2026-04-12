'use client'

import { useState } from 'react'

type ShareButtonsProps = {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="mt-10 pt-6 border-t border-primary/10">
      <p className="font-sans font-semibold text-primary text-sm mb-3">Compartilhar</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-sans font-medium bg-white border border-primary/15 text-muted hover:border-gold/40 hover:text-primary transition-colors"
        >
          WhatsApp
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-sans font-medium bg-white border border-primary/15 text-muted hover:border-gold/40 hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg text-xs font-sans font-medium bg-white border border-primary/15 text-muted hover:border-gold/40 hover:text-primary transition-colors"
        >
          {copied ? 'Link copiado' : 'Copiar link'}
        </button>
      </div>
    </div>
  )
}
