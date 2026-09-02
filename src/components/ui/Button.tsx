import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'wa'
type Size = 'lg' | 'md' | 'sm'

const base =
  'inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover shadow-sm hover:shadow-glow',
  outline: 'border border-border bg-paper text-ink hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-ink-muted hover:bg-paper-subtle hover:text-ink',
  wa: 'bg-wa text-white hover:opacity-90',
}

const sizes: Record<Size, string> = {
  lg: 'min-h-[48px] px-8 text-base',
  md: 'min-h-[44px] px-6 text-sm',
  sm: 'min-h-[40px] px-5 text-sm',
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'lg',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
