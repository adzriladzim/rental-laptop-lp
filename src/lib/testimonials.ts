export interface Testimonial {
  id: string
  name: string
  rating: number // 1-5
  text: string
  laptopRented: string
  date: string // display string, e.g. "Maret 2026"
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    rating: 5,
    text: 'Laptop bersih, performa bagus, pelayanan cepat. Sewa ThinkPad X280 buat kerja 2 minggu, puas banget.',
    laptopRented: 'Lenovo ThinkPad X280',
    date: 'Februari 2026',
  },
  {
    id: 't2',
    name: 'Siti Rahmawati',
    rating: 5,
    text: 'Sewa MacBook Pro buat editing video, layarnya tajam dan nggak pernah lag. Proses booking via WA gampang banget.',
    laptopRented: 'MacBook Pro 2017',
    date: 'Februari 2026',
  },
  {
    id: 't3',
    name: 'Andi Pratama',
    rating: 4,
    text: 'Dell Latitude 7310 buat presentasi meeting. Ringan dibawa, tapi baterai cuma standar. Overall oke untuk harga segitu.',
    laptopRented: 'Dell Latitude 7310',
    date: 'Januari 2026',
  },
  {
    id: 't4',
    name: 'Dewi Lestari',
    rating: 5,
    text: 'Anak saya butuh laptop buat tugas kuliah, Dell Vostro 3400 pas banget dan harganya terjangkau untuk mahasiswa.',
    laptopRented: 'Dell Vostro 3400',
    date: 'Maret 2026',
  },
  {
    id: 't5',
    name: 'Rizki Firmansyah',
    rating: 5,
    text: 'ThinkPad T480 buat coding dengan Docker lancar jaya. RAM 16GB cukup buat multitasking berat seharian.',
    laptopRented: 'Lenovo ThinkPad T480',
    date: 'Maret 2026',
  },
  {
    id: 't6',
    name: 'Maya Sari',
    rating: 4,
    text: 'Sewa 1 bulan buat WFH, proses pengiriman cepat dan unit rapi. Cuma balasan WA agak telat di malam hari, sisanya aman.',
    laptopRented: 'Dell Latitude 7400',
    date: 'Januari 2026',
  },
  {
    id: 't7',
    name: 'Eko Wibowo',
    rating: 5,
    text: 'ThinkPad X13 buat kerja harian, baterai awet sampai sore. Recommended buat yang sering mobile dan nggak mau bawa charger terus.',
    laptopRented: 'Lenovo ThinkPad X13',
    date: 'Februari 2026',
  },
  {
    id: 't8',
    name: 'Nur Aisyah',
    rating: 5,
    text: 'Pertama kali sewa laptop, pelayanannya ramah dan jelas. Dell Vostro 5370 mulus buat Zoom & dokumen harian.',
    laptopRented: 'Dell Vostro 5370',
    date: 'Maret 2026',
  },
]
