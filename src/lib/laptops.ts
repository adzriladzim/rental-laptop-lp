// Laptop data layer.
// Live data now comes from the backend via @/lib/api. This module keeps:
//  - the shared types (re-exported from @/lib/api)
//  - FALLBACK_LAPTOPS: used ONLY when the API is unreachable (build/resilience)
//  - pure helpers: formatIDR, laptopImage, recommendLaptop

import type { Laptop, LaptopCategory } from '@/lib/api'
export type { Laptop, LaptopCategory, LaptopSpecs } from '@/lib/api'

/* Category types used by /kategori pages */
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

// 5 hardcoded laptops in the live API shape (camelCase). Used as a resilience
// fallback when the backend is down at build/runtime.
export const FALLBACK_LAPTOPS: Laptop[] = [
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
    id: '13',
    name: 'Redmibook 15',
    brand: 'Redmibook',
    model: 'Redmibook 15',
    category: 'Student',
    specs: { processor: 'Intel Core i3-1115G4', ram: '8GB', storage: '256GB SSD', battery: '7-10 jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'redmibook-15',
    description: 'Ringan dan terjangkau — cocok untuk kuliah, browsing, dan tugas harian.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kuliah-umum', 'ujian-mandiri'],
  },
  {
    id: '14',
    name: 'Lenovo ThinkPad T460s',
    brand: 'Lenovo',
    model: 'ThinkPad T460s',
    category: 'Business',
    specs: { processor: 'Intel Core i7-6600U', ram: '8GB', storage: '256GB SSD', battery: '4-6 jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'lenovo-thinkpad-t460s',
    description: 'Tipis, ringkas, dan ringan dibawa. Pas untuk kerja kantoran.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'ujian-bumn', 'kuliah-umum'],
  },
  {
    id: '15',
    name: 'MacBook Pro 2019',
    brand: 'Apple',
    model: 'MacBook Pro 2019',
    category: 'Designer',
    specs: { processor: 'Intel Core i5-8269U', ram: '8GB', storage: '256GB SSD', battery: '5-6 jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'macbook-pro-2019',
    description: 'Layar Retina tajam dan performa kencang untuk editing, desain, dan kerja berat.',
    partnerId: null,
    photoUrl: null,
    useCases: ['desain-kuliah', 'coding-dev'],
  },
  {
    id: '16',
    name: 'Dell Latitude 7410',
    brand: 'Dell',
    model: 'Latitude 7410',
    category: 'Business',
    specs: { processor: 'Intel Core i7-10610U', ram: '16GB', storage: '512GB SSD', battery: '4-6 jam' },
    dailyRate: 175000,
    weeklyRate: 875000,
    monthlyRate: 2400000,
    status: 'Available',
    slug: 'dell-latitude-7410',
    description: 'Kelas bisnis dengan layar lega dan baterai awet — ideal untuk profesional.',
    partnerId: null,
    photoUrl: null,
    useCases: ['kerja-remote', 'ujian-bumn'],
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


