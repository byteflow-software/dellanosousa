'use client'

import { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2, AlertCircle, Eye, X } from 'lucide-react'
import { SiteKey } from '@prisma/client'
import { slugify } from '@/lib/utils'
import { createArtigo, updateArtigo, deleteArtigo } from '@/lib/actions/artigos'
import { RichTextEditor } from '@/components/admin/editor/RichTextEditor'
import { ImageUploader } from '@/components/admin/upload/ImageUploader'
import { SitePicker } from '@/components/admin/SitePicker'
import { ALL_SITES } from '@/lib/sites'
import { ArtigoPreview } from './ArtigoPreview'

const schema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras, números e hífens'),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  tagNames: z.array(z.string()),
  coverImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  featured: z.boolean(),
  publishedAt: z.string().optional(),
  author: z.string(),
  seoTitle: z.string().max(70).optional(),
  seoDesc: z.string().max(160).optional(),
  sites: z.array(z.nativeEnum(SiteKey)).min(1, 'Selecione ao menos um site'),
})

interface FormData {
  title: string
  slug: string
  excerpt: string
  content: string
  categoryId: string
  tagNames: string[]
  coverImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured: boolean
  publishedAt?: string
  author: string
  seoTitle?: string
  seoDesc?: string
  sites: SiteKey[]
}

interface CategoriaOption { id: string; name: string }
interface TagOption { id: string; name: string }

interface ArtigoFormData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  categoryId: string
  coverImage: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured: boolean
  publishedAt: Date | null
  author: string
  seoTitle: string | null
  seoDesc: string | null
  sites?: SiteKey[]
  tags: TagOption[]
}

interface Props {
  artigo?: ArtigoFormData
  id?: string
  isEdit?: boolean
  categorias: CategoriaOption[]
  tagsDisponiveis: TagOption[]
}

