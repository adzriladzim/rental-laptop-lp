import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LAPTOPS, getLaptopBySlug } from '@/lib/laptops'
import { LaptopDetail } from '@/components/LaptopDetail'

export function generateStaticParams() {
  return LAPTOPS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const laptop = getLaptopBySlug(slug)
  if (!laptop) return { title: 'Laptop tidak ditemukan' }
  return {
    title: `${laptop.name} — Sewa Jakarta`,
    description: laptop.description,
  }
}

export default async function LaptopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const laptop = getLaptopBySlug(slug)
  if (!laptop) notFound()

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
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
