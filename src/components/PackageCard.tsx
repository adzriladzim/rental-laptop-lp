import { Button } from '@/components/ui/Button'
import { formatIDR } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'
import type { Package } from '@/lib/api'

export function PackageCard({ pkg }: { pkg: Package }) {
  const waHref = buildWaLink(
    BUSINESS_WA,
    `Halo! Saya tertarik dengan paket "${pkg.name}". Bisa info ketersediaan?`,
  )

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-paper p-6 transition-all hover:shadow-card">
      <p className="font-body text-xs uppercase tracking-wider text-ink">Paket Bundling</p>
      <h3 className="mt-1 font-display text-xl text-ink">{pkg.name}</h3>
      {pkg.description && (
        <p className="mt-2 font-body text-sm text-ink-muted">{pkg.description}</p>
      )}

      <div className="mt-4 flex items-baseline gap-2">
        <p className="font-display text-3xl font-bold text-ink">{formatIDR(pkg.price)}</p>
        <p className="font-body text-sm text-ink-muted">/ {pkg.durationDays} hari</p>
      </div>

      <p className="mt-4 font-body text-xs text-ink-muted">
        Termasuk {pkg.laptopIds.length} unit laptop
      </p>

      <div className="mt-6 flex gap-3">
        <Button href="/pesan" size="sm" className="flex-1">
          Pesan Sekarang
        </Button>
        <Button href={waHref} variant="wa" size="sm">
          WhatsApp
        </Button>
      </div>
    </article>
  )
}
