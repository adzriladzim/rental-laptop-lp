export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    id: 'cara-sewa',
    question: 'Bagaimana cara sewa laptop?',
    answer:
      'Ikuti 4 langkah mudah: (1) Pilih laptop di katalog, (2) Cek ketersediaan tanggal di halaman Ketersediaan, (3) Klik booking & chat langsung via WhatsApp, (4) Konfirmasi detail & terima unit. Tim kami bantu sampai unit sampai di tangan Anda.',
  },
  {
    id: 'harga',
    question: 'Berapa harga sewa laptop?',
    answer:
      'Harga mulai dari Rp65.000/hari untuk laptop kategori Student, hingga Rp150.000/hari untuk unit premium. Tersedia juga paket mingguan dan bulanan yang jauh lebih hemat. Detail lengkap ada di halaman Harga.',
  },
  {
    id: 'area',
    question: 'Area layanan mana saja yang dicakup?',
    answer:
      'Kami melayani seluruh area Jakarta (Pusat, Selatan, Barat, Timur, Utara) plus Depok, Tangerang, dan Bekasi. Di luar area tersebut? Hubungi kami untuk cek ketersediaan pengiriman.',
  },
  {
    id: 'durasi',
    question: 'Apa durasi sewa minimal?',
    answer:
      'Sewa minimal 1 hari (harian). Untuk kebutuhan lebih panjang, pilih paket mingguan (7 hari) atau bulanan (30 hari) yang jauh lebih ekonomis per hari.',
  },
  {
    id: 'deposit',
    question: 'Apakah perlu deposit?',
    answer:
      'Ya, untuk sewa pertama kami meminta deposit keamanan (besaran menyesuaikan unit, dibicarakan saat booking). Deposit dikembalikan penuh setelah unit kembali dalam kondisi baik.',
  },
  {
    id: 'late',
    question: 'Apa sanksi bila terlambat mengembalikan?',
    answer:
      'Keterlambatan dikenakan biaya sewa 1 hari penuh per hari keterlambatan. Hubungi kami sebelum tanggal kembali bila ada kendala, agar bisa kami atur penyesuaiannya.',
  },
  {
    id: 'cancellation',
    question: 'Bagaimana kebijakan pembatalan?',
    answer:
      'Pembatalan sebelum unit dikirim: refund penuh (atau deposit dikembalikan). Setelah unit terkirim berlaku biaya administrasi. Hubungi kami secepatnya untuk penyesuaian jadwal.',
  },
  {
    id: 'verification',
    question: 'Apakah perlu verifikasi identitas?',
    answer:
      'Ya, untuk keamanan bersama kami memerlukan foto KTP atau SIM saat booking. Data Anda kami jaga kerahasiaannya dan hanya dipakai untuk verifikasi sewa.',
  },
  {
    id: 'delivery',
    question: 'Apakah ada layanan antar-jemput (delivery/pickup)?',
    answer:
      'Ya, kami melayani pengantaran dan penjemputan unit ke alamat Anda di area layanan. Koordinasikan waktu & lokasi saat chat WhatsApp.',
  },
  {
    id: 'insurance',
    question: 'Apakah ada asuransi atau cover kerusakan?',
    answer:
      'Setiap unit dilengkapi perlindungan dasar untuk kerusakan non-sengaja. Kerusakan akibat kelalaian ditangani sesuai kesepakatan tertulis. Tanyakan detail lengkap saat booking.',
  },
  {
    id: 'corporate',
    question: 'Bisa sewa untuk perusahaan atau dalam jumlah banyak?',
    answer:
      'Tentu. Kami melayani corporate rental & sewa massal untuk tim atau event. Tersedia penawaran khusus volume. Hubungi kami untuk penawaran custom sesuai kebutuhan.',
  },
  {
    id: 'payment',
    question: 'Metode pembayaran apa yang tersedia?',
    answer:
      'Pembayaran dapat melalui WhatsApp (transfer bank), tunai (cash) saat pickup, atau transfer. Detail rekening diberikan saat konfirmasi booking.',
  },
]
