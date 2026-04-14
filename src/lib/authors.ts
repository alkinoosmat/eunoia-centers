import 'server-only'
import { readFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import type { Author, PublicAuthor } from '@/types/blog'

const AUTHORS_FILE = path.join(process.cwd(), 'data', 'authors.json')

async function readAuthors(): Promise<Author[]> {
  const raw = await readFile(AUTHORS_FILE, 'utf-8')
  return JSON.parse(raw) as Author[]
}

export async function getAllAuthors(): Promise<PublicAuthor[]> {
  const authors = await readAuthors()
  return authors.map(({ passwordHash: _, ...rest }) => rest)
}

export async function getAuthor(id: string): Promise<PublicAuthor | null> {
  const authors = await readAuthors()
  const found = authors.find((a) => a.id === id)
  if (!found) return null
  const { passwordHash: _, ...rest } = found
  return rest
}

export async function getAuthorByEmail(email: string): Promise<Author | null> {
  const authors = await readAuthors()
  return authors.find((a) => a.email === email) ?? null
}

export async function validatePassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}
