import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { I18nProvider } from '@/components/I18nProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rental-laptop-lp.vercel.app',
  ),
  title: {
    default: 'Sewaintop — Sewa Laptop Profesional Jakarta',
    template: '%s | Sewaintop',
  },
  description:
    'Sewa laptop harian, mingguan, dan bulanan di Jakarta. Katalog lengkap, harga transparan, booking 3 langkah.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Sewaintop',
    title: 'Sewaintop — Sewa Laptop Profesional Jakarta',
    description:
      'Sewa laptop harian, mingguan, dan bulanan di Jakarta. Katalog lengkap, harga transparan, booking 3 langkah.',
    images: [
      {
        url: '/sewaintop1.png',
        width: 512,
        height: 512,
        alt: 'Sewaintop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sewaintop — Sewa Laptop Profesional Jakarta',
    description:
      'Sewa laptop harian, mingguan, dan bulanan di Jakarta. Katalog lengkap, harga transparan, booking 3 langkah.',
    images: ['/sewaintop1.png'],
  },
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sewaintop.com'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sewaintop',
  description: 'Sewa laptop harian, mingguan, bulanan di Jakarta',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jakarta',
    addressCountry: 'ID',
  },
  telephone: '+6288292123852',
  url: BASE_URL,
  priceRange: 'Rp 175.000 - Rp 500.000',
  areaServed: 'Jakarta',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sewaintop',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/laptop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <I18nProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  )
}
