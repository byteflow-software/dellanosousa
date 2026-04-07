import { cn } from '@/lib/utils'

type SectionTitleProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  light?: boolean
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
}: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={cn('mb-12', alignClasses[align], className)}>
      <h2
        className={cn(
          'font-serif text-2xl md:text-4xl font-semibold leading-tight mb-4',
          light ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base md:text-lg max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-white/70' : 'text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
