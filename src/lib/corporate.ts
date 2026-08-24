export type CorporateTier = {
  id: string
  label: string
  minUnit: number
  discountPct: number
  description: string
}

// Bulk discount tiers for corporate / B2B rentals.
export const CORPORATE_TIERS: CorporateTier[] = [
  {
    id: 'tier-5-10',
    label: '5–10 Unit',
    minUnit: 5,
    discountPct: 10,
    description:
      'Diskon 10% untuk kebutuhan tim kecil hingga menengah. Cocok untuk sprint atau proyek temporer.',
  },
  {
    id: 'tier-11-25',
    label: '11–25 Unit',
    minUnit: 11,
    discountPct: 15,
    description:
      'Diskon 15% untuk deployment tim lebih besar, kelas pelatihan, atau workshop berkelanjutan.',
  },
  {
    id: 'tier-25-plus',
    label: '25+ Unit',
    minUnit: 25,
    discountPct: 20,
    description:
      'Diskon 20% untuk event berskala besar, relokasi kantor, dan kontrak jangka panjang.',
  },
]
