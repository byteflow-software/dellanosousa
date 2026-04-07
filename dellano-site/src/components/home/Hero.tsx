'use client'

import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PWFG7DRODCD6I1'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' } as Transition,
})

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 70% 50%, #415A7720 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.p
              {...fadeUp(0.1)}
              className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4"
            >
              Escritório Especializado
            </motion.p>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-serif font-semibold text-primary text-3xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Defesa criminal estratégica com especialização em{' '}
              <em className="not-italic text-accent">provas digitais</em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.35)}
              className="font-sans text-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Atuação jurídica especializada em evidências digitais, investigação defensiva e
              construção de teses técnicas para proteção da liberdade, da reputação e do
              patrimônio.
            </motion.p>

            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4">
              <Button href="/contato" variant="outline" size="lg">
                Agendar consulta
              </Button>
              <Button href={WHATSAPP_URL} external variant="primary" size="lg">
                Plantão 24h
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-80 md:w-96 md:h-[480px] lg:w-[420px] lg:h-[520px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/10 shadow-2xl bg-gradient-to-br from-secondary to-primary">
                <Image
                  src="/images/dellano/dellano-home.jpg"
                  alt="Dellano Sousa — Advogado Criminal e Especialista em Provas Digitais"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 420px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold/20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
