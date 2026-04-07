import Image from 'next/image'

type ArticleCoverProps = {
  src?: string
  alt: string
  category?: string
  sizes?: string
  priority?: boolean
  className?: string
}

export function ArticleCover({
  src,
  alt,
  category,
  sizes = '100vw',
  priority = false,
  className = '',
}: ArticleCoverProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary via-primary to-accent/80 select-none">
      {/* DS shield mark */}
      <Image
        src="/images/brand/favicon.png"
        alt=""
        width={48}
        height={48}
        className="opacity-20 w-10 h-10"
        aria-hidden
      />
      {category && (
        <span className="text-white/40 text-xs font-sans font-semibold uppercase tracking-widest px-3 text-center">
          {category}
        </span>
      )}
    </div>
  )
}
