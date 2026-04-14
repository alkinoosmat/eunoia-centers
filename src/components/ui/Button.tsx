import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#6B8F6B] text-white hover:bg-[#5A7A5A] active:bg-[#4A6A4A] shadow-sm hover:shadow-md',
  secondary:
    'border border-[#E8E6E0] bg-white text-[#4A4540] hover:bg-[#F5F4F0] hover:border-[#D0CEC7]',
  ghost:
    'text-[#6B8F6B] hover:text-[#5A7A5A] underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8F6B] focus-visible:ring-offset-2 cursor-pointer select-none'

  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
