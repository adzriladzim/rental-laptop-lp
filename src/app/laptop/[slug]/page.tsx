import type { Metadata } from 'next'
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
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sewaintop.ai.id'
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

  // Fetch related laptops — same category, exclude current
  let allLaptops: typeof FALLBACK_LAPTOPS = []
  try {
    allLaptops = await getLaptops()
  } catch {
    allLaptops = FALLBACK_LAPTOPS
  }
  const relatedLaptops = allLaptops
    .filter((l) => l.category === laptop.category && l.slug !== laptop.slug)
    .slice(0, 3)

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sewaintop.ai.id'
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
    <main className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LaptopDetail laptop={laptop} relatedLaptops={relatedLaptops} />
    </main>
  )
}
