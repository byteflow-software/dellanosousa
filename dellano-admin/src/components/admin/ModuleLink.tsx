'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  href: string
  label: string
  desc: string
  icon: React.ReactNode
}

export function ModuleLink({ href, label, desc, icon }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.75rem',
        border: '1px solid var(--color-border)',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        transition: 'all 0.15s',
        background: hover ? '#F0F4FF' : undefined,
        borderColor: hover ? 'var(--color-accent)' : undefined,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)' }}>{label}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{desc}</div>
      </div>
    </Link>
  )
}
