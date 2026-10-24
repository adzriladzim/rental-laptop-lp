import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  LAPTOP_CATEGORIES,
  type LaptopCategory,
} from '@/lib/laptops'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { CategoryGrid } from '@/components/CategoryGrid'

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
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sewaintop.ai.id'

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Kategori', item: `${baseUrl}/kategori/${category}` },
      { '@type': 'ListItem', position: 3, name: cat, item: `${baseUrl}/kategori/${category}` },
    ],
  }

  const CATEGORY_EMOJI: Record<LaptopCategory, string> = {
    Developer: '⌨️',
    Designer: '🎨',
    Student: '📚',
    Business: '💼',
    Gaming: '🎮',
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink-muted" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-ink">Beranda</Link>
        <span aria-hidden>/</span>
        <span className="text-ink font-medium">{cat}</span>
      </nav>

      {/* Hero — asymmetric, left-biased */}
      <header className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Kategori</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
            Laptop <em className="text-ink italic">{cat}</em>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            {CATEGORY_INFO[cat].description}
          </p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="inline-flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-navy-950">{catLaptops.length}</span>
            <span className="text-sm text-ink-muted">unit tersedia</span>
          </div>
        </div>
      </header>

      <CategoryGrid
        laptops={catLaptops}
        category={cat}
        categorySlug={category}
        description={CATEGORY_INFO[cat].description}
      />
    </main>
  )
}
