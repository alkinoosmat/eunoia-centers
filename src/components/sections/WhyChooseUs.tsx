'use client'

import { useReveal, useRevealStagger } from '@/hooks/useReveal'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#6B8F6B] shrink-0 mt-0.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function WhyChooseUs() {
  const t = useTranslations('whyUs')
  const headerRef = useReveal(0.15) as React.RefObject<HTMLDivElement>
  const listRef = useRevealStagger(0.1) as React.RefObject<HTMLUListElement>

  const features = [
    { title: t('f1Title'), desc: t('f1Desc') },
    { title: t('f2Title'), desc: t('f2Desc') },
    { title: t('f3Title'), desc: t('f3Desc') },
    { title: t('f4Title'), desc: t('f4Desc') },
    { title: t('f5Title'), desc: t('f5Desc') },
    { title: t('f6Title'), desc: t('f6Desc') },
  ]

  return (
    <SectionWrapper id="why-us" aria-labelledby="why-heading">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div ref={headerRef} className="reveal">
          <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-4">
            {t('eyebrow')}
          </span>
          <h2 id="why-heading" className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight mb-5">
            {t('heading')}
          </h2>
          <p className="text-[#A09B8C] leading-relaxed">{t('subheading')}</p>
        </div>
      </div>

      <ul ref={listRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
        {features.map((f) => (
          <li key={f.title} className="flex gap-4 p-6 rounded-2xl bg-[#F5F4F0] border border-[#E8E6E0] hover:bg-[#F0F4F0] hover:border-[#C4D4C4] transition-all duration-200">
            <CheckIcon />
            <div>
              <h3 className="text-[#1C1A17] font-semibold mb-1.5 text-sm">{f.title}</h3>
              <p className="text-[#A09B8C] text-sm leading-relaxed">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
