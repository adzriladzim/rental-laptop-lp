// Laptop data layer.
// Live data now comes from the backend via @/lib/api. This module keeps:
//  - the shared types (re-exported from @/lib/api)
//  - FALLBACK_LAPTOPS: used ONLY when the API is unreachable (build/resilience)
//  - pure helpers: formatIDR, laptopImage, recommendLaptop

import type { Laptop, LaptopCategory } from '@/lib/api'
export type { Laptop, LaptopCategory, LaptopSpecs } from '@/lib/api'

export const LAPTOP_CATEGORIES: LaptopCategory[] = [
  'Developer',
  'Designer',
  'Student',
  'Business',
  'Gaming',
]

// 9 hardcoded laptops in the live API shape (camelCase). Used as a resilience
// fallback when the backend is down at build/runtime.
export const FALLBACK_LAPTOPS: Laptop[] = [
  {
    id: '1',
    name: 'Lenovo ThinkPad X280',
    brand: 'Lenovo',
    model: 'ThinkPad X280',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8250U', ram: '8GB', storage: '256GB SSD', screen: '12.5" Full HD', battery: 'Tahan lama' },
    dailyRate: 75000,
    weeklyRate: 450000,
    monthlyRate: 1500000,
    status: 'Available',
    slug: 'lenovo-thinkpad-x280',
    description: 'Ringkas, cepat, dan siap kerja. Cocok untuk Office, kuliah, Zoom, browsing.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '2',
    name: 'Dell Vostro 5370',
    brand: 'Dell',
    model: 'Vostro 5370',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8250U', ram: '8GB', storage: '256GB SSD' },
    dailyRate: 70000,
    weeklyRate: 420000,
    monthlyRate: 1400000,
    status: 'Available',
    slug: 'dell-vostro-5370',
    description: 'Ringan, cepat, siap kerja. Cocok untuk Office, Zoom, browsing, coding ringan.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '3',
    name: 'MacBook Pro 2017',
    brand: 'Apple',
    model: 'MacBook Pro 2017',
    category: 'Designer',
    specs: { processor: 'Intel Core i5/i7 (2017)', ram: '8GB', storage: '256GB SSD', screen: 'Retina', battery: 'Awet', weight: 'Ringan' },
    dailyRate: 150000,
    weeklyRate: 900000,
    monthlyRate: 3000000,
    status: 'Available',
    slug: 'macbook-pro-2017',
    description: 'Premium, performa ngebut. Cocok untuk editing video/foto, desain, coding.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad X13',
    brand: 'Lenovo',
    model: 'ThinkPad X13',
    category: 'Developer',
    specs: { processor: 'Intel Core i7 Gen 10', ram: '8GB', storage: '512GB SSD', battery: 'Awet' },
    dailyRate: 100000,
    weeklyRate: 600000,
    monthlyRate: 2000000,
    status: 'Available',
    slug: 'lenovo-thinkpad-x13',
    description: 'Ringan, cepat, baterai awet. Cocok untuk produktivitas harian, coding, desain.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '5',
    name: 'Dell Latitude 7310',
    brand: 'Dell',
    model: 'Latitude 7310',
    category: 'Business',
    specs: { processor: 'Intel Core i5-10310U', ram: '16GB', storage: '256GB SSD' },
    dailyRate: 95000,
    weeklyRate: 570000,
    monthlyRate: 1900000,
    status: 'Available',
    slug: 'dell-latitude-7310',
    description: 'Kuliah, kerja kantoran, editing ringan, meeting. Desain slim & elegan.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '6',
    name: 'Dell Latitude 5400',
    brand: 'Dell',
    model: 'Latitude 5400',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8365U', ram: '16GB', storage: '256GB SSD', battery: '2-3 jam' },
    dailyRate: 85000,
    weeklyRate: 510000,
    monthlyRate: 1700000,
    status: 'Available',
    slug: 'dell-latitude-5400',
    description: 'Cepat & responsif. Cocok untuk kerja kantoran, tugas kuliah, editing ringan, meeting.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '7',
    name: 'Lenovo ThinkPad T480',
    brand: 'Lenovo',
    model: 'ThinkPad T480',
    category: 'Developer',
    specs: { processor: 'Intel Core i7-8550U', ram: '16GB',     storage: '1TB SSD', battery: 'Berjam-jam' },
    dailyRate: 120000,
    weeklyRate: 720000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'lenovo-thinkpad-t480',
    description: 'Kencang, stabil, nyaman. Cocok untuk kerja, editing, kuliah, multitasking berat.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '8',
    name: 'Dell Vostro 3400',
    brand: 'Dell',
    model: 'Vostro 3400',
    category: 'Student',
    specs: { processor: 'Intel Core i5-1135G7', ram: '8GB', storage: '256GB SSD' },
    dailyRate: 65000,
    weeklyRate: 390000,
    monthlyRate: 1300000,
    status: 'Available',
    slug: 'dell-vostro-3400',
    description: 'Performa cepat, desain elegan. Cocok untuk kerja, desain ringan, meeting.',
    partnerId: null,
    photoUrl: null,
  },
  {
    id: '9',
    name: 'Dell Latitude 7400',
    brand: 'Dell',
    model: 'Latitude 7400',
    category: 'Business',
    specs: { processor: 'Intel Core i5 Gen 8', ram: '16GB', storage: '512GB SSD' },
    dailyRate: 110000,
    weeklyRate: 660000,
    monthlyRate: 2200000,
    status: 'Available',
    slug: 'dell-latitude-7400',
    description: 'Laptop kelas bisnis, performa tinggi. Cocok untuk profesional.',
    partnerId: null,
    photoUrl: null,
  },
]

