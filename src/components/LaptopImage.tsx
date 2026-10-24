import Image from 'next/image'
import { useState } from 'react'
import type { Laptop } from '@/lib/api'
import { laptopImage } from '@/lib/laptops'

// Product image with a rendered fallback.
// Not every slug in the API has a matching file in /public/laptops, so a
// failed load must degrade into a placeholder instead of an empty box.
export function LaptopImage({
  laptop,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = 'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]',
}: {
  laptop: Laptop
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const [errored, setErrored] = useState(false)
  const src = laptop.photoUrl ?? laptopImage(laptop.slug)

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-navy-950/[0.03]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          className="h-16 w-16 text-navy-950/10"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path strokeLinecap="round" d="M2 20h20" />
        </svg>
        <span className="px-3 text-center text-xs font-medium text-ink-faint">{laptop.brand}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={laptop.name}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}
