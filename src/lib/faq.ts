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
      'Ikuti 4 langkah mudah: (1) Pilih laptop di katalog, (2) Pilih unit & tanggal di halaman Pesan, (3) Klik booking & chat langsung via WhatsApp, (4) Konfirmasi detail & terima unit. Tim kami bantu sampai unit sampai di tangan Anda.',
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

export const FAQS_EN: FaqItem[] = [
  {
    id: 'cara-sewa',
    question: 'How do I rent a laptop?',
    answer:
      'Follow 4 easy steps: (1) Pick a laptop in the catalog, (2) Select the unit & dates on the Booking page, (3) Click book & chat via WhatsApp, (4) Confirm details & receive the unit. Our team helps until the laptop is in your hands.',
  },
  {
    id: 'harga',
    question: 'How much does laptop rental cost?',
    answer:
      'Prices start from Rp65,000/day for Student-category laptops, up to Rp150,000/day for premium units. Weekly and monthly packages are also available at much better value. See the Pricing page for full details.',
  },
  {
    id: 'area',
    question: 'Which areas do you cover?',
    answer:
      'We serve all of Jakarta (Central, South, West, East, North) plus Depok, Tangerang, and Bekasi. Outside those areas? Contact us to check delivery availability.',
  },
  {
    id: 'durasi',
    question: 'What is the minimum rental period?',
    answer:
      'Minimum rental is 1 day (daily). For longer needs, choose the weekly (7 days) or monthly (30 days) package, which is far more economical per day.',
  },
  {
    id: 'deposit',
    question: 'Is a deposit required?',
    answer:
      'Yes, for first-time rentals we ask for a security deposit (amount varies by unit, discussed at booking). The deposit is fully refunded once the unit is returned in good condition.',
  },
  {
    id: 'late',
    question: 'What is the penalty for late returns?',
    answer:
      'Late returns are charged a full 1-day rental fee per day late. Contact us before the return date if there\u2019s a problem so we can arrange an adjustment.',
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation before delivery: full refund (or deposit returned). After delivery, an administrative fee applies. Contact us as soon as possible to adjust the schedule.',
  },
  {
    id: 'verification',
    question: 'Is identity verification required?',
    answer:
      'Yes, for mutual security we require a photo of your KTP or SIM at booking. Your data is kept confidential and used only for rental verification.',
  },
  {
    id: 'delivery',
    question: 'Is there a delivery/pickup service?',
    answer:
      'Yes, we deliver and pick up units to/from your address within our service area. Coordinate the time & location during the WhatsApp chat.',
  },
  {
    id: 'insurance',
    question: 'Is there insurance or damage coverage?',
    answer:
      'Every unit includes basic protection for accidental damage. Damage caused by negligence is handled per the written agreement. Ask for full details at booking.',
  },
  {
    id: 'corporate',
    question: 'Can I rent for a company or in bulk?',
    answer:
      'Absolutely. We serve corporate rental & bulk rentals for teams or events. Special volume pricing is available. Contact us for a custom quote.',
  },
  {
    id: 'payment',
    question: 'What payment methods are available?',
    answer:
      'Payment can be made via WhatsApp (bank transfer), cash at pickup, or transfer. Account details are provided when confirming your booking.',
  },
]
