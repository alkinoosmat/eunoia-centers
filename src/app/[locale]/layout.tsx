import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../../i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL('https://eunoiacenters.gr'),
    title: t('title'),
    description: t('description'),
    keywords: [
      'logotherapy',
      'λογοθεραπεία',
      'counseling',
      'Evia',
      'Εύβοια',
      'Greece',
      'mental health',
      'psychotherapy',
      'personal development',
      'Viktor Frankl',
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      url: `https://eunoiacenters.gr/${locale}`,
      siteName: 'Eunoia Centers',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Eunoia Centers' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://eunoiacenters.gr/${locale}`,
      ...(process.env.NEXT_PUBLIC_ENABLE_EN === 'true' && {
        languages: {
          en: 'https://eunoiacenters.gr/en',
          el: 'https://eunoiacenters.gr/el',
        },
      }),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-[#FAFAF8] font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#6B8F6B] focus:text-white focus:rounded-lg"
        >
          {locale === 'el' ? 'Μετάβαση στο κύριο περιεχόμενο' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
