import React from 'react'

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div' | 'article'
  'aria-label'?: string
  'aria-labelledby'?: string
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  as: Tag = 'section',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={`py-20 md:py-28 lg:py-32 px-4 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </Tag>
  )
}
