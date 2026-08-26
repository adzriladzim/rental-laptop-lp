import type { MetadataRoute } from 'next'
import { getLaptops } from '@/lib/api'
import { FALLBACK_LAPTOPS } from '@/lib/laptops'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app'

const STATIC_ROUTES = [
  '',
  '/laptop',
  '/harga',
  '/kontak',
  '/testimoni',
  '/faq',
  '/panduan',
  '/rekomendasi',
  '/ketersediaan',
  '/status',
  '/korporat',
  '/tentang',
  '/legal/syarat-ketentuan',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[]
  try {
    const laptops = await getLaptops()
    slugs = laptops.map((l) => l.slug)
  } catch {
    slugs = FALLBACK_LAPTOPS.map((l) => l.slug)
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const laptopEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/laptop/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticEntries, ...laptopEntries]
}
