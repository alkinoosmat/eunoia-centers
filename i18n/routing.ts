import { defineRouting } from 'next-intl/routing'

// Set NEXT_PUBLIC_ENABLE_EN=true in .env.local to re-enable English
const enableEn = process.env.NEXT_PUBLIC_ENABLE_EN === 'true'

export const routing = defineRouting({
  locales: enableEn ? ['en', 'el'] : ['el'],
  defaultLocale: 'el',
  localePrefix: 'always',
})
