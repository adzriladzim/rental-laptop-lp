export interface Guide {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string // e.g. "6 min"
}

export const GUIDES: Guide[] = [
  {
    slug: 'cara-memilih-laptop',
    title: 'Cara Memilih Laptop yang Tepat untuk Kebutuhan Kerja',
    excerpt:
      'Processor, RAM, storage, dan layar — panduan singkat menyesuaikan spesifikasi dengan jenis pekerjaan Anda agar tidak salah pilih.',
    category: 'Panduan',
    readTime: '6 min',
  },
  {
    slug: 'sewa-harian-vs-mingguan-vs-bulanan',
    title: 'Perbedaan Sewa Harian vs Mingguan vs Bulanan',
    excerpt:
      'Hitung kapan paket mingguan atau bulanan justru lebih murah dibanding akumulasi harian. Tips hemat budget sewa.',
    category: 'Harga',
    readTime: '5 min',
  },
  {
    slug: 'tips-merawat-laptop-rental',
    title: 'Tips Merawat Laptop Rental agar Kondisi Tetap Baik',
    excerpt:
      'Cara menjaga baterai, kebersihan, dan menghindari kerusakan selama masa sewa supaya deposit kembali utuh.',
    category: 'Perawatan',
    readTime: '4 min',
  },
  {
    slug: 'laptop-terbaik-developer-2026',
    title: 'Laptop Terbaik untuk Developer di Tahun 2026',
    excerpt:
      'Rekomendasi unit dengan RAM besar dan prosesor kencang untuk coding, Docker, dan multitasking berat.',
    category: 'Developer',
    readTime: '7 min',
  },
  {
    slug: 'sewa-laptop-event',
    title: 'Sewa Laptop untuk Event: Yang Perlu Diketahui',
    excerpt:
      'Checklist menyiapkan puluhan unit untuk seminar, training, dan booth expo — dari logistik hingga cadangan.',
    category: 'Event',
    readTime: '5 min',
  },
  {
    slug: 'corporate-laptop-rental',
    title: 'Corporate Laptop Rental: Solusi untuk Tim',
    excerpt:
      'Cara mengelola sewa laptop massal untuk tim kerja hybrid dan proyek jangka panjang dengan penawaran volume.',
    category: 'Corporate',
    readTime: '6 min',
  },
]

export const GUIDES_EN: Guide[] = [
  {
    slug: 'cara-memilih-laptop',
    title: 'How to Choose the Right Laptop for Your Work',
    excerpt:
      'Processor, RAM, storage, and display — a short guide to matching specs to your type of work so you don\u2019t pick wrong.',
    category: 'Guide',
    readTime: '6 min',
  },
  {
    slug: 'sewa-harian-vs-mingguan-vs-bulanan',
    title: 'Daily vs Weekly vs Monthly Rental Differences',
    excerpt:
      'Calculate when weekly or monthly packages are actually cheaper than stacking daily rates. Tips to save your rental budget.',
    category: 'Pricing',
    readTime: '5 min',
  },
  {
    slug: 'tips-merawat-laptop-rental',
    title: 'Tips to Care for a Rental Laptop',
    excerpt:
      'How to protect the battery, keep it clean, and avoid damage during the rental period so your deposit returns intact.',
    category: 'Maintenance',
    readTime: '4 min',
  },
  {
    slug: 'laptop-terbaik-developer-2026',
    title: 'Best Laptops for Developers in 2026',
    excerpt:
      'Recommendations with large RAM and fast processors for coding, Docker, and heavy multitasking.',
    category: 'Developer',
    readTime: '7 min',
  },
  {
    slug: 'sewa-laptop-event',
    title: 'Renting Laptops for Events: What to Know',
    excerpt:
      'A checklist to prepare dozens of units for seminars, training, and expo booths — from logistics to spares.',
    category: 'Event',
    readTime: '5 min',
  },
  {
    slug: 'corporate-laptop-rental',
    title: 'Corporate Laptop Rental: A Solution for Teams',
    excerpt:
      'How to manage bulk laptop rental for hybrid teams and long-term projects with volume pricing.',
    category: 'Corporate',
    readTime: '6 min',
  },
]
