// Laptop data layer.
// Live data now comes from the backend via @/lib/api. This module keeps:
//  - the shared types (re-exported from @/lib/api)
//  - FALLBACK_LAPTOPS: used ONLY when the API is unreachable (build/resilience)
//  - pure helpers: formatIDR, laptopImage, recommendLaptop

import type { Laptop, LaptopCategory } from '@/lib/api'
export type { Laptop, LaptopCategory, LaptopSpecs } from '@/lib/api'

/* Category types used by /kategori pages and /rekomendasi quiz */
export const LAPTOP_CATEGORIES: LaptopCategory[] = [
  'Developer',
  'Designer',
  'Student',
  'Business',
  'Gaming',
]

// ── Use-case definitions for catalog grouping ──
export const USE_CASES = [
  { id: 'ujian-bumn', label: 'Ujian BUMN / CPNS', icon: '📋', desc: 'Laptop untuk ujian online kerja negeri' },
  { id: 'ujian-mandiri', label: 'Ujian Mandiri Kuliah', icon: '🎓', desc: 'Persiapan ujian masuk PTN / mandiri' },
  { id: 'kerja-remote', label: 'Kerja Remote', icon: '💻', desc: 'Work from home, meeting, Office' },
  { id: 'desain-kuliah', label: 'Desain / Teknik', icon: '🎨', desc: 'Editing, desain grafis, AutoCAD' },
  { id: 'coding-dev', label: 'Coding & Dev', icon: '⌨️', desc: 'IDE, Docker, development' },
  { id: 'kuliah-umum', label: 'Kuliah Umum', icon: '📚', desc: 'Tugas, browsing, Zoom' },
] as const

