import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'gold' | 'accent' | 'light'

type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary/10 text-primary',
  gold: 'bg-gold/20 text-primary border border-gold/40',
  accent: 'bg-accent/10 text-accent',
  light: 'bg-white/15 text-white border border-white/30',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-sans',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
