'use server'

import { redirect } from 'next/navigation'
import { getAuthorByEmail, validatePassword } from '@/lib/authors'
import { createSession, deleteSession } from '@/lib/session'

export interface AuthState {
  error?: string
}

export async function loginAction(
  locale: string,
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { error: 'Please enter your email and password.' }
  }

  const author = await getAuthorByEmail(email)
  if (!author) {
    return { error: 'Invalid email or password.' }
  }

  const valid = await validatePassword(password, author.passwordHash)
  if (!valid) {
    return { error: 'Invalid email or password.' }
  }

  await createSession({ authorId: author.id, email: author.email, name: author.name })
  redirect(`/${locale}/blog/admin`)
}

export async function logoutAction(locale: string): Promise<void> {
  await deleteSession()
  redirect(`/${locale}/blog`)
}
