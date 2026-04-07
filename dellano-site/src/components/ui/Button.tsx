import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'gold'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-secondary border border-primary hover:border-secondary',
  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',
  gold: 'bg-gold text-primary border border-gold hover:bg-transparent hover:text-gold',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps | 'href'> & {
    href?: undefined
    external?: undefined
  }

type ButtonAsLink = CommonProps & {
  href: string
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-300 cursor-pointer whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (props.href !== undefined) {
    const { href, external } = props as ButtonAsLink
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  const { href: _h, external: _e, variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props as ButtonAsButton & { href: undefined; external: undefined }
  return (
    <button {...buttonProps} className={baseClasses}>
      {children}
    </button>
  )
}
