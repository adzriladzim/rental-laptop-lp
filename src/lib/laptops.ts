export type LaptopCategory = 'Developer' | 'Designer' | 'Student' | 'Business' | 'Gaming'
export type LaptopSpecs = {
  processor: string
  ram: string
  storage: string
  screen?: string
  battery?: string
  gpu?: string
  weight?: string
}

export type Laptop = {
  id: string
  name: string
  brand: string
  model: string
  category: LaptopCategory
  specs: LaptopSpecs
  dailyRateIdr: number
  weeklyRateIdr: number
  monthlyRateIdr: number
  partner: string | null // null = own, string = partner name
  description: string
  slug: string
}

export const LAPTOPS: Laptop[] = [
  {
    id: '1',
    name: 'Lenovo ThinkPad X280',
    brand: 'Lenovo',
    model: 'ThinkPad X280',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8250U', ram: '8GB', storage: '256GB SSD', screen: '12.5" Full HD', battery: 'Tahan lama' },
    dailyRateIdr: 75000,
    weeklyRateIdr: 450000,
    monthlyRateIdr: 1500000,
    partner: null,
    description: 'Ringkas, cepat, dan siap kerja. Cocok untuk Office, kuliah, Zoom, browsing.',
    slug: 'lenovo-thinkpad-x280',
  },
  {
    id: '2',
    name: 'Dell Vostro 5370',
    brand: 'Dell',
    model: 'Vostro 5370',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8250U', ram: '8GB', storage: '256GB SSD' },
    dailyRateIdr: 70000,
    weeklyRateIdr: 420000,
    monthlyRateIdr: 1400000,
    partner: null,
    description: 'Ringan, cepat, siap kerja. Cocok untuk Office, Zoom, browsing, coding ringan.',
    slug: 'dell-vostro-5370',
  },
  {
    id: '3',
    name: 'MacBook Pro 2017',
    brand: 'Apple',
    model: 'MacBook Pro 2017',
    category: 'Designer',
    specs: { processor: 'Intel Core i5/i7 (2017)', ram: '8GB', storage: '256GB SSD', screen: 'Retina', battery: 'Awet', weight: 'Ringan' },
    dailyRateIdr: 150000,
    weeklyRateIdr: 900000,
    monthlyRateIdr: 3000000,
    partner: null,
    description: 'Premium, performa ngebut. Cocok untuk editing video/foto, desain, coding.',
    slug: 'macbook-pro-2017',
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad X13',
    brand: 'Lenovo',
    model: 'ThinkPad X13',
    category: 'Developer',
    specs: { processor: 'Intel Core i7 Gen 10', ram: '8GB', storage: '512GB SSD', battery: 'Awet' },
    dailyRateIdr: 100000,
    weeklyRateIdr: 600000,
    monthlyRateIdr: 2000000,
    partner: null,
    description: 'Ringan, cepat, baterai awet. Cocok untuk produktivitas harian, coding, desain.',
    slug: 'lenovo-thinkpad-x13',
  },
  {
    id: '5',
    name: 'Dell Latitude 7310',
    brand: 'Dell',
    model: 'Latitude 7310',
    category: 'Business',
    specs: { processor: 'Intel Core i5-10310U', ram: '16GB', storage: '256GB SSD' },
    dailyRateIdr: 95000,
    weeklyRateIdr: 570000,
    monthlyRateIdr: 1900000,
    partner: null,
    description: 'Kuliah, kerja kantoran, editing ringan, meeting. Desain slim & elegan.',
    slug: 'dell-latitude-7310',
  },
  {
    id: '6',
    name: 'Dell Latitude 5400',
    brand: 'Dell',
    model: 'Latitude 5400',
    category: 'Business',
    specs: { processor: 'Intel Core i5-8365U', ram: '16GB', storage: '256GB SSD', battery: '2-3 jam' },
    dailyRateIdr: 85000,
    weeklyRateIdr: 510000,
    monthlyRateIdr: 1700000,
    partner: null,
    description: 'Cepat & responsif. Cocok untuk kerja kantoran, tugas kuliah, editing ringan, meeting.',
    slug: 'dell-latitude-5400',
  },
  {
    id: '7',
    name: 'Lenovo ThinkPad T480',
    brand: 'Lenovo',
    model: 'ThinkPad T480',
    category: 'Developer',
    specs: { processor: 'Intel Core i7-8550U', ram: '16GB', storage: '1TB SSD', battery: 'Berjam-jam' },
    dailyRateIdr: 120000,
    weeklyRateIdr: 720000,
    monthlyRateIdr: 2400000,
    partner: null,
    description: 'Kencang, stabil, nyaman. Cocok untuk kerja, editing, kuliah, multitasking berat.',
    slug: 'lenovo-thinkpad-t480',
  },
  {
    id: '8',
    name: 'Dell Vostro 3400',
    brand: 'Dell',
    model: 'Vostro 3400',
    category: 'Student',
    specs: { processor: 'Intel Core i5-1135G7', ram: '8GB', storage: '256GB SSD' },
    dailyRateIdr: 65000,
    weeklyRateIdr: 390000,
    monthlyRateIdr: 1300000,
    partner: null,
    description: 'Performa cepat, desain elegan. Cocok untuk kerja, desain ringan, meeting.',
    slug: 'dell-vostro-3400',
  },
  {
    id: '9',
    name: 'Dell Latitude 7400',
    brand: 'Dell',
    model: 'Latitude 7400',
    category: 'Business',
    specs: { processor: 'Intel Core i5 Gen 8', ram: '16GB', storage: '512GB SSD' },
    dailyRateIdr: 110000,
    weeklyRateIdr: 660000,
    monthlyRateIdr: 2200000,
    partner: null,
    description: 'Laptop kelas bisnis, performa tinggi. Cocok untuk profesional.',
    slug: 'dell-latitude-7400',
  },
]

