'use client'

import { SiteKey } from '@prisma/client'
import { SITE_KEYS, SITE_LABELS } from '@/lib/sites'

interface Props {
  value: SiteKey[]
  onChange: (next: SiteKey[]) => void
  label?: string
  hint?: string
}

export function SitePicker({ value, onChange, label = 'Aparecer em quais sites', hint }: Props) {
  function toggle(key: SiteKey) {
    if (value.includes(key)) onChange(value.filter((k) => k !== key))
    else onChange([...value, key])
  }

  function selectAll() {
    onChange([...SITE_KEYS])
  }

  function clear() {
    onChange([])
  }

  return (
    <div className="admin-form-group">
      <label className="admin-form-label">{label} *</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
        {SITE_KEYS.map((key) => {
          const checked = value.includes(key)
          return (
            <label
              key={key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.7rem',
                borderRadius: '6px',
                border: `1px solid ${checked ? '#1e3a8a' : '#d1d5db'}`,
                background: checked ? '#e6f0ff' : '#fff',
                color: checked ? '#1e3a8a' : '#374151',
                cursor: 'pointer',
                fontSize: '0.78rem',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(key)}
                style={{ accentColor: '#1e3a8a' }}
              />
              {SITE_LABELS[key]}
            </label>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="button"
          onClick={selectAll}
          style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', color: '#374151' }}
        >
          Selecionar todos
        </button>
        <button
          type="button"
          onClick={clear}
          style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', color: '#374151' }}
        >
          Limpar
        </button>
      </div>
      {hint && <span className="admin-form-hint">{hint}</span>}
      {value.length === 0 && (
        <span className="admin-form-error">Selecione pelo menos um site</span>
      )}
    </div>
  )
}
