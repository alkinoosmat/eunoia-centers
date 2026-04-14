import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { loginAction } from '@/actions/auth'
import LoginForm from '@/components/blog/LoginForm'

type Props = { params: Promise<{ locale: string }> }

export const metadata = { title: 'Author Login | Eunoia Centers' }

export default async function LoginPage({ params }: Props) {
  const { locale } = await params
  const session = await getSession()
  if (session) redirect(`/${locale}/blog/admin`)

  const boundAction = loginAction.bind(null, locale)

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="block text-sm font-bold tracking-[0.18em] text-[#1C1A17] uppercase mb-1">Eunoia</span>
          <span className="block text-xs tracking-[0.25em] text-[#A09B8C] uppercase">Centers · Author Portal</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E6E0] shadow-sm p-8">
          <h1 className="text-2xl font-light text-[#1C1A17] mb-6">Sign In</h1>
          <LoginForm action={boundAction} />
        </div>

        <p className="text-center mt-6 text-xs text-[#A09B8C]">
          <a href={`/${locale}/blog`} className="hover:text-[#6B8F6B] transition-colors">
            ← Back to Blog
          </a>
        </p>
      </div>
    </div>
  )
}
