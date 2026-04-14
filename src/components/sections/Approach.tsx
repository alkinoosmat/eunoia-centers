'use client'

import { useRevealStagger } from '@/hooks/useReveal'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Card from '@/components/ui/Card'

const icons = [
  // Individual Therapy
  <svg key="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
  // Group Sessions
  <svg key="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="15" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6" /><path d="M22 20c0-3.3-3.1-6-7-6" /><path d="M9 14c1-.3 2-.5 3-.5s2 .2 3 .5" /></svg>,
  // Coaching
  <svg key="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><path d="M12 2L3.09 8.26l1.42 9.28L12 22l7.49-4.46 1.42-9.28z" /><circle cx="12" cy="12" r="3" /></svg>,
  // Stress
  <svg key="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true"><path d="M3.34 17a10 10 0 1 1 17.32 0" /><path d="M12 12V7" /><circle cx="12" cy="14" r="1" fill="currentColor" /></svg>,
]

export default function Approach() {
  const t = useTranslations('approach')
  const gridRef = useRevealStagger(0.1) as React.RefObject<HTMLDivElement>

  const cards = [
    { title: t('card1Title'), description: t('card1Desc') },
    { title: t('card2Title'), description: t('card2Desc') },
    { title: t('card3Title'), description: t('card3Desc') },
    { title: t('card4Title'), description: t('card4Desc') },
  ]

  return (
    <SectionWrapper id="approach" aria-labelledby="approach-heading">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-4">
          {t('eyebrow')}
        </span>
        <h2 id="approach-heading" className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight mb-5">
          {t('heading')}
        </h2>
        <p className="text-[#A09B8C] leading-relaxed">{t('subheading')}</p>
      </div>

      <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((item, i) => (
          <Card key={item.title} icon={icons[i]} title={item.title} description={item.description} />
        ))}
      </div>
    </SectionWrapper>
  )
}
