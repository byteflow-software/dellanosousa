import { cn } from '@/lib/utils'

type SeparatorProps = {
  className?: string
  light?: boolean
}

export function Separator({ className, light = false }: SeparatorProps) {
  return (
    <hr
      className={cn(
        'border-0 h-px',
        light ? 'bg-white/10' : 'bg-primary/10',
        className
      )}
    />
  )
}
