import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  LAPTOP_CATEGORIES,
  USE_CASES,
  formatIDR,
  laptopImage,
  type LaptopCategory,
} from '@/lib/laptops'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Button } from '@/components/ui/Button'

export const revalidate = 300
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

  let laptops
  try {
    laptops = await getLaptops()
  } catch {
    laptops = FALLBACK_LAPTOPS
  }
  const catLaptops = laptops.filter((l) => l.category === cat)

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Kategori', item: `${baseUrl}/kategori/${category}` },
      { '@type': 'ListItem', position: 3, name: cat, item: `${baseUrl}/kategori/${category}` },
    ],
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero — asymmetric, left-biased */}
      <header className="mb-12 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-body text-sm uppercase tracking-widest text-ink">Kategori</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink leading-tight">
            Laptop <em className="text-ink italic">{cat}</em>
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-ink-muted">
            {CATEGORY_INFO[cat].description}
          </p>
        </div>
        <div className="md:col-span-5 md:flex md:items-end md:justify-end">
          <p className="font-body text-base text-ink-muted">
            {catLaptops.length > 0
              ? `${catLaptops.length} unit tersedia`
              : 'Unit segera hadir — hubungi kami untuk request.'}
          </p>
        </div>
      </header>

      {/* Filtered laptop cards */}
      {catLaptops.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catLaptops.map((laptop) => (
            <Link
              key={laptop.id}
              href={`/laptop/${laptop.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-paper shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={laptopImage(laptop.slug)}
                  alt={laptop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-body text-xs uppercase tracking-wider text-ink">
                    {laptop.brand}
                  </span>
                  <span className="font-body text-xs text-ink-muted">{laptop.category}</span>
                </div>
                <h2 className="mb-1 font-display text-xl text-ink">{laptop.name}</h2>
                <p className="mb-4 line-clamp-2 font-body text-sm text-ink-muted">
                  {laptop.description}
                </p>

                {/* Use-case tags */}
                {laptop.useCases && laptop.useCases.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {laptop.useCases.slice(0, 3).map((ucId) => {
                      const uc = USE_CASES.find((u) => u.id === ucId)
                      if (!uc) return null
                      return (
                        <span
                          key={ucId}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-paper-subtle px-2 py-0.5 font-body text-xs text-ink-muted"
                        >
                          {uc.icon} {uc.label}
                        </span>
                      )
                    })}
                  </div>
                )}

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
                    <p className="font-display text-lg text-ink">
                      {formatIDR(laptop.dailyRate)}
                      <span className="text-sm text-ink-muted">/hari</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-display text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                    Lihat Detail <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-paper-subtle p-10 text-center">
          <p className="font-display text-xl text-ink">Unit kategori {cat} belum tersedia</p>
          <p className="mt-2 font-body text-ink-muted">
            Hubungi kami untuk request laptop sesuai kebutuhan Anda.
          </p>
          <WhatsAppButton
            phone="6281296352115"
            message="Halo! Saya butuh laptop untuk sewa. Apakah tersedia?"
            className="mt-5 inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            Chat WhatsApp
          </WhatsAppButton>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl bg-paper-subtle p-8 sm:p-12 sm:flex-row sm:items-center">
        <h2 className="font-display text-2xl sm:text-3xl text-ink">Lihat semua laptop kami</h2>
        <Button href="/laptop">Lihat Semua Laptop</Button>
      </section>
    </main>
  )
}
