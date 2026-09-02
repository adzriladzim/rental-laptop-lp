import type { Metadata } from 'next'
import { TentangView } from '@/components/views/TentangView'
import { getLaptops } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Tentang Kami — Sewa Laptop Jakarta',
  description:
    'Kenali Sewaintop: misi, area layanan, dan tim di balik layanan sewa laptop terjangkau di Jakarta dan sekitarnya.',
}

async function getStats() {
  try {
    const laptops = await getLaptops()
    const unitCount = laptops.length
    return [
      { value: '200+', labelKey: 'statCustomers' as const },
      { value: `${unitCount}`, labelKey: 'statUnits' as const },
      { value: '99%', labelKey: 'statSatisfaction' as const },
    ]
  } catch {
    return [
      { value: '200+', labelKey: 'statCustomers' as const },
      { value: '9', labelKey: 'statUnits' as const },
      { value: '99%', labelKey: 'statSatisfaction' as const },
    ]
  }
}

export default async function TentangPage() {
  const stats = await getStats()
  return <TentangView stats={stats} />
}
