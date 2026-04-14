'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  consent: boolean
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialForm: FormData = { name: '', email: '', phone: '', service: '', message: '', consent: false }

export default function Contact() {
  const t = useTranslations('contact')
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const services = t.raw('services') as string[]

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = t('validationName')
    if (!form.email.trim()) e.email = t('validationEmail')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('validationEmailFormat')
    if (!form.message.trim()) e.message = t('validationMessage')
    if (!form.consent) e.consent = t('validationConsent')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border bg-white text-[#1C1A17] text-sm placeholder:text-[#A09B8C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6B8F6B] focus:border-transparent ${errors[field] ? 'border-red-300 bg-red-50' : 'border-[#E8E6E0] hover:border-[#D0CEC7]'}`

  return (
    <SectionWrapper id="contact" className="bg-[#F5F4F0]" aria-labelledby="contact-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-4">{t('eyebrow')}</span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight mb-5">{t('heading')}</h2>
          <p className="text-[#7A7468] leading-relaxed mb-10">{t('subheading')}</p>

          <div className="space-y-5">
            {[
              { label: t('phoneLabel'), value: '+30 22210 000 00', href: 'tel:+302221000000', iconPath: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' },
              { label: t('emailLabel'), value: 'hello@eunoiacenters.gr', href: 'mailto:hello@eunoiacenters.gr', iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6' },
            ].map(({ label, value, href, iconPath }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E0EBE0] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-[#6B8F6B]" aria-hidden="true"><path d={iconPath} /></svg>
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase text-[#A09B8C] mb-0.5">{label}</p>
                  <a href={href} className="text-[#4A4540] hover:text-[#6B8F6B] transition-colors text-sm">{value}</a>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E0EBE0] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-[#6B8F6B]" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-wide uppercase text-[#A09B8C] mb-0.5">{t('hoursLabel')}</p>
                <p className="text-[#4A4540] text-sm">{t('hours')}<br />{t('hoursSat')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="bg-white rounded-2xl p-8 border border-[#E8E6E0] shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#E0EBE0] flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-[#6B8F6B]" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">{t('successTitle')}</h3>
              <p className="text-[#7A7468] mb-6">{t('successDesc')}</p>
              <button onClick={() => setStatus('idle')} className="text-sm text-[#6B8F6B] hover:underline">{t('successReset')}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide">
                    {t('formName')} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input id="name" name="name" type="text" required aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} value={form.name} onChange={handleChange} placeholder={t('formName')} className={inputClass('name')} />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide">
                      {t('formEmail')} <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input id="email" name="email" type="email" required aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} value={form.email} onChange={handleChange} placeholder="email@example.com" className={inputClass('email')} />
                    {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide">
                      {t('formPhone')} <span className="text-[#A09B8C] font-normal">{t('formPhoneOptional')}</span>
                    </label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+30 69..." className={inputClass('phone')} />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide">{t('formService')}</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} className={`${inputClass('service')} appearance-none cursor-pointer`}>
                    <option value="">{t('formServicePlaceholder')}</option>
                    {services.map((s: string) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-[#4A4540] mb-1.5 tracking-wide">
                    {t('formMessage')} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" required aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} rows={4} value={form.message} onChange={handleChange} placeholder={t('formMessagePlaceholder')} className={`${inputClass('message')} resize-none`} />
                  {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="consent" id="consent" required aria-required="true" aria-invalid={!!errors.consent} checked={form.consent} onChange={handleChange} className="mt-0.5 w-4 h-4 rounded border-[#E8E6E0] text-[#6B8F6B] focus:ring-[#6B8F6B] cursor-pointer shrink-0" />
                    <span className="text-xs text-[#A09B8C] leading-relaxed">
                      {t('formConsent')}{' '}
                      <a href="/privacy" className="text-[#6B8F6B] hover:underline">{t('formConsentLink')}</a>{' '}
                      {t('formConsentSuffix')} <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 text-xs text-red-500 ml-7">{errors.consent}</p>}
                </div>

                {status === 'error' && (
                  <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
                    {t('errorMsg')}
                  </div>
                )}

                <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <><svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{t('formSubmitting')}</>
                  ) : t('formSubmit')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
