'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

// Mirrors the flag in i18n/routing.ts — read at build time
const enableEn = process.env.NEXT_PUBLIC_ENABLE_EN === 'true'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  // Hidden when only one locale is active
  if (!enableEn) return null

  const switchLocale = (next: string) => {
    if (next === locale) return
    const newPath = pathname.replace(`/${locale}`, `/${next}`) || `/${next}`
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <div className="flex items-center gap-1 border border-[#E8E6E0] rounded-lg p-0.5 bg-white/50">
      {(['en', 'el'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          disabled={isPending}
          aria-label={lang === 'en' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
          aria-pressed={locale === lang}
          className={`px-2.5 py-1 rounded-md text-xs font-medium tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F6B] ${
            locale === lang
              ? 'bg-[#6B8F6B] text-white shadow-sm'
              : 'text-[#A09B8C] hover:text-[#4A4540]'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
