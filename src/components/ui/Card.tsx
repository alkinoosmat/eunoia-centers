import React from 'react'

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export default function Card({ icon, title, description, className = '' }: CardProps) {
  return (
    <article
      aria-label={title}
      className={`bg-white rounded-2xl p-8 border border-[#E8E6E0] hover:border-[#C4D4C4] hover:bg-[#F0F4F0] hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#F0F4F0] flex items-center justify-center mb-5 text-[#6B8F6B] group-hover:bg-[#E0EBE0] transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-3">{title}</h3>
      <p className="text-[#7A7468] leading-relaxed text-sm">{description}</p>
    </article>
  )
}
