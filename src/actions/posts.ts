'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/session'
import { createPost, updatePost, deletePost, getPost, slugify } from '@/lib/posts'
import { sanitize } from '@/lib/sanitize'
import type { Post } from '@/types/blog'

export interface PostActionState {
  error?: string
}

function extractPostData(formData: FormData, existingSlug?: string) {
  const rawSlug = (formData.get('slug') as string | null)?.trim() ?? ''
  const slug = rawSlug ? slugify(rawSlug) : existingSlug ?? ''

  const titleEn = (formData.get('titleEn') as string | null)?.trim() ?? ''
  const excerptEn = (formData.get('excerptEn') as string | null)?.trim() ?? ''
  const bodyEnRaw = (formData.get('bodyEn') as string | null) ?? ''

  const titleEl = (formData.get('titleEl') as string | null)?.trim() ?? ''
  const excerptEl = (formData.get('excerptEl') as string | null)?.trim() ?? ''
  const bodyElRaw = (formData.get('bodyEl') as string | null) ?? ''

  const status = ((formData.get('status') as string | null) ?? 'draft') as Post['status']
  const tagsRaw = (formData.get('tags') as string | null) ?? ''
  const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
  const coverImage = (formData.get('coverImage') as string | null)?.trim() || undefined
  const fallbackLocale = (formData.get('fallbackLocale') as string | null) as Post['fallbackLocale']

  const content: Post['content'] = {}
  if (titleEn) {
    content.en = { title: titleEn, excerpt: excerptEn, body: sanitize(bodyEnRaw) }
  }
  if (titleEl) {
    content.el = { title: titleEl, excerpt: excerptEl, body: sanitize(bodyElRaw) }
  }

  return { slug, status, tags, coverImage, fallbackLocale, content }
}

export async function createPostAction(
  locale: string,
  _prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  const session = await getSession()
  if (!session) return { error: 'Not authenticated.' }

  const { slug, status, tags, coverImage, fallbackLocale, content } = extractPostData(formData)

  if (!slug) return { error: 'Slug is required.' }
  if (!content.en && !content.el) return { error: 'At least one language must have a title and content.' }

  const existing = await getPost(slug)
  if (existing) return { error: `A post with slug "${slug}" already exists.` }

  const now = new Date().toISOString()
  const post: Post = {
    slug,
    authorId: session.authorId,
    coverImage,
    publishedAt: now,
    updatedAt: now,
    status,
    tags,
    fallbackLocale,
    content,
  }

  await createPost(post)
  revalidatePath(`/${locale}/blog`)
  redirect(`/${locale}/blog/admin`)
}

export async function updatePostAction(
  locale: string,
  slug: string,
  _prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  const session = await getSession()
  if (!session) return { error: 'Not authenticated.' }

  const post = await getPost(slug)
  if (!post) return { error: 'Post not found.' }
  if (post.authorId !== session.authorId) return { error: 'Not authorised.' }

  const { status, tags, coverImage, fallbackLocale, content } = extractPostData(formData, slug)

  if (!content.en && !content.el) return { error: 'At least one language must have a title and content.' }

  await updatePost(slug, { status, tags, coverImage, fallbackLocale, content })
  revalidatePath(`/${locale}/blog`)
  revalidatePath(`/${locale}/blog/${slug}`)
  redirect(`/${locale}/blog/admin`)
}

export async function deletePostAction(locale: string, slug: string): Promise<void> {
  const session = await getSession()
  if (!session) redirect(`/${locale}/blog/login`)

  const post = await getPost(slug)
  if (!post || post.authorId !== session.authorId) redirect(`/${locale}/blog/admin`)

  await deletePost(slug)
  revalidatePath(`/${locale}/blog`)
  redirect(`/${locale}/blog/admin`)
}
