'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatRelativeDate } from '@/lib/utils'

interface Props {
  id: string
  title: string
  status: string
  updatedAt: string
}

export function RecentArtigoLink({ id, title, status, updatedAt }: Props) {
  const [hover, setHover] = useState(false)

  const badgeClass =
    status === 'PUBLISHED'
      ? 'admin-badge-success'
      : status === 'DRAFT'
        ? 'admin-badge-warning'
        : 'admin-badge-secondary'

  const badgeText =
    status === 'PUBLISHED' ? 'Publicado' : status === 'DRAFT' ? 'Rascunho' : 'Arquivado'

  return (
    <Link
      href={`/artigos/${id}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        textDecoration: 'none',
        transition: 'background 0.15s',
        background: hover ? '#F8FAFC' : undefined,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#1E293B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: '0.125rem' }}>
          {formatRelativeDate(new Date(updatedAt))}
        </div>
      </div>
      <span className={`admin-badge ${badgeClass}`}>{badgeText}</span>
    </Link>
  )
}
