import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/laptop', label: 'Katalog' },
  { href: '/harga', label: 'Harga' },
  { href: '/rekomendasi', label: 'Rekomendasi' },
  { href: '/ketersediaan', label: 'Ketersediaan' },
  { href: '/testimoni', label: 'Testimoni' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontak', label: 'Kontak' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 text-xl font-display font-bold text-ink">
            LaptopRental<span className="text-accent">.</span>
          </Link>
          <nav className="hidden lg:flex gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-ink-muted hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button href="/rekomendasi" size="sm">Sewa Sekarang</Button>
          </div>
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="lg:hidden flex gap-5 overflow-x-auto px-4 pb-3 text-sm text-ink-muted [scrollbar-width:none]">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-ink transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
