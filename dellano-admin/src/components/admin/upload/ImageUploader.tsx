'use client'

import { useState, useRef } from 'react'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'

interface Props {
  value?: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  placeholder?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'free'
  maxSizeMB?: number
}

export function ImageUploader({
  value,
  onChange,
  folder = 'uploads',
  label = 'Imagem',
  placeholder = 'Clique para fazer upload',
  aspectRatio = 'free',
  maxSizeMB = 5,
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-video',
    free: '',
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas')
      return
    }

    // Validar tamanho
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo ${maxSizeMB}MB`)
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao fazer upload')
      }

      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload')
    } finally {
      setUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  function handleRemove() {
    onChange('')
    setError('')
  }

  return (
    <div className="space-y-2">
      {label && <label className="admin-form-label">{label}</label>}

      {value ? (
        <div className={`relative group ${aspectRatioClass[aspectRatio]}`}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="Trocar imagem"
            >
              <Upload size={16} className="text-primary" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
              title="Remover imagem"
            >
              <X size={16} className="text-danger" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspectRatioClass[aspectRatio] || 'h-48'} border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50`}
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="text-primary animate-spin" />
              <span className="text-sm text-muted">Enviando...</span>
            </>
          ) : (
            <>
              <ImageIcon size={32} className="text-muted" />
              <div className="text-center">
                <span className="text-sm text-primary font-medium">{placeholder}</span>
                <p className="text-xs text-muted mt-1">JPG, PNG, WebP, GIF até {maxSizeMB}MB</p>
              </div>
            </>
          )}
        </button>
      )}

      {error && <span className="admin-form-error text-sm">{error}</span>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