export function ArtigoForm({ artigo, id, isEdit, categorias, tagsDisponiveis }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const defaultCategoryId =
    artigo?.categoryId ?? (categorias[0]?.id ?? '')

  const { register, handleSubmit, setValue, watch, control, formState: { errors }, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: artigo?.title ?? '',
      slug: artigo?.slug ?? '',
      excerpt: artigo?.excerpt ?? '',
      content: artigo?.content ?? '',
      categoryId: defaultCategoryId,
      tagNames: artigo?.tags?.map((t) => t.name) ?? [],
      coverImage: artigo?.coverImage ?? '',
      status: artigo?.status ?? 'DRAFT',
      featured: artigo?.featured ?? false,
      publishedAt: artigo?.publishedAt ? new Date(artigo.publishedAt).toISOString().slice(0, 10) : '',
      author: artigo?.author || 'Dellano Sousa',
      seoTitle: artigo?.seoTitle ?? '',
      seoDesc: artigo?.seoDesc ?? '',
      sites: artigo?.sites ?? ALL_SITES,
    },
  })

  const sites = watch('sites') ?? ALL_SITES

  const title = watch('title')
  const coverImage = watch('coverImage')
  const tagNames = watch('tagNames') ?? []
  const categoryId = watch('categoryId')

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setValue('title', val)
    if (!isEdit) setValue('slug', slugify(val))
  }

  function addTag(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    if (tagNames.includes(trimmed)) return
    setValue('tagNames', [...tagNames, trimmed], { shouldValidate: true })
    setTagInput('')
  }

  function removeTag(name: string) {
    setValue('tagNames', tagNames.filter((t) => t !== name), { shouldValidate: true })
  }

  function handleTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
    } else if (e.key === 'Backspace' && !tagInput && tagNames.length > 0) {
      removeTag(tagNames[tagNames.length - 1])
    }
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    setServerError('')
    const res = isEdit && id
      ? await updateArtigo(id, data)
      : await createArtigo(data)
    setSaving(false)
    if (!res.success) { setServerError(res.error ?? 'Erro ao salvar'); return }
    router.push('/artigos')
    router.refresh()
  }

  async function handleDelete() {
    if (!id || !confirm('Excluir este artigo? Esta ação não pode ser desfeita.')) return
    await deleteArtigo(id)
  }

  const seoTitleVal = watch('seoTitle') ?? ''
  const seoDescVal = watch('seoDesc') ?? ''

  const sugestoesTags = tagsDisponiveis
    .filter((t) => !tagNames.includes(t.name))
    .filter((t) => !tagInput || t.name.toLowerCase().includes(tagInput.toLowerCase()))
    .slice(0, 8)

  const categoriaSelecionada = categorias.find((c) => c.id === categoryId)?.name ?? ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
      {serverError && (
        <div className="admin-alert admin-alert-error">
          <AlertCircle size={15} />
          {serverError}
        </div>
      )}

      <div className="admin-form-grid">
        <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="admin-form-label">Título *</label>
          <input
            {...register('title')}
            onChange={handleTitleChange}
            className="admin-form-input"
            placeholder="Título do artigo"
          />
          {errors.title && <span className="admin-form-error">{errors.title.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Slug *</label>
          <input {...register('slug')} className="admin-form-input" placeholder="url-do-artigo" />
          <span className="admin-form-hint">/artigos/{watch('slug') || 'url-do-artigo'}</span>
          {errors.slug && <span className="admin-form-error">{errors.slug.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Categoria *</label>
          {categorias.length === 0 ? (
            <span className="admin-form-hint" style={{ color: '#b91c1c' }}>
              Cadastre uma categoria em <a href="/categorias">/categorias</a> antes.
            </span>
          ) : (
            <select {...register('categoryId')} className="admin-form-select">
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          {errors.categoryId && <span className="admin-form-error">{errors.categoryId.message}</span>}
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Tags</label>
        <Controller
          name="tagNames"
          control={control}
          render={() => (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.4rem' }}>
                {tagNames.map((t) => (
                  <span
                    key={t}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: '#e6f0ff',
                      color: '#1e3a8a',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                    }}
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0, display: 'flex' }}
                      aria-label={`Remover ${t}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                onBlur={() => tagInput && addTag(tagInput)}
                className="admin-form-input"
                placeholder="Digite e pressione Enter ou vírgula"
              />
              {sugestoesTags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                  {sugestoesTags.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => addTag(t.name)}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        border: '1px solid #d1d5db',
                        background: '#f9fafb',
                        cursor: 'pointer',
                        color: '#374151',
                      }}
                    >
                      + {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Resumo *</label>
        <textarea
          {...register('excerpt')}
          className="admin-form-textarea"
          rows={2}
          placeholder="Resumo do artigo (max 500 caracteres)"
          style={{ minHeight: '64px' }}
        />
        {errors.excerpt && <span className="admin-form-error">{errors.excerpt.message}</span>}
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Conteúdo *</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              content={field.value || ''}
              onChange={field.onChange}
              placeholder="Escreva o conteúdo do artigo..."
            />
          )}
        />
        {errors.content && <span className="admin-form-error">{errors.content.message}</span>}
      </div>

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <ImageUploader
            value={coverImage}
            onChange={(url) => setValue('coverImage', url)}
            folder="artigos"
            label="Imagem de capa"
            aspectRatio="landscape"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status *</label>
          <select {...register('status')} className="admin-form-select">
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Data de publicação</label>
          <input {...register('publishedAt')} type="date" className="admin-form-input" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Autor</label>
          <input {...register('author')} className="admin-form-input" />
        </div>
      </div>

      <label className="admin-form-checkbox-group">
        <input {...register('featured')} type="checkbox" className="admin-form-checkbox" />
        <span className="admin-form-checkbox-label">Artigo em destaque</span>
      </label>

      <SitePicker
        value={sites}
        onChange={(next) => setValue('sites', next, { shouldValidate: true })}
        hint="O artigo aparecerá apenas nos sites selecionados"
      />

      <div className="admin-form-section-title">SEO</div>
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">Título SEO</label>
          <input {...register('seoTitle')} className="admin-form-input" placeholder={title} maxLength={70} />
          <span className="admin-form-hint">{seoTitleVal.length}/70</span>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Descrição SEO</label>
          <input {...register('seoDesc')} className="admin-form-input" maxLength={160} />
          <span className="admin-form-hint">{seoDescVal.length}/160</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={saving || categorias.length === 0} className="admin-btn admin-btn-primary">
          <Save size={14} />
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="admin-btn admin-btn-secondary"
        >
          <Eye size={14} />
          Preview
        </button>
        <button type="button" onClick={() => router.push('/artigos')} className="admin-btn admin-btn-secondary">
          Cancelar
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="admin-btn admin-btn-danger"
            style={{ marginLeft: 'auto' }}
          >
            <Trash2 size={14} />
            Excluir
          </button>
        )}
      </div>

      <ArtigoPreview
        artigo={{
          title: getValues('title') || 'Título do Artigo',
          slug: getValues('slug') || 'url-do-artigo',
          excerpt: getValues('excerpt') || '',
          content: getValues('content') || '<p>Conteúdo do artigo...</p>',
          categoryLabel: categoriaSelecionada || 'Categoria',
          coverImage: getValues('coverImage'),
          author: getValues('author'),
          publishedAt: getValues('publishedAt'),
        }}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </form>
  )
}
