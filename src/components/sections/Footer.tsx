'use client'

import { useTranslations, useLocale } from 'next-intl'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
]

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const quickLinks = [
    { label: t('links.about'), href: '#about' },
    { label: t('links.approach'), href: '#approach' },
    { label: t('links.locations'), href: '#locations' },
    { label: t('links.whyUs'), href: '#why-us' },
    { label: t('links.contact'), href: '#contact' },
  ]

  return (
    <footer role="contentinfo" className="bg-[#1C1A17] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="block text-sm font-bold tracking-[0.18em] uppercase text-white">Eunoia</span>
              <span className="block text-[10px] tracking-[0.25em] text-[#A09B8C] uppercase font-medium">Centers</span>
            </div>
            <p className="text-sm text-[#7A7468] leading-relaxed max-w-xs">{t('tagline')}</p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#7A7468] hover:bg-white/10 hover:text-white transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-[#A09B8C] font-medium mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[#7A7468] hover:text-white transition-colors duration-150">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.18em] uppercase text-[#A09B8C] font-medium mb-5">{t('getInTouch')}</h3>
            <address className="not-italic space-y-3 text-sm text-[#7A7468]">
              <p>Evia, Greece</p>
              <p><a href="tel:+302221000000" className="hover:text-white transition-colors">+30 22210 000 00</a></p>
              <p><a href="mailto:hello@eunoiacenters.gr" className="hover:text-white transition-colors">hello@eunoiacenters.gr</a></p>
              <p className="pt-1 text-xs text-[#4A4540]">{t('hours')}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A4540]">
          <p>© {new Date().getFullYear()} {t('copyright')}</p>
          <div className="flex gap-5">
            <a href={`/${locale}/privacy`} className="hover:text-[#7A7468] transition-colors">{t('privacy')}</a>
            <a href={`/${locale}/terms`} className="hover:text-[#7A7468] transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
