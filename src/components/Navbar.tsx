'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // On the homepage anchors work directly; anywhere else prefix with the home path
  const home = `/${locale}`
  const isHome = pathname === home || pathname === `${home}/`
  const anchor = (id: string) => isHome ? `#${id}` : `${home}#${id}`

  const navLinks = [
    { label: t('about'), href: anchor('about') },
    { label: t('approach'), href: anchor('approach') },
    { label: t('locations'), href: anchor('locations') },
    { label: t('whyUs'), href: anchor('why-us') },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('contact'), href: anchor('contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E8E6E0] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F6B] rounded"
          aria-label="Eunoia Centers — Home"
        >
          <span className="text-sm font-bold tracking-[0.18em] text-[#1C1A17] uppercase">
            Eunoia
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#A09B8C] uppercase font-medium">
            Centers
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#7A7468] hover:text-[#1C1A17] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={anchor('contact')}
            className="inline-flex items-center px-5 py-2.5 bg-[#6B8F6B] text-white text-sm font-medium rounded-xl hover:bg-[#5A7A5A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F6B] focus-visible:ring-offset-2"
          >
            {t('bookSession')}
          </a>
        </div>

        {/* Mobile: lang switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F6B] rounded"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-0.5 bg-[#4A4540] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#4A4540] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#4A4540] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t border-[#E8E6E0] overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-4 gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 px-2 text-[#4A4540] hover:text-[#6B8F6B] hover:bg-[#F5F4F0] rounded-lg transition-colors duration-150 text-sm tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={anchor('contact')}
              onClick={handleLinkClick}
              className="block py-3 px-4 bg-[#6B8F6B] text-white text-sm font-medium rounded-xl text-center hover:bg-[#5A7A5A] transition-colors duration-200"
            >
              {t('bookSession')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
