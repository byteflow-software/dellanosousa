import { cn } from '@/lib/utils'

type CardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className, hover = true, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'bg-white border border-primary/10 rounded-lg shadow-sm',
        paddingClasses[padding],
        hover && 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-gold/40',
        className
      )}
    >
      {children}
    </div>
  )
}
