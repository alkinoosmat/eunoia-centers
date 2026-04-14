'use client'

import { useState, useCallback } from 'react'
import { useActionState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { PostActionState } from '@/actions/posts'
import type { Post } from '@/types/blog'
import Button from '@/components/ui/Button'

interface PostEditorProps {
  action: (prevState: PostActionState, formData: FormData) => Promise<PostActionState>
  initialPost?: Post
  locale: 'en' | 'el'
}

type Tab = 'en' | 'el'

const inputClass = 'w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-white text-[#1C1A17] text-sm placeholder:text-[#A09B8C] focus:outline-none focus:ring-2 focus:ring-[#6B8F6B] focus:border-transparent transition-colors'
const labelClass = 'block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide uppercase'

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-sm transition-colors ${active ? 'bg-[#6B8F6B] text-white' : 'text-[#7A7468] hover:bg-[#F5F4F0] hover:text-[#1C1A17]'}`}
    >
      {children}
    </button>
  )
}

function TiptapEditor({
  initialContent,
  onChange,
}: {
  initialContent: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose min-h-[200px] max-w-none px-4 py-3 focus:outline-none text-sm text-[#1C1A17] leading-relaxed',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="border border-[#E8E6E0] rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-[#E8E6E0] bg-[#FAFAF8]">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><strong>B</strong></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></ToolbarButton>
        <div className="w-px bg-[#E8E6E0] mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolbarButton>
        <div className="w-px bg-[#E8E6E0] mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">• List</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1. List</ToolbarButton>
        <div className="w-px bg-[#E8E6E0] mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">&ldquo;&rdquo;</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code">{`<>`}</ToolbarButton>
        <div className="w-px bg-[#E8E6E0] mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal rule">—</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">↩</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">↪</ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

const initialState: PostActionState = {}

export default function PostEditor({ action, initialPost, locale }: PostEditorProps) {
  const [state, formAction, pending] = useActionState(action, initialState)
  const [activeTab, setActiveTab] = useState<Tab>(locale)

  const [bodyEn, setBodyEn] = useState(initialPost?.content.en?.body ?? '')
  const [bodyEl, setBodyEl] = useState(initialPost?.content.el?.body ?? '')

  const handleBodyEnChange = useCallback((html: string) => setBodyEn(html), [])
  const handleBodyElChange = useCallback((html: string) => setBodyEl(html), [])

  const enContent = initialPost?.content.en
  const elContent = initialPost?.content.el

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden body fields */}
      <input type="hidden" name="bodyEn" value={bodyEn} />
      <input type="hidden" name="bodyEl" value={bodyEl} />

      {state.error && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {state.error}
        </div>
      )}

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="slug" className={labelClass}>Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={initialPost?.slug ?? ''} placeholder="my-post-title" className={inputClass} readOnly={!!initialPost} />
          {initialPost && <p className="mt-1 text-xs text-[#A09B8C]">Slug cannot be changed after creation.</p>}
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Status</label>
          <select id="status" name="status" defaultValue={initialPost?.status ?? 'draft'} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label htmlFor="tags" className={labelClass}>Tags (comma-separated)</label>
          <input id="tags" name="tags" type="text" defaultValue={initialPost?.tags.join(', ') ?? ''} placeholder="therapy, meaning, wellbeing" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coverImage" className={labelClass}>Cover Image URL</label>
          <input id="coverImage" name="coverImage" type="text" defaultValue={initialPost?.coverImage ?? ''} placeholder="/uploads/blog/cover.jpg" className={inputClass} />
        </div>
        <div>
          <label htmlFor="fallbackLocale" className={labelClass}>Fallback locale (show on both if one language missing)</label>
          <select id="fallbackLocale" name="fallbackLocale" defaultValue={initialPost?.fallbackLocale ?? ''} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="">None — hide if language missing</option>
            <option value="en">English</option>
            <option value="el">Greek</option>
          </select>
        </div>
      </div>

      {/* Language tabs */}
      <div>
        <div className="flex border-b border-[#E8E6E0] mb-6" role="tablist">
          {(['en', 'el'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab ? 'border-[#6B8F6B] text-[#6B8F6B]' : 'border-transparent text-[#A09B8C] hover:text-[#4A4540]'}`}
            >
              {tab === 'en' ? '🇬🇧 English' : '🇬🇷 Ελληνικά'}
            </button>
          ))}
        </div>

        {/* EN panel */}
        <div role="tabpanel" className={activeTab === 'en' ? 'block space-y-4' : 'hidden'}>
          <div>
            <label htmlFor="titleEn" className={labelClass}>Title (EN)</label>
            <input id="titleEn" name="titleEn" type="text" defaultValue={enContent?.title ?? ''} placeholder="Post title in English" className={inputClass} />
          </div>
          <div>
            <label htmlFor="excerptEn" className={labelClass}>Excerpt (EN)</label>
            <textarea id="excerptEn" name="excerptEn" rows={2} defaultValue={enContent?.excerpt ?? ''} placeholder="Short summary (160 chars)" maxLength={200} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <span className={labelClass}>Content (EN)</span>
            <TiptapEditor initialContent={enContent?.body ?? ''} onChange={handleBodyEnChange} />
          </div>
        </div>

        {/* EL panel */}
        <div role="tabpanel" className={activeTab === 'el' ? 'block space-y-4' : 'hidden'}>
          <div>
            <label htmlFor="titleEl" className={labelClass}>Τίτλος (ΕΛ)</label>
            <input id="titleEl" name="titleEl" type="text" defaultValue={elContent?.title ?? ''} placeholder="Τίτλος αρθρου στα Ελληνικά" className={inputClass} />
          </div>
          <div>
            <label htmlFor="excerptEl" className={labelClass}>Περίληψη (ΕΛ)</label>
            <textarea id="excerptEl" name="excerptEl" rows={2} defaultValue={elContent?.excerpt ?? ''} placeholder="Σύντομη περιγραφή (160 χαρακτήρες)" maxLength={200} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <span className={labelClass}>Περιεχόμενο (ΕΛ)</span>
            <TiptapEditor initialContent={elContent?.body ?? ''} onChange={handleBodyElChange} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" size="md" disabled={pending} aria-busy={pending}>
          {pending ? 'Saving…' : initialPost ? 'Save Changes' : 'Create Post'}
        </Button>
        <Button type="button" variant="secondary" size="md" href="../">
          Cancel
        </Button>
      </div>
    </form>
  )
}
