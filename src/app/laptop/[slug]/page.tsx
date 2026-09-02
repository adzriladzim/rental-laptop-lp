import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLaptops, getLaptopBySlug } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { LaptopDetail } from '@/components/LaptopDetail'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const list = await getLaptops()
    return list.map((l) => ({ slug: l.slug }))
  } catch {
    return FALLBACK_LAPTOPS.map((l) => ({ slug: l.slug }))
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let laptop
  try {
    laptop = await getLaptopBySlug(slug)
  } catch {
    laptop = FALLBACK_LAPTOPS.find((l) => l.slug === slug)
  }
  if (!laptop) return { title: 'Laptop tidak ditemukan' }
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'
  return {
    title: `${laptop.name} — Sewa Jakarta`,
    description: laptop.description,
    alternates: {
      canonical: `/laptop/${laptop.slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: `${baseUrl}/laptop/${laptop.slug}`,
      title: `${laptop.name} — Sewa di Sewaintop`,
      description: laptop.description,
      images: [
        {
          url: `/laptop/${laptop.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${laptop.name} — Sewa di Sewaintop`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${laptop.name} — Sewa di Sewaintop`,
      description: laptop.description,
      images: [`/laptop/${laptop.slug}/opengraph-image`],
    },
  }
}

export default async function LaptopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let laptop
  try {
    laptop = await getLaptopBySlug(slug)
  } catch {
    laptop = FALLBACK_LAPTOPS.find((l) => l.slug === slug)
  }
  if (!laptop) notFound()

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'
  const inStock = laptop.status === 'Available'

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: laptop.name,
    description: laptop.description,
    brand: { '@type': 'Brand', name: laptop.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: laptop.dailyRate,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: laptop.dailyRate,
        priceCurrency: 'IDR',
        unitText: 'DAY',
      },
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${baseUrl}/laptop/${laptop.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Katalog', item: `${baseUrl}/laptop` },
      { '@type': 'ListItem', position: 3, name: laptop.name, item: `${baseUrl}/laptop/${laptop.slug}` },
    ],
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link
        href="/laptop"
        className="mb-8 inline-flex items-center gap-1 font-body text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden>←</span> Kembali ke Katalog
      </Link>
      <LaptopDetail laptop={laptop} />
    </main>
  )
}
