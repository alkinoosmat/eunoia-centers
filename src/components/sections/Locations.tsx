'use client'

import { useRevealStagger } from '@/hooks/useReveal'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function Locations() {
  const t = useTranslations('locations')
  const gridRef = useRevealStagger(0.1) as React.RefObject<HTMLDivElement>

  const locations = [
    {
      name: t('loc1Name'),
      address: t('loc1Address'),
      city: t('loc1City'),
      phone: t('loc1Phone'),
      email: t('loc1Email'),
      hours: t('loc1Hours'),
      description: t('loc1Desc'),
      mapBg: 'from-[#E8E6E0] to-[#D0CEC7]',
      accent: '#6B8F6B',
    },
    {
      name: t('loc2Name'),
      address: t('loc2Address'),
      city: t('loc2City'),
      phone: t('loc2Phone'),
      email: t('loc2Email'),
      hours: t('loc2Hours'),
      description: t('loc2Desc'),
      mapBg: 'from-[#E0EBE0] to-[#C4D4C4]',
      accent: '#5A7A5A',
    },
  ]

  return (
    <SectionWrapper id="locations" className="bg-[#F5F4F0]" aria-labelledby="locations-heading">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-4">
          {t('eyebrow')}
        </span>
        <h2 id="locations-heading" className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight mb-5">
          {t('heading')}
        </h2>
        <p className="text-[#A09B8C] leading-relaxed">{t('subheading')}</p>
      </div>

      <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((loc) => (
          <article key={loc.name} className="bg-white rounded-2xl overflow-hidden border border-[#E8E6E0] hover:shadow-lg transition-shadow duration-300" aria-label={loc.name}>
            {/* Map placeholder */}
            <div className={`aspect-video bg-gradient-to-br ${loc.mapBg} flex items-center justify-center relative overflow-hidden`} aria-hidden="true">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#A09B8C]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#A09B8C]" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-[#A09B8C]" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-[#A09B8C]" />
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#A09B8C]" />
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#A09B8C]" />
              </div>
              <div className="relative flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md" style={{ background: loc.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-px h-6 mt-1" style={{ background: loc.accent, opacity: 0.5 }} />
              </div>
            </div>

            <div className="p-7">
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-1">{loc.name}</h3>
              <p className="text-sm text-[#A09B8C] mb-4">{loc.description}</p>
              <address className="not-italic space-y-2 text-sm">
                {[
                  { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z', content: `${loc.address}, ${loc.city}`, href: undefined },
                  { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z', content: loc.phone, href: `tel:${loc.phone}` },
                  { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6', content: loc.email, href: `mailto:${loc.email}` },
                  { icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2', content: loc.hours, href: undefined },
                ].map(({ icon, content, href }) => (
                  <div key={content} className="flex items-start gap-2.5 text-[#7A7468]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 mt-0.5 shrink-0 text-[#6B8F6B]" aria-hidden="true">
                      <path d={icon} />
                    </svg>
                    {href ? (
                      <a href={href} className="hover:text-[#6B8F6B] transition-colors">{content}</a>
                    ) : (
                      <span>{content}</span>
                    )}
                  </div>
                ))}
              </address>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
