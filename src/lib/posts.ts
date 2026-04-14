import 'server-only'
import { readFile, writeFile, unlink, readdir } from 'fs/promises'
import path from 'path'
import type { Post } from '@/types/blog'

const POSTS_DIR = path.join(process.cwd(), 'data', 'posts')

function postPath(slug: string) {
  return path.join(POSTS_DIR, `${slug}.json`)
}

export async function getAllPosts(locale?: 'en' | 'el'): Promise<Post[]> {
  let files: string[]
  try {
    files = await readdir(POSTS_DIR)
  } catch {
    return []
  }

  const posts: Post[] = []
  for (const file of files) {
    if (!file.endsWith('.json')) continue
    try {
      const raw = await readFile(path.join(POSTS_DIR, file), 'utf-8')
      const post = JSON.parse(raw) as Post
      if (locale) {
        const hasLocale = !!post.content[locale]
        const hasFallback =
          !hasLocale &&
          post.fallbackLocale &&
          !!post.content[post.fallbackLocale]
        if (!hasLocale && !hasFallback) continue
      }
      posts.push(post)
    } catch {
      // skip malformed files
    }
  }

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await readFile(postPath(slug), 'utf-8')
    return JSON.parse(raw) as Post
  } catch {
    return null
  }
}

export async function createPost(post: Post): Promise<void> {
  await writeFile(postPath(post.slug), JSON.stringify(post, null, 2), 'utf-8')
}

export async function updatePost(
  slug: string,
  updates: Partial<Post>
): Promise<void> {
  const existing = await getPost(slug)
  if (!existing) throw new Error(`Post not found: ${slug}`)
  const updated: Post = { ...existing, ...updates, updatedAt: new Date().toISOString() }
  await writeFile(postPath(slug), JSON.stringify(updated, null, 2), 'utf-8')
}

export async function deletePost(slug: string): Promise<void> {
  await unlink(postPath(slug))
}

export function slugify(text: string): string {
  // Greek transliteration table
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
