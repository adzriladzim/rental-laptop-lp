import type { Metadata } from 'next'
import { TestimoniView } from '@/components/views/TestimoniView'
import { TESTIMONIALS } from '@/lib/testimonials'
import { getLaptops, getReviews } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Testimoni — Sewa Laptop Jakarta',
  description:
    'Apa kata pelanggan kami? Baca testimoni sewa laptop asli dari pengguna di Jakarta, Depok, Tangerang, dan Bekasi.',
}

async function getStats() {
  try {
    const laptops = await getLaptops()
    const unitCount = laptops.length
    return [
      { value: '4.8/5', labelKey: 'statRating' as const },
      { value: '200+', labelKey: 'statServed' as const },
      { value: `${unitCount}`, labelKey: 'statUnits' as const },
    ]
  } catch {
    return [
      { value: '4.8/5', labelKey: 'statRating' as const },
      { value: '200+', labelKey: 'statServed' as const },
      { value: '9', labelKey: 'statUnits' as const },
    ]
  }
}

interface ReviewCard {
  id: string
  name: string
  rating: number
  text: string
  laptopRented: string
  date: string
}

async function getReviewsData(): Promise<ReviewCard[]> {
  try {
    const reviews = await getReviews()
    if (!reviews.length) return TESTIMONIALS
    return reviews.map((r, i) => ({
      id: r.id ?? `r${i}`,
      name: r.customerName,
      rating: r.rating,
      text: r.comment ?? '',
      laptopRented: r.laptopName,
      date: new Date(r.createdAt).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      }),
    }))
  } catch {
    return TESTIMONIALS
  }
}

export default async function TestimoniPage() {
  const [stats, reviews] = await Promise.all([getStats(), getReviewsData()])
  return <TestimoniView stats={stats} reviews={reviews} />
}
