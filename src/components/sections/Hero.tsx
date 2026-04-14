'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'

export default function Hero() {
  const t = useTranslations('hero')
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      { el: eyebrowRef.current, delay: 100 },
      { el: headingRef.current, delay: 280 },
      { el: subRef.current, delay: 460 },
      { el: ctaRef.current, delay: 640 },
      { el: scrollRef.current, delay: 900 },
    ]
    const timers = elements.map(({ el, delay }) =>
      setTimeout(() => el?.classList.add('visible'), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF8]"
      aria-label="Hero"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '55%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(107,143,107,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '50%', height: '55%', background: 'radial-gradient(ellipse at center, rgba(196,212,196,0.09) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(107,143,107,0.12)' }} />
        <div style={{ position: 'absolute', top: '25%', right: '12%', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(107,143,107,0.08)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
        <span ref={eyebrowRef} className="reveal-fade inline-block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-6">
          {t('eyebrow')}
        </span>

        <h1
          ref={headingRef}
          className="reveal font-light text-[#1C1A17] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.1 }}
        >
          {t('heading1')}
          <br />
          <span className="text-[#6B8F6B]">{t('heading2')}</span>
        </h1>

        <p ref={subRef} className="reveal text-lg md:text-xl text-[#A09B8C] max-w-xl mx-auto leading-relaxed mb-10">
          {t('subheading')}
        </p>

        <div ref={ctaRef} className="reveal flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" href="#contact">{t('ctaPrimary')}</Button>
          <Button variant="secondary" size="lg" href="#about">{t('ctaSecondary')}</Button>
        </div>
      </div>

      <div ref={scrollRef} className="reveal-fade absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs tracking-[0.15em] uppercase text-[#A09B8C]">{t('scroll')}</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#A09B8C] to-transparent" />
      </div>
    </section>
  )
}
