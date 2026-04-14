import 'server-only'
import { sql } from './db'
import bcrypt from 'bcryptjs'
import type { Author, PublicAuthor } from '@/types/blog'

interface AuthorRow {
  id: string
  email: string
  password_hash: string
  name: string
  bio: string
  avatar_url: string | null
  created_at: string
}

function rowToAuthor(row: AuthorRow): Author {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    bio: row.bio,
    avatarUrl: row.avatar_url ?? undefined,
    createdAt: new Date(row.created_at).toISOString(),
  }
}

function toPublic({ passwordHash: _, ...rest }: Author): PublicAuthor {
  return rest
}

export async function getAllAuthors(): Promise<PublicAuthor[]> {
  const rows = await sql<AuthorRow[]>`SELECT * FROM authors ORDER BY created_at`
  return rows.map(rowToAuthor).map(toPublic)
}

export async function getAuthor(id: string): Promise<PublicAuthor | null> {
  const rows = await sql<AuthorRow[]>`SELECT * FROM authors WHERE id = ${id} LIMIT 1`
  return rows.length ? toPublic(rowToAuthor(rows[0])) : null
}

export async function getAuthorByEmail(email: string): Promise<Author | null> {
  const rows = await sql<AuthorRow[]>`SELECT * FROM authors WHERE email = ${email} LIMIT 1`
  return rows.length ? rowToAuthor(rows[0]) : null
}

export async function validatePassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}
