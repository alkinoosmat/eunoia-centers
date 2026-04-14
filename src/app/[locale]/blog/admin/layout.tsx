import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { logoutAction } from '@/actions/auth'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params
  const session = await getSession()
  if (!session) redirect(`/${locale}/blog/login`)

  const boundLogout = logoutAction.bind(null, locale)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Admin topbar */}
      <div className="bg-white border-b border-[#E8E6E0] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={`/${locale}/blog/admin`} className="text-sm font-bold tracking-[0.15em] text-[#1C1A17] uppercase hover:text-[#6B8F6B] transition-colors">
              Eunoia Admin
            </a>
            <span className="text-[#E8E6E0]">/</span>
            <a href={`/${locale}/blog`} className="text-sm text-[#A09B8C] hover:text-[#6B8F6B] transition-colors">
              View Blog
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#A09B8C] hidden sm:block">{session.name}</span>
            <form action={boundLogout}>
              <button
                type="submit"
                className="text-xs px-3 py-1.5 rounded-lg border border-[#E8E6E0] text-[#7A7468] hover:bg-[#F5F4F0] hover:text-[#1C1A17] transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  )
}
