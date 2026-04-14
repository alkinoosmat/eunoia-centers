'use client'

import { useReveal } from '@/hooks/useReveal'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function About() {
  const t = useTranslations('about')
  const leftRef = useReveal(0.15) as React.RefObject<HTMLDivElement>
  const rightRef = useReveal(0.15) as React.RefObject<HTMLDivElement>

  return (
    <SectionWrapper id="about" className="bg-[#F5F4F0]" aria-labelledby="about-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — Pull quote */}
        <div ref={leftRef} className="reveal">
          <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-6">
            {t('eyebrow')}
          </span>
          <div className="relative">
            <span className="absolute -top-6 -left-4 text-[8rem] leading-none text-[#C4D4C4] font-serif select-none" aria-hidden="true">
              &#8220;
            </span>
            <blockquote className="relative z-10">
              <p className="text-2xl md:text-3xl font-light text-[#1C1A17] leading-snug mb-6" style={{ lineHeight: 1.35 }}>
                {t('quote')}
              </p>
              <footer className="text-sm text-[#A09B8C] tracking-wide">
                — {t('quoteAuthor')}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right — Description */}
        <div ref={rightRef} className="reveal space-y-6" style={{ animationDelay: '150ms' }}>
          <h2 id="about-heading" className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-[#7A7468] leading-relaxed">{t('p1')}</p>
          <p className="text-[#7A7468] leading-relaxed">{t('p2')}</p>
          <p className="text-[#7A7468] leading-relaxed">{t('p3')}</p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E6E0]">
            {[
              { value: t('stat1Value'), label: t('stat1Label') },
              { value: t('stat2Value'), label: t('stat2Label') },
              { value: t('stat3Value'), label: t('stat3Label') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-light text-[#6B8F6B] mb-1">{stat.value}</div>
                <div className="text-xs text-[#A09B8C] tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
