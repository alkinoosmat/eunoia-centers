'use client'

import { useActionState } from 'react'
import type { AuthState } from '@/actions/auth'
import Button from '@/components/ui/Button'

interface LoginFormProps {
  action: (prevState: AuthState, formData: FormData) => Promise<AuthState>
}

const initialState: AuthState = {}

export default function LoginForm({ action }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.error && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-white text-[#1C1A17] text-sm placeholder:text-[#A09B8C] focus:outline-none focus:ring-2 focus:ring-[#6B8F6B] focus:border-transparent transition-colors"
          placeholder="author@eunoiacenters.gr"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide uppercase">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-xl border border-[#E8E6E0] bg-white text-[#1C1A17] text-sm placeholder:text-[#A09B8C] focus:outline-none focus:ring-2 focus:ring-[#6B8F6B] focus:border-transparent transition-colors"
          placeholder="••••••••"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full justify-center"
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? (
          <>
            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in…
          </>
        ) : 'Sign In'}
      </Button>
    </form>
  )
}
