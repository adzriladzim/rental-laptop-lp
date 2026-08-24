import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LAPTOPS, LAPTOP_CATEGORIES, formatIDR, type LaptopCategory } from '@/lib/laptops'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const dynamicParams = false

const CATEGORY_INFO: Record<LaptopCategory, { slug: string; description: string }> = {
  Developer: {
    slug: 'developer',
    description: 'Butuh laptop coding yang responsif? Processor cepat, RAM cukup untuk Docker/IDE.',
  },
  Designer: {
    slug: 'designer',
    description: 'Laptop untuk editing video/foto, desain grafis. Layar tajam, performa stabil.',
  },
  Student: {
    slug: 'student',
    description: 'Laptop affordable untuk tugas kuliah, browsing, Zoom. Ringan & baterai awet.',
  },
  Business: {
    slug: 'business',
    description: 'Laptop profesional untuk meeting, presentasi, dokumen. Slim & elegan.',
  },
  Gaming: {
    slug: 'gaming',
    description: 'Laptop gaming untuk performa berat. GPU dedicated, RAM besar.',
  },
}

const SLUG_TO_CATEGORY: Record<string, LaptopCategory> = Object.fromEntries(
  (Object.keys(CATEGORY_INFO) as LaptopCategory[]).map((c) => [CATEGORY_INFO[c].slug, c]),
)

export function generateStaticParams() {
  return LAPTOP_CATEGORIES.map((c) => ({ category: CATEGORY_INFO[c].slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = SLUG_TO_CATEGORY[category]
  if (!cat) return { title: 'Kategori tidak ditemukan' }
  return {
    title: `${cat} — Sewa Laptop Jakarta`,
    description: CATEGORY_INFO[cat].description,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = SLUG_TO_CATEGORY[category]
  if (!cat) notFound()

  const laptops = LAPTOPS.filter((l) => l.category === cat)

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      {/* Hero — asymmetric, left-biased */}
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-accent">Kategori</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Laptop <em className="text-accent italic">{cat}</em>
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-ink-muted">
            {CATEGORY_INFO[cat].description}
          </p>
        </div>
        <div className="md:col-span-5 md:flex md:items-end md:justify-end">
          <p className="font-body text-base text-ink-muted">
            {laptops.length > 0
              ? `${laptops.length} unit tersedia`
              : 'Unit segera hadir — hubungi kami untuk request.'}
          </p>
        </div>
      </header>

      {/* Filtered laptop cards */}
      {laptops.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {laptops.map((laptop, i) => (
            <article
              key={laptop.id}
              className={`rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-accent/60 ${
                i % 3 === 0 ? 'lg:border-l-4 lg:border-l-accent' : ''
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-body text-xs uppercase tracking-wider text-accent">
                  {laptop.brand}
                </span>
                <span className="font-body text-xs text-ink-muted">{laptop.category}</span>
              </div>
              <h2 className="mb-1 font-display text-xl text-ink">{laptop.name}</h2>
              <p className="mb-4 line-clamp-2 font-body text-sm text-ink-muted">
                {laptop.description}
              </p>
              <dl className="mb-5 space-y-1 font-body text-sm text-ink-muted">
                <div className="flex justify-between gap-2">
                  <dt>Prosesor</dt>
                  <dd className="text-right text-ink">{laptop.specs.processor}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>RAM</dt>
                  <dd className="text-right text-ink">{laptop.specs.ram}</dd>
                </div>
              </dl>
              <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="font-body text-xs text-ink-muted">Mulai dari</p>
                  <p className="font-display text-lg text-accent">
                    {formatIDR(laptop.dailyRateIdr)}
                    <span className="text-sm text-ink-muted">/hari</span>
                  </p>
                </div>
                <Link
                  href={`/laptop/${laptop.slug}`}
                  className="inline-flex items-center gap-1 font-display text-sm font-semibold text-ink transition-colors hover:text-accent"
                >
                  Lihat Detail <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-paper-subtle p-10 text-center">
          <p className="font-display text-xl text-ink">Unit kategori {cat} belum tersedia</p>
          <p className="mt-2 font-body text-ink-muted">
            Hubungi kami untuk request laptop gaming atau kategori lain sesuai kebutuhan.
          </p>
          <WhatsAppButton
            phone="6288292123852"
            message="Halo! Saya butuh laptop gaming untuk sewa. Apakah tersedia?"
            className="mt-5 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl bg-paper-subtle p-8 sm:p-12 sm:flex-row sm:items-center">
        <h2 className="font-display text-2xl sm:text-3xl text-ink">Lihat semua laptop kami</h2>
        <Link
          href="/laptop"
          className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-fg font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          Lihat Semua Laptop
        </Link>
      </section>
    </main>
  )
}
