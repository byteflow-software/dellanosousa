'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookies-accepted'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:max-w-[340px] z-50">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          background: 'rgba(27, 58, 107, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="px-5 py-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-white" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-serif font-semibold text-white text-[15px] leading-snug mb-1">
                Sua privacidade importa
              </p>
              <p className="font-sans text-white/65 text-xs leading-relaxed">
                Usamos cookies para melhorar sua experiência.{' '}
                <Link
                  href="/politica-de-cookies"
                  className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  Saiba mais
                </Link>
                .
              </p>
            </div>
          </div>

          <button
            onClick={accept}
            className="w-full bg-white hover:bg-white/90 text-primary font-sans font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            Aceitar e continuar
          </button>
        </div>

        {/* bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}
