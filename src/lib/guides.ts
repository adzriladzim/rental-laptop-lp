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
