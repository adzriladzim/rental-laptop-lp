'use client'

import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useI18n } from '@/components/I18nProvider'
import { BUSINESS_WA } from '@/lib/whatsapp'

export function SiteFooter() {
  const { t } = useI18n()

  const SERVICE_LINKS = [
    { href: '/laptop', label: t.footer.catalog },
    { href: '/harga', label: t.footer.pricePackage },
    { href: '/rekomendasi', label: t.footer.recommendation },
    { href: '/status', label: t.footer.checkStatus },
  ]

  const INFO_LINKS = [
    { href: '/tentang', label: t.footer.about },
    { href: '/testimoni', label: t.footer.testimonial },
    { href: '/faq', label: t.footer.faq },
    { href: '/panduan', label: t.footer.guide },
    { href: '/korporat', label: t.footer.corporate },
    { href: '/kontak', label: t.footer.contactUs },
    { href: '/legal/syarat-ketentuan', label: t.footer.terms },
  ]

  return (
    <footer id="kontak" className="border-t border-paper/5 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <Image
                src="/sewaintop1.png"
                alt="Sewaintop"
                width={28}
                height={28}
                unoptimized
                className="h-7 w-7"
              />
              <span className="font-display text-lg font-bold tracking-tight text-paper">
                Sewain<span className="text-accent">top</span>
              </span>
            </Link>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-paper/50">
              {t.footer.tagline}
            </p>
            <WhatsAppButton
              phone={BUSINESS_WA}
              message="Halo! Saya tertarik dengan layanan sewa laptop. Bisa minta informasi lebih lanjut?"
              className="inline-flex items-center gap-2 text-sm font-medium text-wa transition-opacity hover:opacity-80"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
              </svg>
              {t.footer.whatsapp}
            </WhatsAppButton>
          </div>

          {/* Layanan column */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-paper/60">
              {t.footer.service}
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/50 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-paper/60">
              {t.footer.info}
            </h4>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/50 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-paper/60">
              {t.footer.contact}
            </h4>
            <div className="space-y-3 text-sm text-paper/50">
              <p className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0812 9635 2115
              </p>
              <p className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Jakarta · Depok · Tangerang · Bekasi
              </p>
              <p className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.footer.openHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-paper/10 pt-6 text-center text-xs text-paper/50">
          <p>&copy; {new Date().getFullYear()} Sewaintop. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
