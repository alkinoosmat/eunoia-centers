import 'server-only'
import { sql } from './db'
import type { Post } from '@/types/blog'

// ── Row type returned from Postgres ─────────────────────────────────────────
interface PostRow {
  slug: string
  author_id: string
  cover_image: string | null
  published_at: string
  updated_at: string
  status: string
  tags: string[]
  fallback_locale: string | null
  content: Post['content']
}

function rowToPost(row: PostRow): Post {
  return {
    slug: row.slug,
    authorId: row.author_id,
    coverImage: row.cover_image ?? undefined,
    publishedAt: new Date(row.published_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    status: row.status as Post['status'],
    tags: row.tags,
    fallbackLocale: (row.fallback_locale ?? undefined) as Post['fallbackLocale'],
    content: row.content,
  }
}

export async function getAllPosts(locale?: 'en' | 'el'): Promise<Post[]> {
  const rows = await sql<PostRow[]>`
    SELECT * FROM posts ORDER BY published_at DESC
  `
  let posts = rows.map(rowToPost)

  if (locale) {
    posts = posts.filter((p) => {
      const hasLocale = !!p.content[locale]
      const hasFallback =
        !hasLocale && !!p.fallbackLocale && !!p.content[p.fallbackLocale]
      return hasLocale || hasFallback
    })
  }

  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const rows = await sql<PostRow[]>`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `
  return rows.length ? rowToPost(rows[0]) : null
}

export async function createPost(post: Post): Promise<void> {
  await sql`
    INSERT INTO posts (slug, author_id, cover_image, published_at, updated_at, status, tags, fallback_locale, content)
    VALUES (
      ${post.slug},
      ${post.authorId},
      ${post.coverImage ?? null},
      ${post.publishedAt},
      ${post.updatedAt},
      ${post.status},
      ${sql.array(post.tags)},
      ${post.fallbackLocale ?? null},
      ${JSON.stringify(post.content)}::jsonb
    )
  `
}

export async function updatePost(
  slug: string,
  updates: Partial<Post>
): Promise<void> {
  const existing = await getPost(slug)
  if (!existing) throw new Error(`Post not found: ${slug}`)
  const updated: Post = { ...existing, ...updates, updatedAt: new Date().toISOString() }

  await sql`
    UPDATE posts SET
      author_id      = ${updated.authorId},
      cover_image    = ${updated.coverImage ?? null},
      published_at   = ${updated.publishedAt},
      updated_at     = ${updated.updatedAt},
      status         = ${updated.status},
      tags           = ${sql.array(updated.tags)},
      fallback_locale = ${updated.fallbackLocale ?? null},
      content        = ${JSON.stringify(updated.content)}::jsonb
    WHERE slug = ${slug}
  `
}

export async function deletePost(slug: string): Promise<void> {
  await sql`DELETE FROM posts WHERE slug = ${slug}`
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    α:'a',β:'b',γ:'g',δ:'d',ε:'e',ζ:'z',η:'i',θ:'th',ι:'i',κ:'k',
    λ:'l',μ:'m',ν:'n',ξ:'x',ο:'o',π:'p',ρ:'r',σ:'s',ς:'s',τ:'t',
    υ:'y',φ:'f',χ:'ch',ψ:'ps',ω:'o',
    ά:'a',έ:'e',ή:'i',ί:'i',ό:'o',ύ:'y',ώ:'o',ϊ:'i',ϋ:'y',ΐ:'i',ΰ:'y',
  }
  return text
    .toLowerCase()
    .split('')
    .map((c) => map[c] ?? c)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}