export type UseCaseId = (typeof USE_CASES)[number]['id']

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
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'lenovo-thinkpad-x280',
    description: 'Ringkas, cepat, dan siap kerja. Cocok untuk Office, kuliah, Zoom, browsing.',
    partnerId: null,
    photoUrl: null,
    useCases: ['ujian-bumn', 'ujian-mandiri', 'kerja-remote', 'kuliah-umum'],
  },
  {
    id: '2',
    name: 'Dell Vostro 5370',
    brand: 'Dell',
    model: 'Vostro 5370',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8250U', ram: '8GB', storage: '256GB SSD' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-vostro-5370',
    description: 'Ringan, cepat, siap kerja. Cocok untuk Office, Zoom, browsing, coding ringan.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'kuliah-umum', 'ujian-bumn'],
  },
  {
    id: '3',
    name: 'MacBook Pro 2017',
    brand: 'Apple',
    model: 'MacBook Pro 2017',
    category: 'Designer',
    specs: { processor: 'Intel Core i5/i7 (2017)', ram: '8GB', storage: '256GB SSD', screen: 'Retina', battery: 'Awet', weight: 'Ringan' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'macbook-pro-2017',
    description: 'Premium, performa ngebut. Cocok untuk editing video/foto, desain, coding.',
    partnerId: null,
    photoUrl: null,
    useCases: ['desain-kuliah', 'coding-dev'],
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad X13',
    brand: 'Lenovo',
    model: 'ThinkPad X13',
    category: 'Developer',
    specs: { processor: 'Intel Core i7 Gen 10', ram: '8GB', storage: '512GB SSD', battery: 'Awet' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'lenovo-thinkpad-x13',
    description: 'Ringan, cepat, baterai awet. Cocok untuk produktivitas harian, coding, desain.',
    partnerId: null,
    photoUrl: null,
    useCases: ['coding-dev', 'kerja-remote', 'desain-kuliah'],
  },
  {
    id: '5',
    name: 'Dell Latitude 7310',
    brand: 'Dell',
    model: 'Latitude 7310',
    category: 'Business',
    specs: { processor: 'Intel Core i5-10310U', ram: '16GB', storage: '256GB SSD' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-latitude-7310',
    description: 'Kuliah, kerja kantoran, editing ringan, meeting. Desain slim & elegan.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'kuliah-umum', 'ujian-mandiri'],
  },
  {
    id: '6',
    name: 'Dell Latitude 5400',
    brand: 'Dell',
    model: 'Latitude 5400',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8365U', ram: '16GB', storage: '256GB SSD', battery: '2-3 jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-latitude-5400',
    description: 'Cepat & responsif. Cocok untuk kerja kantoran, tugas kuliah, editing ringan, meeting.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'kuliah-umum', 'ujian-bumn'],
  },
  {
    id: '7',
    name: 'Lenovo ThinkPad T480',
    brand: 'Lenovo',
    model: 'ThinkPad T480',
    category: 'Developer',
    specs: { processor: 'Intel Core i7-8550U', ram: '16GB', storage: '1TB SSD', battery: 'Berjam-jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'lenovo-thinkpad-t480',
    description: 'Kencang, stabil, nyaman. Cocok untuk kerja, editing, kuliah, multitasking berat.',
    partnerId: null,
    photoUrl: null,
    useCases: ['coding-dev', 'desain-kuliah', 'kerja-remote'],
  },
  {
    id: '8',
    name: 'Dell Vostro 3400',
    brand: 'Dell',
    model: 'Vostro 3400',
    category: 'Student',
    specs: { processor: 'Intel Core i5-1135G7', ram: '8GB', storage: '256GB SSD' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-vostro-3400',
    description: 'Performa cepat, desain elegan. Cocok untuk kerja, desain ringan, meeting.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kuliah-umum', 'ujian-mandiri', 'ujian-bumn'],
  },
  {
    id: '9',
    name: 'Dell Latitude 7400',
    brand: 'Dell',
    model: 'Latitude 7400',
    category: 'Business',
    specs: { processor: 'Intel Core i5 Gen 8', ram: '16GB', storage: '512GB SSD' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-latitude-7400',
    description: 'Laptop kelas bisnis, performa tinggi. Cocok untuk profesional.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'ujian-bumn'],
  },
  {
    id: '10',
    name: 'MacBook Air M1 (2020)',
    brand: 'Apple',
    model: 'MacBook Air M1',
    category: 'Student',
    specs: { processor: 'Apple M1 (8-core CPU, 7-core GPU)', ram: '8GB Unified', storage: '256GB SSD', screen: '13.3" Retina 2560×1600', battery: 'Hingga 18 jam', weight: '1.29 kg' },
    dailyRate: 250000,
    weeklyRate: 1250000,
    monthlyRate: 3500000,
    status: 'Available',
    slug: 'macbook-air-m1',
    description: 'Ringan, baterai awet, performa M1 untuk kuliah, browsing, coding ringan. Layar Retina tajam.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kuliah-umum', 'coding-dev', 'kerja-remote'],
  },
  {
    id: '11',
    name: 'MacBook Pro 14" M2 Pro (2023)',
    brand: 'Apple',
    model: 'MacBook Pro 14" M2 Pro',
    category: 'Designer',
    specs: { processor: 'Apple M2 Pro (10-core CPU, 16-core GPU)', ram: '16GB Unified', storage: '512GB SSD', screen: '14.2" Liquid Retina XDR 3024×1964', battery: 'Hingga 17 jam', weight: '1.6 kg' },
    dailyRate: 350000,
    weeklyRate: 1750000,
    monthlyRate: 5000000,
    status: 'Available',
    slug: 'macbook-pro-14-m2-pro',
    description: 'Layar Liquid Retina XDR, performa M2 Pro untuk desain, video editing, dan development berat.',
    partnerId: null,
    photoUrl: null,
    useCases: ['desain-kuliah', 'coding-dev', 'kerja-remote'],
  },
  {
    id: '12',
    name: 'MacBook Pro 16" M3 Max (2023)',
    brand: 'Apple',
    model: 'MacBook Pro 16" M3 Max',
    category: 'Developer',
    specs: { processor: 'Apple M3 Max (14-core CPU, 30-core GPU)', ram: '36GB Unified', storage: '1TB SSD', screen: '16.2" Liquid Retina XDR 3456×2234', battery: 'Hingga 22 jam', weight: '2.14 kg' },
    dailyRate: 500000,
    weeklyRate: 2500000,
    monthlyRate: 7000000,
    status: 'Available',
    slug: 'macbook-pro-16-m3-max',
    description: 'Performa M3 Max untuk video editing 4K/8K, 3D rendering, dan development intensif. RAM 36GB.',
    partnerId: null,
    photoUrl: null,
    useCases: ['desain-kuliah', 'coding-dev', 'kerja-remote'],
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
