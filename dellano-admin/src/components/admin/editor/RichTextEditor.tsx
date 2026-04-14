'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { marked } from 'marked'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Undo,
  Redo,
  Eye,
  FileCode,
  Type,
  X,
  Upload,
  Loader2,
} from 'lucide-react'


type EditorMode = 'visual' | 'markdown' | 'html'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Escreva o conteúdo...' }: Props) {
  const [mode, setMode] = useState<EditorMode>('visual')
  const [markdownContent, setMarkdownContent] = useState('')
  const [htmlContent, setHtmlContent] = useState(content || '')
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const htmlContentRef = useRef(content || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      htmlContentRef.current = html
      setHtmlContent(html)
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'rich-editor__content',
      },
    },
  })

  // Sync editor when content prop changes from outside
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
      htmlContentRef.current = content || ''
      setHtmlContent(content || '')
    }
  }, [content, editor])

  // Convert HTML to Markdown on mode switch
  useEffect(() => {
    if (mode === 'markdown' && htmlContentRef.current) {
      // Simple HTML to Markdown conversion for initial content
      const html = htmlContentRef.current
      const md = html
        .replace(/<h1>/g, '# ').replace(/<\/h1>/g, '\n\n')
        .replace(/<h2>/g, '## ').replace(/<\/h2>/g, '\n\n')
        .replace(/<h3>/g, '### ').replace(/<\/h3>/g, '\n\n')
        .replace(/<p>/g, '').replace(/<\/p>/g, '\n\n')
        .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
        .replace(/<em>/g, '*').replace(/<\/em>/g, '*')
        .replace(/<u>/g, '__').replace(/<\/u>/g, '__')
        .replace(/<code>/g, '`').replace(/<\/code>/g, '`')
        .replace(/<pre><code>/g, '```\n').replace(/<\/code><\/pre>/g, '\n```\n\n')
        .replace(/<blockquote>/g, '> ').replace(/<\/blockquote>/g, '\n\n')
        .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
        .replace(/<ol>/g, '').replace(/<\/ol>/g, '')
        .replace(/<li>/g, '- ').replace(/<\/li>/g, '\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim()
      setMarkdownContent(md)
    }
  }, [mode])

  const switchMode = useCallback((newMode: EditorMode) => {
    if (!editor) return

    if (newMode === 'visual') {
      if (mode === 'markdown') {
        const html = marked.parse(markdownContent, { async: false }) as string
        editor.commands.setContent(html)
        htmlContentRef.current = html
        onChange(html)
      } else if (mode === 'html') {
        editor.commands.setContent(htmlContent)
        htmlContentRef.current = htmlContent
        onChange(htmlContent)
      }
    }

    setMode(newMode)
  }, [editor, mode, markdownContent, htmlContent, onChange])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setMarkdownContent(val)
    const html = marked.parse(val, { async: false }) as string
    htmlContentRef.current = html
    onChange(html)
  }

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setHtmlContent(val)
    htmlContentRef.current = val
    onChange(val)
  }

  const addLink = () => {
    if (!editor || !linkUrl) return
    if (linkText) {
      editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run()
    }
    setShowLinkModal(false)
    setLinkUrl('')
    setLinkText('')
  }

  const addImage = () => {
    if (!editor || !imageUrl) return
    editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run()
    setShowImageModal(false)
    setImageUrl('')
    setImageAlt('')
    setUploadError('')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setUploadError('Apenas imagens são permitidas')
      return
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Arquivo muito grande. Máximo 5MB.')
      return
    }

    setUploadingImage(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'artigos')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao fazer upload')
      }

      setImageUrl(data.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Erro ao fazer upload')
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const setLink = () => {
    if (!editor) return
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to)
    setLinkText(text)
    setShowLinkModal(true)
  }

  if (!editor) return null

  const toolbarButton = (command: () => boolean, icon: React.ReactNode, active?: boolean, title?: string) => (
    <button
      type="button"
      onClick={() => command()}
      className={`rich-editor__toolbar-btn ${active ? 'is-active' : ''}`}
      title={title}
    >
      {icon}
    </button>
  )

  return (
    <div className="rich-editor">
      {/* Mode Switcher */}
      <div className="rich-editor__mode-switcher">
        <button
          type="button"
          onClick={() => switchMode('visual')}
          className={mode === 'visual' ? 'is-active' : ''}
        >
          <Type size={14} />
          Visual
        </button>
        <button
          type="button"
          onClick={() => switchMode('markdown')}
          className={mode === 'markdown' ? 'is-active' : ''}
        >
          <FileCode size={14} />
          Markdown
        </button>
        <button
          type="button"
          onClick={() => switchMode('html')}
          className={mode === 'html' ? 'is-active' : ''}
        >
          <Code size={14} />
          HTML
        </button>
      </div>

      {/* Visual Toolbar */}
      {mode === 'visual' && (
        <div className="rich-editor__toolbar">
          <div className="rich-editor__toolbar-group">
            {toolbarButton(() => editor.chain().focus().toggleBold().run(), <Bold size={16} />, editor.isActive('bold'), 'Negrito')}
            {toolbarButton(() => editor.chain().focus().toggleItalic().run(), <Italic size={16} />, editor.isActive('italic'), 'Itálico')}
            {toolbarButton(() => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon size={16} />, editor.isActive('underline'), 'Sublinhado')}
            {toolbarButton(() => editor.chain().focus().toggleStrike().run(), <Strikethrough size={16} />, editor.isActive('strike'), 'Tachado')}
            {toolbarButton(() => editor.chain().focus().toggleCode().run(), <Code size={16} />, editor.isActive('code'), 'Código inline')}
            {toolbarButton(() => editor.chain().focus().toggleHighlight().run(), <Highlighter size={16} />, editor.isActive('highlight'), 'Destaque')}
          </div>

          <div className="rich-editor__toolbar-divider" />

          <div className="rich-editor__toolbar-group">
            {toolbarButton(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 size={16} />, editor.isActive('heading', { level: 1 }), 'Título 1')}
            {toolbarButton(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={16} />, editor.isActive('heading', { level: 2 }), 'Título 2')}
            {toolbarButton(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={16} />, editor.isActive('heading', { level: 3 }), 'Título 3')}
          </div>

          <div className="rich-editor__toolbar-divider" />

          <div className="rich-editor__toolbar-group">
            {toolbarButton(() => editor.chain().focus().toggleBulletList().run(), <List size={16} />, editor.isActive('bulletList'), 'Lista')}
            {toolbarButton(() => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={16} />, editor.isActive('orderedList'), 'Lista numerada')}
            {toolbarButton(() => editor.chain().focus().toggleBlockquote().run(), <Quote size={16} />, editor.isActive('blockquote'), 'Citação')}
            {toolbarButton(() => editor.chain().focus().toggleCodeBlock().run(), <FileCode size={16} />, editor.isActive('codeBlock'), 'Bloco de código')}
          </div>

          <div className="rich-editor__toolbar-divider" />

          <div className="rich-editor__toolbar-group">
            {toolbarButton(() => editor.chain().focus().setTextAlign('left').run(), <AlignLeft size={16} />, editor.isActive({ textAlign: 'left' }), 'Alinhar à esquerda')}
            {toolbarButton(() => editor.chain().focus().setTextAlign('center').run(), <AlignCenter size={16} />, editor.isActive({ textAlign: 'center' }), 'Centralizar')}
            {toolbarButton(() => editor.chain().focus().setTextAlign('right').run(), <AlignRight size={16} />, editor.isActive({ textAlign: 'right' }), 'Alinhar à direita')}
          </div>

          <div className="rich-editor__toolbar-divider" />

          <div className="rich-editor__toolbar-group">
            {toolbarButton(setLink, <LinkIcon size={16} />, editor.isActive('link'), 'Inserir link')}
            {toolbarButton(() => setShowImageModal(true), <ImageIcon size={16} />, false, 'Inserir imagem')}
          </div>

          <div className="rich-editor__toolbar-divider" />

          <div className="rich-editor__toolbar-group">
            {toolbarButton(() => editor.chain().focus().undo().run(), <Undo size={16} />, false, 'Desfazer')}
            {toolbarButton(() => editor.chain().focus().redo().run(), <Redo size={16} />, false, 'Refazer')}
          </div>
        </div>
      )}


      {/* Editor Content by Mode */}
      {mode === 'visual' && (
        <EditorContent editor={editor} />
      )}

      {mode === 'markdown' && (
        <div className="rich-editor__split-view">
          <div className="rich-editor__split-pane">
            <div className="rich-editor__split-header">
              <FileCode size={14} />
              Markdown
            </div>
            <textarea
              value={markdownContent}
              onChange={handleMarkdownChange}
              className="rich-editor__textarea"
              spellCheck={false}
              placeholder="# Título&#10;&#10;Escreva em Markdown..."
            />
          </div>
          <div className="rich-editor__split-pane">
            <div className="rich-editor__split-header">
              <Eye size={14} />
              Preview
            </div>
            <div
              className="rich-editor__preview"
              dangerouslySetInnerHTML={{ __html: marked.parse(markdownContent || '', { async: false }) as string }}
            />
          </div>
        </div>
      )}

      {mode === 'html' && (
        <div className="rich-editor__html-mode">
          <div className="rich-editor__split-header">
            <FileCode size={14} />
            HTML
          </div>
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            className="rich-editor__textarea"
            spellCheck={false}
            placeholder="<p>Escreva HTML...</p>"
          />
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="rich-editor__modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="rich-editor__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rich-editor__modal-header">
              <h3>Inserir Link</h3>
              <button type="button" onClick={() => setShowLinkModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="rich-editor__modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="admin-form-input"
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Texto (opcional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="admin-form-input"
                  placeholder="Texto do link"
                />
              </div>
            </div>
            <div className="rich-editor__modal-footer">
              <button type="button" onClick={() => setShowLinkModal(false)} className="admin-btn admin-btn-secondary">
                Cancelar
              </button>
              <button type="button" onClick={addLink} className="admin-btn admin-btn-primary">
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="rich-editor__modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="rich-editor__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rich-editor__modal-header">
              <h3>Inserir Imagem</h3>
              <button type="button" onClick={() => setShowImageModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="rich-editor__modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Upload ou URL</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="admin-btn admin-btn-secondary flex-shrink-0"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Upload
                      </>
                    )}
                  </button>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="admin-form-input flex-1"
                    placeholder="Ou cole uma URL..."
                    disabled={uploadingImage}
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {imageUrl && (
                <div className="admin-form-group">
                  <label className="admin-form-label">Preview</label>
                  <div className="border border-border rounded-lg p-4 bg-background">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-32 max-w-full object-contain mx-auto"
                    />
                  </div>
                </div>
              )}

              <div className="admin-form-group">
                <label className="admin-form-label">Texto alternativo (alt)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="admin-form-input"
                  placeholder="Descrição da imagem"
                />
              </div>

              {uploadError && <span className="admin-form-error">{uploadError}</span>}
            </div>
            <div className="rich-editor__modal-footer">
              <button type="button" onClick={() => setShowImageModal(false)} className="admin-btn admin-btn-secondary">
                Cancelar
              </button>
              <button type="button" onClick={addImage} className="admin-btn admin-btn-primary">
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