export const LAPTOP_CATEGORIES: LaptopCategory[] = [
  'Developer',
  'Designer',
  'Student',
  'Business',
  'Gaming',
]

export function getLaptopBySlug(slug: string): Laptop | undefined {
  return LAPTOPS.find((l) => l.slug === slug)
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

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function recommendLaptop(answers: QuizAnswers): Recommendation {
  const category = CATEGORY_BY_JOB[answers.jobType] ?? 'Business'
  const budgetMax = BUDGET_MAX[answers.budget] ?? Number.POSITIVE_INFINITY

  const candidates = LAPTOPS.filter(
    (laptop) => laptop.category === category && laptop.monthlyRateIdr <= budgetMax,
  )

  const pickBest = (list: Laptop[]) =>
    list.reduce((best, laptop) => (laptop.monthlyRateIdr > best.monthlyRateIdr ? laptop : best))

  if (candidates.length > 0) {
    const laptop = pickBest(candidates)
    return {
      laptop,
      reason: `Dengan budget ${formatIDR(budgetMax)} per bulan, ${laptop.name} menawarkan ${laptop.specs.processor} + ${laptop.specs.ram} — kombinasi paling pas untuk kebutuhan ${JOB_LABEL[answers.jobType]} Anda.`,
    }
  }

  const inBudget = LAPTOPS.filter((laptop) => laptop.monthlyRateIdr <= budgetMax)
  if (inBudget.length > 0) {
    const laptop = pickBest(inBudget)
    return {
      laptop,
      reason: `Di kategori ${category} belum ada unit dalam budget Anda, tapi ${laptop.name} (${formatIDR(laptop.monthlyRateIdr)}/bulan) tetap yang terbaik di rentang ${formatIDR(budgetMax)} berkat ${laptop.specs.processor} + ${laptop.specs.ram}.`,
    }
  }

  const laptop = pickBest([...LAPTOPS])
  return {
    laptop,
    reason: `Budget Anda di bawah semua opsi, jadi kami sarankan ${laptop.name} — unit paling hemat dengan ${laptop.specs.ram} dan ${laptop.specs.storage} yang tetap mumpuni.`,
  }
}
