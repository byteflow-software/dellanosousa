'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { navigation } from '@/data/navigation'
import { Button } from '@/components/ui/Button'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <span className="font-serif text-primary font-semibold text-lg">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-primary/5 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} className="text-primary" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 rounded-lg text-primary font-sans font-medium hover:bg-primary/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-6 border-t border-primary/10">
              <Button href={WHATSAPP_URL} external variant="primary" className="w-full justify-center">
                Atendimento urgente
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
