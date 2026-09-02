'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useI18n } from '@/components/I18nProvider'

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useI18n()

  const NAV_LINKS = [
    { href: '/laptop', label: t.nav.catalog },
    { href: '/rekomendasi', label: t.nav.recommendation },
    { href: '/harga', label: t.nav.price },
    { href: '/testimoni', label: t.nav.testimonial },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo mark + wordmark */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/sewaintop1.png"
            alt="Sewaintop"
            width={32}
            height={32}
            priority
            unoptimized
            className="h-8 w-8"
          />
          <span className="font-sans text-xl font-bold tracking-tight text-ink">
            Sewain<span className="text-ink">top</span>
          </span>
        </Link>

        {/* Desktop nav — 4 items max */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-ink ${
                isActive(l.href)
                  ? 'text-ink border-b-2 border-accent pb-0.5'
                  : 'text-ink-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button href="/pesan" size="sm" className="hidden lg:inline-flex">
            {t.nav.book}
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-paper-subtle lg:hidden"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-in drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-border bg-paper px-4 py-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`min-h-[44px] flex items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? 'text-ink bg-accent/10 border-l-2 border-accent'
                  : 'text-ink-muted hover:bg-paper-subtle'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button href="/pesan" size="md" className="mt-2">
            {t.nav.book}
          </Button>
        </nav>
      </div>
    </header>
  )
}
