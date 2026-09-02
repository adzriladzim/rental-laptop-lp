import type { Metadata } from 'next'
import { PricingView } from '@/components/views/PricingView'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'
import { buildWaLink, BUSINESS_WA } from '@/lib/whatsapp'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Harga & Paket — Sewa Laptop Jakarta',
  description:
    'Pricelist sewa laptop: harian 175rb, 3 hari+ 160rb/hari, mingguan 875rb, bulanan 2,4jt. Harga sama untuk semua unit.',
}

export default async function HargaPage() {
  let laptopCount = 9
  try {
    const laptops = await getLaptops()
    if (laptops.length > 0) laptopCount = laptops.length
  } catch {
    laptopCount = FALLBACK_LAPTOPS.length
  }

  const waHref = buildWaLink(
    BUSINESS_WA,
    'Halo! Saya mau sewa laptop. Bisa info ketersediaan unit?',
  )

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Harga', item: `${baseUrl}/harga` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PricingView laptopCount={laptopCount} waHref={waHref} />
    </>
  )
}
