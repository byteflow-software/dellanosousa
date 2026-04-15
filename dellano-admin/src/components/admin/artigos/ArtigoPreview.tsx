'use client'

import { X, Eye, Calendar, User, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ArtigoData {
  title: string
  slug: string
  excerpt: string
  content: string
  categoryLabel: string
  coverImage?: string
  author: string
  publishedAt?: string
}

interface Props {
  artigo: ArtigoData
  isOpen: boolean
  onClose: () => void
}

export function ArtigoPreview({ artigo, isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-primary">Preview do Artigo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <article className="bg-white">
            {/* Cover Image */}
            {artigo.coverImage ? (
              <div className="relative h-64 md:h-80 bg-gray-100">
                <img
                  src={artigo.coverImage}
                  alt={artigo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <Badge variant="accent" className="mb-3">
                    {artigo.categoryLabel}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {artigo.title}
                  </h1>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 border-b border-border">
                <Badge variant="accent" className="mb-3">
                  {artigo.categoryLabel}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {artigo.title}
                </h1>
              </div>
            )}

            {/* Meta */}
            <div className="px-6 md:px-8 py-4 border-b border-border bg-gray-50 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <User size={14} />
                <span>{artigo.author}</span>
              </div>
              {artigo.publishedAt && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar size={14} />
                  <span>{formatDate(artigo.publishedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted">
                <Tag size={14} />
                <span>/{artigo.slug}</span>
              </div>
            </div>

            {/* Excerpt */}
            {artigo.excerpt && (
              <div className="px-6 md:px-8 py-6 bg-gray-50 border-l-4 border-gold">
                <p className="text-lg text-muted italic leading-relaxed">
                  {artigo.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div
              className="p-6 md:p-8 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: artigo.content }}
            />
          </article>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-gray-50 flex justify-between items-center">
          <span className="text-sm text-muted">
            Esta é apenas uma prévia visual. O layout final pode variar.
          </span>
          <button
            onClick={onClose}
            className="admin-btn admin-btn-secondary"
          >
            Fechar Preview
          </button>
        </div>
      </div>
    </div>
  )
}