export const laptopImage = (slug: string) => `/laptops/${slug}.jpg`

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

// --- Retained for /rekomendasi quiz compatibility ---
export type JobType = 'developer' | 'designer' | 'student' | 'business' | 'gaming'
export type BudgetTier = '<2jt' | '2-4jt' | '4-6jt' | '>6jt'
export type Duration = 'harian' | 'mingguan' | 'bulanan'

export interface QuizAnswers {
  jobType: JobType
  software: string
  budget: BudgetTier
  duration: Duration
  location: string
}

export interface Recommendation {
  laptop: Laptop
  reason: string
}

const CATEGORY_BY_JOB: Record<JobType, LaptopCategory> = {
  developer: 'Developer',
  designer: 'Designer',
  student: 'Student',
  gaming: 'Gaming',
  business: 'Business',
}

const JOB_LABEL: Record<JobType, string> = {
  developer: 'development',
  designer: 'desain',
  student: 'studi',
  gaming: 'gaming',
  business: 'bisnis',
}

const BUDGET_MAX: Record<BudgetTier, number> = {
  '<2jt': 2_000_000,
  '2-4jt': 4_000_000,
  '4-6jt': 6_000_000,
  '>6jt': Number.POSITIVE_INFINITY,
}

export function recommendLaptop(laptops: Laptop[], answers: QuizAnswers): Recommendation {
  const list = laptops ?? []
  const category = CATEGORY_BY_JOB[answers.jobType] ?? 'Business'
  const budgetMax = BUDGET_MAX[answers.budget] ?? Number.POSITIVE_INFINITY

  const candidates = list.filter(
    (laptop) => laptop.category === category && laptop.monthlyRate <= budgetMax,
  )

  const pickBest = (arr: Laptop[]) =>
    arr.reduce((best, laptop) => (laptop.monthlyRate > best.monthlyRate ? laptop : best))

  if (candidates.length > 0) {
    const laptop = pickBest(candidates)
    return {
      laptop,
      reason: `Dengan budget ${formatIDR(budgetMax)} per bulan, ${laptop.name} menawarkan ${laptop.specs.processor} + ${laptop.specs.ram} — kombinasi paling pas untuk kebutuhan ${JOB_LABEL[answers.jobType]} Anda.`,
    }
  }

  const inBudget = list.filter((laptop) => laptop.monthlyRate <= budgetMax)
  if (inBudget.length > 0) {
    const laptop = pickBest(inBudget)
    return {
      laptop,
      reason: `Di kategori ${category} belum ada unit dalam budget Anda, tapi ${laptop.name} (${formatIDR(laptop.monthlyRate)}/bulan) tetap yang terbaik di rentang ${formatIDR(budgetMax)} berkat ${laptop.specs.processor} + ${laptop.specs.ram}.`,
    }
  }

  const laptop = pickBest([...list])
  return {
    laptop,
    reason: `Budget Anda di bawah semua opsi, jadi kami sarankan ${laptop.name} — unit paling hemat dengan ${laptop.specs.ram} dan ${laptop.specs.storage} yang tetap mumpuni.`,
  }
}
