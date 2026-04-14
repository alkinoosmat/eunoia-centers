export interface PostContent {
  title: string
  excerpt: string
  body: string // sanitised HTML
}

export interface Post {
  slug: string
  authorId: string
  coverImage?: string
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published'
  tags: string[]
  fallbackLocale?: 'en' | 'el'
  content: {
    en?: PostContent
    el?: PostContent
  }
}

export interface Author {
  id: string
  email: string
  passwordHash: string
  name: string
  bio: string
  avatarUrl?: string
  createdAt: string
}

export type PublicAuthor = Omit<Author, 'passwordHash'>

export interface SessionPayload {
  authorId: string
  email: string
  name: string
}
